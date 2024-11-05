"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import * as React from "react"

import { UserProfileForm, UserProfileImage } from "@entities/user"
import { isError } from "@shared/lib/api"
import { cn, getFileUrl, getInitials } from "@shared/lib/utils"
import { useMediaQuery, useToast } from "@shared/model"
import { BrotherData, BrothersList } from "@shared/types"
import { Avatar } from "@shared/ui/avatar"
import { Button } from "@shared/ui/button"
import CopyButton from "@shared/ui/copy-button"
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
import { Spinner } from "@shared/ui/spinner"

import { deleteDocumentByIdAction } from "../model/actions"

function RemoveBrother({
	docId,
	closeCallback,
}: {
	docId: string
	closeCallback: () => void
}) {
	const [isDeleting, setIsDeleting] = React.useState(false)
	const { toast } = useToast()

	const removeBrother = async () => {
		try {
			setIsDeleting(true)
			await deleteDocumentByIdAction(docId, "/admin/home")
			setTimeout(() => {
				closeCallback()
				setIsDeleting(false)
			}, 2000)
		} catch (e: unknown) {
			if (isError(e)) {
				console.log(e)
				setIsDeleting(false)
				toast({
					title: "Failed to delete brother information.",
					description: e.message,
					variant: "destructive",
				})
			}
		}
	}

	return (
		<Button
			size={"lg"}
			onClick={removeBrother}
			variant={"destructive"}
			className="relative w-full"
			disabled={isDeleting}
		>
			<span className={cn(isDeleting && "opacity-0")}>Remove Brother</span>
			<span
				className={cn("absolute inset-0 flex items-center justify-center", {
					"opacity-0": !isDeleting,
					"opacity-100": isDeleting,
				})}
			>
				<Spinner />
			</span>
		</Button>
	)
}

export function AdminBrotherListItemContent({
	trigger,
	...user
}: {
	trigger: React.ReactNode
} & BrothersList["documents"][number]) {
	const [state, setState] = React.useState<"view" | "edit" | "remove" | null>(
		null,
	)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	const afterEditCallback = (stopLoading: () => void) => {
		setTimeout(() => {
			setState("view")
			stopLoading()
		}, 2000)
	}

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
							<DialogTitle>Brother {user.name} Details</DialogTitle>
							<DialogDescription>
								<VisuallyHidden>
									This is the details for Brother {user.name}
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
									onClick={() => setState("remove")}
									variant={"destructive"}
								>
									Remove
								</Button>
							</div>
						)}
					</DialogHeader>
					{state === "edit" && (
						<div className="space-y-4">
							<UserProfileImage
								userId={user.userId}
								userName={user.name}
								docId={user.docId}
								pictureId={user.pictureId}
								pathToRevalidate="/admin/home"
								className="size-28"
							/>
							<UserProfileForm
								pathToRevalidate="/admin/home"
								user={user}
								docId={user.$id}
								afterSubmitCallback={afterEditCallback}
								mode="admin"
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
					{state === "remove" && (
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
								<RemoveBrother
									docId={user.$id}
									closeCallback={() => setState(null)}
								/>
							</div>
						</div>
					)}
					{state === "view" && <ViewBrotherDetails {...user} />}
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
					<DrawerTitle>Brother {user.name} Details</DrawerTitle>
					<DrawerDescription>
						<VisuallyHidden>
							This is the details for Brother {user.name}
						</VisuallyHidden>
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
								onClick={() => setState("remove")}
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
								userId={user.userId}
								userName={user.name}
								docId={user.docId}
								pictureId={user.pictureId}
								pathToRevalidate="/admin/home"
								className="size-24"
							/>
							<UserProfileForm
								pathToRevalidate="/admin/home"
								user={user}
								docId={user.$id}
								afterSubmitCallback={afterEditCallback}
								mode="admin"
							/>
						</div>
					)}
					{state === "remove" && (
						<div>
							<p>
								This state cannot be undone. Are you sure you want to
								permanently remove this brother from our database?
							</p>
						</div>
					)}
					{state === "view" && <ViewBrotherDetails {...user} />}
				</div>
				<DrawerFooter className="pt-4">
					{state === "edit" && (
						<Button variant="outline" onClick={() => setState("view")}>
							Cancel Edit
						</Button>
					)}
					{state === "remove" && (
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								className="grow"
								onClick={() => setState("view")}
							>
								Cancel
							</Button>
							<RemoveBrother
								docId={user.$id}
								closeCallback={() => setState(null)}
							/>
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

function ViewBrotherDetails({
	pictureId,
	name,
	email,
	phoneNumber,
	whatsappNumber,
	schoolAddress,
	homeAddress,
	nearestLandmark,
	oneThingPeopleDoNotKnowAboutYou,
	hostelName,
	status,
	occupation,
	currentLevel,
	department,
}: BrotherData) {
	return (
		<div className="space-y-3 first:[&_>_div_>_p]:text-secondary-foreground first:[&_>_div_>_p]:after:content-[':']">
			<div className="flex items-center gap-4">
				<Avatar
					src={getFileUrl(pictureId)}
					alt="Image"
					className="size-12 md:size-20"
					fallbackText={getInitials(name)}
				/>
				<div className="md:space-y-1">
					<p className="font-medium">{name}</p>
					<p className="text-sm text-secondary-foreground">{email}</p>
				</div>
			</div>
			<div>
				<p>Phone Number</p>
				<p className="inline-flex items-center gap-2">
					{phoneNumber} <CopyButton text={phoneNumber} />
				</p>
			</div>
			<div>
				<p>WhatsApp Number</p>
				<p className="inline-flex items-center gap-2">
					{whatsappNumber} <CopyButton text={whatsappNumber} />
				</p>
			</div>
			<div>
				<p>School Address</p>
				<p>{schoolAddress}</p>
			</div>
			<div>
				<p>Hostel Name</p>
				<p>{hostelName}</p>
			</div>
			{nearestLandmark && (
				<div>
					<p>Nearest Landmark</p>
					<p>{nearestLandmark}</p>
				</div>
			)}
			<div>
				<p>Status</p>
				<p className="capitalize">{status}</p>
			</div>
			{status === "student" && (
				<div>
					<p>Current Level</p>
					<p>{currentLevel}L</p>
				</div>
			)}
			{status === "student" && (
				<div>
					<p>Department</p>
					<p>{department}</p>
				</div>
			)}
			{homeAddress && (
				<div>
					<p>Home Address</p>
					<p>{homeAddress}</p>
				</div>
			)}
			{occupation && (
				<div>
					<p>Occupation</p>
					<p>{occupation}</p>
				</div>
			)}
			{oneThingPeopleDoNotKnowAboutYou && (
				<div>
					<p>One Thing People Do Not Know About You</p>
					<p className="inline-flex items-center gap-2">
						{oneThingPeopleDoNotKnowAboutYou}{" "}
						<CopyButton text={oneThingPeopleDoNotKnowAboutYou} />
					</p>
				</div>
			)}
		</div>
	)
}
