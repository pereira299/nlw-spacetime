import EmptyMemories from '@/components/memories/EmptyMemories'
import api from '@/lib/api'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  isPublic: boolean
  createdAt: string
}

export default async function Home() {
  const isAuth = cookies().get('token')

  if (!isAuth) {
    return <EmptyMemories />
  }

  const token = cookies().get('token')?.value
  const res = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories = res.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory: Memory) => (
        <div key={memory.id} className="space-y-4">
          <time
            dateTime={memory.createdAt}
            className="ml-[-9.4rem] flex items-center gap-2 text-sm text-gray-50 after:h-px after:w-5 after:bg-gray-50"
          >
            {Intl.DateTimeFormat('pt-BR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
              .format(new Date(memory.createdAt))
              .replaceAll(' de', '')}
          </time>
          <Image
            src={memory.coverUrl}
            alt={memory.excerpt}
            width={592}
            height={288}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
