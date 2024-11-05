import { Query } from "node-appwrite"

import { AdminBrotherListItemContent } from "@features/admin-brothers-list"
import {
	getAdminTeamMember,
	getAllDocuments,
	getDocumentsWithQuery,
	getLoggedInUser,
} from "@shared/lib/api"
import { getFileUrl, getInitials } from "@shared/lib/utils"
import { Avatar } from "@shared/ui/avatar"
import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import CopyButton from "@shared/ui/copy-button"
import { Input } from "@shared/ui/input"
import { Redirect } from "@shared/ui/redirect"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui/select"

export async function AdminHomePage() {
	const user = await getLoggedInUser().catch((e) => console.log(e.message))
	const adminUser = await getAdminTeamMember(user?.$id as string).catch((e) =>
		console.log(e.message),
	)

	// TODO: move the user to the access denied page
	if (!adminUser) return <Redirect href="/" />

	const [brothers, studentBrothers, graduatedBrothers] = await Promise.all([
		getAllDocuments(),
		getDocumentsWithQuery(Query.equal("status", "student")),
		getDocumentsWithQuery(Query.equal("status", "graduate")),
	])

	return (
		<MaxContainer>
			<PaddingInlineContainer className="h-full min-h-[calc(100dvh_-_150px)] ~space-y-6/8">
				<section className="grid gap-4 md:grid-cols-3">
					<Card>
						<CardHeader className="space-y-1 ~p-4/6 ~pb-2/6">
							<CardTitle className="~text-xs/lg">
								Total Brothers in the database
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">
							{brothers.total}
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="space-y-1 ~p-4/6 ~pb-2/6">
							<CardTitle className="~text-xs/lg">
								Total Brothers who are students
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">
							{studentBrothers.total}
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="space-y-1 ~p-4/6 ~pb-2/6">
							<CardTitle className="~text-xs/lg">
								Total Brothers who are graduates
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">
							{graduatedBrothers.total}
						</CardContent>
					</Card>
				</section>
				<section>
					<Card>
						<CardHeader className="flex-row flex-wrap items-center justify-between gap-4 ~p-4/6">
							<CardTitle className="~text-sm/xl">
								Brothers in the database
							</CardTitle>
							<div className="flex w-full max-w-md flex-wrap items-center gap-3">
								<div className="grow">
									<Input
										className="w-full"
										type="search"
										placeholder="Search for a brother..."
									/>
								</div>
								<div className="w-[min(150px,_100%)]">
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Filter by" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="student">Student</SelectItem>
											<SelectItem value="graduate">Graduate</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-4 p-4 pt-0">
							{/* admin brother list item */}
							{brothers.documents.map((brother) => (
								<Card key={brother.$id}>
									<CardContent className="grid grid-cols-[48px_1fr_10ch] items-center gap-4 p-3 pt-3 ~text-xs/base md:grid-cols-[65px_1fr_20ch_10ch] md:pt-6 lg:grid-cols-[85px_1fr_20ch_15ch_10ch]">
										<Avatar
											src={getFileUrl(brother.pictureId)}
											alt="Image"
											className="size-12 md:size-16 lg:size-20"
											fallbackText={getInitials(brother.name)}
										/>
										<div className="max-md:col-span-2">
											<p className="font-medium capitalize ~text-sm/lg">
												{brother.name}
											</p>
											<p className="text-secondary-foreground ~text-xs/sm">
												{brother.email}
											</p>
										</div>
										<p className="inline-flex items-center gap-1 max-md:hidden">
											{brother.phoneNumber}
											<CopyButton text={brother.phoneNumber} />
										</p>
										<div className="max-lg:hidden">
											<p className="uppercase">{brother.status}</p>
											<p>
												{brother.status === "student" &&
													`${brother.currentLevel}L`}
											</p>
										</div>
										<AdminBrotherListItemContent
											trigger={
												<Button size={"sm"} className="max-md:col-span-2">
													View
												</Button>
											}
											{...brother}
										/>
									</CardContent>
								</Card>
							))}
						</CardContent>
					</Card>
				</section>
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
