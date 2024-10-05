import { Book, Camera, Mail, School } from "lucide-react"
import { ChangeEvent, useState } from "react"

import Image from "next/image"

export function OverviewPage() {
	const [profileImage, setProfileImage] = useState<string | null>(null)

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			console.log(file)
		}
	}

	return (
		<div>
			<div className="flex items-center gap-x-4">
				<div className="relative isolate basis-32">
					<div className="aspect-square shrink-0 overflow-hidden rounded-full border-2 border-primary">
						<Image
							src={profileImage || ""}
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
				<div className="space-y-1">
					<h1 className="text-lg font-medium">User name</h1>
					<p>
						<Mail /> user@email.com
					</p>
					<p>
						<School /> user department
					</p>
					<p>
						<Book /> user current level
					</p>
				</div>
			</div>
		</div>
	)
}
