"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

import { usePathname } from "next/navigation"

import { cn } from "@shared/lib/utils"

import { AppLink } from "./link"

export function Nav({
	isUserLoggedIn,
	isAdminUser,
}: {
	isUserLoggedIn: boolean
	isAdminUser: boolean
}) {
	const [open, setOpen] = useState(false)
	const pathname = usePathname()

	const closeNav = () => setOpen(false)

	return (
		<div>
			<button
				className="p-2 hover:bg-primary-foreground/20 md:hidden"
				onClick={() => setOpen((prev) => !prev)}
			>
				{open ? <X className="size-6" /> : <Menu className="size-6" />}
				<span className="sr-only">{open ? "Open" : "Close"} Menu</span>
			</button>
			<nav
				className={cn(
					"max-md:absolute max-md:left-0 max-md:right-0 max-md:top-14 max-md:grid max-md:grid-rows-[0fr] max-md:overflow-hidden max-md:bg-accent max-md:transition-[grid-template-rows_padding] max-md:duration-300 max-md:~px-5/9",
					{
						"max-md:grid-rows-[1fr] max-md:py-4 max-md:pb-6": open,
					},
				)}
			>
				<ul className="max-md:space-y-1 max-md:overflow-hidden md:flex md:items-center md:gap-6">
					<li>
						<AppLink
							href="/"
							variant={"none"}
							className={cn(
								"p-2 max-md:block max-md:hover:bg-primary-foreground/20 max-md:hover:text-white md:duration-150 md:hover:text-primary",
								pathname === "/" &&
									"text-primary max-md:bg-primary-foreground/20 max-md:text-white",
							)}
							onClick={closeNav}
						>
							Home
						</AppLink>
					</li>
					{isUserLoggedIn ? (
						<li>
							<AppLink
								href="/b"
								variant={"none"}
								className={cn(
									"p-2 max-md:block max-md:hover:bg-primary-foreground/20 max-md:hover:text-white md:duration-150 md:hover:text-primary",
									pathname === "/b" &&
										"text-primary max-md:bg-primary-foreground/20 max-md:text-white",
								)}
								onClick={closeNav}
							>
								Dashboard Page
							</AppLink>
						</li>
					) : (
						<AppLink
							href="/sign-in"
							variant={"none"}
							className={cn(
								"p-2 max-md:block max-md:hover:bg-primary-foreground/20 max-md:hover:text-white md:duration-150 md:hover:text-primary",
								pathname === "/sign-in" &&
									"text-primary max-md:bg-primary-foreground/20 max-md:text-white",
							)}
							onClick={closeNav}
						>
							Sign in
						</AppLink>
					)}
					{isAdminUser && (
						<li>
							<AppLink
								href="/admin/home"
								variant={"none"}
								className={cn(
									"p-2 max-md:block max-md:hover:bg-primary-foreground/20 max-md:hover:text-white md:duration-150 md:hover:text-primary",
									pathname === "/admin/home" &&
										"text-primary max-md:bg-primary-foreground/20 max-md:text-white",
								)}
								onClick={closeNav}
							>
								Admin Page
							</AppLink>
						</li>
					)}
				</ul>
			</nav>
		</div>
	)
}
