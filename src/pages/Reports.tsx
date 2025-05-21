import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/shared/Navbar';

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      if (!user) return;
      setLoading(true);
      const reportsRef = collection(db, 'users', user.uid, 'reports');
      const snapshot = await getDocs(reportsRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(data.sort((a, b) => new Date((b as any).createdAt ?? 0).getTime() - new Date((a as any).createdAt ?? 0).getTime()));
      setLoading(false);
    };
    fetchReports();
  }, [user]);

  const downloadReport = (report: any, format: 'txt' | 'pdf') => {
    const filename = `Weekly_Report_${report.id}.${format}`;
    if (format === 'txt') {
      const blob = new Blob([report.text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      // Simple PDF using window.print (for demo); for real PDF use jsPDF or similar
      const win = window.open('', '', 'width=800,height=600');
      if (win) {
        win.document.write(`<pre>${report.text}</pre>`);
        win.document.close();
        win.print();
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 px-6 pb-6 max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold gradient-text mb-8">Weekly Reports</h1>
        {loading ? (
          <div>Loading...</div>
        ) : reports.length === 0 ? (
          <div>No reports found.</div>
        ) : (
          <div className="space-y-6">
            {reports.map(report => (
              <Card key={report.id} className="glass-card">
                <CardHeader>
                  <CardTitle className="gradient-text">Week: {report.id}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-base mb-4">{report.text}</pre>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => downloadReport(report, 'txt')}>Download TXT</Button>
                    <Button variant="outline" onClick={() => downloadReport(report, 'pdf')}>Print as PDF</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports; 