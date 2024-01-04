

export default function RowListCustomers({id, name, lastName, email}) {
    
  return (
    <>
        
        <tr className="text-center border-b text-[12px] sm:text-base h-11">
            

            <td>
                <span className="font-medium">{id}</span>
            </td>
            
            <td>
                <span className="font-medium">{name}</span>
            </td>

            <td>
                <span className="font-medium">{lastName}</span>
            </td>

            <td>
                <span className="font-medium">{email}</span>
            </td>
            
        </tr>
    </>
  )
}
