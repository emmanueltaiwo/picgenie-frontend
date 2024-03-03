"use client";

import { FC } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageGenerated } from "@/typings";
import { formatDate } from "@/lib/utils";

type Props = {
  imageUrl?: string;
  data?: ImageGenerated;
  newImage: boolean;
};

type ModalProps = {
  prompt?: string;
  imageUrl: string;
  date?: string;
};

const Modal: FC<ModalProps> = ({ prompt, imageUrl, date }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <EyeOpenIcon className="mr-2 w-4 h-4" />
          View
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          {prompt && <AlertDialogTitle>{prompt}</AlertDialogTitle>}

          <Image
            src={imageUrl}
            width={450}
            height={400}
            alt="image"
            className="w-fit rounded-lg mx-auto"
          />
          {date && <AlertDialogDescription>{date}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ImageCard: FC<Props> = ({ imageUrl, data, newImage }) => {
  if (newImage) {
    return (
      <div className="w-fit bg-slate-900 rounded-lg p-5 flex items-center justify-center flex-col gap-3">
        <Image
          src={imageUrl ?? "/logo.png"}
          width={400}
          height={400}
          alt="image"
          className="w-fit rounded-lg"
        />

        <div className="flex gap-3 md:gap-5 items-cener">
          <Button asChild>
            <a href={imageUrl} download>
              <DownloadIcon className="mr-2 w-4 h-4" />
              Download
            </a>
          </Button>

          <Modal imageUrl={imageUrl ?? "/logo.png"} />
        </div>
      </div>
    );
  }

  if (data) {
    const date = formatDate(data.created_at);
    return (
      <div
        key={data.imageUrl}
        className="w-fit bg-gray-300 hover:bg-gray-400 dark:bg-slate-900 dark:hover:bg-[rgb(8,19,47)] rounded-lg p-5 flex justify-center flex-col gap-3 transition-all duration-500 cursor-pointer"
      >
        <Image
          src={data.imageUrl}
          width={300}
          height={400}
          alt="image"
          priority={true}
          className="w-fit rounded-lg mx-auto"
        />

        <div className="flex gap-3 md:gap-5 items-cener mx-auto">
          <Button asChild>
            <a href={data.imageUrl} download>
              <DownloadIcon className="mr-2 w-4 h-4" />
              Download
            </a>
          </Button>

          <Modal date={date} prompt={data.prompt} imageUrl={data.imageUrl} />
        </div>
      </div>
    );
  }
};

export default ImageCard;
