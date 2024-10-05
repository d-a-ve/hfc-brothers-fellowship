"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { UserForm, useUserForm } from "@entities/user"
import {
	createDocument,
	createSessionForEmailOnly,
	signUpWithEmailOnly,
	updateLoggedInUserName,
	uploadFile,
} from "@shared/lib/api"

import { OTPForm } from "./OTPForm"

export function RegisterForm() {
	const { registerForm, profilePicture } =
		useUserForm()

	const searchParams = useSearchParams()
	const pathName = usePathname()
	const router = useRouter()

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

	return (
		<UserForm
			submitHandler={async (data, registerForm, _, setIsLoading) => {
				if (!profilePicture) {
					return registerForm.setError("profilePicture", {
						message: "No file/picture selected",
					})
				}
				setIsLoading(true)
				const account = await signUpWithEmailOnly(data.email)
				router.push(`${pathName}?code-sent=1&id=${account.userId}`)
				setIsLoading(false)
			}}
		/>
	)
}
