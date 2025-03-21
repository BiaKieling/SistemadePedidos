import { ReactNode, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

type ChildrenProps = {
    children: ReactNode;
};

type Props = {
    data: any[] | [],
    isLoading: boolean,
};

export const Context = createContext<Props>({
    data: [],
    isLoading: false
});

export const ContextProvider = ({ children }: ChildrenProps) => {
    const { data, isLoading } = useQuery({
        queryKey: ["data"],
        queryFn: async () => {
            const res = await api.get("/data");
            return res.data;
        }
    });

    return (
        <Context.Provider value={{ data, isLoading }}>
            {children}
        </Context.Provider>
    );
};
