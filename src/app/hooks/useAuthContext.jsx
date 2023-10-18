import { useContext } from "react";
import AuthContext from "../context/authProvider";

const useAuthContext = () => {
    return useContext(AuthContext)
}

export default useAuthContext