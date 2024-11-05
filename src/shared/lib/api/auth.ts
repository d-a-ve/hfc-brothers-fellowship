"use server"

import { cache } from "react"

import { cookies } from "next/headers"
import { ID } from "node-appwrite"

import config from "../config"
import { createAdminClient, createSessionClient } from "./client"

export const getLoggedInUser = cache(async () => {
	const { account } = await createSessionClient()
	return await account.get()
})

export async function signUpWithEmailOnly(email: string) {
	const { account } = await createAdminClient()
	return await account.createEmailToken(ID.unique(), email)
}

export async function createSessionForEmailOnly(
	userId: string,
	secret: string,
) {
	const { account } = await createAdminClient()
	const session = await account.createSession(userId, secret)
	cookies().set(config.COOKIE_SESSION_ID, session.secret, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: config.ENV === "production" ? true : false,
	})
	return session
}

export async function signOut() {
	const { account } = await createSessionClient()
	await account.deleteSession("current")
	cookies().delete(config.COOKIE_SESSION_ID)
}

export async function updateLoggedInUserName(name: string) {
	const { account } = await createSessionClient()
	await account.updateName(name)
}
