'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Trophy } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  image: string;
  featured?: boolean;
  award?: string;
}

const projects: Project[] = [
  {
    id: 'cipheryou',
    title: 'CipherYou',
    description: 'A secure file encryption tool built with Python featuring AES-256 encryption, PBKDF2 key derivation, and intuitive PyQt5 interface for cross-platform file protection.',
    techStack: ['Python', 'PyQt5', 'Cryptography', 'AES-256'],
    githubUrl: 'https://github.com/Tharunya07/CipherYou',
    image: '/images/projects/cipheryou.jpg',
    featured: true
  },
  {
    id: 'cyhelp',
    title: 'CyHelp',
    description: 'AI-powered content safety detection system using computer vision and NLP. Winner of Global CyberPeace Challenge 3.0 for innovative approach to online safety.',
    techStack: ['OpenCV', 'Flask', 'Machine Learning', 'NLP', 'REST API'],
    githubUrl: 'https://github.com/Tharunya07/CyHelp',
    image: '/images/projects/cyhelp.jpg',
    featured: true,
    award: 'CyberPeace Winner'
  },
  {
    id: 'wiresnitch',
    title: 'Wiresnitch',
    description: 'Real-time network monitoring system for Linux environments with interactive dashboard, packet inspection, anomaly detection, and automated security analysis.',
    techStack: ['Linux', 'Docker', 'Network Security', 'Python', 'CI/CD'],
    githubUrl: 'https://github.com/Tharunya07/Wiresnitch',
    image: '/images/projects/wiresnitch.jpg',
    featured: true
  },
  {
    id: 'jumpscape',
    title: 'Jumpscape',
    description: 'Interactive web-based platform game built with modern JavaScript, featuring smooth animations, level progression, and responsive controls for engaging gameplay.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Game Development'],
    githubUrl: 'https://github.com/Tharunya07/Jumpscape',
    liveUrl: 'https://tharunya07.github.io/Jumpscape',
    image: '/images/projects/jumpscape.jpg'
  },
  {
    id: 'pcb-defect-detection',
    title: 'PCB Defect Detection',
    description: 'Machine learning system for automated PCB quality control using computer vision to detect manufacturing defects and ensure hardware reliability.',
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'Machine Learning', 'Computer Vision'],
    githubUrl: 'https://github.com/Tharunya07/PCB-Defect-Detection',
    image: '/images/projects/pcb-detection.jpg'
  },
  {
    id: 'markitdown',
    title: 'MarkItDown',
    description: 'Efficient document converter that transforms various file formats to clean Markdown, streamlining documentation workflows and content management.',
    techStack: ['Python', 'File Processing', 'Markdown', 'CLI Tool'],
    githubUrl: 'https://github.com/Tharunya07/MarkItDown',
    image: '/images/projects/markitdown.jpg'
  }
];

export function Projects() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-primary">Projects</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            A collection of projects showcasing my expertise in cybersecurity, AI/ML, web development, and system design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} project screenshot`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="default" className="bg-primary/90 text-white">
                      Featured
                    </Badge>
                  </div>
                )}
                {project.award && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="default" className="bg-amber-500 text-white flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      Winner
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {project.award && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mb-2">
                      🏆 {project.award}
                    </p>
                  )}
                  <p className="text-muted text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  {project.liveUrl && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More on GitHub */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="group"
            onClick={() => window.open('https://github.com/Tharunya07', '_blank')}
          >
            <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}