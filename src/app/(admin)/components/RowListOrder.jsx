import Link from "next/link"
import { resetMoney } from "@/helpers/resetMoney"

export default function RowListOrder(
    {
        id, order, status, dateOrder, 
        dateDelivery, subTotal, total
    }
) {

    const firstsNumbers = (numbers) => {
        const order = numbers.slice(0, 7)
        return order
    }

    
  return (
    <>
        <tr className="text-center border-b last-of-type:border-none text-[12px] sm:text-sm h-10">
            <td>
                <span>{id}</span>
            </td>
            <td>
                <Link 
                    href={`/admin/orders/view-order/${order}`}
                    className="font-medium text-primary underline"
                >
                    {firstsNumbers(order)}
                </Link>
            </td>
            <td>
                <span 
                    className={`
                        ${status === 'delivered' && 'bg-success text-sm '},
                        ${status === 'pending' && 'bg-secundary text-sm '},
                        ${status === 'shipped' && 'bg-primary text-sm '},
                        ${status === 'cancelled' && 'bg-gray-600 text-sm '},
                        rounded-md px-2 py-[4px] text-white
                    `}
                >
                    {status}
                </span>
            </td>

            <td>
                <span className="font-medium">{dateOrder}</span>
            </td>

            <td>
                <span className="font-medium">{dateDelivery}</span>
            </td>

            <td>
                <span className="font-medium">{resetMoney( subTotal )}</span>
            </td>

            <td>
                <span className="font-medium">{resetMoney(total )}</span>
            </td>

            
        </tr>
    </>
  )
}
