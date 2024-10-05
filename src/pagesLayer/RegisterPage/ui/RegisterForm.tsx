"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"

import {
	createDocument,
	createSessionForEmailOnly,
	signUpWithEmailOnly,
	updateLoggedInUserName,
	uploadFile,
} from "@shared/lib/api"
import { cn } from "@shared/lib/utils"
import { Button } from "@shared/ui/button"
import { Checkbox } from "@shared/ui/checkbox"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@shared/ui/select"

import { OTPForm } from "./OTPForm"

const registerFormSchema = z
	.object({
		name: z.string().min(1, "Your name is required."),
		email: z.string().email(),
		schoolAddress: z.string().min(1, "Your hostel address is required."),
		homeAddress: z.string().optional(),
		hostelName: z.string().min(1, "Hostel name is required."),
		nearestLandmark: z.string().optional(),
		occupation: z.string().optional(),
		phoneNumber: z
			.string()
			.refine((val) => val.length === 11, "Phone number must be 11 digits.")
			.refine(
				(val) => /^\d{11}$/.test(val),
				"Phone number should only contain numeric values. Please check your input",
			),
		whatsappNumber: z
			.string()
			.refine((val) => val.length === 11, "Whatsapp number must be 11 digits.")
			.refine(
				(val) => /^\d{11}$/.test(val),
				"Whatsapp number should only contain numeric values. Please check your input",
			),
		arePhoneAndWhatsappNumbersTheSame: z.boolean(),
		oneThingPeopleDoNotKnowAboutYou: z.string().optional(),
		status: z
			.enum(["", "student", "graduate"])
			.refine(
				(val) => val.length !== 0,
				"Please select your current academic status.",
			),
		currentLevel: z
			.enum(["", "100", "200", "300", "400", "500", "600", "700", "800"])
			.optional(),
		department: z.string().optional(),
		profilePicture: z.string(),
	})
	.superRefine((args, ctx) => {
		if (args.status === "student") {
			if (!args.currentLevel) {
				return ctx.addIssue({
					code: "custom",
					path: ["currentLevel"],
					message: "Please select your level",
				})
			}
			if (!args.department) {
				return ctx.addIssue({
					code: "custom",
					path: ["department"],
					message: "Please enter your department in Uniben.",
				})
			}
		}
	})

type RegisterForm = z.infer<typeof registerFormSchema>

export function RegisterForm() {
	const [profilePicture, setProilePicture] = useState<File | undefined>(
		undefined,
	)
	const [isLoading, setIsLoading] = useState(false)

	const searchParams = useSearchParams()
	const pathName = usePathname()
	const router = useRouter()

	const registerForm = useForm<RegisterForm>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			profilePicture: "",
			schoolAddress: "",
			homeAddress: "",
			hostelName: "",
			nearestLandmark: "",
			occupation: "",
			phoneNumber: "",
			whatsappNumber: "",
			arePhoneAndWhatsappNumbersTheSame: false,
			oneThingPeopleDoNotKnowAboutYou: "",
			status: "",
			currentLevel: "",
			department: "",
		},
	})

	const codeSent = searchParams.get("code-sent")

	if (codeSent && codeSent === "1") {
		return (
			<OTPForm
				email={registerForm.getValues("email")}
				submitHandler={async (data, { loadingFalse, loadingTrue }) => {
					const userId = searchParams.get("id")
					if (!userId) {
						return console.log("No userId present")
					}
					try {
						loadingTrue()
						await createSessionForEmailOnly(userId, data.otp)
						if (!profilePicture) return
						const formData = new FormData()
						formData.set("picture", profilePicture)

						const [, pictureFile] = await Promise.all([
							updateLoggedInUserName(registerForm.getValues("name")),
							uploadFile(formData, userId),
						])

						const values = registerForm.getValues()
						await createDocument(
							{
								name: values.name,
								email: values.email,
								pictureId: pictureFile.$id,
								userId,
								schoolAddress: values.schoolAddress,
								homeAddress: values.homeAddress,
								hostelName: values.hostelName,
								nearestLandmark: values.nearestLandmark,
								occupation: values.occupation,
								phoneNumber: values.phoneNumber,
								whatsappNumber: values.whatsappNumber,
								oneThing: values.oneThingPeopleDoNotKnowAboutYou,
								status: values.status,
								currentLevel: values.currentLevel,
								department: values.department,
							},
							userId,
						)
					} catch (error) {
						console.log(error)
					} finally {
						loadingFalse()
					}
				}}
			/>
		)
	}

	const onSubmit = async (data: RegisterForm) => {
		if (!profilePicture) {
			return registerForm.setError("profilePicture", {
				message: "No file/picture selected",
			})
		}
		setIsLoading(true)
		const account = await signUpWithEmailOnly(data.email)
		router.push(`${pathName}?code-sent=1&id=${account.userId}`)
		setIsLoading(false)
	}

	return (
		<Form {...registerForm}>
			<form
				onSubmit={registerForm.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={registerForm.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
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
				<FormField
					control={registerForm.control}
					name="phoneNumber"
					render={({ field: { onChange, ...field } }) => (
						<FormItem>
							<FormLabel>Phone Number</FormLabel>
							<FormControl>
								<Input
									{...field}
									onChange={(e) => {
										onChange(e)
										if (
											registerForm.getValues(
												"arePhoneAndWhatsappNumbersTheSame",
											)
										) {
											registerForm.setValue(
												"whatsappNumber",
												e.currentTarget.value,
											)
											registerForm.trigger("whatsappNumber")
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="arePhoneAndWhatsappNumbersTheSame"
					render={({ field }) => (
						<FormItem className="flex items-center space-x-2 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(e) => {
										field.onChange(e)
										registerForm.setValue(
											"whatsappNumber",
											registerForm.getValues("phoneNumber"),
										)
										registerForm.trigger("whatsappNumber")
									}}
								/>
							</FormControl>
							<FormLabel>Use the same number as phone number</FormLabel>
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="whatsappNumber"
					render={({ field }) => (
						<FormItem>
							<FormLabel>WhatsApp Number</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="hostelName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hostel Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="schoolAddress"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Hostel Address</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="nearestLandmark"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Bus-stop or landmark
								<span className="ml-1 font-normal text-muted-foreground">
									(optional)
								</span>
							</FormLabel>
							<FormDescription>
								Nearest bus-stop or popular landmark to your hostel
							</FormDescription>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="homeAddress"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Home Address
								<span className="ml-1 font-normal text-muted-foreground">
									(optional)
								</span>
							</FormLabel>
							<FormDescription>
								The address of where you stay when you are not in school
							</FormDescription>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="occupation"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								Occupation or Business
								<span className="ml-1 font-normal text-muted-foreground">
									(optional)
								</span>
							</FormLabel>
							<FormDescription>
								What you do as a side hustle or for a living
							</FormDescription>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="oneThingPeopleDoNotKnowAboutYou"
					render={({ field }) => (
						<FormItem>
							<FormLabel>
								One thing people don't know about you
								<span className="ml-1 font-normal text-muted-foreground">
									(optional)
								</span>
							</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="profilePicture"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Profile Picture</FormLabel>
							<FormDescription>
								This picture will also be used during birthday wishes and
								shoutouts.
							</FormDescription>
							<FormControl>
								<Input
									onBlur={field.onBlur}
									value={field.value}
									disabled={field.disabled}
									name={field.name}
									ref={field.ref}
									type="file"
									onChange={(e) => {
										const files = e.currentTarget.files
										if (!files) {
											return registerForm.setError("profilePicture", {
												message: "No file/picture selected",
											})
										}

										registerForm.clearErrors("profilePicture")

										field.onChange(e)
										setProilePicture(files[0])
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={registerForm.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Academic Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Are you a student or graduate?" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="student">Student</SelectItem>
									<SelectItem value="graduate">Graduate</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				{registerForm.watch("status") === "student" && (
					<>
						<FormField
							control={registerForm.control}
							name="currentLevel"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Level</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="What level are you in?" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="100">100 Level</SelectItem>
											<SelectItem value="200">200 Level</SelectItem>
											<SelectItem value="300">300 Level</SelectItem>
											<SelectItem value="400">400 Level</SelectItem>
											<SelectItem value="500">500 Level</SelectItem>
											<SelectItem value="600">600 Level</SelectItem>
											<SelectItem value="700">700 Level</SelectItem>
											<SelectItem value="800">800 Level</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={registerForm.control}
							name="department"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Department in Uniben</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}
				<div className="pt-2">
					<Button size={"lg"} className="relative w-full">
						<span className={cn(isLoading && "opacity-0")}>
							Join the Fellowship
						</span>
						<span
							className={cn(
								"absolute inset-0 flex items-center justify-center",
								{
									"opacity-0": !isLoading,
									"opacity-100": isLoading,
								},
							)}
						>
							Loading
						</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}
