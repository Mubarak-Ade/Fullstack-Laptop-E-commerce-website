import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type {Links} from "@/features/dashboard/types";
import { useAuthStore } from "@/store/AuthStore";
import {LogOut} from "lucide-react";
import {motion} from "motion/react";
import {Link, useNavigate} from "react-router";

const SideBarBtn = ({
	label,
	icon,
	link,
}: {
	label: string;
	icon: React.ReactNode;
	link: string;
}) => {
	return (
		<motion.div
			whileHover={{
				backgroundColor: "--alpha(var(--color-primary) / 50%)",
				color: "var(--color-primary)",
			}}
			whileTap={{
				scale: 0.8,
			}}
			className="rounded-full dark:text-white"
		>
			<SidebarMenuItem className="px-4 bg-transparent py-2">
				<SidebarMenuButton>
					<Link
                        to={link}
						className="flex gap-2 text-sm bg-transparent font-poppins items-center"
					>
						{icon} {label}
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</motion.div>
	);
};

export const SideBar = ({ links }: { links: Links[] }) => {

	const logout = useAuthStore(s => s.logout)
	const navigate = useNavigate()

	const logOut = () => {
		logout
		navigate("/login")
	}

	return (
		<>
			<Sidebar className="border-l border-light-border dark:border-dark-border">
				<SidebarHeader className="flex flex-row gap-3 p-5 bg-light-bg dark:bg-dark-surface items-center border-b dark:border-dark-border border-light-border">
					<Link
						to="/"
						className="flex flex-col"
					>
						<h1 className="text-3xl dark:text-white font-bold tracking-tight">
							Shina Store
						</h1>
						<h6 className="text-sm text-secondary font-medium">
							Grow Your Knowledge
						</h6>
					</Link>
				</SidebarHeader>
				<SidebarContent className="px-3 bg-light-bg dark:bg-dark-surface py-4">
					<SidebarMenu className="space-y-2">
						{links.map((link) => (
							<SideBarBtn
								label={link.label}
								icon={link.icon}
								link={link.link}
							/>
						))}
					</SidebarMenu>
				</SidebarContent>
				<SidebarFooter className="bg-light-bg dark:bg-dark-surface">
					<motion.button
						whileHover={{
							backgroundColor: "#00ff6d33",
							color: "#00ff6d",
						}}
						whileTap={{
							scale: 0.8,
						}}
						onClick={logOut}
						className="flex items-center gap-4 px-5 py-2.5 rounded-md text-white font-medium cursor-pointer"
					>
						<LogOut />
						Logout
					</motion.button>
				</SidebarFooter>
			</Sidebar>
		</>
	);
};