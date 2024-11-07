"use client"

import { Button } from "@shared/ui/button"

export default function AdminAcceptInviteErrorBoundary({
	error,
	// reset,
}: {
	error: Error & { digest?: string }
	// reset: () => void
}) {
	console.error(error)
	return (
		<div className="mx-auto flex min-h-[calc(100dvh_-_200px)] max-w-[50ch] flex-col items-center justify-center gap-4 text-center">
			<h1 className="pb-3 font-semibold ~text-xl/4xl">
				Oops, something went wrong.
			</h1>
			<p className="~text-sm/base">
				Your invite to join the admin team was not successful because{" "}
				<span className="italic">"{error.message}"</span>. Please contact the admin that invited you.
			</p>
			<Button
				className="w-full max-w-[180px]"
				size={"lg"}
				onClick={() => window.location.reload()}
			>
				Go to home page
			</Button>
		</div>
	)
}
