import { AppwriteException } from "node-appwrite"

export function isError(error: unknown) {
	return error instanceof AppwriteException
}
