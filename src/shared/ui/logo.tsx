import Image from "next/image"

import { cn } from "@shared/lib/utils"

import { AppLink } from "./link"

export function Logo({ className }: { className?: string }) {
	return (
		<AppLink
			href="/"
			className={cn("flex w-fit items-center gap-3", className)}
			variant={'none'}
		>
			<span className="block ~size-12/16 rounded-full bg-white">
				<Image
					src="/rccg-logo.png"
					alt="RCCG Logo"
					className="h-full w-full object-cover object-center"
					width={200}
					height={200}
				/>
			</span>
			<span className="flex flex-col items-start ~text-sm/xl font-medium">
				<span>Happy Family</span>
				<span>Chapel</span>
			</span>
		</AppLink>
	)
}
