"use client"

import { Book, Camera, Mail, School } from "lucide-react"
import { ChangeEvent } from "react"

import Image from "next/image"

import { getFileUrl } from "@shared/lib/utils"
import { BrotherData } from "@shared/types"

export function UserInfo({ user }: { user: BrotherData }) {
	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			console.log(file)
		}
	}

	return (
		<div className="flex items-center gap-x-4">
			<div className="relative isolate basis-24">
				<div className="aspect-square shrink-0 overflow-hidden rounded-full border-2 border-primary">
					<Image
						src={getFileUrl(user.pictureId)}
						alt="Image"
						width={200}
						height={200}
						className="h-full w-full object-cover object-center"
					/>
				</div>
				<div className="xs:size-7 absolute bottom-0 right-0 z-10 inline-flex size-6 cursor-pointer items-center justify-center rounded-full bg-primary">
					<input
						type="file"
						className="absolute h-full w-full opacity-0"
						onChange={handleImageChange}
						accept="image/jpeg, image/png, image/gif"
					/>
					<Camera className="size-4" />
				</div>
			</div>
			<div className="space-y-2">
				<h1 className="text-lg font-medium">{user.name}</h1>
				<p className="flex items-center gap-2 text-sm">
					<Mail className="size-4" /> {user.email}
				</p>
				{user.department && (
					<p className="flex items-center gap-2 text-sm">
						<School className="size-4" /> {user.department}
					</p>
				)}
				{user.currentLevel && (
					<p className="flex items-center gap-2 text-sm">
						<Book className="size-4" /> {user.currentLevel}
					</p>
				)}
			</div>
		</div>
	)
}
