"use client"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"

import { createSessionForEmailOnly, signUpWithEmailOnly } from "@shared/lib/api"
import { cn } from "@shared/lib/utils"
import { useToast } from "@shared/model"
import { Button } from "@shared/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@shared/ui/card"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import { AppLink } from "@shared/ui/link"
import { Spinner } from "@shared/ui/spinner"

import { OTPForm } from "./OTPForm"

const signinFormSchema = z.object({
	email: z.string().email("Please enter a valid email address"),
})

type SigninForm = z.infer<typeof signinFormSchema>

export function SignInForm() {
	const signinForm = useForm<SigninForm>({
		resolver: zodResolver(signinFormSchema),
		defaultValues: {
			email: "",
		},
	})
	const isLoading = signinForm.formState.isSubmitting

	const pathName = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const { toast } = useToast()

	const code = searchParams.get("code-sent")

	if (code && code === "1") {
		return (
			<Card>
				<CardHeader>
					<CardTitle as="h1" className="text-xl">
						Enter OTP code
					</CardTitle>
				</CardHeader>
				<CardContent>
					<OTPForm
						hideLabel
						email={signinForm.getValues("email")}
						submitHandler={async (data, { loadingFalse, loadingTrue }) => {
							const userId = searchParams.get("id")
							if (!userId) {
								return console.log("No userId present")
							}
							try {
								loadingTrue()
								await createSessionForEmailOnly(userId, data.otp)
							} catch (error: any) {
								toast({
									description: error.message,
									variant: "destructive",
								})
							} finally {
								loadingFalse()
							}
						}}
					/>
				</CardContent>
			</Card>
		)
	}

	const onSubmit = async (data: SigninForm) => {
		try {
			const account = await signUpWithEmailOnly(data.email)
			router.push(`${pathName}?code-sent=1&id=${account.userId}`)
		} catch (e: any) {
			toast({
				description: e.message,
				variant: "destructive",
			})
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle as="h1" className="text-xl">
					Sign In to your HFC Brothers' Account
				</CardTitle>
				<CardDescription>
					You do not have an account?{" "}
					<AppLink href={"/register"}>Register</AppLink>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...signinForm}>
					<form
						onSubmit={signinForm.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={signinForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-2">
							<Button size={"lg"} className="relative w-full">
								<span className={cn(isLoading && "opacity-0")}>Sign In</span>
								<span
									className={cn(
										"absolute inset-0 flex items-center justify-center",
										{
											"opacity-0": !isLoading,
											"opacity-100": isLoading,
										},
									)}
								>
									<Spinner />
								</span>
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
