'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, User, Settings, Earth, FileText } from 'lucide-react';

interface MyspaceItem {
  title: string;
  category: string;
  description: string;
  commentary: string;
  link: string;
}``

const categoryIcons = {
  people: <User className="w-4 h-4" />,
  tech: <Settings className="w-4 h-4" />,
  community: <Earth className="w-4 h-4" />,
  article: <FileText className="w-4 h-4" />
};

const categoryColors = {
  people: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  tech: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  community: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  article: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
};

export function MySpaceContent() {
  const [items, setItems] = useState<MyspaceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const response = await fetch('/data/myspace.csv');
        if (!response.ok) {
          throw new Error('Failed to load CSV file');
        }
        
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const parsedItems: MyspaceItem[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = parseCSVLine(lines[i]);
          if (values.length >= 5) {
            parsedItems.push({
              title: values[0] || '',
              category: values[1] || '',
              description: values[2] || '',
              commentary: values[3] || '',
              link: values[4] || ''
            });
          }
        }
        
        setItems(parsedItems);
      } catch (err) {
        console.error('Error loading CSV:', err);
        setError('Failed to load content. Please check if the CSV file exists.');
        // Fallback sample data
        setItems([
          {
            title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
            category: 'book',
            description: 'A guide to writing readable, maintainable code that stands the test of time.',
            commentary: 'This book completely changed how I think about code quality. Every developer should read this at least twice.',
            link: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  // Simple CSV parser for basic cases
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  const categories = [
    { id: 'all', label: 'All', count: items.length },
    { id: 'people', label: 'People', count: items.filter(item => item.category === 'people').length },
    { id: 'tech', label: 'Tech', count: items.filter(item => item.category === 'tech').length },
    { id: 'community', label: 'Community', count: items.filter(item => item.category === 'community').length },
    { id: 'article', label: 'Articles', count: items.filter(item => item.category === 'article').length }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl text-muted">Loading content... 📚</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-xl text-red-500 mb-4">{error}</div>
          <p className="text-muted">
            Make sure to place your <code>myspace.csv</code> file in the <code>public/data/</code> directory.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-6xl mx-auto">
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

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    className={categoryColors[item.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'}
                  >
                    {categoryIcons[item.category as keyof typeof categoryIcons]}
                    <span className="ml-1 capitalize">{item.category}</span>
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-3 text-text">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Commentary */}
                <div className="bg-surface rounded-lg p-3 mb-4 border-l-4 border-primary">
                  <p className="text-sm italic text-text">
                    "{item.commentary}"
                  </p>
                </div>

                {/* Action Button */}
                {item.link && (
                  <Button
                    onClick={() => window.open(item.link, '_blank')}
                    variant="outline"
                    className="w-full group hover:bg-primary hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explore
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}