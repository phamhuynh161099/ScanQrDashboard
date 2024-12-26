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

interface MtrlEditDialogProps {
  open: boolean;
  data: any;
  handleOpenMtrlEditDialog: (value: any) => void;
  handleSaveChangeEdit: (value: any) => void;
}

const MtrlEditDialog = ({
  open,
  data,
  handleSaveChangeEdit,
  handleOpenMtrlEditDialog,
}: MtrlEditDialogProps) => {
  const handleOnChangeOpen = (value: any) => {
    handleOpenMtrlEditDialog(value);
  };

  const [dataEdit, setDataEdit] = useState<any>();

  return (
    <>
      <Dialog open={open} onOpenChange={handleOnChangeOpen}>
        <DialogContent
          className="max-w-full max-h-[100vh] rounded-lg md:w-[500px] p-3"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="font-bold text-xl">Mtrl Edit</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="p-1 overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    MTRL Name
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    MTRL Code
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Season
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Type
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Classification
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    EPM Rating
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Composition
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Width
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Weight
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    Price
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col space-y-1.5">
                  <Label
                    className="text-sm font-semibold"
                    htmlFor="type_location"
                  >
                    MTRL Type
                  </Label>
                  <Input
                    id="name"
                    placeholder=""
                    onBlur={(e) =>
                      setDataEdit((prev: any) => ({
                        ...prev,
                        location_code: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label className="text-sm font-semibold" htmlFor="name">
                  Remark
                </Label>
                <Textarea
                  rows={5}
                  id="name"
                  placeholder=""
                  onBlur={(e) =>
                    setDataEdit((prev: any) => ({
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

export default MtrlEditDialog;
