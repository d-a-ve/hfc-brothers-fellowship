import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@app/globals.css"

import { MaxContainer } from "@shared/ui/container"
import { Header } from "@shared/ui/header"
import { ProgressBar, ProgressBarProvider } from "@shared/ui/link"
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
					<MaxContainer className="py-6">
						<Header />
						{children}
						<Toaster />
					</MaxContainer>
				</ProgressBarProvider>
			</body>
		</html>
	)
}
