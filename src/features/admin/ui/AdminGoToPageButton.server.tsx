import { getLoggedInUser } from "@shared/lib/api"

import { AdminGoToPageButtonClient } from "./AdminGoToPageButton.client"

export async function AdminGoToPageButtonServer() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))

	if (!user) return null

	return <AdminGoToPageButtonClient />
}
