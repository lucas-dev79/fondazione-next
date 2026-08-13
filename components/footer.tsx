import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">
        <img
          src="/images/Fondazione-logo-footer.png"
          alt="Fondazione La Fabbrica di Cioccolato"
        />
      </div>

      <div className="footer-columns">
        <div className="footer-info">
          <p className="footer-title">Fondazione La Fabbrica di Cioccolato</p>
          <p>
            Via Strada Vecchia 100
            <br />
            6717 Blenio
            <br />
            Svizzera
          </p>
          <p>
            <a href="mailto:info@lafabbricadicioccolato.ch">
              info@lafabbricadicioccolato.ch
            </a>
          </p>
        </div>

        <nav className="footer-menu" aria-label="Footer">
          <Link href="/">Home</Link>
          <Link href="/fondazione">Fondazione</Link>
          <Link href="/progetti">Progetti</Link>
          <Link href="/contatti">Contatti</Link>
        </nav>
      </div>

      <div className="footer-bottom">
        <p>© Fondazione La Fabbrica di Cioccolato. All rights reserved.</p>
      </div>
    </footer>
  )
}
