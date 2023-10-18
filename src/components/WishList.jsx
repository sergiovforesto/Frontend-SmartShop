import Image from "next/image"

export default function WishList() {
  return (
    <button 
        type="button"
        onClick={() => alert('Diste click en wishlist')}
        className="flex items-center"
    >
        <span className="text-micro absolute right-0 top-0 bg-success text-white rounded-full px-1 py-mini">1</span>
        <Image
          src="/heart.svg"
          width={24}
          height={24}
          alt="wishlist"
        />
    </button>
  )
}
