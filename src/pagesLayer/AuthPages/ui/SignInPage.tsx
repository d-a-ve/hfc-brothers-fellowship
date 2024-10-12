import { Suspense } from "react"

import { redirect } from "next/navigation"

import { getLoggedInUser } from "@shared/lib/api"

import { SignInForm } from "./SignInForm"

export async function SignInPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) redirect("/b")

	return (
		<div className="mx-auto grid h-full min-h-svh max-w-lg place-items-center">
			<div className="w-full">
				<Suspense fallback={<p>Loading...</p>}>
					<SignInForm />
				</Suspense>
			</div>
		</div>
	)
}
