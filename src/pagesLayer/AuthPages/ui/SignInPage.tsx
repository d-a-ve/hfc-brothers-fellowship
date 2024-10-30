import { getLoggedInUser } from "@shared/lib/api"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import { Redirect } from "@shared/ui/redirect"

import { SignInForm } from "./SignInForm"

export async function SignInPage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (user) return <Redirect href="/b" />

	return (
		<MaxContainer>
			<PaddingInlineContainer className="mx-auto grid h-full min-h-[calc(100dvh_-_150px)] max-w-lg place-items-center">
				<div className="w-full">
					<SignInForm />
				</div>
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
