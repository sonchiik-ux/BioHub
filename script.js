// ==========================================================================
// 1. ИНИЦИАЛИЗАЦИЯ И СЛУЧАЙНАЯ ГЕНЕРАЦИЯ ДНК
// ==========================================================================

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
    A: "#d42c2cff",
    T: "#4d79ff",
    C: "#2dc72dff",
    G: "#d7d72bff"
};

let lastStartIndex = -1;
let lastTargetLength = 0;

function renderDNA() {
    if (!container) return;
    container.innerHTML = "";
    sequence.split("").forEach(base => {
        const span = document.createElement("div");
        span.classList.add("base");
        span.textContent = base;
        span.style.backgroundColor = colors[base] || "#9ca3af";
        container.appendChild(span);
    });
}

// Запуск рендера цепочки
renderDNA();

let cas9 = document.getElementById("cas9");
if (!cas9) {
    cas9 = document.createElement("div");
    cas9.id = "cas9";
    cas9.textContent = "✂️";
    document.body.appendChild(cas9);
}

// ==========================================================================
// 2. СИСТЕМНЫЕ КИБЕР-ТОСТЫ (УВЕДОМЛЕНИЯ)
// ==========================================================================

function showCyberToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.classList.add('cyber-toast', type);
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '🧬' : '⚠️'}</div>
        <div class="toast-message">${message}</div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ==========================================================================
// 3. ИНТЕРАКТИВНЫЙ СЛАЙДЕР / СМЕНА СОСТОЯНИЯ РОБО-РУКИ
// ==========================================================================

function updateProsthesisVisual(status) {
    const statusPanel = document.getElementById("prosthesis-status-panel");
    const statusIcon = document.getElementById("status-panel-icon");
    const statusText = document.getElementById("status-panel-text");
    const armSvg = document.getElementById("interactive-prosthesis");
    
    const neonElements = [
        document.getElementById("elbow-neon"), document.getElementById("wrist-neon"),
        document.getElementById("palm-neon"), document.getElementById("thumb-neon"),
        document.getElementById("f1-neon"), document.getElementById("f2-neon"),
        document.getElementById("f3-neon"), document.getElementById("f4-neon")
    ];

    if (!statusPanel || !statusIcon || !statusText || !armSvg) return;

    if (status === 'success') {
        statusPanel.className = "cyber-status-panel status-success";
        statusIcon.innerText = "🔵";
        statusText.innerText = "ИНТЕГРАЦИЯ: УСПЕШНО // НЕЙРО-ИНТЕРФЕЙС СИНХРОНИЗИРОВАН";
        
        // Рука плавно светится стабильным бирюзовым цветом
        armSvg.style.filter = "drop-shadow(0 15px 30px rgba(0, 240, 255, 0.6))";
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#00f0ff";
                if (el.tagName === 'circle') el.style.fill = "#00f0ff";
                el.style.animation = "none";
                el.style.opacity = "1";
            }
        });
    } else if (status === 'error') {
        statusPanel.className = "cyber-status-panel status-error";
        statusIcon.innerText = "🔴";
        statusText.innerText = "ИНТЕГРАЦИЯ: СБОЙ // КОНФЛИКТ ТКАНЕЙ (ОТТОРЖЕНИЕ ПРОТЕЗА)";
        
        // Рука приобретает аварийный красный оттенок и мигает
        armSvg.style.filter = "drop-shadow(0 15px 30px rgba(255, 0, 85, 0.6))";
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#ff0055";
                if (el.tagName === 'circle') el.style.fill = "#ff0055";
                el.style.animation = "blink 0.4s infinite";
            }
        });
    } else {
        // Режим ожидания (Номинальный)
        statusPanel.className = "cyber-status-panel status-nominal";
        statusIcon.innerText = "🟢";
        statusText.innerText = "ИНТЕГРАЦИЯ: СТАБИЛЬНО (ОЖИДАНИЕ МОДИФИКАЦИИ)";
        armSvg.style.filter = "drop-shadow(0 10px 20px rgba(0,0,0,0.25))";
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#00f0ff";
                if (el.tagName === 'circle') el.style.fill = "#00f0ff";
                el.style.animation = "none";
                el.style.opacity = "1";
            }
        });
    }
}

// ==========================================================================
// 4. ГЛАВНОЕ МЕНЮ ВКЛАДОК САЙТА (HUB NAVIGATION)
// ==========================================================================

document.querySelectorAll(".hub-tab-btn").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
        document.querySelectorAll(".hub-tab-btn").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active"); // ИСПРАВЛЕНО ИСТОЧНИК ПОЛОМКИ ВКЛАДОК

        document.querySelectorAll(".hub-content").forEach(content => content.classList.remove("active-content"));
        
        const hubId = tabBtn.getAttribute("data-hub");
        const targetContent = document.getElementById(`hub-${hubId}`);
        if (targetContent) {
            targetContent.classList.add("active-content");
        }
        
        if (hubId === 'nature') {
            renderNatureStep(1);
            const initialNatureTab = document.querySelector('.tab-btn[data-step="1"]');
            if (initialNatureTab) {
                document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
                initialNatureTab.classList.add("active");
            }
        }
        
        if (cas9) cas9.style.left = "-100px";
    });
});

const startExploreBtn = document.getElementById("start-explore-btn");
if (startExploreBtn) {
    startExploreBtn.addEventListener("click", () => {
        const labTab = document.querySelector('[data-hub="lab"]');
        if (labTab) {
            labTab.click();
            const contentHub = document.getElementById("content-hub");
            if (contentHub) contentHub.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// ==========================================================================
// 5. ЛОГИКА CRISPR В ПРИРОДЕ (ВКЛАДКА 2)
// ==========================================================================

const natureSteps = {
    1: {
        title: "Шаг 1: Атака вируса и Адаптация (Запоминание)",
        text: "Враждебный вирус (бактериофаг) атакует клетку и впрыскивает свою ДНК. Специальные белки бактерии вырезают фрагмент вирусного кода и вставляют его в геном бактерии — в архив CRISPR. Теперь у клетки есть «фотография» преступника.",
        html: `<div class="phage-virus">👾</div><div class="virus-dna">➔ ➔ AGTC ➔</div><div class="bacteria-wall"></div><div class="crisp-archive"><span class="archive-spacer">⚠️ CRISPR Архив:</span><span class="archive-spacer">CGTA</span><span class="archive-spacer new-spacer">AGTC</span></div>`
    },
    2: {
        title: "Шаг 2: Экспрессия (Выпуск ориентировок)",
        text: "Когда архив сформирован, бактерия постоянно копирует эти вирусные кусочки, превращая их в маленькие путеводные нити crРНК. Каждая такая РНК заряжается в молекулярный патрульный белок Cas9. Получается вооруженный комплекс с точной ориентировкой на вирус.",
        html: `<div class="cas9-protein">🤖<div class="rna-tail">crРНК: AGTC</div></div><div style="color: #00f0ff; font-size: 1.4rem; font-weight: bold; animation: blink 1.5s infinite;">⚙️ Выпуск патрулей...</div>`
    },
    3: {
        title: "Шаг 3: Интерференция (Уничтожение вируса)",
        text: "При повторной атаке вируса патруль Cas9 сверяет его ДНК со своей crРНК. Как только буквы идеально совпадают, Cas9 активирует свои лезвия и разрезает ДНК вируса пополам. Вирус обезврежен, бактерия спасена!",
        html: `<div class="cas9-protein" style="animation: armFloat 2s infinite;">🤖<div class="rna-tail">AGTC</div></div><div style="font-size: 2.5rem; transform: rotate(-20deg);">✂️</div><div class="virus-dna" style="text-decoration: line-through; color: #4b5563; filter: blur(1px);">AGTC (ДНК ВИРУСА)</div><div style="font-size: 3rem;">💥</div>`
    }
};

function renderNatureStep(stepNumber) {
    const stepData = natureSteps[stepNumber];
    const visualContainer = document.getElementById("nature-visual");
    const titleContainer = document.getElementById("nature-step-title");
    const textContainer = document.getElementById("nature-step-text");

    if (visualContainer && titleContainer && textContainer && stepData) {
        visualContainer.innerHTML = stepData.html;
        titleContainer.innerText = stepData.title;
        textContainer.innerText = stepData.text;
    }
}

// ИСПРАВЛЕНО: Активируем первый шаг бактерий сразу, чтобы не висела вечная загрузка
renderNatureStep(1);

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const step = btn.getAttribute("data-step");
        renderNatureStep(step);
    });
});

// ==========================================================================
// 6. ИНТЕРАКТИВНАЯ ЛАБОРАТОРИЯ & МОДИФИКАЦИЯ
// ==========================================================================

document.querySelectorAll(".preset-btn").forEach(btn => {
btn.addEventListener("click", () => {
const target = btn.getAttribute("data-target");
const replace = btn.getAttribute("data-replace");
const midPoint = Math.floor(sequence.length / 3);
const leftPart = sequence.slice(0, midPoint);
const rightPart = sequence.slice(midPoint + target.length + 2);
sequence = leftPart + target + "GG" + rightPart;
renderDNA();
updateProsthesisVisual('nominal');
document.getElementById("guideRNA").value = target;
document.getElementById("replaceRNA").value = replace;
document.getElementById("step-2").style.display = "none";
if (cas9) cas9.style.left = "-100px";
showCyberToast(`Пресет загружен! Цель: ${target}. Донор: ${replace}`, "success");
});
});
const findBtn = document.getElementById("findBtn");
if (findBtn) {
findBtn.addEventListener("click", () => {
const target = document.getElementById("guideRNA").value.toUpperCase().trim();
if (!target) {
showCyberToast("Введите последовательность для поиска!", "error");
return;
}
let start = sequence.indexOf(target);
const bases = document.querySelectorAll(".base");
bases.forEach(b => b.classList.remove("target", "pam-target", "slice-effect"));
if (start === -1) {
const insertIndex = Math.floor(sequence.length / 2);
const leftPart = sequence.slice(0, insertIndex);
const rightPart = sequence.slice(insertIndex + target.length + 2);
sequence = leftPart + target + "GG" + rightPart;
renderDNA();
start = insertIndex;
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
if (cas9) {
cas9.style.left = (rect.left + window.scrollX + (rect.width / 2) - 20) + "px";
cas9.style.top = (rect.top + window.scrollY - 50) + "px";
}
showCyberToast("Cas9 успешно состыковался с целью! Найден PAM-маркер (GG).", "success");
document.getElementById("step-2").style.display = "flex";
});
}
const editBtn = document.getElementById("editBtn");
if (editBtn) {
editBtn.addEventListener("click", () => {
const replacement = document.getElementById("replaceRNA").value.toUpperCase().trim();
const syringe = document.getElementById("injector-syringe");
if (!replacement) {
showCyberToast("Введите новую последовательность для вставки!", "error");
return;
}
if (syringe) {
syringe.classList.add("injecting");
showCyberToast("Впрыск донорского РНК комплекса...", "success");
}
setTimeout(() => {
if (syringe) syringe.classList.remove("injecting");
const bases = document.querySelectorAll(".base");
for (let i = lastStartIndex; i < lastStartIndex + lastTargetLength; i++) {
if (bases[i]) bases[i].classList.add("slice-effect");
}
setTimeout(() => {
const leftPart = sequence.slice(0, lastStartIndex);
const rightPart = sequence.slice(lastStartIndex + lastTargetLength);
const successChance = Math.random();
if (successChance <= 0.30) {
sequence = leftPart + replacement + rightPart;
showCyberToast(`Успех HDR! Клетка успешно внедрила шаблон: ${replacement}`, "success");
updateProsthesisVisual('success'); // ВИЗУАЛЬНЫЙ ЭФФЕКТ СЛАЙДЕРА (СТАБИЛИЗАЦИЯ)
} else {
const mutations = ["AAAA", "TTTT", "CC", "GG", "🧬X"];
const randomMutation = mutations[Math.floor(Math.random() * mutations.length)];
sequence = leftPart + randomMutation + rightPart;
showCyberToast(`Сбой HDR! Сработал метод NHEJ. Мутация: ${randomMutation}`, "error");
updateProsthesisVisual('error'); // ВИЗУАЛЬНЫЙ ЭФФЕКТ СЛАЙДЕРА (ОТТОРЖЕНИЕ)
}
renderDNA();
if (cas9) cas9.style.left = "-100px";
document.getElementById("step-2").style.display = "none";
document.getElementById("guideRNA").value = "";
document.getElementById("replaceRNA").value = "";
}, 500);
}, 800);
});
}
// ==========================================================================
// 7. ИНТЕРАКТИВНЫЙ ЭТИЧЕСКИЙ ОПРОС CRISPR
// ==========================================================================
document.querySelectorAll(".ethics-card").forEach(card => {
const actionBlock = card.querySelector(".ethics-actions");
const votesBlock = card.querySelector(".ethics-votes");
card.querySelectorAll(".vote-btn").forEach(btn => {
btn.addEventListener("click", () => {
if (actionBlock && votesBlock) {
actionBlock.style.display = "none";
votesBlock.style.display = "flex";
showCyberToast("Ваш голос учтен в глобальной базе биоинженеров!", "success");
}
});
});
});
