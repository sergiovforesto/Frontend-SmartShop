import Link from "next/link"
import {Edit, Trash2} from "react-feather"


export default function RowListCollection({id, title, quantityProducts}) {
    
  return (
    <>
        
        <tr className="text-center border-b last-of-type:border-none h-10">
           

            <td>
                <span className="font-medium">{id}</span>
            </td>
            
            <td>
                <span className="font-medium">{title}</span>
            </td>

            <td>
                <span className="font-medium">{quantityProducts}</span>
            </td>

            <td className="flex justify-end pr-6">
                <Link href={`/admin/products/collections/update/${id}`} className="mr-3 flex items-center w-8 h-8 rounded-full pl-[5px] hover:bg-slate-100">
                    <Edit size={21} className="text-primary hover:text-blue-700 "/>
                </Link>

                <Link
                    href={`/admin/products/collections/delete/${id}`} 
                    className="ml-3 flex items-center w-8 h-8 rounded-full pl-[5px] hover:bg-slate-100"
                >
                    <Trash2 size={21} className="text-danger hover:text-rose-600 "/>
                </Link>
            </td>
        </tr>
    </>
  )
}
