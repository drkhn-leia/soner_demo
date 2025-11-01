let locked = false;
let prevOverflow = "";
let prevPaddingRight = "";
let scrollBarWidth = 0;

function getScrollbarWidth() {
  if (typeof window === "undefined") return 0;
  // Görünen scrollbar genişliği (Windows’ta ~17px; macOS'ta 0 olabilir)
  return window.innerWidth - document.documentElement.clientWidth;
}

export function lockBodyScroll() {
  if (locked) return;
  const body = document.body;
  prevOverflow = body.style.overflow;
  prevPaddingRight = body.style.paddingRight;

  scrollBarWidth = getScrollbarWidth();
  // Scrollbar kaybolduğunda oluşacak boşluğu padding ile telafi et
  if (scrollBarWidth > 0) {
    body.style.paddingRight = `${scrollBarWidth}px`;
  }
  body.style.overflow = "hidden";
  locked = true;
}

export function unlockBodyScroll() {
  if (!locked) return;
  const body = document.body;
  body.style.overflow = prevOverflow;
  body.style.paddingRight = prevPaddingRight;
  locked = false;
}
