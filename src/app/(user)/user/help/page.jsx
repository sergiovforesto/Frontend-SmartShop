
export default function Help() {
  return (
    <>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-letter">Help</h1>
      </div>
      <div className="bg-white border h-full rounded-xl">
        <div className="px-10 py-8">
         <section>
            <div>
              <p className="text-secundary underline mb-2">
                Send us an email
              </p>
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-y-4 gap-x-4">
              <div>
                <p className="text-letter-2">Full Name</p>
                <input 
                  type="text"
                  placeholder="Full Name" 
                  className="bg-bg-input border-2 w-full border-br-input rounded pl-2 text-sm h-8 outline-primary"
                />
              </div>

              <div>
                <p className="text-letter-2">Subject</p>
                <input 
                  type="text"
                  placeholder="subject" 
                  className="bg-bg-input border-2 w-full border-br-input rounded pl-2 text-sm h-8 outline-primary"
                />
              </div>


              <div>
                <p className="text-letter-2">Email</p>
                <input 
                  type="text"
                  placeholder="Email" 
                  className="bg-bg-input border-2 w-full border-br-input rounded pl-2 text-sm h-8 outline-primary"
                />
              </div>

              <div>
                <p className="text-letter-2">Phone</p>
                <input 
                  type="text"
                  placeholder="Phone" 
                  className="bg-bg-input border-2 w-full border-br-input rounded pl-2 text-sm h-8 outline-primary"
                />
              </div>

            </div>

            <p className="text-letter-2 mt-5 mb-3">Describe your problem</p>
            <textarea
              rows="4"
              className="bg-bg-input border-2 w-full border-br-input rounded p-3 text-sm outline-primary"
              placeholder="Your problem...."
            >


            </textarea>
            <button 
              type="button"
              className="bg-primary text-white text-sm px-4 py-[6px] mt-2 rounded hover:bg-blue-700"
            >
              Send email
            </button>

         </section>
        </div>
      </div>
    </>
  )
}
