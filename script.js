//Back to top
let mybutton = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (!mybutton) return;

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }

    let footer = document.querySelector("footer");
    if (footer) {
        let footerRect = footer.getBoundingClientRect();
        let windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
            let offset = windowHeight - footerRect.top + 15;
            mybutton.style.bottom = offset + "px";
        } else {
            mybutton.style.bottom = "15px";
        }
    }
}

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


//Quiz result
function calculateResult() {
    const form = document.getElementById('risk-quiz');
    const formData = new FormData(form);
    let totalScore = 0;
    let answeredQuestions = 0;

    for (let value of formData.values()) {
        totalScore += parseInt(value);
        answeredQuestions++;
    }

    if (answeredQuestions < 6) {
        alert("Please answer all questions before submitting.");
        return;
    }

    let profile = "";
    let level = "";
    let description = "";
    let scoreRange = "";

    if (totalScore >= 6 && totalScore <= 9) {
        profile = "Conservative Strategy";
        level = "Risk Level: 1-3";
        scoreRange = "6-9 marks";
        description = "Your priority is capital preservation. You prefer stability and are less comfortable with market fluctuations. A portfolio with a high allocation of bonds and cash equivalents is recommended.";
    } else if (totalScore >= 10 && totalScore <= 14) {
        profile = "Moderate Strategy";
        level = "Risk Level: 4-7";
        scoreRange = "10-14 marks";
        description = "You seek a balance between growth and safety. You can tolerate some market volatility in exchange for moderate long-term returns. A 50/50 mix of stocks and bonds is often suitable.";
    } else if (totalScore >= 15 && totalScore <= 18) {
        profile = "Aggressive Strategy";
        level = "Risk Level: 8-10";
        scoreRange = "15-18 marks";
        description = "You are focused on maximum long-term wealth accumulation. You have a high risk tolerance and can withstand significant market drops (30-50%) for the potential of higher rewards.";
    }

    document.getElementById('quiz-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';

    document.getElementById('profile-name').innerHTML = `${profile} <br><small style="color: #666; font-size: 0.9rem;">Yout total marks: ${totalScore} marks.`;
    document.getElementById('profile-desc').innerText = description;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    drawPieChart(profile);

    function drawPieChart(profile) {
        const chart = document.getElementById('pie-chart');
        const legend = document.getElementById('chart-legend');
        
        if (profile === "Conservative Strategy") {
            chart.style.background = "conic-gradient(#2e7d32 0% 80%, #1976d2 80% 100%)";
            legend.innerHTML = '<div><span style="background:#2e7d32"></span> Bonds: 80%</div><div><span style="background:#1976d2"></span> Stocks: 20%</div>';
        } else if (profile === "Moderate Strategy") {
            chart.style.background = "conic-gradient(#1976d2 0% 50%, #2e7d32 50% 100%)";
            legend.innerHTML = '<div><span style="background:#1976d2"></span> Stocks: 50%</div><div><span style="background:#2e7d32"></span> Bonds: 50%</div>';
        } else if (profile === "Aggressive Strategy") {
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

//Simulator
function runSimulation() {
    let principal = document.getElementById('amount').value;
    let years = document.getElementById('years').value;
    let rate = document.getElementById('strategy').value;

    if (principal == "" || years == "") {
        alert("Please enter both amount and years.");
        return;
    }
    let P = parseFloat(principal);
    let n = parseInt(years);
    let r = parseFloat(rate);
    let futureValue = P * Math.pow((1 + r), n);
    let resultDiv = document.getElementById('sim-result');
    resultDiv.innerHTML = "Estimated Future Value: $" + futureValue.toFixed(2);
}