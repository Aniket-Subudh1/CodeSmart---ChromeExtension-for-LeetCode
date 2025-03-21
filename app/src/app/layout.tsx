import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeSmart - AI-Powered LeetCode Assistant",
  description:
    "Enhance your LeetCode experience with real-time hints, visualizations, and collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
