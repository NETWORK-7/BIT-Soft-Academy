import Header from '@/_components/Header';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';
import '../styles/animations.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Bit-Soft IT academy - Learn to Code',
  description: 'Best coding platform for beginners',
  icons: {
    icon: '/bitsoft.jpg',
    shortcut: '/bitsoft.jpg',
    apple: '/bitsoft.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className="min-h-screen bg-background text-foreground antialiased">
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}

