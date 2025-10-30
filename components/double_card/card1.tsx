import Image from "next/image";

type BoxProps = {
  src: string;
  label: string;
  // Desktop’ta (>=426px) uygulanacak konum sınıfları
  desktopPos: string;
};

function CardBox({ src, label, desktopPos }: BoxProps) {
  return (
    <div
      className={[
        // Mobil: akışa göre, sabit boy (grid içi)
        "relative flex flex-col items-center justify-center",
        "h-[6.5rem] w-[7.5rem]",
        // >=426px: aynı eleman absolute konumlanacak + daha büyük boy
        "min-[426px]:absolute min-[426px]:h-[10.5rem] min-[426px]:w-[13rem]",
        desktopPos,
      ].join(" ")}
    >
      {/* Üstte içerik */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <Image
          src={src}
          alt={label}
          width={400}
          height={100}
          className="w-[60px] min-[426px]:w-[120px]"
        />
        <p className="mt-1 text-[10px] min-[426px]:text-xs text-white">
          {label}
        </p>
      </div>
      {/* Altta yarı saydam overlay */}
      <div className="absolute inset-0 rounded bg-white/25" />
    </div>
  );
}

export default function Card1() {
  return (
    <div
      className={[
        "relative flex items-center justify-center bg-red-800",
        // Kart boyutu: mobil küçük, >=426px büyük
        "w-[18rem] h-[18rem] min-[426px]:w-[30rem] min-[426px]:h-[25rem]",
        // Mobilde grid; >=426px’de block + children absolute
        "grid grid-cols-2 gap-3 p-3 min-[426px]:block",
        // Yerleşim/animasyon
        "origin-center transition-[width,height] duration-300",
        // Büyük ekran yerleşimi ihtiyaçsa
        "lg:absolute lg:z-20 lg:mr-[27.5rem] lg:mb-10",
      ].join(" ")}
    >
      <CardBox
        src="/ofset-baski_242_.png"
        label="OFSET BASKI"
        desktopPos="min-[426px]:top-5 min-[426px]:left-5"
      />
      <CardBox
        src="/ambalaj_475_.png"
        label="AMBALAJ"
        desktopPos="min-[426px]:top-5 min-[426px]:right-5"
      />
      <CardBox
        src="/kurumsal-kimlik_962_.png"
        label="KURUMSAL KİMLİK"
        desktopPos="min-[426px]:bottom-5 min-[426px]:left-5"
      />
      <CardBox
        src="/promosyon_475_.png"
        label="PROMOSYON"
        desktopPos="min-[426px]:bottom-5 min-[426px]:right-5"
      />
    </div>
  );
}
