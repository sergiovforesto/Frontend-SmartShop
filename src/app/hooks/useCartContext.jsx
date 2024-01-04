import { useContext } from "react";
import CartContext from "../context/cartProvider";

const useCartContext = () => {
    return useContext(CartContext)
}

export default useCartContext