"use server";

import PricingCard from "@/components/dashboard/PricingCard";
import React from "react";
import { cookies } from "next/headers";

const PurchaseCredit = async () => {
  const token = cookies().get("token");

  return (
    <div className="isolate overflow-hidden ">
      <div className="mx-auto max-w-8xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">
            Purchase Credits
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            The right price for you,{" "}
            <br className="hidden sm:inline lg:hidden" />
            whoever you are
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg leading-8">
            Every new image you create in picgenie deducts one credit from your
            account balance
          </p>
        </div>
      </div>

      <div className="w-full flow-root pb-24 sm:pb-32">
        <div className="-mt-80 w-full">
          <PricingCard token={token?.value ?? ""} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseCredit;
