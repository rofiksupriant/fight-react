import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Navigation = () => {
    return (
        <Fragment>
            <h1>Navigation</h1>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;