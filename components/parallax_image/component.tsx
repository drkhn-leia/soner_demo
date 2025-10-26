export default function ParallaxImage() {
  return (
    <div
      className="w-full flex flex-row justify-center items-center h-96 py-24 
    text-white text-5xl font-semibold text-center text-shadow-lg text-shadow-black
    bg-[url(/resim2_.jpg)] bg-fixed bg-cover bg-center "
    >
      <div className="absolute bg-black h-96 w-full opacity-60"></div>
      <p className="max-w-md leading-15 z-1">
        15 YILI AŞKIN BASKI ÇÖZÜMLERİMİZLE
      </p>
    </div>
  );
}
