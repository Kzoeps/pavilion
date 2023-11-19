import { Button } from "@/components/ui/button";
import { signIn } from "../auth";
export default function LoginPage() {
    return (
        <main className="flex justify-center items-center h-screen" >
            <form className="w-1/3" action={async () => {
                "use server"
                await signIn("google")
            }}>
                <Button className="w-full" type="submit">Sign In With Google</Button>
            </form>
        </main>
    );
}   