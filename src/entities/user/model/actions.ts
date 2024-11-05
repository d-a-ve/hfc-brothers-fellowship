"use server"

import { revalidatePath } from "next/cache"

import { updateDocumentById, uploadFile } from "@shared/lib/api"

export async function updateUserProfilePictureAction(
	picture: FormData,
	userId: string,
	docId: string,
	pathToRevalidate: string,
) {
	const newProflePicture = await uploadFile(picture, userId)
	await updateDocumentById(docId, { pictureId: newProflePicture.$id })
	revalidatePath(pathToRevalidate)
}

export async function updateUserProfileAction(
	docId: string,
	data: Record<string, unknown>,
	pathToRevalidate: string,
) {
	await updateDocumentById(docId, data)
	revalidatePath(pathToRevalidate)
}
