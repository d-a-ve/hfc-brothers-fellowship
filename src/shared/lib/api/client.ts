"use server"

import { cookies } from "next/headers"
import { Account, Client, Databases, Storage } from "node-appwrite"

import config from "../config"

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(config.API_ENDPOINT)
		.setProject(config.API_PROJECT_ID)

	const session = cookies().get(config.COOKIE_SESSION_ID)

	if (!session || !session.value) {
		throw new Error("No session")
	}

	client.setSession(session.value)

	return {
		get account() {
			return new Account(client)
		},
		get storage() {
			return new Storage(client)
		},
		get db() {
			return new Databases(client)
		},
	}
}

export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(config.API_ENDPOINT)
		.setProject(config.API_PROJECT_ID)
		.setKey(config.API_KEY)

	return {
		get account() {
			return new Account(client)
		},
		get storage() {
			return new Storage(client)
		},
		get db() {
			return new Databases(client)
		},
	}
}
