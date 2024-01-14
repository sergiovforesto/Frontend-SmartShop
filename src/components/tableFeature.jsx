'use client'
export default function ViewFeatures({features}) {

  return (
    <>
      <div className="mb-5">
        <h2 className="text-txt-5E text-lg font-bold">General Features</h2>
      </div>

      {/*table */}
      {features?.length === 0 && (
            <div className="mt-4 border w-full h-11 rounded-xl flex justify-center items-center bg-gray-50 text-letter-2">
              <p>This product dont have features</p>
            </div>
      )}
      
      <div 
        className={`${features?.length >= 1 ? 'mt-2 border rounded-xl w-full' : 'hidden'}`}
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
