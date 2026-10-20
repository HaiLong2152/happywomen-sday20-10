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

// Cấu hình Hòm Thư Lời Cảm Ơn (Cơ Sở Dữ Liệu Đám Mây)
const DEFAULT_INBOX_ID = "ff808181a09d98f701a1577c2b30253c";
let currentInboxId = localStorage.getItem('thiep_inbox_id');
if (!currentInboxId || currentInboxId.startsWith('hop-thu-2010')) {
  currentInboxId = DEFAULT_INBOX_ID;
  localStorage.setItem('thiep_inbox_id', currentInboxId);
  createNewInboxOnDatabase();
}

const recipientNameInput = document.getElementById('recipientName');
const senderNameInput = document.getElementById('senderName');
const wishChips = document.querySelectorAll('.wish-chip');
const customWishText = document.getElementById('customWishText');
const inboxCodeInput = document.getElementById('inboxCodeInput');
const openInboxModalBtn = document.getElementById('openInboxModalBtn');
const inboxBadgeCount = document.getElementById('inboxBadgeCount');
const copyInboxBtn = document.getElementById('copyInboxBtn');

// Inbox Modal Elements
const inboxViewerModal = document.getElementById('inboxViewerModal');
const inboxModalBackdrop = document.getElementById('inboxModalBackdrop');
const closeInboxModalBtn = document.getElementById('closeInboxModalBtn');
const refreshInboxModalBtn = document.getElementById('refreshInboxModalBtn');
const openInboxStandaloneLink = document.getElementById('openInboxStandaloneLink');
const inboxModalFeed = document.getElementById('inboxModalFeed');
const inboxModalSubtitle = document.getElementById('inboxModalSubtitle');

const resultUrlInput = document.getElementById('resultUrlInput');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const zaloMsgText = document.getElementById('zaloMsgText');
const copyZaloBtn = document.getElementById('copyZaloBtn');
const openZaloChatBtn = document.getElementById('openZaloChatBtn');
const openPreviewTabBtn = document.getElementById('openPreviewTabBtn');
const studioQrBox = document.getElementById('studioQrBox');
const shareQrBtn = document.getElementById('shareQrBtn');
const copyQrImageBtn = document.getElementById('copyQrImageBtn');
const downloadQrBtn = document.getElementById('downloadQrBtn');

// Khởi tạo giá trị ban đầu cho hộp thư và lời chúc
updateInboxUI();
checkInboxBadgeCount();

if (customWishText) {
  customWishText.value = UNIVERSAL_WISHES[0].wish;
}

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
  const wishContent = customWishText ? customWishText.value.trim() : '';
  const defaultWish = UNIVERSAL_WISHES[selectedWishIdx].wish.trim();
  
  const params = new URLSearchParams();
  if (to) params.set('to', to);
  if (from) params.set('from', from);

  // Nếu người tạo chỉnh sửa lời chúc khác mẫu mặc định: truyền param msg
  if (wishContent && wishContent !== defaultWish) {
    params.set('msg', wishContent);
  } else if (selectedWishIdx > 0) {
    params.set('wish', selectedWishIdx.toString());
  }

  // Cấu hình đích nhận lời cảm ơn: Hộp Thư Bí Mật riêng
  if (currentInboxId) params.set('inbox', currentInboxId);

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

// Vẽ mã QR trực tiếp độ phân giải cao
function renderStudioQr(url) {
  if (typeof QRCode === 'undefined' || !studioQrBox) return;
  studioQrBox.innerHTML = '';
  try {
    studioQrInstance = new QRCode(studioQrBox, {
      text: url,
      width: 260,
      height: 260,
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

// Vẽ bo góc tương thích mọi trình duyệt
function drawCanvasRoundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.fill();
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// Sinh bức thiệp ảnh QR trang trí đầy đủ (Sẵn sàng gửi thẳng vào Zalo/Mess)
function generateDecoratedQrCardCanvas() {
  if (!studioQrBox) return null;
  const qrCanvas = studioQrBox.querySelector('canvas');
  if (!qrCanvas) return null;

  const to = recipientNameInput ? recipientNameInput.value.trim() : '';
  const from = senderNameInput ? senderNameInput.value.trim() : '';

  const w = 540;
  const h = 680;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Nền gradient hoa hồng pastel trang nhã
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#ffffff');
  grad.addColorStop(0.4, '#fff5f7');
  grad.addColorStop(1, '#ffe3e8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Khung viền đôi sang trọng
  ctx.strokeStyle = '#ff758f';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, w - 32, h - 32);

  ctx.strokeStyle = '#c9184a';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(22, 22, w - 44, h - 44);

  // Icon hoa góc
  ctx.font = '22px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🌸', 42, 42);
  ctx.fillText('🌸', w - 42, 42);
  ctx.fillText('🌹', 42, h - 42);
  ctx.fillText('🌹', w - 42, h - 42);

  // Tiêu đề sự kiện
  ctx.fillStyle = '#a4133c';
  ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('✨ 20 · 10 · PHỤ NỮ VIỆT NAM ✨', w / 2, 60);

  // Lời nhắn đề tặng
  ctx.fillStyle = '#7a2e39';
  ctx.font = 'italic 15px "Segoe UI", Arial, sans-serif';
  ctx.fillText('Món quà tinh thần đặc biệt dành tặng', w / 2, 95);

  ctx.fillStyle = '#c9184a';
  ctx.font = 'bold 24px "Playfair Display", Georgia, "Times New Roman", serif';
  const recipientText = to ? `💐 ${to} 💖` : '💐 Người Phụ Nữ Tuyệt Vời 💖';
  ctx.fillText(recipientText, w / 2, 132);

  // Khung trắng bo góc chứa mã QR
  const qrBoxSize = 280;
  const qrBoxX = (w - qrBoxSize) / 2;
  const qrBoxY = 165;

  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffccd5';
  ctx.lineWidth = 2;
  drawCanvasRoundRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 20);

  // Vẽ mã QR vào giữa khung trắng
  const qrInnerSize = 240;
  const qrInnerX = (w - qrInnerSize) / 2;
  const qrInnerY = qrBoxY + (qrBoxSize - qrInnerSize) / 2;
  ctx.drawImage(qrCanvas, qrInnerX, qrInnerY, qrInnerSize, qrInnerSize);

  // Hướng dẫn mở thiệp
  ctx.fillStyle = '#c9184a';
  ctx.font = 'bold 15px "Segoe UI", Arial, sans-serif';
  ctx.fillText('📱 Dùng Camera hoặc Zalo quét mã để mở thiệp', w / 2, 485);

  ctx.fillStyle = '#6b404c';
  ctx.font = 'italic 13px "Segoe UI", Arial, sans-serif';
  ctx.fillText('(Chạm vào con dấu sáp màu đỏ để mở phong thư bí mật)', w / 2, 514);

  // Chữ ký người gửi
  ctx.fillStyle = '#a4133c';
  ctx.font = 'italic bold 15px "Segoe UI", Arial, sans-serif';
  const senderText = from ? `Gửi tặng với tất cả yêu thương từ: ${from} 💌` : 'Trân quý & Yêu thương! 🌸';
  ctx.fillText(senderText, w / 2, 565);

  return canvas;
}

// Lấy Blob của thiệp ảnh QR
function getDecoratedQrBlob() {
  return new Promise((resolve) => {
    const canvas = generateDecoratedQrCardCanvas();
    if (!canvas) {
      resolve(null);
      return;
    }
    if (canvas.toBlob) {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    } else {
      const dataUrl = canvas.toDataURL('image/png');
      const binStr = atob(dataUrl.split(',')[1]);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      resolve(new Blob([arr], { type: 'image/png' }));
    }
  });
}

// Sao chép ảnh thiệp QR vào Clipboard (để dán Ctrl+V vào Zalo/Mess ngay)
async function copyQrImageToClipboard(existingBlob = null) {
  try {
    const blob = existingBlob || await getDecoratedQrBlob();
    if (!blob) {
      showToast("Mã QR chưa sẵn sàng, vui lòng thử lại!", "⚠️");
      return false;
    }

    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      showToast("Đã copy ảnh thiệp QR! Hãy mở Zalo/Messenger nhấn Ctrl+V để gửi ngay nhé 💌", "📋");
      return true;
    } else {
      throw new Error("ClipboardItem not supported");
    }
  } catch (err) {
    console.warn("Không thể sao chép ảnh vào clipboard:", err);
    showToast("Trình duyệt không cho phép dán ảnh tự động, đang tải ảnh về máy!", "🖼️");
    downloadQrCode();
    return false;
  }
}

// Gửi nhanh ảnh thiệp QR (Web Share API trên Mobile hoặc copy ảnh trên PC)
async function shareQrImage() {
  const toName = recipientNameInput ? recipientNameInput.value.trim() : '';
  const fromName = senderNameInput ? senderNameInput.value.trim() : '';
  const url = buildPersonalizedUrl();
  const fileName = toName ? `thiep-qr-20-10-${toName}.png` : 'thiep-qr-20-10.png';

  showToast("Đang chuẩn bị gửi ảnh thiệp QR...", "⏳");
  const blob = await getDecoratedQrBlob();
  if (!blob) {
    showToast("Mã QR chưa sẵn sàng, vui lòng thử lại sau giây lát!", "⚠️");
    return;
  }

  // 1. Thử gửi trực tiếp qua Web Share API (Cực kỳ nhạy trên Smartphone iOS / Android)
  if (navigator.canShare) {
    try {
      const file = new File([blob], fileName, { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `💐 Thiệp 20/10 gửi tặng ${toName || 'bạn'} 💖`,
          text: `Nhân ngày 20/10, gửi tặng ${toName || 'bạn'} món quà tinh thần đặc biệt!\n👉 Mở thiệp tại: ${url}`
        });
        showToast("Đã chia sẻ ảnh thiệp QR thành công! 🌸", "🚀");
        return;
      }
    } catch (shareErr) {
      if (shareErr.name === 'AbortError') {
        return; // Người dùng ấn hủy trên bảng chia sẻ
      }
      console.warn("Web Share API không khả dụng với file:", shareErr);
    }
  }

  // 2. Nếu trên máy tính hoặc trình duyệt không hỗ trợ gửi file trực tiếp:
  // Sao chép thẳng ảnh vào Clipboard (Bộ nhớ tạm) để người dùng chỉ cần nhấn Ctrl+V vào ô chat Zalo/Messenger!
  const copied = await copyQrImageToClipboard(blob);
  if (!copied) {
    downloadQrCode();
  }
}

// Tải ảnh thiệp QR về máy
function downloadQrCode() {
  const canvas = generateDecoratedQrCardCanvas() || (studioQrBox ? studioQrBox.querySelector('canvas') : null);
  if (!canvas) {
    showToast("Đang tạo mã QR, vui lòng thử lại sau giây lát!", "⚠️");
    return;
  }
  const toName = recipientNameInput ? recipientNameInput.value.trim() : '';
  const fileName = toName ? `thiep-qr-20-10-${toName}.png` : 'thiep-qr-20-10.png';

  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("Đã tải ảnh thiệp QR! Hãy gửi hoặc in dán hộp quà nhé 🌸", "🖼️");
}

// Sự kiện
if (recipientNameInput) {
  recipientNameInput.addEventListener('input', updateOutputs);
}

if (senderNameInput) {
  senderNameInput.addEventListener('input', updateOutputs);
}

if (customWishText) {
  customWishText.addEventListener('input', updateOutputs);
}

// ==========================================
// QUẢN LÝ HÒM THƯ DATABASE ĐÁM MÂY
// ==========================================
async function createNewInboxOnDatabase() {
  try {
    let newId = null;
    try {
      const apiRes = await fetch('/api/inbox?action=create', { method: 'POST' });
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data && data.success && data.id) newId = data.id;
      }
    } catch (e) {}

    if (!newId) {
      const dbRes = await fetch('https://api.restful-api.dev/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Hop Thu 20/10', data: { messages: [] } })
      });
      if (dbRes.ok) {
        const dbData = await dbRes.json();
        if (dbData && dbData.id) newId = dbData.id;
      }
    }

    if (newId) {
      currentInboxId = newId;
      localStorage.setItem('thiep_inbox_id', newId);
      updateInboxUI();
      updateOutputs();
      checkInboxBadgeCount();
    }
  } catch (err) {
    console.warn("Could not create dynamic inbox, using default:", err);
  }
}

function getInboxPageUrl() {
  const origin = window.location.origin;
  const cleanPath = window.location.pathname.replace(/\/create(\.html)?$/, '/inbox.html');
  if (!origin || origin === 'null' || origin === 'file://') {
    return window.location.href.replace(/create\.html.*$/, 'inbox.html') + '?id=' + currentInboxId;
  }
  return `${origin}${cleanPath}?id=${currentInboxId}`;
}

function updateInboxUI() {
  const url = getInboxPageUrl();
  if (inboxCodeInput) inboxCodeInput.value = url;
  if (openInboxStandaloneLink) openInboxStandaloneLink.href = url;
}

// Kiểm tra số lượng tin nhắn trong hòm thư để cập nhật badge
async function checkInboxBadgeCount() {
  try {
    let count = 0;
    try {
      const apiRes = await fetch(`/api/inbox?id=${currentInboxId}`, { cache: 'no-store' });
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.success && typeof data.count === 'number') count = data.count;
      }
    } catch (e) {}

    if (count === 0) {
      const dbRes = await fetch(`https://api.restful-api.dev/objects/${currentInboxId}`);
      if (dbRes.ok) {
        const dbData = await dbRes.json();
        if (dbData && dbData.data && Array.isArray(dbData.data.messages)) {
          count = dbData.data.messages.length;
        }
      }
    }

    if (inboxBadgeCount) {
      inboxBadgeCount.textContent = count;
      if (count > 0) {
        inboxBadgeCount.style.background = '#ff2a54';
        inboxBadgeCount.style.color = '#ffffff';
      }
    }
  } catch (e) {}
}

// Modal Xem Hòm Thư Trực Tiếp
async function openInboxModal() {
  if (inboxViewerModal) inboxViewerModal.classList.remove('hidden');
  updateInboxUI();
  await loadInboxModalMessages();
}

function closeInboxModal() {
  if (inboxViewerModal) inboxViewerModal.classList.add('hidden');
}

async function loadInboxModalMessages() {
  if (!inboxModalFeed) return;
  inboxModalFeed.innerHTML = `
    <div style="text-align: center; padding: 30px 10px; color: var(--muted-text);">
      <div style="font-size: 2rem; margin-bottom: 8px;">⏳</div>
      <div>Đang kết nối cơ sở dữ liệu và tải lời cảm ơn...</div>
    </div>
  `;
  if (inboxModalSubtitle) inboxModalSubtitle.textContent = "Đang kiểm tra tin nhắn mới...";

  try {
    let messages = [];
    try {
      const apiRes = await fetch(`/api/inbox?id=${currentInboxId}`, { cache: 'no-store' });
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.success && Array.isArray(data.messages)) {
          messages = data.messages;
        }
      }
    } catch (e) {}

    if (messages.length === 0) {
      const dbRes = await fetch(`https://api.restful-api.dev/objects/${currentInboxId}`);
      if (dbRes.ok) {
        const dbData = await dbRes.json();
        if (dbData && dbData.data && Array.isArray(dbData.data.messages)) {
          messages = dbData.data.messages;
        }
      }
    }

    if (inboxBadgeCount) {
      inboxBadgeCount.textContent = messages.length;
      if (messages.length > 0) {
        inboxBadgeCount.style.background = '#ff2a54';
        inboxBadgeCount.style.color = '#ffffff';
      }
    }

    if (inboxModalSubtitle) {
      inboxModalSubtitle.textContent = messages.length > 0 
        ? `Đã nhận được ${messages.length} lời cảm ơn từ người nhận!`
        : "Chưa có lời cảm ơn nào trong hòm thư của bạn.";
    }

    if (messages.length === 0) {
      inboxModalFeed.innerHTML = `
        <div style="text-align: center; padding: 30px 16px; background: #fff8f9; border-radius: 14px; border: 1.5px dashed var(--soft-rose);">
          <div style="font-size: 2.5rem; margin-bottom: 8px;">🌸</div>
          <div style="font-weight: 700; color: var(--deep-rose); margin-bottom: 4px;">Hòm thư hiện đang trống</div>
          <p style="font-size: 0.85rem; color: var(--muted-text); margin: 0; line-height: 1.4;">
            Khi người nhận mở thiệp và bấm nút <strong>[Gửi Lời Cảm Ơn Đến Người Tặng]</strong>, bức thư cảm ơn sẽ lập tức xuất hiện tại đây để bạn đọc nhé!
          </p>
        </div>
      `;
      return;
    }

    inboxModalFeed.innerHTML = messages.map(m => `
      <div style="background: white; border: 1px solid var(--soft-rose); border-radius: 14px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px dashed #ffd6de; padding-bottom: 6px;">
          <span style="font-weight: 700; color: var(--deep-rose); font-size: 0.9rem;">
            💖 Từ: ${escapeHtml(m.from || 'Người Nhận')}
          </span>
          <span style="font-size: 0.76rem; color: var(--muted-text); font-family: monospace;">
            ${escapeHtml(m.time || '')}
          </span>
        </div>
        <div style="font-size: 0.92rem; color: #2b1118; line-height: 1.5; white-space: pre-wrap; background: #fff8f9; padding: 10px 12px; border-radius: 8px;">
          ${escapeHtml(m.text || '')}
        </div>
      </div>
    `).join('');
  } catch (err) {
    inboxModalFeed.innerHTML = `
      <div style="text-align: center; padding: 20px; color: var(--deep-rose);">
        ⚠️ Không thể tải hòm thư. Vui lòng bấm Làm Mới để thử lại.
      </div>
    `;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

if (copyInboxBtn && inboxCodeInput) {
  copyInboxBtn.addEventListener('click', () => {
    copyToClipboard(inboxCodeInput.value, "Đã sao chép link Hòm Thư Lời Cảm Ơn của bạn! Hãy lưu lại để mở xem tin nhắn nhé 📬", "📬");
  });
}

if (openInboxModalBtn) {
  openInboxModalBtn.addEventListener('click', openInboxModal);
}

if (closeInboxModalBtn) {
  closeInboxModalBtn.addEventListener('click', closeInboxModal);
}

if (inboxModalBackdrop) {
  inboxModalBackdrop.addEventListener('click', closeInboxModal);
}

if (refreshInboxModalBtn) {
  refreshInboxModalBtn.addEventListener('click', () => {
    loadInboxModalMessages();
    showToast("Đang làm mới hòm thư...", "🔄");
  });
}

wishChips.forEach(chip => {
  chip.addEventListener('click', () => {
    wishChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectedWishIdx = parseInt(chip.getAttribute('data-wish-idx')) || 0;
    
    if (customWishText) {
      customWishText.value = UNIVERSAL_WISHES[selectedWishIdx].wish;
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

if (openZaloChatBtn) {
  openZaloChatBtn.addEventListener('click', () => {
    const msg = zaloMsgText ? zaloMsgText.textContent : '';
    copyToClipboard(msg, "Đã sao chép lời nhắn! Đang mở Zalo Web...", "💬");
    setTimeout(() => {
      window.open('https://chat.zalo.me/', '_blank');
    }, 450);
  });
}

if (shareQrBtn) {
  shareQrBtn.addEventListener('click', shareQrImage);
}

if (copyQrImageBtn) {
  copyQrImageBtn.addEventListener('click', () => {
    copyQrImageToClipboard();
  });
}

if (studioQrBox) {
  studioQrBox.addEventListener('click', shareQrImage);
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

