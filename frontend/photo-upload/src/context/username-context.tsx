import { createContext } from "react";

type UsernameContext = string;

const initialContext: UsernameContext = "";
export const UserNameContext = createContext(initialContext);
