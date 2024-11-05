import Image from "next/image"

import { cn } from "@shared/lib/utils"

import { AppLink } from "./link"

export function Logo({
	className,
	horizontal,
}: {
	className?: string
	horizontal?: true
}) {
	return (
		<AppLink
			href="/"
			className={cn("flex w-fit items-center gap-2", className)}
			variant={"none"}
		>
			<span className="block rounded-full bg-white ~size-8/12">
				<Image
					src="/rccg-logo.png"
					alt="RCCG Logo"
					className="h-full w-full object-cover object-center"
					width={200}
					height={200}
				/>
			</span>
			<span
				className={cn("flex flex-col items-start font-medium ~text-xs/lg", {
					"flex-row gap-1": horizontal,
				})}
			>
				<span>Happy Family</span>
				<span>Chapel</span>
			</span>
		</AppLink>
	)
}
