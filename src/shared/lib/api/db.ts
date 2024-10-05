"use server"

import { ID, Permission, Query, Role } from "node-appwrite"

import { BrotherData } from "@shared/types"

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
		Query.equal('userId', [userId])
	])
	return userDoc.documents[0]
}