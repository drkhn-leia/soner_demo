"use client";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function ReferansBand() {
  const [ref] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 2, spacing: 5 },
        },
        "(min-width: 1000px)": {
          slides: { perView: 3, spacing: 10 },
        },
      },
      slides: { perView: 1 },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 1000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div className="bg-gray-200 py-10">
      <div className="w-full flex text-center justify-center font-semibold text-4xl mb-5">
        REFERANSLAR
      </div>
      <div ref={ref} className="keen-slider ">
        <Image
          src={"/referanslar_1.jpg"}
          alt="ref1"
          width={600}
          height={400}
          className="keen-slider__slide"
        />
        <Image
          src={"/referanslar_2.jpg"}
          alt="ref1"
          width={600}
          height={400}
          className="keen-slider__slide"
        />
        <Image
          src={"/referanslar_3.jpg"}
          alt="ref1"
          width={600}
          height={400}
          className="keen-slider__slide"
        />
        <Image
          src={"/referanslar_4.jpg"}
          alt="ref1"
          width={600}
          height={400}
          className="keen-slider__slide"
        />
      </div>
      <div className="w-full flex justify-center items-center mt-5">
        <a href="#" className="bg-amber-400 py-2 px-4 rounded-full">Devamı <b>&gt;</b></a>
      </div>
    </div>
  );
}
