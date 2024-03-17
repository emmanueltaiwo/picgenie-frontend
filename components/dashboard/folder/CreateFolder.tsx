"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import SubmitButton from "@/app/(auth)/submit-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createNewFolder } from "@/services/folder";
import { useToast } from "../../ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateFolder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: mutateCreateFolder } = useMutation({
    mutationFn: (formData: FormData) => createFolder(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const createFolder = async (formData: FormData) => {
    const folderName = formData.get("folderName")?.toString();
    const visibility = formData.get("visibility")?.toString();

    if (!folderName || !visibility) {
      return toast({
        description: "Input fields is invalid",
      });
    }

    let isPublic: boolean = true;
    if (visibility === "private") {
      isPublic = false;
    }

    const response = await createNewFolder(folderName, isPublic);

    if (typeof response === "string") {
      return toast({
        description: response,
      });
    }

    return toast({
      description: response.message,
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-1">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <CreateNewFolderRoundedIcon className="mr-2" />
            Create Folder
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create folder</DialogTitle>
            <DialogDescription>
              Create a new folder here. You can store images in your folder.
            </DialogDescription>
          </DialogHeader>
          <form action={mutateCreateFolder} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="folderName"
                placeholder="Nature"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Visibility
              </Label>
              <div className="col-span-3">
                <Select name="visibility">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Visibility</SelectLabel>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <SubmitButton text="Create Folder" />
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Button variant="link">Double click to view a folder</Button>
    </div>
  );
};

export default CreateFolder;
