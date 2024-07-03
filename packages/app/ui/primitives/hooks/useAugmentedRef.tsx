import * as React from "react";

interface AugmentRefProps<T> {
	ref: React.Ref<T>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	methods?: Record<string, (...args: any[]) => any>;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	deps?: any[];
}

export function useAugmentedRef<T>({
	ref,
	methods,
	deps = [],
}: AugmentRefProps<T>) {
	const augmentedRef = React.useRef<T>(null);
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useImperativeHandle(
		ref,
		() => {
			if (typeof augmentedRef === "function" || !augmentedRef?.current) {
				return {} as T;
			}
			return {
				...augmentedRef.current,
				...methods,
			};
		},
		deps,
	);
	return augmentedRef;
}
