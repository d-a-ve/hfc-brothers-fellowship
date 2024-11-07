"use server"

import { Query } from "node-appwrite"

import config from "../config"
import { createAdminClient, createSessionClient } from "./client"

export async function createAdminTeam() {
	const { teams } = await createSessionClient()
	return await teams.create("admins", "Admins")
}

export async function addAdmin(adminEmail: string, adminName: string) {
	const { teams } = await createSessionClient()
	return await teams.createMembership(
		"admins",
		["owner"],
		adminEmail,
		undefined,
		undefined,
		`${config.BASE_URL}/admin/accept-invite`,
		adminName,
	)
}

export async function getAdminTeamMember(userId: string) {
	const { teams } = await createSessionClient()
	const members = await teams.listMemberships("admins", [
		Query.equal("userId", [userId]),
	])
	return members.memberships[0]
}

export async function updateAdminMembershipStatus(args: {
	teamId: string
	membershipId: string
	userId: string
	secret: string
}) {
	const { teams } = await createAdminClient()
	return await teams.updateMembershipStatus(
		args.teamId,
		args.membershipId,
		args.userId,
		args.secret,
	)
}
