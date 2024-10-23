import { useContext } from "react";
import { AuthContext } from "../provider/AuthProdiver";


const useAuth = () => {
    const auth=useContext(AuthContext)
    return auth
};

export default useAuth;