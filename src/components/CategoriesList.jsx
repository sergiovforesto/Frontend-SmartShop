import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Categories() {
  const [active, setActive] = useState(false)
  return (
    <>
      <div 
        className="relative"
        value={active}
        onMouseEnter={() => setActive(true)}
      >
        <div 
          className="flex gap-1 text-letter font-semibold"
        >
          categories
          <Image
            src="/chevron-down.svg"
            width={18}
            height={18}
            alt="arrow-down"
          />
        </div>

        <div 
          className="absolute -left-11 mt-4"
        >
          <div 
            className={`${active ? 'block shadow bg-white rounded-md py-4' : 'hidden'}`}
            onMouseLeave={() => setActive(false)}
          >
            <ul className="flex flex-col gap-3">
              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 text-sm hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    computer
                  </span>

                  Computer

                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 text-sm hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    phone_iphone
                  </span>
                  Mobile
                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 text-sm hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    watch
                  </span>
                  Watch
                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 text-sm hover:text-primary"
                >
                  <span className="material-symbols-outlined">
                    gamepad
                  </span>
                  Gaming
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
