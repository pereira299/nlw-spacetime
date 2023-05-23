'use client'
import EmptyMemories from '@/components/memories/EmptyMemories'
import api from '@/lib/api'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default async function NewMemory() {
  const params = useParams()
  const isAuth = Cookies.get('token')

  if (!isAuth) {
    return <EmptyMemories />
  }

  const token = Cookies.get('token')
  const res = await api.get('/memories/' + params.id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory = res.data
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar a timeline
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <Image
          src={memory.coverUrl}
          alt={memory.excerpt}
          width={592}
          height={288}
          className="aspect-video w-full rounded-lg object-cover"
        />
        <p className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed outline-none placeholder:text-gray-400 focus:ring-0">
          {memory.excerpt}
        </p>

        <button
          type="button"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-bai text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Compartilhar lembrança
        </button>
      </div>
    </div>
  )
}
