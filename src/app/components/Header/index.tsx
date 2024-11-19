import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center bg-neutral-800">
      <nav className="w-7/12 flex items-center justify-between">
        <a href="/">Home</a>
        <a href="/auth">Sign In & Sign Up</a>
      </nav>
    </header>
  )
}
