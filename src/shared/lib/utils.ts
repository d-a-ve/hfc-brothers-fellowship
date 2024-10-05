import type { ClassValue } from "clsx"

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getFileUrl(fileId: string) {
	return `https://cloud.appwrite.io/v1/storage/buckets/670043af0004023505d6/files/${fileId}/view?project=66fee7db00001dc0da3e`
}
