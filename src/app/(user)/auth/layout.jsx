import Image from "next/image"
import Link from "next/link"
export const metadata = {
  title: 'Shopsmart Auth',
  description: 'Authentication',
}

export default function AuthLayout({ children }) {
    return (
      <>
        <div className="flex justify-center items-center h-32">
            <div className="w-11/12">
              <Link href='/' className="text-gray-500 p-1 w-10 hover:text-primary rounded-full bg-slate-200 flex items-center justify-center"> 
                <span className="material-symbols-outlined">
                  home
                </span>
              </Link>
            </div>
        </div>
        <main className="flex justify-center items-center p-3">
        
          <div className="max-w-xl bg-white shadow-xl rounded-xl">
            <Link href='/'>
              <Image
                src="/smart-logo.svg"
                width={150}
                height={150}
                alt="vector"
                className="mx-auto pt-2 mt-7"
              />
            </Link>
            
              {children}

            <Image
              src="/vector.png"
              width={317}
              height={66}
              alt="vector"
              className="rounded-b-xl mt-6 w-full"
            />
          </div>
        </main>
      </>
    )
}