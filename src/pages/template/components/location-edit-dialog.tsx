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

interface LocationEditDialogProps {
  open: boolean;
  data: any;
  handleOpenLocationEditDialog: (value: any) => void;
  handleSaveChangeEdit : (value:any) => void;
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="type_location">Type Location</Label>
                <Select
                  onValueChange={(value: any) =>
                    setDataEdit((prev: any) => ({
                      ...prev,
                      type_location: value,
                    }))
                  }
                  defaultValue={dataEdit["type_location"]}
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
                    setDataEdit((prev: any) => ({
                      ...prev,
                      location_code: e.target.value,
                    }))
                  }
                  defaultValue={dataEdit["location_code"]}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Remark</Label>
                <Textarea
                  id="name"
                  placeholder=""
                  onBlur={(e) =>
                    setDataEdit((prev: any) => ({
                      ...prev,
                      remark: e.target.value,
                    }))
                  }
                  defaultValue={dataEdit["remark"]}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-sky-400 text-black"
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
