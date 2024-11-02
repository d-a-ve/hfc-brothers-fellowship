import { getLoggedInUser } from "@shared/lib/api"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import { AppLink } from "@shared/ui/link"
import { Redirect } from "@shared/ui/redirect"

import { RegisterForm } from "./RegisterForm"

export async function RegisterPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) return <Redirect href="/b" />

	return (
		<MaxContainer>
			<PaddingInlineContainer className="space-y-6">
				<div className="space-y-1">
					<h1 className="~text-xl/2xl">
						Join the Happy Family Brothers' Fellowship
					</h1>
					<p className="text-muted-foreground ~text-sm/base">
						Already have an account? <AppLink href="/sign-in">Sign in</AppLink>
					</p>
				</div>
				<RegisterForm />
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
