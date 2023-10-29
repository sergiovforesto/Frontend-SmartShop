import Link from "next/link"

export default function Admin() {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Dashboard</h1>
      </div>
      <div className="bg-white shadow h-full rounded-xl">
        <div className="px-10 py-8 flex flex-col gap-4 justify-around sm:flex-row">
          
          <div className=" bg-blue-600 rounded-md px-5 py-7 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div>
                <p className="text-white sm:text-center font-semibold text-2xl">Orders</p>
              </div>
              
              <div>
                <div className="sm:text-center">
                  <p className="text-white text-xl font-semibold">20</p>
                  <p className="text-white font-semibold text-base">completed</p>
                </div>
              </div>
              
            </div>
          </div>

          <div className=" bg-indigo-600 rounded-md px-5 py-7 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div>
                <p className="text-white sm:text-center font-semibold text-2xl">Sales</p>
              </div>
              
              <div>
                <div className="sm:text-center">
                  <p className="text-white text-xl  font-semibold">$3.658</p>
                  <p className="text-white font-semibold text-base">completed</p>
                </div>
              </div>
              
            </div>
          </div>


          <div className=" bg-danger rounded-md px-5 py-7 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <div>
                <p className="text-white sm:text-center font-semibold text-2xl">Users</p>
              </div>
              
              <div>
                <div className="sm:text-center">
                  <p className="text-white text-xl font-semibold">20</p>
                  <p className="text-white font-semibold text-base">New users</p>
                </div>
              </div>
              
            </div>
          </div>
         
        </div>
      </div>
    </>
  )
}
