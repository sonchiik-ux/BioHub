// Функция для вывода гламурных кибер-уведомлений
function showCyberToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    
    toast.classList.add('cyber-toast', type);
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '🧬' : '⚠️'}</div>
        <div class="toast-message">${message}</div>
    `;
    
    container.appendChild(toast);
    
    // Удаляем уведомление после окончания анимации исчезновения
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}


function generateRandomDNA(length) {
    const nucleotides = ['A', 'T', 'C', 'G'];
    let result = '';
    for (let i = 0; i < length; i++) {
        result += nucleotides[Math.floor(Math.random() * nucleotides.length)];
    }
    return result;
}

let sequence = generateRandomDNA(56);
const container = document.getElementById("dna-sequence");

const colors = {
    A: "#d42c2cff", T: "#4d79ff", C: "#2dc72dff", G: "#d7d72bff"
};

let lastStartIndex = -1;
let lastTargetLength = 0;

function renderDNA() {
    container.innerHTML = "";
    sequence.split("").forEach(base => {
        const span = document.createElement("div");
        span.classList.add("base");
        span.textContent = base;
        span.style.backgroundColor = colors[base] || "#9ca3af";
        container.appendChild(span);
    });
}

renderDNA();

let cas9 = document.getElementById("cas9");
if (!cas9) {
    cas9 = document.createElement("div");
    cas9.id = "cas9";
    cas9.textContent = "✂️";
    document.body.appendChild(cas9);
}

// Плавный скролл из шапки к симулятору
document.getElementById("to-sim-btn").addEventListener("click", () => {
    document.getElementById("simulation-zone").scrollIntoView({ behavior: "smooth" });
});

// Клик по кнопкам-опциям внутри раздела симулятора
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        const replace = btn.getAttribute("data-replace");
        
        const midPoint = Math.floor(sequence.length / 3);
        const leftPart = sequence.slice(0, midPoint);
        const rightPart = sequence.slice(midPoint + target.length + 2);
        
        sequence = leftPart + target + "GG" + rightPart;
        renderDNA();

        document.getElementById("guideRNA").value = target;
        document.getElementById("replaceRNA").value = replace;
        
        document.getElementById("step-2").style.display = "none";
        cas9.style.left = "-100px";
    });
});

// ШАГ 1: Поиск
document.getElementById("findBtn").addEventListener("click", () => {
    const target = document.getElementById("guideRNA").value.toUpperCase().trim();

    if (!target) {
        if (!target) {
    showCyberToast("Введите последовательность для поиска!", "error");
    return;
}

    }

    let start = sequence.indexOf(target);
    const bases = document.querySelectorAll(".base");
    bases.forEach(b => b.classList.remove("target", "pam-target", "slice-effect"));

    // И чуть ниже:
if (start === -1) {
    // твоя логика...
    showCyberToast("🔍 Последовательность не найдена, генерируем оптимальный участок...", "error");
}

    const pamIndex = start + target.length;
    const updatedSequenceArray = sequence.split("");
    updatedSequenceArray[pamIndex] = "G";
    updatedSequenceArray[pamIndex + 1] = "G";
    sequence = updatedSequenceArray.join("");
    renderDNA();

    const updatedBases = document.querySelectorAll(".base");
    lastStartIndex = start;
    lastTargetLength = target.length;

    for (let i = start; i < start + target.length; i++) {
        updatedBases[i].classList.add("target");
    }
    
    updatedBases[pamIndex].classList.add("pam-target");
    updatedBases[pamIndex + 1].classList.add("pam-target");

    const targetElement = updatedBases[start];
    const rect = targetElement.getBoundingClientRect();
    cas9.style.left = (rect.left + window.scrollX + (rect.width / 2) - 20) + "px";
    cas9.style.top = (rect.top + window.scrollY - 50) + "px";

    document.getElementById("step-2").style.display = "flex";
});

// ШАГ 2: Замена
document.getElementById("editBtn").addEventListener("click", () => {
    const replacement = document.getElementById("replaceRNA").value.toUpperCase().trim();
    
    if (!replacement) {
    showCyberToast("Введите новую последовательность для вставки!", "error");
    return;
}

    const bases = document.querySelectorAll(".base");

    for (let i = lastStartIndex; i < lastStartIndex + lastTargetLength; i++) {
        bases[i].classList.add("slice-effect");
    }

    setTimeout(() => {
        const leftPart = sequence.slice(0, lastStartIndex);
        const rightPart = sequence.slice(lastStartIndex + lastTargetLength);
        
        const successChance = Math.random(); 
        
        if (successChance <= 0.30) {
        sequence = leftPart + replacement + rightPart;
        showCyberToast(`Успех HDR! Цепь заменена на донорский шаблон: ${replacement}`, "success");
    } else {
        const mutations = ["AAAA", "TTTT", "CC", "GG", "🧬X"];
        const randomMutation = mutations[Math.floor(Math.random() * mutations.length)];
        sequence = leftPart + randomMutation + rightPart;
        showCyberToast(`Сбой HDR! Клетка применила метод NHEJ. Случайная мутация: ${randomMutation}`, "error");
    }   
        
        renderDNA();
        
        cas9.style.left = "-100px";
        document.getElementById("step-2").style.display = "none";
        document.getElementById("guideRNA").value = "";
        document.getElementById("replaceRNA").value = "";
    }, 500);
});
