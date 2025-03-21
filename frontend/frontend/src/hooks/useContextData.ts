import { useContext } from "react";
import { Context } from "../contexts/Context";

export const useContextData = () => {
    return useContext(Context);
};
