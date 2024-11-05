import { Facebook } from "lucide-react"

import { Button } from "@shared/ui/button"
import { PaddingInlineContainer } from "@shared/ui/container"
import LinkButton from "@shared/ui/link-button"
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
								<LinkButton
									className="w-full max-w-[200px]"
									size={"lg"}
									href="/register"
								>
									Join Us Today!
								</LinkButton>
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
							<LinkButton
								className="w-full max-w-[280px]"
								size={"lg"}
								href={"/register"}
							>
								Join Us Today!
							</LinkButton>
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
				<footer className="grid gap-6 pb-6 ~pt-12/16 md:grid-cols-2">
					<div className="space-y-3">
						<p className="text-xs italic">Brought to you by:</p>
						<Logo horizontal />
						<p className="~text-sm/base">
							No, 59 Ekhorutomwen Street, Newton Road, Ekosodin, Benin City.
						</p>
						<ul className="space-y-2">
							<li className="text-sm text-accent-foreground">
								Our Social Media
							</li>
							<li>
								<a
									href="#"
									className="inline-flex rounded p-1 duration-150 hover:bg-primary"
								>
									<Facebook size={20} />
								</a>
							</li>
						</ul>
					</div>
					<div>
						<ul className="space-y-2">
							<li className="text-sm text-accent-foreground">Our Services</li>
							<li>
								<span className="italic text-accent-foreground">Monday:</span>{" "}
								Prayer Meeting - 5pm
							</li>
							<li>
								<span className="italic text-accent-foreground">Tuesday:</span>{" "}
								Diggin Deep - 5pm
							</li>
							<li>
								<span className="italic text-accent-foreground">
									Wednesday:
								</span>{" "}
								Youth Hour - 5pm
							</li>
							<li>
								<span className="italic text-accent-foreground">Thursday:</span>{" "}
								Faith Clinic - 5pm
							</li>
							<li>
								<span className="italic text-accent-foreground">
									3rd Friday:
								</span>{" "}
								Area Holy Ghost Vigil - 10pm
							</li>
							<li>
								<span className="italic text-accent-foreground">
									Last Friday:
								</span>{" "}
								Zonal Holy Ghost Vigil - 10pm
							</li>
							<li>
								<ul className="space-y-2">
									<li>
										<span className="italic text-accent-foreground">
											Sunday:
										</span>{" "}
										2 services
									</li>
									<li className="pl-">1st Service - 7:30am</li>
									<li className="pl-">2nd Service - 9:00am</li>
								</ul>
							</li>
						</ul>
					</div>
				</footer>
			</PaddingInlineContainer>
			<div className="bg-primary/50 py-3">
				<PaddingInlineContainer>
					<p className="text-center">
						Jesus Christ is the same yesterday, today, and forever -{" "}
						<span className="italic">Heb 13:8</span>
					</p>
				</PaddingInlineContainer>
			</div>
		</div>
	)
}
