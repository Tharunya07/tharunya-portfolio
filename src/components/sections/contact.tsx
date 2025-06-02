// components/sections/contact.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Send,
  Copy,
  CheckCircle,
  ExternalLink,
  Coffee,
  Users,
  Mic,
  Code2
} from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Hi Tharunya!\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:tharunyapathipati@gmail.com?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('tharunyapathipati@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const interests = [
    { icon: <Coffee className="w-4 h-4" />, title: 'Coffee Chats' },
    { icon: <Users className="w-4 h-4" />, title: 'Tech Events' },
    { icon: <Mic className="w-4 h-4" />, title: 'Culture & Diversity' },
    { icon: <Code2 className="w-4 h-4" />, title: 'Collaboration' }
  ];

  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4" />,
      value: 'tharunyapathipati@gmail.com',
      href: 'mailto:tharunyapathipati@gmail.com',
      color: 'bg-red-500'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4" />,
      value: '@Tharunya07',
      href: 'https://github.com/Tharunya07',
      color: 'bg-gray-700'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-4 h-4" />,
      value: 'tharunya-pathipati',
      href: 'https://www.linkedin.com/in/tharunya-pathipati/',
      color: 'bg-blue-600'
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="w-5 h-5" />
            Send Me a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What's this about?"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me more about your project, opportunity, or just say hi!"
                className="h-32"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>

          <p className="text-xs text-muted text-center mt-3">
            🔒 Opens your email client. No data stored.
          </p>
        </CardContent>
      </Card>

      {/* Right: Connect & Interests */}
      <div className="space-y-6">
        {/* What I Love Talking About - Compact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What I Love Talking About</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-surface">
                  <div className="text-primary">{interest.icon}</div>
                  <span className="text-sm font-medium">{interest.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Connect With Me - Minimalist */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connect With Me</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {socialLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded text-white ${link.color}`}>
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{link.name}</div>
                      <div className="text-xs text-muted">{link.value}</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {link.name === 'Email' && (
                      <Button
                        onClick={copyEmail}
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                      >
                        {emailCopied ? (
                          <CheckCircle className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    )}
                    <Button
                      onClick={() => window.open(link.href, '_blank')}
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Availability - Compact */}
            <div className="bg-surface rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-600">Available</span>
              </div>
              <p className="text-xs text-muted">
                Seeking Software Engineering & Cybersecurity roles
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}