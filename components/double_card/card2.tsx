export default function Card2() {
  return (
    <div
      className="
        relative flex flex-col items-center justify-center bg-gray-200 text-center
        /* Mobil: küçük boy */
        w-[18rem] h-[18rem] p-4
        /* 426px ve üzeri: büyük boy */
        min-[426px]:w-[30rem] min-[426px]:h-[25rem] min-[426px]:p-6
        origin-center transition-[width,height,padding] duration-300
        lg:absolute lg:z-10 lg:ml-[27.5rem] lg:mt-10
      "
    >
      <h2
        className="
          text-2xl font-bold mb-3
          min-[426px]:text-4xl
        "
      >
        Baskı Hizmetleri
      </h2>

      <p
        className="
          text-sm leading-relaxed px-2
          min-[426px]:text-base min-[426px]:px-5
        "
      >
        Firmamızın en asli hedefi profesyonel hizmet kadrosu, çağa uygun sunum anlayışı, teknolojik
        ve yenilikçi yapısı ile elde ettiğimiz tecrübeyi en geniş kitlelere ulaştırmaktır.
      </p>

      <div
        className="
          bg-black text-white px-4 py-2 mt-6 rounded-lg cursor-pointer
          hover:bg-gray-800 transition-colors
          text-sm min-[426px]:text-base
        "
      >
        Devamı..
      </div>
    </div>
  );
}
