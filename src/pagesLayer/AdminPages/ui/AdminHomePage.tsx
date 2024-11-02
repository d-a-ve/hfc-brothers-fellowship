import { AdminBrotherListItemContent } from "@features/admin-brothers-list"
import { Button } from "@shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
import CopyButton from "@shared/ui/copy-button"
import { Input } from "@shared/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui/select"

export async function AdminHomePage() {
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
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">120</CardContent>
					</Card>
					<Card>
						<CardHeader className="space-y-1 ~p-4/6 ~pb-2/6">
							<CardTitle className="~text-xs/lg">
								Total Brothers who are students
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">120</CardContent>
					</Card>
					<Card>
						<CardHeader className="space-y-1 ~p-4/6 ~pb-2/6">
							<CardTitle className="~text-xs/lg">
								Total Brothers who are graduates
							</CardTitle>
						</CardHeader>
						<CardContent className="p-4 pt-0 ~text-3xl/5xl">120</CardContent>
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
						<CardContent className="p-4 pt-0">
							{/* admin brother list item */}
							<Card>
								<CardContent className="grid grid-cols-[48px_1fr_10ch] items-center gap-4 p-3 pt-3 ~text-xs/base md:grid-cols-[85px_1fr_15ch_8ch_5ch_10ch] md:pt-6">
									<div className="flex size-12 items-center justify-center rounded-full border border-purple-200 md:size-20">
										picture
									</div>
									<div>
										<p className="font-medium ~text-sm/lg">Name</p>
										<p className="text-secondary-foreground ~text-xs/sm">
											Email
										</p>
									</div>
									<p className="inline-flex items-center gap-1 max-md:hidden">
										08098547832
										<CopyButton text={"08098547832"} />
									</p>
									<p className="max-md:hidden">Graduate</p>
									<p className="max-md:hidden">Level</p>
									<AdminBrotherListItemContent
										trigger={<Button size={"sm"}>View</Button>}
									/>
								</CardContent>
							</Card>
						</CardContent>
					</Card>
				</section>
			</PaddingInlineContainer>
		</MaxContainer>
	)
}
