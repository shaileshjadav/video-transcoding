"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import { Home } from "lucide-react";

export const Header = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const showMobileNav = isSignedIn && isLoaded && pathname !== "/";

  if (!isLoaded) {
    return (
      <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {showMobileNav && (
              <div className="lg:hidden mr-4">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </div>
            )}
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MX</span>
              </div>
              <span className="hidden sm:block">MediaCodex</span>
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {isSignedIn ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">Welcome</span>
                <SignOutButton>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    Sign Out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
