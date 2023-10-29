import Image from "next/image"
import Link from "next/link"
import {Home} from 'react-feather'

export const metadata = {
  title: 'Shopsmart Auth',
  description: 'Authentication',
}

export default function AuthLayout({ children }) {
    return (
      <>
        <main className="flex flex-col justify-center items-center p-3 h-screen">
          <div className="w-full h-20">
              <div className=" pl-60">
                <Link href='/' className="p-2 w-10 hover:text-primary rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center"> 
                  <Home className="h-5 text-txt-5E"/>
                </Link>
              </div>
          </div>

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