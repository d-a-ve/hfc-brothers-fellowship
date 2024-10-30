"use client"

import { Button } from "@shared/ui/button"
import { AppLink } from "@shared/ui/link"

export default function DashboardErrorBoundary({
	error,
	// reset,
}: {
	error: Error & { digest?: string }
	// reset: () => void
}) {
	console.log(error)
	return (
		<div className="mx-auto flex min-h-svh max-w-[40ch] flex-col items-center justify-center gap-4 text-center">
			<h1 className="pb-3 text-4xl font-semibold">Oops, An Error Occured.</h1>
			<p>
				My brother, I am sorry, an error occured on this page. Please sign in
				and try again.
			</p>
			<Button asChild className="w-full max-w-[180px]" size={"lg"}>
				<AppLink className="no-underline hover:no-underline" href={"sign-in"}>
					Sign in
				</AppLink>
			</Button>
			<p className="text-sm">
				If the error persists, please drop a message on the WhatsApp group.
				Thank you.
			</p>
		</div>
	)
}
