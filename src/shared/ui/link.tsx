"use client"

import {
	ComponentProps,
	createContext,
	MouseEvent,
	ReactNode,
	startTransition,
	useContext,
	useEffect,
	useOptimistic,
	useRef,
} from "react"

import { cva, VariantProps } from "class-variance-authority"
import {
	domAnimation,
	LazyMotion,
	m,
	useMotionTemplate,
	useSpring,
} from "framer-motion"
import { useRouter } from "next-nprogress-bar"
import Link from "next/link"

import { cn } from "@shared/lib/utils"

// Internal context for the progress bar
const ProgressBarContext = createContext<ReturnType<
	typeof useProgressInternal
> | null>(null)

// Hook to access the progress bar context
function useProgressBarContext() {
	const progress = useContext(ProgressBarContext)
	if (progress === null) {
		throw new Error(
			"Make sure to use `ProgressBarProvider` before using the progress bar.",
		)
	}
	return progress
}

// Utility function to generate random numbers
function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// Function to calculate progress increment
function getDiff(current: number): number {
	if (current === 0) return 15
	if (current < 50) return random(1, 10)
	return random(1, 5)
}

// Custom hook for managing progress state and animation
export function useProgressInternal() {
	const [loading, setLoading] = useOptimistic(false)
	const spring = useSpring(0, {
		damping: 25,
		mass: 0.5,
		stiffness: 300,
		restDelta: 0.1,
	})

	useInterval(
		() => {
			if (spring.get() === 100) spring.jump(0)
			const current = spring.get()
			spring.set(Math.min(current + getDiff(current), 99))
		},
		loading ? 750 : null,
	)

	useEffect(() => {
		if (!loading) spring.jump(0)
	}, [spring, loading])

	function start() {
		setLoading(true)
	}

	return { loading, spring, start }
}

// Custom hook for setting up intervals
function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		function tick() {
			savedCallback.current()
		}

		if (delay !== null) {
			tick()
			// eslint-disable-next-line prefer-const
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

// Provider component for the progress bar
export function ProgressBarProvider({ children }: { children: ReactNode }) {
	const progress = useProgressInternal()
	return (
		<ProgressBarContext.Provider value={progress}>
			{children}
		</ProgressBarContext.Provider>
	)
}

// Progress bar component
export function ProgressBar() {
	const progress = useProgressBarContext()
	const width = useMotionTemplate`${progress.spring}%`

	return (
		<LazyMotion features={domAnimation}>
			{progress.loading && (
				<m.div
					style={{ width }}
					exit={{ opacity: 0 }}
					className="fixed top-0 z-[9999] h-1.5 rounded-xl bg-primary shadow-lg shadow-sky-500/20"
				/>
			)}
		</LazyMotion>
	)
}

// Hook to start the progress
export function useProgress(): () => void {
	const progress = useProgressBarContext()
	return progress.start
}

// Utility function to check if a click event is modified
function isModifiedEvent(event: React.MouseEvent): boolean {
	const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement
	const target = eventTarget.getAttribute("target")
	return (
		(target && target !== "_self") ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey ||
		(event.nativeEvent && event.nativeEvent.which === 2)
	)
}

const linkVariants = cva("", {
	variants: {
		variant: {
			default: "text-primary underline hover:no-underline",
			none: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
})

interface LinkProps
	extends ComponentProps<typeof Link>,
		VariantProps<typeof linkVariants> {}

export function AppLink({
	href,
	children,
	replace,
	className,
	scroll,
	variant,
	...props
}: LinkProps) {
	const router = useRouter()
	const startProgress = useProgress()

	const handleClick = (
		e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
	) => {
		if (isModifiedEvent(e)) return
		e.preventDefault()
		startTransition(() => {
			startProgress()
			if (replace) {
				router.replace(href.toString(), { scroll })
			} else {
				router.push(href.toString(), { scroll })
			}
		})
	}

	return (
		<Link
			href={href}
			className={cn(linkVariants({ variant, className }))}
			onClick={handleClick}
			{...props}
		>
			{children}
		</Link>
	)
}
