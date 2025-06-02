// app/contact/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Contact } from '@/components/sections/contact';

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Header />
      
      {/* Main Contact Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary">Let's Connect!</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              I'd love to connect with you! Whether it's about opportunities, 
              collaborations, or just having a great conversation about tech!
            </p>
          </div>
          <Contact />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function ContactPageWrapper() {
  return (
    <ThemeProvider>
      <ContactPage />
    </ThemeProvider>
  );
}