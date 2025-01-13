import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ScanQrCode } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import MtrlInforScanQrDialog from "./components/mtrl-infor-scan-qr";
import ScanQrDialog from "./components/scan-qr-dialog";

const MtrlInforPage = () => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [mtrlInfor, setMtrlInfor] = useState<any>({});
  const [openMtrlInforScanQrDialog, setOpenMtrlInforScanQrDialog] =
    useState(false);
  const haldleOpenMtrlInforScanQrDialog = (value: any) => {
    setOpenMtrlInforScanQrDialog(value);
  };

  /**
   * Muon tam hàm, Nhớ phải xóa
   */
  //*********************************** */
  const [openScanQrDialog, setOpenScanQrDialog] = useState(false);
  const haldleOpenScanQrDialog = (value: any) => {
    setOpenScanQrDialog(value);
  };
  const [mtrl, setMtrl] = useState<any>({
    mtrl_code: "24681357-001",
    name: "Vải F",
    isUsing: false,
    location: "",
    borrowed: false,
    user_borrow: "",
  });

  const submitTakeNewMtrl2Location = (mtrl: any) => {
    setMtrl(mtrl);
  };
  //********************************** */

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full rounded-xl shadow-xl border-2 p-2">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setOpenScanQrDialog(true); // phai xoa
                setOpenMtrlInforScanQrDialog(true);
              }}
            >
              <ScanQrCode />
              Scan MTRL
            </Button>
          </div>
        </div>

        {mtrl && (
          <>
            <div className="mt-2">
              <Card className="shadow-xl p-4">
                <CardHeader className="p-0">
                  <CardTitle className="flex justify-between items-center">
                    <p className="text-[16px] font-bold">Status</p>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>

                <CardContent className="mt-1 space-y-1 p-0">
                  <div className="">
                    {/* <Skeleton className="rounded-full w-[100px] h-[30px]"></Skeleton> */}

                    {mtrl.isUsing && (
                      <Badge className="rounded-full py-1 bg-green-500 font-bold text-sm">
                        Is Using | Board - AA-01
                      </Badge>
                    )}

                    {!mtrl.isUsing && (
                      <Badge className="rounded-full py-1 bg-gray-500 font-bold text-sm">
                        Not Use
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2">
                    {mtrl.borrowed && (
                      <Badge className="rounded-full py-1 bg-gray-500 font-bold text-sm">
                        Borrow | Pham Huynh
                      </Badge>
                    )}

                    {!mtrl.borrowed && (
                      <Badge className="rounded-full py-1 bg-green-500 font-bold text-sm">
                        Available
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* MTRL Infor */}
              <Card className="mt-2">
                <CardHeader className="p-4">
                  <CardTitle className="flex justify-between items-center">
                    <p className="text-[16px] font-bold">MTRL Infor</p>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-1 p-4 pt-0">
                  <div className="space-y-1">
                    <Label
                      className="text-sm font-semibold"
                      htmlFor="mtrl_code"
                    >
                      MTRL code
                    </Label>
                    <Input
                      id="mtrl_code"
                      // value={mtrlInfor["mtrl_code"]}
                      value={mtrl["mtrl_code"]}
                      disabled
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-semibold" htmlFor="name">
                      MTRL Name
                    </Label>
                    <Input
                      id="name"
                      // value={mtrlInfor["name"]}
                      value={mtrl["name"]}
                      disabled
                    />
                  </div>
                  {viewMore && (
                    <>
                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Supplier
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Season
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Type
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          EPM Rating
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Composition
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Width
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Weight
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          Price
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-semibold" htmlFor="name">
                          MTRL Type
                        </Label>
                        <Input id="name" defaultValue="" disabled />
                      </div>
                    </>
                  )}

                  <div className="space-y-1 flex justify-center">
                    <Button
                      className="min-w-32 bg-sky-400 focus:bg-sky-500"
                      onClick={() => setViewMore((prev) => !prev)}
                    >
                      {viewMore ? "Hide" : "View More"}
                    </Button>
                  </div>
                </CardContent>
                {/* <CardFooter></CardFooter> */}
              </Card>
              {/* MTRL Infor */}

              {/* MTRL Image */}
              <div className="mt-2 w-full rounded-xl shadow-xl border-2 p-2">
                <p className="text-[16px] font-bold px-2">MTRL Image</p>
                <div className="w-full flex justify-center">
                  <Carousel className="w-full max-w-xs md:max-w-xl">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex items-center justify-center p-6">
                                <img
                                  className="w-full max-h-[300px] object-cover"
                                  src="https://placehold.co/700x1000"
                                  alt="image description"
                                />
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-0 -translate-x-1/2" />
                    <CarouselNext className="right-0 translate-x-1/2" />
                  </Carousel>
                </div>
              </div>
              {/* MTRL Image */}
            </div>
          </>
        )}
      </div>

      {/* {openMtrlInforScanQrDialog && (
        <MtrlInforScanQrDialog
          open={openMtrlInforScanQrDialog}
          haldleOpenMtrlInforScanQrDialog={haldleOpenMtrlInforScanQrDialog}
        />
      )} */}

      {/* se xoa, nho phai xoa */}
      {openScanQrDialog && (
        <ScanQrDialog
        parentPage="mtrlInfor"
          open={openScanQrDialog}
          submitTakeNewMtrl2Location={submitTakeNewMtrl2Location}
          haldleOpenScanQrDialog={haldleOpenScanQrDialog}
        />
      )}
    </>
  );
};

export default MtrlInforPage;
