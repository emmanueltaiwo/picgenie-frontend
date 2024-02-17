import HeroSection from "@/components/HeroSection";
import { getUserProfile } from "@/services/profile";

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

export default async function Home() {
  const response = await verifySession();

  const { session } = response;

  return (
    <main>
      <HeroSection session={session} />
    </main>
  );
}
