"use client"

import "@shared/ui/dialog"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import * as React from "react"

import { UserProfileForm, UserProfileImage } from "@entities/user"
import { useMediaQuery } from "@shared/model"
import { BrotherData } from "@shared/types"
import { Button } from "@shared/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@shared/ui/dialog"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@shared/ui/drawer"

const testUser: BrotherData = {
	name: "Test User",
	email: "test@example.com",
	pictureId: "",
	userId: "",
	schoolAddress: "",
	phoneNumber: "",
	whatsappNumber: "",
	hostelName: "",
	status: "",
	homeAddress: "test",
	nearestLandmark: "test",
	occupation: "test",
	oneThingPeopleDoNotKnowAboutYou: "test",
	currentLevel: "200",
	department: "test",
}

export function AdminBrotherListItemContent({
	trigger,
}: {
	trigger: React.ReactNode
}) {
	const [state, setState] = React.useState<"view" | "edit" | "delete" | null>(
		null,
	)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {
		return (
			<Dialog
				open={state !== null}
				onOpenChange={(open) => setState(open ? "view" : null)}
			>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent>
					<DialogHeader className="flex-row items-center justify-between gap-3 space-y-0 pt-6">
						<div>
							<DialogTitle>Brother X Details</DialogTitle>
							<DialogDescription>
								<VisuallyHidden>
									This is the details for Brother X
								</VisuallyHidden>
							</DialogDescription>
						</div>
						{state === "view" && (
							<div className="flex items-center gap-2">
								<Button size={"sm"} onClick={() => setState("edit")}>
									Edit
								</Button>
								<Button
									size={"sm"}
									onClick={() => setState("delete")}
									variant={"destructive"}
								>
									Delete
								</Button>
							</div>
						)}
					</DialogHeader>
					{state === "edit" && (
						<div className="space-y-4">
							<UserProfileImage
								userId=""
								docId=""
								pictureId=""
								pathToRevalidate="/admin/home"
								className="size-28"
							/>
							<UserProfileForm
								pathToRevalidate="/admin/home"
								user={testUser}
								docId=""
							/>
							<Button
								size={"lg"}
								onClick={() => setState("view")}
								variant={"outline"}
								className="w-full"
							>
								Cancel Edit
							</Button>
						</div>
					)}
					{state === "delete" && (
						<div className="space-y-5">
							<p>
								This state cannot be undone. Are you sure you want to
								permanently remove this brother from our database?
							</p>
							<div className="flex items-center gap-4">
								<Button
									size={"lg"}
									onClick={() => setState("view")}
									variant={"outline"}
									className="w-full"
								>
									Cancel
								</Button>
								<Button
									size={"lg"}
									onClick={() => setState(null)}
									variant={"destructive"}
									className="w-full"
								>
									Remove Brother
								</Button>
							</div>
						</div>
					)}
					{state === "view" && <ViewBrotherDetails />}
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer
			open={state !== null}
			onOpenChange={(open) => setState(open ? "view" : null)}
		>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Brother X Details</DrawerTitle>
					<DrawerDescription>
						<VisuallyHidden>This is the details for Brother X</VisuallyHidden>
					</DrawerDescription>
					{state === "view" && (
						<div className="flex items-center gap-2">
							<Button
								size={"sm"}
								className="grow"
								onClick={() => setState("edit")}
							>
								Edit
							</Button>
							<Button
								size={"sm"}
								className="grow"
								variant={"destructive"}
								onClick={() => setState("delete")}
							>
								Remove
							</Button>
						</div>
					)}
				</DrawerHeader>
				<div className="overflow-y-auto px-4">
					{state === "edit" && (
						<div className="space-y-4">
							<UserProfileImage
								userId=""
								docId=""
								pictureId=""
								pathToRevalidate="/admin/home"
								className="size-24"
							/>
							<UserProfileForm
								pathToRevalidate="/admin/home"
								user={testUser}
								docId=""
							/>
						</div>
					)}
					{state === "delete" && (
						<div>
							<p>
								This state cannot be undone. Are you sure you want to
								permanently remove this brother from our database?
							</p>
						</div>
					)}
					{state === "view" && <ViewBrotherDetails />}
				</div>
				<DrawerFooter className="pt-4">
					{state === "edit" && (
						<Button variant="outline" onClick={() => setState("view")}>
							Cancel Edit
						</Button>
					)}
					{state === "delete" && (
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								className="grow"
								onClick={() => setState("view")}
							>
								Cancel
							</Button>
							<Button
								variant="destructive"
								className="grow"
								onClick={() => setState(null)}
							>
								Remove Brother
							</Button>
						</div>
					)}
					{state === "view" && (
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function ViewBrotherDetails() {
	return (
		<div className="space-y-3 first:[&_>_div_>_p]:text-secondary-foreground first:[&_>_div_>_p]:after:content-[':']">
			<div className="flex items-center gap-4">
				<div className="flex size-16 items-center justify-center rounded-full border border-purple-200 md:size-20">
					picture
				</div>
				<div className="md:space-y-1">
					<p className="text-lg font-medium">Name</p>
					<p>Email</p>
				</div>
			</div>
			<div>
				<p>Phone Number</p>
				<p>123-456-7890</p>
			</div>
			<div>
				<p>WhatsApp Number</p>
				<p>123-456-7890</p>
			</div>
			<div>
				<p>School Address</p>
				<p>123 School St</p>
			</div>
			<div>
				<p>Hostel Name</p>
				<p>Hostel A</p>
			</div>
			<div>
				<p>Nearest Landmark</p>
				<p>Nearby Park</p>
			</div>
			<div>
				<p>Status</p>
				<p>Student</p>
			</div>
			<div>
				<p>Current Level</p>
				<p>100</p>
			</div>
			<div>
				<p>Department</p>
				<p>Computer Science</p>
			</div>
			<div>
				<p>Home Address</p>
				<p>456 Home St</p>
			</div>
			<div>
				<p>Occupation</p>
				<p>Student</p>
			</div>
			<div>
				<p>One Thing People Do Not Know About You</p>
				<p>I can juggle</p>
			</div>
		</div>
	)
}
