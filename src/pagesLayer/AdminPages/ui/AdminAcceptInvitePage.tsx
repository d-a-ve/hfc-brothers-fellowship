import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import LinkButton from "@shared/ui/link-button"

export async function AdminAcceptInvitePage() {
	return (
		<MaxContainer>
			<PaddingInlineContainer className="flex h-full min-h-[calc(100dvh_-_150px)] flex-col items-center justify-center gap-y-2">
				<h1 className="font-medium ~text-xl/3xl">
					Invite successfully accepted.
				</h1>
				<p>You are welcome to the HFC Brothers' Admin Team.</p>
				<div className="pt-4">
					<LinkButton href="/admin/home">Go to Admin Page</LinkButton>
				</div>
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
