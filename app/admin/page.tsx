import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: adminUser, error } = await supabase
    .from('admin_users')
    .select('id, email, full_name, role, active')
    .eq('id', user.id)
    .single()

  if (error || !adminUser || !adminUser.active || adminUser.role !== 'admin') {
    redirect('/login')
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Area Admin</h1>

      <p style={{ fontSize: '18px', color: '#555', marginBottom: '24px' }}>
        Benvenuto, {adminUser.full_name || adminUser.email}
      </p>

      <div
        style={{
          padding: '24px',
          borderRadius: '16px',
          background: '#f6f6f6',
          border: '1px solid #e5e5e5',
        }}
      >
        <p style={{ margin: 0, fontSize: '16px' }}>
          Login riuscito. Il prossimo step è costruire la gestione immobili.
        </p>
      </div>
    </main>
  )
}