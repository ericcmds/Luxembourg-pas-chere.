import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BackToTop from "@/components/BackToTop";
import CookieBanner from "@/components/CookieBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NoHostRestriction from "@/components/ui/NoHostRestriction";

export default function App() {
  // Add accessibility focus outline for keyboard users only
  useEffect(() => {
    // This adds a class to the body when user is navigating with keyboard
    // and removes it when using mouse, to show focus rings only when needed
    function handleFirstTab(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
      }
    }

    window.addEventListener('keydown', handleFirstTab);
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
    };
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <NoHostRestriction />
          <Router />
          <Toaster />
          <BackToTop />
          <CookieBanner />
        </QueryClientProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}