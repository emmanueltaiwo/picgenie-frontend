import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

const Logo = () => {
  return (
    <Link href="/" prefetch={false} className="overflow-hidden">
      <div className="flex items-center w-72 h-14">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            width={60}
            height={60}
            alt="Logo"
            className="w-fit h-fit"
          />
        </AspectRatio>
      </div>
    </Link>
  );
};

export default Logo;
