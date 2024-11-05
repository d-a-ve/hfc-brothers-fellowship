import { getAdminTeamMember, getLoggedInUser } from "@shared/lib/api"

import { PaddingInlineContainer } from "./container"
import { Logo } from "./logo"
import { Nav } from "./nav"

export async function Header() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))
	const adminUser = await getAdminTeamMember(user?.$id as string).catch((e) =>
		console.log(e.message),
	)

	return (
		<header className="mb-6 border-b-2 pb-6 relative">
			<PaddingInlineContainer className="flex items-center justify-between gap-4">
				<Logo />
				<Nav isUserLoggedIn={!!user} isAdminUser={!!adminUser} />
			</PaddingInlineContainer>
		</header>
	)
}
