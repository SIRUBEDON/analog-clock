// 時計の針を更新する関数
function setTime() {
    const now = new Date();
    
    // 秒針の角度を計算
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90; // +90で初期位置を調整
    const secondHand = document.querySelector('.second-hand');
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    
    // 分針の角度を計算（より滑らかな動きのために秒も考慮）
    const minutes = now.getMinutes();
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const minuteHand = document.querySelector('.minute-hand');
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    
    // 時針の角度を計算（より滑らかな動きのために分も考慮）
    const hours = now.getHours() % 12; // 12時間形式に変換
    const hoursDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    const hourHand = document.querySelector('.hour-hand');
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// 初期時間をセット
setTime();

// 1秒ごとに時間を更新
setInterval(setTime, 1000);

// 秒針が一周した時のトランジションのバグを修正
const secondHand = document.querySelector('.second-hand');
secondHand.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'transform') {
        const now = new Date();
        if (now.getSeconds() === 0) {
            this.style.transition = 'none';
            setTimeout(() => {
                this.style.transition = 'all 0.05s';
            }, 10);
        }
    }
});

// ページ読み込み完了時に数字の配置を修正
document.addEventListener('DOMContentLoaded', function() {
    // 時計の文字盤の数字にspanを追加して適切な角度に調整
    document.querySelectorAll('.number').forEach(function(number) {
        const text = number.textContent;
        number.innerHTML = `<span>${text}</span>`;
    });
});