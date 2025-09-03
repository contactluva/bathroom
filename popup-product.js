/* popup-product.js – toàn bộ CSS + JS dạng IIFE */
(() => {
  /* 1. CSS inline */
  const style = document.createElement('style');
  style.textContent = `
    /* Ẩn nút mặc định */
#muahangx1 {
    position: fixed;
    left: 19px;
    bottom: 16px;
    z-index: 999;
    opacity: 1;
    
    transition: opacity .25s;
    color: #fff;
    background: #e82608;
    border-radius: 30px;
    padding: 8px 25px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
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
    font-size: 17px;
    font-weight: 700;
    color: #202124;
    margin-bottom: 8px;
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
    font-size: 18px;
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
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a 2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1M8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/></svg> Mua ngay`;
    document.body.appendChild(btn);
  }

  /* 3. HTML popup – chèn động */
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
            <select class="form-selectx1 form-select-smx1" id="cityx1"><option value="" selected>Tỉnh/TP</option></select>
            <select class="form-selectx1 form-select-smx1" id="districtx1"><option value="" selected>Q/Huyện</option></select>
          </div>
          <div class="form-rowx1 fullx1">
            <select class="form-selectx1 form-select-smx1" id="wardx1"><option value="" selected>P/Xã</option></select>
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
          <div class="honeypotx1"><input type="text" id="websitex1"></div>
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

  /* 4. Lấy data sản phẩm từ DOM WooCommerce */
  const img = document.querySelector('.woocommerce-product-gallery__wrapper img')?.src || '';
  const title = document.querySelector('.product_title')?.textContent || '';
  const price = document.querySelector('.price .woocommerce-Price-amount bdi')?.textContent || '';
  const priceRaw = parseFloat(price.replace(/[^\d]/g,''));

  document.getElementById('popupImg').src = img;
  document.getElementById('popupTitle').textContent = title;
  document.getElementById('totalSpanx1').textContent = price;
  document.getElementById('totalSpanx1').dataset.price = priceRaw;

  /* 5. Xử lý JS còn lại (open/close, tính tổng, gửi Telegram, lưu localStorage,…) */
  
<!-- Axios & địa chỉ VN -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
<script>
/* ===== ĐỊA CHỈ VIỆT NAM ===== */
const cityx1   = document.getElementById('cityx1');
const districtx1 = document.getElementById('districtx1');
const wardx1   = document.getElementById('wardx1');
axios({url:'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',method:'GET',responseType:'json'})
  .then(res=>{
    const data=res.data;
    data.forEach(p=>cityx1.add(new Option(p.Name,p.Id)));
    cityx1.addEventListener('change',()=>{
      districtx1.length=1;wardx1.length=1;
      if(cityx1.value){
        data.find(p=>p.Id===cityx1.value).Districts.forEach(d=>districtx1.add(new Option(d.Name,d.Id)));
      }
    });
    districtx1.addEventListener('change',()=>{
      wardx1.length=1;
      if(districtx1.value){
        const p=data.find(p=>p.Id===cityx1.value);
        p.Districts.find(d=>d.Id===districtx1.value).Wards.forEach(w=>wardx1.add(new Option(w.Name,w.Id)));
      }
    });
  });

/* ===== XỬ LÝ POPUP ===== */
const btnOpenx1  = document.getElementById('muahangx1');
const overlayx1  = document.getElementById('overlayx1');
const closeBtnx1 = document.getElementById('closeBtnx1');
const submitBtnx1 = document.getElementById('submitOrderx1');
const responseMsgx1 = document.getElementById('responseMsgx1');
const modalFooterx1 = document.getElementById('modalFooterx1');

btnOpenx1.addEventListener('click',()=>overlayx1.style.display='flex');
closeBtnx1.addEventListener('click',closePopup);
overlayx1.addEventListener('click',e=>{if(e.target===overlayx1)closePopup();});
function closePopup(){overlayx1.style.display='none';responseMsgx1.textContent='';modalFooterx1.style.display='none';}

/* ===== TÍNH TỔNG TIỀN ===== */
function updateTotal(){
  document.getElementById('totalSpanx1').textContent = (100000*parseInt(qtySelx1.value,10)).toLocaleString('vi-VN')+'đ';
}
const qtySelx1=document.getElementById('qtyx1');
qtySelx1.addEventListener('change',updateTotal);
updateTotal();

/* ===== ĐẾM NGƯỢC & ĐÓNG ===== */
function countdown(sec){
responseMsgx1.innerHTML = `
  <div style="color:#006400;font-size:16px;font-weight:600">
    Đơn hàng của bạn đã gửi đi, vui lòng đợi chúng tôi xác nhận!<br>
    Tự động đóng trong <span id="countx1">${sec}</span>s
  </div>`;
  modalFooterx1.style.display='flex';
  const timer=setInterval(()=>{
    sec--;
    document.getElementById('countx1').textContent=sec;
    if(sec<=0){clearInterval(timer);closePopup();}
  },1000);
}

/* ===== SUBMIT ===== */
submitBtnx1.addEventListener('click',async()=>{
  if(document.getElementById('websitex1').value.trim()!==''){responseMsgx1.textContent='Bot detected – order NOT sent!';return;}
  const qty=qtySelx1.value;
  const total=100000*qty;
  const province=cityx1.options[cityx1.selectedIndex]?.text||'';
  const districtSelx1=document.getElementById('districtx1');
  const district=districtSelx1.options[districtSelx1.selectedIndex]?.text||'';
  const wardSelx1=document.getElementById('wardx1');
  const ward=wardSelx1.options[wardSelx1.selectedIndex]?.text||'';
  const address=document.getElementById('addressx1').value.trim();
  const phone=document.getElementById('phonex1').value.trim();
  const note=document.getElementById('notex1').value.trim();
  if(!province||!district||!ward||!address||!phone){responseMsgx1.textContent='Vui lòng điền đầy đủ thông tin!';return;}
  if(!/^\d{10,11}$/.test(phone)){responseMsgx1.textContent='Số điện thoại không hợp lệ!';return;}
  submitBtnx1.disabled=true;
  const message=`*Đơn hàng mới*\nSản phẩm: Sản phẩm A\nSố lượng: ${qty}\nTổng tiền: ${total.toLocaleString('vi-VN')}đ\nĐịa chỉ: ${address}, ${ward}, ${district}, ${province}\nSĐT: ${phone}\nGhi chú: ${note||'Không'}`;
  try{
    const TELEGRAM_BOT_TOKEN = '7046417265:AAGtJzqnUXBP_iFAosujmMgqesfZeQOdCL8';
    const CHAT_ID = '-4244295504';

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );
    if (res.ok) {
      /* 1. Ẩn toàn bộ nội dung trong popup */
      document.querySelectorAll('#popupmhx1 > *:not(#responseMsgx1):not(.modal-footerx1)')
              .forEach(el => el.style.display = 'none');

      /* 2. Hiện thông báo & nút đóng */
      responseMsgx1.style.display = 'block';   // chắc chắn hiện
      modalFooterx1.style.display = 'flex';

      /* 3. Bắt đầu đếm ngược */
      countdown(5);
    }
    else{const err=await res.json();throw new Error(err.description||'Lỗi không xác định');}
  }catch(e){responseMsgx1.textContent='Lỗi gửi đơn: '+e.message;}
  finally{submitBtnx1.disabled=false;}
});

/* ===== HIỆN/ẨN Ô GHI CHÚ ===== */
document.getElementById('showNotex1').addEventListener('change', function () {
  document.getElementById('noteBoxx1').style.display = this.checked ? 'block' : 'none';
});
</script>
<script>
/* ===== AUTO-SAVE / RESTORE / EXPIRE FORM DATA ===== */
(() => {
  const STORAGE_KEY = 'popupFormData';
  const EXPIRE_DAYS = 10;
  const fields = ['cityx1', 'districtx1', 'wardx1', 'addressx1', 'phonex1', 'notex1'];

  // Lấy data từ localStorage, nếu còn hạn
  function getStoredData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      const ageMs = Date.now() - ts;
      if (ageMs > EXPIRE_DAYS * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return data;
    } catch { return null; }
  }

  // Lưu data kèm timestamp
  function storeData(obj) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), data: obj }));
  }

  // Điền dữ liệu vào form
  function fillForm(data) {
    if (!data) return;
    data.cityx1 && (cityx1.value = data.cityx1);
    if (data.cityx1) {
      // Kích hoạt change để load quận/huyện
      cityx1.dispatchEvent(new Event('change'));
      setTimeout(() => {
        data.districtx1 && (districtx1.value = data.districtx1);
        if (data.districtx1) {
          districtx1.dispatchEvent(new Event('change'));
          setTimeout(() => {
            data.wardx1 && (wardx1.value = data.wardx1);
          }, 50);
        }
      }, 50);
    }
    data.addressx1 && (document.getElementById('addressx1').value = data.addressx1);
    data.phonex1   && (document.getElementById('phonex1').value   = data.phonex1);
    data.notex1    && (document.getElementById('notex1').value    = data.notex1);
    if (data.notex1) {
      document.getElementById('showNotex1').checked = true;
      document.getElementById('noteBoxx1').style.display = 'block';
    }
  }

  // Lắng nghe thay đổi để lưu
  fields.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', saveCurrentForm);
    el.addEventListener('input',  saveCurrentForm);   // cho text/textarea
  });

  function saveCurrentForm() {
    const data = {};
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) data[id] = el.value;
    });
    storeData(data);
  }

  // Restore dữ liệu khi mở popup
  document.getElementById('muahangx1').addEventListener('click', () => {
    fillForm(getStoredData());
  });
})();
</script>
})();
