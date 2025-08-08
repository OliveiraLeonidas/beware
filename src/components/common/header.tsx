"use client";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Header = () => {
  const { data: session, error, isPending, refetch } = authClient.useSession();

  const getFirstAndLastName = (name: string | undefined) => {
    if (!name) return "";

    const formattedName = name.split(" ");
    return `${formattedName[0]} ${formattedName[formattedName.length - 1]}`;
  };

  return (
    <header className="flex items-center justify-between p-4">
      <Link href="/">
        <Image width={80} height={60} src={"/logo.svg"} alt="Logo BEWARE" />
      </Link>
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild className="cursor-pointer">
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex items-center justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user.image as string | undefined}
                          alt="user avatar"
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {getFirstAndLastName(session?.user?.name)}
                        </h3>
                        <span className="text-xs">{session?.user?.email}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => authClient.signOut()}
                    >
                      {" "}
                      <LogOutIcon />{" "}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h2 className="text-md font-semibold">
                    Olá. Faça seu login!
                  </h2>
                  <Button size="icon" asChild variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
