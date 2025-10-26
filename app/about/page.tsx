import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <div>
        <div className="min-w-full">
          <div className="w-full absolute text-white text-4xl z-1 flex justify-center items-center h-96 font-[500]">
            Hakkımızda
          </div>
          <div className="w-full bg-black h-96 absolute opacity-60"></div>
          <Image
            src={"/panel_bg.png"}
            alt="Hakkımızda"
            width={1920}
            height={600}
            className="max-h-96 object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col grow  dark:bg-black w-full max-w-7xl mx-auto p-4 pt-24 gap-8 text-xl text-gray-600">
        <p className="font-semibold text-3xl text-black">Nost Copy</p>
        Nost Copy, hızlı ve kaliteli çözümler sunmak, taleplere alternatif
        çözümler üretmek, planlama, baskı ve sonuçlandırma aşamalarına kadar
        denetim ve kontrolü, elinde tutmak, sürecin tamamına katkı sunmak
        prensipleri ile hizmet vermektedir. Firmamızın en asli hedefi
        profesyonel hizmet kadrosu, çağa uygun sunum anlayışı, teknolojik ve
        yenilikçi yapısı ile elde ettiğimiz tecrübeyi en geniş kitlelere
        ulaştırabilmek ve bu noktada sektöre de büyük bir katkı sunabilmektir.
        <Image
          src={"/baskiornek.png"}
          alt="Hakkımızda"
          width={1920}
          height={600}
          className="object-cover bg-gray-300 rounded-2xl"
        />
        <p className="font-semibold text-3xl text-black">Kalite Politikamız</p>
        Kalite Yönetim Sistemi şartlarına uymayı, sistemi sürekli iyileştirmeyi,
        hiçbir koşulda kaliteden ödün vermemeyi kalite politikası olarak
        benimsemiştir. Ürünlerimizde kalitede önderlik etmek Ürün güvenirliği
        sağlamak Müşteriler ile devamlı iletişim halinde olmak tüm istek ve
        ihtiyaçlarını karşılayabilecek nitelikte sürekli ,güvenilir ve aynı
        kalitede ürünleri çıkarmak, oluşabilecek problemlere anında çözüm
        üreterek %100 müşteri memnuniyeti sağlamak Kalite Yönetim Sistemine tüm
        personelin katılımıyla, uygulanabilirliği, anlaşılabilirliği ve
        sürekliliği sağlamak ve hata miktarlarını minimuma indirmek ve böylece
        maliyetleri düşürmek Uygun kaynaklar sağlayarak, uygun yatırımlar
        yaparak, teknolojiyi takip ederek çağdaş ve sürekli gelişmeyi sağlamak
        üretimi arttırmak zamanı, maliyeti ve kaynak israfını yöneterek
        “verimlilik ve tasarruf” sağlamak.
      </div>
    </div>
  );
}
