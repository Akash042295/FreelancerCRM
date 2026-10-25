import { useAuthContext } from "../Context/AuthContext";

const useAuth = () => {
    return useAuthContext();
};

export default useAuth;