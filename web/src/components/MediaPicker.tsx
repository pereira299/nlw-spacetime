'use client'

import Image from 'next/image'
import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  const uploadHandler = (event: ChangeEvent) => {
    const { files } = event.target as HTMLInputElement
    if (!files) return

    const file = files[0]

    const url = URL.createObjectURL(file)

    setPreview(url)
  }
  return (
    <>
      <input
        onChange={uploadHandler}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible"
      />

      {preview && (
        <Image
          src={preview}
          width={200}
          height={200}
          alt="preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
