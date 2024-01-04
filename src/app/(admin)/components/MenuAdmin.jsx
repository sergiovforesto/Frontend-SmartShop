'use client'
import { usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import {Grid, Clipboard, Archive, Users, LogOut, Power} from 'react-feather'

export default function MenuAdmin() {
    const router = useRouter()
    const pathName = usePathname()
  return (
    <>
        <div 
            className="sticky top-0 sm:max-w-xs w-full p-5 sm:p-0"
        >
            
            <div className="bg-white sm:max-w-xs sm:h-screen sm:rounded-r-lg rounded-xl sm:shadow border sm:border-none" >
                <div className="p-5">
                    <div className="mb-6">
                        <Link 
                            href='/'
                            className="flex justify-center mt-5 mb-8"
                            
                        >
                            <Image
                                src="/smart-logo.svg"
                                width={120}
                                height={130}
                                alt="Logo"
                                 
                            />
                        </Link>
                    </div>

                    <div>
                        <ul className="grid grid-cols-3 sm:grid-cols-1 gap-3">
                            <li className={`${pathName === '/admin' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/admin'
                                    className="flex items-center gap-3"
                                >
                                    <Grid/>
                                    <p className="font-semibold text-base hidden sm:block">Dashboard</p>
                                </Link>
                            </li>

                            <li className={`${pathName === '/admin/orders' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/admin/orders'
                                    className="flex items-center gap-3"
                                >
                                    <Clipboard/>
                                    <p className="font-semibold text-base hidden sm:block">Orders</p>
                                </Link>
                            </li>

                            <li className={`${pathName === '/admin/products' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/admin/products'
                                    className="flex items-center gap-3"
                                >
                                    <Archive/>
                                    <p className="font-semibold text-base hidden sm:block">Products</p>
                                </Link>
                            </li>

                            <ul className="hidden sm:grid grid-cols-1 gap-2">
                                <li 
                                    className={`${pathName === '/admin/products/collections' ? 'bg-blue-50 underline text-primary ' : 'text-slate-400 hover:underline bg-slate-50'} mx-10 px-6 py-1 rounded `}
                                >
                                    <Link
                                        href='/admin/products/collections'
                                        className="font-semibold text-base"
                                    >
                                        Collections
                                    </Link>
                                </li>

                                <li 
                                    className={`${pathName === '/admin/products/create' ? 'bg-blue-50 underline text-primary ' : 'text-slate-400 hover:underline bg-slate-50'} mx-10 px-6 py-1 rounded `}
                                >
                                    <Link
                                        href='/admin/products/create'
                                        className="font-semibold text-base"
                                    >
                                        Create product
                                    </Link>
                                </li>
                            </ul>

                            <li className={`${pathName === '/admin/customers' ? 'bg-fondo-list text-primary underline ' : 'text-txt-5E hover:text-primary hover:underline bg-fondo-list sm:bg-white py-2' } mx-5 px-2 sm:py-1 sm:rounded sm:hover:bg-fondo-list sm:bg-white sm:justify-start rounded-full flex justify-center`}>
                                <Link
                                    href='/admin/customers'
                                    className="flex items-center gap-3"
                                >
                                    <Users/>
                                    <p className="font-semibold text-base hidden sm:block">Customers</p>
                                </Link>
                            </li>


                            <li className="flex sm:hidden justify-center mx-5 px-2 py-2 text-txt-5E hover:text-primary rounded-full bg-fondo-list">
                                <button
                                    type='button'
                                    className=" items-center"
                                >
                                    <Power/>
                                </button>
                            </li>


                        </ul>

                        
                        
                    </div>
                </div>


                <button 
                    type="button"
                    onClick={() => router.push('/')}
                    className="md:flex hidden absolute bottom-24 left-10 z-10 gap-2 text-white hover:text-primary"
                >

                    Sign out
                    <LogOut/>
                </button>

                <Image
                    src="/vector-admin.svg"
                    width="320"
                    height={209}
                    alt="vector-admin"
                    className="md:block md:absolute bottom-0 hidden"  
                />
            </div>
        </div>
    </>
  )
}
