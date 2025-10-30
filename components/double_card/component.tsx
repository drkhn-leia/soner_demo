import Image from "next/image";
import Card1 from "./card1";
import Card2 from "./card2";

export default function DoubleCard() {
  return (
    <div className="w-full h-auto gap-8 lg:gap-0 lg:h-[60vh] relative my-20 flex flex-col justify-center items-center">
      <Card1 />
      <Card2 />
    </div>
  );
}
