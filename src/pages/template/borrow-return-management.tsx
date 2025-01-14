import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownFromLine, ArrowUpFromLine, ScanQrCode } from "lucide-react";
import { useState } from "react";
import BorrowReturnScanQrDialog from "./components/borrow-scan-qr-dialog";
import ScanQrDialog from "./components/scan-qr-dialog";

const BorrowReturnManagementPage = () => {
  const [tabValue, setTabValue] = useState<any>("borrow_process");
  const [openBorrowScanQrDialog, setOpenBorrowScanQrDialog] = useState(false);
  const haldleOpenBorrowScanQrDialog = (value: any) => {
    setOpenBorrowScanQrDialog(value);
  };

  /**
   * Muon tam hàm, Nhớ phải xóa
   */
  //*********************************** */
  const [openScanQrDialog, setOpenScanQrDialog] = useState(false);
  const haldleOpenScanQrDialog = (value: any) => {
    setOpenScanQrDialog(value);
  };
  const [mtrl, setMtrl] = useState<any>();

  const submitTakeNewMtrl2Location = (mtrl: any) => {
    setMtrl(mtrl);
  };
  //********************************** */

  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        {/*Scan Borrow Return */}
        <div className="w-full rounded-xl shadow-xl border-2 p-2">
          <Tabs
            value={tabValue}
            onValueChange={(value) => setTabValue(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="borrow_process">Borrow Process</TabsTrigger>
              <TabsTrigger value="return_process">Return Process</TabsTrigger>
            </TabsList>

            <TabsContent value="borrow_process">
              {/* Mtrl Infor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p>MTRL Infor</p>
                    <Button
                      className="flex gap-1"
                      onClick={() => {
                        console.log(">>>Open Pop-up");
                        setOpenScanQrDialog(true); // se phai xóa
                        // setOpenBorrowScanQrDialog(true);
                      }}
                    >
                      <ScanQrCode />
                      Scan MTRL
                    </Button>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="space-y-1">
                    <Label htmlFor="code">Code</Label>
                    <Input id="code" defaultValue="" disabled />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="" disabled />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              {/* Mtrl Infor */}

              {/* Mtrl Infor */}
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p>Borrower Infor</p>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  <div className="space-y-1">
                    <Label htmlFor="code">User Id</Label>
                    <Input id="code" defaultValue="" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="" />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="name">ETC Return</Label>
                    <Input type="date" id="name" defaultValue="" />
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              {/* Mtrl Infor */}

              <div className="mt-2 flex justify-center">
                <Button>
                  <ArrowDownFromLine />
                  Accept Borrow
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="return_process">
              {/* Mtrl Infor */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p>MTRL Infor</p>
                    <Button
                      className="flex gap-1"
                      onClick={() => {
                        console.log(">>>Open Pop-up");

                        setOpenScanQrDialog(true); // se phai xóa
                        // setOpenBorrowScanQrDialog(true);
                      }}
                    >
                      <ScanQrCode />
                      Scan MTRL
                    </Button>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {mtrl && (
                    <>
                      <div className="space-y-1">
                        <Label htmlFor="code">Code</Label>
                        <Input id="code" value={mtrl["mtrl_code"]} disabled />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={mtrl["name"]} disabled />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              {/* Mtrl Infor */}

              {/* Mtrl Infor */}
              <Card className="mt-2">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <p>Borrower Infor</p>
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {mtrl && (
                    <>
                      <div className="space-y-1">
                        <Label htmlFor="code">User Id</Label>
                        <Input id="code" defaultValue="" disabled />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={mtrl["user_borrow"]} disabled />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="name">Date Borrow</Label>
                        <Input
                          type="date"
                          id="date_borrow"
                          value={mtrl["borrow_date"]}
                          disabled
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="name">ETC Return</Label>
                        <Input
                          type="date"
                          id="etc_return"
                          value={mtrl["etc_return"]}
                          disabled
                        />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
              {/* Mtrl Infor */}

              <div className="mt-2 flex justify-center">
                <Button>
                  <ArrowUpFromLine />
                  Accept Return
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/*Scan Borrow Return */}
      </div>

      {/* {openBorrowScanQrDialog && (
        <BorrowReturnScanQrDialog
          open={openBorrowScanQrDialog}
          haldleOpenBorrowScanQrDialog={
            haldleOpenBorrowScanQrDialog
          }
        />
      )} */}

      {/* se xoa, nho phai xoa */}
      {openScanQrDialog && (
        <ScanQrDialog
          parentPage="borrowReturnManagement"
          open={openScanQrDialog}
          submitTakeNewMtrl2Location={submitTakeNewMtrl2Location}
          haldleOpenScanQrDialog={haldleOpenScanQrDialog}
        />
      )}
    </>
  );
};

export default BorrowReturnManagementPage;
