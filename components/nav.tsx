import Link from "next/link"
import ProfileAvatar from "./profile-avatar"
import { auth, signIn } from "@/app/auth"
import { Button } from "./ui/button"
import { PavilionSession, Roles } from "@/lib/types"
import { ALL_USERS, PRIVILEGED_USERS } from "@/lib/constants"

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
    if (!session?.user) {
        return null
    }
    return (
        <nav className=" bg-gray-100 border-b-2 border-s-gray-300 text-slate-900 p-4 flex justify-between items-center">
            {/* Logo or Brand */}
            <div className="flex justify-between items-center gap-10">
                <Link href={"/"} className="text-lg font-semibold">Logo</Link>

                {/* Links */}
                <div className="flex items-center space-x-4">
                    {renderNavItems(session?.user?.role as Roles)}
                    {/* <Link href="/dashboard" className="hover:underline underline-offset-8">
                       Dashboard 
                    </Link>
                    <Link href="/talks" className="hover:underline underline-offset-8">
                        Talks
                    </Link>
                    <Link href="#" className="hover:underline underline-offset-8">
                        Services
                    </Link> */}
                    {/* Add more links as needed */}
                </div>
            </div>
            { session?.user ? <ProfileAvatar/>: <form action={async () => {
                "use server"
                await signIn("google", { redirectTo: '/dashboard'})
            }}><Button>Sign In</Button></form> }
        </nav>
    )
}