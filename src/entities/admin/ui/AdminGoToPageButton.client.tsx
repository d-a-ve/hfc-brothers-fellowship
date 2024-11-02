"use client"

import { usePathname } from "next/navigation"

import LinkButton from "@shared/ui/link-button"

export function AdminGoToPageButtonClient() {
	const pathname = usePathname()

	if (pathname.startsWith("/admin")) return null

	return <LinkButton href="/admin/home">Admin Page</LinkButton>
}
