import type { ClassValue } from "clsx"

import { withFluid } from "@fluid-tailwind/tailwind-merge"
import { clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const twMerge = extendTailwindMerge({}, withFluid)

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getFileUrl(fileId: string) {
	return `https://cloud.appwrite.io/v1/storage/buckets/670043af0004023505d6/files/${fileId}/view?project=66fee7db00001dc0da3e`
}
