

import Link from 'next/link'
import { createClient } from '@/lib/server'
import './home-1.css'

const featuredProperties = [
  {
    title: 'Atlanta, GA',
    price: '€ 200.530',
    image: '/images/home/property-1.webp',
    featured: false,
  },
  {
    title: 'Ocean Loft, GA',
    price: '€ 125.400',
    image: '/images/home/property-2.webp',
    featured: true,
  },
  {
    title: 'West Milford, NJ',
    price: '€ 158.900',
    image: '/images/home/property-3.webp',
    featured: false,
  },
]

const testimonials = [
  {
    name: 'Mark Smith',
    company: 'Envato Inc',
    text: 'Working with DreamSpace was an amazing experience. They helped us find exactly what we were looking for in a home and made the process smooth and easy.',
    image: '/images/home/testimonial-1.webp',
  },
  {
    name: 'Julia Smith',
    company: 'PayPal Inc',
    text: "I couldn't be happier with my new home. The team was professional, attentive, and truly cared about finding the perfect match for my family.",
    image: '/images/home/testimonial-2.webp',
  },
]

export default async function Page() {
  const supabase = await createClient()

  const { data: heroRow } = await supabase
    .from('site_content')
    .select('value')
    .eq('key', 'home_hero')
    .maybeSingle()

  const hero = heroRow?.value as
    | {
        title?: string
        subtitle?: string
        buttonText?: string
        buttonHref?: string
        backgroundImage?: string
      }
    | undefined

  const title = hero?.title?.trim() || 'Trova la casa giusta per te'
  const subtitle =
    hero?.subtitle?.trim() ||
    'Una selezione di immobili nel Monferrato e dintorni, con un supporto semplice, diretto e professionale.'
  const buttonText = hero?.buttonText?.trim() || 'Scopri gli immobili'
  const buttonHref = hero?.buttonHref?.trim() || '/immobili'
  const backgroundImage = hero?.backgroundImage?.trim() || '/images/hero/sfondo-home.jpg'

  return (
    <main className="home-page">
      <header className="site-header">
        <div className="container header-inner">
          <div className="header-spacer" />

          <details className="menu-dropdown">
            <summary className="menu-toggle" aria-label="Apri menu principale">
              <span className="menu-line" />
              <span className="menu-line" />
              <span className="menu-line" />
            </summary>

            <nav className="menu-panel">
              <Link href="/immobili">Immobili</Link>
              <Link href="/login">Admin</Link>
            </nav>
          </details>
        </div>
      </header>

      <section
        className="hero-section"
        style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.08) 0%,
              rgba(0, 0, 0, 0.06) 25%,
              rgba(0, 0, 0, 0.14) 48%,
              rgba(0, 0, 0, 0.38) 72%,
              rgba(0, 0, 0, 0.62) 100%
            ),
            url("${backgroundImage}")
          `,
        }}
      >
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>{title}</h1>
            <p className="hero-description">{subtitle}</p>

            <Link href={buttonHref} className="primary-button">
              {buttonText}
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container services-grid">
          <div className="services-content">
            <h2>Ti aiutiamo a trovare l’immobile più adatto alle tue esigenze</h2>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/compass.png" alt="Ricerca immobili" />
              </div>
              <div className="service-text">
                <h4>Ricerca mirata</h4>
                <p>
                  Ti aiutiamo a individuare le soluzioni più interessanti in base
                  alla zona, al budget e alle caratteristiche che desideri.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/witness.png" alt="Supporto professionale" />
              </div>
              <div className="service-text">
                <h4>Supporto professionale</h4>
                <p>
                  Un aiuto concreto durante tutto il percorso, dalla prima visita
                  fino alla scelta dell’immobile più adatto.
                </p>
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="lead-card">
              <div className="lead-card-header">
                <h4>Guarda gli immobili disponibili</h4>
              </div>

              <div className="lead-form">
                <div className="form-group">
                  <label>Immobili aggiornati</label>
                  <input type="text" value="Consulta la vetrina online" readOnly />
                </div>

                <div className="form-group">
                  <label>Accesso rapido</label>
                  <input type="text" value="Vai direttamente alla lista completa" readOnly />
                </div>

                <div className="form-submit">
                  <Link href="/immobili" className="primary-button full">
                    Vai agli immobili
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header center">
            <h2>Immobili in evidenza</h2>
            <p>
              Una selezione di proposte in primo piano
              <br />
              pensate per offrirti una panoramica immediata.
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <article className="property-card" key={property.title}>
                {property.featured ? <div className="featured-badge">In evidenza</div> : null}

                <div className="property-image-wrap">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="property-image"
                  />
                </div>

                <div className="property-body">
                  <h4>{property.title}</h4>
                  <span className="property-price">{property.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="container video-inner">
          <div className="section-header center">
            <h2>Una consulenza semplice e chiara</h2>
            <p>
              Ogni immobile viene presentato in modo diretto,
              <br />
              con attenzione ai dettagli davvero importanti.
            </p>
          </div>

          <img
            src="/images/home/video-preview.webp"
            alt="Anteprima servizi immobiliari"
            className="video-preview-image"
          />
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <h2>
              Esperienza, attenzione
              <br />
              e rapporto diretto
            </h2>
            <p>
              Un approccio umano e professionale per accompagnarti
              <br />
              nella ricerca della soluzione più adatta.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.name}>
                <div className="testimonial-content">
                  <span className="quote-mark">"</span>
                  <p>
                    <em>{item.text}</em>
                  </p>
                </div>

                <div className="testimonial-author">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="author-avatar-image"
                  />
                  <div className="author-info">
                    <h5>{item.name}</h5>
                    <span>{item.company}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Guarda tutti gli immobili disponibili</h2>
          <p>
            Entra nella sezione dedicata e consulta le proposte pubblicate
            <br />
            in modo semplice e immediato.
          </p>

          <Link href="/immobili" className="primary-button">
            Vai alla vetrina immobili
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>
            2026 © <b>Agenzia Immobiliare Monferrato</b>. Tutti i diritti riservati.
          </p>
        </div>
      </footer>
    </main>
  )
}