import { getLoggedInUser } from "@shared/lib/api"
import { Redirect } from "@shared/ui/redirect"

import { RegisterForm } from "./RegisterForm"

export async function RegisterPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) return <Redirect href="/b" />

	return (
		<div className="space-y-6 px-6">
			<h1>Join the Happy Family Brothers' Fellowship</h1>
			<RegisterForm />
		</div>
	)
}
