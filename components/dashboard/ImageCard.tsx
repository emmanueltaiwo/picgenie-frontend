"use client";

import { FC } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DownloadIcon,
  EyeOpenIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Folder, ImageGenerated } from "@/typings";
import { formatDate } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllFolders,
  moveImageToFolder,
  removeImageFromFolder,
} from "@/services/folder";
import { useToast } from "../ui/use-toast";
import { deleteImage } from "@/services/profile";

type Props = {
  imageUrl?: string;
  data?: ImageGenerated;
  newImage: boolean;
  isFolderPage?: boolean;
  folderId?: string;
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

          <div className="w-full md:w-[450px] min-h-[400px]">
            <Image
              src={imageUrl}
              width={450}
              height={400}
              alt="image"
              className="w-fit rounded-lg mx-auto"
            />
          </div>

          {date && <AlertDialogDescription>{date}</AlertDialogDescription>}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ImageCard: FC<Props> = ({
  imageUrl,
  data,
  newImage,
  isFolderPage,
  folderId,
}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const {
    data: folders,
    isLoading,
    isError,
  } = useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: async () => await fetchAllFolders(),
  });

  const { mutate: mutateMoveImage } = useMutation({
    mutationFn: async ({
      folderId,
      imageId,
    }: {
      folderId: string;
      imageId: string;
    }) => {
      await moveImageToFolder(folderId, imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const { mutate: mutateRemoveImageFromFolder } = useMutation({
    mutationFn: async ({
      folderId,
      imageId,
    }: {
      folderId: string;
      imageId: string;
    }) => {
      await removeImageFromFolder(folderId, imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const { mutate: mutateDeleteImage } = useMutation({
    mutationFn: async (imageId: string) => {
      await deleteImage(imageId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["generated-images", "folders"],
      });
    },
  });

  if (isError) return <p>An error occurred</p>;

  if (!data) return;

  if (newImage) {
    return (
      <div className="w-fit bg-slate-900 rounded-lg p-5 flex items-center justify-center flex-col gap-3">
        <div className="w-full md:w-[400px] min-h-[400px]">
          <Image
            src={imageUrl ?? "/logo.png"}
            width={400}
            height={400}
            alt="image"
            className="w-fit rounded-lg"
          />
        </div>

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
      <div className="w-full bg-gray-300 hover:bg-gray-400 dark:bg-slate-900 dark:hover:bg-[rgb(8,19,47)] rounded-lg p-5 flex justify-center flex-col gap-3 transition-all duration-500 cursor-pointer">
        <div className="w-full min-h-[300px]">
          <Image
            src={data.imageUrl}
            width={300}
            height={400}
            alt="image"
            priority={true}
            className="w-full rounded-lg mx-auto"
          />
        </div>

        <div className="flex gap-3 md:gap-5 items-cener mx-auto">
          <Button asChild>
            <a href={data.imageUrl} download>
              <DownloadIcon className="mr-2 w-4 h-4" />
              Download
            </a>
          </Button>

          <Modal date={date} prompt={data.prompt} imageUrl={data.imageUrl} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <DotsVerticalIcon className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10rem]">
              <DropdownMenuLabel>Your Image</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={async () => {
                    mutateDeleteImage(data.id);

                    toast({
                      description: "Image deleted successfully",
                    });
                  }}
                  className="bg-red-600"
                >
                  Delete Image
                </DropdownMenuItem>
                {isFolderPage && (
                  <DropdownMenuItem
                    onClick={() => {
                      mutateRemoveImageFromFolder({
                        folderId: folderId!,
                        imageId: data.id,
                      });

                      toast({
                        description: "Image removed successfully",
                      });
                    }}
                  >
                    Remove from folder
                  </DropdownMenuItem>
                )}
                {!isFolderPage && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Move image</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        {isLoading && (
                          <DropdownMenuItem>Loading</DropdownMenuItem>
                        )}

                        {folders?.map((folder) => (
                          <div key={folder.id}>
                            <DropdownMenuItem
                              onClick={() => {
                                mutateMoveImage({
                                  folderId: folder.id,
                                  imageId: data.id,
                                });

                                toast({
                                  description: "Image moved successfully",
                                });
                              }}
                            >
                              {folder.folderName}
                            </DropdownMenuItem>
                          </div>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <h2 className="my-1 font-[300] text-[13px] text-left">
          Prompt: {data.prompt}
        </h2>

        <h2 className="my-1 font-[300] text-[13px] text-left">
          Created At: {date}
        </h2>
      </div>
    );
  }
};

export default ImageCard;
