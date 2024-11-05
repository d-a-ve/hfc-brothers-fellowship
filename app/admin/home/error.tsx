"use client"

import { Button } from "@shared/ui/button"

export default function DashboardErrorBoundary({
	error,
	// reset,
}: {
	error: Error & { digest?: string }
	// reset: () => void
}) {
	return (
		<div className="mx-auto flex min-h-[calc(100dvh_-_200px)] max-w-[40ch] flex-col items-center justify-center gap-4 text-center">
			<h1 className="pb-3 font-semibold ~text-xl/4xl">
				Oops, An Error Occured.
			</h1>
			<p className="~text-sm/base">
				Sorry admin, something went wrong. Please refresh the page and try
				again.
			</p>
			<Button
				className="w-full max-w-[180px]"
				size={"lg"}
				onClick={() => window.location.reload()}
			>
				Refresh page
			</Button>
			<p className="~text-xs/sm">
				If the error persists, please drop a message for Dave on the WhatsApp
				group. Thank you.
			</p>
		</div>
	)
}
