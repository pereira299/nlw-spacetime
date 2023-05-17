import { User } from 'lucide-react'
import nlwLogo from '../assets/images/nlw-spacetime-logo.svg'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div className="relative flex flex-col items-start justify-between overflow-hidden  border-r border-white/10 bg-[ur(../assets/images/bg-stars.svg)] bg-cover px-28 py-16">
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full  bg-purple-700 opacity-50 blur-full"></div>
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"></div>
        <a
          href="#"
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User size={24} className="h5 w-5 text-gray-500" />
          </div>
          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas
            memórias para o futuro!
          </p>
        </a>
        <div className="space-y-5">
          <Image src={nlwLogo} alt="NLW Spacetime" />
          <div className="max-w-[420px] space-y-1">
            <h1 className=" text-4xl font-bold leading-tight text-gray-50">
              Sua capsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>
          <a className="inline-block rounded-full bg-green-500 px-5 py-3 font-bai text-sm uppercase leading-none text-black hover:bg-green-600">
            Cadastrar lembrança
          </a>
        </div>
        <div className="text-sm leading-relaxed text-gray-200">
          Desenvolvido com ❤ no NLW da{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://rocketseat.com.br"
            className="underline hover:text-gray-50"
          >
            Rocketseat
          </a>
        </div>
      </div>
      <div className="flex flex-col bg-[ur(../assets/images/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a href="#" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
