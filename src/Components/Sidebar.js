import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-[90px] min-h-screen flex flex-col items-center pb-3 gap-1  sticky top-0   rounded-tr-2xl rounded-br-2xl">
      <div>
        <Image
          src="/logo_marshee_transparent.png"
          width={96}
          height={70}
          alt="home"
        />
      </div>

      <div className=" cursor-pointer bg-white ">
        <Link href="/">
          <div className=" bg-[#adc3ff]  w-[96px] h-[96px] mb-0.5 flex flex-col justify-center items-center hover:bg-[#95abde] transition-all duration-200   rounded-tl-3xl  rounded-tr-3xl">
            <Image src="/home-button1.svg" width={60} height={60} alt="home" />
            <span className="text-[10px] text-black">home</span>
          </div>
        </Link>

        <Link href="/community">
          <div className="w-[96px] h-[96px] bg-[#adc3ff] mb-0.5 flex flex-col justify-center items-center hover:bg-[#95abde] transition-all duration-200">
            <Image
              src="/community.svg"
              width={50}
              height={50}
              alt="community"
            />
            <span className="text-[10px] text-black">community</span>
          </div>
        </Link>

        {/* Store */}
        <Link href="/marketplace">
          <div className="w-[96px] h-[96px] bg-[#adc3ff] mb-0.5 flex flex-col justify-center items-center hover:bg-[#95abde] transition-all duration-200">
            <Image
              src="/marketplace.svg"
              width={50}
              height={50}
              alt="marketplace"
            />
            <span className="text-[10px] text-black">store</span>
          </div>
        </Link>

        {/* Petcare */}
        <Link href="/services">
          <div className="w-[96px] h-[96px] bg-[#adc3ff] mb-0.5 flex flex-col justify-center items-center hover:bg-[#95abde] transition-all duration-200">
            <Image src="/services.svg" width={50} height={50} alt="petcare" />
            <span className="text-[10px] text-black">petcare</span>
          </div>
        </Link>

        {/* My Pets */}
        <Link href="/mypets">
          <div className="w-[96px] h-[96px] bg-[#adc3ff] flex flex-col justify-center items-center hover:bg-[#95abde] transition-all duration-200 rounded-bl-3xl rounded-br-3xl">
            <Image src="/mypets.svg" width={50} height={50} alt="mypets" />
            <span className="text-[10px] text-black">mypets</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
