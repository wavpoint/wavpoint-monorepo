import { type ZodIssue, z } from "zod";

export const mintFormSchema = z.object({
	comment: z.string().max(128),
});
export type MintFormInput = z.infer<typeof mintFormSchema>;

export const editProfileSchema = z.object({
	username: z.string().min(3).max(30),
});
export type EditProfileInput = z.infer<typeof editProfileSchema>;

export const claimFormSchema = z.object({
	name: z.string().min(3).max(100),
	address: z.string().min(3).max(150),
	email: z.string().email(),
	mixTokenId: z.string(),
	mixCollectionAddress: z.string(),
});
export type ClaimFormInput = z.infer<typeof claimFormSchema>;

export const loginSchema = z.object({
	accessToken: z.string().min(1),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const playSchema = z.object({
	tokenId: z.string().min(1).max(100),
});
export type PlayInput = z.infer<typeof playSchema>;

export class WavpointAPIError {
	errors: {
		message: string;
	}[] = [];
	zodErrors?: ZodIssue[];
	status: number;

	constructor(
		custom: {
			message: string;
		}[],
		status = 400,
		zod?: ZodIssue[],
	) {
		this.errors = custom;
		this.zodErrors = zod;
		this.status = status;
	}
}
