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
  const [loaded, setLoaded] = React.useState<boolean[]>([]);

  // Keen: hem ref (container’a takacağız) hem de instanceRef (update için)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      loop: true,
      slides: { perView: 1 },
      detailsChanged(s) {
        if (!s.track?.details) return;
        setOpacities(s.track.details.slides.map((sl) => sl.portion));
      },
    },
    [
      (slider) => {
        // basit autoplay
        let t: ReturnType<typeof setTimeout>;
        let over = false;
        const clear = () => clearTimeout(t);
        const next = () => {
          clearTimeout(t);
          if (over) return;
          t = setTimeout(() => slider.next(), 5000);
        };
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            over = true;
            clear();
          });
          slider.container.addEventListener("mouseout", () => {
            over = false;
            next();
          });
          next();
        });
        slider.on("dragStarted", clear);
        slider.on("animationEnded", next);
        slider.on("updated", next);
      },
    ]
  );

  // Kapsayıcıyı ayrıca tutalım ki ResizeObserver bağlayalım
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // ref’i kombine edelim (hem keen’in ref’i hem kendi containerRef’imiz)
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node ?? null;
      sliderRef(node as HTMLDivElement);
    },
    [sliderRef]
  );

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(DATA_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
        const json: { images: CarouselItem[] } = await res.json();
        if (!cancelled) {
          const list = (json.images || []).map((i) => i.imageUrl);
          setImages(list);
          setLoaded(new Array(list.length).fill(false));
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load images");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // 🧭 Container boyutu değişince slider’ı güncelle
  React.useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      instanceRef.current?.update?.();
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [instanceRef]);

  // 🧭 Breakpoint/responsive değişimlerinde de garanti olsun
  React.useEffect(() => {
    const handler = () => instanceRef.current?.update?.();
    window.addEventListener("orientationchange", handler);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("orientationchange", handler);
      window.removeEventListener("resize", handler);
    };
  }, [instanceRef]);

  if (error) return <div className="text-red-600">{error}</div>;
  if (images.length === 0) {
    return (
      <div className="hidden md:flex w-full h-96 md:h-[48rem] lg:h-96 relative items-center justify-center">
        <div aria-label="Yükleniyor" className="w-10 h-10 border-4 border-black/40 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="hidden md:flex w-full relative">
      <div
        ref={combinedRef}
        className="keen-slider relative w-full h-96 md:h-[48rem] lg:h-96 overflow-hidden"
      >
        {images.map((src, idx) => (
          <div key={idx} className="keen-slider__slide relative h-full min-h-0">
            {!loaded[idx] && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10">
                <div aria-label="Yükleniyor" className="w-10 h-10 border-4 border-white/60 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={src}
              alt={`image-${idx + 1}`}
              fill
              className="object-cover"
              style={{ opacity: opacities[idx] ?? 1 }}
              onLoadingComplete={() => {
                setLoaded((prev) => {
                  const copy = [...prev];
                  copy[idx] = true;
                  return copy;
                });
                instanceRef.current?.update?.();
              }}
            />
          </div>
        ))}
      </div>

      {/* === ORTALANMIŞ YAZI === */}
      <div className="absolute inset-0 flex items-center justify-center text-center z-20">
        <h2
          className="
            text-white font-bold
            text-2xl sm:text-3xl md:text-5xl lg:text-6xl
            drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]
            px-4
          "
        >
          Baskıda Kaliteli Hizmet
        </h2>
      </div>
    </div>
  );
}
