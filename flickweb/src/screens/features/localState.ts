import { selectLoggedIN, selectUserEmail } from "./userSlice";
import { useSelector } from "react-redux";

export function LoggedIn() { return useSelector(selectLoggedIN) }
export function UserEmail() { return useSelector(selectUserEmail) }
