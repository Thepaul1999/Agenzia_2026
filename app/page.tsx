import Link from 'next/link'
import { createClient } from '@/lib/server'
import './home.css'

type HomeHero = {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  backgroundImage?: string
}

type PropertyItem = {
  id?: string | number
  title?: string
  slug?: string
  city?: string
  price?: number | string
  image_url?: string
  image?: string
  featured?: boolean
}

function formatEuro(value?: number | string) {
  if (value === undefined || value === null || value === '') return ''
  const num = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(num)) return String(value)
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(num)
}

export default async function Page() {
  const supabase = await createClient()

  const [{ data: heroRow }, { data: properties }] = await Promise.all([
    supabase
      .from('site_content')
      .select('value')
      .eq('key', 'home_hero')
      .maybeSingle(),
    supabase
      .from('immobili')
      .select('id, title, slug, city, price, image_url, image, featured, created_at')
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const hero = heroRow?.value as HomeHero | undefined

  const title = hero?.title?.trim() || 'Trova la casa giusta per te'
  const subtitle =
    hero?.subtitle?.trim() ||
    'Una selezione di immobili nel Monferrato e dintorni, con un supporto semplice, diretto e professionale.'
  const buttonText = hero?.buttonText?.trim() || 'Scopri le nostre proposte'
  const buttonHref = hero?.buttonHref?.trim() || '/immobili'
  const backgroundImage = hero?.backgroundImage?.trim() || '/images/hero/sfondo-home.jpg'

  const safeProperties = Array.isArray(properties) ? properties : []

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

            <nav className="menu-panel" aria-label="Menu principale">
              <Link href="/immobili">Le nostre proposte</Link>
              <Link href="/login">Area Riservata</Link>
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
            <h2>Scopri di più sulla casa giusta per te</h2>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/compass.png" alt="Esplora nuove zone" />
              </div>
              <div className="service-text">
                <h4>Esplora nuove zone</h4>
                <p>
                  Scopri quartieri, paesi e contesti diversi per trovare la posizione
                  più adatta al tuo stile di vita e alle tue esigenze.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/witness.png" alt="Una prospettiva diversa" />
              </div>
              <div className="service-text">
                <h4>Una prospettiva diversa</h4>
                <p>
                  Guarda gli immobili con più attenzione, confronta le soluzioni
                  disponibili e scegli con maggiore consapevolezza.
                </p>
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="lead-card">
              <div className="lead-card-header">
                <h4>Trova la tua casa ideale</h4>
              </div>

              <div className="lead-form">
                <p className="lead-intro">
                  Contattaci per ricevere informazioni sugli immobili disponibili e trovare
                  la soluzione più adatta alle tue esigenze.
                </p>

                <div className="form-submit">
                  <Link href="/immobili" className="primary-button full">
                    Vai alle proposte
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
            <h2>Le nostre proposte in evidenza</h2>
            <p>
              Scorri gli immobili selezionati e apri la scheda completa con un click.
            </p>
          </div>

          {safeProperties.length > 0 ? (
            <div className="properties-scroll" aria-label="Immobili in evidenza">
              {safeProperties.map((item, index) => {
                const slug = item.slug || String(item.id || index)
                const href = `/immobili/${slug}`
                const imageSrc = item.image_url || item.image || '/images/home/property-1.webp'
                const title = item.title?.trim() || 'Immobile in evidenza'
                const city = item.city?.trim() || 'Monferrato'
                const price = formatEuro(item.price)
                const isFeatured = Boolean(item.featured)

                return (
                  <Link key={slug} href={href} className="property-card property-card-link">
                    {isFeatured ? <div className="featured-badge">In evidenza</div> : null}

                    <div className="property-image-wrap">
                      <img
                        src={imageSrc}
                        alt={title}
                        className="property-image"
                      />
                    </div>

                    <div className="property-body">
                      <h4>{title}</h4>
                      <p className="property-city">{city}</p>
                      {price ? <span className="property-price">{price}</span> : null}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="properties-empty">
              <p>Nessun immobile disponibile al momento.</p>
            </div>
          )}
        </div>
      </section>

      <section className="video-section">
        <div className="container video-inner">
          <div className="section-header center">
            <h2>Guarda il nostro video</h2>
            <p>
              Fai un piccolo tour virtuale e scopri il nostro modo di lavorare
              per aiutarti a trovare la casa giusta.
            </p>
          </div>

          <img
            src="/images/home/video-preview.webp"
            alt="Anteprima video"
            className="video-preview-image"
          />
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <h2>
              Alcuni clienti hanno trovato
              <br />
              la casa che cercavano
            </h2>
            <p>
              Leggi le esperienze di chi ha già trovato la soluzione giusta
              con il nostro supporto.
            </p>
          </div>

          <div className="testimonials-grid">
            <article className="testimonial-card">
              <div className="testimonial-content">
                <span className="quote-mark">"</span>
                <p>
                  <em>
                    Lavorare con DreamSpace è stata un’esperienza fantastica. Ci hanno
                    aiutato a trovare esattamente quello che cercavamo, rendendo tutto
                    il percorso molto più semplice.
                  </em>
                </p>
              </div>

              <div className="testimonial-author">
                <img
                  src="/images/home/testimonial-1.webp"
                  alt="Mark Smith"
                  className="author-avatar-image"
                />
                <div className="author-info">
                  <h5>Mark Smith</h5>
                  <span>Envato Inc</span>
                </div>
              </div>
            </article>

            <article className="testimonial-card">
              <div className="testimonial-content">
                <span className="quote-mark">"</span>
                <p>
                  <em>
                    Non potrei essere più felice della mia nuova casa. Il team è stato
                    professionale, attento e davvero interessato a trovare la soluzione
                    migliore per la mia famiglia.
                  </em>
                </p>
              </div>

              <div className="testimonial-author">
                <img
                  src="/images/home/testimonial-2.webp"
                  alt="Julia Smith"
                  className="author-avatar-image"
                />
                <div className="author-info">
                  <h5>Julia Smith</h5>
                  <span>PayPal Inc</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <h2>Cosa stai aspettando?</h2>
          <p>
            Inizia oggi il tuo percorso verso la casa giusta
            <br />
            e lasciati aiutare a trasformare il tuo progetto in realtà.
          </p>

          <Link href="/immobili" className="primary-button">
            Scopri le nostre proposte
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