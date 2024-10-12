import { getDocumentByUserId, getLoggedInUser } from "@shared/lib/api"

import { UserInfo } from "./UserInfo"
import { UserProfileForm } from "./UserProfileForm"

export async function OverviewPage() {
	const user = await getLoggedInUser()
	const userDoc = (await getDocumentByUserId(user.$id)) as any
	console.log(user)

	return (
		<div className="mx-auto max-w-screen-md space-y-8">
			<UserInfo user={userDoc} docId={userDoc.$id} />
			<UserProfileForm user={userDoc} docId={userDoc.$id} />
		</div>
	)
}
