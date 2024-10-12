import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@app/globals.css"

import { Toaster } from "@shared/ui/toaster"

export const metadata: Metadata = {
	title: "HFC Brothers' Fellowship",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en">
			<body className="p-6">
				{children}
				<Toaster />
			</body>
		</html>
	)
}
