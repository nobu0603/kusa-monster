import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Contributions } from '@/components/organisms/Contributions'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Contributions Count</title>
        <meta name="description" content="Contributions Count!" />
      </Head>
      <main
        className={`flex min-h-screen flex-col items-center justify-between bg-blue-100 ${inter.className}`}
      >
        
        <Contributions />

      </main>
    </>
  )
}
