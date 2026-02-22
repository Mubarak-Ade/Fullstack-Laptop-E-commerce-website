import { cn } from "@/lib/utils";
import {
	createContext,
	useContext,
	useState,
	type ReactNode
} from "react";

interface TabsContextProps {
	activeTab: string;
	setActiveTab: (value: string) => void;
}

interface TabsProps {
	defaultValue?: string;
	children: ReactNode;
	className?: string;
}

interface TabsContentProps {
	value: string;
    className?: string
	children: ReactNode;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const useTabs = () => {
	const context = useContext(TabsContext);

	if (!context) {
		throw new Error("Tabs components must be used inside Tabs");
	}
	return context;
};

interface TabsButtonProps {
	value: string;
	children: ReactNode;
}

const Tabs = ({ defaultValue = "tab1", children, className }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultValue);
	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div
				className={cn(
					"w-full",
					className
				)}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
};

const TabsList = ({ children }: { children: ReactNode }) => {
	return <div className="">{children}</div>;
};

const TabsHeader = ({ children, className }: { children: ReactNode,className?: string }) => {
	return (
		<div className={cn("flex w-full border-b-2 relative border-gray-200 px-4 items-center", className)}>
			{children}
		</div>
	);
};

const TabsContent = ({ value, children, className }: TabsContentProps) => {
	const { activeTab } = useTabs();

	if (activeTab !== value) return null;

	return <div className={cn("flex items-center justify-center p-5", className)}>{children}</div>;
};

const TabsButton = ({ value, children }: TabsButtonProps) => {
	const { activeTab, setActiveTab } = useTabs();

	return (
		<>
			<button
				onClick={() => setActiveTab(value)}
				className={`px-6 py-2 cursor-pointer ${
					activeTab === value ? "border-b-2  border-green-500 text-green-500" : ""
				}`}
			>
				{children}
			</button>
		</>
	);
};

export { Tabs, TabsButton, TabsContent, TabsHeader, TabsList, useTabs };

