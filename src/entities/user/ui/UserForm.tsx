"use client"

import { Dispatch, SetStateAction } from "react"
import { UseFormReturn } from "react-hook-form"

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

import { RegisterForm, useUserForm } from "../model/useUserForm"

export function UserForm({
	submitHandler,
}: {
	submitHandler: (
		data: RegisterForm,
		registerForm: UseFormReturn<RegisterForm>,
		isLoading: boolean,
		setIsLoading: Dispatch<SetStateAction<boolean>>,
	) => void
}) {
	const { registerForm, isLoading, setIsLoading, setProilePicture } =
		useUserForm()

	const onSubmit = (data: RegisterForm) => {
		submitHandler(data, registerForm, isLoading, setIsLoading)
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
