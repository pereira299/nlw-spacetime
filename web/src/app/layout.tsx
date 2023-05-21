import React from 'react'
import '../assets/styles/globals.css'
import { Roboto_Flex as Roboto, Bai_Jamjuree as Bai } from 'next/font/google'
import { cookies } from 'next/headers'
import SignIn from '@/components/SignIn'
import Profile from '@/components/Profile'
import Hero from '@/components/Hero'
import Copyright from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const bai = Bai({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma capsula do tempo construida com Next.js, Typescript e TailwindCSS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = cookies().has('token')
  return (
    <html lang="en">
      <body
        className={`font-roboto ${roboto.variable} ${bai.variable} bg-gray-900 text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between overflow-hidden  border-r border-white/10 bg-[ur(../assets/images/bg-stars.svg)] bg-cover px-28 py-16">
            <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full  bg-purple-700 opacity-50 blur-full"></div>
            <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>
            {isAuthenticated ? <Profile /> : <SignIn />}
            <Hero />
            <Copyright />
          </div>
          <div className="flex flex-col bg-[ur(../assets/images/bg-stars.svg)] bg-cover">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
