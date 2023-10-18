import Image from "next/image"

export default function ConfirmLayout({children}) {
  return (
    <div className="flex justify-center items-center h-screen p-3">
      <div className=" bg-white border rounded-md p-6">
        <Image
          src="/smart-logo.svg"
          width={150}
          height={150}
          alt="vector"
          className="mx-auto"
          />
          {children}
      </div>
    </div>
  )
}
