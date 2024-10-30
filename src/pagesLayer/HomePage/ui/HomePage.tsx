import { Button } from "@shared/ui/button"
import { PaddingInlineContainer } from "@shared/ui/container"
import { AppLink } from "@shared/ui/link"
import { Logo } from "@shared/ui/logo"

export function HomePage() {
	return (
		<div>
			<main className="~space-y-8/16">
				<PaddingInlineContainer>
					<section className="py-8">
						<div className="max-w-[60ch] ~space-y-4/6">
							<div className="space-y-4">
								<p className="w-fit rounded-md bg-primary/50 px-4 py-2 ~text-xs/sm">
									Join a Brotherhood of Support and Growth ✨
								</p>
								<h1 className="font-semibold ~text-2xl/6xl">
									Happy Family Chapel Brothers' Fellowship.
								</h1>
							</div>
							<p className="~text-sm/lg">
								A community for brothers to learn, uplift, inspire, and grow
								spiritually, physically, academically, and professionally.
							</p>
							<div className="pt-2">
								<Button asChild className="w-full max-w-[200px]" size={"lg"}>
									<AppLink
										className="no-underline hover:no-underline"
										href={"/register"}
									>
										Join Us Today!
									</AppLink>
								</Button>
							</div>
						</div>
					</section>
				</PaddingInlineContainer>
				<section className="bg-primary/50 ~py-12/16">
					<PaddingInlineContainer className="mx-auto max-w-[60ch] space-y-6 text-center">
						<h2 className="font-semibold ~text-xl/3xl">
							Our Mission and Values
						</h2>
						<p className="~text-sm/lg">
							Society often portrays brothers, sons, and men as strong,
							self-sufficient individuals who can handle everything on their
							own. However, the reality is that they, too, experience joy,
							happniess, pain, sorrow, and feelings of being overwhelmed. They
							need guidance and support from their peers and mentors who have
							walked a similar path.
						</p>
						<p className="~text-sm/lg">
							The HFC Brothers' Fellowship is built on the foundation of
							brotherhood. Our goal is to foster a supportive community where
							men can come together, share their stories, struggles, and
							challenges, and learn from God's word and one another.
						</p>
						<div className="pt-2">
							<Button asChild className="w-full max-w-[280px]" size={"lg"}>
								<AppLink
									className="no-underline hover:no-underline"
									href={"/register"}
								>
									Join Us Today!
								</AppLink>
							</Button>
						</div>
					</PaddingInlineContainer>
				</section>
				<PaddingInlineContainer>
					<section className="~py-12/16">
						<div className="mx-auto max-w-[60ch] space-y-6 text-center">
							<h2 className="font-semibold ~text-xl/3xl">
								Get Involved and Connect
							</h2>
							<p className="~text-sm/lg">
								Join us for our upcoming events, where you can meet fellow
								brothers, participate in enriching activities, and make lasting
								memories. From workshops to social gatherings, there's something
								for everyone.
							</p>
							<div className="space-y-6 pt-8">
								<p className="italic ~text-base/xl">
									We currently don't have any upcoming events scheduled, please
									check back later.
								</p>
							</div>
						</div>
					</section>
				</PaddingInlineContainer>
				<section className="bg-primary/50 ~py-12/16">
					<PaddingInlineContainer className="mx-auto max-w-[60ch] space-y-6 text-center">
						<h2 className="font-semibold ~text-xl/3xl">
							Have questions or need more information? Reach out to us! We're
							excited to connect with you and welcome you with open arms
						</h2>
						<div className="pt-2">
							<Button className="px-14" size={"lg"}>
								Join us on WhatsApp
							</Button>
						</div>
					</PaddingInlineContainer>
				</section>
			</main>
			<PaddingInlineContainer>
				<footer className="space-y-5 pb-6 text-center ~pt-12/16">
					<p>Brought to you by:</p>
					<Logo className="mx-auto" />
					<div className="space-y-2 ~text-sm/lg">
						<p>
							No, 59 Ekhorutomwen Street, Newton Road, Ekosodin, Benin City.
						</p>
						<p>
							Fellowship with us every sunday. We hold two services by 7:30am
							and 9:00am
						</p>
					</div>
				</footer>
			</PaddingInlineContainer>
		</div>
	)
}
