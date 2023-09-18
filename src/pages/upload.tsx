import { IconUpload } from "@/components/assets/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/layout/layout";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function Upload() {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [, setSelectedFile] = useState("No selected file");

  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleFileChange = () => {
    fileInputRef.current?.click();
  };

  function checkMobileScreen(width: number, height: number) {
    // @ts-ignore
    window.mobileCheck = function () {
      let check = false;
      (function (a) {
        if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
            a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            a.substr(0, 4)
          )
        )
          check = true;
        // @ts-ignore
      })(navigator.userAgent || navigator.vendor || window.opera);
      return check;
    };

    // @ts-ignore
    if (window.mobileCheck()) {
      // console.log("Mobile");
      setIsMobile(true);
    } else {
      // console.log("Desktop");
      setIsMobile(false);
    }

    // @ts-ignore
    if (window.mobileCheck() && width > height) {
      setIsMobileLandscape(true);
      // @ts-ignore
    } else if (window.mobileCheck() && width < height) {
      setIsMobileLandscape(false);
    }
  }

  useEffect(() => {
    checkMobileScreen(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", () => {
      checkMobileScreen(window.innerWidth, window.innerHeight);
      // console.log(window.innerHeight, window.innerWidth);
    });
  }, []);

  if (isMobile && !isMobileLandscape) {
    return (
      <div className="h-screen flex items-center justify-center flex-col">
        <p className="text-center font-sans max-w-md w-11/12">
          Media uploading and drop creation is only available on desktop
          browser. Please visit this page on a desktop browser to upload media
        </p>
        <Link
          className="text-center font-sans text-sm bg-black hover:bg-blue-700 text-white py-2 px-4 rounded mt-4"
          href="/"
        >
          Back to Home
        </Link>
      </div>
    );
  }

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
              <div className="col-span-2 relative">
                <Input
                  type="text"
                  placeholder="Recording Location"
                  className="font-sans"
                />
                <span className="font-sans absolute top-2 right-3 text-[#BBBBBB] select-none text-md">
                  City, Neighborhood, Nightclub
                </span>
              </div>
              <div className="col-span-1 relative">
                <Input
                  type="text"
                  placeholder="Royalty"
                  className="font-sans"
                />
                <span className="font-sans absolute top-2 right-3 text-[#BBBBBB] select-none text-md">
                  %
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-xl font-sans mb-4">Creator Reward Splits</h1>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <Input
                  type="text"
                  placeholder="Wallet / ENS address or Email"
                  className="font-sans"
                />
              </div>
              <div className="col-span-1 relative">
                <Input
                  type="text"
                  placeholder="Percentage"
                  className="font-sans"
                />
                <span className="font-sans absolute top-2 right-3 text-[#BBBBBB] select-none text-md">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="font-sans block ml-auto mt-4 border-[#222222] font-semibold">
          + Add More
        </button>
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
