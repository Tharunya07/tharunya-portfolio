// app/blogs/page.tsx
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Header } from '@/components/layout/header';
import { BlogsSection } from '@/components/sections/blog-sections';
import { Footer } from '@/components/layout/footer';

function BlogsPage() {
  return (
    <div className="min-h-screen bg-background text-text transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-primary">Blogs 📝</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            My thoughts, experiences, and insights from the world of technology and engineering.
          </p>
        </div>
      </section>

      {/* Blogs Section */}
      <BlogsSection />

      <Footer />
    </div>
  );
}

export default function Blogs() {
  return (
    <ThemeProvider>
      <BlogsPage />
    </ThemeProvider>
  );
}