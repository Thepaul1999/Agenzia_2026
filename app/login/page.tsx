import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'
import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params?.error

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('id, role, active')
      .eq('id', user.id)
      .single()

    if (adminUser && adminUser.active && adminUser.role === 'admin') {
      redirect('/admin')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'linear-gradient(180deg, #e9eef5 0%, #dfe7f1 100%)',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.12)',
          border: '1px solid #d8dee8',
        }}
      >
        <h1
          style={{
            margin: '0 0 10px 0',
            fontSize: '32px',
            lineHeight: 1.1,
            color: '#0f172a',
          }}
        >
          Login admin
        </h1>

        <p
          style={{
            margin: '0 0 24px 0',
            color: '#475569',
            fontSize: '15px',
            lineHeight: 1.5,
          }}
        >
          Accedi per gestire gli immobili dal pannello interno.
        </p>

        {error ? (
          <div
            style={{
              marginBottom: '16px',
              padding: '12px 14px',
              borderRadius: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        ) : null}

        <form action={login} style={{ display: 'grid', gap: '14px' }}>
          <div style={{ display: 'grid', gap: '6px' }}>
            <label
              htmlFor="email"
              style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="admin@agenzia.it"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                color: '#0f172a',
                background: '#ffffff',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: '6px' }}>
            <label
              htmlFor="password"
              style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                fontSize: '15px',
                color: '#0f172a',
                background: '#ffffff',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px 16px',
              borderRadius: '12px',
              border: 'none',
              background: '#0f172a',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            Entra nell’admin
          </button>
        </form>
      </div>
    </main>
  )
}