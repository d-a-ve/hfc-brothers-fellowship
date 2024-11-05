"use client"

import { Camera } from "lucide-react"
import { ChangeEvent, useState } from "react"

import { isError } from "@shared/lib/api"
import { cn, getFileUrl, getInitials } from "@shared/lib/utils"
import { useToast } from "@shared/model"
import { Avatar } from "@shared/ui/avatar"
import { Spinner } from "@shared/ui/spinner"

import { updateUserProfilePictureAction } from "../model/actions"

export function UserProfileImage({
	userId,
	userName,
	docId,
	pictureId,
	pathToRevalidate,
	className,
}: {
	userId: string
	userName: string
	docId: string
	pictureId: string
	pathToRevalidate: string
	className?: string
}) {
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setIsLoading(true)
			const file = e.target.files[0]
			const formData = new FormData()
			formData.set("picture", file)
			try {
				await updateUserProfilePictureAction(
					formData,
					userId,
					docId,
					pathToRevalidate,
				)
				setIsLoading(false)
				toast({
					description: "Profile picture updated successfully.",
				})
			} catch (e: unknown) {
				if (isError(e)) {
					setIsLoading(false)
					toast({
						title: "Profile picture update failed.",
						description: e.message,
						variant: "destructive",
					})
				}
			}
		}
	}
	return (
		<div className={cn("relative isolate", className)}>
			<Avatar
				src={getFileUrl(pictureId)}
				alt="Image"
				className="border-2 border-primary"
				fallbackText={getInitials(userName)}
			/>
			<div className="xs:size-7 absolute bottom-0 right-0 z-10 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary">
				<input
					type="file"
					className="absolute h-full w-full opacity-0"
					onChange={handleImageChange}
					accept="image/jpeg, image/png, image/gif"
				/>
				<Camera className="size-4 stroke-primary-foreground" />
			</div>
			{isLoading && (
				<div className="absolute inset-0 m-0.5 flex items-center justify-center rounded-full bg-black/60 text-xl">
					<Spinner />
				</div>
			)}
		</div>
	)
}
