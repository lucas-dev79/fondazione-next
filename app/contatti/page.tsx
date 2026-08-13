export default function ContattiPage() {
  return (
    <main className="page contact-page">
      <section className="contact-hero">
        <p className="eyebrow">Contatti</p>

        <h1 className="contact-title">
          Dove trovarci e come mettersi
          <br />
          in contatto con noi
        </h1>
      </section>

      <section className="contact-layout">
        <div className="contact-details">
          <article>
            <span>Indirizzo</span>
            <p>
              Via Strada Vecchia 100
              <br />
              6717 Blenio
              <br />
              Svizzera
            </p>
          </article>

          <article>
            <span>Telefono</span>
            <p>
              <a href="tel:+410918711212">+41 091 871 12 12</a>
            </p>
          </article>

          <article>
            <span>Email</span>
            <p>
              <a href="mailto:info@lafabbricadicioccolato.ch">
                info@lafabbricadicioccolato.ch
              </a>
            </p>
          </article>
        </div>

        <div className="contact-map-block">
          <iframe
            title="Mappa Fondazione La Fabbrica di Cioccolato"
            src="https://www.google.com/maps?q=Via%20Strada%20Vecchia%20100%2C%206717%20Blenio%2C%20Svizzera&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <a
            className="map-link"
            href="https://www.google.com/maps/dir/?api=1&destination=Via%20Strada%20Vecchia%20100%2C%206717%20Blenio%2C%20Svizzera"
            target="_blank"
            rel="noreferrer"
          >
            Apri indicazioni su Google Maps
          </a>
        </div>
      </section>
    </main>
  )
}
