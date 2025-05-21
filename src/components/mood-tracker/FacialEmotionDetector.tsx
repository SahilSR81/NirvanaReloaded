import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EMOTION_LABELS: Record<string, string> = {
  happy: 'Happy',
  sad: 'Sad',
  angry: 'Angry',
  neutral: 'Neutral',
  surprised: 'Surprised',
  fearful: 'Fearful',
  disgusted: 'Disgusted',
};

interface FacialEmotionDetectorProps {
  onDetect: (emotion: string, confidence: number) => void;
}

export const FacialEmotionDetector: React.FC<FacialEmotionDetectorProps> = ({ onDetect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string>('');
  const [confidence, setConfidence] = useState<number>(0);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load face-api models.');
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (!loading && !error) {
      startVideo();
    }
    // eslint-disable-next-line
  }, [loading, error]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      }
    } catch (err) {
      setError('Could not access webcam.');
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      setStreaming(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (streaming && videoRef.current) {
      interval = setInterval(async () => {
        if (!videoRef.current) return;
        const detections = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
        if (detections && detections.expressions) {
          const sorted = Object.entries(detections.expressions).sort((a, b) => b[1] - a[1]);
          const [topEmotion, topConfidence] = sorted[0];
          setEmotion(topEmotion);
          setConfidence(Math.round(topConfidence * 100));
          onDetect(topEmotion, Math.round(topConfidence * 100));
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [streaming, onDetect]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="gradient-text">Facial Emotion Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading models...</div>}
        {error && <div className="text-destructive">{error}</div>}
        <div className="flex flex-col items-center gap-4">
          <video ref={videoRef} autoPlay muted width={320} height={240} className="rounded-lg border" />
          <div className="text-lg mt-2">
            Detected: <span className="font-bold gradient-text">{EMOTION_LABELS[emotion] || '...'}</span>
            {confidence > 0 && (
              <span className="ml-2 text-muted-foreground">({confidence}%)</span>
            )}
          </div>
          <Button onClick={streaming ? stopVideo : startVideo} variant="outline">
            {streaming ? 'Stop Camera' : 'Start Camera'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 