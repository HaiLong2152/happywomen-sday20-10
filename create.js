/**
 * STUDIO TẠO THIỆP 20/10 - LOGIC (create.js)
 */

const UNIVERSAL_WISHES = [
  {
    title: "Mẫu 1: Dịu Dàng & Rạng Rỡ",
    wish: "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi ngàn lời chúc an lành, ngọt ngào và trân quý nhất tới bạn! Chúc những người phụ nữ thấy được tấm thiệp này luôn luôn xinh đẹp, hạnh phúc, được yêu thương và rạng rỡ mỗi ngày. Cảm ơn bạn vì đã luôn mang lại sự dịu dàng, nụ cười và biết bao điều tuyệt vời cho cuộc sống này!"
  },
  {
    title: "Mẫu 2: Tri Ân & Xứng Đáng",
    wish: "Nếu bạn đang đọc được những dòng chữ này, xin chúc bạn một ngày 20/10 thật bình yên và ngập tràn niềm vui! Dù bạn đang là người mẹ tảo tần, người vợ hiền dịu, người chị/em thân thương, cô giáo kính yêu hay người bạn tuyệt vời — bạn luôn là đóa hoa ngát hương, xứng đáng được nâng niu, trân trọng và hạnh phúc trọn đời!"
  },
  {
    title: "Mẫu 3: Nụ Cười & Bình Dị",
    wish: "Chúc cho nụ cười trên môi bạn mãi nở rộ, tự tin tỏa sáng theo cách riêng của mình. Mong bạn luôn tìm thấy niềm hạnh phúc từ những điều bình dị nhất, công việc hanh thông, ước mơ sớm thành hiện thực và luôn có những người thương yêu đồng hành bên cạnh!"
  },
  {
    title: "Mẫu 4: Nhan Sắc & Tự Chủ",
    wish: "Chúc bạn: Nhan sắc không tuổi, tâm hồn trẻ mãi, tài chính tự chủ và ngập tràn hạnh phúc! Bạn chính là món quà kỳ diệu và xinh đẹp nhất mà cuộc sống này tạo nên. Hãy luôn tự hào, yêu thương chính mình và tự tin bước về phía trước nhé!"
  },
  {
    title: "Mẫu 5: Ngọt Ngào & Bình An",
    wish: "Nhân ngày 20/10, xin gửi trao tới bạn tất cả sự ngọt ngào của thế giới! Chúc bạn luôn có những ngày tháng an nhiên, được sống là chính mình, được yêu thương vô điều kiện và nhận được thật nhiều hoa tươi, quà đẹp cùng những điều bất ngờ hạnh phúc hôm nay!"
  }
];

let selectedWishIdx = 0;
let studioQrInstance = null;

// DOM Elements
const recipientNameInput = document.getElementById('recipientName');
const senderNameInput = document.getElementById('senderName');
const wishChips = document.querySelectorAll('.wish-chip');
const wishPreviewText = document.getElementById('wishPreviewText');
const resultUrlInput = document.getElementById('resultUrlInput');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const zaloMsgText = document.getElementById('zaloMsgText');
const copyZaloBtn = document.getElementById('copyZaloBtn');
const openPreviewTabBtn = document.getElementById('openPreviewTabBtn');
const studioQrBox = document.getElementById('studioQrBox');
const downloadQrBtn = document.getElementById('downloadQrBtn');

const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');

function showToast(msg, icon = "🌸") {
  if (!toast) return;
  toastMsg.textContent = msg;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function copyToClipboard(text, msg = "Đã sao chép!", icon = "📋") {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast(msg, icon)).catch(() => fallbackCopy(text, msg, icon));
  } else {
    fallbackCopy(text, msg, icon);
  }
}

function fallbackCopy(text, msg, icon) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(msg, icon);
}

// Lấy Base URL trỏ về trang index.html
function getCardBaseUrl() {
  const origin = window.location.origin;
  const path = window.location.pathname;
  if (!origin || origin === 'null' || origin === 'file://') {
    return window.location.href.replace(/create\.html.*$/, 'index.html');
  }
  const cleanPath = path.replace(/\/create(\.html)?$/, '/');
  return `${origin}${cleanPath}`;
}

// Sinh URL cá nhân hóa
function buildPersonalizedUrl() {
  const base = getCardBaseUrl();
  const to = recipientNameInput ? recipientNameInput.value.trim() : '';
  const from = senderNameInput ? senderNameInput.value.trim() : '';
  
  const params = new URLSearchParams();
  if (to) params.set('to', to);
  if (from) params.set('from', from);
  if (selectedWishIdx > 0) params.set('wish', selectedWishIdx.toString());

  const query = params.toString();
  return query ? `${base}?${query}` : base;
}

// Sinh tin nhắn Zalo mẫu
function buildZaloMessage(url) {
  const to = recipientNameInput ? recipientNameInput.value.trim() : '';
  const from = senderNameInput ? senderNameInput.value.trim() : '';
  const toGreeting = to ? `Gửi ${to} yêu quý!` : "Chúc mừng Ngày Phụ Nữ Việt Nam 20/10!";
  const senderSignature = from ? `\n(Gửi tặng từ ${from})` : '';

  return `💐 ${toGreeting} 💖\n\nNhân ngày 20/10, chúc bạn luôn luôn xinh đẹp, hạnh phúc, được yêu thương và rạng rỡ mỗi ngày!\n\nCó một bức thiệp bất ngờ và món quà tinh thần dành riêng cho bạn tại đây:\n👉 ${url}\n\n(Chạm vào con dấu sáp màu đỏ trên màn hình để mở thiệp và rút thông điệp may mắn nhé!) 🌸${senderSignature}`;
}

// Vẽ mã QR trực tiếp
function renderStudioQr(url) {
  if (typeof QRCode === 'undefined' || !studioQrBox) return;
  studioQrBox.innerHTML = '';
  try {
    studioQrInstance = new QRCode(studioQrBox, {
      text: url,
      width: 160,
      height: 160,
      colorDark: "#c9184a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {}
}

// Cập nhật toàn bộ kết quả
function updateOutputs() {
  const url = buildPersonalizedUrl();
  if (resultUrlInput) resultUrlInput.value = url;

  const msg = buildZaloMessage(url);
  if (zaloMsgText) zaloMsgText.textContent = msg;

  renderStudioQr(url);
}

// Tải ảnh mã QR
function downloadQrCode() {
  if (!studioQrBox) return;
  const canvas = studioQrBox.querySelector('canvas');
  const toName = recipientNameInput ? recipientNameInput.value.trim() : '';
  const fileName = toName ? `ma-qr-thiep-20-10-${toName}.png` : 'ma-qr-thiep-20-10.png';

  if (canvas) {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Đã tải ảnh mã QR! Hãy in hoặc dán thiệp hoa nhé 🌸", "🖼️");
  } else {
    showToast("Đang tạo mã QR, vui lòng thử lại sau giây lát!", "⚠️");
  }
}

// Sự kiện
if (recipientNameInput) {
  recipientNameInput.addEventListener('input', updateOutputs);
}

if (senderNameInput) {
  senderNameInput.addEventListener('input', updateOutputs);
}

wishChips.forEach(chip => {
  chip.addEventListener('click', () => {
    wishChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedWishIdx = parseInt(chip.getAttribute('data-wish-idx')) || 0;
    
    if (wishPreviewText) {
      wishPreviewText.textContent = `"${UNIVERSAL_WISHES[selectedWishIdx].wish}"`;
    }
    updateOutputs();
  });
});

if (copyUrlBtn) {
  copyUrlBtn.addEventListener('click', () => {
    const url = resultUrlInput ? resultUrlInput.value : buildPersonalizedUrl();
    const to = recipientNameInput ? recipientNameInput.value.trim() : '';
    copyToClipboard(url, `Đã sao chép link riêng cho ${to || 'người nhận'}!`, "🔗");
  });
}

if (copyZaloBtn) {
  copyZaloBtn.addEventListener('click', () => {
    const msg = zaloMsgText ? zaloMsgText.textContent : '';
    copyToClipboard(msg, "Đã sao chép lời nhắn Zalo! Hãy dán gửi ngay nhé 💌", "💬");
  });
}

if (downloadQrBtn) {
  downloadQrBtn.addEventListener('click', downloadQrCode);
}

if (openPreviewTabBtn) {
  openPreviewTabBtn.addEventListener('click', () => {
    const url = buildPersonalizedUrl();
    window.open(url, '_blank');
  });
}

// Hiệu ứng cánh hoa rơi Canvas
const canvas = document.getElementById('petalCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const petals = [];
  for (let i = 0; i < 28; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 10 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.2 - 0.6,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      color: Math.random() > 0.5 ? '#ff4d6d' : '#ff758f'
    });
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petals.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) + p.speedX;
      p.flip += p.flipSpeed;
      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(Math.sin(p.flip), 1);
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.45;
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// Khởi chạy khi load
document.addEventListener('DOMContentLoaded', () => {
  updateOutputs();
});
