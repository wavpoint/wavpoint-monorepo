import {
  IconArrowUpRight,
  IconPencil,
  IconSkipBack,
  IconSkipForward,
  IconVolume,
} from "@/components/assets/icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Layout from "@/layout/layout";
import React from "react";

export default function drop() {
  return (
    <Layout>
      <div className="w-11/12 max-w-5xl mx-auto mb-24">
        <div className="my-8 mb-16">
          <div className="w-full bg-gray-200">
            <AspectRatio
              ratio={16 / 9}
              className="bg-muted bg-[url('/preview.png')] bg-cover bg-center"
            ></AspectRatio>
          </div>
        </div>
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
            <div className="flex items-center justify-end gap-4  mb-6">
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
        <div className="grid grid-cols-2 gap-x-6 lg:gap-x-28 gap-y-16">
          <div className="flex items-center gap-6 col-span-full md:col-span-1 mt-12 md:order-1">
            <Button
              className="rounded-full text-base font-sans border-[#222222] flex-grow"
              variant="outline"
            >
              Collected
            </Button>
            <Button className="rounded-full font-mono text-orange text-xs bg-[#F5F5F5] px-6">
              14 Collected
            </Button>
          </div>
          <div className="hidden md:block">
            <DateDeployedContractAddress />
          </div>
          <div className="col-span-full order-2 md:order-3 lg:col-span-1 lg:order-3">
            <h2 className="font-sans font-medium text-lg text-orange mb-4">
              Description
            </h2>
            <p className="font-mono text-sm font-normal">
              Fourth and final single from British funk and acid jazz band
              Jamiroquai&apos;s fifth studio album, A Funk Odyssey (2001).
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
          <div className="col-span-full order-3 md:order-4 lg:col-span-1 lg:order-4">
            <div>
              <h2 className="font-sans font-medium text-lg text-orange mb-4">
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
                <li className="font-mono text-sm font-normal">
                  Habitzz - Buddy
                </li>
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
            <div className="block md:hidden">
              <DateDeployedContractAddress />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const DateDeployedContractAddress = () => (
  <div className="flex items-center justify-between mt-12">
    <div>
      <p className="font-sans text-orange text-lg">Date Deployed</p>
      <p className="font-mono text-sm">8 July 2002</p>
    </div>
    <div>
      <p className="font-sans text-orange text-lg">Contract Address</p>
      <p className="flex items-center gap-1">
        <span className="font-mono text-sm underline">0x4691...45960f532</span>
        <IconArrowUpRight />
      </p>
    </div>
  </div>
);
