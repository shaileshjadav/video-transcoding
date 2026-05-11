"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

const navItems = ["Product", "Solutions", "Pricing", "Resources", "Docs"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-narrow flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-foreground">
            <span className="text-gradient">M</span>ediaCodex
          </Link>
          {/* <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav> */}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm">Log in</Button>
              </SignInButton>
              <Button variant="outline" size="sm">Book a demo</Button>
              <SignInButton mode="modal">
                <Button size="sm">Get started</Button>
              </SignInButton>
            </>
          )}
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-3 mb-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-muted-foreground py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            {isLoaded && isSignedIn ? (
              <Link href="/dashboard">
                <Button size="sm" className="w-full">Dashboard</Button>
              </Link>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Log in</Button>
                </SignInButton>
                <SignInButton mode="modal">
                  <Button size="sm">Get started</Button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
