import {SignIn} from "@clerk/nextjs"

export default function Signup() {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn/>
        </div>
    )
}