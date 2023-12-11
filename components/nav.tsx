import Link from "next/link"
import Image from "next/image"
import ProfileAvatar from "./profile-avatar"
import { auth, signIn } from "@/app/auth"
import { Button } from "./ui/button"
import { PavilionSession, Roles } from "@/lib/types"
import { ALL_USERS, PRIVILEGED_USERS } from "@/lib/constants"
import Pav from '@/public/pav.jpeg';

const NavItems: { label: string, href: string, roles: Roles[] }[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        roles: PRIVILEGED_USERS
    },
    {
        label: "Talks",
        href: "/talks",
        roles: ALL_USERS
    },
    {
        label: "Notes",
        href: "/student",
        roles: [Roles.STUDENT]
    }
]

const renderNavItems = (userRole: Roles) => {
    return NavItems.map(({href, label, roles}) => {
        return  roles.includes(userRole) ? <Link key={label} href={href} className="hover:underline underline-offset-8">{label}</Link> : null
    })
}

export default async function Nav() {
    const session = await auth() as PavilionSession
    return (
        <nav className=" bg-gray-100 border-b-2 border-s-gray-300 text-slate-900 p-4 flex justify-between items-center">
            {/* Logo or Brand */}
            <div className="flex justify-between items-center gap-10">
                <Link href={"/"} className="text-lg font-semibold"><Image width={50} loading="lazy" src={Pav} alt="image of pavilion logo" /></Link>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    {!!session?.user && renderNavItems(session?.user?.role as Roles)}
                </div>
            </div>
            { session?.user ? <ProfileAvatar/>: <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: '/dashboard'})
            }}><Button>Sign In</Button></form> }
        </nav>
    )
}