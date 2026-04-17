import Link from 'next/link'
import { createClient } from '@/lib/server'

export default async function SiteHeader() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isAdmin = false

  if (user) {
    const { data: adminRow } = await supabase
      .from('admin_users')
      .select('id, active, role')
      .eq('id', user.id)
      .maybeSingle()

    isAdmin =
      !!adminRow &&
      adminRow.active === true &&
      adminRow.role === 'admin'
  }

  if (!isAdmin) return null

  return (
    <div className="fixed inset-x-3 bottom-3 z-[9999] sm:inset-x-auto sm:bottom-4 sm:left-4">
      <div className="rounded-2xl border border-white/10 bg-zinc-950/95 p-3 text-white shadow-2xl backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-sm font-medium whitespace-nowrap">
            Loggato come admin
          </span>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <Link
              href="/admin"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              Pannello
            </Link>

            <form action="/auth/signout" method="post" className="m-0">
              <button
                type="submit"
                className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}