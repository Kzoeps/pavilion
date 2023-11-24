import { Button } from "@/components/ui/button";
import { signIn } from "../auth";
export default function LoginPage() {
    return (
        <main className="flex justify-center items-center h-screen" >
            <form className="w-1/3" action={async () => {
                "use server"
                // sign in options: https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/lib/actions.ts
                await signIn("google", { redirectTo: '/dashboard'})
            }}>
                <Button className="w-full" type="submit">Sign In With Google</Button>
            </form>
        </main>
    );
}   