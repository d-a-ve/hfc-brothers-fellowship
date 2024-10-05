"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shared/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@shared/ui/input-otp"

const completeRegiserFormSchema = z.object({
	otp: z.string().min(6, {
		message: "Your one-time password must be 6 characters.",
	}),
})
type CompleteRegiserForm = z.infer<typeof completeRegiserFormSchema>

export function OTPForm({
	submitHandler,
	email,
}: {
	submitHandler: (
		data: CompleteRegiserForm,
		loading: {
			isLoading: boolean
			loadingTrue: () => void
			loadingFalse: () => void
		},
	) => void
	email: string
}) {
	const [isLoading, setIsLoading] = useState(false)
	const completeRegisterForm = useForm<CompleteRegiserForm>({
		resolver: zodResolver(completeRegiserFormSchema),
		defaultValues: {
			otp: "",
		},
	})

	const onSubmit = (data: CompleteRegiserForm) => {
		submitHandler(data, {
			isLoading,
			loadingTrue: () => setIsLoading(true),
			loadingFalse: () => setIsLoading(false),
		})
	}
	return (
		<Form {...completeRegisterForm}>
			<form
				onSubmit={completeRegisterForm.handleSubmit(onSubmit)}
				className="space-y-6"
			>
				<FormField
					control={completeRegisterForm.control}
					name="otp"
					render={({ field }) => (
						<FormItem id="otp-field">
							<FormLabel>One-Time Password</FormLabel>
							<FormDescription>
								Please enter the one-time password sent to your email @{email}.
							</FormDescription>
							<FormControl>
								<InputOTP maxLength={6} {...field}>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="relative w-full max-w-40">
					<span className={cn(isLoading && "opacity-0")}>Submit</span>
					<span
						className={cn("absolute inset-0 flex items-center justify-center", {
							"opacity-0": !isLoading,
							"opacity-100": isLoading,
						})}
					>
						Loading...
					</span>
				</Button>
			</form>
		</Form>
	)
}
