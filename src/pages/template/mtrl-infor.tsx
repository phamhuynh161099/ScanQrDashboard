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

import { useState } from "react";

const MtrlInforPage = () => {
  return (
    <>
      <div className="min-h-[100%] w-full p-2">
        <div className="w-full rounded-xl shadow-xl border-2 p-2">
          <div className="flex justify-end">
            <Button>
              <ScanQrCode />
              Scan MTRL
            </Button>
          </div>
        </div>

        <div className="mt-2">
          <Card className="">
            <CardHeader className="p-4">
              <CardTitle className="flex justify-between items-center">
                <p>MTRL Infor</p>
              </CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 p-4">
              <div className="space-y-1">
                <Label htmlFor="code">MTRL code</Label>
                <Input id="code" disabled/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">MTRL Name</Label>
                <Input id="name" defaultValue="" disabled/>
              </div>

              <div className="space-y-1">
                <Label htmlFor="name">Location</Label>
                <Input id="name" defaultValue="" disabled/>
              </div>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>


      </div>
    </>
  );
};

export default MtrlInforPage;
