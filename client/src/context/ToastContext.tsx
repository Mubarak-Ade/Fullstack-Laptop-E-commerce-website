import Toast from "@/components/Toast";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface Toast {
	id: number;
	type: ToastKind;
	message: string;
}

interface ToastContextType {
	showToast: (type: ToastKind, message: string) => void;
}

export type ToastKind = "success" | "error" | "info" | "warning";

export const ToastContext = createContext<
	ToastContextType | undefined
>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error(
			"useToast must be used within ToastProvider"
		);
	}
	return context;
};

let externalShowToast: ToastContextType["showToast"] | null = null;

export const setExternalToastHandler = (
	handler: ToastContextType["showToast"] | null
) => {
	externalShowToast = handler;
};

export const showGlobalToast = (
	type: ToastKind,
	message: string
) => {
	if (externalShowToast) {
		externalShowToast(type, message);
	}
};

let toastId = 0;
const toastDedupeWindowMs = 5000;
const lastToastAt = new Map<string, number>();

interface ToastProviderProps {
	children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = useCallback((type: ToastKind, message: string) => {
		const key = `${type}:${message}`;
		const now = Date.now();
		const lastShown = lastToastAt.get(key);
		if (lastShown && now - lastShown < toastDedupeWindowMs) {
			return;
		}
		lastToastAt.set(key, now);
		const id = toastId++;
		const newToast: Toast = { id, type, message };
		setToasts((prev) => {
			if (prev.some((toast) => toast.type === type && toast.message === message)) {
				return prev;
			}
			return [...prev, newToast];
		});
		setTimeout(() => {
			removeToast(id);
		}, 10000);
	}, []);

	const removeToast = (id: number) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	useEffect(() => {
		setExternalToastHandler(showToast);
		return () => setExternalToastHandler(null);
	}, [showToast]);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className="fixed top-15 flex-col p-10 left-0 flex items-center justify-center w-full space-y-2 z-50">
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						id={toast.id}
						type={toast.type}
						message={toast.message}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export default ToastProvider;
