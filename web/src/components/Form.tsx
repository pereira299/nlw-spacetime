'use client'
import api from '@/lib/api'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { FormEvent, FormHTMLAttributes } from 'react'

export default function Form(props: FormHTMLAttributes<HTMLFormElement>) {
  const router = useRouter()

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const file = form.get('coverUrl')
    let coverUrl = ''
    if (file) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', file as File)
      const response = await api.post('/upload', uploadFormData)
      coverUrl = response.data.url
    }

    await api.post(
      '/memories',
      {
        content: form.get('content'),
        coverUrl,
        isPublic: form.get('isPublic'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    )

    router.push('/')
  }

  return (
    <form onSubmit={submitHandler} {...props}>
      {props.children}
    </form>
  )
}
