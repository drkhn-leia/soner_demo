"use client";
import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import Link from "next/link";

type CarouselItem = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

export default function Full_W_Carousel() {
  // 1) Tüm Hook'lar en üstte ve koşulsuz:
  const [items, setItems] = React.useState<CarouselItem[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [created, setCreated] = React.useState(false);

  // Data fetch (değiştirmedik)
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/carousel", { cache: "no-store" });
        if (!res.ok) throw new Error("Veri alınamadı");
        const json: { items: CarouselItem[] } = await res.json();
        if (!cancelled) setItems(json.items ?? []);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Veri alınamadı");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Keen Slider her zaman aynı şekilde kuruluyor (plugin dizi uzunluğu sabit)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: { perView: 1 },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setCreated(true);
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        const clearNext = () => clearTimeout(timeout);
        const next = () => {
          clearTimeout(timeout);
          if (mouseOver || document.hidden) return;
          timeout = setTimeout(() => slider.next(), 2500);
        };
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNext();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            next();
          });
          const vis = () => next();
          document.addEventListener("visibilitychange", vis);
          slider.on("destroyed", () =>
            document.removeEventListener("visibilitychange", vis)
          );
          next();
        });
        slider.on("dragStarted", clearNext);
        slider.on("animationEnded", next);
        slider.on("updated", next);
      },
    ]
  );

  React.useEffect(() => {
    const fix = () => {
      const inst = instanceRef.current;
      if (!inst) return;
      // Görünürlük açıldıktan sonra iki kare üst üste ölç
      requestAnimationFrame(() => {
        inst.update();
        requestAnimationFrame(() => inst.update());
      });
    };

    // Loader kapanınca
    window.addEventListener("loader:exit", fix, { once: true });
    // Ekran boyutu değişirse
    window.addEventListener("resize", fix);

    return () => {
      window.removeEventListener("resize", fix);
    };
  }, [instanceRef]);

  // 🔧 Loader kapandıktan sonra yeniden ölç — bu effect HER ZAMAN tanımlı:
  React.useEffect(() => {
    const onExit = () => {
      // items var/yok fark etmez; varsa ölçer yoksa no-op
      instanceRef.current?.update();
    };
    window.addEventListener("loader:exit", onExit, { once: true });
    return () => window.removeEventListener("loader:exit", onExit);
  }, [instanceRef]);

  // 2) Erken return'leri TÜM hook'lardan sonra yapın:
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-[24rem] lg:h-96 bg-[url('/carousel_placeholder.png')] bg-cover bg-center" />
    );
  }

  const total =
    instanceRef.current?.track.details.slides.length ?? items.length;

  return (
    <div className="relative w-full">
      <div
        ref={sliderRef}
        className="keen-slider relative w-full h-64 md:h-[24rem] lg:h-96 overflow-hidden"
      >
        {items.map((it, idx) => (
          <div key={it.id} className="keen-slider__slide relative h-full">
            <div className="absolute inset-0 bg-[url('/carousel_placeholder.png')] bg-cover bg-center" />
            <Image
              src={it.imageUrl}
              alt={it.title || `carousel-${idx + 1}`}
              fill
              sizes="full"
              className="object-cover"
              priority={idx === 0}
              loading={idx === 0 ? "eager" : "lazy"}
            />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
              <div className="pointer-events-none">
                <h2 className="text-white font-bold text-xl sm:text-2xl md:text-5xl lg:text-6xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                  {it.title}
                </h2>
                <h4 className="text-white/90 mt-2 max-w-[900px] px-4 md:px-8 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                  {it.description}
                </h4>
              </div>
              <Link
                href={it.buttonHref}
                className="bg-foreground text-background mt-3 py-1.5 px-4 rounded-full font-semibold inline-flex items-center justify-center shadow-md hover:opacity-90 transition pointer-events-auto"
                aria-label={`${it.title} — bağlantı`}
              >
                {it.buttonText ?? "Detaylar"}
              </Link>
            </div>
          </div>
        ))}

        {/* Oklar */}
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
      </div>

      {/* Noktalar */}
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
      className={`absolute top-1/2 -translate-y-1/2 ${pos} z-30 inline-flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full bg-black/40 hover:bg-black/55 backdrop-blur text-white transition focus:outline-none focus:ring-2 focus:ring-white/70`}
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
