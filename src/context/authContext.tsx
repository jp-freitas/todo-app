'use client'

import { supabase } from '@/lib/supabase'
import { UserType } from '@/types/user'
import { createContext, useState, ReactNode } from 'react'

interface AuthContextType {
  user: UserType | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => void
  signUp: (emaisl: string, password: string, name: string) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.error('Error signing in:', error.message)
    } else {
      setUser({
        id: data?.user?.id || '',
        email: data?.user?.email || '',
        name: data?.user?.user_metadata?.first_name || '',
        created_at: data?.user?.created_at || '',
        updated_at: data?.user?.updated_at || '',
      })
      setIsAuthenticated(true)
    }
  }

  async function signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: name,
        },
      },
    })
    if (error) {
      console.error('Error signing up:', error.message)
    } else {
      setUser({
        id: data?.user?.id || '',
        email: data?.user?.email || '',
        name: data?.user?.user_metadata?.first_name || '',
        created_at: data?.user?.created_at || '',
        updated_at: data?.user?.updated_at || '',
      })
      setIsAuthenticated(true)
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}
