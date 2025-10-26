import Image from "next/image";
export default function InfoCard() {
  return (
    <div className="w-full flex flex-row justify-center items-center py-24">
      <div className="lg:flex lg:flex-row gap-8 lg:max-w-7xl md:max-w-md sm:max-w-sm not-lg:px-4 w-full">
        <div className="">
          <div className="text-3xl font-black pb-8">BASINDA <p className="text-red-800">EKONOMİK</p> ÇÖZÜMLER</div>
          <div className="text-[1rem] font-normal text-gray-600">
            Cb Basımevi hızlı, kaliteli çözümler sunmak, taleplere alternatif
            çözümler üretmek, planlama, baskı ve sonuçlandırma aşamalarına kadar
            denetim ve kontrolü, elinde tutmak, sürecin tamamına katkı sunmak
            prensipleri ile hizmet vermektedir.. Firmamızın en asli hedefi
            profesyonel hizmet kadrosu, çağa uygun sunum anlayışı, teknolojik ve
            yenilikçi yapısı ile elde ettiğimiz tecrübeyi en geniş kitlelere
            ulaştırabilmek ve bu noktada sektöre de büyük bir katkı
            sunabilmektir..
          </div>
        </div>
        <Image src="/cardImage.jpg" width={500} height={400} alt="Renk Paleti Resmi" />
      </div>
    </div>
  );
}
