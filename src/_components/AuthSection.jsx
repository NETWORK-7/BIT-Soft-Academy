'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguageContext } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AuthSection() {
  const { language } = useLanguageContext();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsSignedIn(!!data.session);
    };
    checkSession();
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isSignedIn) {
    return null; // Or show user menu if needed
  }

  return (
    <>
      <Button asChild variant="ghost" size="lg" className="text-gray-700 hover:text-purple-600 hover:bg-purple-50">
        <Link href="/sign-in">{t(language, 'nav.signIn')}</Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link href="/sign-up">{t(language, 'nav.startFreeTrial')}</Link>
      </Button>
    </>
  );
}

