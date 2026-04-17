import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'
import NewPropertyForm from './NewPropertyForm'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  const { data: adminUser, error: adminError } = await supabase
    .from('admin_users')
    .select('id, email, full_name, role, active')
    .eq('id', user.id)
    .maybeSingle()

  if (adminError || !adminUser || !adminUser.active || adminUser.role !== 'admin') {
    redirect('/login')
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-8 text-neutral-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Admin</h1>
              <p className="mt-1 text-sm text-neutral-600">
                Accesso effettuato come {adminUser.email}
              </p>
            </div>

            <form action="/auth/signout" method="post">
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-700"
              >
                Logout
              </button>
            </form>
          </div>
        </header>

        <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Nuovo immobile</h2>
          <p className="mt-1 text-sm text-neutral-600">
            Inserisci i dati base e carica la foto copertina.
          </p>

          <div className="mt-6">
            <NewPropertyForm />
          </div>
        </section>
      </div>
    </main>
  )
}