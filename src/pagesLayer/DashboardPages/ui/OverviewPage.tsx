import { UserProfileForm } from "@entities/user"
import { getDocumentByUserId, getLoggedInUser } from "@shared/lib/api"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"

import { UserInfo } from "./UserInfo"

export async function OverviewPage() {
	const user = await getLoggedInUser()
	const userDoc = (await getDocumentByUserId(user.$id)) as any

	return (
		<MaxContainer>
			<PaddingInlineContainer className="max-w-screen-md space-y-8">
				<UserInfo user={userDoc} docId={userDoc.$id} />
				<UserProfileForm
					user={userDoc}
					docId={userDoc.$id}
					pathToRevalidate="/b"
				/>
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
