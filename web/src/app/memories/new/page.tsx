import Form from '@/components/Form'
import MediaPicker from '@/components/MediaPicker'
import { Camera, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        Voltar a timeline
      </Link>

      <Form className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-4">
          <label
            htmlFor="media"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <Camera className="h-4 w-4" />
            Anexar midia
          </label>
          <label
            htmlFor="isPublic"
            className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
          >
            <input
              type="checkbox"
              name="isPublic"
              id="isPublic"
              className="h-4 w-4 rounded border-gray-400 bg-gray-500 text-purple-500"
            />
            Tornar público
          </label>
        </div>
        <MediaPicker />
        <textarea
          name="content"
          spellCheck={false}
          className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed outline-none placeholder:text-gray-400 focus:ring-0"
          placeholder="Escreva sua lembrança, adicione fotos e videos sobre experiencias que viveu..."
        ></textarea>

        <button
          type="submit"
          className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-bai text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Cadastrar lembrança
        </button>
      </Form>
    </div>
  )
}
