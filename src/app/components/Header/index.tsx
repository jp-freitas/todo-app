import { useAuth } from '@/hooks/useAuth'
import Button from '../Button'

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth()

  return (
    <header className="w-full flex items-center justify-center bg-neutral-800">
      <nav className="w-7/12 flex items-center justify-between">
        <a href="/">Home</a>
        {isAuthenticated ? (
          <h1>
            {user?.name} | <Button onClick={signOut} text="Sair" />
          </h1>
        ) : (
          <a href="/auth">Sign In & Sign Up</a>
        )}
      </nav>
    </header>
  )
}
