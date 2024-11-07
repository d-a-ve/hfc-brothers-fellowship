"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { isError } from "@shared/lib/api"
import { cn } from "@shared/lib/utils"
import { useToast } from "@shared/model"
import { Button } from "@shared/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@shared/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@shared/ui/form"
import { Input } from "@shared/ui/input"
import { Spinner } from "@shared/ui/spinner"

import { addNewAdminAction } from "../model/actions"

const addNewAdminFormSchema = z.object({
	name: z.string().min(2, "Admin name is required"),
	email: z
		.string()
		.min(2, "New admin email is required")
		.email("This email is invalid"),
})

type NewAdminForm = z.infer<typeof addNewAdminFormSchema>

export function AdminAddTeamMemberDialog() {
	const [open, setOpen] = useState(false)
	const newAdminForm = useForm<NewAdminForm>({
		resolver: zodResolver(addNewAdminFormSchema),
		defaultValues: {
			email: "",
		},
	})
	const { toast } = useToast()
	const isLoading = newAdminForm.formState.isSubmitting

	const onSubmit = async (data: NewAdminForm) => {
		try {
			console.log(data)
			const newAdmin = await addNewAdminAction(data.email, data.name)
			toast({
				title: `Invite email has been sent to ${data.email}`,
				description:
					"The email to join the admin team has successfully been sent.",
			})
			setTimeout(() => {
				setOpen(false)
			}, 500)
			console.log(newAdmin)
		} catch (e: unknown) {
			if (isError(e)) {
				toast({
					title: "Invite failed to send.",
					description: e.message,
				})
				console.log(e)
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="fixed bottom-8 right-4 z-10">
				<Button>Add new admin</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="flex-row items-center justify-between gap-3 space-y-0 pt-6">
					<div>
						<DialogTitle>Add a new admin to the team</DialogTitle>
						<DialogDescription>
							<VisuallyHidden>Add a new admin to the team</VisuallyHidden>
						</DialogDescription>
					</div>
				</DialogHeader>
				<Form {...newAdminForm}>
					<form
						onSubmit={newAdminForm.handleSubmit(onSubmit)}
						className="space-y-4"
					>
						<FormField
							control={newAdminForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Admin Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={newAdminForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Admin Email</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-2">
							<Button
								size={"lg"}
								className="relative w-full"
								disabled={!newAdminForm.formState.isDirty || isLoading}
							>
								<span className={cn(isLoading && "opacity-0")}>Invite</span>
								<span
									className={cn(
										"absolute inset-0 flex items-center justify-center",
										{
											"opacity-0": !isLoading,
											"opacity-100": isLoading,
										},
									)}
								>
									<Spinner />
								</span>
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
