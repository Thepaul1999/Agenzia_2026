import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

function formatPrice(value: number | null) {
  if (value === null) return 'Prezzo su richiesta'

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function ImmobileDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: immobile, error } = await supabase
    .from('immobili')
    .select(`
      id,
      titolo,
      slug,
      citta,
      prezzo,
      descrizione,
      immagine_copertina,
      pubblicato,
      created_at
    `)
    .eq('slug', slug)
    .eq('pubblicato', true)
    .maybeSingle()

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Errore caricamento immobile
            </h1>
            <p className="mt-3 text-sm text-red-600">{error.message}</p>

            <div className="mt-6">
              <Link
                href="/immobili"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
              >
                Torna agli immobili
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!immobile) {
    notFound()
  }

  const imageUrl = immobile.immagine_copertina
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/immobili/${immobile.immagine_copertina}`
    : null

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/immobili"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Torna agli immobili
          </Link>
        </div>

        <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="aspect-[16/9] bg-neutral-200">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={immobile.titolo}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                Nessuna immagine disponibile
              </div>
            )}
          </div>

          <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_0.8fr] md:p-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
                Scheda immobile
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-neutral-900">
                {immobile.titolo}
              </h1>

              <p className="mt-3 text-base text-neutral-600">
                {immobile.citta}
              </p>

              <div className="mt-8">
                <h2 className="text-lg font-semibold text-neutral-900">Descrizione</h2>
                <div className="mt-3 rounded-2xl bg-neutral-50 p-5 text-sm leading-7 text-neutral-700">
                  {immobile.descrizione?.trim() ? (
                    <p className="whitespace-pre-line">{immobile.descrizione}</p>
                  ) : (
                    <p>Descrizione non disponibile.</p>
                  )}
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
              <p className="text-sm text-neutral-500">Prezzo</p>
              <p className="mt-2 text-2xl font-semibold text-neutral-900">
                {formatPrice(immobile.prezzo)}
              </p>

              <div className="mt-6 space-y-3 text-sm text-neutral-700">
                <div className="rounded-xl bg-white px-4 py-3">
                  <span className="block text-xs uppercase tracking-wide text-neutral-500">
                    Città
                  </span>
                  <span className="mt-1 block font-medium text-neutral-900">
                    {immobile.citta}
                  </span>
                </div>

                <div className="rounded-xl bg-white px-4 py-3">
                  <span className="block text-xs uppercase tracking-wide text-neutral-500">
                    Codice annuncio
                  </span>
                  <span className="mt-1 block font-medium text-neutral-900">
                    {immobile.slug}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-700"
                >
                  Torna alla home
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  )
}