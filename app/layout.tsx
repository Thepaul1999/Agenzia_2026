import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>
          <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}