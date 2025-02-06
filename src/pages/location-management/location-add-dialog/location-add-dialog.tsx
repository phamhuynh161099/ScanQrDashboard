import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { generateLocationCode } from "@/utils/utils";
import { Label } from "@/components/ui/label";

interface LocationAddDialogProps {
  open: boolean;
  handleOpenLocationAddDialog: (value: any) => void;
  handleSaveChangeAdd: (value: any) => void;
}

const LocationAddDialog = ({
  open,
  handleSaveChangeAdd,
  handleOpenLocationAddDialog,
}: LocationAddDialogProps) => {
  const handleOnChangeOpen = (value: any) => {
    handleOpenLocationAddDialog(value);
  };

  const [dataAdd, setDataAdd] = useState<any>({
    type: "",
    shelf: "",
    cell: "",
    remark: "",
  });

  /**
   * Function triger when form change
   */
  const handleFormChange = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    setDataAdd({
      ...dataAdd,
      [name]: value,
    });

    setDataAdd((prev: any) => ({
      ...prev,
      location_code: generateLocationCode({
        shelf: prev.shelf,
        cell: prev.cell,
      }),
    }));
  };

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
              {/* Location / Shelf */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="type_location">Type Location</Label>
                  <Select
                    onValueChange={(value: any) =>
                      handleFormChange({ name: "type", value: value })
                    }
                    defaultValue={dataAdd["type"]}
                  >
                    <SelectTrigger id="type_location">
                      <SelectValue placeholder="Select Type Location" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="Table">Table</SelectItem>
                      <SelectItem value="Cabinet">Cabinet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="formShelf">Shelf</Label>
                  <Input
                    id="formShelf"
                    placeholder=""
                    onChange={(e) =>
                      handleFormChange({ name: "shelf", value: e.target.value })
                    }
                    defaultValue={dataAdd["shelf"]}
                  />
                </div>
              </div>

              {/* Cell / Auto Render Location Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="formCell">Cell</Label>
                  <Input
                    id="formCell"
                    placeholder=""
                    onChange={(e) =>
                      handleFormChange({ name: "cell", value: e.target.value })
                    }
                    defaultValue={dataAdd.cell}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Location Code</Label>
                  <Input
                    id="name"
                    placeholder=""
                    disabled
                    className="bg-slate-200 text-red-700 disabled:opacity-100 font-bold"
                    value={dataAdd["location_code"]}
                  />
                </div>
              </div>

              {/* Remark */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Remark</Label>
                <Textarea
                  id="name"
                  placeholder=""
                  onBlur={(e) =>
                    handleFormChange({ name: "remark", value: e.target.value })
                  }
                  defaultValue={dataAdd["remark"]}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className=""
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
