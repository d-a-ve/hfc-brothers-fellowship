"use client"

import { Copy } from "lucide-react"
import { ComponentProps, useCallback, useState } from "react"

import { cn } from "@shared/lib/utils"

import { Button } from "./button"

type CopyButtonProps = ComponentProps<typeof Button> & {text: string}

export default function CopyButton({
	variant = "ghost",
	size = "icon",
	text
}: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}, [text])

	return (
		<Button
			variant={variant}
			size={size}
			onClick={handleCopy}
			className="relative"
		>
			<Copy className="size-4 lg:size-5" />
			<span
				className={cn(
					"absolute -bottom-6 left-1/2 -translate-x-1/2 rounded-lg opacity-0 transition-[opacity]",
					{
						"opacity-100": copied,
					},
				)}
			>
				Copied!!
			</span>
		</Button>
	)
}
