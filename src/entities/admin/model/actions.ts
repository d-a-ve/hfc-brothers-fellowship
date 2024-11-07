"use server"

import { addAdmin } from "@shared/lib/api"

export async function addNewAdminAction(email: string, name: string) {
	return await addAdmin(email, name)
}
