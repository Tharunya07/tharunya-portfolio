import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { TechStack } from '@/components/sections/tech-stack';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-text transition-colors duration-300">
        <Header />
        <Hero />
        <About />
        <TechStack />
        
        {/* Placeholder for future sections */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-primary">More Sections Coming Soon! 🚧</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2 text-text">🚀 Projects</h3>
                <p className="text-muted">Wiresnitch, CipherYou, CyHelp</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2 text-text">💼 Experience</h3>
                <p className="text-muted">Nokia, CSU, Anheuser-Busch</p>
              </div>
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2 text-text">📞 Contact</h3>
                <p className="text-muted">Get in touch!</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}