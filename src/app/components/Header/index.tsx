'use client'

import { useAuth } from '@/hooks/useAuth'
import Button from '../Button'

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="w-full flex items-center justify-center bg-slate-800 pt-2">
      <nav className="w-7/12 flex items-center justify-end">
        {isAuthenticated ? (
          <h1 className="text-slate-300 text-base font-semibold flex items-center justify-center gap-2">
            {user?.name} <Button onClick={signOut} text="Sair" />
          </h1>
        ) : (
          <a href="/auth">Sign In & Sign Up</a>
        )}
      </nav>
    </header>
  )
}
