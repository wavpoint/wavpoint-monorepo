import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Portal } from "./primitives/portal";
import * as ToastPrimitive from "./primitives/toast";
import { Text } from "./typography";
import { View } from "./view";

interface IToastContext {
	showToast: (message: string, duration?: number) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

interface IToast {
	duration: number;
	message: string;
}

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toast, setToast] = useState<IToast | null>(null);

	const showToast = useCallback((message: string, duration = 3) => {
		setToast({ message, duration });
	}, []);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (toast) {
			timeout = setTimeout(() => {
				setToast(null);
			}, toast.duration * 1000);
		}
		return () => clearTimeout(timeout);
	}, [toast]);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{toast && (
				<Portal name="toast-example">
					<View style={{ top: 4 }} className="px-4 absolute w-full">
						<ToastPrimitive.Root
							type="foreground"
							open={!!toast}
							onOpenChange={() => setToast(null)}
							className="opacity-95 bg-secondary border-border flex-row justify-between items-center p-4 rounded-xl"
						>
							<View className="gap-1.5">
								<ToastPrimitive.Title className="text-foreground text-3xl">
									{toast.message}
								</ToastPrimitive.Title>
								<ToastPrimitive.Description className="text-foreground text-lg">
									It will disappear in {toast.duration} seconds
								</ToastPrimitive.Description>
							</View>
							<View className="gap-2">
								<ToastPrimitive.Close className="border border-primary px-4 py-2">
									<Text className="text-foreground">Close</Text>
								</ToastPrimitive.Close>
							</View>
						</ToastPrimitive.Root>
					</View>
				</Portal>
			)}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

export const toast = {
	success: (message: string, duration = 3) => {
		const context = useContext(ToastContext);
		if (!context) {
			throw new Error("useToast must be used within a ToastProvider");
		}
		const { showToast } = context;
		showToast(message, duration);
	},
	error: (message: string, duration = 3) => {
		const context = useContext(ToastContext);
		if (!context) {
			throw new Error("useToast must be used within a ToastProvider");
		}
		const { showToast } = context;
		showToast(message, duration);
	},
};
