import { useEffect, useState } from "react"
import { ThemeProvider } from "next-themes";
import AdminNavbar from "./AdminNavbar";
import { Toaster } from "sonner";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router";

const Layout = ({ children }) => {
    const {pathname} = useLocation();
    const [toggleSidebar, setToggleSidebar] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <ThemeProvider>
            {
                <>
                    <div className="admin-layout">
                        <Sidebar
                            toggleSidebar={toggleSidebar}
                            setToggleSidebar={setToggleSidebar}
                        />
                        <main
                            className={`min-h-full ${toggleSidebar ? "admin-content" : ""}`}
                        >
                            <AdminNavbar
                                toggleSidebar={toggleSidebar}
                                setToggleSidebar={setToggleSidebar}
                            />
                            {children}
                        </main>
                        <Toaster />

                    </div>
                </>

            }
        </ThemeProvider>
    )
}

export default Layout