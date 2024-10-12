"use client"

import { Button } from "@shared/ui/button"
import Link from "next/link"

export default function DashboardErrorBoundary({
	error,
	// reset,
}: {
	error: Error & { digest?: string }
	// reset: () => void
}) {
    console.log(error);
	return <div className="min-h-svh flex items-center justify-center gap-4 flex-col max-w-[40ch] mx-auto text-center">
    <h1 className="font-semibold text-4xl pb-3">Oops, An Error Occured.</h1>
    <p>My brother, I am sorry, an error occured on this page. Please sign in and try again.</p>
    <Button asChild className="max-w-[180px] w-full" size={'lg'}>
    <Link href={'sign-in'}>Sign in</Link>
    </Button>
    <p className="text-sm">If the error persists, please drop a message on the WhatsApp group. Thank you.</p>
    </div>
}
