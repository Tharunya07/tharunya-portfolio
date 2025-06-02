// components/sections/stuff-i-love-cards.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star, Book, Video, Settings, Heart } from 'lucide-react';

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

// Function to parse stuff-i-love.txt file
const parseStuffILoveTxt = (content: string): ShelfItem[] => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const items: ShelfItem[] = [];
  
  let currentItem: Partial<ShelfItem> = {};
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('---')) {
      if (currentItem.title) {
        items.push(currentItem as ShelfItem);
      }
      currentItem = {};
    } else if (trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim();
      
      switch (key.toLowerCase()) {
        case 'title':
          currentItem.title = value;
          currentItem.id = value.toLowerCase().replace(/[^a-z0-9]/g, '-');
          break;
        case 'category':
          currentItem.category = value as ShelfItem['category'];
          break;
        case 'description':
          currentItem.description = value;
          break;
        case 'commentary':
          currentItem.commentary = value;
          break;
        case 'link':
          currentItem.link = value;
          break;
        case 'author':
          currentItem.author = value;
          break;
        case 'rating':
          currentItem.rating = parseInt(value) || 5;
          break;
        case 'image':
          currentItem.image = value;
          break;
        case 'tags':
          currentItem.tags = value.split(',').map(tag => tag.trim());
          break;
        case 'year':
          currentItem.year = parseInt(value);
          break;
      }
    }
  });
  
  if (currentItem.title) {
    items.push(currentItem as ShelfItem);
  }
  
  return items;
};

// Sample content for stuff-i-love.txt
const sampleStuffILoveContent = `---
title: Clean Code: A Handbook of Agile Software Craftsmanship
category: book
description: A guide to writing readable, maintainable code that stands the test of time.
commentary: This book completely changed how I think about code quality. Every developer should read this at least twice. Uncle Bob's principles have saved me countless hours in debugging and code reviews.
author: Robert C. Martin
rating: 5
image: 📚
tags: software-engineering, best-practices, agile
year: 2008
link: https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884
---`;

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

export function StuffILoveCards() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [shelfItems, setShelfItems] = useState<ShelfItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stuff-i-love.txt file on component mount
  useEffect(() => {
    const loadStuffILove = async () => {
      try {
        const response = await fetch('/data/stuff-i-love.txt');
        if (response.ok) {
          const content = await response.text();
          const items = parseStuffILoveTxt(content);
          setShelfItems(items);
        } else {
          const items = parseStuffILoveTxt(sampleStuffILoveContent);
          setShelfItems(items);
        }
      } catch (error) {
        const items = parseStuffILoveTxt(sampleStuffILoveContent);
        setShelfItems(items);
      } finally {
        setLoading(false);
      }
    };

    loadStuffILove();
  }, []);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl text-muted">Loading favorite resources... 📚</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
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

        {/* Simple Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="h-full" hover={true}>
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{item.image}</div>
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
                      className="h-6 w-6"
                    >
                      <Heart
                        className={`w-3 h-3 ${
                          favorites.has(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {item.title}
                </h3>

                {/* Author */}
                {item.author && (
                  <p className="text-sm text-muted mb-2">by {item.author}</p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">{renderStars(item.rating)}</div>
                  {item.year && (
                    <span className="text-xs text-muted">({item.year})</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Commentary - Always Visible */}
                <div className="bg-surface rounded-lg p-3 mb-4 border-l-4 border-primary">
                  <p className="text-sm italic text-text line-clamp-3">
                    "{item.commentary}"
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags?.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Button */}
                {item.link && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item.link, '_blank');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <ExternalLink className="w-3 h-3 mr-2" />
                    Explore
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}