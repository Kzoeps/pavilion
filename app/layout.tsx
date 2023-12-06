import type { Metadata } from 'next'
import { cn } from "@/lib/utils";
import { Inter, Archivo_Black } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const archivo = Archivo_Black({ subsets: ['latin'], variable: '--font-archivo-black', weight: '400' })

export const metadata: Metadata = {
  title: 'Pavilion',
  description: 'A COM 499 management software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, archivo.variable)}>
        <Nav />
        <section className=' min-h-screen flex-col p-24 justify-between items-center'>
          {children}
        </section>
      </body>
    </html>
  )
}
