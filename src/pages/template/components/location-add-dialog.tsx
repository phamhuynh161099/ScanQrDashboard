import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface LocationAddDialogProps {
  open: boolean;
  handleOpenLocationAddDialog: (value: any) => void;
  handleSaveChangeAdd : (value:any) => void;
}

const LocationAddDialog = ({
  open,
  handleSaveChangeAdd,
  handleOpenLocationAddDialog,
}: LocationAddDialogProps) => {
  const handleOnChangeOpen = (value: any) => {
    handleOpenLocationAddDialog(value);
  };

  const [dataAdd, setDataAdd] = useState<any>();


  return (
    <>
      <Dialog open={open} onOpenChange={handleOnChangeOpen}>
        <DialogContent
          className="max-w-full max-h-[100vh] rounded-lg md:w-[500px] p-3"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">
              Location Add
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="p-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type_location">Type Location</Label>
                <Select
                  onValueChange={(value: any) =>
                    setDataAdd((prev: any) => ({
                      ...prev,
                      type_location: value,
                    }))
                  }
                >
                  <SelectTrigger id="type_location">
                    <SelectValue placeholder="Select Type Location" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="board_001">Board 001</SelectItem>
                    <SelectItem value="board_002">Board 002</SelectItem>
                    <SelectItem value="cabinet_001">Cabinet 001</SelectItem>
                    <SelectItem value="cabinet_002">Cabinet 002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Location Code</Label>
                <Input
                  id="name"
                  placeholder=""
                  onBlur={(e) =>
                    setDataAdd((prev: any) => ({
                      ...prev,
                      location_code: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Remark</Label>
                <Textarea
                  id="name"
                  placeholder=""
                  onBlur={(e) =>
                    setDataAdd((prev: any) => ({
                      ...prev,
                      remark: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-sky-400 text-black"
              onClick={() => handleSaveChangeAdd(dataAdd)}
            >
              <Save />
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationAddDialog;
