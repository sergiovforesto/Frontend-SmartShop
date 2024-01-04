'use client'
import Link from "next/link"
import { Plus, Edit, Trash } from "react-feather"


export default function Features({id, features}) {
  
  return (
    <>
      <div className="">
        <h2 className="text-txt-5E text-lg font-semibold">General Features</h2>
      </div>
      
      <div className="mt-2 mb-5 flex justify-between items-center">
        <p className="md:text-base text-sm text-primary">Add features to your product:</p>

        <div className="flex items-center">

          <Link
            href={`/admin/products/add-features/${id}`}
            hidden={features?.length >= 1}
            className="text-white bg-primary font-bold px-5 py-[6px] rounded"
          >
            <Plus size={16}/>
          </Link>

          <div className="flex items-center gap-3">

            <Link
              href={`/admin/products/update-features/${id}`}
              hidden={features?.length === 0}
              className="text-white bg-secundary font-bold px-5 py-[6px] rounded" 
            >
              <Edit size={16}/>
            </Link>

            <Link
              href={`/admin/products/delete-features/${id}`}
              hidden={features?.length === 0}
              className="text-white bg-danger font-bold px-5 py-[6px] rounded" 
            >
              <Trash size={16}/>
            </Link>
          </div>
        </div>
      </div>

      {/*table */}

      {features?.length === 0 && (
        <div className="mt-4 border w-full h-11 md:w-[538px] rounded-xl flex justify-center items-center bg-gray-50 text-letter-2">
          <p>This product don't have features</p>
        </div>
      )}
      
      <div 
        className={`${features?.length >= 1 ? 'mt-2 border rounded-xl w-full xl:w-[70%]' : 'hidden'}`}
      >
        {features?.map((feature, index) => (
            <section key={index} > 
              <div
                className={`flex justify-between text-txt-5E px-14 py-3 border-b last-of-type:border-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl bg-bg-footer`}
              >
                <p>{feature.first}</p>
                <p>{feature.firstValue}</p>

                
              </div>

              <div 
                className={`flex justify-between text-txt-5E px-14 py-3 border-b last-of-type:border-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl bg-white`}
              >
                <p>{feature.second}</p>
                <p>{feature.secondValue}</p>

                
              </div>

              <div 
                className={`flex justify-between text-txt-5E px-14 py-3 border-b last-of-type:border-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl bg-bg-footer`}
              >
                <p>{feature.third}</p>
                <p>{feature.thirdValue}</p>

                
              </div>


              <div 
                className={`flex justify-between text-txt-5E px-14 py-3 border-b last-of-type:border-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl bg-white`}
              >
                <p>{feature.fourth}</p>
                <p>{feature.fourthValue}</p>

                
              </div>

              <div 
                className={`flex justify-between text-txt-5E px-14 py-3 border-b last-of-type:border-none first-of-type:rounded-t-xl last-of-type:rounded-b-xl bg-bg-footer`}
              >
                <p>{feature.fifth}</p>
                <p>{feature.fifthValue}</p>

                
              </div>
            </section>

            
          ))
        }
      </div>
    </>
  )
}
