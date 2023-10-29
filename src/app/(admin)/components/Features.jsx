'use client'

export default function Features() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-txt-5E text-lg font-semibold pb-2">General Features</h2>
      </div>
      
      <div className="flex items-end gap-3 w-1/2">

        <div>
          <p className="text-txt-5E font-semibold pb-2">Name</p>
          <input 
            type="text" 
            id=""
            placeholder="wifi"
            className="px-4 py-1 border-2 outline-none rounded bg-bg-input" 
          />
        </div>

        <div>
          <p className="text-txt-5E font-semibold pb-2">Value</p>
          <input 
            type="text" 
            id=""
            placeholder="yes"
            className="px-4 py-1 border-2 outline-none rounded bg-bg-input" 
          />
        </div>

        <button 
          type="button"
          className="bg-secundary px-7 py-1 h-9 rounded text-white text-lg font-bold hover:bg-violet-700"
        >
          +
        </button>

      </div>

      <div className="mt-7 border w-1/2 rounded-xl">
          <div className="">

            <div className="flex justify-between text-txt-5E bg-bg-footer px-14 py-3 border-b rounded-t-xl">
              <p>name</p>
              <p>value</p>
            </div>


            <div className="flex justify-between text-txt-5E px-14 py-3 border-b">
              <p>name</p>
              <p>value</p>
            </div>


            <div className="flex justify-between text-txt-5E bg-bg-footer px-14 py-3 border-b">
              <p>name</p>
              <p>value</p>
            </div>

            <div className="flex justify-between text-txt-5E px-14 py-3 border-b">
              <p>name</p>
              <p>value</p>
            </div>

            <div className="flex justify-between text-txt-5E bg-bg-footer px-14 py-3 rounded-b-xl">
              <p>name</p>
              <p>value</p>
            </div>

            

          </div>
      </div>
    </>
  )
}
