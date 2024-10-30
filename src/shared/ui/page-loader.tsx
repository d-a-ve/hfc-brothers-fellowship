import { Spinner } from "./spinner"

export function PageLoader() {
	return (
		<div
			role="status"
			className="flex min-h-96 items-center justify-center text-5xl"
		>
			<Spinner />
			<p className="sr-only">loading</p>
		</div>
	)
}
