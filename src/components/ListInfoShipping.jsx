'use client'

export default function ListInfoShipping({info}) {

  return (
    <>
        <div>
            <div className="grid md:grid-rows-3 grid-cols-1 gap-y-5 md:gap-y-4 md:grid-cols-2 mt-6">

                <div className="flex gap-2 flex-col">
                    <p>Country:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.country}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <p>Address:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.address}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <p>Phone Number:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.phone}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <p>City:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.city}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>

                <div className="flex gap-2 flex-col">
                    <p>State:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.state}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>


                <div className="flex gap-2 flex-col">
                    <p>Zip Code:</p>
                    <input 
                        type="text"
                        disabled
                        placeholder={info.zipCode}
                        className='bg-bg-input border-2 w-full md:w-[90%] border-br-input placeholder:text-primary rounded pl-2 text-sm h-8 outline-primary'
                    />
                </div>
            </div>

            

        </div>
    </>
  )
}
