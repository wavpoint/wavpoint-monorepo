import { useEffect, useState } from "react";

type TUseTimer = {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
};

const DAYS_IN_MS = 1000 * 60 * 60 * 24;
const HOURS_IN_MS = 1000 * 60 * 60;
const MIN_IN_MS = 1000 * 60;
const SEC_IN_MS = 1000;

const getTimeDiff = (diffInMSec: number): TUseTimer => {
	let diff = diffInMSec;
	const days = Math.floor(diff / DAYS_IN_MS); // Give the remaining days
	diff -= days * DAYS_IN_MS; // Subtract passed days
	const hours = Math.floor(diff / HOURS_IN_MS); // Give remaining hours
	diff -= hours * HOURS_IN_MS; // Subtract hours
	const minutes = Math.floor(diff / MIN_IN_MS); // Give remaining minutes
	diff -= minutes * MIN_IN_MS; // Subtract minutes
	const seconds = Math.floor(diff / SEC_IN_MS); // Give remaining seconds
	return {
		days: String(days).padStart(2, "0"), // Format everything into the return type
		hours: String(hours).padStart(2, "0"),
		minutes: String(minutes).padStart(2, "0"),
		seconds: String(seconds).padStart(2, "0"),
	};
};

export const useTimer = () => {
	const [timeLeft, setTimeLeft] = useState(0);

	useEffect(() => {
		const id = setTimeout(() => {
			// We can set conditions here like timeLeft > 0
			setTimeLeft((prev) => {
				if (prev === 0) return 0;
				return prev - 1000;
			});
		}, 1000);

		return () => {
			clearTimeout(id);
		};
	}, []);

	const startTimer = (targetTime: number) => {
		setTimeLeft(targetTime - Date.now());
	};

	return {
		...getTimeDiff(timeLeft),
		startTimer,
	};
};
