import { getAdminTeamMember, getLoggedInUser } from "@shared/lib/api"

import { AdminGoToPageButtonClient } from "./AdminGoToPageButton.client"

export async function AdminGoToPageButtonServer() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))
	const adminUser = await getAdminTeamMember(user?.$id as string).catch((e) =>
		console.log(e.message),
	)

	if (!adminUser) return null

	return <AdminGoToPageButtonClient />
}
