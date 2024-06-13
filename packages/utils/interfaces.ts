export interface PlayData {
	id: string;
	created_at: string;
	token_id: string;
	collection_address: string;
	plays: number;
}

export type PlayInput = Omit<Omit<PlayData, "id">, "created_at">;
