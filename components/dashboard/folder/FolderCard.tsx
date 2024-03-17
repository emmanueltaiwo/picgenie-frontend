import { Folder } from "@/typings";
import {
  LockOpen1Icon,
  LockClosedIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteFolderById, updateFolderById } from "@/services/folder";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const FolderCard = ({ folder }: { folder: Folder }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: mutateDeleteFolder } = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const { mutate: mutateEditFolder } = useMutation({
    mutationFn: (formData: FormData) => editFolder(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });

  const deleteFolder = async (folderId: string) => {
    try {
      const response = await deleteFolderById(folderId);

      if (!response) {
        return toast({
          description: "An error occurred",
        });
      }

      return toast({
        description: "Folder Deleted",
      });
    } catch (error: any) {
      throw error;
    }
  };

  const editFolder = async (formData: FormData) => {
    const newFolderName = formData.get("newFolderName")?.toString();
    const newFolderVisibility = formData.get("newFolderVisibility")?.toString();
    const folderId = folder.id;

    if (!newFolderName || !newFolderVisibility) {
      return toast({
        description: "Folder name or visibility is invalid",
      });
    }

    let isPublic: boolean = true;
    if (newFolderVisibility === "private") {
      isPublic = false;
    }

    const response = await updateFolderById(folderId, newFolderName, isPublic);

    return toast({
      description: response,
    });
  };

  return (
    <button
      onDoubleClick={(e) => {
        e.stopPropagation();
        router.push(`/profile/folder/${folder.id}`);
      }}
      key={folder.id}
      className="relative select-none w-full bg-gray-300/50 hover:bg-gray-400/50 dark:bg-slate-600/50 dark:hover:bg-slate-700/50 rounded-lg pb-5 flex justify-center items-center flex-col gap-3 transition-all duration-500 cursor-pointer"
    >
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="absolute left-0 top-0 ml-2 mt-2">
            <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent onDoubleClick={(e) => e.stopPropagation()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              folder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => mutateDeleteFolder(folder.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute right-0 top-0 mr-2 mt-2">
            <Pencil1Icon className="h-5 w-5 hover:text-black" />
          </div>
        </DialogTrigger>
        <DialogContent
          onDoubleClick={(e) => e.stopPropagation()}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Edit folder</DialogTitle>
            <DialogDescription>
              Edit your folder here. You can store images in your folder.
            </DialogDescription>
          </DialogHeader>
          <form
            action={(formData: FormData) => mutateEditFolder(formData)}
            className="grid gap-4 py-4"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="newFolderName"
                placeholder="Nature"
                className="col-span-3"
                defaultValue={folder.folderName}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Visibility
              </Label>
              <div className="col-span-3">
                <Select name="newFolderVisibility">
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
                <SubmitButton text="Edit Folder" />
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Image
        src="/folder.png"
        width={200}
        height={200}
        alt="folder"
        className="w-[100px] h-[100px]"
      />
      <h4 className="text-slate-800 dark:text-slate-200 text-[17px] font-[600]">
        {folder.folderName}
      </h4>
      <span className="text-slate-800 dark:text-slate-400 text-[14px] font-[300]">
        {folder.images.length} Image
      </span>
      {folder.isPublic ? <LockOpen1Icon /> : <LockClosedIcon />}
    </button>
  );
};

export default FolderCard;
