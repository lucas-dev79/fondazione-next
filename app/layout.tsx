import type { Metadata } from 'next'
import Header from '../components/header'
import Footer from '../components/footer'
import RouteLoader from '../components/route-loader'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fondazione La Fabbrica di Cioccolato',
  description: 'Arte contemporanea, cultura e comunità.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="it" data-scroll-behavior="smooth">
      <body>
        <RouteLoader />
        <div className="site-shell">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
