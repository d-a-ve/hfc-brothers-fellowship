import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@app/globals.css"

import { ProgressBar, ProgressBarProvider } from "@shared/ui/link"
import { Logo } from "@shared/ui/logo"
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
			<body>
				<ProgressBarProvider>
					<ProgressBar />
					<div className="mx-auto max-w-[1440px] py-6 ~px-5/9">
						<header className="pb-8">
							<Logo />
						</header>
						{children}
						<Toaster />
					</div>
				</ProgressBarProvider>
			</body>
		</html>
	)
}
