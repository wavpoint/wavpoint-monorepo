import { useCallback, useState } from "react";

const useCopy = () => {
	const [isCopied, setIsCopied] = useState(false);

	const copyToClipboard = useCallback((text: string) => {
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					setIsCopied(true);
					setTimeout(() => setIsCopied(false), 2000);
				})
				.catch((err) => console.error("Failed to copy text: ", err));
		}
	}, []);

	return { isCopied, copyToClipboard };
};

export { useCopy };
