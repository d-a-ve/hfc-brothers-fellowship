"use client"

import { Book, Mail, School } from "lucide-react"

import { UserProfileImage } from "@entities/user"
import { BrotherData } from "@shared/types"

export function UserInfo({
	user,
	docId,
}: {
	user: BrotherData
	docId: string
}) {
	return (
		<div>
			<div className="flex items-center gap-x-4">
				<UserProfileImage
					docId={docId}
					userId={user.userId}
					userName={user.name}
					pictureId={user.pictureId}
					pathToRevalidate="/b"
					className="basis-24"
				/>
				<div className="space-y-2">
					<h1 className="text-lg font-medium">{user.name}</h1>
					<p className="flex items-center gap-2 text-sm">
						<Mail className="size-4" /> {user.email}
					</p>
					{user.department && (
						<p className="flex items-center gap-2 text-sm capitalize">
							<School className="size-4" /> {user.department}
						</p>
					)}
					{user.currentLevel && (
						<p className="flex items-center gap-2 text-sm">
							<Book className="size-4" /> {user.currentLevel} Level
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
