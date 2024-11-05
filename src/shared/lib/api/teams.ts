"use server"

import { Query } from "node-appwrite"

import { createSessionClient } from "./client"

export async function createAdminTeam() {
	const { teams } = await createSessionClient()
	return await teams.create("admins", "Admins")
}

export async function addMembersToAdminTeam(userEmail: string) {
	const { teams } = await createSessionClient()
	return await teams.createMembership("admins", ["admin"], userEmail)
}

export async function getAdminTeamMember(userId: string) {
	const { teams } = await createSessionClient()
	const members = await teams.listMemberships("admins", [
		Query.equal("userId", [userId]),
	])
	return members.memberships[0]
}
