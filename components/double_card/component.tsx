import Image from "next/image";

export default function DoubleCard() {
  return (
    <div className="w-full relative flex flex-row justify-center items-center h-[50vh] my-20">
      <div
        className="bg-red-800 h-100 w-120 absolute left-125 top-5 z-1
      flex justify-center items-center"
      >
        <div className="h-42 w-52 absolute top-5 left-5 flex justify-center items-center">
          <div>
            <Image
              src={"/ofset-baski_242_.png"}
              alt="Promosyon"
              width={120}
              height={100}
              className="z-1"
            />
            <p className="text-white text-xs items-center text-center pb-2">
              OFSET BASKI
            </p>
          </div>
          <div className="bg-white absolute h-42 w-52 opacity-25"></div>
        </div>
        <div className="h-42 w-52 absolute top-5 right-5 flex justify-center items-center">
          <div>
            <Image
              src={"/ambalaj_475_.png"}
              alt="Promosyon"
              width={120}
              height={100}
              className="z-1"
            />
            <p className="text-white text-xs items-center text-center pb-2">
              AMBALAJ
            </p>
          </div>
          <div className="bg-white absolute h-42 w-52 opacity-25"></div>
        </div>
        <div className="h-42 w-52 absolute bottom-5 left-5 flex justify-center items-center">
          <div>
            <Image
              src={"/kurumsal-kimlik_962_.png"}
              alt="Promosyon"
              width={120}
              height={100}
              className="z-1"
            />
            <p className="text-white text-xs items-center text-center pb-2">
              KURUMSAL KİMLİK
            </p>
          </div>
          <div className="bg-white absolute h-42 w-52 opacity-25"></div>
        </div>
        <div className="h-42 w-52 absolute bottom-5 right-5 flex justify-center items-center">
          <div>
            <Image
              src={"/promosyon_475_.png"}
              alt="Promosyon"
              width={120}
              height={100}
              className="z-1"
            />
            <p className="text-white text-xs items-center text-center pb-2">
              PROMOSYON
            </p>
          </div>
          <div className="bg-white absolute h-42 w-52 opacity-25"></div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-gray-200 h-100 w-120 absolute right-125 bottom-5 p-15">
        <div className="flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl font-bold p-5 max-w-50">Baskı Hizmetleri</h2>
          <p className="p-5">
            Firmamızın en asli hedefi profesyonel hizmet kadrosu, çağa uygun
            sunum anlayışı, teknolojik ve yenilikçi yapısı ile elde ettiğimiz
            tecrübeyi en geniş kitlelere ulaştırmaktır.
          </p>
          <div className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
            Devamı..
          </div>
        </div>
      </div>
    </div>
  );
}
