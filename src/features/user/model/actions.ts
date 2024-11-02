"use server"

import { revalidatePath } from "next/cache"

import { updateDocumentById, uploadFile } from "@shared/lib/api"

export async function updateUserProfilePictureAction(
	picture: FormData,
	userId: string,
	docId: string,
	pathToRevalidate: string,
) {
	try {
		const newProflePicture = await uploadFile(picture, userId)
		await updateDocumentById(docId, { pictureId: newProflePicture.$id })
		revalidatePath(pathToRevalidate)
	} catch (e: any) {
		return { error: e.message }
	}
}

export async function updateUserProfileAction(
	docId: string,
	data: Record<string, unknown>,
	pathToRevalidate: string,
) {
	try {
		await updateDocumentById(docId, data)
		revalidatePath(pathToRevalidate)
	} catch (e: any) {
		return { error: e.message }
	}
}
