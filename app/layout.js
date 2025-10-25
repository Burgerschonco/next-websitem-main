import { Providers } from './providers'
import SplashScreen from "./components/SplashScreen"
import PageTransition from "./components/PageTransition"
import './globals.css' // Tailwind CSS için

export const metadata = {
  title: 'Süleyman Talha Duman - Full-Stack Web Developer',
  description: 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. React, Next.js ve Node.js ile projeler üretiyorum.',
  keywords: 'React, Next.js, Node.js, Full-Stack Developer, Web Developer, TypeScript, MongoDB, PostgreSQL, Süleyman Talha Duman',
  author: 'Süleyman Talha Duman',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    type: 'website',
    title: 'Süleyman Talha Duman - Full-Stack Web Developer',
    description: 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.',
    images: ['/pp.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Süleyman Talha Duman - Full-Stack Web Developer',
    description: 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.',
    images: ['/pp.png'],
    creator: '@system_conf',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    type: 'image/png',
    sizes: '192x192 512x512',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
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
