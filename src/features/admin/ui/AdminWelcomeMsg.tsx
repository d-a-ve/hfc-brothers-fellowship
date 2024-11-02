"use client"

import { usePathname } from "next/navigation"

export function AdminWelcomeMsg() {
	const pathname = usePathname()

	if (!pathname.startsWith("/admin")) return null

	return <span className="~text-sm/xl text-right">Welcome Back Admin 👋🏽</span>
}
