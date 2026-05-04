const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzuM-1zwcEm3kYM8AKSijgov75C3Gn8rK7QbD-E_b7NUTPdadQecatYlZITtcrVPEMN/exec';

const form = document.getElementById('feedbackForm');
let isSubmitting = false;

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn form tải lại trang

    if (isSubmitting) return;
    isSubmitting = true;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const statusMessage = document.getElementById('statusMessage');

    submitBtn.disabled = true;
    btnText.textContent = 'Đang gửi...';
    loader.style.display = 'block';
    statusMessage.style.display = 'none';

    // Tạo dữ liệu gửi đi
    const formData = new FormData(form);
    const params = new URLSearchParams();
    for (const pair of formData.entries()) {
        params.append(pair[0], pair[1]);
    }

    // Dùng fetch với mode 'no-cors' để chặn mọi lỗi Console
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: params,
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(() => {
        showStatus('Gửi ý kiến thành công! Cảm ơn bạn đã đóng góp.', 'success');
        form.reset();
    }).catch(error => {
        showStatus('Có lỗi xảy ra, vui lòng thử lại sau.', 'error');
    }).finally(() => {
        isSubmitting = false;
        submitBtn.disabled = false;
        btnText.textContent = 'Gửi Ý Kiến';
        loader.style.display = 'none';
    });
});

function showStatus(message, type) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message status-' + type;
    statusDiv.style.display = 'block';
}
