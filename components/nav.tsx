import Link from "next/link"
import ProfileAvatar from "./profile-avatar"
import { auth } from "@/app/auth"


export default async function Nav() {
    const session = await auth()
    return (
        <nav className=" bg-gray-100 border-b-2 border-s-gray-300 text-slate-900 p-4 flex justify-between items-center">
            {/* Logo or Brand */}
            <div className="flex justify-between items-center gap-10">
                <Link href={"#"} className="text-lg font-semibold">Logo</Link>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    <Link href="#" className="hover:underline underline-offset-8">
                        Home
                    </Link>
                    <Link href="#" className="hover:underline underline-offset-8">
                        About
                    </Link>
                    <Link href="#" className="hover:underline underline-offset-8">
                        Services
                    </Link>
                    {/* Add more links as needed */}
                </div>
            </div>
            <ProfileAvatar/> 
        </nav>
    )
}