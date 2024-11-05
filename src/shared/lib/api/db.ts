"use server"

import { ID, Permission, Query, Role } from "node-appwrite"

import { BrotherData, BrothersList } from "@shared/types"

import config from "../config"
import { createSessionClient } from "./client"

export async function createDocument(data: BrotherData, userId: string) {
	const { db } = await createSessionClient()
	return await db.createDocument(
		config.DB_ID,
		config.BRO_COL_ID,
		ID.unique(),
		data,
		[Permission.read(Role.user(userId)), Permission.write(Role.user(userId))],
	)
}

export async function getDocumentByUserId(userId: string) {
	const { db } = await createSessionClient()
	const userDoc = await db.listDocuments(config.DB_ID, config.BRO_COL_ID, [
		Query.equal("userId", [userId]),
	])
	return userDoc.documents[0]
}

export async function updateDocumentById(
	docId: string,
	data: Record<string, unknown>,
) {
	const { db } = await createSessionClient()
	const userDoc = await db.updateDocument(
		config.DB_ID,
		config.BRO_COL_ID,
		docId,
		data,
	)
	return userDoc
}

export async function getAllDocuments() {
	const { db } = await createSessionClient()
	const userDoc = await db.listDocuments(config.DB_ID, config.BRO_COL_ID)
	return userDoc as BrothersList
}

export async function getDocumentsWithQuery(
	query: string,
	...queries: string[]
) {
	const { db } = await createSessionClient()
	return (await db.listDocuments(config.DB_ID, config.BRO_COL_ID, [
		query,
		...queries,
	])) as BrothersList
}

export async function deleteDocumentById(
	docId: string,
) {
	const { db } = await createSessionClient()
	await db.deleteDocument(
		config.DB_ID,
		config.BRO_COL_ID,
		docId,
	)
}
