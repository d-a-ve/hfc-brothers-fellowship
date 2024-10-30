import type { Metadata } from "next"
import type { ReactNode } from "react"

import "@app/globals.css"

import { MaxContainer, PaddingInlineContainer } from "@shared/ui/container"
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
					<MaxContainer className="py-6">
						<header className="pb-8">
							<PaddingInlineContainer>
								<Logo />
							</PaddingInlineContainer>
						</header>
						{children}
						<Toaster />
					</MaxContainer>
				</ProgressBarProvider>
			</body>
		</html>
	)
}
