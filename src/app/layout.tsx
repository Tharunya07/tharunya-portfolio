import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/theme/theme-provider';

export const metadata: Metadata = {
  title: 'Tharunya Pathipati - Portfolio',
  description: 'Software Engineer & Security Enthusiast',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}