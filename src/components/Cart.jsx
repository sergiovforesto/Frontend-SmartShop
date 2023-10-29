import { ShoppingCart } from "react-feather"
export default function Cart() {
  return (
    <button 
        type="button"
        onClick={() => alert('Diste click en cart')}
        className="flex items-center"
    >
        <span className="text-micro absolute right-0 top-0 bg-success text-white rounded-full px-1 py-mini">1</span>
        <ShoppingCart className="text-txt-5E w-6"/>
    </button>
  )
}
