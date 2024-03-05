"use client";

import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import Logo from "./Logo";
import {
  AvatarIcon,
  DashboardIcon,
  LockClosedIcon,
  CardStackIcon,
  ExitIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { handleSignOut } from "@/services/actions/auth";
import { useRouter } from "next/navigation";

const Header = ({
  fullName,
  session,
  credits,
}: {
  fullName: string;
  session: boolean;
  credits?: number;
}) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex mt-5 flex-col gap-5 md:gap-0 md:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-7xl mx-auto">
        <Logo />

        <div className="flex-1 flex items-center justify-end space-x-4">
          {session ? (
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="link" asChild>
                <Link href="/purchase-credit">
                  <CardStackIcon className="mr-1 h-4 w-4" />
                  {credits}
                  <span className="hidden md:inline ml-1">
                    {credits && credits < 2 ? "Credit" : "Credits"} Left
                  </span>
                  <span className="inline md:hidden ml-1">
                    {credits && credits < 2 ? "Credit" : "Credits"}
                  </span>
                </Link>
              </Button>

              <div className="inline md:hidden">
                <Button asChild size="icon">
                  <Link href="/dashboard">
                    <DashboardIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="hidden md:inline">
                <Button asChild>
                  <Link href="/dashboard">
                    <DashboardIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              </div>

              <div className="inline lg:hidden">
                <Button variant="ghost" asChild size="icon">
                  <Link href="/profile">
                    <AvatarIcon className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="hidden md:hidden lg:inline">
                <Button variant="ghost" asChild>
                  <Link href="/profile">
                    <AvatarIcon className="mr-2 h-4 w-4" />
                    {fullName}
                  </Link>
                </Button>
              </div>

              <div className="inline lg:hidden">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    router.refresh();
                    router.push("/");
                  }}
                >
                  <ExitIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="hidden md:hidden lg:inline">
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    router.push("/");
                  }}
                >
                  Sign Out
                </Button>
              </div>

              <ModeToggle />
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Button asChild>
                <Link href="/login">
                  <AvatarIcon className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>

              <Button asChild variant="outline">
                <Link href="/register">
                  <LockClosedIcon className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
              <ModeToggle />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
