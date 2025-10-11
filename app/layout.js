'use client'

import { Providers } from './providers'
import SplashScreen from "./components/SplashScreen"
import PageTransition from "./components/PageTransition"
import './globals.css' // Tailwind CSS için

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
