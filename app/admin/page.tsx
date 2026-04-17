import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: adminRow, error: adminError } = await supabase
    .from('admin_users')
    .select('id, active, role')
    .eq('id', user.id)
    .maybeSingle()

  const isAdmin =
    !adminError &&
    !!adminRow &&
    adminRow.active === true &&
    adminRow.role === 'admin'

  if (!isAdmin) {
    redirect('/login?error=Accesso%20negato')
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Area riservata
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-zinc-900">
          Dashboard admin
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600">
          Da qui puoi gestire i contenuti della home e gli immobili pubblicati.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Hero home</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Modifica titolo, sottotitolo, pulsante e immagine di sfondo della home.
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-900">Nuovo immobile</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Crea una nuova scheda immobile con titolo, città, prezzo, descrizione e copertina.
          </p>
        </section>
      </div>
    </main>
  )
}