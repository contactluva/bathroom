/* popup-product.js – toàn bộ CSS + JS dạng IIFE có tích hợp Voice to Text */
(() => {
  /* ========== HÀM TIỆN ÍCH: BỎ DẤU TIẾNG VIỆT ========== */
  function removeVietnameseTones(str) {
    if (!str) return '';
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/[^\w\s]/g, '');
    return str;
  }

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
    padding: 8px 25px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    font-weight: 700;
}

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
    background: rgba(0,0,0,.85);
    display: none;
    align-items: flex-start;
    justify-content: center;
    z-index: 99999;
    padding-top: 40px;
    overflow-y: auto;
}

#popupmhx1 {
    background: #fff;
    border-radius: 8px;
    max-width: 480px;
    width: 90%;
    padding: 20px 16px 24px;
    box-shadow: 0 8px 32px rgba(0,0,0,.2);
    position: relative;
    max-height: 85vh;
    overflow-y: auto;
    margin-bottom: 40px;
}

.close-btnx1 {
    position: absolute;
    top: 8px;
    right: 12px;
    font-size: 22px;
    color: #5f6368;
    cursor: pointer;
    line-height: 1;
    z-index: 10;
}

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
    cursor: pointer;
}

span#totalSpanx1 {
    font-size: 17px;
    font-weight: 600;
    color: #266d2f;
    min-width: 100px;
    display: inline-block;
}

span#totalSpanx1.loading {
    color: #999;
    font-style: italic;
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

.form-rowx1 {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;
    position: relative;
}

.form-rowx1 select, .form-rowx1 input, .form-rowx1 textarea {
    flex: 1 1 0;
    min-width: 0;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-family: inherit;
    background: #fff;
}

.form-rowx1 select {
    cursor: pointer;
}

.form-rowx1.fullx1 {
    flex-direction: column;
}

.form-rowx1.fullx1>* {
    flex-basis: 100%;
}

.ward-wrapx1 {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
}

#wardx1 {
    width: 100%;
    box-sizing: border-box;
}

.ward-dropdownx1 {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    border: 1px solid #dadce0;
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 100;
    display: none;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ward-dropdownx1.active {
    display: block;
}

.ward-itemx1 {
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    color: #202124;
    border-bottom: 1px solid #f0f0f0;
}

.ward-itemx1:hover, .ward-itemx1.highlighted {
    background: #e8f0fe;
    color: #1a73e8;
}

.note-togglex1 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
    font-size: 14px;
    color: #444;
}

.note-togglex1 input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #1a73e8;
    margin-left: 0;
}

.note-wrapx1 {
    display: none;
}

.note-wrapx1.active {
    display: block;
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
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 8px;
}

.submit-btnx1:hover {
    background: #1557b0;
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

.modal-footerx1 {
    display: none;
    justify-content: center;
    margin-top: 12px;
}

/* --- Style cho Voice To Text Input (Địa chỉ) --- */
.address-input-groupx1 {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
}

.address-input-groupx1 input {
    width: 100%;
    padding-right: 40px !important;
    box-sizing: border-box;
}

.address-input-groupx1 .mic-iconx1 {
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    background: #28a745;
    border: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: background 0.2s;
}

.address-input-groupx1 .mic-iconx1:hover {
    background: #218838;
}

/* --- Style cho Voice To Text Textarea (Ghi chú) --- */
.voice-textarea-groupx1 {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    width: 100%;
}

.voice-textarea-groupx1 textarea {
    width: 100%;
    padding-right: 42px !important; /* Dành chỗ cho icon mic */
    box-sizing: border-box;
}

.voice-textarea-groupx1 .mic-iconx1 {
    position: absolute;
    right: 8px;
    top: 8px; /* Đặt ở góc trên phải */
    background: #28a745;
    border: none;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: background 0.2s;
}

.voice-textarea-groupx1 .mic-iconx1:hover {
    background: #218838;
}

/* --- Overlay Voice Modal --- */
.modal-overlay-voicex1 {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000000;
}

.modal-content-voicex1 {
    background: #eef2f5; 
    padding: 30px;
    border-radius: 12px;
    width: 350px;
    max-width: 90%;
    text-align: center;
    box-shadow: 0 5px 25px rgba(0,0,0,0.3);
}

.listening-micx1 {
    font-size: 35px;
    background: #007bff;
    color: white;
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 15px;
    animation: pulsex1 1.5s infinite;
}

@keyframes pulsex1 {
    0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.6); }
    70% { box-shadow: 0 0 0 15px rgba(0, 123, 255, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
}

#previewTextx1 {
    width: 100%;
    min-height: 100px;
    font-size: 16px;
    color: #333;
    margin-bottom: 20px;
    padding: 12px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid #b3d4fc;
    box-shadow: 0 2px 10px rgba(0, 123, 255, 0.1);
    resize: vertical;
    outline: none;
    box-sizing: border-box;
    font-family: inherit;
    line-height: 1.5;
}

#previewTextx1:focus {
    border-color: #007bff;
    box-shadow: 0 2px 12px rgba(0, 123, 255, 0.25);
}

.modal-actions-voicex1 {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.modal-actions-voicex1 button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    flex: 1;
    font-weight: bold;
}

.btn-okx1 { background: #007bff; color: #fff; }
.btn-okx1:hover { background: #0056b3; }
.btn-retryx1 { background: #ff9800; color: #fff; }
.btn-retryx1:hover { background: #e68a00; }
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
          <div class="form-rowx1">
            <select id="cityx1"><option value="" selected>Chọn tỉnh/TP</option></select>
            <div class="ward-wrapx1">
              <input type="text" id="wardx1" placeholder="Chọn phường/xã..." autocomplete="off">
              <div class="ward-dropdownx1" id="wardDropdownx1"></div>
            </div>
          </div>
          <div class="form-rowx1">
            <div class="address-input-groupx1">
              <input type="text" id="addressx1" placeholder="Số nhà, xóm, ngõ..." required>
              <button class="mic-iconx1" id="openMicBtnx1" title="Nhập bằng giọng nói">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16"><path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/><path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/></svg>
              </button>
            </div>
            <input type="text" id="phonex1" placeholder="Số điện thoại" required pattern="\\d{10,11}">
          </div>
          <label class="note-togglex1">
            <input type="checkbox" id="noteTogglex1">
            <span>Thêm ghi chú cho đơn hàng</span>
          </label>
          <div class="note-wrapx1" id="noteWrapx1">
            <div class="form-rowx1 fullx1">
              <!-- Bọc Note vào nhóm Voice -->
              <div class="voice-textarea-groupx1">
                <textarea id="notex1" placeholder="Ghi chú (vd: giao giờ hành chính, gọi trước khi giao...)" rows="2"></textarea>
                <button class="mic-iconx1" id="openMicNoteBtnx1" title="Nhập bằng giọng nói">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16"><path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/><path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/></svg>
                </button>
              </div>
            </div>
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

      <!-- Popup Voice To Text Chung -->
      <div class="modal-overlay-voicex1" id="voiceModalx1">
        <div class="modal-content-voicex1">
            <div class="listening-micx1">  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"></path>
                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"></path>
                    </svg></div>
            <h3 style="margin-top: 0; margin-bottom: 15px; color: #444; font-size: 18px;">Đang nghe...</h3>
            <textarea id="previewTextx1" placeholder="Hãy nói gì đó..."></textarea>
            <div class="modal-actions-voicex1">
                <button type="button" class="btn-retryx1" id="retryBtnx1">Nói lại</button>
                <button type="button" class="btn-okx1" id="okBtnx1">OK</button>
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
  const wardInput = document.getElementById('wardx1');
  const wardDropdown = document.getElementById('wardDropdownx1');
  const qtySel    = document.getElementById('qtyx1');
  const overlay   = document.getElementById('overlayx1');
  const closeBtn  = document.getElementById('closeBtnx1');
  const submitBtn = document.getElementById('submitOrderx1');
  const responseMsg = document.getElementById('responseMsgx1');
  const modalFooter = document.getElementById('modalFooterx1');
  const noteToggle = document.getElementById('noteTogglex1');
  const noteWrap = document.getElementById('noteWrapx1');
  const noteInput = document.getElementById('notex1');

  /* 6. Load dữ liệu địa chỉ */
  const DATA_URL = 'https://raw.githubusercontent.com/contactluva/bathroom/refs/heads/main/json/data.json';
  let vnData = [];
  let dataLoaded = false;
  let currentWards = [];

  function loadLocationData() {
    citySel.innerHTML = '<option value="">Tỉnh/TP</option>';
    wardInput.value = '';
    wardInput.placeholder = 'Chọn tỉnh/TP trước';
    wardInput.disabled = true;
    citySel.disabled = true;

    fetch(DATA_URL)
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then(data => {
        vnData = data;
        dataLoaded = true;

        data.forEach(p => {
          citySel.add(new Option(p.name, p.province_code));
        });

        citySel.disabled = false;
        wardInput.disabled = false;
        wardInput.placeholder = 'Phường/xã...';

        restoreFormData();
      })
      .catch(err => {
        responseMsg.innerHTML = '<div style="color:#c5221f">Không thể tải dữ liệu địa phương. Vui lòng thử lại sau.</div>';
      });
  }

  /* AutoComplete Ward */
  let highlightedIndex = -1;
  function filterWards(query) {
    const term = removeVietnameseTones(query);
    if (!term) {
      renderDropdown(currentWards);
      return;
    }
    const filtered = currentWards.filter(w => 
      removeVietnameseTones(w.name).includes(term)
    );
    renderDropdown(filtered, query);
  }

  function renderDropdown(wards, highlightTerm = '') {
    if (wards.length === 0) {
      wardDropdown.innerHTML = '<div class="ward-itemx1 no-result">Không tìm thấy phường/xã</div>';
      wardDropdown.classList.add('active');
      highlightedIndex = -1;
      return;
    }
    let highlightRegex = null;
    if (highlightTerm) {
      const noAccentTerm = removeVietnameseTones(highlightTerm);
      const chars = noAccentTerm.split('').map(c => {
        const map = {
          'a': '[aàáạảãâầấậẩẫăằắặẳẵ]', 'e': '[eèéẹẻẽêềếệểễ]', 'i': '[iìíịỉĩ]',
          'o': '[oòóọỏõôồốộổỗơờớợởỡ]', 'u': '[uùúụủũưừứựửữ]', 'y': '[yỳýỵỷỹ]', 'd': '[dđ]'
        };
        return map[c] || c;
      }).join('');
      highlightRegex = new RegExp(`(${chars})`, 'gi');
    }

    wardDropdown.innerHTML = wards.map((w, i) => {
      let name = w.name;
      if (highlightRegex) {
        name = name.replace(highlightRegex, '<strong style="color:#1a73e8">$1</strong>');
      }
      return `<div class="ward-itemx1" data-index="${i}" data-code="${w.ward_code}" data-name="${w.name}">${name}</div>`;
    }).join('');
    
    wardDropdown.classList.add('active');
    highlightedIndex = -1;
  }

  function selectWard(name, code) {
    wardInput.value = name;
    wardInput.dataset.code = code;
    wardDropdown.classList.remove('active');
    highlightedIndex = -1;
    saveFormData();
  }

  function closeWardDropdown() {
    wardDropdown.classList.remove('active');
    highlightedIndex = -1;
  }

  citySel.addEventListener('change', () => {
    wardInput.value = '';
    wardInput.dataset.code = '';
    currentWards = [];
    
    const province = vnData.find(p => p.province_code === citySel.value);
    if (!province?.wards) {
      wardInput.placeholder = 'Chọn tỉnh/TP có dữ liệu';
      return;
    }

    currentWards = province.wards;
    wardInput.placeholder = 'Phường/xã...';
    if (document.activeElement === wardInput) renderDropdown(currentWards);
  });

  wardInput.addEventListener('input', (e) => filterWards(e.target.value));
  wardInput.addEventListener('focus', () => {
    if (currentWards.length > 0) renderDropdown(currentWards);
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.ward-wrapx1')) closeWardDropdown();
  });

  wardInput.addEventListener('keydown', (e) => {
    const items = wardDropdown.querySelectorAll('.ward-itemx1:not(.no-result)');
    if (!wardDropdown.classList.contains('active') || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % items.length;
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + items.length) % items.length;
      updateHighlight(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && items[highlightedIndex]) {
        const item = items[highlightedIndex];
        selectWard(item.dataset.name, item.dataset.code);
      }
    } else if (e.key === 'Escape') closeWardDropdown();
  });

  function updateHighlight(items) {
    items.forEach((item, i) => {
      if (i === highlightedIndex) {
        item.classList.add('highlighted');
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.classList.remove('highlighted');
      }
    });
  }

  wardDropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.ward-itemx1');
    if (!item || item.classList.contains('no-result')) return;
    selectWard(item.dataset.name, item.dataset.code);
  });

  /* 7. Xử lý popup form mua hàng */
  document.getElementById('muahangx1').addEventListener('click', () => {
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (!dataLoaded) loadLocationData();
    else restoreFormData();
  });

  function closePopup() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    responseMsg.textContent = '';
    modalFooter.style.display = 'none';
    closeWardDropdown();
  }

  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) closePopup(); });

  /* 8. Tính tổng tiền */
  let typeTimeout = null;
  let currentDisplayed = 0;

  function typeNumber(targetEl, finalValue, duration = 400) {
    if (typeTimeout) { clearTimeout(typeTimeout); typeTimeout = null; }
    const startValue = currentDisplayed;
    const diff = finalValue - startValue;
    const steps = 12;
    const stepDuration = duration / steps;
    let step = 0;

    function stepType() {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + diff * eased);
      targetEl.textContent = current.toLocaleString('vi-VN') + '₫';
      currentDisplayed = current;

      if (step < steps) {
        typeTimeout = setTimeout(stepType, stepDuration);
      } else {
        targetEl.textContent = finalValue.toLocaleString('vi-VN') + '₫';
        currentDisplayed = finalValue;
        targetEl.classList.remove('loading');
      }
    }
    stepType();
  }

  function updateTotal() {
    const finalTotal = (+document.getElementById('totalSpanx1').dataset.price) * (+qtySel.value);
    const totalSpan = document.getElementById('totalSpanx1');
    totalSpan.classList.add('loading');
    totalSpan.textContent = 'Đang tính...';
    setTimeout(() => { typeNumber(totalSpan, finalTotal, 400); }, 500);
  }

  qtySel.addEventListener('change', updateTotal);
  document.getElementById('totalSpanx1').textContent = priceText;
  currentDisplayed = priceRaw;

  /* 9. Đếm ngược */
  function countdown(sec) {
    responseMsg.innerHTML = `
      <div style="color:#006400;font-size:16px;font-weight:600">Đơn hàng của bạn đã gửi đi, vui lòng đợi chúng tôi xác nhận! </div>
      <div style="color:#878787;font-size:16px;font-weight:300">Tự động đóng trong <span id="countx1">${sec}</span>s</div>`;
    modalFooter.style.display = 'flex';
    const timer = setInterval(() => {
      sec--;
      document.getElementById('countx1').textContent = sec;
      if (sec <= 0) { clearInterval(timer); closePopup(); }
    }, 1000);
  }

  /* 10. Capture form */
  let captureTimeout = null;
  let captured = false;
  const phoneInput = document.getElementById('phonex1');
  phoneInput.setAttribute('autocomplete', 'tel');

  function resetCapture() { clearTimeout(captureTimeout); captureTimeout = null; }

  function triggerCapture() {
    if (captured) return;
    const phone = phoneInput.value.trim();
    if (!/^\d{10}$/.test(phone)) return;

    captureTimeout = setTimeout(() => {
      if (captured) return;
      const province = citySel.options[citySel.selectedIndex]?.text || '';
      const ward = wardInput.value.trim();
      const address = document.getElementById('addressx1').value.trim();
      const note = noteInput.value.trim();
      const qty = qtySel.value;
      const priceVal = parseFloat(document.getElementById('totalSpanx1').dataset.price) || 0;
      const total = priceVal * qty;

      const message = `🛒 *KH ĐANG QUAN TÂM*\n\n🔹 Sản phẩm: ${title}\n🔹 Số lượng: ${qty}\n🔹 Tổng tiền: ${total.toLocaleString('vi-VN')}₫\n🔹 Địa chỉ: ${address}, ${ward}, ${province}\n\n🔹 Số điện thoại:   *${phone}*   [Gọi](https://cantieuly.net/goi/${phone}) | [Zalo](https://zalo.me/${phone})\n\n📝 Ghi chú: ${note || 'Không'}`;

      const TELEGRAM_BOT_TOKEN = '5572397080:AAFqa1dOYqvKrQ8-Wx5ez7PaqsVtvWU8vjA';
      const CHAT_ID = '-702616123';
      fetch(`https://ongmuot.com/cantieuly.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TELEGRAM_BOT_TOKEN, chat_id: CHAT_ID, text: message })
      });
      captured = true;
    }, 50000);
  }

  phoneInput.addEventListener('input', () => { resetCapture(); captured = false; triggerCapture(); });

  /* 11. Submit */
  submitBtn.addEventListener('click', async () => {
    resetCapture();
    if (document.getElementById('websitex1').value.trim() !== '') { responseMsg.textContent = 'Bot detected – order NOT sent!'; return; }
    
    const qty = qtySel.value;
    const priceVal = parseFloat(document.getElementById('totalSpanx1').dataset.price) || 0;
    const total = priceVal * qty;
    const province = citySel.options[citySel.selectedIndex]?.text || '';
    const ward = wardInput.value.trim();
    const address = document.getElementById('addressx1').value.trim();
    const phone = document.getElementById('phonex1').value.trim();
    const note = noteInput.value.trim();

    if (!province || province === 'Tỉnh/TP' || !ward || !address || !phone) {
      responseMsg.textContent = 'Vui lòng điền đầy đủ thông tin!'; return;
    }
    if (!/^\d{10}$/.test(phone)) {
      responseMsg.textContent = 'Số điện thoại không hợp lệ!'; return;
    }

    submitBtn.disabled = true;

    const message = `🛒 *ĐƠN HÀNG MỚI*\n\n🔹 Sản phẩm: ${title}\n🔹 Số lượng: ${qty}\n🔹 Tổng tiền: ${total.toLocaleString('vi-VN')}₫\n🔹 Địa chỉ: ${address}, ${ward}, ${province}\n\n🔹 Số điện thoại:   *${phone}*   [Gọi](https://cantieuly.net/goi/${phone}) | [Zalo](https://zalo.me/${phone})\n\n📝 Ghi chú: ${note || 'Không'}`;

    try {
      const TELEGRAM_BOT_TOKEN = '5572397080:AAFqa1dOYqvKrQ8-Wx5ez7PaqsVtvWU8vjA';
      const CHAT_ID = '-702616123';
      const res = await fetch(`https://ongmuot.com/cantieuly.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TELEGRAM_BOT_TOKEN, chat_id: CHAT_ID, text: message })
      });
      if (res.ok) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ event: 'purchase_success', value: total, currency: 'VND', transaction_id: 'order_' + Date.now() });

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

  /* 12. Ghi chú toggle */
  noteToggle.addEventListener('change', () => {
    if (noteToggle.checked) {
      noteWrap.classList.add('active');
      setTimeout(() => noteInput.focus(), 100);
    } else {
      noteWrap.classList.remove('active');
      noteInput.value = '';
    }
    saveFormData();
  });

  /* 13. Auto-save / restore */
  let saveFormData, restoreFormData;
  (() => {
    const STORAGE_KEY = 'popupFormData';
    const EXPIRE_DAYS = 10;
    const fields = ['cityx1', 'addressx1', 'phonex1', 'notex1'];

    function getStored() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const { ts, data } = JSON.parse(raw);
        if (Date.now() - ts > EXPIRE_DAYS * 86400000) {
          localStorage.removeItem(STORAGE_KEY); return null;
        }
        return data;
      } catch { return null; }
    }

    function store(obj) { localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data: obj })); }

    function fill(data) {
      if (!data) return;
      if (data.cityx1 && dataLoaded) {
        citySel.value = data.cityx1;
        citySel.dispatchEvent(new Event('change'));
        setTimeout(() => {
          if (data.wardx1) {
            wardInput.value = data.wardx1;
            const province = vnData.find(p => p.province_code === data.cityx1);
            if (province) {
              const w = province.wards.find(wd => wd.name === data.wardx1);
              if (w) wardInput.dataset.code = w.ward_code;
            }
          }
        }, 300);
      }
      if (data.addressx1) document.getElementById('addressx1').value = data.addressx1;
      if (data.phonex1) document.getElementById('phonex1').value = data.phonex1;
      if (data.notex1) {
        noteInput.value = data.notex1;
        noteToggle.checked = true;
        noteWrap.classList.add('active');
      }
    }

    saveFormData = function() {
      const obj = {};
      fields.forEach(fid => { obj[fid] = document.getElementById(fid)?.value || ''; });
      obj.wardx1 = wardInput.value;
      store(obj);
    };

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      ['change', 'input'].forEach(evt => el.addEventListener(evt, saveFormData));
    });
    
    wardInput.addEventListener('change', saveFormData);
    restoreFormData = function() { fill(getStored()); };
    document.getElementById('muahangx1').addEventListener('click', restoreFormData);
  })();

  /* ========== 14. LOGIC VOICE TO TEXT ========== */
  const openMicAddressBtn = document.getElementById('openMicBtnx1');
  const openMicNoteBtn = document.getElementById('openMicNoteBtnx1'); // Nút mic của note
  const voiceModal = document.getElementById('voiceModalx1');
  const retryBtn = document.getElementById('retryBtnx1');
  const okBtn = document.getElementById('okBtnx1');
  const previewText = document.getElementById('previewTextx1');
  const addressInput = document.getElementById('addressx1');
  const noteInputField = document.getElementById('notex1');

  // Biến lưu trữ ô input hiện tại đang được kích hoạt Voice
  let currentActiveInput = null; 

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if(openMicAddressBtn) openMicAddressBtn.style.display = 'none';
    if(openMicNoteBtn) openMicNoteBtn.style.display = 'none';
  } else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.continuous = false; 
    recognition.interimResults = true;

    let finalTranscript = '';
    let isVoiceModalOpen = false;

    // Hàm mở Mic dùng chung
    const openMicHandler = (targetInput) => {
      currentActiveInput = targetInput;
      finalTranscript = '';
      recognition.currentFinal = '';
      previewText.value = '';
      voiceModal.style.display = 'flex';
      isVoiceModalOpen = true; 
      try { recognition.start(); } catch(err) {}
    };

    // Gắn sự kiện mở Mic cho Address
    if(openMicAddressBtn) {
      openMicAddressBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMicHandler(addressInput);
      });
    }

    // Gắn sự kiện mở Mic cho Note
    if(openMicNoteBtn) {
      openMicNoteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openMicHandler(noteInputField);
      });
    }

    // Lắng nghe chỉnh sửa tay
    previewText.addEventListener('input', (e) => {
      finalTranscript = e.target.value;
      recognition.currentFinal = ''; 
    });

    // Xử lý Voice
    recognition.onresult = (event) => {
      let currentFinal = '';
      let currentInterim = '';

      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          currentFinal += event.results[i][0].transcript;
        } else {
          currentInterim += event.results[i][0].transcript;
        }
      }
      recognition.currentFinal = currentFinal;

      let baseText = finalTranscript;
      if (baseText && !baseText.endsWith(' ')) baseText += ' ';
      
      let midText = currentFinal;
      if (midText && !midText.endsWith(' ') && currentInterim) midText += ' ';

      previewText.value = baseText + midText + currentInterim;
    };

    // Khi kết thúc luồng nghe
    recognition.onend = () => {
      if (recognition.currentFinal) {
        let space = (finalTranscript && !finalTranscript.endsWith(' ')) ? ' ' : '';
        finalTranscript += space + recognition.currentFinal;
        recognition.currentFinal = ''; 
      }
      if (isVoiceModalOpen) {
        try { recognition.start(); } catch(err) {}
      }
    };

    // Nút Nói Lại
    retryBtn.addEventListener('click', () => {
      finalTranscript = '';
      recognition.currentFinal = '';
      previewText.value = '';
      previewText.focus(); 
      recognition.abort(); 
    });

    // Nút OK
    okBtn.addEventListener('click', () => {
      isVoiceModalOpen = false;
      recognition.stop();
      voiceModal.style.display = 'none';
      
      if(previewText.value.trim() !== '' && currentActiveInput) {
        // Cộng dồn nội dung cũ nếu là textarea Note, thay thế hoàn toàn nếu là Address
        if(currentActiveInput.id === 'notex1') {
            let existingVal = currentActiveInput.value.trim();
            currentActiveInput.value = existingVal ? existingVal + ' ' + previewText.value.trim() : previewText.value.trim();
        } else {
            currentActiveInput.value = previewText.value.trim();
        }
        saveFormData(); // Cập nhật dữ liệu vào local storage
      }
    });

    // Bấm ra ngoài để tắt Voice Modal
    voiceModal.addEventListener('click', (e) => {
      if (e.target === voiceModal) {
        isVoiceModalOpen = false;
        recognition.stop();
        voiceModal.style.display = 'none';
      }
    });
  }

  /* 15. Expose closePopup to global scope for modal footer button */
  window.closePopup = closePopup;
})();
