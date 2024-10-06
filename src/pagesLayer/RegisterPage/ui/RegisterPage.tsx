import { Suspense } from "react"

import { redirect } from "next/navigation"

import { getLoggedInUser } from "@shared/lib/api"

import { RegisterForm } from "./RegisterForm"

export async function RegisterPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))
	console.log(user)

	if (user) redirect("/b")

	return (
		<div className="space-y-6 px-6">
			<h1>Join the Happy Family Brothers' Fellowship</h1>
			<Suspense fallback={<p>Loading...</p>}>
				<RegisterForm />
			</Suspense>
		</div>
	)
}
