import { ComponentProps } from "react"

import { Button } from "./button"
import { AppLink } from "./link"

export default function LinkButton({
	children,
	href,
	...props
}: ComponentProps<typeof Button> & { href: string }) {
	return (
		<Button asChild {...props}>
			<AppLink className="no-underline hover:no-underline" href={href}>
				{children}
			</AppLink>
		</Button>
	)
}
