'use strict';
/* Change the recipient after creating the mailbox or alias in Google Workspace. */
const SITE_CONFIG = Object.freeze({ contactEmail: 'contact@danhnguyen.me' });

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
document.querySelectorAll('[data-contact-email]').forEach(el => {
  el.href = `mailto:${SITE_CONFIG.contactEmail}`;
  el.replaceChildren(document.createTextNode(`${SITE_CONFIG.contactEmail} `));
  const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); el.append(arrow);
});

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function setMenu(open) {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  navigation.classList.toggle('is-open', open);
}
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuToggle.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) setMenu(false); });

/* All dataset values are illustrative. Output totals and OEE are derived. */
const DEMO_LINES = Object.freeze({
  a: { name: 'Dây chuyền A', availability: .92, performance: .91, quality: .984, plan: 1400, energy: .86, energyTarget: .90, hours: [142,158,174,156,149,165,153,151], title: 'Ưu tiên thời gian dừng máy.', note: 'Rà soát nguyên nhân dừng máy ngắn và thời gian đổi mã để tìm cơ hội cải thiện hiệu suất.', status: 'Đang sản xuất' },
  b: { name: 'Dây chuyền B', availability: .85, performance: .88, quality: .975, plan: 1300, energy: 1.04, energyTarget: .95, hours: [130,125,118,96,144,151,142,138], title: 'Kiểm tra mức tiêu thụ điện.', note: 'Điện năng trên sản phẩm cao hơn định mức tham chiếu. Kiểm tra thiết bị phụ trợ và khoảng thời gian chạy không tải.', status: 'Cần theo dõi năng lượng' },
  c: { name: 'Dây chuyền C', availability: .96, performance: .94, quality: .991, plan: 1500, energy: .79, energyTarget: .85, hours: [172,180,182,176,185,189,181,178], title: 'Duy trì điều kiện vận hành.', note: 'Dây chuyền có các chỉ số ổn định trong bộ dữ liệu mẫu. Theo dõi chất lượng và chuẩn hóa điều kiện vận hành cho các ca tiếp theo.', status: 'Đang sản xuất' }
});
const decimal = value => value.toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function setMetric(selector, value, unit) {
  const el = document.querySelector(selector); if (!el) return;
  const small = document.createElement('small'); small.textContent = unit;
  el.replaceChildren(document.createTextNode(value), small);
}
function renderLine(key) {
  const line = DEMO_LINES[key]; if (!line) return;
  const output = line.hours.reduce((sum, value) => sum + value, 0);
  setMetric('#metric-oee', (line.availability * line.performance * line.quality * 100).toLocaleString('vi-VN', {minimumFractionDigits:1,maximumFractionDigits:1}), '%');
  setMetric('#metric-output', output.toLocaleString('vi-VN'), 'sp');
  setMetric('#metric-energy', decimal(line.energy), 'kWh');
  document.querySelector('#metric-oee-detail').textContent = `${(line.availability * 100).toLocaleString('vi-VN')}% × ${(line.performance * 100).toLocaleString('vi-VN')}% × ${(line.quality * 100).toLocaleString('vi-VN')}%`;
  document.querySelector('#metric-output-detail').textContent = `Kế hoạch: ${line.plan.toLocaleString('vi-VN')} sản phẩm`;
  document.querySelector('#metric-energy-detail').textContent = `Định mức tham chiếu: ${decimal(line.energyTarget)} kWh/sp`;
  document.querySelector('#insight-title').textContent = line.title;
  document.querySelector('#insight-text').textContent = line.note;
  document.querySelector('#line-status').textContent = `${line.status} · trạng thái minh họa`;
  const chart = document.querySelector('#production-chart');
  chart.setAttribute('aria-label', `Sản lượng ${line.name} từ 06h đến 13h: ${line.hours.join(', ')} sản phẩm. Tổng ${output} sản phẩm.`);
  chart.querySelectorAll('.chart-bars>div>span').forEach((bar, index) => {
    bar.style.setProperty('--height', `${line.hours[index] / 200 * 100}%`);
    bar.textContent = line.hours[index];
  });
}
const lineSelect = document.querySelector('#line-select');
lineSelect?.addEventListener('change', event => renderLine(event.target.value));
if (lineSelect) renderLine(lineSelect.value);

document.querySelectorAll('[data-interest]').forEach(link => link.addEventListener('click', () => {
  const interest = document.querySelector('#interest'); if (interest) interest.value = link.dataset.interest;
}));

const form = document.querySelector('#contact-form');
const statusBox = document.querySelector('#form-status');
let emailDraft = '';
form?.addEventListener('submit', event => {
  event.preventDefault();
  for (const name of ['name', 'message']) {
    const field = form.elements.namedItem(name);
    field.setCustomValidity(field.value.trim() ? '' : 'Vui lòng nhập nội dung.');
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const clean = name => String(data.get(name) || '').trim();
  const subject = `[NexaFactory] ${clean('interest')}`;
  emailDraft = `Xin chào NexaFactory,\n\nHọ và tên: ${clean('name')}\nDoanh nghiệp: ${clean('company') || 'Chưa cung cấp'}\nEmail liên hệ: ${clean('email')}\nGiải pháp quan tâm: ${clean('interest')}\n\nBài toán cần giải quyết:\n${clean('message')}\n\nTôi đồng ý chia sẻ thông tin qua email để trao đổi về nhu cầu này.`;
  statusBox.hidden = false;
  statusBox.querySelector('p').textContent = 'Đã tạo nội dung email. Website chưa gửi thư. Nếu ứng dụng email không mở, hãy sao chép nội dung và gửi tới ' + SITE_CONFIG.contactEmail + '.';
  window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailDraft)}`;
});
form?.querySelectorAll('input,textarea').forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
document.querySelector('#copy-request')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(emailDraft);
    statusBox.querySelector('p').textContent = `Đã sao chép nội dung. Dán vào email, gửi tới ${SITE_CONFIG.contactEmail} và tự nhấn Gửi.`;
  } catch {
    let fallback = statusBox.querySelector('textarea');
    if (!fallback) { fallback = document.createElement('textarea'); fallback.readOnly = true; fallback.setAttribute('aria-label', 'Nội dung email để sao chép'); fallback.style.width = '100%'; fallback.rows = 8; statusBox.append(fallback); }
    fallback.value = emailDraft; fallback.focus(); fallback.select();
    statusBox.querySelector('p').textContent = 'Chọn nội dung bên dưới và sao chép bằng Ctrl+C (Windows) hoặc Command+C (Mac).';
  }
});
