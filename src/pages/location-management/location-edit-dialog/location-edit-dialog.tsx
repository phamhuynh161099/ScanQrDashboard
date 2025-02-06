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
import { Label } from "@/components/ui/label";
import { generateLocationCode } from "@/utils/utils";

interface LocationEditDialogProps {
  open: boolean;
  data: any;
  handleOpenLocationEditDialog: (value: any) => void;
  handleSaveChangeEdit: (value: any) => void;
}

const LocationEditDialog = ({
  open,
  data,
  handleSaveChangeEdit,
  handleOpenLocationEditDialog,
}: LocationEditDialogProps) => {
  const handleOnChangeOpen = (value: any) => {
    handleOpenLocationEditDialog(value);
  };

  const [dataEdit, setDataEdit] = useState<any>(data);

  useEffect(() => {
    setDataEdit(data);
    console.log("data in edit dialog", data, dataEdit);
  }, [data]);

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
    setDataEdit({
      ...dataEdit,
      [name]: value,
    });

    setDataEdit((prev: any) => ({
      ...prev,
      location_code: generateLocationCode({
        shelf: prev.shelf,
        cell: prev.cell,
      }),
    }));
  };

  console.log("rendeer");
  return (
    <>
      <Dialog open={open} onOpenChange={handleOnChangeOpen}>
        <DialogContent
          className="max-w-full max-h-[100vh] rounded-lg md:w-[500px] p-3"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">
              Location Edit
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
                    defaultValue={dataEdit["type"]}
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
                    defaultValue={dataEdit["shelf"]}
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
                    defaultValue={dataEdit.cell}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Location Code</Label>
                  <Input
                    id="name"
                    placeholder=""
                    disabled
                    className="bg-slate-200 text-red-700 disabled:opacity-100 font-bold"
                    value={dataEdit["location_code"]}
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
                  defaultValue={dataEdit["remark"]}
                />
              </div>

            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className=""
              onClick={() => handleSaveChangeEdit(dataEdit)}
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

export default LocationEditDialog;
