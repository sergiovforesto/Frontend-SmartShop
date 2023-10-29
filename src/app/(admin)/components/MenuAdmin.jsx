import Image from "next/image"
import Link from "next/link"
import {Grid, Clipboard, Archive, Users, FileText, LogOut} from 'react-feather'

export default function MenuAdmin() {
  return (
    <>
        <div 
            className="sticky top-0 max-w-xs w-full"
        >
            
            <div className="bg-white max-w-xs h-screen rounded-r-lg shadow" >
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
                        <ul className="grid grid-cols-1 gap-3">
                            <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list text-txt-5E hover:underline hover:text-primary">
                                <Link
                                    href='/admin'
                                    className="flex items-center gap-3"
                                >
                                    <Grid/>
                                    <p className="font-semibold text-base ">Dashboard</p>
                                </Link>
                            </li>

                            <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list text-txt-5E hover:underline hover:text-primary">
                                <Link
                                    href='/admin/orders'
                                    className="flex items-center gap-3"
                                >
                                    <Clipboard/>
                                    <p className="font-semibold text-base ">Orders</p>
                                </Link>
                            </li>

                            <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list text-txt-5E hover:underline hover:text-primary">
                                <Link
                                    href='/admin/products'
                                    className="flex items-center gap-3"
                                >
                                    <Archive/>
                                    <p className="font-semibold text-base ">Products</p>
                                </Link>
                            </li>

                            <ul className="grid grid-cols-1 gap-2">
                                <li className="mx-10 px-6 py-1 rounded bg-slate-100 hover:underline hover:text-primary text-slate-400">
                                    <Link
                                        href='/admin/products/collections'
                                        className="font-semibold text-base "
                                    >
                                        Collections
                                    </Link>
                                </li>

                                <li className="mx-10 px-6 py-1 rounded bg-slate-100 hover:underline hover:text-primary text-slate-400">
                                    <Link
                                        href='/admin/products/inventory'
                                        className="font-semibold text-base"
                                    >
                                        Inventory
                                    </Link>
                                </li>
                            </ul>

                            <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:underline hover:text-primary text-txt-5E">
                                <Link
                                    href='/admin/customers'
                                    className="flex items-center gap-3"
                                >
                                    <Users/>
                                    <p className="font-semibold text-base">Customers</p>
                                </Link>
                            </li>

                            <li className="mx-5 px-2 py-1 rounded hover:bg-fondo-list hover:underline hover:text-primary text-txt-5E">
                                <Link
                                    href='/admin/invoices'
                                    className="flex items-center gap-3"
                                >
                                    <FileText/>
                                    <p className="font-semibold text-base">Invoices</p>
                                </Link>
                            </li>


                        </ul>

                        
                        
                    </div>
                </div>


                <button 
                    type="button"
                    className=" absolute bottom-24 left-10 z-10 flex gap-2 text-white hover:text-primary"
                >

                    Sign out
                    <LogOut/>
                </button>

                <Image
                    src="/vector-admin.svg"
                    width="320"
                    height={209}
                    alt="vector-admin"
                    className="absolute bottom-0"  
                />
            </div>
        </div>
    </>
  )
}
