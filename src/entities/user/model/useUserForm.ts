"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

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

export type RegisterForm = z.infer<typeof registerFormSchema>

export function useUserForm() {
	const [profilePicture, setProilePicture] = useState<File | undefined>(
		undefined,
	)
	const [isLoading, setIsLoading] = useState(false)

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

	return {
		profilePicture,
		setProilePicture,
		isLoading,
		setIsLoading,
		registerForm,
	}
}
