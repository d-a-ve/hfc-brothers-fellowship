"use server"

import { revalidatePath } from "next/cache"

import { updateDocumentById, uploadFile } from "@shared/lib/api"

export async function updateProfilePictureAction(
	picture: FormData,
	userId: string,
	docId: string,
) {
	try {
		const newProflePicture = await uploadFile(picture, userId)
		await updateDocumentById(docId, { pictureId: newProflePicture.$id })
		revalidatePath("/b")
	} catch (e: any) {
		return { error: e.message }
	}
}

export async function updateUserProfileAction(
	docId: string,
	data: Record<string, unknown>,
) {
	try {
		await updateDocumentById(docId, data)
		revalidatePath("/b")
	} catch (e: any) {
		return { error: e.message }
	}
}
