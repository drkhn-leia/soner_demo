import Full_W_Carousel from "@/components/full_w_carousel/item";
import InfoCard from "@/components/anasayfa/infoCard";
import ParallaxImage from "@/components/parallax_image/component";
import DoubleCard from "@/components/double_card/component";
import ReferansBand from "@/components/referanslar/component";
import BlogArea from "@/components/blog/component";

export default function Home() {
  return (
    <>
      <div className="flex grow flex-col font-sans overflow-x-hidden">
        <Full_W_Carousel />
        <InfoCard />
        <ParallaxImage />
        <DoubleCard />
        <ReferansBand />
        <BlogArea />
      </div>
    </>
  );
}
