import Image from "next/image";
export default function InfoCard() {
  return (
    <>
    
    <div className="w-full justify-center items-center sm:items-start py-24 md:px-16 hidden lg:flex lg:flex-row">
      <div className="lg:flex lg:flex-col gap-8 w-full pr-8">
          <div className="text-3xl font-black pb-4">BASINDA <p className="text-red-800">EKONOMİK</p> ÇÖZÜMLER</div>
          <div className="text-lg font-normal text-gray-600 dark:text-gray-300">
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
        <Image src="/cardImage.jpg" width={500} height={400} alt="Renk Paleti Resmi" className="md:w-full" />
    </div>

     <div className="w-full flex flex-col justify-center items-center py-24 px-16 lg:hidden">
        <div className="text-4xl font-black pb-8">BASINDA <b className="text-red-800">EKONOMİK</b> ÇÖZÜMLER</div>
        <div className="text-lg font-normal text-gray-600 dark:text-gray-300 pb-8">
          Cb Basımevi hızlı, kaliteli çözümler sunmak, taleplere alternatif
          çözümler üretmek, planlama, baskı ve sonuçlandırma aşamalarına kadar
          denetim ve kontrolü, elinde tutmak, sürecin tamamına katkı sunmak
          prensipleri ile hizmet vermektedir.. Firmamızın en asli hedefi
          profesyonel hizmet kadrosu, çağa uygun sunum anlayışı, teknolojik ve
          yenilikçi yapısı ile elde ettiğimiz tecrübeyi en geniş kitlelere
          ulaştırabilmek ve bu noktada sektöre de büyük bir katkı
          sunabilmektir..
          </div>
        <Image src="/cardImage.jpg" width={500} height={400} alt="Renk Paleti Resmi" className="w-full" />
      
    </div>
    </>
  );
}
