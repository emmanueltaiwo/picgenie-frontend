import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import { getUserProfile } from "@/services/profile";
import { Analytics } from "@vercel/analytics/react";
import StoreProvider from "./store-provider";
import Provider from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PicGenie",
  description: "Generate images with AI instantly",
};

const verifySession = async () => {
  try {
    const response = await getUserProfile();

    if ("message" in response) {
      return { credits: 0, session: false };
    }

    return {
      fullName: response.fullName,
      credits: response.creditsLeft,
      session: true,
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await verifySession();

  const { session, credits, fullName } = response;

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header
                fullName={fullName ?? "Profile"}
                credits={credits}
                session={session}
              />
              {children}
              <Toaster />
            </ThemeProvider>
          </Provider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
