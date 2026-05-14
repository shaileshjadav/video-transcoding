import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthInterceptorSetup } from "@/components/AuthInterceptorSetup";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediaCodex — Enterprise Video Transcoding",
  description:
    "Fast, secure, scalable adaptive video transcoding and streaming.",
  openGraph: {
    title: "MediaCodex — Enterprise Video Transcoding",
    description:
      "Fast, secure, scalable adaptive video transcoding and streaming.",
    type: "website",
  },
};

// Import your publishable key
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <html lang="en">
        <body className="min-h-screen antialiased">
          <AuthInterceptorSetup />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
