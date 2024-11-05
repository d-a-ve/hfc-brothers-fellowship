"use client"

import { useLayoutEffect } from "react"

import { useRouter } from "next/navigation"

import { useProgress } from "./link"
import { PageLoader } from "./page-loader"

export function Redirect({
	href,
	replace = false,
}: {
	href: string
	replace?: boolean
}) {
	const startProgress = useProgress()
	const router = useRouter()

	useLayoutEffect(() => {
		startProgress()
		if (replace) {
			router.replace(href)
		} else {
			router.push(href)
		}
	}, [])

	return <PageLoader />
}
