import Image from "next/image"

export default function Spinner() {
  return (
    <div>
        <Image
            src="/spinner.svg"
            width={18}
            height={15}
            alt="vector"
            className="animate-spin"
        />
    </div>
  )
}
