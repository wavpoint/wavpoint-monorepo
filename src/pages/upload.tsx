import { IconUpload } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout/layout";
import React, { useEffect, useRef, useState } from "react";

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [, setSelectedFile] = useState("No selected file");

  const handleFileChange = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      <div className="w-11/12 max-w-2xl m-auto mb-36">
        <h1 className="text-2xl font-sans mb-4">Media Upload</h1>
        <div>
          <div>
            <Input
              type="text"
              placeholder="Drop name"
              className="font-sans my-2"
            />
            <Input
              type="text"
              placeholder="Collection name"
              className="font-sans my-2"
            />
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  type="text"
                  placeholder="Artist name"
                  className="font-sans"
                />
                <Textarea
                  placeholder="Description"
                  className="font-sans mt-2"
                  rows={6}
                />
              </div>
              <div
                className={`border flex-1 rounded-sm items-center justify-center flex flex-col h-full p-6 text-center box-border relative bg-cover bg-center bg-no-repeat`}
                style={
                  image
                    ? {
                        backgroundImage: `url(${URL.createObjectURL(image)})`,
                      }
                    : {}
                }
              >
                <div role="button" tabIndex={0}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
                    onChange={({ target: { files } }) => {
                      if (files && files[0]) {
                        setSelectedFile(files[0].name);
                        setImage(files[0]);
                      }
                    }}
                  />
                  {image ? null : (
                    <div
                      className="flex items-center justify-center flex-col"
                      onClick={handleFileChange}
                      onKeyDown={handleFileChange}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="mb-3">
                        <IconUpload />
                      </div>
                      <div className="flex items-center flex-col ">
                        <p className="text-sm text-[#222222] font-sans">
                          Upload or drag & drop artwork
                        </p>
                        <p className="text-sm text-[#888888] font-sans">
                          .JPEG, .PNG or .GIF max 50 MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mt-6">
              <Label className="font-sans text-[#888888]" htmlFor="picture">
                Audio
              </Label>
              <div
                className={`rounded-sm border items-center justify-center flex flex-col h-full py-2 text-center box-border relative w-full`}
              >
                <div role="button" tabIndex={0}>
                  <input
                    type="file"
                    accept="audio/mp3,audio/wav"
                    ref={fileInputRef}
                    className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
                    onChange={({ target: { files } }) => {
                      if (files && files[0]) {
                        setSelectedFile(files[0].name);
                        setAudio(files[0]);
                      }
                    }}
                  />
                  {audio ? (
                    <div>
                      <p className="font-sans">{audio.name}</p>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center w-full gap-2"
                      onClick={handleFileChange}
                      onKeyDown={handleFileChange}
                      role="button"
                      tabIndex={0}
                    >
                      <IconUpload />
                      <span className="text-sm text-[#222222] font-sans">
                        Upload or drag & drop artwork
                      </span>
                      <span className="text-sm text-[#888888] font-sans">
                        .MP3 or .WAV max 100 MB
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="my-4">
              <Label className="font-sans text-[#888888]" htmlFor="picture">
                Video
              </Label>
              <div
                className={`rounded-sm border items-center justify-center flex flex-col h-full py-2 text-center box-border relative w-full`}
              >
                <div role="button" tabIndex={0}>
                  <input
                    type="file"
                    accept=".mp4"
                    ref={fileInputRef}
                    className="h-full w-full absolute top-0 left-0 opacity-0 cursor-pointer"
                    onChange={({ target: { files } }) => {
                      if (files && files[0]) {
                        setSelectedFile(files[0].name);
                        setVideo(files[0]);
                      }
                    }}
                  />
                  {video ? (
                    <div>
                      <p className="font-sans">{video.name}</p>
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center w-full gap-2"
                      onClick={handleFileChange}
                      onKeyDown={handleFileChange}
                      role="button"
                      tabIndex={0}
                    >
                      <IconUpload />
                      <span className="text-sm text-[#222222] font-sans">
                        Upload or drag & drop artwork
                      </span>
                      <span className="text-sm text-[#888888] font-sans">
                        .MP4 max 10 GB
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Textarea
              placeholder="Track IDs/Chapters"
              className="font-sans my-4"
              rows={6}
            />
            <div className="grid grid-cols-3 gap-2 my-6">
              <Input
                type="text"
                placeholder="Recording Location"
                className="font-sans col-span-2"
              />
              <Input
                type="text"
                placeholder="Royalty"
                className="font-sans col-span-1"
              />
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-xl font-sans mb-4">Creator Reward Splits</h1>
            <div className="grid grid-cols-3 gap-2">
              <Input
                type="text"
                placeholder="Wallet / ENS address or Email"
                className="font-sans col-span-2"
              />
              <Input
                type="text"
                placeholder="Percentage"
                className="font-sans col-span-1"
              />
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="font-sans rounded-full w-48 block ml-auto mt-12 border-[#222222]"
        >
          Split Evenly
        </Button>
        <Separator className="my-8" />
        <div className="flex items-center justify-end gap-2">
          <Button className="font-sans rounded-full outline-none border border-transparent bg-transparent text-[#222222] hover:border-[#222222] hover:bg-transparent">
            Cancel
          </Button>
          <Button className="font-sans rounded-full w-48">Deploy</Button>
        </div>
      </div>
    </Layout>
  );
}
