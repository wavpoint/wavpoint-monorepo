import { withExpo } from "@expo/next-adapter";

/** @type {import('next').NextConfig} */
const nextConfig = {
	// reanimated (and thus, Moti) doesn't work with strict mode currently...
	// https://github.com/nandorojo/moti/issues/224
	// https://github.com/necolas/react-native-web/pull/2330
	// https://github.com/nandorojo/moti/issues/224
	// once that gets fixed, set this back to true
	reactStrictMode: false,
	transpilePackages: [
		"react-native",
		"react-native-web",
		"solito",
		"moti",
		"@repo/app",
		"react-native-reanimated",
		"nativewind",
		"react-native-gesture-handler",
		"react-native-svg",
		"lucide-react-native",
	],
	images: {
		remotePatterns: [
			{
				hostname: "rogpgrdjgfryhrmcmmpl.supabase.co",
			},
			{
				hostname: "ipfs.io"
			}
		],
	},
};

export default withExpo(nextConfig);
