import { useContext } from "react";
import SearchContext from "../context/searchProvider";

const useSearchContext = () => {
    return useContext(SearchContext)
}

export default useSearchContext