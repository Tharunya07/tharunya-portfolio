// components/sections/experience-timeline.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ExternalLink, Award, Users, TrendingUp, Building, Code, Database } from 'lucide-react';

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  type: 'full-time' | 'internship' | 'part-time';
  description: string[];
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const experiences: Experience[] = [
  {
    id: 'csu-ta',
    company: 'Colorado State University',
    position: 'Graduate Teaching Assistant',
    location: 'Fort Collins, CO',
    duration: 'Jan 2025 - Present',
    type: 'part-time',
    description: [
      'Engineering an IoT-enabled Access Management System using Python, SQL, and Linux systems',
      'Managing cross-college collaborations to optimize procurement and supply chain processes',
      'Instructing and mentoring 50+ students on manufacturing processes and industrial automation'
    ],
    achievements: [
      'Automated lab security protocols for 200+ participants per semester',
      'Improved hands-on training experience for students',
      'Streamlined resource allocation across departments'
    ],
    technologies: ['Python', 'SQL', 'Linux', 'IoT', 'Industrial Automation'],
    companyUrl: 'https://www.colostate.edu/',
    icon: Users
  },
  {
    id: 'nokia',
    company: 'Nokia',
    position: 'Software Engineering Intern',
    location: 'Bengaluru, India',
    duration: 'Oct 2023 - Jul 2024',
    type: 'internship',
    description: [
      'Devised and integrated an AI-driven LLM ChatOps model using Python, NLP, and Machine Learning',
      'Refined cloud-based MN RAN COSI architecture using AWS, Docker, and Kubernetes',
      'Automated 5G network deployment pipelines with CI/CD workflows'
    ],
    achievements: [
      'Reduced manual effort by 40% through intelligent automation',
      'Increased system scalability by 17%',
      'Minimized server downtime by 4+ hours per month',
      'Reduced operational lag times by 35%',
      'Improved deployment reliability by 29%'
    ],
    technologies: ['Python', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'NLP', 'ML'],
    companyUrl: 'https://www.nokia.com/',
    icon: Code
  },
  {
    id: 'anheuser-busch',
    company: 'Anheuser-Busch InBev',
    position: 'Data Analyst Intern',
    location: 'Bengaluru, India',
    duration: 'Oct 2022 - Apr 2023',
    type: 'internship',
    description: [
      'Automated procurement workflows using Python, VBA, and SQL',
      'Designed and implemented Celonis KPI dashboards integrated with SAP and Power BI',
      'Developed automation testing frameworks using Shell Scripting and CI/CD pipelines'
    ],
    achievements: [
      'Increased operational efficiency by 28.5%',
      'Reduced audit review time by 40 hours/month',
      'Identified and resolved 3 critical process inefficiencies',
      'Improved reporting accuracy significantly'
    ],
    technologies: ['Python', 'VBA', 'SQL', 'Celonis', 'SAP', 'Power BI', 'Shell Scripting'],
    companyUrl: 'https://www.ab-inbev.com/',
    icon: Database
  }
];

function getVariantForType(type: string) {
  switch (type) {
    case 'full-time':
      return 'default';
    case 'internship':
      return 'secondary';
    case 'part-time':
      return 'outline';
    default:
      return 'default';
  }
}

export function ExperienceTimeline() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-primary">Professional Journey</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            My career path as a growing engineer.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div key={exp.id} className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-16 bottom-0 w-px bg-border hidden md:block" />
                
                {/* Timeline Dot */}
                <div className="absolute left-6 top-12 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block" />

                <Card className="md:ml-16 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-text">{exp.position}</h3>
                              <Badge 
                                variant={getVariantForType(exp.type)}
                                className="text-xs"
                              >
                                {exp.type.replace('-', ' ')}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-3">
                              <div className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                <span className="font-semibold text-primary">{exp.company}</span>
                                {exp.companyUrl && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5"
                                    onClick={() => window.open(exp.companyUrl, '_blank')}
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {exp.duration}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3 mb-4">
                          {exp.description.map((desc, i) => (
                            <p key={i} className="text-sm text-muted leading-relaxed">
                              • {desc}
                            </p>
                          ))}
                        </div>

                        {/* Achievements */}
                        {exp.achievements.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="w-4 h-4 text-amber-500" />
                              <span className="font-semibold text-sm">Key Achievements</span>
                            </div>
                            <div className="space-y-1">
                              {exp.achievements.map((achievement, i) => (
                                <p key={i} className="text-sm text-muted leading-relaxed">
                                  • {achievement}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Technologies */}
                        <div>
                          <span className="text-sm font-semibold text-muted mb-2 block">Technologies Used:</span>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-surface rounded-lg p-6">
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-sm text-muted">Companies</div>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">2+</div>
            <div className="text-sm text-muted">Years Experience</div>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-500 mb-2">250+</div>
            <div className="text-sm text-muted">Students Mentored</div>
          </div>
          <div className="bg-surface rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-500 mb-2">15+</div>
            <div className="text-sm text-muted">Technologies</div>
          </div>
        </div>
      </div>
    </section>
  );
}