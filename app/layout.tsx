import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genius Art — AI Creative Studio",
  description: "AI-driven brand content, cinematic storytelling, and immersive 3D design.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
