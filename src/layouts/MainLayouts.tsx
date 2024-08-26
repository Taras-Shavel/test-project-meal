import { FC } from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

const MainLayouts: FC = () => {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}
export { MainLayouts }