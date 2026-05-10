import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { Loader2Icon } from 'lucide-react'
import { useUser, SignIn } from '@clerk/clerk-react'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const dispatch = useDispatch()

    // SAFE REDUX ACCESS
    const workspace = useSelector((state) => state.workspace)
    const loading = workspace?.loading || false

    // CLERK USER
    const { user, isLoaded } = useUser()

    useEffect(() => {
        dispatch(loadTheme())
    }, [dispatch])

    // Clerk loading
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2Icon className="animate-spin" />
            </div>
        )
    }

    // Not signed in
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <SignIn />
            </div>
        )
    }

    // App loading
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2Icon className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            <div className="flex-1 flex flex-col h-screen">
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />

                <div className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout