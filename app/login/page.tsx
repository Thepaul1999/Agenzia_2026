import Link from 'next/link'
import { createClient } from '@/lib/server'

type HomeHero = {
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  backgroundImage?: string
}

type PropertyRow = {
  id: string
  titolo: string
  slug: string
  descrizione: string | null
  citta: string | null
  prezzo: number | null
  immagine_copertina: string | null
  pubblicato: boolean | null
  created_at: string | null
}

function formatPrice(value: number | null | undefined) {
  if (typeof value !== 'number') return 'Prezzo su richiesta'

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: heroRow }, { data: featuredRows }] = await Promise.all([
    supabase
      .from('site_content')
      .select('value')
      .eq('key', 'home_hero')
      .maybeSingle(),
    supabase
      .from('immobili')
      .select(
        'id, titolo, slug, descrizione, citta, prezzo, immagine_copertina, pubblicato, created_at'
      )
      .eq('pubblicato', true)
      .order('created_at', { ascending: false })
      .limit(3),
  ])

  const hero = (heroRow?.value ?? {}) as HomeHero
  const properties = (featuredRows ?? []) as PropertyRow[]

  const heroTitle = hero.title?.trim() || 'Trova la casa giusta per il tuo prossimo capitolo'
  const heroSubtitle =
    hero.subtitle?.trim() ||
    'Soluzioni immobiliari selezionate con attenzione, consulenza chiara e un percorso semplice dall’interesse iniziale alla visita.'
  const heroButtonText = hero.buttonText?.trim() || 'Scopri gli immobili'
  const heroButtonHref = hero.buttonHref?.trim() || '/immobili'
  const heroBackground =
    hero.backgroundImage?.trim() ||
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'

  return (
    <main className="bg-white text-zinc-900">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBackground}
            alt="Hero home agenzia immobiliare"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-zinc-950/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/40 to-zinc-950/20" />
        </div>

        <div className="relative mx-auto flex min-h-[72svh] max-w-7xl items-end px-4 py-12 sm:min-h-[78svh] sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.28em] text-white/75 sm:text-sm">
              Agenzia immobiliare
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
              {heroSubtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={heroButtonHref}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
              >
                {heroButtonText}
              </Link>

              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/25 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Area admin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
            Servizi
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
            Un supporto concreto in ogni fase
          </h2>
          <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
            Dalla selezione dell’immobile alla trattativa finale, ti accompagniamo con un approccio chiaro, locale e orientato al risultato.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Vendita</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Valutazione accurata, promozione curata e supporto fino al rogito.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Acquisto</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Ti aiutiamo a trovare la soluzione più adatta per esigenze, budget e zona.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Consulenza</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Un confronto diretto per chiarire dubbi tecnici, documentali e commerciali.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
            <h3 className="text-lg font-semibold text-zinc-900">Territorio</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
              Conosciamo il mercato locale e valorizziamo ogni immobile nel modo corretto.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
                In evidenza
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
                Immobili selezionati
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
                Una selezione aggiornata di immobili pubblicati, con schede chiare e dettagli essenziali.
              </p>
            </div>

            <Link
              href="/immobili"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100"
            >
              Vedi tutti
            </Link>
          </div>

          {properties.length > 0 ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {properties.map((property) => (
                <article
                  key={property.id}
                  className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {property.immagine_copertina ? (
                      <img
                        src={property.immagine_copertina}
                        alt={property.titolo}
                        className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-zinc-200 text-sm text-zinc-500">
                        Nessuna immagine disponibile
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-zinc-500">
                          {property.citta || 'Località da definire'}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold text-zinc-900">
                          {property.titolo}
                        </h3>
                      </div>

                      <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
                        {formatPrice(property.prezzo)}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-600">
                      {property.descrizione || 'Scheda immobile in aggiornamento.'}
                    </p>

                    <div className="mt-6">
                      <Link
                        href={`/immobili/${property.slug}`}
                        className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
                      >
                        Scopri di più
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white p-8 sm:p-10">
              <h3 className="text-xl font-semibold text-zinc-900">
                Nessun immobile in evidenza al momento
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
                Stiamo aggiornando il catalogo. Torna presto oppure entra nell’area admin per pubblicare i primi immobili.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/ScMzIvxBSi4"
                title="Video presentazione"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
              Presentazione
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-900">
              Un modo semplice per conoscere il nostro approccio
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              Una breve anteprima video può aiutare a trasmettere stile, metodo e tipo di servizio offerto. Se preferisci, più avanti possiamo sostituire questo embed con un video reale dell’agenzia.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-4">
              <p className="text-sm leading-6 text-zinc-600">
                Suggerimento: appena hai un video vero, possiamo usare questa sezione per aumentare fiducia e percezione professionale.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-white/60 sm:text-sm">
              Testimonianze
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Un rapporto basato su chiarezza e fiducia
            </h2>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-6 text-white/85">
                “Servizio preciso, disponibile e trasparente. Ci siamo sentiti seguiti dall’inizio alla fine.”
              </p>
              <footer className="mt-4 text-sm text-white/60">Cliente vendita</footer>
            </blockquote>

            <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-6 text-white/85">
                “Abbiamo trovato casa con tempi rapidi e con informazioni sempre chiare su ogni passaggio.”
              </p>
              <footer className="mt-4 text-sm text-white/60">Cliente acquisto</footer>
            </blockquote>

            <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm leading-6 text-white/85">
                “Ottima conoscenza del territorio e approccio professionale, ma sempre molto umano.”
              </p>
              <footer className="mt-4 text-sm text-white/60">Cliente consulenza</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] bg-zinc-100 px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500 sm:text-sm">
              Contatto
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
              Hai visto un immobile interessante?
            </h2>
            <p className="mt-4 text-sm leading-6 text-zinc-600 sm:text-base">
              Contattaci per fissare una visita, ricevere maggiori informazioni o valutare la soluzione più adatta alle tue esigenze.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Link
              href="/immobili"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Vai agli immobili
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50"
            >
              Area riservata
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
