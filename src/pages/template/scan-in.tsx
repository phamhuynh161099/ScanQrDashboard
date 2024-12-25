import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScanQrCode, Trash2 } from "lucide-react";

import { useState } from "react";
import ScanQrDialog from "./components/scan-qr-dialog";

const ScanInPage = () => {

  const [openScanQrDialog,setOpenScanQrDialog] = useState(true);
  const haldleOpenScanQrDialog = (value:any) => {
    setOpenScanQrDialog(value)
  }

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        {/* filter */}
        <div className="w-full rounded-xl shadow-xl border-2 p-2">
          <div className="grid w-full gap-2">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col space-y-1 basis-[45%]">
                <Label className="text-sm" htmlFor="type_location">
                  Type Location
                </Label>
                <Select>
                  <SelectTrigger id="type_location">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="board_001">Board 001</SelectItem>
                    <SelectItem value="board_002">Board 002</SelectItem>
                    <SelectItem value="cabinet_001">Cabinet 001</SelectItem>
                    <SelectItem value="cabinet_002">Cabinet 002</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1 basis-[55%]">
                <Label className="text-sm" htmlFor="val_po">
                  Code
                </Label>
                <Input id="" placeholder="" />
              </div>
            </div>

            {/* <div className="flex flex-col space-y1">
              <Label className="text-sm" htmlFor="mtrl_code">
                MTRL Code
              </Label>
              <Input id="mtrl_code" placeholder="" />
            </div> */}
          </div>
        </div>
        {/* filter */}

        {/* MTRL List */}
        <div className="mt-4 w-full rounded-xl shadow-xl border-2 px-3 py-2 space-y-2">
          <div className="flex justify-between items-center">
            <p className="font-bold text-sm">MTRL List</p>
            <div className="flex items-center gap-1 bg-blue-400 py-1 px-2 rounded-sm">
              <p className="font-bold text-sm" onClick={haldleOpenScanQrDialog}>ADD / SCAN IN</p>
              <ScanQrCode />
            </div>
          </div>

          <div className="w-full min-h-[100px] bg-green-400 rounded-xl shadow-xl relative p-2">
            <div className="absolute top-0 right-0 bg-black w-8 h-8 flex items-center justify-center rounded-lg">
              <Trash2 className="w-5 text-white" />
            </div>

            <div className="w-full rounded overflow-hidden shadow-lg">
              <img
                className="w-full h-16 bg-white"
                src="https://placehold.co/600x400"
                alt="Placeholder Image"
              />
              <div className="p-2">
                <div className="text-xl mb-1">
                  Code: <span className="font-bold">202512000-001</span>
                </div>
                <p className="text-gray-700 text-base line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus ac pretium diam.
                </p>
              </div>
              <div className="p-2 pb-2">
                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[100px] bg-green-400 rounded-xl shadow-xl relative p-2">
            <div className="absolute top-0 right-0 bg-black w-8 h-8 flex items-center justify-center rounded-lg">
              <Trash2 className="w-5 text-white" />
            </div>

            <div className="w-full rounded overflow-hidden shadow-lg">
              <img
                className="w-full h-16 bg-white"
                src="https://placehold.co/600x400"
                alt="Placeholder Image"
              />
              <div className="p-2">
                <div className="text-xl mb-1">
                  Code: <span className="font-bold">202512000-002</span>
                </div>
                <p className="text-gray-700 text-base line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus ac pretium diam.
                </p>
              </div>
              <div className="p-2 pb-2">
                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Available
                </span>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[100px] bg-gray-400 rounded-xl shadow-xl relative p-2">
            <div className="absolute top-0 right-0 bg-black w-8 h-8 flex items-center justify-center rounded-lg">
              <Trash2 className="w-5 text-white" />
            </div>

            <div className="w-full rounded overflow-hidden shadow-lg">
              <img
                className="w-full h-16 bg-white"
                src="https://placehold.co/600x400"
                alt="Placeholder Image"
              />
              <div className="p-2">
                <div className="text-xl mb-1">
                  Code: <span className="font-bold">202512000-003</span>
                </div>
                <p className="text-gray-700 text-base line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus ac pretium diam.
                </p>
              </div>
              <div className="p-2 pb-2">
                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Borrow
                </span>

                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Nguyễn Văn A
                </span>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[100px] bg-gray-400 rounded-xl shadow-xl relative p-2">
            <div className="absolute top-0 right-0 bg-black w-8 h-8 flex items-center justify-center rounded-lg">
              <Trash2 className="w-5 text-white" />
            </div>

            <div className="w-full rounded overflow-hidden shadow-lg">
              <img
                className="w-full h-16 bg-white"
                src="https://placehold.co/600x400"
                alt="Placeholder Image"
              />
              <div className="p-2">
                <div className="text-xl mb-1">
                  Code: <span className="font-bold">202512000-004</span>
                </div>
                <p className="text-gray-700 text-base line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus ac pretium diam.
                </p>
              </div>
              <div className="p-2 pb-2">
                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Borrow
                </span>

                <span className="inline-block bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Nguyễn Văn B
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* MTRL List */}
      </div>

      <ScanQrDialog open={openScanQrDialog} haldleOpenScanQrDialog={haldleOpenScanQrDialog}/>
    </>
  );
};

export default ScanInPage;
