import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logo To Stencil - Report Cover Customization",
  description: "Upload and customize your logo for report cover stencil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
