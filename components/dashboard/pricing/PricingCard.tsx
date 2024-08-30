"use client";

import { useState } from "react";
import { API_BASE_URL, PRICING, STRIPE_PUBLISHABLE_KEY } from "@/constants";
import { Button } from "../../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const PricingCard = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setItem } = useLocalStorage("credits-bought");

  const makePayment = async (id: string) => {
    try {
      setIsLoading(true);
      if (!STRIPE_PUBLISHABLE_KEY) {
        console.log("STRIPE_PUBLISHABLE_KEY NOT FOUND")
        return;
      }

      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

      const plan = PRICING.find((plan) => plan.id === id);

      const response = await axios.post(
        `${API_BASE_URL}/api/create-checkout-session`,
        {
          name: plan?.name,
          price: plan?.price,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;
      setItem(data.creditsBought);

      const result = await stripe?.redirectToCheckout({
        sessionId: data.id,
      });

      if (result?.error) {
        throw new Error();
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      throw new Error();
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto grid grid-cols-1 gap-8 lg:w-[90%] xl:w-[80%] w-[90%] lg:grid-cols-3">
        {PRICING.map((tier) => (
          <div
            key={tier.id}
            style={{
              backgroundColor: tier.bg,
            }}
            className="flex flex-col text-center justify-between rounded-3xl p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
          >
            <Image
              src="/logo.png"
              width={100}
              height={60}
              alt="Logo"
              className="w-fit h-fit mx-auto"
            />

            <h3 className="mt-5 text-[35px] font-[800] leading-7 text-indigo-600">
              {tier.name}
            </h3>

            <p className="mt-6 text-[15px] leading-7 text-gray-800">
              {tier.description}
            </p>

            {isLoading ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={() => makePayment(tier.id)} className="mt-5">
                Buy for ${tier.price}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
