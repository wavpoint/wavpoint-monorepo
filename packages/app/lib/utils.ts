import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
	lessThanXSeconds: "{{count}}s",
	xSeconds: "{{count}}s",
	halfAMinute: "30s",
	lessThanXMinutes: "{{count}}m",
	xMinutes: "{{count}}m",
	aboutXHours: "{{count}}h",
	xHours: "{{count}}h",
	xDays: "{{count}}d",
	aboutXWeeks: "{{count}}w",
	xWeeks: "{{count}}w",
	aboutXMonths: "{{count}}m",
	xMonths: "{{count}}m",
	aboutXYears: "{{count}}y",
	xYears: "{{count}}y",
	overXYears: "{{count}}y",
	almostXYears: "{{count}}y",
};

export const formatDistance = (
	token: keyof typeof formatDistanceLocale,
	count: number,
) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const result = (formatDistanceLocale[token] as any).replace(
		"{{count}}",
		count,
	);

	return result;
};
