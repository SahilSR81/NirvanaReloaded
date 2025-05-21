/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

if (!admin.apps.length) {
  admin.initializeApp();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text
  });
}

async function sendPushToUser(uid, title, body) {
  const tokensSnap = await admin.firestore().collection(`users/${uid}/fcmTokens`).get();
  const tokens = tokensSnap.docs.map(doc => doc.id);
  if (tokens.length === 0) return;
  await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title, body }
  });
}

exports.generateWellnessTip = functions.https.onCall(async (data, context) => {
  const uid = context.auth && context.auth.uid;
  if (!uid) throw new functions.https.HttpsError("unauthenticated", "User must be authenticated.");

  const emotion = data.emotion || "neutral";
  const moodsSnap = await admin.firestore().collection(`users/${uid}/moods`)
    .orderBy("timestamp", "desc").limit(5).get();
  const recentMoods = moodsSnap.docs.map(doc => doc.data());

  const prompt = `Generate a calming, spiritual wellness tip based on a user feeling ${emotion}. Include subtle wisdom from the Bhagavad Gita. Recent moods: ${JSON.stringify(recentMoods)}`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new functions.https.HttpsError("internal", "OpenAI API key not set.");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 120
    })
  });
  const result = await response.json();
  const suggestion = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content || "No suggestion generated.";

  const ref = await admin.firestore().collection(`users/${uid}/aiSuggestions`).add({
    text: suggestion,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    emotion,
    moods: recentMoods
  });

  return { id: ref.id, text: suggestion };
});

exports.generateWeeklyReport = functions.pubsub.schedule('every sunday 00:00').onRun(async (context) => {
  const admin = require("firebase-admin");
  const fetch = require("node-fetch");
  const db = admin.firestore();
  const usersSnap = await db.collection('users').get();
  const now = new Date();
  const weekId = `${now.getFullYear()}-W${getWeekNumber(now)}`;
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  for (const userDoc of usersSnap.docs) {
    const uid = userDoc.id;
    const moodsSnap = await db.collection(`users/${uid}/moods`)
      .where('timestamp', '>=', oneWeekAgo.toISOString())
      .get();
    const moods = moodsSnap.docs.map(doc => doc.data());
    if (moods.length === 0) continue;

    // Aggregate data
    const activities = [].concat(...moods.map(m => m.activities || []));
    const sleepLogs = moods.map(m => m.sleepQuality).filter(Boolean);
    const notes = moods.map(m => m.notes).filter(Boolean);
    const emotions = moods.map(m => m.emotion);

    const prompt = `Based on this user's emotional and activity data for the week, summarize their mental health trends and suggest actionable steps to improve well-being. Include spiritual/psychological recommendations. Data: ${JSON.stringify({ activities, sleepLogs, emotions, notes })}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) continue;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 300
      })
    });
    const result = await response.json();
    const reportText = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content || "No report generated.";

    await db.collection(`users/${uid}/reports`).doc(weekId).set({
      text: reportText,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      weekId,
      activities,
      sleepLogs,
      emotions,
      notes
    });
  }
  return null;
});

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}

exports.sendDailyReminders = functions.pubsub.schedule('every day 08:00').onRun(async (context) => {
  const db = admin.firestore();
  const usersSnap = await db.collection('users').get();
  for (const userDoc of usersSnap.docs) {
    const uid = userDoc.id;
    const email = userDoc.data().email;
    const notifDoc = await db.collection(`users/${uid}/preferences`).doc('notifications').get();
    const prefs = notifDoc.exists ? notifDoc.data() : {};
    if (prefs.dailyReminder) {
      // Push
      await sendPushToUser(uid, "Mood Reminder", "Don't forget to log your mood today!");
      // Email
      if (email) await sendEmail(email, "Mood Reminder", "Don't forget to log your mood today!");
    }
    // Milestone logic (example: 7-day streak)
    if (prefs.milestone) {
      const moodsSnap = await db.collection(`users/${uid}/moods`).orderBy('timestamp', 'desc').limit(7).get();
      if (moodsSnap.size === 7) {
        // Check if 7 consecutive days
        const days = moodsSnap.docs.map(doc => (new Date(doc.data().timestamp)).toDateString());
        const uniqueDays = new Set(days);
        if (uniqueDays.size === 7) {
          await sendPushToUser(uid, "Streak Milestone!", "Congrats on a 7-day mood log streak!");
          if (email) await sendEmail(email, "Streak Milestone!", "Congrats on a 7-day mood log streak!");
        }
      }
    }
  }
  return null;
});

exports.adminGenerateQuotes = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });

  const prompt = `Generate ${n} inspirational quotes as a JSON array. Each item should have 'text' and 'author'. Example: [{\"text\":\"...\",\"author\":\"...\"}]`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let quotes = [];
    try {
      quotes = JSON.parse(content);
    } catch (e) {
      // Try to extract JSON from text
      const match = content.match(/\[.*\]/s);
      if (match) quotes = JSON.parse(match[0]);
    }
    if (!Array.isArray(quotes)) throw new Error("AI did not return a valid array");
    res.json(quotes);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

exports.adminGenerateStories = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });

  const prompt = `Generate ${n} short inspirational stories as a JSON array. Each item should have 'title', 'content', and 'readTime' (e.g., '2 min'). Example: [{\"title\":\"...\",\"content\":\"...\",\"readTime\":\"2 min\"}]`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let stories = [];
    try {
      stories = JSON.parse(content);
    } catch (e) {
      // Try to extract JSON from text
      const match = content.match(/\[.*\]/s);
      if (match) stories = JSON.parse(match[0]);
    }
    if (!Array.isArray(stories)) throw new Error("AI did not return a valid array");
    res.json(stories);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

exports.adminGenerateYoga = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const prompt = `Generate ${n} yoga asanas as a JSON array. Each item should have 'name', 'difficulty', 'description', 'benefits' (array), and 'instructions' (array). Example: [{\"name\":\"...\",\"difficulty\":\"Beginner\",\"description\":\"...\",\"benefits\":[...],\"instructions\":[...]}]`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let yoga = [];
    try { yoga = JSON.parse(content); } catch (e) { const match = content.match(/\[.*\]/s); if (match) yoga = JSON.parse(match[0]); }
    if (!Array.isArray(yoga)) throw new Error("AI did not return a valid array");
    res.json(yoga);
  } catch (e) { res.status(500).json({ error: String(e) }); }
});

exports.adminGenerateWisdom = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const prompt = `Generate ${n} Bhagavad Gita verses as a JSON array. Each item should have 'chapter', 'verse', 'sanskrit', 'translation', and 'meaning'. Example: [{\"chapter\":2,\"verse\":47,\"sanskrit\":\"...\",\"translation\":\"...\",\"meaning\":\"...\"}]`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1200
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let wisdom = [];
    try { wisdom = JSON.parse(content); } catch (e) { const match = content.match(/\[.*\]/s); if (match) wisdom = JSON.parse(match[0]); }
    if (!Array.isArray(wisdom)) throw new Error("AI did not return a valid array");
    res.json(wisdom);
  } catch (e) { res.status(500).json({ error: String(e) }); }
});

exports.adminGenerateMusic = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const prompt = `Generate ${n} meditation music tracks as a JSON array. Each item should have 'title', 'artist', 'mood', and 'duration'. Example: [{\"title\":\"...\",\"artist\":\"...\",\"mood\":\"Calm\",\"duration\":\"5 min\"}]`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let music = [];
    try { music = JSON.parse(content); } catch (e) { const match = content.match(/\[.*\]/s); if (match) music = JSON.parse(match[0]); }
    if (!Array.isArray(music)) throw new Error("AI did not return a valid array");
    res.json(music);
  } catch (e) { res.status(500).json({ error: String(e) }); }
});

exports.adminGenerateLifestyle = onRequest(async (req, res) => {
  const n = req.body.n || 5;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const prompt = `Generate ${n} lifestyle tips as a JSON array. Each item should have 'title', 'description', and 'category'. Example: [{\"title\":\"...\",\"description\":\"...\",\"category\":\"health\"}]`;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 800
      })
    });
    const result = await response.json();
    const content = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    let tips = [];
    try { tips = JSON.parse(content); } catch (e) { const match = content.match(/\[.*\]/s); if (match) tips = JSON.parse(match[0]); }
    if (!Array.isArray(tips)) throw new Error("AI did not return a valid array");
    res.json(tips);
  } catch (e) { res.status(500).json({ error: String(e) }); }
});

exports.adminAnalyticsSummary = onRequest(async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const db = admin.firestore();
  try {
    // Fetch user count
    const usersSnap = await db.collection('users').get();
    const userCount = usersSnap.size;
    // Fetch recent moods (last 100)
    let moods = [];
    for (const userDoc of usersSnap.docs) {
      const moodsSnap = await db.collection(`users/${userDoc.id}/moods`).orderBy('timestamp', 'desc').limit(10).get();
      moods.push(...moodsSnap.docs.map(doc => doc.data()));
    }
    moods = moods.slice(0, 100);
    const prompt = `You are an analytics assistant. Given the following data, summarize the key trends, user engagement, and mood patterns.\nUser count: ${userCount}\nRecent moods: ${JSON.stringify(moods)}`;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400
      })
    });
    const result = await response.json();
    const summary = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
    res.json({ summary });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

exports.adminModerateFlagged = onRequest(async (req, res) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not set." });
  const db = admin.firestore();
  try {
    // Fetch flagged entries (example: from a 'flaggedEntries' collection)
    const flaggedSnap = await db.collection('flaggedEntries').limit(10).get();
    const flagged = flaggedSnap.docs.map(doc => doc.data());
    const results = [];
    for (const entry of flagged) {
      const prompt = `Moderate the following user entry. Is it inappropriate, harmful, or spam? Reply with a short recommendation.\nEntry: ${entry.text || JSON.stringify(entry)}`;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 100
        })
      });
      const result = await response.json();
      const aiResult = result.choices && result.choices[0] && result.choices[0].message && result.choices[0].message.content;
      results.push({ entry: entry.text || JSON.stringify(entry), aiResult });
    }
    res.json(results);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});
