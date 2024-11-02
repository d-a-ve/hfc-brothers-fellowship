import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden"
import { ComponentProps } from "react"

export function VisuallyHidden(
	props: ComponentProps<typeof VisuallyHiddenPrimitive.Root>,
) {
	return <VisuallyHiddenPrimitive.Root {...props} />
}
