import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "./ui/button"


export default function Nav() {
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
            {/* Avatar/Profile Picture */}
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Button variant={'ghost'}>
                            Sign Out
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    )
}