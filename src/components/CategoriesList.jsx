import { useState } from "react"
import Link from "next/link"
import {ChevronDown} from 'react-feather'

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
          className="flex gap-1 text-txt-5E font-semibold"
        >
          categories
          <ChevronDown className="text-gray-500"/>
        </div>

        <div 
          className="absolute -left-7 mt-4"
        >
          <div 
            className={`${active ? 'block shadow bg-white rounded-md py-4' : 'hidden'}`}
            onMouseLeave={() => setActive(false)}
          >
            <ul className="flex flex-col gap-2">
              <li className="hover:bg-fondo-list w-32 rounded-sm hover:border-l-2 hover:border-primary px-6 py-1">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 hover:text-primary lowercase"
                >
                  Computer

                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-1">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 hover:text-primary lowercase"
                >
                  Mobile
                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-1">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 hover:text-primary lowercase"
                >
                  Watch
                </Link>
              </li>

              <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-1">
                <Link 
                  href="#"
                  className="flex items-center text-letter-2 gap-2 hover:text-primary lowercase"
                >
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
