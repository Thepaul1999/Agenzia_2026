import Link from 'next/link'
import './home.css'

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

export default function HomePage() {
  return (
    <main className="home-page">
      <header className="site-header">
        <div className="container header-inner">
          <Link href="/" className="site-logo">
            DreamSpace
          </Link>

          <details className="menu-dropdown">
            <summary className="menu-toggle" aria-label="Apri menu">
              <span />
              <span />
              <span />
            </summary>

            <nav className="menu-panel">
              <Link href="/immobili">I nostri immobili</Link>
              <Link href="/contatti">Contatti</Link>
              <Link href="/login">Login</Link>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>Find your dream house</h1>
            <p className="hero-description">
              Discover the perfect property that matches your lifestyle
              <br />
              Start your journey to homeownership today
            </p>

            <Link href="/immobili" className="primary-button">
              Your Dream House Here
            </Link>
          </div>
        </div>
      </section>

      <section className="services-section">
        <div className="container services-grid">
          <div className="services-content">
            <h2>Get your way to know more about your new house</h2>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/compass.png" alt="Explore areas" />
              </div>
              <div className="service-text">
                <h4>Explore New Areas</h4>
                <p>
                  Discover diverse neighborhoods and find the perfect location
                  that suits your lifestyle and preferences.
                </p>
              </div>
            </div>

            <div className="service-item">
              <div className="service-icon">
                <img src="/images/home/witness.png" alt="Fresh perspective" />
              </div>
              <div className="service-text">
                <h4>Get a Fresh Perspective</h4>
                <p>
                  View properties from different angles and explore virtual tours
                  to make informed decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="form-column">
            <div className="lead-card">
              <div className="lead-card-header">
                <h4>Find Your Dream House</h4>
              </div>

              <form className="lead-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="businessEmail">Business Email</label>
                  <input id="businessEmail" type="email" />
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input id="phoneNumber" type="text" />
                </div>

                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input id="companyName" type="text" />
                </div>

                <div className="form-submit">
                  <Link href="/immobili" className="primary-button full">
                    Your Dream House Here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header center">
            <h2>Featured Properties</h2>
            <p>
              Browse our selection of handpicked properties
              <br />
              carefully curated to meet your expectations
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <article className="property-card" key={property.title}>
                {property.featured ? (
                  <div className="featured-badge">Featured</div>
                ) : null}

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
            <h2>Watch Our Video</h2>
            <p>
              Take a virtual tour and explore what makes us different
              <br />
              See how we help you find your dream home
            </p>
          </div>

          <img
            src="/images/home/video-preview.webp"
            alt="Video Preview"
            className="video-preview-image"
          />
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="section-header center">
            <h2>
              Some Clients Got Their Ways
              <br />
              to Find Dream House
            </h2>
            <p>
              Read success stories from our satisfied clients
              <br />
              who found their perfect homes with us
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
          <h2>What are you waiting for?</h2>
          <p>
            Start your journey to finding the perfect home today
            <br />
            Let us help you make your dream a reality
          </p>

          <Link href="/immobili" className="primary-button">
            Your Dream House Here
          </Link>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <p>2025 © <b>DreamSpace</b>. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}