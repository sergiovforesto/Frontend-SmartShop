import Link from 'next/link'
import Image from 'next/image'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 h-screen'>
      <h1 className='text-4xl text-gray-800 font-extrabold'>404 NOT FOUND</h1>
      <Image
        src='/page-not-found.png'
        width={300}
        height={300}
        alt='not-found'
      />
      <Link className='text-white bg-gray-800 px-5 py-[6px] rounded hover:bg-gray-700 mt-5' href="/">
        Return Home
      </Link>
    </div>
  )
}