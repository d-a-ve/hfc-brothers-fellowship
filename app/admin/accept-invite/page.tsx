import { AdminAcceptInvitePage } from "@pages/AdminPages"
import { updateAdminMembershipStatus } from "@shared/lib/api"

export default async function AdminDashboardHome({
	searchParams,
}: {
	searchParams: {
		membershipId: string
		secret: string
		userId: string
		teamId: string
	}
}) {
	const admin = await updateAdminMembershipStatus(searchParams)
	console.log(admin);

	return <AdminAcceptInvitePage />
}
