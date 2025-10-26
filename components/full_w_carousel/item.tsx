"use client";
import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

type CarouselItem = {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  docs?: string;
};

const DATA_URL = "/items.json";

export default function Full_W_Carousel() {
  const [opacities, setOpacities] = React.useState<number[]>([]);
  const [images, setImages] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
        const json: { images: CarouselItem[] } = await res.json();
        if (!cancelled) {
          setImages((json.images || []).map((i) => i.imageUrl));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load images");
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: images.length,
      loop: true,
      detailsChanged(s) {
        if (!s.track || !s.track.details) return;
        const new_opacities = s.track.details.slides.map((slide) => slide.portion);
        setOpacities(new_opacities);
      },
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
          }, 5000);
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

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="text-gray-500">Loading images…</div>;
  }

  return (
    <div className="max-w-screen">
      <div ref={sliderRef} className="keen-slider max-h-96">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="keen-slider__slide"
            style={{ opacity: opacities[idx] ?? 1 }}
          >
            <Image
              className="object-cover"
              width={1920}
              height={1024}
              alt="image"
              src={src}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
