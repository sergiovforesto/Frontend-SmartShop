'use client'
import Nav from "@/components/Nav"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "react-feather"

export default function CheckingLayout({children}) {
    const router = useRouter()
  return (
    <>  
        <header className="sticky z-10">
            <Nav/>  
        </header>
        <section className="imagen-prueba">
            <div className="h-[25rem]"></div>
        </section>

        <div className="absolute top-24 w-full">
            <div className="flex justify-center items-center h-full py-3 md:py-10 md:px-8 xl:px-20 px-3">
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="absolute -top-4 md:top-0 left-4 md:left-20 border text-gray-500 hover:bg-slate-50 hover:text-primary rounded-full px-2 py-2"
                >
                    <ArrowLeft size={16}/>
                </button>
                <section className="bg-white w-full h-full shadow-lg mt-3 rounded-xl px-5 md:px-10 md:py-10 py-5 flex flex-col-reverse gap-y-10 md:gap-y-0 md:flex-row md:gap-x-7 xl:gap-x-16">
                    {children}
                </section>
            </div>
        </div>
    </>
  )
}
