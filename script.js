/**
 * 💐 WEB CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
 * THIỆP CHÚC MỪNG CHUNG DÀNH CHO TẤT CẢ PHỤ NỮ THẤY ĐƯỢC TẤM THIỆP NÀY
 * 
 * Tính năng chính:
 * 1. Lời chúc chung sâu sắc & ấm áp tôn vinh mọi người phụ nữ
 * 2. Phong thư 3D tương tác với con dấu sáp đỏ, bung pháo hoa và hoa hồng
 * 3. Tự động phát nhạc nền du dương (Web Audio API Synthesizer - 100% offline)
 * 4. Hiệu ứng chữ gõ tay từng dòng (Typewriter Effect)
 * 5. Hộp thoại chào đón (Tùy chọn tải ảnh kỷ niệm hoặc mở thiệp ngay)
 * 6. Con tem bưu chính kỷ niệm trên thư + Khung ảnh kỷ niệm
 * 7. Sinh mã QR 100% Offline (qrcode.min.js) + Tải ảnh QR PNG in quà tặng/thiệp
 * 8. Quẻ may mắn 20/10 lật mở bí mật (Sắc đẹp, Hạnh phúc, Thành công, Bình an)
 * 9. Hiệu ứng Canvas 60 FPS cánh hoa hồng, trái tim và bụi sao bay
 * 10. Nút 1-chạm gửi lời cảm ơn lại cho người tặng qua Zalo
 */

// ==========================================
// 1. DATA: CÁC MẪU LỜI CHÚC CHUNG & TRÍCH DẪN Ý NGHĨA
// ==========================================
const UNIVERSAL_WISHES = [
  {
    greeting: "Gửi Những Người Phụ Nữ Thấy Được Tấm Thiệp Này ❤️",
    wish: "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi ngàn lời chúc an lành, ngọt ngào và trân quý nhất tới bạn! Chúc những người phụ nữ thấy được tấm thiệp này luôn luôn xinh đẹp, hạnh phúc, được yêu thương và rạng rỡ mỗi ngày. Cảm ơn bạn vì đã luôn mang lại sự dịu dàng, nụ cười và biết bao điều tuyệt vời cho cuộc sống này!",
    quote: "\"Phụ nữ sinh ra là để được yêu thương, được trân trọng và được hạnh phúc trọn đời.\""
  },
  {
    greeting: "Gửi Người Phụ Nữ Tuyệt Vời Đang Đọc Tấm Thiệp Này 🌸",
    wish: "Nếu bạn đang đọc được những dòng chữ này, xin chúc bạn một ngày 20/10 thật bình yên và ngập tràn niềm vui! Dù bạn đang là người mẹ tảo tần, người vợ hiền dịu, người chị/em thân thương, cô giáo kính yêu hay người bạn tuyệt vời — bạn luôn là đóa hoa ngát hương, xứng đáng được nâng niu, trân trọng và hạnh phúc trọn đời!",
    quote: "\"Hãy là đóa hoa kiêu hãnh tỏa hương, rạng ngời và tự tin theo cách của riêng bạn.\""
  },
  {
    greeting: "Thân Gửi Người Phụ Nữ Hữu Duyên Mở Bức Thiệp Này ✨",
    wish: "Chúc cho nụ cười trên môi bạn mãi nở rộ, tự tin tỏa sáng theo cách riêng của mình. Mong bạn luôn tìm thấy niềm hạnh phúc từ những điều bình dị nhất, công việc hanh thông, ước mơ sớm thành hiện thực và luôn có những người thương yêu đồng hành bên cạnh!",
    quote: "\"Vẻ đẹp của người phụ nữ không chỉ ở nét mặt, mà ở sự dịu dàng và ánh sáng ấm áp trong tâm hồn.\""
  },
  {
    greeting: "Chúc Phái Đẹp Ngày 20/10 Ngập Tràn Niềm Vui & May Mắn 💐",
    wish: "Chúc bạn: Nhan sắc không tuổi, tâm hồn trẻ mãi, tài chính tự chủ và ngập tràn hạnh phúc! Bạn chính là món quà kỳ diệu và xinh đẹp nhất mà cuộc sống này tạo nên. Hãy luôn tự hào, yêu thương chính mình và tự tin bước về phía trước nhé!",
    quote: "\"Bạn chính là món quà tuyệt vời nhất mà cuộc đời này trao tặng cho thế giới.\""
  },
  {
    greeting: "Gửi Trao Vạn Điều Ngọt Ngào & Bình An Tới Bạn 🌷",
    wish: "Nhân ngày 20/10, xin gửi trao tới bạn tất cả sự ngọt ngào của thế giới! Chúc bạn luôn có những ngày tháng an nhiên, được sống là chính mình, được yêu thương vô điều kiện và nhận được thật nhiều hoa tươi, quà đẹp cùng những điều bất ngờ hạnh phúc hôm nay!",
    quote: "\"Nụ cười rạng rỡ của bạn chính là ánh dương ấm áp nhất sưởi ấm mọi trái tim.\""
  }
];

// ==========================================
// 2. STATE & DOM ELEMENTS
// ==========================================
let currentWishIndex = 0;
let customSenderName = '';
let customRecipientName = '';
let isEnvelopeOpened = false;

// Tùy biến lời chúc & Nơi nhận lời cảm ơn
let customWishText = '';
let creatorInbox = '';

// Dữ liệu ảnh người dùng tải lên
let recipientPhotoData = null;
try {
  recipientPhotoData = sessionStorage.getItem('recipient_photo');
} catch (e) {}

// Biến lưu thời gian hiệu ứng Typewriter
let typewriterTimeout = null;

// QR Code Instances
let shareQrInstance = null;
let modalQrInstance = null;
let currentModalQrUrl = '';

// DOM Elements
const recipientGreeting = document.getElementById('recipientGreeting');
const wishContent = document.getElementById('wishContent');
const quoteContent = document.getElementById('quoteContent');
const letterSignature = document.getElementById('letterSignature');
const envelope = document.getElementById('envelope');
const waxSeal = document.getElementById('waxSeal');
const envelopeHint = document.getElementById('envelopeHint');

const thankSenderBtn = document.getElementById('thankSenderBtn');
const footerRoseRainBtn = document.getElementById('footerRoseRainBtn');

const recipientStamp = document.getElementById('recipientStamp');
const stampImg = document.getElementById('stampImg');
const photoDisplay = document.getElementById('photoDisplay');
const photoCaption = document.getElementById('photoCaption');

// Welcome Photo Modal Elements
const welcomePhotoModal = document.getElementById('welcomePhotoModal');
const closeWelcomeModalBtn = document.getElementById('closeWelcomeModalBtn');
const photoUploadSlot = document.getElementById('photoUploadSlot');
const slotIdle = document.getElementById('slotIdle');
const slotPreview = document.getElementById('slotPreview');
const welcomePreviewImg = document.getElementById('welcomePreviewImg');
const welcomePhotoFileInput = document.getElementById('welcomePhotoFileInput');
const confirmWelcomePhotoBtn = document.getElementById('confirmWelcomePhotoBtn');
const skipWelcomePhotoBtn = document.getElementById('skipWelcomePhotoBtn');

// Thank You Modal Elements
const thankYouModal = document.getElementById('thankYouModal');
const thankModalBackdrop = document.getElementById('thankModalBackdrop');
const closeThankModalBtn = document.getElementById('closeThankModalBtn');
const thankModalTitle = document.getElementById('thankModalTitle');
const thankMessageInput = document.getElementById('thankMessageInput');
const thankChips = document.querySelectorAll('#thankTemplateSelector .wish-chip');
const sendInboxActionBtn = document.getElementById('sendInboxActionBtn');
const sendInboxBtnText = document.getElementById('sendInboxBtnText');
const copyThankTextBtn = document.getElementById('copyThankTextBtn');

// Share Hub Elements
const shareSection = document.getElementById('shareSection');
const senderNameInput = document.getElementById('senderNameInput');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
const zaloMessageContent = document.getElementById('zaloMessageContent');
const copyZaloMsgBtn = document.getElementById('copyZaloMsgBtn');
const shareQrCodeBox = document.getElementById('shareQrCodeBox');
const downloadShareQrBtn = document.getElementById('downloadShareQrBtn');
const enlargeShareQrBtn = document.getElementById('enlargeShareQrBtn');

// QR Modal Elements
const qrModal = document.getElementById('qrModal');
const closeQrModalBtn = document.getElementById('closeQrModalBtn');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const qrTargetTag = document.getElementById('qrTargetTag');
const downloadQrBtn = document.getElementById('downloadQrBtn');
const copyQrLinkBtn = document.getElementById('copyQrLinkBtn');

// Top nav & Footer Buttons
const navShareBtn = document.getElementById('navShareBtn');
const footerThankBtn = document.getElementById('footerThankBtn');
const footerShareBtn = document.getElementById('footerShareBtn');
const footerBlessing = document.getElementById('footerBlessing');

// Audio Elements
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicWaves = document.getElementById('musicWaves');

// Toast Notification
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');

// ==========================================
// 3. TIỆN ÍCH URL, CLIPBOARD & TIN NHẮN
// ==========================================
function getBaseUrl() {
  if (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'file://') {
    return window.location.origin + window.location.pathname;
  }
  return window.location.href.split('?')[0];
}

function generateShareUrl(sender = '', to = '') {
  const base = getBaseUrl();
  const params = new URLSearchParams();
  if (sender && sender.trim()) params.set('from', sender.trim());
  if (to && to.trim()) params.set('to', to.trim());
  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

function generateZaloMessage(url, sender = '') {
  const senderSignature = sender.trim() ? `\n(Gửi tặng từ ${sender.trim()})` : '';
  return `💐 Chúc mừng Ngày Phụ Nữ Việt Nam 20/10! 💖\n\nChúc những người phụ nữ thấy được tấm thiệp này luôn luôn xinh đẹp, hạnh phúc, được yêu thương và rạng rỡ mỗi ngày!\n\nCó một tấm thiệp ấm áp và bất ngờ gửi tặng bạn tại đây:\n👉 ${url}\n\n(Chạm vào con dấu sáp đỏ trên màn hình để mở thiệp và rút thông điệp may mắn nhé!) 🌸${senderSignature}`;
}

function copyToClipboard(text, successMsg = "Đã sao chép thành công!", icon = "📋") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, icon);
    }).catch(() => {
      fallbackCopyText(text, successMsg, icon);
    });
  } else {
    fallbackCopyText(text, successMsg, icon);
  }
}

function fallbackCopyText(text, successMsg, icon) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(successMsg, icon);
  } catch (err) {
    showToast("Vui lòng sao chép thủ công trên thanh địa chỉ!", "⚠️");
  }
  document.body.removeChild(textArea);
}

function showToast(message, icon = "🌸") {
  if (!toast) return;
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// 4. HIỂN THỊ THIỆP & NỘI DUNG LỜI CHÚC
// ==========================================
function updateWishDisplay() {
  const current = UNIVERSAL_WISHES[currentWishIndex % UNIVERSAL_WISHES.length];
  
  if (customRecipientName) {
    recipientGreeting.textContent = `Gửi: ${customRecipientName} - Người Phụ Nữ Tuyệt Vời ❤️`;
  } else {
    recipientGreeting.textContent = current.greeting;
  }

  wishContent.textContent = customWishText || current.wish;
  quoteContent.textContent = current.quote;

  // Cập nhật chữ ký người gửi
  if (customSenderName) {
    letterSignature.textContent = `Với tất cả sự trân quý & yêu thương từ ${customSenderName}!`;
  } else {
    letterSignature.textContent = "Với tất cả sự trân quý & yêu thương!";
  }

  // Cập nhật nút cảm ơn
  const thankWho = customSenderName ? `Đến ${customSenderName}` : "Đến Người Tặng";
  if (thankSenderBtn) {
    thankSenderBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${thankWho}</span>`;
  }
  if (footerThankBtn) {
    footerThankBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${thankWho}</span>`;
  }
}

// Hiệu ứng chữ gõ tay từng dòng (Typewriter)
function startTypewriterEffect(text) {
  if (!wishContent) return;
  if (typewriterTimeout) clearTimeout(typewriterTimeout);

  wishContent.textContent = '';
  wishContent.classList.add('typing-cursor');

  let i = 0;
  const speed = 20; // 20ms mỗi ký tự
  function typeNext() {
    if (i < text.length) {
      wishContent.textContent += text.charAt(i);
      i++;
      typewriterTimeout = setTimeout(typeNext, speed);
    } else {
      wishContent.classList.remove('typing-cursor');
    }
  }
  typeNext();
}

// Cập nhật hình ảnh tem thư
function updatePhotoDisplay() {
  const defaultPhoto = "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop";
  if (recipientPhotoData) {
    if (stampImg) stampImg.src = recipientPhotoData;
  } else {
    if (stampImg && (!stampImg.src || stampImg.src === '')) stampImg.src = defaultPhoto;
  }
}

// Đính kèm ảnh người dùng tải lên
function applyRecipientPhoto(dataUrl) {
  recipientPhotoData = dataUrl;
  try {
    sessionStorage.setItem('recipient_photo', dataUrl);
  } catch (e) {}

  if (stampImg) stampImg.src = dataUrl;
  showToast("Đã dán ảnh của bạn lên con tem phong thư! 🌸", "📷");
}

// ==========================================
// 5. KHỞI TẠO TỪ URL & CHIA SẺ / MÃ QR
// ==========================================
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const fromParam = urlParams.get('from') || urlParams.get('sender');
  const toParam = urlParams.get('to') || urlParams.get('name');

  if (fromParam) {
    customSenderName = decodeURIComponent(fromParam).trim();
    if (senderNameInput) senderNameInput.value = customSenderName;
  }
  if (toParam) {
    customRecipientName = decodeURIComponent(toParam).trim();
  }

  const msgParam = urlParams.get('msg') || urlParams.get('message');
  if (msgParam) {
    customWishText = decodeURIComponent(msgParam).trim();
  }

  creatorInbox = urlParams.get('inbox') || '';

  const photoParam = urlParams.get('photo') || urlParams.get('img');
  if (photoParam && stampImg) {
    stampImg.src = decodeURIComponent(photoParam);
  }

  const wishParam = urlParams.get('wish');
  if (wishParam !== null && !isNaN(parseInt(wishParam))) {
    currentWishIndex = Math.abs(parseInt(wishParam)) % UNIVERSAL_WISHES.length;
  }

  updateWishDisplay();
  updatePhotoDisplay();
  updateShareSectionOutputs();

  // Hiển thị hộp thoại chào đón & tùy chọn đính kèm ảnh
  checkWelcomePhotoModal();
}

// Cập nhật link chia sẻ, tin nhắn Zalo và mã QR
function updateShareSectionOutputs() {
  const sender = senderNameInput ? senderNameInput.value.trim() : customSenderName;
  customSenderName = sender;
  
  // Cập nhật chữ ký người gửi trên thiệp theo thời gian thực
  if (letterSignature) {
    letterSignature.textContent = sender 
      ? `Với tất cả sự trân quý & yêu thương từ ${sender}!` 
      : "Với tất cả sự trân quý & yêu thương!";
  }

  const link = generateShareUrl(sender, customRecipientName);
  if (shareLinkInput) {
    shareLinkInput.value = link;
  }

  const zaloMsg = generateZaloMessage(link, sender);
  if (zaloMessageContent) {
    zaloMessageContent.textContent = zaloMsg;
  }

  // Vẽ mã QR trực tiếp trong Share Hub
  renderMiniQr(link);
}

// Sinh mã QR mini trong Share Hub
function renderMiniQr(url) {
  if (typeof QRCode === 'undefined' || !shareQrCodeBox) return;
  shareQrCodeBox.innerHTML = '';
  try {
    shareQrInstance = new QRCode(shareQrCodeBox, {
      text: url,
      width: 150,
      height: 150,
      colorDark: "#c9184a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (err) {
    // Safe QR fallback
  }
}

// Mở Modal phóng to mã QR & Chia sẻ
function openQrModal(url = '') {
  const finalUrl = url || generateShareUrl(customSenderName, customRecipientName);
  currentModalQrUrl = finalUrl;
  
  if (qrTargetTag) {
    qrTargetTag.textContent = customSenderName 
      ? `💐 Thiệp 20/10 gửi tặng từ ${customSenderName} 💖` 
      : "💐 Chúc Mừng 20/10 Phụ Nữ Việt Nam 💖";
  }

  if (qrCodeContainer && typeof QRCode !== 'undefined') {
    qrCodeContainer.innerHTML = '';
    modalQrInstance = new QRCode(qrCodeContainer, {
      text: finalUrl,
      width: 190,
      height: 190,
      colorDark: "#b5173f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  if (senderNameInput) {
    senderNameInput.value = customSenderName;
  }

  if (qrModal) qrModal.classList.remove('hidden');
}

// Tải ảnh mã QR dạng PNG về máy
function downloadQrFromElement(containerEl, fileName = "ma-qr-thiep-20-10.png") {
  if (!containerEl) return;
  const canvas = containerEl.querySelector('canvas');
  if (canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    showToast("Đã tải ảnh mã QR! Hãy in hoặc dán thiệp hoa nhé 🌸", "🖼️");
  } else {
    const img = containerEl.querySelector('img');
    if (img && img.src) {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = img.src;
      link.click();
      showToast("Đã tải ảnh mã QR thành công!", "🖼️");
    } else {
      showToast("Đang tạo mã QR, vui lòng thử lại sau giây lát!", "⚠️");
    }
  }
}



// ==========================================
// 6. MODAL CHÀO ĐÓN & ĐÍNH KÈM ẢNH
// ==========================================
function checkWelcomePhotoModal() {
  try {
    const handled = sessionStorage.getItem('welcome_handled');
    if (handled || recipientPhotoData) return;

    const welcomeTitle = document.getElementById('welcomeTitle');
    if (welcomeTitle) {
      welcomeTitle.textContent = customRecipientName 
        ? `Dành Riêng Cho ${customRecipientName}!` 
        : "Dành Tặng Người Phụ Nữ Tuyệt Vời!";
    }

    if (welcomePhotoModal) {
      setTimeout(() => {
        welcomePhotoModal.classList.remove('hidden');
      }, 500);
    }
  } catch (e) {}
}

let selectedTempPhotoUrl = null;

if (photoUploadSlot) {
  photoUploadSlot.addEventListener('click', () => {
    if (welcomePhotoFileInput) welcomePhotoFileInput.click();
  });

  photoUploadSlot.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      if (welcomePhotoFileInput) welcomePhotoFileInput.click();
    }
  });
}

if (welcomePhotoFileInput) {
  welcomePhotoFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        selectedTempPhotoUrl = evt.target.result;
        if (welcomePreviewImg) welcomePreviewImg.src = selectedTempPhotoUrl;
        if (slotIdle) slotIdle.classList.add('hidden');
        if (slotPreview) slotPreview.classList.remove('hidden');
        if (confirmWelcomePhotoBtn) confirmWelcomePhotoBtn.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    }
  });
}

if (confirmWelcomePhotoBtn) {
  confirmWelcomePhotoBtn.addEventListener('click', () => {
    if (selectedTempPhotoUrl) {
      applyRecipientPhoto(selectedTempPhotoUrl);
    }
    try {
      sessionStorage.setItem('welcome_handled', 'true');
    } catch (e) {}

    if (welcomePhotoModal) welcomePhotoModal.classList.add('hidden');
    showToast("Đã dán ảnh lên tem thư! Hãy chạm vào con dấu sáp để mở thiệp nhé 💌", "🌹");
  });
}

function dismissWelcomeModal() {
  try {
    sessionStorage.setItem('welcome_handled', 'true');
  } catch (e) {}
  if (welcomePhotoModal) welcomePhotoModal.classList.add('hidden');
}

if (skipWelcomePhotoBtn) {
  skipWelcomePhotoBtn.addEventListener('click', dismissWelcomeModal);
}
if (closeWelcomeModalBtn) {
  closeWelcomeModalBtn.addEventListener('click', dismissWelcomeModal);
}

// ==========================================
// 7. MỞ PHONG BÌ & CÁC NÚT TƯƠNG TÁC
// ==========================================
const closeEnvelopeBtn = document.getElementById('closeEnvelopeBtn');
const closeLetterPaperBtn = document.getElementById('closeLetterPaperBtn');
const envelopeCloseWrapper = document.getElementById('envelopeCloseWrapper');

function openEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;
  envelope.classList.add('is-open');
  envelopeHint.innerHTML = "💌 Thiệp đã mở! Bạn có thể bấm <strong>[Đóng Phong Bì Lại]</strong> bên dưới để gấp thiệp.";
  
  if (envelopeCloseWrapper) {
    envelopeCloseWrapper.classList.remove('hidden');
  }

  // Tự động phát nhạc nền nhẹ nhàng
  toggleBackgroundMusic(true);

  // Âm thanh nốt chuông và bắn pháo hoa
  playChimeEffect();
  launchConfetti(80);

  // Hiệu ứng chữ gõ tay nắn nót
  const current = UNIVERSAL_WISHES[currentWishIndex % UNIVERSAL_WISHES.length];
  startTypewriterEffect(customWishText || current.wish);
}

function closeEnvelope() {
  if (!isEnvelopeOpened) return;
  isEnvelopeOpened = false;
  envelope.classList.remove('is-open');
  envelopeHint.innerHTML = '👇 Chạm vào con dấu sáp <strong>[MỞ THIỆP]</strong> để khám phá lời chúc bí mật!';
  
  if (envelopeCloseWrapper) {
    envelopeCloseWrapper.classList.add('hidden');
  }

  if (typewriterTimeout) clearTimeout(typewriterTimeout);
  showToast("Đã đóng phong bì lại!", "✉️");
}

function toggleEnvelope() {
  if (isEnvelopeOpened) {
    closeEnvelope();
  } else {
    openEnvelope();
  }
}

if (closeEnvelopeBtn) {
  closeEnvelopeBtn.addEventListener('click', closeEnvelope);
}

if (closeLetterPaperBtn) {
  closeLetterPaperBtn.addEventListener('click', closeEnvelope);
}

if (waxSeal) {
  waxSeal.addEventListener('click', toggleEnvelope);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleEnvelope();
    }
  });
}

// Thả Cơn Mưa Hoa Hồng Chúc Phúc 20/10 (Thay thế pháo hoa confetti)
function triggerRoseRain() {
  playChimeEffect();
  
  if (typeof Petal !== 'undefined' && Array.isArray(particles)) {
    for (let i = 0; i < 45; i++) {
      const p = new Petal();
      p.x = Math.random() * (canvas ? canvas.width : window.innerWidth);
      p.y = -Math.random() * 250 - 20;
      p.size = Math.random() * 16 + 12;
      p.speedY = Math.random() * 2.8 + 1.8;
      p.speedX = Math.random() * 2.4 - 1.2;
      p.type = Math.random() > 0.4 ? 0 : 1;
      p.color = Math.random() > 0.5 ? '#ff2a54' : '#ff758f';
      particles.push(p);
    }
    setTimeout(() => {
      if (particles.length > PARTICLE_COUNT) {
        particles = particles.slice(0, PARTICLE_COUNT);
      }
    }, 8000);
  }

  showToast("Gửi ngàn đóa hồng thơm ngát & lời chúc 20/10 ngọt ngào nhất tới bạn! 🌹", "🌸");
}

if (footerRoseRainBtn) footerRoseRainBtn.addEventListener('click', triggerRoseRain);

// Các mẫu lời cảm ơn chuẩn dành cho người nhận
function getThankTemplates(sender) {
  const who = sender || "bạn";
  return [
    `💖 Cảm ơn ${who} rất nhiều! Tấm thiệp 20/10 thật đẹp, bất ngờ và ấm áp. Nhận được món quà tinh thần này mình rất vui và xúc động. Chúc ${who} luôn nhiều niềm vui, may mắn và an lành nhé! 🥰`,
    `🌸 Nhận được bức thiệp 20/10 của ${who} mà nụ cười nở rộ cả ngày hôm nay! Cảm ơn vì sự chu đáo, tinh tế và những lời chúc ngọt ngào này nhé. Chúc ${who} luôn hạnh phúc và gặt hái ngàn thành công! 🌷`,
    `✨ Cảm ơn ${who} vì tấm thiệp 20/10 vô cùng ý nghĩa! Món quà tinh thần ngọt ngào và đáng yêu nhất hôm nay. Cảm ơn bạn rất nhiều! 🥰`
  ];
}

// Mở modal gửi lời cảm ơn
function openThankYouModal() {
  const who = customSenderName || "Người Tặng";
  if (thankModalTitle) {
    thankModalTitle.textContent = `Gửi Lời Cảm Ơn Đến ${who}!`;
  }

  const templates = getThankTemplates(customSenderName);
  if (thankMessageInput) {
    thankMessageInput.value = templates[0];
  }

  if (sendInboxBtnText) {
    sendInboxBtnText.textContent = `💌 Gửi Vào Hòm Thư Của ${who}`;
  }

  if (thankYouModal) {
    thankYouModal.classList.remove('hidden');
  }
}

function closeThankYouModal() {
  if (thankYouModal) thankYouModal.classList.add('hidden');
}

if (closeThankModalBtn) closeThankModalBtn.addEventListener('click', closeThankYouModal);
if (thankModalBackdrop) thankModalBackdrop.addEventListener('click', closeThankYouModal);

// Chọn mẫu lời cảm ơn
if (thankChips) {
  thankChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      thankChips.forEach(c => c.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const idx = parseInt(e.currentTarget.getAttribute('data-thank-idx'), 10) || 0;
      const templates = getThankTemplates(customSenderName);
      if (thankMessageInput) {
        thankMessageInput.value = templates[idx];
      }
    });
  });
}

// ==========================================
// GỬI LỜI CẢM ƠN VÀO CƠ SỞ DỮ LIỆU ĐÁM MÂY
// ==========================================
const DEFAULT_INBOX_ID = "ff808181a09d98f701a1577c2b30253c";

async function saveThankYouToDatabase(inboxId, newMsg) {
  const targetId = inboxId || DEFAULT_INBOX_ID;

  // 1. Thử qua Vercel API (/api/inbox)
  try {
    const apiRes = await fetch('/api/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: targetId,
        message: newMsg
      })
    });
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && data.success) return true;
    }
  } catch (apiErr) {
    console.warn("API route error, trying direct database fallback:", apiErr);
  }

  // 2. Fallback trực tiếp vào Database Cloud REST API
  try {
    let messages = [];
    const getRes = await fetch(`https://api.restful-api.dev/objects/${targetId}`);
    if (getRes.ok) {
      const existingData = await getRes.json();
      if (existingData && existingData.data && Array.isArray(existingData.data.messages)) {
        messages = existingData.data.messages;
      }
    }
    messages.unshift(newMsg);

    const putRes = await fetch(`https://api.restful-api.dev/objects/${targetId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hop Thu 20/10',
        data: {
          updatedTime: new Date().toISOString(),
          messages: messages
        }
      })
    });
    return putRes.ok;
  } catch (dbErr) {
    console.error("Direct database error:", dbErr);
    return false;
  }
}

// Hành động gửi Hòm Thư Database
if (sendInboxActionBtn) {
  sendInboxActionBtn.addEventListener('click', async () => {
    const text = thankMessageInput ? thankMessageInput.value.trim() : '';
    if (!text) {
      showToast("Vui lòng nhập lời cảm ơn!", "⚠️");
      return;
    }

    const fromName = customRecipientName ? customRecipientName : "Người Nhận Ẩn Danh";
    const newMsg = {
      from: fromName,
      text: text,
      time: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
      timestamp: Date.now()
    };

    const originalText = sendInboxActionBtn.innerHTML;
    sendInboxActionBtn.disabled = true;
    sendInboxActionBtn.innerHTML = '<span>⏳ Đang gửi vào hòm thư...</span>';

    try {
      const success = await saveThankYouToDatabase(creatorInbox, newMsg);
      if (success) {
        showToast("Đã gửi lời cảm ơn vào hòm thư người tặng thành công! 💖", "💌");
        sendInboxActionBtn.innerHTML = '<span>✅ Đã gửi thành công!</span>';
      } else {
        throw new Error("Không thể kết nối cơ sở dữ liệu");
      }
    } catch (e) {
      copyToClipboard(text, "Đã sao chép lời cảm ơn! Hãy dán gửi cho người tặng nhé 💌", "💖");
    } finally {
      setTimeout(() => {
        sendInboxActionBtn.disabled = false;
        sendInboxActionBtn.innerHTML = originalText;
        triggerRoseRain();
        closeThankYouModal();
      }, 1000);
    }
  });
}

// Hành động chỉ copy lời nhắn
if (copyThankTextBtn) {
  copyThankTextBtn.addEventListener('click', () => {
    const text = thankMessageInput ? thankMessageInput.value.trim() : '';
    copyToClipboard(text, "Đã sao chép lời cảm ơn! Bạn có thể dán gửi ở bất cứ đâu 💌", "📋");
    triggerRoseRain();
    closeThankYouModal();
  });
}

if (thankSenderBtn) thankSenderBtn.addEventListener('click', openThankYouModal);
if (footerThankBtn) footerThankBtn.addEventListener('click', openThankYouModal);

// Sự kiện khi nhập tên người gửi (trong Popup QR)
if (senderNameInput) {
  senderNameInput.addEventListener('input', () => {
    customSenderName = senderNameInput.value.trim();
    
    // Cập nhật chữ ký người gửi trên thiệp theo thời gian thực
    if (letterSignature) {
      letterSignature.textContent = customSenderName 
        ? `Với tất cả sự trân quý & yêu thương từ ${customSenderName}!` 
        : "Với tất cả sự trân quý & yêu thương!";
    }
    const thankWho = customSenderName ? `Đến ${customSenderName}` : "Đến Người Tặng";
    if (thankSenderBtn) thankSenderBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${thankWho}</span>`;
    if (footerThankBtn) footerThankBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${thankWho}</span>`;

    // Cập nhật lại mã QR trong modal theo link mới
    const updatedUrl = generateShareUrl(customSenderName, customRecipientName);
    currentModalQrUrl = updatedUrl;
    if (qrTargetTag) {
      qrTargetTag.textContent = customSenderName 
        ? `💐 Thiệp 20/10 gửi tặng từ ${customSenderName} 💖` 
        : "💐 Chúc Mừng 20/10 Phụ Nữ Việt Nam 💖";
    }
    if (qrCodeContainer && typeof QRCode !== 'undefined') {
      qrCodeContainer.innerHTML = '';
      modalQrInstance = new QRCode(qrCodeContainer, {
        text: updatedUrl,
        width: 190,
        height: 190,
        colorDark: "#b5173f",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  });
}

// Nút mở Popup QR & Chia Sẻ trên Menu & Chân trang
if (navShareBtn) {
  navShareBtn.addEventListener('click', () => openQrModal());
}
if (footerShareBtn) {
  footerShareBtn.addEventListener('click', () => openQrModal());
}

// Modal QR Controls
if (closeQrModalBtn) {
  closeQrModalBtn.addEventListener('click', () => {
    if (qrModal) qrModal.classList.add('hidden');
  });
}

if (downloadQrBtn) {
  downloadQrBtn.addEventListener('click', () => {
    downloadQrFromElement(qrCodeContainer, "ma-qr-thiep-20-10.png");
  });
}

if (copyQrLinkBtn) {
  copyQrLinkBtn.addEventListener('click', () => {
    const link = currentModalQrUrl || generateShareUrl(customSenderName, customRecipientName);
    copyToClipboard(link, "Đã sao chép link thiệp chúc mừng!", "🔗");
  });
}

if (copyZaloMsgBtn) {
  copyZaloMsgBtn.addEventListener('click', () => {
    const link = currentModalQrUrl || generateShareUrl(customSenderName, customRecipientName);
    const msg = generateZaloMessage(link, customSenderName);
    copyToClipboard(msg, "Đã copy tin nhắn Zalo kèm link thiệp! Hãy dán gửi ngay nhé 💌", "💬");
  });
}

// ==========================================
// 8. RÚT THÔNG ĐIỆP MAY MẮN (FORTUNE CARDS)
// ==========================================
document.querySelectorAll('.fortune-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const isFlipped = card.classList.contains('flipped');
    
    if (!isFlipped) {
      card.classList.add('flipped');
      playChimeEffect();
      launchConfetti(30);
      const fortuneMsg = card.getAttribute('data-fortune');
      if (fortuneMsg) {
        showToast(fortuneMsg, "🎁");
      }
    } else {
      card.classList.remove('flipped');
    }
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ==========================================
// 9. NHẠC NỀN & ÂM THANH (WEB AUDIO API SYNTHESIZER)
// 100% Offline, không phụ thuộc file MP3 ngoài
// ==========================================
let audioCtx = null;
let isMusicPlaying = false;
let melodyInterval = null;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

const NOTE_FREQS = {
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77, 'C6': 1046.50
};

const ROMANTIC_MELODY = [
  'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'C5', 'D5',
  'E5', 'E5', 'G5', 'A5', 'C6', 'B5', 'A5', 'G5',
  'A5', 'G5', 'E5', 'D5', 'C5', 'D5', 'E5', 'C5'
];

function playChimeNote(freq, duration = 1.2, volume = 0.15) {
  if (!audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {}
}

function playChimeEffect() {
  initAudio();
  if (!audioCtx) return;
  const chords = [NOTE_FREQS['C5'], NOTE_FREQS['E5'], NOTE_FREQS['G5'], NOTE_FREQS['C6']];
  chords.forEach((note, index) => {
    setTimeout(() => {
      playChimeNote(note, 1.5, 0.18);
    }, index * 120);
  });
}

function toggleBackgroundMusic(forcePlay = null) {
  initAudio();
  if (forcePlay === true) {
    if (isMusicPlaying) return;
    isMusicPlaying = false;
  } else if (forcePlay === false) {
    if (!isMusicPlaying) return;
    isMusicPlaying = true;
  }

  isMusicPlaying = !isMusicPlaying;

  if (isMusicPlaying) {
    musicIcon.textContent = "🔊";
    musicWaves.classList.remove('paused');
    showToast("Đang phát giai điệu yêu thương...", "🎶");
    
    let noteIdx = 0;
    melodyInterval = setInterval(() => {
      const noteName = ROMANTIC_MELODY[noteIdx % ROMANTIC_MELODY.length];
      const freq = NOTE_FREQS[noteName];
      if (freq) {
        playChimeNote(freq, 1.4, 0.12);
      }
      noteIdx++;
    }, 450);
  } else {
    musicIcon.textContent = "🎵";
    musicWaves.classList.add('paused');
    if (melodyInterval) {
      clearInterval(melodyInterval);
      melodyInterval = null;
    }
    showToast("Đã tạm dừng nhạc nền", "🔇");
  }
}

if (musicToggle) musicToggle.addEventListener('click', toggleBackgroundMusic);

// ==========================================
// 10. CANVAS HIỆU ỨNG CÁNH HOA HỒNG & TRÁI TIM RƠI
// ==========================================
const canvas = document.getElementById('petalCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 38;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Petal {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * canvas.width;
    this.y = initial ? Math.random() * canvas.height : -20;
    this.size = Math.random() * 12 + 10;
    this.speedY = Math.random() * 1.2 + 0.8;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.flip = Math.random() * Math.PI;
    this.flipSpeed = Math.random() * 0.03 + 0.01;
    this.opacity = Math.random() * 0.5 + 0.45;
    this.type = Math.random() > 0.35 ? 0 : (Math.random() > 0.5 ? 1 : 2);
    this.color = Math.random() > 0.5 ? '#ff4d6d' : '#ff758f';
  }

  update() {
    this.y += this.speedY;
    this.x += Math.sin(this.y * 0.01) * 1.2 + this.speedX;
    this.rotation += this.rotationSpeed;
    this.flip += this.flipSpeed;

    if (this.y > canvas.height + 25 || this.x < -30 || this.x > canvas.width + 30) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.scale(Math.sin(this.flip), 1);
    ctx.globalAlpha = this.opacity;

    if (this.type === 0) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else if (this.type === 1) {
      const s = this.size * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.4);
      ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
      ctx.fillStyle = '#ff2a54';
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffb703';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#ffd166';
      ctx.fill();
    }

    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Petal());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ==========================================
// 11. PHÁO HOA & HIỆU ỨNG TƯƠNG TÁC CHẠM
// ==========================================
function launchConfetti(count = 50) {
  for (let i = 0; i < count; i++) {
    const confettiEl = document.createElement('div');
    confettiEl.style.position = 'fixed';
    confettiEl.style.zIndex = '999';
    confettiEl.style.pointerEvents = 'none';
    confettiEl.style.width = (Math.random() * 8 + 6) + 'px';
    confettiEl.style.height = (Math.random() * 12 + 8) + 'px';
    
    const colors = ['#ff4d6d', '#ff758f', '#ffb703', '#ffd166', '#c9184a', '#ffffff', '#7209b7'];
    confettiEl.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confettiEl.style.borderRadius = Math.random() > 0.5 ? '50%' : '3px';
    
    const startX = window.innerWidth / 2 + (Math.random() * 200 - 100);
    const startY = window.innerHeight * 0.45;
    confettiEl.style.left = startX + 'px';
    confettiEl.style.top = startY + 'px';

    document.body.appendChild(confettiEl);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 16 + 8;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity - 6;
    let opacity = 1;
    let posX = startX;
    let posY = startY;
    let rot = Math.random() * 360;

    const interval = setInterval(() => {
      posX += vx;
      posY += vy;
      vy += 0.5;
      vx *= 0.98;
      rot += 12;
      opacity -= 0.02;

      confettiEl.style.left = posX + 'px';
      confettiEl.style.top = posY + 'px';
      confettiEl.style.transform = `rotate(${rot}deg)`;
      confettiEl.style.opacity = opacity;

      if (opacity <= 0 || posY > window.innerHeight) {
        clearInterval(interval);
        confettiEl.remove();
      }
    }, 25);
  }
}

function triggerSparkleAtElement(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 8; i++) {
    const star = document.createElement('span');
    star.textContent = ['✨', '💖', '🌸', '⭐'][Math.floor(Math.random() * 4)];
    star.style.position = 'fixed';
    star.style.left = centerX + 'px';
    star.style.top = centerY + 'px';
    star.style.fontSize = (Math.random() * 12 + 12) + 'px';
    star.style.pointerEvents = 'none';
    star.style.zIndex = '1000';
    star.style.transition = 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)';
    document.body.appendChild(star);

    setTimeout(() => {
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 80 - 20;
      star.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(0)`;
      star.style.opacity = '0';
    }, 10);

    setTimeout(() => star.remove(), 650);
  }
}

// Chạm bất kỳ đâu trên màn hình tạo hoa và trái tim bay lên
document.addEventListener('pointerdown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const heart = document.createElement('div');
  heart.textContent = ['❤️', '💖', '🌸', '✨', '💐'][Math.floor(Math.random() * 5)];
  heart.style.position = 'fixed';
  heart.style.left = (e.clientX - 10) + 'px';
  heart.style.top = (e.clientY - 10) + 'px';
  heart.style.fontSize = (Math.random() * 10 + 16) + 'px';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '9999';
  heart.style.transition = 'transform 0.9s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.9s ease-out';
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${(Math.random() - 0.5) * 50}px, -60px) scale(1.3)`;
    heart.style.opacity = '0';
  });

  setTimeout(() => heart.remove(), 900);
});

// ==========================================
// 12. KHỞI CHẠY KHI TẢI TRANG
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initFromURL();
});
