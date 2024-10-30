import { ReactNode } from "react"

import { cn } from "@shared/lib/utils"

type ContainerProps = {
	children: ReactNode
	className?: string
}

export function MaxContainer({ className, children }: ContainerProps) {
	return (
		<div className={cn("mx-auto max-w-[1440px]", className)}>{children}</div>
	)
}

export function PaddingInlineContainer({
	className,
	children,
}: ContainerProps) {
	return <div className={cn("~px-5/9", className)}>{children}</div>
}
