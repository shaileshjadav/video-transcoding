import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
