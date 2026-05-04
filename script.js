const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7X2GSFSv47zACFFIy0rueGXtXdR_92eTTjZCZVcHMkMYKbxU1dRX9oVYO3WR8Mjwk/exec';

const form = document.getElementById('feedbackForm');
form.action = GOOGLE_SCRIPT_URL;
form.method = 'POST';

let isSubmitting = false;

form.addEventListener('submit', function (e) {
    // Để form tự submit vào iframe, không dùng preventDefault
    isSubmitting = true;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.loader');
    const statusMessage = document.getElementById('statusMessage');

    submitBtn.disabled = true;
    btnText.textContent = 'Đang gửi...';
    loader.style.display = 'block';
    statusMessage.style.display = 'none';
});

// Bắt sự kiện khi iframe tải xong (tức là Google đã nhận được dữ liệu)
document.getElementById('hiddenIframe').onload = function () {
    if (isSubmitting) {
        isSubmitting = false;

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const loader = submitBtn.querySelector('.loader');

        showStatus('Gửi ý kiến thành công! Cảm ơn bạn đã đóng góp.', 'success');
        form.reset();

        submitBtn.disabled = false;
        btnText.textContent = 'Gửi Ý Kiến';
        loader.style.display = 'none';
    }
};

function showStatus(message, type) {
    const statusDiv = document.getElementById('statusMessage');
    statusDiv.textContent = message;
    statusDiv.className = 'status-message status-' + type;
    statusDiv.style.display = 'block';
}
