import './globals.css'
import SiteHeader from '@/app/components/SiteHeader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      <body suppressHydrationWarning>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  )
}