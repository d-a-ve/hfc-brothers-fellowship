"use client"

import { useForm } from "react-hook-form"

import { Checkbox } from "@/shared/ui/checkbox"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/shared/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { cn } from "@shared/lib/utils"
import { useToast } from "@shared/model"
import { BrotherData } from "@shared/types"
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
import { Input } from "@shared/ui/input"

import { updateUserProfileAction } from "../model/actions"

const profileFormSchema = z
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

type ProfileForm = z.infer<typeof profileFormSchema>

export function UserProfileForm({
	user,
	docId,
}: {
	user: BrotherData
	docId: string
}) {
	const userProfileForm = useForm<ProfileForm>({
		resolver: zodResolver(profileFormSchema),
		values: {
			...user,
			arePhoneAndWhatsappNumbersTheSame: false,
		},
	})
	const { toast } = useToast()

	const isLoading = userProfileForm.formState.isSubmitting

	const onSubmit = async (data: ProfileForm) => {
		const { arePhoneAndWhatsappNumbersTheSame, ...rest } = data
		const dataToSend: {
			[k: string]: string
		} = rest
		console.log(arePhoneAndWhatsappNumbersTheSame)
		const newData = Object.entries(dataToSend).reduce((total, [key, value]) => {
			// @ts-expect-error keys cannot be literal types but they are in user
			if (user[key] !== value) {
				return { ...total, [key]: value }
			}

			return total
		}, {})
		console.log(newData)

		const updatedUser = await updateUserProfileAction(docId, newData)
		if (updatedUser && updatedUser.error) {
			toast({
				title: "Your profile failed to update.",
				description: updatedUser.error,
				variant: "destructive",
			})
		}

		toast({
			description: "Your profile has been updated successfully.",
		})
	}

	return (
		<Form {...userProfileForm}>
			<form
				onSubmit={userProfileForm.handleSubmit(onSubmit)}
				className="space-y-4"
			>
				<FormField
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
											userProfileForm.getValues(
												"arePhoneAndWhatsappNumbersTheSame",
											)
										) {
											userProfileForm.setValue(
												"whatsappNumber",
												e.currentTarget.value,
											)
											userProfileForm.trigger("whatsappNumber")
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={userProfileForm.control}
					name="arePhoneAndWhatsappNumbersTheSame"
					render={({ field }) => (
						<FormItem className="flex items-center space-x-2 space-y-0">
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={(e) => {
										field.onChange(e)
										userProfileForm.setValue(
											"whatsappNumber",
											userProfileForm.getValues("phoneNumber"),
										)
										userProfileForm.trigger("whatsappNumber")
									}}
								/>
							</FormControl>
							<FormLabel>Use the same number as phone number</FormLabel>
						</FormItem>
					)}
				/>
				<FormField
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
					control={userProfileForm.control}
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
				{userProfileForm.watch("status") === "student" && (
					<>
						<FormField
							control={userProfileForm.control}
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
							control={userProfileForm.control}
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
					<Button
						size={"lg"}
						className="relative w-full"
						disabled={!userProfileForm.formState.isDirty || isLoading}
					>
						<span className={cn(isLoading && "opacity-0")}>Update Details</span>
						<span
							className={cn(
								"absolute inset-0 flex items-center justify-center",
								{
									"opacity-0": !isLoading,
									"opacity-100": isLoading,
								},
							)}
						>
							Loading...
						</span>
					</Button>
				</div>
			</form>
		</Form>
	)
}
