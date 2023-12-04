import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Contributions } from '@/components/organisms/Contributions'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>草テスト</title>
        <meta name="description" content="草テスト" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between py-14 ${inter.className}`}
      >
        
        <Contributions />

      </main>
    </>
  )
}
