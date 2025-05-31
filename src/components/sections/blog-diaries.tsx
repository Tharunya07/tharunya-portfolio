// components/sections/blog-diaries.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight, ExternalLink, Heart, MessageCircle } from 'lucide-react';

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  emoji: string;
  likes: number;
  comments: number;
}

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 'first-ctf-win',
    title: 'My First CTF Win: CyHelp and the Global CyberPeace Challenge',
    excerpt: 'How I built an AI-powered content safety detection system and won my first major cybersecurity competition.',
    content: `# The Beginning 🎯

I still remember the moment I clicked "submit" on my CyHelp project for the Global CyberPeace Challenge 3.0. My heart was racing, palms sweaty, and I had that familiar mix of excitement and terror that comes with putting your work out there.

## The Problem Space 🔍

The challenge was to create something that could make the internet safer. After researching various approaches, I decided to tackle content safety detection using AI. The idea was simple but powerful: what if we could automatically detect harmful content in images and videos before it spreads?

## Building CyHelp 🛠️

The tech stack came together piece by piece:
- **OpenCV** for image processing
- **Flask** for the web framework  
- **REST API** for seamless integration
- **NoSQL** for flexible data storage
- **ML/NLP** for intelligent detection

The hardest part wasn't the coding—it was training the model to be accurate without being overly aggressive. False positives could silence legitimate content, while false negatives could let harmful material through.

## The Victory Moment 🏆

When they announced CyHelp as the winner, I honestly couldn't believe it. All those late nights debugging, all the iterations on the ML pipeline, all the stress testing—it had paid off.

But the real victory wasn't the award. It was knowing that something I built could potentially make the internet a safer place for everyone.

## What I Learned 📚

1. **Start with the problem, not the solution**
2. **AI is only as good as your data**
3. **User experience matters even in security tools**
4. **Testing, testing, testing**

The competition taught me that cybersecurity isn't just about protecting systems—it's about protecting people.`,
    date: '2023-05-15',
    readTime: '4 min read',
    tags: ['cybersecurity', 'ai', 'competition', 'opencv'],
    emoji: '🏆',
    likes: 42,
    comments: 8
  },
  {
    id: 'nokia-internship-lessons',
    title: 'Nokia Internship: LLMs, 5G, and Learning to Scale',
    excerpt: 'My experience building AI-driven ChatOps models and optimizing 5G infrastructure at Nokia.',
    content: `# From Student to Software Engineer 🚀

Walking into Nokia for my first day as a Software Engineering Intern, I felt like I was entering the future. The scale of telecommunications infrastructure is mind-boggling when you see it up close.

## The ChatOps Challenge 🤖

My main project was developing an AI-driven LLM ChatOps model. The goal? Streamline product management workflows across 6 different teams. Sounds simple, right? 

Wrong.

The complexity came from the fact that each team had their own workflows, terminology, and priorities. The ChatOps model had to be intelligent enough to understand context from any team and route requests appropriately.

## Working with 5G at Scale 📡

The most eye-opening experience was working on the MN RAN COSI architecture. When you're dealing with infrastructure that serves millions of users, every optimization matters.

We managed to:
- Increase scalability by 17%
- Improve fault tolerance significantly  
- Reduce server downtime by over 4 hours per month

Those numbers might seem small, but when multiplied across Nokia's global infrastructure, the impact is massive.

## The DevOps Reality Check ⚙️

Theory vs. practice hit me hard during the DevOps initiatives. CI/CD pipelines look elegant in diagrams, but in reality, they're complex beasts that need constant attention.

Some key lessons:
- **Monitoring is everything** - If you can't measure it, you can't improve it
- **Automation saves time** - But only if you design it thoughtfully
- **Communication is key** - Technical problems are often people problems

## Reflection 💭

The Nokia internship taught me that software engineering at scale is fundamentally different from personal projects. It's not just about writing code that works—it's about writing code that works reliably for millions of people.

Every line of code you write could potentially affect someone's ability to call their family, access emergency services, or run their business. That's both terrifying and incredibly motivating.`,
    date: '2024-01-20',
    readTime: '5 min read',
    tags: ['internship', '5g', 'llm', 'devops', 'nokia'],
    emoji: '📡',
    likes: 38,
    comments: 12
  },
  {
    id: 'building-wiresnitch',
    title: 'Building Wiresnitch: Learning Network Security the Hard Way',
    excerpt: 'The journey of creating a real-time network monitoring tool and what I learned about packet analysis.',
    content: `# The Itch to Build 🔍

It started with a simple question: "What's actually happening on my network?" Sure, there are tools like Wireshark, but I wanted to build something from scratch to really understand network traffic analysis.

## The Technical Deep Dive 🛠️

Wiresnitch became my playground for learning:
- **Packet capture** using raw sockets
- **Real-time analysis** without killing performance
- **Anomaly detection** using basic heuristics
- **Docker containerization** for easy deployment

The hardest part was handling the sheer volume of data. On a busy network, you're looking at thousands of packets per second. Processing them all in real-time while maintaining a responsive UI was... challenging.

## The "Aha!" Moments 💡

1. **Filtering is everything** - You can't analyze what you can't isolate
2. **Visualization matters** - Raw data is useless without context
3. **Performance is security** - A slow security tool is a useless security tool

## What's Next? 🚀

Wiresnitch is far from perfect, but it taught me more about networking in a few months than years of theory. The next version will include:
- Machine learning for better anomaly detection  
- Integration with threat intelligence feeds
- Better visualization of network topologies

Sometimes the best way to learn something is to build it yourself, even if others have done it better.`,
    date: '2024-03-10',
    readTime: '3 min read',
    tags: ['networking', 'security', 'docker', 'linux'],
    emoji: '🕷️',
    likes: 31,
    comments: 6
  },
  {
    id: 'csu-teaching-assistant',
    title: 'From Student to TA: Teaching While Learning',
    excerpt: 'My experience as a Graduate Teaching Assistant at CSU and what it taught me about engineering education.',
    content: `# The Role Reversal 👨‍🏫

Becoming a Graduate Teaching Assistant at CSU's Engineering Manufacturing Education Center was a complete role reversal. One day I'm struggling with concepts, the next I'm explaining them to 50+ students.

## The IoT Challenge 🔧

My main project involves engineering an IoT-enabled Access Management System. It sounds fancy, but it's basically a smart way to track who's in the lab and what they're working on.

The stack:
- **Python** for the core logic
- **SQL** for data management  
- **Linux systems** for deployment
- **IoT sensors** for real-time tracking

## Teaching Insights 📚

What I learned about teaching:

1. **You don't truly understand something until you can explain it simply**
2. **Every student learns differently** - Some need visuals, others need hands-on experience
3. **Patience is a skill** - And one I'm still developing
4. **Questions are gifts** - They show students are thinking

## The Unexpected Benefits 🎁

Teaching has made me a better engineer:
- **Communication skills** improved dramatically
- **Problem-solving** became more systematic
- **Documentation** became second nature
- **Empathy** for user experience grew

## Looking Forward 🔮

This role has been one of the most rewarding experiences of my academic journey. There's something magical about that moment when a concept finally clicks for a student—it reminds me why I fell in love with engineering in the first place.`,
    date: '2024-04-25',
    readTime: '4 min read',
    tags: ['teaching', 'iot', 'csu', 'python', 'education'],
    emoji: '👨‍🏫',
    likes: 28,
    comments: 9
  }
];

export function BlogDiaries() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (selectedPost) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={() => setSelectedPost(null)} 
            variant="outline" 
            className="mb-8"
          >
            ← Back to Blog
          </Button>
          
          <article className="prose prose-lg dark:prose-invert max-w-none">
            <div className="not-prose mb-8">
              <div className="flex items-center gap-2 text-4xl mb-4">
                <span>{selectedPost.emoji}</span>
                <h1 className="text-4xl font-bold text-primary">{selectedPost.title}</h1>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(selectedPost.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </div>

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: selectedPost.content
                  .replace(/^# /gm, '## ')
                  .replace(/^## /gm, '### ')
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n\n/g, '</p><p>')
                  .replace(/^(.*)$/gm, '<p>$1</p>')
                  .replace(/<p><\/p>/g, '')
                  .replace(/<p>### (.*?)<\/p>/g, '<h3>$1</h3>')
                  .replace(/<p>## (.*?)<\/p>/g, '<h2>$1</h2>')
                  .replace(/<p># (.*?)<\/p>/g, '<h1>$1</h1>')
                  .replace(/<p>(\d+)\. \*\*(.*?)\*\* - (.*?)<\/p>/g, '<li><strong>$2</strong> - $3</li>')
              }}
            />

            <div className="not-prose mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => handleLike(selectedPost.id)}
                    variant="ghost"
                    className={`flex items-center gap-2 ${likedPosts.has(selectedPost.id) ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`w-4 h-4 ${likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                    {selectedPost.likes + (likedPosts.has(selectedPost.id) ? 1 : 0)}
                  </Button>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    {selectedPost.comments} comments
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">Build Diaries 📔</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My journey through code, challenges, and discoveries. Real stories from real projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{post.emoji}</span>
                  <div className="flex-1">
                    <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setSelectedPost(post)}
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  variant="outline"
                >
                  Read Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="group">
            View All Posts
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}