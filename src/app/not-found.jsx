import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center gap-2 h-screen'>
      <h2 className=' text-primary text-3xl font-bold'>Not Found</h2>
      <p className=' text-letter'>Could not find requested resource</p>
      <Link className=' text-letter underline hover:text-primary' href="/">Return Home</Link>
    </div>
  )
}