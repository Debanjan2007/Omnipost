import {SignUp} from "@clerk/nextjs"

export default function Signup() {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignUp/>
        </div>
    )
}