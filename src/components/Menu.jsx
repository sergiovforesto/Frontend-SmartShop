import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Menu({open, setOpen}) {
    const [active, setActive] = useState(false)
  return (
    <>
    <div 
        className={`${open ? 'sticky top-0 z-10 w-full h-screen ' : ' hidden'}`}
    >
            <div 
                className="bg-letter-2 bg-opacity-30"
            >
                <div className="bg-white max-w-xs h-screen rounded-r-lg shadow " >
                    <div className="p-5">
                        <div className="mb-6">
                            <button 
                                type="button"
                                className="hover:bg-slate-100 rounded-full p-1"
                                onClick={() => setOpen(!open)}
                                
                            >
                                <Image
                                    src="/x.svg"
                                    width={30}
                                    height={30}
                                    alt="close" 
                                />
                            </button>
                        </div>

                        <div>
                            <ul className="grid grid-cols-1 gap-3">
                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/user-menu.svg"
                                            width={23}
                                            height={22}
                                            alt="user" 
                                        />
                                        <p className="font-semibold text-base">Account</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/shopping-bag.svg"
                                            width={23}
                                            height={22}
                                            alt="bag" 
                                        />
                                        <p className="font-semibold text-base">My shopping</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/shopping-cart-list.svg"
                                            width={23}
                                            height={22}
                                            alt="cart"
                                        />
                                        <p className="font-semibold text-base">Cart</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/heart-list.svg"
                                            width={23}
                                            height={22}
                                            alt="wishlist"
                                        />
                                        <p className="font-semibold text-base">Wishlist</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/credit-card.svg"
                                            width={23}
                                            height={22}
                                            alt="credit-cart"
                                        />
                                        <p className="font-semibold text-base">Payment Method</p>
                                    </Link>
                                </li>

                                <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                    <Link
                                        href=''
                                        className="flex items-center gap-3"
                                    >
                                        <Image
                                            src="/help-circle.svg"
                                            width={23}
                                            height={22}
                                            alt="help"
                                        />
                                        <p className="font-semibold text-base">Help</p>
                                    </Link>
                                </li>

                            </ul>

                            <hr  className="mt-5 invisible"/>

                            <div className="mx-5 px-2 mt-5">
                                <div 
                                    className="flex items-center gap-1 text-letter-2 font-semibold cursor-pointer"
                                    onClick={() => setActive(!active)}
                                >
                                    <p>Categories</p>
                                    <Image
                                        src="/chevron-down.svg"
                                        width={23}
                                        height={22}
                                        alt="arrow-down"
                                        className={`${active ? 'transition rotate-180' : ' rotate-0'}`}
                                    />
                                </div>

                                <ul 
                                    className={`${active ? 'grid grid-cols-1 items-center gap-2 mt-4' : 'hidden'}`}
                                >
                                    <li className="px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">
                                                computer
                                            </span>

                                            Computer
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">
                                                smartphone
                                            </span>

                                            Mobile
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="flex items-center gap-2"
                                        >
                                            <span className="material-symbols-outlined">
                                                watch
                                            </span>

                                            Watch
                                        </Link>
                                    </li>

                                    <li className="px-2 py-1 rounded hover:bg-fondo-list hover:border-l-2 border-primary">
                                        <Link
                                            href=''
                                            className="flex items-center gap-2"
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
                </div>
            </div>
        </div>
    </>
  )
}
