import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[url('/footer.svg')] bg-no-repeat bg-bottom bg-contain md:bg-auto">
      <Navbar />
      <main className="flex flex-col flex-1 items-center justify-between">
        <p
          className="font-mono uppercase max-w-xl text-center my-10"
          style={{
            // @ts-ignore
            textWrap: "balance",
          }}
        >
          Showcase & monetize unreleased music.
        </p>
        <div>
          <span className="relative font-sans">Powered By:</span>
          <div className="flex items-center gap-4">
            <Image src="/zora.png" alt="Logo" width={100} height={97} />
            <Image src="/base.svg" alt="Logo" width={100} height={28} />
          </div>
        </div>
        <Button
          variant="outline"
          className="font-sans text-2xl md:text-6xl rounded-full font-normal border border-black py-8 md:py-14 w-10/12 max-w-xl my-20 mb-64"
          style={{
            boxShadow: " 0px 4px 20px 0px #FF6700CC",
          }}
        >
          Deploy Media
        </Button>
      </main>
      <Footer />
    </div>
  );
}
