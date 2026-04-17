import Link from 'next/link'

export default function HomeSelectorPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-white/60">
            Agenzia Immobiliare Monferrato
          </p>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Scegli quale home vuoi vedere
          </h1>

          <p className="mt-4 text-base text-white/70 sm:text-lg">
            Puoi aprire la versione classica del sito oppure la versione editoriale.
          </p>
        </div>

        <div className="mt-12 grid w-full max-w-4xl gap-6 md:grid-cols-2">
          <Link
            href="/home-1"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/30 hover:bg-white/10"
          >
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Versione 1
            </span>

            <h2 className="mt-5 text-3xl font-semibold">Home 1</h2>

            <p className="mt-3 text-white/70">
              Home classica con hero dinamico, servizi, immobili in evidenza,
              testimonial e call to action finale.
            </p>
          </Link>

          <Link
            href="/home-2"
            className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:border-white/30 hover:bg-white/10"
          >
            <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
              Versione 2
            </span>

            <h2 className="mt-5 text-3xl font-semibold">Home 2</h2>

            <p className="mt-3 text-white/70">
              Versione con il layout elegante che prima stava nel login.
            </p>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/immobili"
            className="rounded-2xl border border-white/15 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            Vai agli immobili
          </Link>

          <Link
            href="/login"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-white/90"
          >
            Area riservata
          </Link>
        </div>
      </div>
    </main>
  )
}