export default function LoginPage() {
    return (
        <div>
            <h1>Login Page</h1>
            <div className="flex flex-col gap-2 font-black" >
                <div>
                    <label htmlFor="email">Email</label>
                    <br/>
                    <input type="email" placeholder="email" name="email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <br/>
                    <input type="password" placeholder="password" name="password"/>
                </div>
            </div>
        </div>
    );
}   