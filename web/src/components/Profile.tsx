import { getUser } from '@/lib/auth'
import Image from 'next/image'

export default function SignIn() {
  const { name, avatarUrl } = getUser()

  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          src={avatarUrl}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="text-md max-w-[140px] leading-snug">
        {name}
        <a href="#" className="block text-sm text-red-400 hover:text-red-300 ">
          Sair
        </a>
      </p>
    </a>
  )
}
