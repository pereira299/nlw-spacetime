import EmptyMemories from '@/components/memories/EmptyMemories'
import api from '@/lib/api'
import { cookies } from 'next/headers'

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
          <time className="flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {Intl.DateTimeFormat('pt-BR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            }).format(new Date(memory.createdAt || new Date()))}
          </time>
        </div>
      ))}
    </div>
  )
}
