import { login } from './action'

type LoginPageProps = {
  searchParams?: Promise<{
    error?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const error = params?.error

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-16">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Area riservata</h1>
          <p className="mt-2 text-sm text-neutral-500">
            Accedi per entrare nel pannello admin
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {decodeURIComponent(error)}
          </div>
        ) : null}

        <form action={login} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-900"
              placeholder="admin@agenzia.it"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-neutral-900"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Accedi
          </button>
        </form>
      </div>
    </main>
  )
}