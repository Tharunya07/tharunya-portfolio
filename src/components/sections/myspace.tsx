// components/sections/myspace-shelf.tsx
'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, ExternalLink, Star, Book, Video, Settings, Heart } from 'lucide-react';

// Types for shelf items
interface ShelfItem {
  id: string;
  title: string;
  category: 'book' | 'talk' | 'tool' | 'distro' | 'article';
  description: string;
  commentary: string;
  link?: string;
  author?: string;
  rating: number;
  image: string;
  tags: string[];
  year?: number;
}

// Sample data for the shelf
const shelfItems: ShelfItem[] = [
  {
    id: 'clean-code',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    category: 'book',
    description: 'A guide to writing readable, maintainable code that stands the test of time.',
    commentary: 'This book completely changed how I think about code quality. Every developer should read this at least twice. Uncle Bob\'s principles have saved me countless hours in debugging and code reviews.',
    author: 'Robert C. Martin',
    rating: 5,
    image: '📚',
    tags: ['software-engineering', 'best-practices', 'agile'],
    year: 2008,
    link: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884'
  },
  {
    id: 'system-design-primer',
    title: 'The System Design Primer',
    category: 'tool',
    description: 'Learn how to design large-scale systems. Prep for the system design interview.',
    commentary: 'This GitHub repo is pure gold! It breaks down complex system design concepts into digestible pieces. I reference this constantly when architecting new projects.',
    author: 'Donne Martin',
    rating: 5,
    image: '🏗️',
    tags: ['system-design', 'scalability', 'architecture'],
    link: 'https://github.com/donnemartin/system-design-primer'
  },
  {
    id: 'kali-linux',
    title: 'Kali Linux',
    category: 'distro',
    description: 'Advanced Penetration Testing Distribution',
    commentary: 'My go-to distro for security research and ethical hacking. The pre-installed toolset is incredible, and it\'s perfect for CTF competitions. Rolling release keeps everything current.',
    rating: 5,
    image: '🐉',
    tags: ['security', 'pentesting', 'linux'],
    link: 'https://www.kali.org/'
  },
  {
    id: 'aws-reinvent-keynote',
    title: 'AWS re:Invent 2023 Keynote',
    category: 'talk',
    description: 'Dr. Werner Vogels on the future of cloud computing and distributed systems.',
    commentary: 'Vogels always delivers mind-blowing insights about distributed systems. This keynote opened my eyes to the future of edge computing and how it will reshape application architecture.',
    author: 'Dr. Werner Vogels',
    rating: 5,
    image: '☁️',
    tags: ['light', 'aws', 'distributed-systems'],
    year: 2023,
    link: 'https://www.youtube.com/watch?v=example'
  },
  {
    id: 'obsidian',
    title: 'Obsidian',
    category: 'tool',
    description: 'A powerful knowledge base that works on top of a local folder of plain text Markdown files.',
    commentary: 'Obsidian revolutionized how I take notes and organize knowledge. The graph view helps me see connections between concepts I never noticed before. Perfect for research and documentation.',
    rating: 5,
    image: '🧠',
    tags: ['productivity', 'notes', 'knowledge-management'],
    link: 'https://obsidian.md/'
  },
  {
    id: 'designing-data-intensive',
    title: 'Designing Data-Intensive Applications',
    category: 'book',
    description: 'The big ideas behind reliable, scalable, and maintainable systems.',
    commentary: 'Kleppmann\'s masterpiece on modern data systems. Essential reading for understanding how to build systems that actually work at scale. Dense but incredibly rewarding.',
    author: 'Martin Kleppmann',
    rating: 5,
    image: '📊',
    tags: ['databases', 'distributed-systems', 'architecture'],
    year: 2017,
    link: 'https://dataintensive.net/'
  },
  {
    id: 'arch-linux',
    title: 'Arch Linux',
    category: 'distro',
    description: 'A lightweight and flexible Linux distribution that tries to Keep It Simple.',
    commentary: 'Using Arch taught me more about Linux internals than any course ever could. The rolling release model and AUR make it incredibly powerful for development. "I use Arch, btw" 😉',
    rating: 4,
    image: '⚡',
    tags: ['linux', 'minimalist', 'rolling-release'],
    link: 'https://archlinux.org/'
  },
  {
    id: 'docker',
    title: 'Docker',
    category: 'tool',
    description: 'Platform for developing, shipping, and running applications using containerization.',
    commentary: 'Docker simplified my development workflow immensely. No more "it works on my machine" problems! Container orchestration opened up a whole new world of deployment strategies.',
    rating: 5,
    image: '🐳',
    tags: ['containers', 'devops', 'deployment'],
    link: 'https://www.docker.com/'
  },
  {
    id: 'stripe-engineering',
    title: 'Stripe Engineering Blog',
    category: 'article',
    description: 'Technical blog covering engineering challenges at scale.',
    commentary: 'Stripe\'s engineering blog consistently delivers high-quality content about building financial infrastructure at scale. Their posts on API design and system reliability are exceptional.',
    rating: 5,
    image: '💳',
    tags: ['engineering', 'fintech', 'api-design'],
    link: 'https://stripe.com/blog/engineering'
  },
  {
    id: 'the-pragmatic-programmer',
    title: 'The Pragmatic Programmer',
    category: 'book',
    description: 'Your journey to mastery in software development.',
    commentary: 'Timeless advice that has shaped my entire approach to software development. The principles in this book apply whether you\'re writing your first program or architecting enterprise systems.',
    author: 'David Thomas & Andrew Hunt',
    rating: 5,
    image: '⚒️',
    tags: ['programming', 'career', 'best-practices'],
    year: 1999,
    link: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/'
  }
];

const categoryIcons = {
  book: <Book className="w-4 h-4" />,
  talk: <Video className="w-4 h-4" />,
  tool: <Settings className="w-4 h-4" />,
  distro: <Star className="w-4 h-4" />,
  article: <ExternalLink className="w-4 h-4" />
};

const categoryColors = {
  book: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  talk: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  tool: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  distro: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  article: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
};

export function MySpace() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All', count: shelfItems.length },
    { id: 'book', label: 'Books', count: shelfItems.filter(item => item.category === 'book').length },
    { id: 'talk', label: 'Tech Talks', count: shelfItems.filter(item => item.category === 'talk').length },
    { id: 'tool', label: 'Tools', count: shelfItems.filter(item => item.category === 'tool').length },
    { id: 'distro', label: 'Distros', count: shelfItems.filter(item => item.category === 'distro').length },
    { id: 'article', label: 'Articles', count: shelfItems.filter(item => item.category === 'article').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shelfItems 
    : shelfItems.filter(item => item.category === selectedCategory);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">My Space 💚</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Books, talks, tools, and resources that have shaped my journey as an engineer.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              className="flex items-center gap-2"
            >
              {category.id !== 'all' && categoryIcons[category.id as keyof typeof categoryIcons]}
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`flex-shrink-0 w-80 group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  hoveredItem === item.id ? 'ring-2 ring-primary' : ''
                }`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Card hover={true}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{item.image}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={categoryColors[item.category]}>
                          {categoryIcons[item.category]}
                          <span className="ml-1 capitalize">{item.category}</span>
                        </Badge>
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.has(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                            }`}
                          />
                        </Button>
                      </div>
                    </div>

                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

                    {item.author && (
                      <p className="text-sm text-muted mb-2">by {item.author}</p>
                    )}

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex">{renderStars(item.rating)}</div>
                      {item.year && (
                        <span className="text-xs text-muted">({item.year})</span>
                      )}
                    </div>

                    <p className="text-sm text-muted mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Commentary on hover */}
                    <div className={`transition-all duration-300 ${
                      hoveredItem === item.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}>
                      <div className="bg-surface rounded-lg p-3 mb-4">
                        <p className="text-sm italic text-text">
                          "{item.commentary}"
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {item.link && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.link, '_blank');
                        }}
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Explore
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-surface rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{shelfItems.length}</div>
              <div className="text-sm text-muted">Total Items</div>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">
                {shelfItems.filter(item => item.rating === 5).length}
              </div>
              <div className="text-sm text-muted">5-Star Gems</div>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">{favorites.size}</div>
              <div className="text-sm text-muted">Your Favorites</div>
            </div>
            <div className="bg-surface rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">
                {new Set(shelfItems.flatMap(item => item.tags)).size}
              </div>
              <div className="text-sm text-muted">Topics Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}