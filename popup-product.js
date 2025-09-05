/* popup-product.js – toàn bộ CSS + JS dạng IIFE */
(() => {
  /* 1. CSS inline */
  const style = document.createElement('style');
  style.textContent = `
/* Ẩn nút mặc định */
#muahangx1 {
    position: fixed;
    left: 12px;
    bottom: 16px;
    z-index: 999;
    opacity: 1;
    
    transition: opacity .25s;
    color: #fff;
    background: #e82608;
    border-radius: 30px;
    padding: 6px 15px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

/* Khi màn hình ≥ 600px thì căn giữa */
@media (min-width: 600px) {
    #muahangx1 {
        left: 50%;
        transform: translateX(-50%);
    }
}

#overlayx1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.45);
    display: none;
    align-items: flex-start;
    justify-content: center;
    z-index: 99999;
    padding-top: 40px;
}

#popupmhx1 {
    background: #fff;
    border-radius: 8px;
    max-width: 480px;
    width: 90%;
    padding: 20px 16px 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

/* Nút close */
.close-btnx1 {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 22px;
    color: #5f6368;
    cursor: pointer;
    line-height: 1;
}

/* TOP INFO */
.top-infox1 {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    align-items: flex-start;
}

.top-infox1 img {
    width: 80px;
    height: 80px;
    border-radius: 4px;
    object-fit: cover;
    flex-shrink: 0;
}

.top-infox1 .namex1 {
    font-size: 16px;
    font-weight: 700;
    color: #202124;
    margin-bottom: 6px;
}

.qty-rowx1, .total-rowx1 {
    font-size: 16px;
    color: #202124;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    gap: 6px;
}

#qtyx1 {
    border: 2px solid #ff4700;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 15px;
    background: #fff;
}

span#totalSpanx1 {
    font-size: 17px;
    font-weight: 600;
    color: #266d2f;
}

.free-shipx1 {
    background: #e8f0fe;
    border-left: 4px solid #1a73e8;
    color: #1967d2;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 16px;
}

.headingx1 {
    font-size: 18px;
    font-weight: 700;
    color: #202124;
    margin-bottom: 12px;
}

/* FORM ROWS */
.form-rowx1 {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
}

.form-rowx1 select, .form-rowx1 input, .form-rowx1 textarea {
    flex: 1 1 0;
    min-width: 0;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #dadce0;
    border-radius: 4px;
}

.form-rowx1.fullx1 {
    flex-direction: column;
}

.form-rowx1.fullx1>* {
    flex-basis: 100%;
}

.note-togglex1 {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #5f6368;
    margin-bottom: 8px;
}

.note-togglex1 input {
    margin-left: 6px;
}

.honeypotx1 {
    display: none;
}

.submit-btnx1 {
    width: 100%;
    padding: 12px 0;
    background: #1a73e8;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 8px;
}

.submit-btnx1:disabled {
    background: #bdc1c6;
    cursor: not-allowed;
}

#responseMsgx1 {
    margin-top: 12px;
    font-size: 14px;
    color: #d93025;
}

/* Modal footer – chứa nút đóng khi cần */
.modal-footerx1 {
    display: none;
    justify-content: center;
    margin-top: 12px;
}
  `;
  document.head.appendChild(style);

  /* 2. Nút mở popup */
  if (!document.getElementById('muahangx1')) {
    const btn = document.createElement('button');
    btn.id = 'muahangx1';
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/></svg> Mua ngay`;
    document.body.appendChild(btn);
  }

  /* 3. HTML popup */
  if (!document.getElementById('overlayx1')) {
    const popupHTML = `
      <div id="overlayx1" style="display:none;">
        <div id="popupmhx1">
          <span class="close-btnx1" id="closeBtnx1">&times;</span>
          <div class="top-infox1">
            <img id="popupImg" src="" alt="">
            <div>
              <div class="namex1" id="popupTitle"></div>
              <div class="qty-rowx1">
                Chọn số lượng
                <select id="qtyx1">
                  ${Array.from({length:5},(_,i)=>`<option value="${i+1}">${i+1}</option>`).join('')}
                </select>
              </div>
              <div class="total-rowx1">
                Tổng tiền: <span id="totalSpanx1" data-price=""></span>
              </div>
            </div>
          </div>
          <div class="free-shipx1">Đơn hàng này được <strong>FREE SHIP</strong>!</div>
          <div class="headingx1">Thông tin người nhận</div>
          <div class="form-rowx1 addr-linex1">
            <select id="cityx1"><option value="" selected>Tỉnh/TP</option></select>
            <select id="districtx1"><option value="" selected>Q/Huyện</option></select>
          </div>
          <div class="form-rowx1 fullx1">
            <select id="wardx1"><option value="" selected>Phường/Xã</option></select>
          </div>
          <div class="form-rowx1">
            <input type="text" id="addressx1" placeholder="Số nhà, xóm, ngõ..." required>
            <input type="text" id="phonex1" placeholder="Số điện thoại" required pattern="\\d{10,11}">
          </div>
          <div class="note-togglex1">
            Thêm chú ý <input type="checkbox" id="showNotex1">
          </div>
          <div class="form-rowx1 fullx1" id="noteBoxx1" style="display:none">
            <textarea id="notex1" placeholder="Ghi chú hoặc yêu cầu thêm của bạn..." rows="2"></textarea>
          </div>
          <div class="honeypotx1" style="display:none"><input type="text" id="websitex1"></div>
          <button class="submit-btnx1" id="submitOrderx1">Hoàn thành</button>
          <div style="font-size:14px;color:#5f6368;margin-top:8px">Thanh toán khi nhận hàng (COD)</div>
          <div id="responseMsgx1"></div>
          <div class="modal-footerx1" id="modalFooterx1" style="display:none">
            <button class="submit-btnx1" onclick="closePopup()">Đóng</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);
  }

  /* 4. Lấy data sản phẩm */
  const img = document.querySelector('.woocommerce-product-gallery__wrapper img')?.src || '';
  const title = document.querySelector('.product_title')?.textContent || '';
  const priceEl = document.querySelector('.price .woocommerce-Price-amount bdi');
  const priceText = priceEl?.textContent || '0 ₫';
  const priceRaw = parseFloat(priceText.replace(/[^\d]/g, ''));
  document.getElementById('popupImg').src = img;
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('totalSpanx1').textContent = priceText;
  document.getElementById('totalSpanx1').dataset.price = priceRaw;

  /* 5. Khai báo các biến dùng chung */
  const citySel   = document.getElementById('cityx1');
  const districtSel = document.getElementById('districtx1');
  const wardSel   = document.getElementById('wardx1');
  const qtySel    = document.getElementById('qtyx1');
  const overlay   = document.getElementById('overlayx1');
  const closeBtn  = document.getElementById('closeBtnx1');
  const submitBtn = document.getElementById('submitOrderx1');
  const responseMsg = document.getElementById('responseMsgx1');
  const modalFooter = document.getElementById('modalFooterx1');

  /* 6. Load Axios & địa chỉ VN */
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js')
    .then(() => {
      return axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
    })
    .then(res => {
      const data = res.data;
      data.forEach(p => citySel.add(new Option(p.Name, p.Id)));
      citySel.addEventListener('change', () => {
        districtSel.length = 1;
        wardSel.length = 1;
        if (!citySel.value) return;
        data.find(p => p.Id === citySel.value).Districts.forEach(d =>
          districtSel.add(new Option(d.Name, d.Id))
        );
      });
      districtSel.addEventListener('change', () => {
        wardSel.length = 1;
        if (!districtSel.value) return;
        const p = data.find(p => p.Id === citySel.value);
        p.Districts.find(d => d.Id === districtSel.value).Wards.forEach(w =>
          wardSel.add(new Option(w.Name, w.Id))
        );
      });
    });

  /* 7. Xử lý popup */
  document.getElementById('muahangx1').addEventListener('click', () => overlay.style.display = 'flex');
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });
  function closePopup() {
    overlay.style.display = 'none';
    responseMsg.textContent = '';
    modalFooter.style.display = 'none';
  }

  /* 8. Tính tổng tiền */
  function updateTotal() {
    const price = parseFloat(document.getElementById('totalSpanx1').dataset.price) || 0;
    document.getElementById('totalSpanx1').textContent = (price * qtySel.value).toLocaleString('vi-VN') + '₫';
  }
  qtySel.addEventListener('change', updateTotal);
  updateTotal();

  /* 9. Đếm ngược */
  function countdown(sec) {
    responseMsg.innerHTML = `
      <div style="color:#006400;font-size:16px;font-weight:600">
        Đơn hàng của bạn đã gửi đi, vui lòng đợi chúng tôi xác nhận!<br>
        Tự động đóng trong <span id="countx1">${sec}</span>s
      </div>`;
    modalFooter.style.display = 'flex';
    const timer = setInterval(() => {
      sec--;
      document.getElementById('countx1').textContent = sec;
      if (sec <= 0) { clearInterval(timer); closePopup(); }
    }, 1000);
  }

  /* 10. Submit */
  submitBtn.addEventListener('click', async () => {
    if (document.getElementById('websitex1').value.trim() !== '') {
      responseMsg.textContent = 'Bot detected – order NOT sent!';
      return;
    }
    const qty = qtySel.value;
    const priceVal = parseFloat(document.getElementById('totalSpanx1').dataset.price) || 0;
    const total = priceVal * qty;
    const province = citySel.options[citySel.selectedIndex]?.text || '';
    const district = districtSel.options[districtSel.selectedIndex]?.text || '';
    const ward = wardSel.options[wardSel.selectedIndex]?.text || '';
    const address = document.getElementById('addressx1').value.trim();
    const phone = document.getElementById('phonex1').value.trim();
    const note = document.getElementById('notex1').value.trim();
    if (!province || !district || !ward || !address || !phone) {
      responseMsg.textContent = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      responseMsg.textContent = 'Số điện thoại không hợp lệ!';
      return;
    }
    submitBtn.disabled = true;
    const message =
      `*Đơn hàng mới*\n` +
      `Sản phẩm: ${title}\n` +
      `Số lượng: ${qty}\n` +
      `Tổng tiền: ${total.toLocaleString('vi-VN')}₫\n` +
      `Địa chỉ: ${address}, ${ward}, ${district}, ${province}\n` +
      `SĐT: ${phone}\n` +
      `Ghi chú: ${note || 'Không'}`;
    try {
      const TELEGRAM_BOT_TOKEN = '5572397080:AAFqa1dOYqvKrQ8-Wx5ez7PaqsVtvWU8vjA';
      const CHAT_ID = '-702616123';
      const res = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
        }
      );
      if (res.ok) {
  // Push sự kiện chuyển đổi lên GTM
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'purchase_success',
    value: total,
    currency: 'VND',
    transaction_id: 'order_' + Date.now()
  });

  document.querySelectorAll('#popupmhx1 > *:not(#responseMsgx1):not(.modal-footerx1)')
    .forEach(el => el.style.display = 'none');
  responseMsg.style.display = 'block';
  modalFooter.style.display = 'flex';
  countdown(5);
} else {
        const err = await res.json();
        throw new Error(err.description || 'Lỗi không xác định');
      }
    } catch (e) {
      responseMsg.textContent = 'Lỗi gửi đơn: ' + e.message;
    } finally {
      submitBtn.disabled = false;
    }
  });

  /* 11. Ghi chú */
  document.getElementById('showNotex1').addEventListener('change', function () {
    document.getElementById('noteBoxx1').style.display = this.checked ? 'block' : 'none';
  });

  /* 12. Auto-save / restore */
  (() => {
    const STORAGE_KEY = 'popupFormData';
    const EXPIRE_DAYS = 10;
    const fields = ['cityx1', 'districtx1', 'wardx1', 'addressx1', 'phonex1', 'notex1'];
    function getStored() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const { ts, data } = JSON.parse(raw);
        if (Date.now() - ts > EXPIRE_DAYS * 86400000) {
          localStorage.removeItem(STORAGE_KEY);
          return null;
        }
        return data;
      } catch { return null; }
    }
    function store(obj) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data: obj }));
    }
    function fill(data) {
      if (!data) return;
      if (data.cityx1) {
        citySel.value = data.cityx1;
        citySel.dispatchEvent(new Event('change'));
        setTimeout(() => {
          if (data.districtx1) {
            districtSel.value = data.districtx1;
            districtSel.dispatchEvent(new Event('change'));
            setTimeout(() => {
              if (data.wardx1) wardSel.value = data.wardx1;
            }, 50);
          }
        }, 50);
      }
      if (data.addressx1) document.getElementById('addressx1').value = data.addressx1;
      if (data.phonex1) document.getElementById('phonex1').value = data.phonex1;
      if (data.notex1) {
        document.getElementById('notex1').value = data.notex1;
        document.getElementById('showNotex1').checked = true;
        document.getElementById('noteBoxx1').style.display = 'block';
      }
    }
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ['change', 'input'].forEach(evt => el.addEventListener(evt, () => {
        const obj = {};
        fields.forEach(fid => { obj[fid] = document.getElementById(fid)?.value || ''; });
        store(obj);
      }));
    });
    document.getElementById('muahangx1').addEventListener('click', () => fill(getStored()));
  })();
})();
