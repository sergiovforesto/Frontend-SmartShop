import { Heart } from "react-feather"
export default function WishList() {
  return (
    <button 
        type="button"
        onClick={() => alert('Diste click en wishlist')}
        className="flex items-center"
    >
        <span className="text-micro absolute right-0 top-0 bg-success text-white rounded-full px-1 py-mini">1</span>
        <Heart className="text-txt-5E w-6"/>
    </button>
  )
}
