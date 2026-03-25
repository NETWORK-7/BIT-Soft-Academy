'use client';


import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguageContext } from '@/context/LanguageContext';
import { t } from '@/lib/translations';
import { useEffect, useState } from 'react';

export default function AuthSection() {
  const { language } = useLanguageContext();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => setIsSignedIn(!!data.user))
      .catch(() => setIsSignedIn(false));
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isSignedIn) {
    return null; // Or show user menu if needed
  }

  return (
    <>
      <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-primary hover:bg-accent rounded-xl">
        <Link href="/sign-in">{t(language, 'nav.signIn')}</Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="rounded-xl bg-linear-to-r from-brand-from to-brand-to text-primary-foreground font-semibold shadow-lg shadow-brand-glow/35 hover:brightness-110 hover:shadow-xl transition-all duration-300"
      >
        <Link href="/sign-up">{t(language, 'nav.startFreeTrial')}</Link>
      </Button>
    </>
  );
}

