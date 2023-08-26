import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { DM_Sans, Azeret_Mono } from "next/font/google";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});
const azeret_mono = Azeret_Mono({
  subsets: ["latin"],
  variable: "--font-azeret-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${dm_sans.variable} ${azeret_mono.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
