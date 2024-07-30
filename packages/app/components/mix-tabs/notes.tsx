import { Row, Text } from "@wavpoint/app/ui";
import { useCallback } from "react";

interface MixNotesTabProps {
	notes?: string;
}

export function MixNotesTab({ notes }: MixNotesTabProps) {
	const parseNotes = useCallback((input: string) => {
		const formatted = input.replaceAll("↳", "");
		const lines = formatted.split("\n");

		return lines.reduce(
			(res, line) => {
				const [artist, track] = line.split(" - ");
				if (artist || track) {
					res.push({ artist, track });
				}

				return res;
			},
			[] as { artist: string | undefined; track: string | undefined }[],
		);
	}, []);

	return parseNotes(notes ?? "").map((line, i) => (
		<Row key={`${i}_${line.track}`} className="flex-wrap">
			{line.track ? (
				<Text className="text-sm break-words">
					{line.artist} - {line.track}
				</Text>
			) : (
				<Text className="text-sm font-bold break-words">{line.artist}</Text>
			)}
		</Row>
	));
}
