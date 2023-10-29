'use client'
import Image from "next/image"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Link from "next/link"

export default async function Home() {
  
  return (
    <>
      <header className="sticky">
        <Nav/>  
      </header>

        <main className="h-screen">

          <section >
            <p>primera section</p>
            <Link href='/admin'>
              admin
            </Link>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>
            
          </section>

          <section>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>

          </section>
          
          <section>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>
            <p>Contenido</p>

          </section>
        </main>
      <Footer/>
    </>
  )
}
