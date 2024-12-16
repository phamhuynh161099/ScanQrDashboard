import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

import darkHsvLogo from "../assets/images/logo-hsvina-dark.png";
import { ModeToggle } from "./mode-toggle";

export function LoginForm() {
  return (
    <Card className="mx-auto w-full md:max-w-sm py-10">
      <CardHeader>
        {/* <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
        <div className="flex justify-center">
          <img src={darkHsvLogo} alt="Your Logo" className="h-[80px]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">User ID</Label>
            <Input
              id="username"
              type="text"
              className="h-12"
              placeholder=""
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" className="h-12" required />
          </div>
          <Button type="submit" className="w-full bg-blue-500">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm flex justify-between">
          <Link to="#" className="underline inline-block">
            Sign up
          </Link>
          <Link to="#" className="inline-block text-sm underline">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-4">
          <ModeToggle />
        </div>
      </CardContent>
    </Card>
  );
}
