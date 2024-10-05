function checkEnvKey(key: string) {
	if (!process.env[key]) {
		throw new Error(`Environment variable ${key} is not available`)
	}

	return process.env[key]
}

const apiEndpoint = checkEnvKey("NEXT_PUBLIC_APPWRITE_ENDPOINT")
const projectId = checkEnvKey("NEXT_PUBLIC_APPWRITE_PROJECT")
const bucketId = checkEnvKey("NEXT_APPWRITE_BUCKET_ID")
const dbId = checkEnvKey("NEXT_APPWRITE_DB_ID")
const broColId = checkEnvKey("NEXT_APPWRITE_BRO_COL_ID")
const apiKey = checkEnvKey("NEXT_APPWRITE_KEY")
const env = process.env.NODE_ENV;
const cookieSessionId = 'my-custom-session'

const config = {
	API_ENDPOINT: apiEndpoint,
	API_PROJECT_ID: projectId,
	API_KEY: apiKey,
	BUCKET_ID: bucketId,
	DB_ID: dbId,
	BRO_COL_ID: broColId,
	COOKIE_SESSION_ID: cookieSessionId,
	ENV: env,
}

export default config
