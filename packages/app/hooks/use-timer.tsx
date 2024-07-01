import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
	const [countdown, setCountdown] = useState({
		days: "00",
		hours: "00",
		minutes: "00",
		seconds: "00",
	});
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const calculateTimeLeft = (futureDate: Date) => {
		const difference = futureDate.getTime() - new Date().getTime();

		if (difference > 0) {
			return {
				days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
					2,
					"0",
				),
				hours: String(
					Math.floor((difference / (1000 * 60 * 60)) % 24),
				).padStart(2, "0"),
				minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
					2,
					"0",
				),
				seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
			};
		}

		return { days: "00", hours: "00", minutes: "00", seconds: "00" };
	};

	const startTimer = (futureDate: Date) => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		intervalRef.current = setInterval(() => {
			const timeLeft = calculateTimeLeft(new Date(futureDate));
			setCountdown(timeLeft);
		}, 1000);
	};

	useEffect(() => {
		return () =>
			intervalRef.current ? clearInterval(intervalRef.current) : undefined;
	}, []);

	return { countdown, startTimer };
};
