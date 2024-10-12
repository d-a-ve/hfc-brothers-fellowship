import { ComponentProps } from "react"

import Link from "next/link"

import { cn } from "@shared/lib/utils"

type LinkProps = ComponentProps<typeof Link>

export function AppLink({ className, href, children, ...props }: LinkProps) {
	return (
		<Link
			href={href}
			className={cn("text-primary underline hover:no-underline", className)}
		>
			{children}
		</Link>
	)
}
