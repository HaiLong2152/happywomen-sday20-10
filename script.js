/**
 * 20/10 GREETING WEBSITE - INTERACTIVE LOGIC
 * Features:
 * - Separate Personalized Links per Role (?role=mother, lover, sister, teacher, colleague)
 * - Recipient Mode: Pure viewing and emotional experience (zero role selection clutter)
 * - Sender Hub: Quick 1-click link dispatcher + custom name generator + pre-written Zalo messages
 * - Interactive 3D Envelope with Wax Seal, Chime & Confetti
 * - Romantic Music Box Synthesizer (Web Audio API)
 * - HTML5 Canvas Falling Petals & Hearts
 * - Fortune Cards (Rút thông điệp may mắn)
 */

// ==========================================
// 1. DATA: LỜI CHÚC, TRÍCH DẪN & HÌNH ẢNH THEO VAI TRÒ
// ==========================================
const WISHES_DATABASE = {
  mother: {
    title: "Mẹ Kính Yêu ❤️",
    shortRole: "Mẹ",
    photo: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    caption: "\"Thế giới có hàng triệu đóa hoa, nhưng với con, Mẹ là đóa hoa thơm ngát và cao quý nhất!\"",
    wishes: [
      "Nhân ngày 20/10, con xin kính chúc Mẹ luôn tràn đầy sức khỏe, bình an và mãi giữ nụ cười hiền hậu trên môi. Cảm ơn Mẹ đã luôn là điểm tựa ấm áp nhất, hy sinh cả đời vì hạnh phúc của gia đình chúng con!",
      "Mẹ ơi, con chúc Mẹ một ngày 20/10 thật nhiều niềm vui! Dù ở xa hay gần, trong trái tim con Mẹ luôn là người phụ nữ đẹp nhất, vĩ đại nhất và tuyệt vời nhất trần đời.",
      "Kính chúc Mẹ yêu quý của con luôn an khang, an vui và hạnh phúc bên con cháu. Mong từng ngày trôi qua với Mẹ đều nhẹ nhàng, ấm áp và ngập tràn tình yêu thương!"
    ],
    quotes: [
      "\"Thế giới có hàng triệu bông hoa, nhưng với con, Mẹ là đóa hoa ngát hương và cao quý nhất.\"",
      "\"Đi khắp thế gian không ai tốt bằng Mẹ. Gánh nặng cuộc đời không ai khổ bằng Cha.\"",
      "\"Tình yêu của Mẹ là bến đỗ bình yên nhất sau mọi giông bão cuộc đời.\""
    ]
  },
  lover: {
    title: "Vợ / Người Yêu Tuyệt Vời 💖",
    shortRole: "Em yêu",
    photo: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop",
    caption: "\"Vì nụ cười của em là ánh dương ngọt ngào nhất sưởi ấm trái tim anh!\"",
    wishes: [
      "Chúc em yêu một ngày 20/10 thật ngọt ngào, rạng rỡ và tràn ngập niềm vui! Cảm ơn em đã bước vào cuộc đời anh, mang đến biết bao tiếng cười và yêu thương đong đầy.",
      "Gửi người con gái anh yêu nhất: Chúc em luôn xinh đẹp, tươi trẻ và mãi giữ nét rạng ngời như đóa hoa sớm mai. Anh sẽ luôn ở bên cạnh, chở che và yêu thương em mỗi ngày!",
      "Nhân ngày Phụ nữ Việt Nam, chúc em vạn sự như ý, công việc hanh thông và luôn cảm thấy hạnh phúc, bình yên khi ở bên anh nhé!"
    ],
    quotes: [
      "\"Em không cần phải là người hoàn hảo nhất, bởi vì với anh, em luôn là điều tuyệt vời nhất.\"",
      "\"Gặp được em là điều may mắn, yêu em là sự lựa chọn hạnh phúc nhất của đời anh.\"",
      "\"Chúc cho nụ cười trên môi em luôn rạng rỡ như ánh dương ban mai.\""
    ]
  },
  sister: {
    title: "Chị / Em Gái Đáng Yêu 👧",
    shortRole: "Chị / Em",
    photo: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop",
    caption: "\"Chúc cô gái luôn tươi vui, tự tin, rực rỡ và gặt hái ngàn thành công!\"",
    wishes: [
      "Chúc chị/em gái ngày 20/10 luôn tươi trẻ, xinh đẹp, nhiều người theo đuổi và sớm đạt được mọi ước mơ hoài bão trong học tập cũng như sự nghiệp!",
      "20/10 chúc chị/em mãi luôn vui vẻ, bớt cau có lại nhé! Chúc cho tuổi thanh xuân của chị/em luôn rực rỡ, may mắn và ngập tràn những trải nghiệm tuyệt vời.",
      "Gửi ngàn lời chúc tốt đẹp nhất tới cô gái đáng yêu! Chúc chị/em luôn tự tin, độc lập, hạnh phúc và nhận được thật nhiều quà trong ngày hôm nay!"
    ],
    quotes: [
      "\"Hãy luôn tự tin tỏa sáng theo cách riêng của mình, bởi bạn là duy nhất!\"",
      "\"Thanh xuân rực rỡ nhất là khi bạn biết yêu thương chính mình và mỉm cười mỗi ngày.\""
    ]
  },
  teacher: {
    title: "Cô Giáo Kính Mến 👩‍🏫",
    shortRole: "Cô giáo",
    photo: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
    caption: "\"Tri ân ngọn lửa tri thức và tình yêu thương bao la của Cô giáo kính mến!\"",
    wishes: [
      "Nhân ngày 20/10, chúng em xin gửi lời tri ân sâu sắc và lòng biết ơn chân thành nhất tới Cô. Kính chúc Cô luôn mạnh khỏe, hạnh phúc và mãi giữ ngọn lửa nhiệt huyết với sự nghiệp trồng người cao quý!",
      "Cảm ơn Cô đã luôn ân cần chỉ bảo, truyền cảm hứng và trao cho chúng em đôi cánh tri thức. Chúc Cô có một ngày 20/10 ngập tràn hoa thơm, niềm vui và những lời chúc ý nghĩa nhất!",
      "Kính chúc Cô giáo luôn tươi trẻ, công tác tốt và luôn là người thuyền trưởng vững tay chèo dẫn dắt các thế hệ học trò cập bến tương lai!"
    ],
    quotes: [
      "\"Dưới ánh sáng mặt trời, không có nghề nào cao quý hơn nghề dạy học.\"",
      "\"Một chữ cũng là thầy, nửa chữ cũng là thầy. Cảm ơn Cô vì tất cả những bài học quý giá!\""
    ]
  },
  colleague: {
    title: "Bạn Bè & Đồng Nghiệp Tuyệt Vời ✨",
    shortRole: "Bạn",
    photo: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800&auto=format&fit=crop",
    caption: "\"Phụ nữ hiện đại: Tự tin, bản lĩnh, duyên dáng và luôn tỏa sáng rực rỡ!\"",
    wishes: [
      "Chúc phái đẹp ngày 20/10 nhận được thật nhiều hoa, nhiều quà và ngập tràn niềm vui! Chúc bạn công việc thăng tiến, KPI về đích sớm và luôn giữ trọn nét rạng rỡ, năng động!",
      "Chúc người bạn/đồng nghiệp tuyệt vời luôn tươi tắn, trẻ trung, tài chính rủng rỉnh và gặp thật nhiều may mắn trong công việc lẫn cuộc sống!",
      "Ngày 20/10 chúc bạn luôn xinh đẹp, tự tin, hạnh phúc và luôn là nguồn năng lượng tích cực tỏa sáng cho mọi người xung quanh!"
    ],
    quotes: [
      "\"Phụ nữ hiện đại: Xinh đẹp, bản lĩnh, độc lập và luôn làm chủ cuộc sống của mình!\"",
      "\"Chúc bạn mỗi ngày đi làm là một ngày tràn ngập niềm vui và thành tựu rực rỡ!\""
    ]
  }
};

// ==========================================
// 2. STATE & DOM ELEMENTS
// ==========================================
let currentRole = 'mother';
let currentWishIndex = 0;
let currentQuoteIndex = 0;
let customName = '';
let senderName = '';
let isEnvelopeOpened = false;
let isRecipientMode = false;
let isPreviewMode = false;

// Trạng thái cho tab Tùy chỉnh (Builder)
let builderRole = 'mother';
let builderWishIdx = 0;

// DOM Elements
const previewBanner = document.getElementById('previewBanner');
const previewTargetName = document.getElementById('previewTargetName');
const exitPreviewBtn = document.getElementById('exitPreviewBtn');

const welcomePhotoModal = document.getElementById('welcomePhotoModal');
const closeWelcomeModalBtn = document.getElementById('closeWelcomeModalBtn');
const welcomeRecipientName = document.getElementById('welcomeRecipientName');
const photoUploadSlot = document.getElementById('photoUploadSlot');
const slotIdle = document.getElementById('slotIdle');
const slotPreview = document.getElementById('slotPreview');
const welcomePreviewImg = document.getElementById('welcomePreviewImg');
const welcomePhotoFileInput = document.getElementById('welcomePhotoFileInput');
const confirmWelcomePhotoBtn = document.getElementById('confirmWelcomePhotoBtn');
const skipWelcomePhotoBtn = document.getElementById('skipWelcomePhotoBtn');
const recipientChangePhotoBtn = document.getElementById('recipientChangePhotoBtn');
const recipientStamp = document.getElementById('recipientStamp');
const stampImg = document.getElementById('stampImg');

const qrModal = document.getElementById('qrModal');
const closeQrModalBtn = document.getElementById('closeQrModalBtn');
const qrModalTitle = document.getElementById('qrModalTitle');
const qrModalDesc = document.getElementById('qrModalDesc');
const qrCodeContainer = document.getElementById('qrCodeContainer');
const qrTargetTag = document.getElementById('qrTargetTag');
const downloadQrBtn = document.getElementById('downloadQrBtn');
const copyQrLinkBtn = document.getElementById('copyQrLinkBtn');

const builderQrCodeBox = document.getElementById('builderQrCodeBox');
const downloadBuilderQrBtn = document.getElementById('downloadBuilderQrBtn');
const enlargeBuilderQrBtn = document.getElementById('enlargeBuilderQrBtn');

const brandBadgeText = document.getElementById('brandBadgeText');
const navActionBtn = document.getElementById('navActionBtn');
const navActionIcon = document.getElementById('navActionIcon');
const navActionText = document.getElementById('navActionText');

const heroTag = document.getElementById('heroTag');
const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');

const senderHubSection = document.getElementById('senderHubSection');
const tabQuickBtn = document.getElementById('tabQuickBtn');
const tabCustomBtn = document.getElementById('tabCustomBtn');
const quickLinksPanel = document.getElementById('quickLinksPanel');
const customLinksPanel = document.getElementById('customLinksPanel');

const builderRecipientName = document.getElementById('builderRecipientName');
const builderSenderName = document.getElementById('builderSenderName');
const builderWishPreview = document.getElementById('builderWishPreview');
const generatedLinkInput = document.getElementById('generatedLinkInput');
const copyGeneratedLinkBtn = document.getElementById('copyGeneratedLinkBtn');
const zaloMessageContent = document.getElementById('zaloMessageContent');
const copyZaloMsgBtn = document.getElementById('copyZaloMsgBtn');
const previewCustomCardBtn = document.getElementById('previewCustomCardBtn');

const recipientGreeting = document.getElementById('recipientGreeting');
const wishContent = document.getElementById('wishContent');
const quoteContent = document.getElementById('quoteContent');
const envelope = document.getElementById('envelope');
const waxSeal = document.getElementById('waxSeal');
const envelopeHint = document.getElementById('envelopeHint');
const thankSenderBtn = document.getElementById('thankSenderBtn');
const randomWishBtn = document.getElementById('randomWishBtn');
const copyWishBtn = document.getElementById('copyWishBtn');
const fireworksBtn = document.getElementById('fireworksBtn');

const photoDisplay = document.getElementById('photoDisplay');
const photoCaption = document.getElementById('photoCaption');
const frameControls = document.getElementById('frameControls');
const imageUploadInput = document.getElementById('imageUploadInput');
const resetPhotoBtn = document.getElementById('resetPhotoBtn');

const footerBlessing = document.getElementById('footerBlessing');
const recipientFooterCta = document.getElementById('recipientFooterCta');
const recipientThankFooterBtn = document.getElementById('recipientThankFooterBtn');
const recipientFireworksBtn = document.getElementById('recipientFireworksBtn');
const openCreatorBtn = document.getElementById('openCreatorBtn');
const senderFooterButtons = document.getElementById('senderFooterButtons');
const quickCopyWish = document.getElementById('quickCopyWish');
const quickSharePage = document.getElementById('quickSharePage');

const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicWaves = document.getElementById('musicWaves');

const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');

// QR Code Instances
let builderQrInstance = null;
let modalQrInstance = null;
let currentModalQrUrl = '';

// Recipient Custom Photo
let recipientPhotoData = null;
try {
  recipientPhotoData = sessionStorage.getItem('recipient_photo');
} catch (e) {}

// Typewriter state
let typewriterTimeout = null;

// ==========================================
// 3. TIỆN ÍCH URL & SINH NỘI DUNG CHIA SẺ
// ==========================================
function getBaseUrl() {
  if (window.location.origin && window.location.origin !== 'null' && window.location.origin !== 'file://') {
    return window.location.origin + window.location.pathname;
  }
  return window.location.href.split('?')[0];
}

function generateUrl(roleKey, name = '', wishIdx = 0, sender = '') {
  const base = getBaseUrl();
  const params = new URLSearchParams();
  if (roleKey) params.set('role', roleKey);
  if (name && name.trim()) params.set('to', name.trim());
  if (wishIdx > 0) params.set('wish', wishIdx.toString());
  if (sender && sender.trim()) params.set('from', sender.trim());
  return `${base}?${params.toString()}`;
}

function generateZaloMessage(roleKey, name = '', url = '', sender = '') {
  const roleData = WISHES_DATABASE[roleKey] || WISHES_DATABASE.mother;
  const targetName = name.trim() || roleData.shortRole;
  const senderSignature = sender.trim() ? `\n(Gửi tặng từ ${sender.trim()})` : '';

  switch (roleKey) {
    case 'mother':
      return `💐 Kính gửi ${targetName} kính yêu!\nNhân ngày Phụ nữ Việt Nam 20/10, con xin kính chúc Mẹ luôn dồi dào sức khỏe, an khang và tràn ngập niềm vui bên gia đình.\n\nCon có một tấm thiệp nhỏ ấm áp gửi tặng Mẹ tại đây:\n👉 ${url}\n\n(Mẹ chạm vào con dấu sáp màu đỏ trên màn hình để mở thiệp nhé!) ❤️${senderSignature}`;
    case 'lover':
      return `💖 Gửi ${targetName} - Người con gái anh yêu nhất!\nNhân ngày 20/10, chúc em luôn xinh đẹp, ngọt ngào và hạnh phúc ngập tràn bên anh.\n\nAnh có một món quà bí mật và tấm thiệp dành riêng cho em tại đây:\n👉 ${url}\n\n(Em chạm vào con dấu sáp đỏ để mở thiệp bất ngờ nhé!) 🥰${senderSignature}`;
    case 'sister':
      return `🌸 Gửi ${targetName} đáng yêu!\nChúc mừng ngày 20/10! Chúc chị/em luôn tươi trẻ, xinh xắn, tự tin và nhận được thật nhiều quà xinh xắn hôm nay nhé.\n\nCó một tấm thiệp bí mật gửi riêng cho chị/em tại đây:\n👉 ${url}\n\n(Chạm vào con dấu sáp đỏ để mở thiệp nha!) 🎉${senderSignature}`;
    case 'teacher':
      return `💐 Kính gửi Cô giáo ${targetName}!\nNhân ngày Phụ nữ Việt Nam 20/10, chúng em xin kính chúc Cô luôn mạnh khỏe, hạnh phúc và mãi giữ ngọn lửa nhiệt huyết với sự nghiệp trồng người cao quý.\n\nChúng em có tấm thiệp tri ân gửi tặng Cô tại đây:\n👉 ${url}\n\n(Kính mời Cô chạm vào con dấu sáp để mở thiệp ạ!) 🌹${senderSignature}`;
    case 'colleague':
    default:
      return `✨ Gửi ${targetName} tuyệt vời!\nNhân ngày 20/10, chúc bạn luôn rạng rỡ, tự tin, công việc hanh thông, KPI về đích sớm và ngập tràn niềm vui!\n\nCó một món quà tinh thần đặc biệt gửi tặng bạn tại đây:\n👉 ${url}\n\n(Chạm vào mở thiệp và rút thông điệp may mắn 20/10 nhé!) 🎁${senderSignature}`;
  }
}

function copyToClipboard(text, successMsg = "Đã sao chép!", icon = "📋") {
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

// ==========================================
// 4. KHỞI TẠO & PHÂN BIỆT CHẾ ĐỘ NGƯỜI NHẬN VS NGƯỜI GỬI
// ==========================================
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const roleParam = urlParams.get('role');
  const toParam = urlParams.get('to') || urlParams.get('name');
  const fromParam = urlParams.get('from') || urlParams.get('sender');
  const wishParam = urlParams.get('wish');
  const modeParam = urlParams.get('mode');

  // Xác định chế độ:
  // Nếu có ?role=... hoặc ?to=... (và không cố tình đặt mode=create), bật Chế Độ Người Nhận
  const hasRecipientParams = Boolean(roleParam || toParam);

  if (modeParam === 'preview') {
    isPreviewMode = true;
    isRecipientMode = true;
  } else if (modeParam === 'create') {
    isRecipientMode = false;
    isPreviewMode = false;
  } else if (hasRecipientParams) {
    isRecipientMode = true;
    isPreviewMode = false;
  } else {
    // Truy cập link gốc (người tạo thiệp mở trang để lấy link gửi mọi người)
    isRecipientMode = false;
    isPreviewMode = false;
  }

  // Cài đặt Role
  if (roleParam && WISHES_DATABASE[roleParam]) {
    currentRole = roleParam;
  } else {
    currentRole = 'mother';
  }

  // Cài đặt Tên người nhận
  if (toParam) {
    customName = decodeURIComponent(toParam).trim();
  } else {
    customName = '';
  }

  // Cài đặt Tên người gửi
  if (fromParam) {
    senderName = decodeURIComponent(fromParam).trim();
  } else {
    senderName = '';
  }

  // Cài đặt mẫu lời chúc
  if (wishParam !== null && !isNaN(parseInt(wishParam))) {
    currentWishIndex = Math.abs(parseInt(wishParam)) % WISHES_DATABASE[currentRole].wishes.length;
  } else {
    currentWishIndex = 0;
  }

  // Đồng bộ sang Builder
  builderRole = currentRole;
  builderWishIdx = currentWishIndex;
  if (builderRecipientName) builderRecipientName.value = customName;
  if (builderSenderName) builderSenderName.value = senderName;

  // Cập nhật giao diện theo chế độ
  applyModeDisplay();
  updateGreetingDisplay();
  updateWishDisplay();
  updatePhotoDisplay();
  updateBuilderOutputs();

  // Kiểm tra hiển thị Modal chào đón ảnh nếu là Người Nhận
  if (isRecipientMode && !isPreviewMode) {
    checkWelcomePhotoModal();
  }
}

// Cập nhật giao diện Người Nhận vs Người Gửi
function applyModeDisplay() {
  if (isRecipientMode) {
    // CHẾ ĐỘ NGƯỜI NHẬN: ẨN TOÀN BỘ PHẦN CHỌN ROLE & TẠO THIỆP
    document.body.classList.add('recipient-view-active');

    if (senderHubSection) senderHubSection.classList.add('hidden');
    if (randomWishBtn) randomWishBtn.classList.add('hidden');
    if (frameControls) frameControls.classList.add('hidden');
    if (senderFooterButtons) senderFooterButtons.classList.add('hidden');
    if (recipientFooterCta) recipientFooterCta.classList.remove('hidden');
    if (thankSenderBtn) thankSenderBtn.classList.remove('hidden');

    // Nút trên thanh Menu tiện ích
    if (navActionIcon) navActionIcon.textContent = '✨';
    if (navActionText) navActionText.textContent = 'Tạo Thiệp Mới';
    if (navActionBtn) navActionBtn.title = 'Tạo thiệp gửi tặng người thân yêu';

    // Hero Tag cá nhân hóa
    if (customName) {
      heroTag.textContent = `💖 Món quà 20/10 dành riêng cho ${customName} 💖`;
    } else {
      heroTag.textContent = `🌸 Món quà 20/10 gửi tặng ${WISHES_DATABASE[currentRole].title} 🌸`;
    }

    // Gợi ý mở phong bì thân thiện
    envelopeHint.innerHTML = '👇 Chạm vào con dấu sáp <strong>[MỞ THIỆP]</strong> để mở món quà bí mật dành riêng cho bạn!';

    // Lời chúc chân trang
    if (customName) {
      footerBlessing.textContent = `"Chúc ${customName} một ngày 20/10 luôn xinh đẹp, rạng rỡ và ngập tràn hạnh phúc!" 🌷`;
    } else {
      footerBlessing.textContent = `"Kính chúc ${WISHES_DATABASE[currentRole].title} luôn dồi dào sức khỏe, an yên và hạnh phúc!" 🌷`;
    }

    // Hiển thị thanh Banner Xem Trước (nếu người gửi bấm Xem Thử)
    if (isPreviewMode) {
      previewBanner.classList.remove('hidden');
      previewTargetName.textContent = customName || WISHES_DATABASE[currentRole].title;
    } else {
      previewBanner.classList.add('hidden');
    }
  } else {
    // CHẾ ĐỘ NGƯỜI TẠO (SENDER): HIỆN BẢNG TẠO LINK ĐỂ GỬI TỪNG NGƯỜI
    document.body.classList.remove('recipient-view-active');

    if (senderHubSection) senderHubSection.classList.remove('hidden');
    if (randomWishBtn) randomWishBtn.classList.remove('hidden');
    if (frameControls) frameControls.classList.remove('hidden');
    if (senderFooterButtons) senderFooterButtons.classList.remove('hidden');
    if (recipientFooterCta) recipientFooterCta.classList.add('hidden');
    if (thankSenderBtn) thankSenderBtn.classList.add('hidden');
    if (previewBanner) previewBanner.classList.add('hidden');

    if (navActionIcon) navActionIcon.textContent = '👁️';
    if (navActionText) navActionText.textContent = 'Xem Thử Thiệp';
    if (navActionBtn) navActionBtn.title = 'Xem trước giao diện người nhận';

    heroTag.textContent = '🌸 Bảng Tạo & Gửi Thiệp 20/10 🌸';
    envelopeHint.innerHTML = '👇 Chạm vào con dấu sáp <strong>[MỞ THIỆP]</strong> để xem thử nội dung thiệp chúc!';
    footerBlessing.textContent = '"Chúc tất cả phụ nữ Việt Nam luôn là những đóa hoa rạng rỡ nhất trần đời!" 🌷';
  }
}

// Cập nhật tiêu đề thư gửi
function updateGreetingDisplay() {
  if (customName) {
    recipientGreeting.textContent = `Gửi: ${customName} ❤️`;
  } else {
    recipientGreeting.textContent = `Gửi: ${WISHES_DATABASE[currentRole].title}`;
  }

  // Cập nhật chữ ký người gửi (nếu có)
  const signatureSpan = document.querySelector('.letter-signature span:first-child');
  if (signatureSpan) {
    if (senderName) {
      signatureSpan.textContent = `Với tất cả sự trân quý & yêu thương từ ${senderName}!`;
    } else {
      signatureSpan.textContent = "Với tất cả sự trân quý & yêu thương!";
    }
  }

  // Cập nhật nút cảm ơn
  if (thankSenderBtn) {
    thankSenderBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${senderName ? 'Đến ' + senderName : ''}</span>`;
  }
  if (recipientThankFooterBtn) {
    recipientThankFooterBtn.innerHTML = `<span>💖 Gửi Lời Cảm Ơn ${senderName ? 'Đến ' + senderName : 'Đến Người Tặng'}</span>`;
  }
}

// Cập nhật nội dung lời chúc & trích dẫn
function updateWishDisplay() {
  const roleData = WISHES_DATABASE[currentRole];
  wishContent.textContent = roleData.wishes[currentWishIndex % roleData.wishes.length];
  quoteContent.textContent = roleData.quotes[currentQuoteIndex % roleData.quotes.length];
}

// Cập nhật hình ảnh theo vai trò
function updatePhotoDisplay() {
  if (recipientPhotoData) {
    photoDisplay.src = recipientPhotoData;
    if (stampImg) stampImg.src = recipientPhotoData;
    photoCaption.textContent = `Khoảnh khắc rạng rỡ và đẹp nhất của ${customName || 'bạn'}! ✨`;
    return;
  }

  const roleData = WISHES_DATABASE[currentRole];
  if (roleData && roleData.photo) {
    photoDisplay.src = roleData.photo;
    if (stampImg) stampImg.src = roleData.photo;
    photoCaption.textContent = roleData.caption;
  }
}

// Hiệu ứng chữ gõ tay từng dòng (Typewriter effect)
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

// Cập nhật kết quả sinh link, tin nhắn & mã QR trong Builder Tab
function updateBuilderOutputs() {
  const roleKey = builderRole;
  const name = builderRecipientName ? builderRecipientName.value.trim() : '';
  const sender = builderSenderName ? builderSenderName.value.trim() : '';
  const wishIdx = builderWishIdx;

  // Lời chúc xem trước
  const roleData = WISHES_DATABASE[roleKey] || WISHES_DATABASE.mother;
  if (builderWishPreview) {
    builderWishPreview.textContent = `"${roleData.wishes[wishIdx % roleData.wishes.length]}"`;
  }

  // Sinh Link
  const link = generateUrl(roleKey, name, wishIdx, sender);
  if (generatedLinkInput) {
    generatedLinkInput.value = link;
  }

  // Sinh Lời Nhắn Zalo
  const zaloMsg = generateZaloMessage(roleKey, name, link, sender);
  if (zaloMessageContent) {
    zaloMessageContent.textContent = zaloMsg;
  }

  // Vẽ Mã QR trực tiếp trong Builder
  renderBuilderMiniQr(link);
}

// Vẽ Mã QR mini trong Builder
function renderBuilderMiniQr(url) {
  if (typeof QRCode === 'undefined' || !builderQrCodeBox) return;
  builderQrCodeBox.innerHTML = '';
  try {
    builderQrInstance = new QRCode(builderQrCodeBox, {
      text: url,
      width: 130,
      height: 130,
      colorDark: "#c9184a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (err) {
    // QRCode safe error handling
  }
}

// Mở Modal Mã QR phóng to
function openQrModal(url, roleTitle, targetName = '') {
  currentModalQrUrl = url;
  const displayName = targetName || roleTitle;
  if (qrModalTitle) qrModalTitle.textContent = `Mã QR Thiệp: ${displayName}`;
  if (qrTargetTag) qrTargetTag.textContent = `Gửi: ${displayName} ❤️`;

  if (qrCodeContainer && typeof QRCode !== 'undefined') {
    qrCodeContainer.innerHTML = '';
    modalQrInstance = new QRCode(qrCodeContainer, {
      text: url,
      width: 200,
      height: 200,
      colorDark: "#b5173f",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  if (qrModal) qrModal.classList.remove('hidden');
}

// Tải ảnh mã QR về máy (PNG)
function downloadQrFromElement(containerEl, fileName = "thiep-20-10-qr.png") {
  if (!containerEl) return;
  const canvas = containerEl.querySelector('canvas');
  if (canvas) {
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = fileName;
    link.href = dataUrl;
    link.click();
    showToast("Đã tải ảnh mã QR thành công! Hãy in hoặc dán thiệp hoa nhé 🌸", "🖼️");
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

// Kiểm tra hiển thị Modal Chào Đón & Đính Kèm Ảnh
function checkWelcomePhotoModal() {
  try {
    const handled = sessionStorage.getItem('welcome_handled');
    if (handled || recipientPhotoData) return;

    if (welcomeRecipientName) {
      welcomeRecipientName.textContent = customName || (WISHES_DATABASE[currentRole] ? WISHES_DATABASE[currentRole].shortRole : "Bạn");
    }
    if (welcomePhotoModal) {
      welcomePhotoModal.classList.remove('hidden');
    }
  } catch (e) {}
}

// Áp dụng ảnh người nhận tải lên
function applyRecipientPhoto(dataUrl) {
  recipientPhotoData = dataUrl;
  try {
    sessionStorage.setItem('recipient_photo', dataUrl);
  } catch (e) {}

  if (photoDisplay) photoDisplay.src = dataUrl;
  if (stampImg) stampImg.src = dataUrl;
  if (photoCaption) photoCaption.textContent = `Khoảnh khắc rạng rỡ và đẹp nhất của ${customName || 'bạn'}! ✨`;
  showToast("Đã đính kèm ảnh của bạn vào thiệp chúc mừng!", "📷");
}

// Gửi lời cảm ơn người tặng
function sendThankYouMessage() {
  const who = senderName ? senderName : "bạn";
  const thankText = senderName
    ? `💖 Cảm ơn ${senderName} rất nhiều! Tấm thiệp 20/10 thật đẹp, bất ngờ và xúc động. Chúc ${senderName} luôn nhiều niềm vui và hạnh phúc nhé! 🥰`
    : `💖 Cảm ơn bạn rất nhiều! Tấm thiệp 20/10 thật đẹp, ngọt ngào và xúc động. Mình rất vui và hạnh phúc khi nhận được món quà này! 🥰`;

  copyToClipboard(thankText, `✨ Đã sao chép lời cảm ơn! Hãy dán gửi lại cho ${who} qua Zalo nhé 💌`, "💖");
  launchConfetti(80);
}

// Chuyển sang xem thử thiệp người nhận
function previewRecipient(roleKey, name = '', wishIdx = 0, sender = '') {
  currentRole = roleKey;
  customName = name.trim();
  senderName = sender.trim();
  currentWishIndex = wishIdx;
  currentQuoteIndex = 0;

  isRecipientMode = true;
  isPreviewMode = true;

  applyModeDisplay();
  updateGreetingDisplay();
  updateWishDisplay();
  updatePhotoDisplay();

  // Mở sẵn phong thư hoặc cuộn mượt đến phong thư
  openEnvelope();
  envelope.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast(`Đang xem trước thiệp cho: ${customName || WISHES_DATABASE[roleKey].title}`, "👁️");
}

// Thoát xem trước, quay lại Bảng Tạo Link
function exitPreview() {
  isRecipientMode = false;
  isPreviewMode = false;
  applyModeDisplay();
  if (senderHubSection) {
    senderHubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  showToast("Đã quay lại Bảng Tạo Link!", "✏️");
}

// ==========================================
// 5. SỰ KIỆN TƯƠNG TÁC (TAB & BUILDER & ROLE CARDS)
// ==========================================

// Tab Chuyển đổi trong Sender Hub
if (tabQuickBtn && tabCustomBtn) {
  tabQuickBtn.addEventListener('click', () => {
    tabQuickBtn.classList.add('active');
    tabQuickBtn.setAttribute('aria-selected', 'true');
    tabCustomBtn.classList.remove('active');
    tabCustomBtn.setAttribute('aria-selected', 'false');
    quickLinksPanel.classList.remove('hidden');
    customLinksPanel.classList.add('hidden');
  });

  tabCustomBtn.addEventListener('click', () => {
    tabCustomBtn.classList.add('active');
    tabCustomBtn.setAttribute('aria-selected', 'true');
    tabQuickBtn.classList.remove('active');
    tabQuickBtn.setAttribute('aria-selected', 'false');
    customLinksPanel.classList.remove('hidden');
    quickLinksPanel.classList.add('hidden');
    updateBuilderOutputs();
  });
}

// Xử lý các nút trong Tab 1: Quick Roles Grid
document.querySelectorAll('.copy-role-link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    const url = generateUrl(role);
    const roleTitle = WISHES_DATABASE[role] ? WISHES_DATABASE[role].title : role;
    copyToClipboard(url, `Đã chép link gửi cho ${roleTitle}!`, "🔗");
  });
});

document.querySelectorAll('.copy-role-msg-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    const url = generateUrl(role);
    const msg = generateZaloMessage(role, '', url, '');
    const roleTitle = WISHES_DATABASE[role] ? WISHES_DATABASE[role].title : role;
    copyToClipboard(msg, `Đã copy trọn bộ lời nhắn Zalo gửi ${roleTitle}!`, "💬");
  });
});

document.querySelectorAll('.show-role-qr-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    const url = generateUrl(role);
    const roleTitle = WISHES_DATABASE[role] ? WISHES_DATABASE[role].title : role;
    openQrModal(url, roleTitle, '');
  });
});

document.querySelectorAll('.preview-role-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    previewRecipient(role, '', 0, '');
  });
});

// Xử lý Tab 2: Custom Builder
document.querySelectorAll('[data-builder-role]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('[data-builder-role]').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    builderRole = chip.getAttribute('data-builder-role');
    
    // Đồng bộ vào thiệp preview dưới
    currentRole = builderRole;
    updatePhotoDisplay();
    updateGreetingDisplay();
    updateWishDisplay();
    updateBuilderOutputs();
  });
});

if (builderRecipientName) {
  builderRecipientName.addEventListener('input', () => {
    customName = builderRecipientName.value.trim();
    updateGreetingDisplay();
    updateBuilderOutputs();
  });
}

if (builderSenderName) {
  builderSenderName.addEventListener('input', () => {
    senderName = builderSenderName.value.trim();
    updateGreetingDisplay();
    updateBuilderOutputs();
  });
}

document.querySelectorAll('.wish-opt-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.wish-opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    builderWishIdx = parseInt(btn.getAttribute('data-wish-idx')) || 0;
    currentWishIndex = builderWishIdx;
    updateWishDisplay();
    updateBuilderOutputs();
  });
});

if (copyGeneratedLinkBtn) {
  copyGeneratedLinkBtn.addEventListener('click', () => {
    const link = generatedLinkInput.value;
    const name = builderRecipientName.value.trim();
    copyToClipboard(link, `Đã chép link riêng cho ${name || 'người nhận'}!`, "🔗");
  });
}

if (copyZaloMsgBtn) {
  copyZaloMsgBtn.addEventListener('click', () => {
    const msg = zaloMessageContent.textContent;
    copyToClipboard(msg, "Đã chép lời nhắn Zalo! Hãy dán gửi ngay nhé 💌", "💬");
  });
}

if (previewCustomCardBtn) {
  previewCustomCardBtn.addEventListener('click', () => {
    previewRecipient(builderRole, builderRecipientName.value, builderWishIdx, builderSenderName.value);
  });
}

// Các nút QR trong Builder
if (downloadBuilderQrBtn) {
  downloadBuilderQrBtn.addEventListener('click', () => {
    const targetName = builderRecipientName.value.trim() || 'thiep-20-10';
    downloadQrFromElement(builderQrCodeBox, `ma-qr-${targetName}.png`);
  });
}

if (enlargeBuilderQrBtn) {
  enlargeBuilderQrBtn.addEventListener('click', () => {
    const link = generatedLinkInput.value;
    const name = builderRecipientName.value.trim();
    const roleTitle = WISHES_DATABASE[builderRole] ? WISHES_DATABASE[builderRole].title : builderRole;
    openQrModal(link, roleTitle, name);
  });
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
    if (currentModalQrUrl) {
      copyToClipboard(currentModalQrUrl, "Đã sao chép link quét mã QR!", "🔗");
    }
  });
}

// Modal Chào Đón & Đính Kèm Ảnh Người Nhận
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
    setTimeout(() => {
      openEnvelope();
    }, 400);
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

if (recipientChangePhotoBtn) {
  recipientChangePhotoBtn.addEventListener('click', () => {
    if (imageUploadInput) imageUploadInput.click();
  });
}

// Nút Cảm Ơn
if (thankSenderBtn) {
  thankSenderBtn.addEventListener('click', sendThankYouMessage);
}
if (recipientThankFooterBtn) {
  recipientThankFooterBtn.addEventListener('click', sendThankYouMessage);
}

// Nút Thoát Xem Trước
if (exitPreviewBtn) {
  exitPreviewBtn.addEventListener('click', exitPreview);
}

// Nút Mở Tạo Thiệp từ Footer hoặc Menu
function openCreatorMode() {
  isRecipientMode = false;
  isPreviewMode = false;
  applyModeDisplay();
  if (senderHubSection) {
    senderHubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

if (openCreatorBtn) {
  openCreatorBtn.addEventListener('click', openCreatorMode);
}

if (navActionBtn) {
  navActionBtn.addEventListener('click', () => {
    if (isRecipientMode) {
      openCreatorMode();
    } else {
      previewRecipient(builderRole, builderRecipientName.value, builderWishIdx, builderSenderName.value);
    }
  });
}

// Đổi lời chúc ngẫu nhiên (chỉ hiện trong Chế độ Tạo)
if (randomWishBtn) {
  randomWishBtn.addEventListener('click', (e) => {
    const roleData = WISHES_DATABASE[currentRole];
    currentWishIndex = (currentWishIndex + 1) % roleData.wishes.length;
    currentQuoteIndex = (currentQuoteIndex + 1) % roleData.quotes.length;
    updateWishDisplay();
    triggerSparkleAtElement(e.currentTarget);
    showToast("Đã đổi lời chúc mới!", "✨");
  });
}

// Mở phong bì (Envelope)
function openEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;
  envelope.classList.add('is-open');
  envelopeHint.textContent = "💖 Thiệp chúc đã được mở ra với trọn vẹn yêu thương!";
  
  // Tự động phát nhạc nền nhẹ nhàng
  toggleBackgroundMusic(true);

  // Hiệu ứng âm thanh chuông và pháo hoa giấy
  playChimeEffect();
  launchConfetti(80);

  // Hiệu ứng chữ gõ tay nắn nót
  const roleData = WISHES_DATABASE[currentRole];
  const fullWish = roleData.wishes[currentWishIndex % roleData.wishes.length];
  startTypewriterEffect(fullWish);
}

if (waxSeal) {
  waxSeal.addEventListener('click', openEnvelope);
  waxSeal.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openEnvelope();
    }
  });
}

// Bắn pháo hoa
if (fireworksBtn) {
  fireworksBtn.addEventListener('click', () => {
    launchConfetti(120);
    showToast("🎆 Pháo hoa rực rỡ chúc mừng 20/10!", "🌸");
  });
}

if (recipientFireworksBtn) {
  recipientFireworksBtn.addEventListener('click', () => {
    launchConfetti(120);
    showToast("🎆 Chúc bạn ngày 20/10 ngập tràn niềm vui rực rỡ!", "💐");
  });
}

// Sao chép nội dung lời chúc
function copyWishText() {
  const greeting = recipientGreeting.textContent;
  const wish = wishContent.textContent;
  const quote = quoteContent.textContent;
  const fullText = `💐 CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10 💐\n\n${greeting}\n\n${wish}\n\n${quote}\n\n✨ Chúc bạn có một ngày 20/10 ngập tràn niềm vui và hạnh phúc! ✨`;
  copyToClipboard(fullText, "Đã sao chép lời chúc! Hãy gửi ngay qua Zalo nhé 💌", "📋");
}

if (copyWishBtn) copyWishBtn.addEventListener('click', copyWishText);
if (quickCopyWish) quickCopyWish.addEventListener('click', copyWishText);
if (quickSharePage) {
  quickSharePage.addEventListener('click', () => {
    const link = generateUrl(currentRole, customName, currentWishIndex, senderName);
    copyToClipboard(link, "Đã sao chép liên kết thiệp!", "🔗");
  });
}

// ==========================================
// 6. RÚT THÔNG ĐIỆP MAY MẮN (FORTUNE CARDS)
// ==========================================
document.querySelectorAll('.fortune-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
    launchConfetti(25);
    const fortuneMsg = card.getAttribute('data-fortune');
    if (card.classList.contains('flipped') && fortuneMsg) {
      showToast(fortuneMsg, "🎁");
    }
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });
});

// ==========================================
// 7. TẢI ẢNH KỶ NIỆM (LOCAL PREVIEW CHO NGƯỜI TẠO)
// ==========================================
if (imageUploadInput) {
  imageUploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        applyRecipientPhoto(evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
}

if (resetPhotoBtn) {
  resetPhotoBtn.addEventListener('click', () => {
    recipientPhotoData = null;
    try {
      sessionStorage.removeItem('recipient_photo');
    } catch (e) {}
    updatePhotoDisplay();
    if (imageUploadInput) imageUploadInput.value = '';
    showToast("Đã đặt lại ảnh mặc định theo vai trò!", "🌸");
  });
}

// ==========================================
// 8. NHẠC NỀN & ÂM THANH (WEB AUDIO API SYNTHESIZER)
// Không cần file MP3 bên ngoài, hoạt động mượt mà 100% offline!
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

// Bảng nốt nhạc giai điệu lãng mạn nhẹ nhàng (Music Box Chime)
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

    // Envelope tiếng chuông / music box trong trẻo
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    // Audio context safely handled
  }
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
    isMusicPlaying = false; // will be toggled to true below
  } else if (forcePlay === false) {
    if (!isMusicPlaying) return;
    isMusicPlaying = true; // will be toggled to false below
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

musicToggle.addEventListener('click', toggleBackgroundMusic);

// ==========================================
// 9. CANVAS HIỆU ỨNG CÁNH HOA HỒNG RƠI & TRÁI TIM
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
    // 0: Cánh hoa hồng, 1: Trái tim nhỏ, 2: Bụi sao lấp lánh
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
      // Cánh hoa hồng cong mềm mại
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
      ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else if (this.type === 1) {
      // Trái tim nhỏ
      const s = this.size * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s, -s * 0.5, -s * 1.2, s * 0.6, 0, s * 1.4);
      ctx.bezierCurveTo(s * 1.2, s * 0.6, s, -s * 0.5, 0, s * 0.3);
      ctx.fillStyle = '#ff2a54';
      ctx.fill();
    } else {
      // Bụi vàng lấp lánh
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
// 10. PHÁO HOA & CONFETTI TỰ TẠO
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
      vy += 0.5; // gravity
      vx *= 0.98; // air drag
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

// Hiệu ứng tia lấp lánh khi bấm vào nút
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

// Chạm bất kỳ đâu trên màn hình tạo trái tim bay lên
document.addEventListener('pointerdown', (e) => {
  // Không kích hoạt trên các input gõ chữ
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

// Khởi chạy khi tài liệu tải xong
document.addEventListener('DOMContentLoaded', () => {
  initFromURL();
});

