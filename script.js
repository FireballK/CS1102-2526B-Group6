// 1. 取得按鈕元件
let mybutton = document.getElementById("backToTop");

// 2. 當網頁捲動時執行功能
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (!mybutton) return;

    // --- A. 控制按鈕顯示或隱藏 ---
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }

    // --- B. 防止遮擋 Footer 的邏輯 ---
    let footer = document.querySelector("footer");
    if (footer) {
        // 取得 Footer 距離目前視窗頂部的距離
        let footerRect = footer.getBoundingClientRect();
        let windowHeight = window.innerHeight;

        // 如果 Footer 已經進入視窗範圍
        if (footerRect.top < windowHeight) {
            // 計算按鈕需要向上推多少像素 (視窗高度 - Footer頂部距離 + 20px 間距)
            let offset = windowHeight - footerRect.top + 20;
            mybutton.style.bottom = offset + "px";
        } else {
            // 平時固定在距離底部 20px
            mybutton.style.bottom = "20px";
        }
    }
}

// 3. 點擊按鈕回到頂部
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // 平滑捲動
    });
}


function calculateResult() {
    const form = document.getElementById('risk-quiz');
    const formData = new FormData(form);
    let totalScore = 0;
    let answeredQuestions = 0;

    // 計算總分
    for (let value of formData.values()) {
        totalScore += parseInt(value);
        answeredQuestions++;
    }

    // 檢查是否所有問題都答了（這裏是 6 題）
    if (answeredQuestions < 6) {
        alert("Please answer all questions before submitting.");
        return;
    }

    let profile = "";
    let level = "";
    let description = "";

    // 根據你的分數機制判斷
    if (totalScore >= 6 && totalScore <= 9) {
        profile = "Conservative Strategy";
        level = "Risk Level: 1-3";
        description = "Your priority is capital preservation. You prefer stability and are less comfortable with market fluctuations. A portfolio with a high allocation of bonds and cash equivalents is recommended.";
    } else if (totalScore >= 10 && totalScore <= 14) {
        profile = "Moderate Strategy";
        level = "Risk Level: 4-7";
        description = "You seek a balance between growth and safety. You can tolerate some market volatility in exchange for moderate long-term returns. A 50/50 mix of stocks and bonds is often suitable.";
    } else if (totalScore >= 15 && totalScore <= 18) {
        profile = "Aggressive Strategy";
        level = "Risk Level: 8-10";
        description = "You are focused on maximum long-term wealth accumulation. You have a high risk tolerance and can withstand significant market drops (30-50%) for the potential of higher rewards.";
    }

    // 顯示結果頁面，隱藏 Quiz
    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';

    // 填入結果文字
    document.getElementById('profile-name').innerHTML = `${profile} <br><small style="color: #666; font-size: 0.9rem;">(${level})</small>`;
    document.getElementById('profile-desc').innerText = description;
    
    // 捲動到頂部方便看結果
    window.scrollTo({ top: 0, behavior: 'smooth' });
    drawPieChart(profile);

// --- 新加的畫圖邏輯 ---
    function drawPieChart(profile) {
        const chart = document.getElementById('pie-chart');
        const legend = document.getElementById('chart-legend');
        
        if (profile === "Conservative Strategy") {
            // 80% Bonds (Green), 20% Stocks (Blue)
            chart.style.background = "conic-gradient(#2e7d32 0% 80%, #1976d2 80% 100%)";
            legend.innerHTML = '<div><span style="background:#2e7d32"></span> Bonds: 80%</div><div><span style="background:#1976d2"></span> Stocks: 20%</div>';
        } else if (profile === "Moderate Strategy") {
            // 50% Stocks (Blue), 50% Bonds (Green)
            chart.style.background = "conic-gradient(#1976d2 0% 50%, #2e7d32 50% 100%)";
            legend.innerHTML = '<div><span style="background:#1976d2"></span> Stocks: 50%</div><div><span style="background:#2e7d32"></span> Bonds: 50%</div>';
        } else if (profile === "Aggressive Strategy") {
            // 90% Stocks (Blue), 10% Bonds (Green)
            chart.style.background = "conic-gradient(#1976d2 0% 90%, #2e7d32 90% 100%)";
            legend.innerHTML = '<div><span style="background:#1976d2"></span> Stocks: 90%</div><div><span style="background:#2e7d32"></span> Bonds: 10%</div>';
        }
    }
}
function resetQuiz() {
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('risk-quiz').reset();
}