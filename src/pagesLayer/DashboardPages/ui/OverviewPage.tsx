import { UserForm } from "@entities/user"
import { getDocumentByUserId, getLoggedInUser } from "@shared/lib/api"
import { UserInfo } from "./UserInfo"

export async function OverviewPage() {
	const user = await getLoggedInUser()
	const userDoc = (await getDocumentByUserId(user.$id)) as any

	return (
		<div className="space-y-8 max-w-screen-md mx-auto">
			<UserInfo user={userDoc} />
			<UserForm
				submitHandler={async () => {
					"use server"
					console.log("User form")
				}}
			/>
		</div>
	)
}
