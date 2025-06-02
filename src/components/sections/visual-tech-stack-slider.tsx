// components/sections/visual-tech-stack-slider.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Zap, Code, Database, Cloud, Shield, Settings } from 'lucide-react';

// Tech stack item interface
interface TechItem {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'database' | 'cloud' | 'security' | 'devops';
  icon: string;
  proficiency: number; // 1-100
  experience: string; // e.g., "3+ years"
  commentary: string;
  projects: string[];
  learningStatus: 'expert' | 'proficient' | 'learning' | 'exploring';
  lastUsed: string;
  certification?: string;
}

// Function to parse tech-stack.txt file
const parseTechStackTxt = (content: string): TechItem[] => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  const items: TechItem[] = [];
  
  let currentItem: Partial<TechItem> = {};
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('---')) {
      // Start of new item
      if (currentItem.name) {
        items.push(currentItem as TechItem);
      }
      currentItem = {};
    } else if (trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim();
      
      switch (key.toLowerCase()) {
        case 'name':
          currentItem.name = value;
          currentItem.id = value.toLowerCase().replace(/[^a-z0-9]/g, '-');
          break;
        case 'category':
          currentItem.category = value as TechItem['category'];
          break;
        case 'icon':
          currentItem.icon = value;
          break;
        case 'proficiency':
          currentItem.proficiency = parseInt(value) || 50;
          break;
        case 'experience':
          currentItem.experience = value;
          break;
        case 'commentary':
          currentItem.commentary = value;
          break;
        case 'projects':
          currentItem.projects = value.split(',').map(p => p.trim());
          break;
        case 'learningstatus':
          currentItem.learningStatus = value as TechItem['learningStatus'];
          break;
        case 'lastused':
          currentItem.lastUsed = value;
          break;
        case 'certification':
          currentItem.certification = value;
          break;
      }
    }
  });
  
  // Add last item
  if (currentItem.name) {
    items.push(currentItem as TechItem);
  }
  
  return items;
};

// Sample content for tech-stack.txt
const sampleTechStackContent = `---
name: Python
category: language
icon: 🐍
proficiency: 95
experience: 4+ years
commentary: My go-to language for everything from web development to machine learning. I love its readability and vast ecosystem. Used it extensively at Nokia for AI-driven ChatOps and at CSU for IoT systems.
projects: CyHelp, Wiresnitch, Nokia ChatOps, CSU IoT System
learningstatus: expert
lastused: Currently using
certification: Python Institute PCAP

---
name: JavaScript/TypeScript
category: language
icon: ⚡
proficiency: 88
experience: 3+ years
commentary: Essential for modern web development. TypeScript has been a game-changer for catching bugs early and improving code maintainability. Building this portfolio really deepened my understanding of React and Next.js.
projects: Portfolio Website, CipherYou UI, Nokia Dashboard
learningstatus: proficient
lastused: Currently using

---
name: Docker
category: devops
icon: 🐳
proficiency: 85
experience: 2+ years
commentary: Containerization revolutionized my development workflow. No more "works on my machine" issues! Used extensively at Nokia for 5G infrastructure deployment and personal projects.
projects: Wiresnitch, Nokia COSI Architecture, CI/CD Pipelines
learningstatus: proficient
lastused: 1 week ago

---
name: Kubernetes
category: devops
icon: ☸️
proficiency: 75
experience: 1.5+ years
commentary: Container orchestration at scale. Learning K8s at Nokia was challenging but incredibly rewarding. The complexity is worth it when you see how elegantly it handles service discovery and scaling.
projects: Nokia MN RAN COSI, Microservices Deployment
learningstatus: proficient
lastused: 2 weeks ago
certification: CKA (planned)

---
name: AWS
category: cloud
icon: ☁️
proficiency: 80
experience: 2+ years
commentary: My primary cloud platform. The breadth of services is amazing - from simple S3 storage to complex Lambda functions. Nokia's cloud architecture taught me to think about reliability and cost optimization.
projects: Nokia Cloud Infrastructure, Personal Projects
learningstatus: proficient
lastused: 3 days ago
certification: AWS Solutions Architect (in progress)

---
name: React/Next.js
category: framework
icon: ⚛️
proficiency: 82
experience: 2+ years
commentary: The component-based architecture clicked immediately for me. Next.js added the perfect balance of performance and developer experience. This portfolio is built with Next.js and I love how it handles SSR.
projects: Portfolio Website, CipherYou Interface, Dashboard UIs
learningstatus: proficient
lastused: Currently using

---
name: PostgreSQL
category: database
icon: 🐘
proficiency: 78
experience: 2+ years
commentary: My favorite relational database. The advanced features like JSON support and full-text search make it incredibly versatile. Used it for complex analytics at Anheuser-Busch.
projects: CyHelp Backend, Analytics Dashboards, CSU Lab Management
learningstatus: proficient
lastused: 1 week ago

---
name: Linux Systems
category: devops
icon: 🐧
proficiency: 90
experience: 5+ years
commentary: Linux is my daily driver and development environment. From basic shell scripting to advanced system administration, I'm comfortable across multiple distributions. Arch Linux taught me the internals!
projects: All Projects, Server Administration, Network Monitoring
learningstatus: expert
lastused: Currently using

---
name: OpenCV
category: framework
icon: 👁️
proficiency: 72
experience: 1+ years
commentary: Computer vision and image processing powerhouse. Used it extensively for CyHelp to detect harmful content. The learning curve is steep but the capabilities are incredible for AI applications.
projects: CyHelp Content Detection, Image Processing Pipeline
learningstatus: proficient
lastused: 1 month ago

---
name: Terraform
category: devops
icon: 🏗️
proficiency: 70
experience: 1+ years
commentary: Infrastructure as Code is the future. Terraform makes cloud resource management reproducible and version-controlled. Game-changer for deploying consistent environments across dev/staging/prod.
projects: Nokia Infrastructure, CI/CD Pipelines
learningstatus: proficient
lastused: 2 weeks ago

---
name: MongoDB
category: database
icon: 🍃
proficiency: 76
experience: 2+ years
commentary: NoSQL flexibility for rapid prototyping and document-based data. Perfect for projects where the data structure evolves quickly. Used it for CyHelp to store complex ML model results.
projects: CyHelp, Rapid Prototypes, Analytics Storage
learningstatus: proficient
lastused: 2 weeks ago

---
name: Jenkins
category: devops
icon: 🤖
proficiency: 73
experience: 1.5+ years
commentary: CI/CD automation workhorse. At Nokia, Jenkins pipelines automated our entire deployment process, saving hours of manual work. The plugin ecosystem is vast but can be overwhelming.
projects: Nokia 5G Deployment, Automated Testing, Release Pipelines
learningstatus: proficient
lastused: 3 weeks ago

---
name: Flask
category: framework
icon: 🌶️
proficiency: 80
experience: 2+ years
commentary: Lightweight and flexible Python web framework. I love its simplicity and how quickly you can get APIs up and running. Used it for multiple project backends including CyHelp.
projects: CyHelp API, Microservices, Prototype APIs
learningstatus: proficient
lastused: 1 month ago

---
name: Git/GitHub
category: devops
icon: 📚
proficiency: 92
experience: 4+ years
commentary: Version control is essential for any serious development. I've used Git for everything from solo projects to large team collaborations. GitHub Actions for CI/CD is particularly powerful.
projects: All Projects, Open Source Contributions, Team Collaboration
learningstatus: expert
lastused: Currently using

---
name: Wireshark
category: security
icon: 🦈
proficiency: 68
experience: 1+ years
commentary: Network protocol analyzer that's essential for understanding network traffic. Building Wiresnitch taught me so much about packet analysis and network security fundamentals.
projects: Wiresnitch Development, Network Debugging, Security Analysis
learningstatus: learning
lastused: 2 weeks ago`;

const categoryIcons = {
  language: <Code className="w-4 h-4" />,
  framework: <Zap className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  cloud: <Cloud className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  devops: <Settings className="w-4 h-4" />
};

const categoryColors = {
  language: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  framework: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  database: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  cloud: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300',
  security: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  devops: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
};

const statusColors = {
  expert: 'bg-green-500',
  proficient: 'bg-blue-500',
  learning: 'bg-yellow-500',
  exploring: 'bg-purple-500'
};

export function VisualTechStackSlider() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [techStack, setTechStack] = useState<TechItem[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load tech-stack.txt file on component mount
  useEffect(() => {
    const loadTechStack = async () => {
      try {
        // Try to fetch from public folder
        const response = await fetch('/data/tech-stack.txt');
        if (response.ok) {
          const content = await response.text();
          const items = parseTechStackTxt(content);
          setTechStack(items);
        } else {
          // Fallback to sample content
          console.log('Using sample content - place your tech-stack.txt in /public/data/');
          const items = parseTechStackTxt(sampleTechStackContent);
          setTechStack(items);
        }
      } catch (error) {
        console.log('Error loading tech-stack.txt, using sample content:', error);
        const items = parseTechStackTxt(sampleTechStackContent);
        setTechStack(items);
      } finally {
        setLoading(false);
      }
    };

    loadTechStack();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScroll && !loading) {
      autoScrollIntervalRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const maxScroll = container.scrollWidth - container.clientWidth;
          
          if (container.scrollLeft >= maxScroll) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            container.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3000);
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [autoScroll, loading]);

  const categories = [
    { id: 'all', label: 'All Tech', count: techStack.length },
    { id: 'language', label: 'Languages', count: techStack.filter(tech => tech.category === 'language').length },
    { id: 'framework', label: 'Frameworks', count: techStack.filter(tech => tech.category === 'framework').length },
    { id: 'database', label: 'Databases', count: techStack.filter(tech => tech.category === 'database').length },
    { id: 'cloud', label: 'Cloud', count: techStack.filter(tech => tech.category === 'cloud').length },
    { id: 'devops', label: 'DevOps', count: techStack.filter(tech => tech.category === 'devops').length },
    { id: 'security', label: 'Security', count: techStack.filter(tech => tech.category === 'security').length }
  ];

  const filteredTech = selectedCategory === 'all' 
    ? techStack 
    : techStack.filter(tech => tech.category === selectedCategory);

  const scroll = (direction: 'left' | 'right') => {
    setAutoScroll(false);
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
    // Resume auto-scroll after manual interaction
    setTimeout(() => setAutoScroll(true), 5000);
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 75) return 'Proficient';
    if (proficiency >= 60) return 'Intermediate';
    return 'Learning';
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-2xl text-muted">Loading tech stack... ⚡</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-background via-surface to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">Tech Stack Arsenal ⚡</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Technologies I work with, my experience levels, and honest commentary about each tool.
          </p>
          <p className="text-sm text-muted mt-2">
            💡 Loaded from <code>/public/data/tech-stack.txt</code> - Update the file to customize this section!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setAutoScroll(false);
                setTimeout(() => setAutoScroll(true), 3000);
              }}
              variant={selectedCategory === category.id ? 'primary' : 'outline'}
              className="flex items-center gap-2"
            >
              {category.id !== 'all' && categoryIcons[category.id as keyof typeof categoryIcons]}
              {category.label} ({category.count})
            </Button>
          ))}
        </div>

        {/* Auto-scroll toggle */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setAutoScroll(!autoScroll)}
            variant="ghost"
            size="sm"
            className="text-muted"
          >
            {autoScroll ? '⏸️ Pause Auto-scroll' : '▶️ Resume Auto-scroll'}
          </Button>
        </div>

        {/* Tech Stack Slider */}
        <div className="relative">
          <Button
            onClick={() => scroll('left')}
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm shadow-lg"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={() => scroll('right')}
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-background/90 backdrop-blur-sm shadow-lg"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {filteredTech.map((tech) => (
              <Card
                key={tech.id}
                className={`flex-shrink-0 w-80 group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                  hoveredTech === tech.id ? 'ring-2 ring-primary shadow-xl' : ''
                }`}
                hover={true}
                onMouseEnter={() => setHoveredTech(tech.id)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{tech.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-sm text-muted">{tech.experience}</p>
                      </div>
                    </div>
                    <Badge className={categoryColors[tech.category]}>
                      {categoryIcons[tech.category]}
                      <span className="ml-1 capitalize">{tech.category}</span>
                    </Badge>
                  </div>

                  {/* Proficiency */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Proficiency</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{tech.proficiency}%</span>
                        <Badge className={`${statusColors[tech.learningStatus]} text-white text-xs`}>
                          {getProficiencyLabel(tech.proficiency)}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={tech.proficiency} 
                      className="h-2"
                    />
                  </div>

                  {/* Commentary (shown on hover) */}
                  <div className={`transition-all duration-300 ${
                    hoveredTech === tech.id ? 'max-h-32 opacity-100 mb-4' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}>
                    <div className="bg-surface rounded-lg p-3 border-l-4 border-primary">
                      <p className="text-sm italic text-text">
                        "{tech.commentary}"
                      </p>
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Recent Projects:</p>
                    <div className="flex flex-wrap gap-1">
                      {tech.projects?.slice(0, 3).map((project) => (
                        <Badge key={project} variant="outline" className="text-xs">
                          {project}
                        </Badge>
                      ))}
                      {tech.projects && tech.projects.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tech.projects.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center text-xs text-muted">
                    <span>Last used: {tech.lastUsed}</span>
                    {tech.certification && (
                      <Badge variant="outline" className="text-xs">
                        🏆 {tech.certification}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {techStack.filter(tech => tech.proficiency >= 90).length}
            </div>
            <div className="text-sm text-muted">Expert Level</div>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {techStack.filter(tech => tech.proficiency >= 75 && tech.proficiency < 90).length}
            </div>
            <div className="text-sm text-muted">Proficient</div>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {techStack.length > 0 ? Math.round(techStack.reduce((sum, tech) => sum + tech.proficiency, 0) / techStack.length) : 0}%
            </div>
            <div className="text-sm text-muted">Avg. Proficiency</div>
          </div>
          <div className="bg-surface rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {techStack.filter(tech => tech.certification).length}
            </div>
            <div className="text-sm text-muted">Certifications</div>
          </div>
        </div>
      </div>
    </section>
  );
}