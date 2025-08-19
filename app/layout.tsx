import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenUp - 24/7 Emergency Locksmith Service",
  description: "Get connected with OpenUp's licensed & verified locksmiths in minutes. 24/7 emergency service with transparent pricing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
