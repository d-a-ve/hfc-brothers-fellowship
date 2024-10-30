import { getLoggedInUser } from "@shared/lib/api"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import { Redirect } from "@shared/ui/redirect"

import { RegisterForm } from "./RegisterForm"

export async function RegisterPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) return <Redirect href="/b" />

	return (
		<MaxContainer>
			<PaddingInlineContainer className="space-y-6">
				<h1>Join the Happy Family Brothers' Fellowship</h1>
				<RegisterForm />
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
