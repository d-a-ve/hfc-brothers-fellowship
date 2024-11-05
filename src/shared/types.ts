import { Models } from "node-appwrite"

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
	oneThingPeopleDoNotKnowAboutYou?: string
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

export interface BrothersDocument extends Models.Document, BrotherData {}
export interface BrothersList extends Models.DocumentList<BrothersDocument> {}
