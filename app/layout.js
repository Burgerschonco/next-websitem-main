'use client'

import { Providers } from './providers'
import SplashScreen from "./components/SplashScreen"
import PageTransition from "./components/PageTransition"
import './globals.css' // Tailwind CSS için

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <title>Süleyman Talha Duman - Full-Stack Web Developer</title>
        <meta name="description" content="Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. React, Next.js ve Node.js ile projeler üretiyorum." />
        <meta name="keywords" content="React, Next.js, Node.js, Full-Stack Developer, Web Developer, TypeScript, MongoDB, PostgreSQL, Süleyman Talha Duman" />
        <meta name="author" content="Süleyman Talha Duman" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Süleyman Talha Duman - Full-Stack Web Developer" />
        <meta property="og:description" content="Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum." />
        <meta property="og:image" content="/pp.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Süleyman Talha Duman - Full-Stack Web Developer" />
        <meta name="twitter:description" content="Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum." />
        <meta name="twitter:image" content="/pp.png" />
        <meta name="twitter:creator" content="@system_conf" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen">
        <Providers>
          <SplashScreen />
          <PageTransition>
            {children}
          </PageTransition>
        </Providers>
      </body>
    </html>
  )
}
