import Link from "next/link"
import {Edit, Trash2} from "react-feather"

export default function RowListProduct({id, title, status, stock, price, discount}) {
  return (
    <>
        <tr className="text-center border-b last-of-type:border-none text-[12px] sm:text-sm h-10">
            <td>
                <span>{id}</span>
            </td>
            <td>
                <span className="font-medium">{title}</span>
            </td>
            <td>
                <span className={`${status ? 'bg-success text-white px-4 py-1 rounded-xl' : 'bg-danger text-white px-4 p-[2px] md:py-1 rounded-xl'}`}>
                    {status ? 'Active' : 'OFF'}
                </span>
            </td>

            <td>
                <span className="font-medium">{stock}</span>
            </td>

            <td>
                <span className="font-medium">${price}</span>
            </td>

            <td>
                <span className="font-medium">{discount}%</span>
            </td>

            <td>
                <Link 
                    className=" w-8 h-8 flex items-center rounded-full pl-[5px] hover:bg-slate-100"
                    href={`/admin/products/update/${id}`}
                >
                    <Edit className="text-primary hover:text-blue-700 "/>
                </Link>

            </td>
            <td>
                <Link 
                    className=" w-8 h-8 flex items-center rounded-full pl-[5px] hover:bg-slate-100"
                    href={`/admin/products/delete/${id}`}
                >
                    <Trash2 className="text-danger hover:text-rose-600 "/>
                </Link>
            </td>
        </tr>
    </>
  )
}
