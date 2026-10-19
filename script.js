/**
 * 20/10 GREETING WEBSITE - INTERACTIVE LOGIC
 * Features:
 * - Dynamic Wishes & Role Switcher
 * - Personalized URL query params (?to=Name&role=lover)
 * - Canvas Falling Rose Petals & Particle Physics
 * - Interactive Click Sparkles & Heart Bursts
 * - Envelope Unsealing & Confetti Animation
 * - Built-in Web Audio API Romantic Chime Synthesizer
 * - Custom Photo Upload Preview
 * - One-click Copy & Sharing
 */

// ==========================================
// 1. DATA: LỜI CHÚC & TRÍCH DẪN THEO ĐỐI TƯỢNG
// ==========================================
const WISHES_DATABASE = {
  mother: {
    title: "Mẹ Kính Yêu ❤️",
    wishes: [
      "Nhân ngày 20/10, con xin kính chúc Mẹ luôn tràn đầy sức khỏe, bình an và mãi giữ nụ cười hiền hậu trên môi. Cảm ơn Mẹ đã luôn là điểm tựa ấm áp nhất, hy sinh cả đời vì hạnh phúc của gia đình chúng con!",
      "Mẹ ơi, con chúc Mẹ một ngày 20/10 thật nhiều niềm vui! Dù ở xa hay gần, trong trái tim con Mẹ luôn là người phụ nữ đẹp nhất, vĩ đại nhất và tuyệt vời nhất trần đời.",
      "Kính chúc Mẹ yêu quý của con luôn an khang, vui vẻ bên con cháu. Mong từng ngày trôi qua với Mẹ đều nhẹ nhàng, ấm áp và ngập tràn hạnh phúc!"
    ],
    quotes: [
      "\"Thế giới có hàng triệu bông hoa, nhưng với con, Mẹ là đóa hoa ngát hương và cao quý nhất.\"",
      "\"Đi khắp thế gian không ai tốt bằng Mẹ. Gánh nặng cuộc đời không ai khổ bằng Cha.\"",
      "\"Tình yêu của Mẹ là bến đỗ bình yên nhất sau mọi giông bão cuộc đời.\""
    ]
  },
  lover: {
    title: "Vợ / Người Yêu Tuyệt Vời 💖",
    wishes: [
      "Chúc em yêu một ngày 20/10 thật ngọt ngào, rạng rỡ và tràn ngập niềm vui! Cảm ơn em đã bước vào cuộc đời anh, mang đến biết bao tiếng cười và yêu thương đong đầy.",
      "Gửi người con gái anh yêu nhất: Chúc em luôn xinh đẹp, trẻ trung và mãi giữ nét rạng ngời như đóa hoa sớm mai. Anh sẽ luôn ở bên cạnh, lắng nghe và yêu thương em mỗi ngày!",
      "Nhân ngày Phụ nữ Việt Nam, chúc em vạn sự như ý, công việc hanh thông và luôn cảm thấy hạnh phúc, bình yên bên cạnh anh nhé!"
    ],
    quotes: [
      "\"Em không cần phải là người hoàn hảo nhất, bởi vì với anh, em luôn là điều tuyệt vời nhất.\"",
      "\"Gặp được em là điều may mắn, yêu em là sự lựa chọn hạnh phúc nhất của đời anh.\"",
      "\"Chúc cho nụ cười trên môi em luôn rạng rỡ như ánh dương ban mai.\""
    ]
  },
  sister: {
    title: "Chị / Em Gái Đáng Yêu 👧",
    wishes: [
      "Chúc chị/em gái của tôi ngày 20/10 luôn tươi trẻ, xinh đẹp, nhiều người theo đuổi và sớm đạt được mọi ước mơ hoài bão trong học tập cũng như sự nghiệp!",
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
    wishes: [
      "Nhân ngày 20/10, chúng em xin gửi lời tri ân sâu sắc và lòng biết ơn chân thành nhất tới Cô. Kính chúc Cô luôn mạnh khỏe, hạnh phúc và mãi giữ ngọn lửa nhiệt huyết với sự nghiệp trồng người cao quý!",
      "Cảm ơn Cô đã luôn ân cần chỉ bảo, truyền cảm hứng và trao cho chúng em đôi cánh tri thức. Chúc Cô có một ngày 20/10 ngập tràn hoa thơm, niềm vui và những lời chúc ý nghĩa nhất!",
      "Kính chúc Cô giáo luôn trẻ trung, công tác tốt và luôn là người thuyền trưởng vững tay chèo dẫn dắt các thế hệ học trò cập bến tương lai!"
    ],
    quotes: [
      "\"Dưới ánh sáng mặt trời, không có nghề nào cao quý hơn nghề dạy học.\"",
      "\"Một chữ cũng là thầy, nửa chữ cũng là thầy. Cảm ơn Cô vì tất cả những bài học quý giá!\""
    ]
  },
  colleague: {
    title: "Bạn Bè & Đồng Nghiệp Tuyệt Vời ✨",
    wishes: [
      "Chúc phái đẹp văn phòng ngày 20/10 nhận được thật nhiều hoa, nhiều quà và ngập tràn niềm vui! Chúc bạn công việc thăng tiến, KPI về đích sớm và luôn giữ trọn nét rạng rỡ, năng động!",
      "Chúc người bạn/đồng nghiệp tuyệt vời luôn tươi tắn, trẻ trung, tài chính rủng rỉnh và gặp thật nhiều may mắn trong công việc lẫn cuộc sống!",
      "Ngày 20/10 chúc bạn luôn xinh đẹp, tự tin, hạnh phúc và luôn là nguồn năng lượng tích cực tỏa sáng cho cả tập thể!"
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
let isEnvelopeOpened = false;

// DOM Elements
const recipientGreeting = document.getElementById('recipientGreeting');
const wishContent = document.getElementById('wishContent');
const quoteContent = document.getElementById('quoteContent');
const envelope = document.getElementById('envelope');
const waxSeal = document.getElementById('waxSeal');
const envelopeHint = document.getElementById('envelopeHint');
const recipientNameInput = document.getElementById('recipientName');
const applyNameBtn = document.getElementById('applyNameBtn');
const randomWishBtn = document.getElementById('randomWishBtn');
const copyWishBtn = document.getElementById('copyWishBtn');
const fireworksBtn = document.getElementById('fireworksBtn');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicWaves = document.getElementById('musicWaves');
const shareLinkBtn = document.getElementById('shareLinkBtn');
const quickCopyWish = document.getElementById('quickCopyWish');
const quickSharePage = document.getElementById('quickSharePage');
const toast = document.getElementById('toast');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');
const personalizedNotice = document.getElementById('personalizedShareNotice');
const customNoticeName = document.getElementById('customNoticeName');
const copyCustomLinkBtn = document.getElementById('copyCustomLinkBtn');
const imageUploadInput = document.getElementById('imageUploadInput');
const photoDisplay = document.getElementById('photoDisplay');
const resetPhotoBtn = document.getElementById('resetPhotoBtn');

const defaultPhoto = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop";

// ==========================================
// 3. KHỞI TẠO & ĐỌC THAM SỐ URL (?to=...&role=...)
// ==========================================
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const toParam = urlParams.get('to') || urlParams.get('name');
  const roleParam = urlParams.get('role');

  if (roleParam && WISHES_DATABASE[roleParam]) {
    setRole(roleParam);
  } else {
    setRole('mother');
  }

  if (toParam) {
    customName = decodeURIComponent(toParam).trim();
    recipientNameInput.value = customName;
    updateGreetingDisplay();
    showPersonalizedNotice(customName);
    // Tự động mở thiệp sau 800ms nếu mở từ link riêng
    setTimeout(() => {
      openEnvelope();
    }, 800);
  }
}

// Cập nhật giao diện khi chọn Role
function setRole(roleKey) {
  if (!WISHES_DATABASE[roleKey]) return;
  currentRole = roleKey;
  currentWishIndex = 0;
  currentQuoteIndex = 0;

  // Cập nhật active button
  document.querySelectorAll('.role-chip').forEach(chip => {
    if (chip.getAttribute('data-role') === roleKey) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  updateGreetingDisplay();
  updateWishDisplay();
}

function updateGreetingDisplay() {
  if (customName) {
    recipientGreeting.textContent = `Gửi: ${customName} ❤️`;
  } else {
    recipientGreeting.textContent = `Gửi: ${WISHES_DATABASE[currentRole].title}`;
  }
}

function updateWishDisplay() {
  const roleData = WISHES_DATABASE[currentRole];
  wishContent.textContent = roleData.wishes[currentWishIndex % roleData.wishes.length];
  quoteContent.textContent = roleData.quotes[currentQuoteIndex % roleData.quotes.length];
}

// Hiển thị thông báo link riêng
function showPersonalizedNotice(name) {
  customNoticeName.textContent = name;
  personalizedNotice.classList.remove('hidden');
}

// ==========================================
// 4. SỰ KIỆN TƯƠNG TÁC NGƯỜI DÙNG
// ==========================================

// Chọn Role
document.querySelectorAll('.role-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const role = chip.getAttribute('data-role');
    setRole(role);
    triggerSparkleAtElement(chip);
  });
});

// Nhập Tên Riêng
applyNameBtn.addEventListener('click', () => {
  const val = recipientNameInput.value.trim();
  if (val) {
    customName = val;
    updateGreetingDisplay();
    showPersonalizedNotice(customName);
    showToast(`✨ Đã cá nhân hóa thiệp gửi cho ${customName}!`, "💌");
    if (!isEnvelopeOpened) {
      openEnvelope();
    }
  } else {
    customName = '';
    updateGreetingDisplay();
    personalizedNotice.classList.add('hidden');
    showToast("Vui lòng nhập tên người bạn muốn gửi!", "⚠️");
  }
});

recipientNameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    applyNameBtn.click();
  }
});

// Đổi lời chúc ngẫu nhiên
randomWishBtn.addEventListener('click', (e) => {
  const roleData = WISHES_DATABASE[currentRole];
  currentWishIndex = (currentWishIndex + 1) % roleData.wishes.length;
  currentQuoteIndex = (currentQuoteIndex + 1) % roleData.quotes.length;
  updateWishDisplay();
  triggerSparkleAtElement(e.currentTarget);
  showToast("Đã đổi lời chúc mới!", "✨");
});

// Mở phong bì (Envelope)
function openEnvelope() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;
  envelope.classList.add('is-open');
  envelopeHint.textContent = "💖 Thiệp chúc đã được mở ra với trọn vẹn yêu thương!";
  
  // Hiệu ứng pháo hoa hoa hồng và âm thanh chuông
  playChimeEffect();
  launchConfetti(80);
}

waxSeal.addEventListener('click', openEnvelope);
waxSeal.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    openEnvelope();
  }
});

// Bắn pháo hoa
fireworksBtn.addEventListener('click', () => {
  launchConfetti(120);
  showToast("🎆 Pháo hoa rực rỡ chúc mừng 20/10!", "🌸");
});

// ==========================================
// 5. SAO CHÉP & CHIA SẺ
// ==========================================
function showToast(message, icon = "🎉") {
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function copyWishText() {
  const greeting = recipientGreeting.textContent;
  const wish = wishContent.textContent;
  const quote = quoteContent.textContent;
  const fullText = `💐 CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10 💐\n\n${greeting}\n\n${wish}\n\n${quote}\n\n✨ Chúc bạn có một ngày 20/10 ngập tràn niềm vui và hạnh phúc! ✨`;

  navigator.clipboard.writeText(fullText).then(() => {
    showToast("Đã sao chép lời chúc! Hãy gửi ngay qua Zalo nhé 💌", "📋");
  }).catch(() => {
    showToast("Không thể tự động sao chép, hãy chọn và copy thủ công nhé!", "⚠️");
  });
}

function generateShareLink() {
  const baseUrl = window.location.origin + window.location.pathname;
  const params = new URLSearchParams();
  if (customName) params.set('to', customName);
  if (currentRole) params.set('role', currentRole);
  
  const finalUrl = `${baseUrl}?${params.toString()}`;
  navigator.clipboard.writeText(finalUrl).then(() => {
    showToast("Đã sao chép liên kết thiệp cá nhân hóa!", "🔗");
  }).catch(() => {
    showToast("Vui lòng sao chép link trên trình duyệt!", "⚠️");
  });
}

copyWishBtn.addEventListener('click', copyWishText);
quickCopyWish.addEventListener('click', copyWishText);
shareLinkBtn.addEventListener('click', generateShareLink);
quickSharePage.addEventListener('click', generateShareLink);
copyCustomLinkBtn.addEventListener('click', generateShareLink);

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
// 7. TẢI ẢNH KỶ NIỆM (LOCAL PREVIEW)
// ==========================================
imageUploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      photoDisplay.src = evt.target.result;
      showToast("Đã cập nhật ảnh kỷ niệm thành công!", "🖼️");
    };
    reader.readAsDataURL(file);
  }
});

resetPhotoBtn.addEventListener('click', () => {
  photoDisplay.src = defaultPhoto;
  imageUploadInput.value = '';
  showToast("Đã đặt lại ảnh mặc định!", "🌸");
});

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

function toggleBackgroundMusic() {
  initAudio();
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

