"use client"

import {useEffect} from "react"
import {RefreshCw, ServerCrash, Home, Bug} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <Card className="w-full max-w-lg">
                <CardHeader className="text-center">
                    <div
                        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                        <ServerCrash className="h-10 w-10 text-destructive"/>
                    </div>

                    <CardTitle className="text-3xl">
                        Something went wrong
                    </CardTitle>

                    <CardDescription className="mt-2">
                        An unexpected server error occurred while processing your request.
                        Please try again.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-muted/40 p-4">
                        <div className="flex items-center gap-2 font-medium">
                            <Bug className="h-4 w-4"/>
                            Error Information
                        </div>

                        <p className="mt-3 text-sm text-muted-foreground">
                            If the problem persists, contact support with the reference ID
                            below.
                        </p>

                        {error.digest && (
                            <div className="mt-4 rounded-md bg-background p-3 font-mono text-xs">
                                Reference ID: {error.digest}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button onClick={() => reset()} className="flex-1">
                            <RefreshCw className="mr-2 h-4 w-4"/>
                            Try Again
                        </Button>

                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => (window.location.href = "/")}
                        >
                            <Home className="mr-2 h-4 w-4"/>
                            Home
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}