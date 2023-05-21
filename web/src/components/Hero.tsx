import nlwLogo from '../assets/images/nlw-spacetime-logo.svg'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="space-y-5">
      <Image src={nlwLogo} alt="NLW Spacetime" />
      <div className="max-w-[420px] space-y-1">
        <h1 className=" text-4xl font-bold leading-tight text-gray-50">
          Sua capsula do tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>
      <a
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-bai text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Cadastrar lembrança
      </a>
    </div>
  )
}
