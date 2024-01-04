import { useState } from "react"
import Link from "next/link"
import {ChevronDown} from 'react-feather'

export default function Categories() {
  const [active, setActive] = useState(false)
  return (
    <>
      <div 
        className="relative cursor-pointer"
        onClick={() => setActive(!active)}
      >
        <div 
          className="flex gap-1 text-txt-5E font-semibold"
        >
          <span className="hover:text-letter">categories</span>
          <ChevronDown className="text-gray-500 hover:text-letter"/>
        </div>


          <div 
            className={`${active ? 'absolute -left-7 mt-6 bg-white rounded-md shadow' : 'hidden'}`}
          >
            <div 
              className=""
            >
              <ul className="flex flex-col">
                <li className="hover:bg-fondo-list w-[9rem] rounded-sm hover:border-l-2 hover:border-primary px-6 py-[6px]">
                  <Link 
                    href="#"
                    className="flex items-center text-base text-letter-2 gap-2 hover:text-primary lowercase"
                  >
                    Computer

                  </Link>
                </li>

                <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-[6px]">
                  <Link 
                    href="#"
                    className="flex items-center text-base text-letter-2 gap-2 hover:text-primary lowercase"
                  >
                    Mobile
                  </Link>
                </li>

                <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-[6px]">
                  <Link 
                    href="#"
                    className="flex items-center text-base text-letter-2 gap-2 hover:text-primary lowercase"
                  >
                    Watch
                  </Link>
                </li>

                <li className="hover:bg-fondo-list rounded-sm hover:border-l-2 hover:border-primary px-6 py-[6px]">
                  <Link 
                    href="#"
                    className="flex items-center text-base text-letter-2 gap-2 hover:text-primary lowercase"
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
