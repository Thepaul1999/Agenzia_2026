import Link from 'next/link'
import { createClient } from '@/lib/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

function formatPrice(value: number | null) {
  if (value === null) return 'Prezzo su richiesta'

  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export default async function ImmobiliPage() {
  const supabase = await createClient()

  const { data: immobili, error } = await supabase
    .from('immobili')
    .select('id, titolo, slug, citta, prezzo, immagine_copertina, pubblicato, created_at')
    .eq('pubblicato', true)
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <main className="min-h-screen bg-neutral-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-semibold text-neutral-900">I nostri immobili</h1>
          <p className="mt-4 text-sm text-red-600">
            Errore caricamento immobili: {error.message}
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">I nostri immobili</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Elenco degli immobili disponibili
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-100"
          >
            Torna alla home
          </Link>
        </div>

        {!immobili || immobili.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <p className="text-neutral-600">Nessun immobile pubblicato.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {immobili.map((item) => {
              const imageUrl = item.immagine_copertina
                ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/immobili/${item.immagine_copertina}`
                : null

              return (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] bg-neutral-200">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.titolo}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-neutral-500">
                        Nessuna immagine
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 p-5">
                    <div>
                      <h2 className="text-lg font-semibold text-neutral-900">
                        {item.titolo}
                      </h2>
                      <p className="mt-1 text-sm text-neutral-600">{item.citta}</p>
                    </div>

                    <p className="text-base font-semibold text-neutral-900">
                      {formatPrice(item.prezzo)}
                    </p>

                    <Link
                      href={`/immobili/${item.slug}`}
                      className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-700"
                    >
                      Vedi immobile
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}