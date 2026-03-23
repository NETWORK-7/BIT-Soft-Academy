import Header from '@/_components/Header';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Bit-Soft IT academy - Learn to Code',
  description: 'Best coding platform for beginners',
};

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <html lang="en">
        <body className="bg-black text-white min-h-screen">
          <Header />
          {children}
          <Toaster />
        </body>
      </html>
    </LanguageProvider>
  );
}

