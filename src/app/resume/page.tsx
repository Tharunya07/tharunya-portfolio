// app/resume/page.tsx
'use client';

import { useState } from 'react';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Download, Mail, Send, FileText, MessageSquare, Star, Eye, Clock, Users } from 'lucide-react';

function ResumePage() {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedbackForm({
      ...feedbackForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSendFeedback = () => {
    const subject = encodeURIComponent('Resume Feedback from ' + feedbackForm.name);
    const body = encodeURIComponent(
      `Resume Feedback:\n\nFrom: ${feedbackForm.name}\nEmail: ${feedbackForm.email}\n\nFeedback:\n${feedbackForm.feedback}`
    );
    window.location.href = `mailto:tharunyapathipati@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/TharunyaPathipati_Resume.pdf';
    link.download = 'TharunyaPathipati_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      
      {/* Simple Header */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary">Resume</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Resume Display */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Resume
                  </span>
                  <Button onClick={handleDownload} size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Enhanced PDF Display */}
                <div className="w-full h-[800px] border border-border rounded-lg overflow-hidden bg-white">
                  <object
                    data="/TharunyaPathipati_Resume.pdf"
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <embed
                      src="/TharunyaPathipati_Resume.pdf"
                      type="application/pdf"
                      className="w-full h-full"
                    />
                  </object>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Simplified */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.open('mailto:tharunyapathipati@gmail.com', '_blank')}>
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
                <Button className="w-full" variant="outline" onClick={() => window.open('/contact', '_blank')}>
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Let's Connect
                </Button>
              </CardContent>
            </Card>

            {/* Feedback Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Send Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted mb-4">
                  Have suggestions for my resume? I'd love to hear your thoughts!
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      value={feedbackForm.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <Input
                      name="email"
                      type="email"
                      value={feedbackForm.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="text-sm"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="feedback"
                      value={feedbackForm.feedback}
                      onChange={handleInputChange}
                      placeholder="What could be improved? Any suggestions?"
                      className="h-20 text-sm"
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleSendFeedback}
                    disabled={!feedbackForm.name || !feedbackForm.feedback}
                    size="sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </Button>
                </div>
                
                <p className="text-xs text-muted mt-3 text-center">
                  Opens your email client with feedback pre-filled
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Resume() {
  return (
    <ThemeProvider>
      <ResumePage />
    </ThemeProvider>
  );
}