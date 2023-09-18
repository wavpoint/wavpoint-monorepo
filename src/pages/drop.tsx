import {
  IconArrowUpRight,
  IconLockOpen,
  IconPencil,
  IconSkipBack,
  IconSkipForward,
  IconVolume,
} from "@/components/assets/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Layout from "@/layout/layout";
import React from "react";

export default function drop() {
  return (
    <Layout>
      <div className="grid w-11/12 md:grid-cols-9 max-w-5xl mx-auto gap-x-20 gap-y-20 mb-32">
        <div className="col-span-full md:col-span-4 row-span-1">
          {/* <div className="w-96 max-w-full h-96 max-h-max ">
            <AspectRatio
              ratio={16 / 16}
              className="bg-muted bg-[url('/preview.png')] bg-cover bg-center"
            ></AspectRatio>
          </div> */}
          <div className="w-full max-w-sm h-96 bg-red-400">
            {/* <AspectRatio
              ratio={16 / 16}
              className="bg-muted bg-[url('/preview.png')] bg-cover bg-center"
            ></AspectRatio> */}
          </div>
        </div>
        <div className="col-span-full md:col-span-4 md:row-start-2 order-3">
          <div>
            <h2 className="font-sans font-medium text-lg text-orange mb-3">
              Description
            </h2>
            <p className="font-mono text-sm font-normal">
              Fourth and final single from British funk and acid jazz band
              Jamiroquai&apos;s fifth studio album, A Funk Odyssey (2001).{" "}
              <br />
              The song was written by Jason Kay and Rob Harris and is a bossa
              nova-type track, reflecting on the problems that people of the
              Earth have to suffer.
            </p>
            <p className="font-mono text-sm font-normal mt-8">
              The song peaked at number 31 on the UK Singles Chart and was the
              last Jamiroquai single to use the DVD format. Its DVD single is
              referred to as one of the rarest DVD singles in history despite
              having had over 100,000 copies produced.
            </p>
          </div>

          <div className="mt-8">
            <h2 className="font-sans font-medium text-lg text-orange mb-3">
              Activity
            </h2>
            <div>
              <div className="flex items-center justify-between my-2">
                <span className="font-mono text-sm">Collector</span>
                <span className="font-mono text-sm">Time</span>
              </div>
              <Separator className="h-[2px] bg-black" />
              <div className="my-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-8">
                      <AvatarImage src="/avatar.svg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="font-mono text-sm">0x0000...000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange font-mono text-sm">1 hr</span>
                    <IconArrowUpRight stroke="#FF6700" />
                  </div>
                </div>
                <p className="mt-4 text-sm">🔥🔥🔥</p>
              </div>
              <div className="my-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-8">
                      <AvatarImage src="/avatar.svg" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="font-mono text-sm">wavthe0ry.eth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange font-mono text-sm">1 hr</span>
                    <IconArrowUpRight stroke="#FF6700" />
                  </div>
                </div>
                <p className="mt-4 font-mono text-sm">First to collect!!!</p>
              </div>
              <span className="block text-center font-mono text-xs text-orange mt-6">
                show more
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-5 md:col-start-5 md:row-span-1 md:row-start-1">
          <div>
            <div className="flex flex-col gap-3">
              <h2 className="font-mono text-2xl">Jamiroquai</h2>
              <div className="flex gap-2">
                <span className="font-mono text-base">Mini Mix 001</span>
                <IconPencil />
              </div>
              <div className="font-mono text-sm text-[#888888]">
                Recorded: London, UK
              </div>
            </div>
            <div>
              <div className="flex items-center justify-end gap-4 mb-6">
                <IconSkipBack />
                <IconSkipForward />
                <IconVolume />
              </div>
              <Progress value={0} className="h-[3px]" />
              <div className="flex items-center justify-between mt-2">
                <span className="font-mono text-sm text-mid-grey">0:00</span>
                <span className="font-mono text-sm text-mid-grey">29:30</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start md:flex-row gap-3 md:gap-6 mt-12">
            <Button className="rounded-full w-fit mx-auto md:mx-0 flex items-center py-8 md:py-2 px-12 gap-1">
              <IconLockOpen />
              <span className="text-base md:text-xs font-sans border-[#222222]">
                Track IDs & Video
              </span>
            </Button>
            <Button className="rounded-full w-fit mx-auto md:mx-0 font-mono text-orange text-xs bg-[#F5F5F5] px-6">
              14 Collected
            </Button>
          </div>
          <div className="flex items-center justify-between mt-12">
            <div>
              <p className="font-sans text-orange text-lg">Date Deployed</p>
              <p className="font-mono text-sm">8 July 2002</p>
            </div>
            <div>
              <p className="font-sans text-orange text-lg">Contract Address</p>
              <p className="flex items-center gap-1">
                <span className="font-mono text-sm underline">
                  0x4691...45960f532
                </span>
                <IconArrowUpRight />
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-full md:col-span-5 md:col-start-5 md:row-start-2 order-3">
          <div>
            <h2 className="font-sans font-medium text-lg text-orange mb-3">
              Track IDs
            </h2>
            <ul className="flex flex-col gap-5">
              <li className="font-mono text-sm font-normal">
                Do It Like I&apos;m Used 2 It - Freddie Joachim
              </li>
              <li className="font-mono text-sm font-normal">
                Buddha Fist Style - Evidence
              </li>
              <li className="font-mono text-sm font-normal">
                Claim 2 Fame - 9th Wonder
              </li>
              <li className="font-mono text-sm font-normal">
                Club Onna Thursday - Maze
              </li>
              <li className="font-mono text-sm font-normal">Habitzz - Buddy</li>
              <li className="font-mono text-sm font-normal">
                Keep It Movin - Ackryte
              </li>
              <li className="font-mono text-sm font-normal">
                Buttr Grits - Ohbliv
              </li>
              <li className="font-mono text-sm font-normal">
                Damndamndamn - Mndsgn
              </li>
              <li className="font-mono text-sm font-normal">
                Whodatwho - Damu The Fudgemunk
              </li>
              <li className="font-mono text-sm font-normal">
                Davibe - Uptown XO
              </li>
              <li className="font-mono text-sm font-normal">
                Buttery Brwn - Danny Brown
              </li>
              <li className="font-mono text-sm font-normal">
                U & Ya Frendz - Knxwledge
              </li>
              <li className="font-mono text-sm font-normal">
                1st Nite - Little Brother
              </li>
              <li className="font-mono text-sm font-normal">
                Les Journey - Dibiase
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
