import { Inter } from 'next/font/google';
import { Contributions } from '@/components/organisms/Contributions';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>GitHub Contributions</title>
        <meta name="description" content="GitHub My Contributions Count!" />
        <meta property="og:image" content="/image/opengraph-image.jpg"/>
      </Head>
      <main
        className={`flex h-[calc(100dvh)] flex-col items-center justify-between bg-blue-100 ${inter.className}`}
      >
        
        <Contributions />

      </main>
    </>
  )
}
