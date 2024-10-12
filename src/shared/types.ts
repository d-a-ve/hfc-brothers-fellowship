export type BrotherData = {
	name: string
	email: string
	pictureId: string
	userId: string
	schoolAddress: string
	phoneNumber: string
	whatsappNumber: string
	hostelName: string
	status: "" | "student" | "graduate"
	homeAddress?: string
	nearestLandmark?: string
	occupation?: string
	oneThing?: string
	currentLevel?:
		| ""
		| "100"
		| "200"
		| "300"
		| "400"
		| "500"
		| "600"
		| "700"
		| "800"
	department?: string
}
