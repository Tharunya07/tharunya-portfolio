// components/sections/blogs-section.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

// Blog post type
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  emoji: string;
  mediumUrl: string;
  publishedAt: string;
  thumbnail?: string;
}

// Medium RSS feed parser
const parseMediumRSS = async (username: string): Promise<BlogPost[]> => {
  try {
    const rssUrl = `https://medium.com/feed/@${username}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Medium posts');
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('RSS parsing failed: ' + (data.message || 'Unknown error'));
    }
    
    if (!data.items || data.items.length === 0) {
      throw new Error('No posts found');
    }
    
    return data.items.map((item: any, index: number) => {
      // Calculate read time based on content length
      const contentLength = item.content?.length || item.description?.length || 1000;
      const wordsPerMinute = 200;
      const wordCount = contentLength / 5; // Rough estimate: 5 chars per word
      const readTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute)) + ' min read';
      
      // Extract clean excerpt from description
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = item.description || item.content || '';
      const textContent = tempDiv.textContent || tempDiv.innerText || '';
      const cleanExcerpt = textContent
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 250);
      const excerpt = cleanExcerpt.length === 250 ? cleanExcerpt + '...' : cleanExcerpt;
      
      // Extract tags from categories or content
      let tags = [];
      if (item.categories && Array.isArray(item.categories)) {
        tags = item.categories.slice(0, 5);
      } else {
        // Fallback: extract common tech terms from title/content
        const techTerms = ['javascript', 'python', 'react', 'nodejs', 'ai', 'ml', 'cybersecurity', 
                          'devops', 'cloud', 'aws', 'docker', 'kubernetes', 'security', 'data'];
        const titleLower = item.title.toLowerCase();
        const contentLower = textContent.toLowerCase();
        
        tags = techTerms.filter(term => 
          titleLower.includes(term) || contentLower.includes(term)
        ).slice(0, 3);
        
        if (tags.length === 0) {
          tags = ['blog', 'tech'];
        }
      }
      
      // Assign emoji based on content themes
      const getEmoji = (title: string, content: string, tags: string[]) => {
        const text = (title + ' ' + content + ' ' + tags.join(' ')).toLowerCase();
        
        if (text.includes('security') || text.includes('cybersecurity') || text.includes('ctf')) return '🔒';
        if (text.includes('ai') || text.includes('machine learning') || text.includes('ml')) return '🤖';
        if (text.includes('light') || text.includes('aws') || text.includes('azure')) return '☁️';
        if (text.includes('devops') || text.includes('docker') || text.includes('kubernetes')) return '🚀';
        if (text.includes('data') || text.includes('analytics') || text.includes('database')) return '📊';
        if (text.includes('web') || text.includes('frontend') || text.includes('react')) return '🌐';
        if (text.includes('mobile') || text.includes('app') || text.includes('ios') || text.includes('android')) return '📱';
        if (text.includes('network') || text.includes('packet') || text.includes('monitoring')) return '🔍';
        if (text.includes('internship') || text.includes('job') || text.includes('career')) return '💼';
        if (text.includes('project') || text.includes('build') || text.includes('development')) return '🛠️';
        if (text.includes('learning') || text.includes('education') || text.includes('tutorial')) return '📚';
        if (text.includes('competition') || text.includes('hackathon') || text.includes('challenge')) return '🏆';
        
        // Default emojis rotation
        const defaultEmojis = ['💡', '🔧', '⚡', '🎯', '🧠', '🔥'];
        return defaultEmojis[index % defaultEmojis.length];
      };
      
      // Extract thumbnail if available
      let thumbnail = null;
      if (item.thumbnail) {
        thumbnail = item.thumbnail;
      } else if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }
      }
      
      return {
        id: item.guid || `medium-${Date.now()}-${index}`,
        title: item.title || 'Untitled Post',
        excerpt,
        date: new Date(item.pubDate).toISOString().split('T')[0],
        readTime,
        tags,
        emoji: getEmoji(item.title || '', textContent, tags),
        mediumUrl: item.link,
        publishedAt: item.pubDate,
        thumbnail
      };
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    throw error;
  }
};

export function BlogsSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Load Medium posts
  const loadMediumPosts = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError(null);
    
    try {
      const posts = await parseMediumRSS('Tharunya');
      setBlogPosts(posts);
      setLastUpdated(new Date());
      setError(null);
    } catch (error) {
      console.error('Error loading Medium posts:', error);
      setError(error instanceof Error ? error.message : 'Failed to load blog posts');
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    loadMediumPosts();
  }, []);

  // Auto-refresh every 5 minutes to get latest posts
  useEffect(() => {
    const interval = setInterval(() => {
      loadMediumPosts(false); // Refresh without showing loading state
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const openMediumPost = (post: BlogPost) => {
    window.open(post.mediumUrl, '_blank');
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 text-2xl text-muted">
            <RefreshCw className="w-6 h-6 animate-spin" />
            Loading latest blog posts from Medium...
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-orange-800 dark:text-orange-200">
                Unable to Load Blog Posts
              </h3>
              <p className="text-orange-700 dark:text-orange-300 mb-6">
                {error}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => loadMediumPosts()}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-600 dark:text-orange-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={() => window.open('https://medium.com/@Tharunya', '_blank')}
                  variant="outline"
                  className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-600 dark:text-orange-300"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Medium Directly
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-200">
                No Blog Posts Found
              </h3>
              <p className="text-blue-700 dark:text-blue-300 mb-6">
                I haven&apos;t published any posts on Medium yet, or they&apos;re not publicly available.
              </p>
              <Button 
                onClick={() => window.open('https://medium.com/@Tharunya', '_blank')}
                variant="outline"
                className="border-blue-300 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-300"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Check Medium Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Last Updated Info */}
        {lastUpdated && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 text-sm text-muted bg-surface px-4 py-2 rounded-lg">
              <RefreshCw className="w-3 h-3" />
              Last synced: {lastUpdated.toLocaleTimeString()}
              <Button
                onClick={() => loadMediumPosts()}
                variant="ghost"
                size="sm"
                className="h-6 px-2 ml-2"
              >
                Refresh
              </Button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openMediumPost(post)}
            >
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
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {post.tags.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 4} more
                    </Badge>
                  )}
                </div>
                
                {/* Date and Read Time */}
                <div className="flex items-center gap-4 text-sm text-muted mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                
                {/* Read on Medium Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                  variant="outline"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read on Medium
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Posts Link */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            className="group"
            onClick={() => window.open('https://medium.com/@Tharunya', '_blank')}
          >
            View All Posts on Medium
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}