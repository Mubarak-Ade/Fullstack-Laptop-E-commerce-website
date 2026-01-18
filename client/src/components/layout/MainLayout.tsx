import {Outlet} from "react-router"
import {Navbar} from "../shared/Navbar"
import {Footer} from "./Footer"

export const MainLayout=() => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
