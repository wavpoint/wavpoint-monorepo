import cookie from "cookie";

export async function POST() {
	return new Response(null, {
		status: 200,
		headers: {
			"Set-Cookie": cookie.serialize("sb-access-token", "", {
				path: "/",
				maxAge: -1,
			}),
		},
	});
}
