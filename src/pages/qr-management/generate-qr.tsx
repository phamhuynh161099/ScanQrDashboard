import authApi from "@/apis/auth.api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

const GenerateQrPage = () => {
  const [valQr, setValQr] = useState("https://example.com");
  const [infor, setInform] = useState({
    val_po: "",
    l_or_r: "",
    val_floor: "",
  });
  const qrRef: any = useRef();

  const handleGenerateQr = () => {
    setValQr(JSON.stringify(infor));
    console.log(">", infor, valQr);
  };

  const downloadQRCode = () => {
    console.log("qrRef", qrRef.current);
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.png";
    link.click();
  };


  useEffect(() => {
    try {
      const fetchMe = async () => {
        return await authApi.me();
      }

      const response = fetchMe();
      console.log('response',response)

    } catch (error) {
      
    } finally {

    }
  })
  

  return (
    <>
      <div className="h-[calc(100%)] w-[calc(100%)] bg-red-50 rounded-sm shadow-sm">
        <div className="w-[100%] md:w-[50vw] bg-red-200">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Make QR Code</CardTitle>
              <CardDescription>Input Information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="val_po">Po</Label>
                    <Input
                      id="val_po"
                      placeholder="Input Po"
                      onBlur={(e) =>
                        setInform((prev) => ({
                          ...prev,
                          val_po: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="l_or_r">Left or Right</Label>
                    <Select
                      onValueChange={(value) =>
                        setInform((prev) => ({ ...prev, l_or_r: value }))
                      }
                    >
                      <SelectTrigger id="l_or_r">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="Right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="val_floor">Floor</Label>
                    <Input
                      id="val_floor"
                      placeholder="Input Floor"
                      onBlur={(e) =>
                        setInform((prev) => ({
                          ...prev,
                          val_floor: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" onClick={handleGenerateQr}>
                Generate
              </Button>

              {/* <Button variant="outline" onClick={downloadQRCode}>
                Download
              </Button> */}
            </CardFooter>
          </Card>

          <div className="bg-gray-50 shadow-sm p-4 rounded-sm flex flex-col items-center">
            <h1>QR Code Generator</h1>
            <QRCode
              ref={qrRef}
              value={valQr}
              size={256} // Kích thước (tùy chọn)
              bgColor="#ffffff" // Màu nền (tùy chọn)
              fgColor="#000000" // Màu QR code (tùy chọn)
            />
          </div>
        </div>

        <div className="bg-red-100 h-[500px] w-[100%]">
          <div className="w-full overflow-x-auto">
            <table className="w-[2000px] h-[100px] bg-blue-100">

            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenerateQrPage;
