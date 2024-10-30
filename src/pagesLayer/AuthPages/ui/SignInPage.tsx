import { getLoggedInUser } from "@shared/lib/api"
import { Redirect } from "@shared/ui/redirect"

import { SignInForm } from "./SignInForm"

export async function SignInPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) return <Redirect href="/b" />

	return (
		<div className="mx-auto grid h-full min-h-svh max-w-lg place-items-center">
			<div className="w-full">
				<SignInForm />
			</div>
		</div>
	)
}
