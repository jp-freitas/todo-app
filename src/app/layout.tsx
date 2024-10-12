import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'toDo',
  description: 'toDo list app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen max-w-full flex-col justify-center items-center`}
      >
        {children}
      </body>
    </html>
  )
}
