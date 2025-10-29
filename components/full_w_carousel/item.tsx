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
  const [images, setImages] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [created, setCreated] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
        const json: { images: CarouselItem[] } = await res.json();
        if (!cancelled) setImages((json.images || []).map((i) => i.imageUrl));
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load images");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keen Slider + autoplay + ok/nokta state'leri
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: { perView: 1 },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel);
      },
      created() {
        setCreated(true);
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
          if (mouseOver || document.hidden) return;
          timeout = setTimeout(() => slider.next(), 2500); // autoplay süresi
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
          const vis = () => nextTimeout();
          document.addEventListener("visibilitychange", vis);
          slider.on("destroyed", () => {
            document.removeEventListener("visibilitychange", vis);
          });
          nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  if (error) return <div className="text-red-600">{error}</div>;

  // Veri gelene kadar placeholder alan
  if (images.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-[24rem] lg:h-96 bg-[url('/carousel_placeholder.png')] bg-cover bg-center" />
    );
  }

  const total =
    instanceRef.current?.track.details.slides.length ?? images.length;

  return (
    <div className="relative w-full">
      {/* Slider: sm h-64, md 24rem, lg h-96 */}
      <div
        ref={sliderRef}
        className="keen-slider relative w-full h-64 md:h-[24rem] lg:h-96 overflow-hidden"
      >
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide relative h-full">
            {/* Placeholder arka plan (görsel yüklenene kadar da görselin altında kalır) */}
            <div className="absolute inset-0 bg-[url('/carousel_placeholder.png')] bg-cover bg-center" />
            {/* Görsel: lazy yok */}
            <Image
              src={src}
              alt={`carousel-${idx + 1}`}
              fill
              className="object-cover"
              loading="eager"
              // LCP için sadece ilk görseli önceliklendirmek isterseniz:
              // priority={idx === 0}
            />
          </div>
        ))}

        {/* ——— Oklar ——— */}
        {created && instanceRef.current && (
          <>
            <Arrow
              dir="left"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.prev();
              }}
            />
            <Arrow
              dir="right"
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current?.next();
              }}
            />
          </>
        )}

        {/* ——— Ortalanmış başlık (select-none) ——— */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-center select-none px-4">
          <h2
            className="text-white font-bold
                       text-xl sm:text-2xl md:text-5xl lg:text-6xl
                       drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          >
            Baskıda Kaliteli Hizmet
          </h2>
        </div>
      </div>

      {/* ——— Noktalar ——— */}
      {created && instanceRef.current && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              aria-label={`Slayt ${idx + 1}`}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                currentSlide === idx
                  ? "bg-white scale-110 shadow"
                  : "bg-white/50 hover:bg-white/70",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Basit ok butonu (sol/sağ), Tailwind ile konumlandırma */
function Arrow({
  dir,
  onClick,
}: {
  dir: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
}) {
  const pos = dir === "left" ? "left-2 md:left-3" : "right-2 md:right-3";

  return (
    <button
      type="button"
      aria-label={dir === "left" ? "Önceki slayt" : "Sonraki slayt"}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 ${pos} z-30
                  inline-flex items-center justify-center
                  h-9 w-9 md:h-10 md:w-10 rounded-full
                  bg-black/40 hover:bg-black/55 backdrop-blur
                  text-white transition focus:outline-none focus:ring-2 focus:ring-white/70`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 md:h-6 md:w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {dir === "left" ? (
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        ) : (
          <path d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L13.17 12z" />
        )}
      </svg>
    </button>
  );
}
