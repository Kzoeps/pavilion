import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut, auth } from "@/app/auth";
import { getInitials } from "@/lib/utils";

export default async function ProfileAvatar() {
    const session = await auth();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={session?.user?.image as string | undefined} alt="user image" />
                    <AvatarFallback>{getInitials(session?.user?.name)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={async () => {
                        "use server"
                        await signOut({redirectTo: '/'});
                    }}>
                        <Button variant={'link'}>
                            Sign Out
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}