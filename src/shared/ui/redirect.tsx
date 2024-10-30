"use client"

import { useRouter } from "next/navigation"

import { useProgress } from "./link"

export function Redirect({
	href,
	replace = false,
}: {
	href: string
	replace?: boolean
}) {
	const startProgress = useProgress()
	const router = useRouter()

	startProgress()
	if (replace) {
		router.replace(href)
	} else {
		router.push(href)
	}

	return <div>Redirecting...</div>
}
