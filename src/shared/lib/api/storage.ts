"use server"

import { ID, Permission, Role } from "node-appwrite"

import config from "../config"
import { createAdminClient, createSessionClient } from "./client"

export async function uploadFile(data: FormData, userId: string) {
	const { storage } = await createAdminClient()
	const file: File | null = data.get("picture") as unknown as File

	if (!file) throw new Error("No file uploaded")

	return await storage.createFile(config.BUCKET_ID, ID.unique(), file, [
		Permission.read(Role.user(userId)),
		Permission.write(Role.user(userId)),
	])
}

export async function getFileUrlForDownload(fileId: string) {
	const { storage } = await createSessionClient()
	return await storage.getFileDownload(config.BUCKET_ID, fileId)
}

export async function getFile(fileId: string) {
	const { storage } = await createSessionClient()
	return await storage.getFilePreview(config.BUCKET_ID, fileId)
}
