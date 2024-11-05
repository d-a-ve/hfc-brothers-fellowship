"use server"

import { revalidatePath } from "next/cache"

import { deleteDocumentById } from "@shared/lib/api"

export const deleteDocumentByIdAction = async (
	docId: string,
	pathToRevalidate: string,
) => {
	await deleteDocumentById(docId)
	revalidatePath(pathToRevalidate)
}
