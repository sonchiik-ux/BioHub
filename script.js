// ==========================================================================
// ЧАСТЬ 1: ИНИЦИАЛИЗАЦИЯ, СЛУЧАЙНАЯ ДНК, КИБЕР-ТОСТЫ И ГЛАВНЫЕ ВКЛАДКИ
// ==========================================================================

// УМНАЯ ПРОВЕРКА: JS автоматически понимает язык по названию файла страницы
const isEn = window.location.href.includes("en.html");

// Функция для генерации случайной ДНК-цепочки заданной длины
function generateRandomDNA(length) {
    const nucleotides = ['A', 'T', 'C', 'G'];
    let result = '';
    for (let i = 0; i < length; i++) {
        result += nucleotides[Math.floor(Math.random() * nucleotides.length)];
    }
    return result;
}

// Создаем стартовую цепочку (56 нуклеотидов)
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

// Отрисовка ДНК-цепочки в интерфейсе Лаборатории
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

// Запускаем первичный рендер нити
renderDNA();

// Динамически создаем элемент ножниц Cas9, если его нет в HTML
let cas9 = document.getElementById("cas9");
if (!cas9) {
    cas9 = document.createElement("div");
    cas9.id = "cas9";
    cas9.textContent = "✂️";
    document.body.appendChild(cas9);
}

// СИСТЕМНЫЕ КИБЕР-ТОСТЫ (ДВУЯЗЫЧНЫЕ УВЕДОМЛЕНИЯ)
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
    
    // Автоматическое удаление плашки через 4 секунды
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ГЛАВНОЕ МЕНЮ ВКЛАДОК САЙТА (HUB NAVIGATION)
document.querySelectorAll(".hub-tab-btn").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
        document.querySelectorAll(".hub-tab-btn").forEach(b => b.classList.remove("active"));
        tabBtn.classList.add("active");

        document.querySelectorAll(".hub-content").forEach(content => content.classList.remove("active-content"));
        
        const hubId = tabBtn.getAttribute("data-hub");
        const targetContent = document.getElementById(`hub-${hubId}`);
        if (targetContent) {
            targetContent.classList.add("active-content");
        }
        
        // Сброс шагов природы при открытии вкладки бактерий
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

// Кнопка терминала "Начать исследование / Start Research" плавно ведет к хабу
const startExploreBtn = document.getElementById("start-explore-btn");
if (startExploreBtn) {
    startExploreBtn.addEventListener("click", () => {
        const contentHub = document.getElementById("content-hub");
        if (contentHub) {
            contentHub.scrollIntoView({ behavior: "smooth" });
        }
    });
}

// ==========================================================================
// ЧАСТЬ 2.1: НЕОНОВАЯ МОДИФИКАЦИЯ РУКИ И СИМУЛЯЦИЯ БАКТЕРИЙ
// ==========================================================================

// Функция управления визуальным состоянием робо-руки и верхней панели датчиков
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
        statusText.innerText = isEn ? "INTEGRATION: SUCCESSFUL // NEURAL INTERFACE SYNCHRONIZED" : "ИНТЕГРАЦИЯ: УСПЕШНО // НЕЙРО-ИНТЕРФЕЙС СИНХРОНИЗИРОВАН";
        
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
        statusText.innerText = isEn ? "INTEGRATION: FAILED // TISSUE CONFLICT (PROSTHESIS REJECTION)" : "ИНТЕГРАЦИЯ: СБОЙ // КОНФЛИКТ ТКАНЕЙ (ОТТОРЖЕНИЕ ПРОТЕЗА)";
        
        armSvg.style.filter = "drop-shadow(0 15px 30px rgba(255, 0, 85, 0.6))";
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#ff0055";
                if (el.tagName === 'circle') el.style.fill = "#ff0055";
                el.style.animation = "blink 0.4s infinite";
            }
        });
    } else {
        statusPanel.className = "cyber-status-panel status-nominal";
        statusIcon.innerText = "🟢";
        statusText.innerText = isEn ? "INTEGRATION: STABLE (AWAITING MODIFICATION)" : "ИНТЕГРАЦИЯ: СТАБИЛЬНО (ОЖИДАНИЕ МОДИФИКАЦИИ)";
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

// ДАННЫЕ ДЛЯ БАКТЕРИЙ (ВКЛАДКА 2)
const natureSteps = {
    1: {
        title: isEn ? "Step 1: Viral Attack & Adaptation" : "Шаг 1: Атака вируса и Адаптация (Запоминание)",
        text: isEn ? "A hostile virus (bacteriophage) attacks the cell and injects its DNA. Bacterial proteins cut out a fragment of the viral code and paste it into the CRISPR archive to remember the threat." : "Враждебный вирус (бактериофаг) атакует клетку и впрыскивает свою ДНК. Специальные белки бактерии вырезают фрагмент вирусного кода и вставляют его в геном бактерии — в архив CRISPR. Теперь у клетки есть «фотография» преступника.",
        html: `<div class="phage-virus">👾</div><div class="virus-dna">➔ ➔ AGTC ➔</div><div class="bacteria-wall"></div><div class="crisp-archive"><span class="archive-spacer">${isEn ? 'CRISPR Archive:' : '⚠️ CRISPR Архив:'}</span><span class="archive-spacer">CGTA</span><span class="archive-spacer new-spacer">AGTC</span></div>`
    },
    2: {
        title: isEn ? "Step 2: Expression & Processing" : "Шаг 2: Экспрессия (Выпуск ориентировок)",
        text: isEn ? "The bacterium constantly copies these viral spacers, converting them into guide crRNA molecules. Each crRNA loads into a Cas9 patrol protein, creating an armed surveillance complex." : "Когда архив сформирован, бактерия постоянно копирует эти вирусные кусочки, превращая их в маленькие путеводные нити crРНК. Каждая такая РНК заряжается в молекулярный патрульный белок Cas9. Получается вооруженный комплекс с точной ориентировкой на вирус.",
        html: `<div class="cas9-protein">🤖<div class="rna-tail">${isEn ? 'crRNA: AGTC' : 'crРНК: AGTC'}</div></div><div style="color: #00f0ff; font-size: 1.4rem; font-weight: bold; animation: blink 1.5s infinite;">${isEn ? '⚙️ Deploying patrols...' : '⚙️ Выпуск патрулей...'}</div>`
    },
    3: {
        title: isEn ? "Step 3: Interference & Cleavage" : "Шаг 3: Интерференция (Уничтожение вируса)",
        text: isEn ? "Upon another attack, Cas9 checks viral DNA against its crRNA. Once a perfect match is found, Cas9 activates its molecular blades and cleaves the viral DNA, neutralizing the threat." : "При повторной атаке вируса патруль Cas9 сверяет его ДНК со своей crРНК. Как только буквы идеально совпадают, Cas9 активирует свои лезвия и разрезает ДНК вируса пополам. Вирус обезврежен, бактерия спасена!",
        html: `<div class="cas9-protein" style="animation: armFloat 2s infinite;">🤖<div class="rna-tail">AGTC</div></div><div style="font-size: 2.5rem; transform: rotate(-20deg);">✂️</div><div class="virus-dna" style="text-decoration: line-through; color: #4b5563; filter: blur(1px);">${isEn ? 'AGTC (VIRAL DNA)' : 'AGTC (ДНК ВИРУСА)'}</div><div style="font-size: 3rem;">💥</div>`
    }
};

function renderNatureStep(stepNumber) {
    const visualContainer = document.getElementById("nature-visual");
    const titleContainer = document.getElementById("nature-step-title");
    const textContainer = document.getElementById("nature-step-text");
    const stepData = natureSteps[stepNumber];

    if (visualContainer && titleContainer && textContainer && stepData) {
        visualContainer.innerHTML = stepData.html;
        titleContainer.innerText = stepData.title;
        textContainer.innerText = stepData.text;
    }
}

renderNatureStep(1);

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderNatureStep(btn.getAttribute("data-step"));
    });
});

// ==========================================================================
// ЧАСТЬ 2.2: КОНВЕЙЕР РНК, ШПРИЦ-ИНЖЕКТОР, СИМУЛЯТОР РЕДАКТИРОВАНИЯ И ОПРОС
// ==========================================================================

const factoryContainer = document.getElementById("rna-assembly-line");
const nextFactoryBtn = document.getElementById("next-factory-btn");
const factoryTitle = document.getElementById("factory-title-text");
const factoryText = document.getElementById("factory-desc-text");

let currentFactoryStep = 1;

// Двуязычные массивы данных для фабрики созревания РНК
const factoryStepData = {
    1: {
        titleEn: "Stage 1: pre-crRNA Transcription", titleRu: "Этап 1: Транскрипция пре-crРНК",
        textEn: "The bacterium copies its CRISPR archive, creating a long continuous pre-crRNA strand consisting of gray repeats and multicolored unique spacers (viral codes).",
        textRu: "Бактерия копирует свой архив CRISPR, создавая единую длинную ленту пре-crРНК. Она состоит из серых повторов (кассет) и разноцветных уникальных спейсеров (кодов пойманных вирусов)."
    },
    2: {
        titleEn: "Stage 2: tracrRNA Alignment", titleRu: "Этап 2: Наведение tracrРНК",
        textEn: "The cell releases auxiliary violet tracrRNA strands. They arrive from above and bind tightly to the gray repeat-cassettes, marking future cleavage zones.",
        textRu: "Клетка выпускает вспомогательные фиолетовые нити tracrРНК. Они прилетают сверху и по закону комплементарности намертво пристыковуваются к серым кассетам-повторам, размечая будущие зоны разрезов."
    },
    3: {
        titleEn: "Stage 3: Laser Cleavage (RNase III)", titleRu: "Этап 3: Лазерная нарезка (РНКаза III)",
        textEn: "The cellular engine-scissors (RNase III) activate, firing laser beams precisely at the borders of the repeats, dividing the strand into separate functional crRNA molecules.",
        textRu: "Активируется клеточный фермент-ножницы (РНКаза III). Он бьёт лазерными лучами точно по границам повторов, разделяя длинную общую ленту на отдельные независимые боевые ориентировки — crРНК."
    },
    4: {
        titleEn: "Stage 4: Arming the Cas9 Weapon", titleRu: "Этап 4: Зарядка оружия Cas9",
        textEn: "One matured RNA piece smoothly loads inside the massive Cas9 protein. Armed with the viral guide, the complex transitions to an active patrol state!",
        textRu: "Один из созревших РНК-кусочков плавно затягивается внутрь массивного белка Cas9. Оружие заряжено ориентировкой на вирус, комплекс переходит в режим боевого патрулирования клетки!"
    }
};

function renderFactoryLine() {
    if (!factoryContainer) return;
    factoryContainer.innerHTML = `
        <div class="rna-segment repeat">${isEn ? 'Repeat' : 'Повтор'}<div class="tracr-link">tracrРНК</div></div>
        <div class="laser-cutter"></div>
        <div class="rna-segment spacer-red">${isEn ? 'Virus_A' : 'Вирус_A'}</div>
        <div class="laser-cutter"></div>
        <div class="rna-segment repeat">${isEn ? 'Repeat' : 'Повтор'}<div class="tracr-link">tracrРНК</div></div>
        <div class="laser-cutter"></div>
        <div class="rna-segment spacer-yellow">${isEn ? 'Virus_B' : 'Вирус_B'}</div>
        <div class="laser-cutter"></div>
        <div class="rna-segment repeat">${isEn ? 'Repeat' : 'Повтор'}<div class="tracr-link">tracrРНК</div></div>
        <div class="laser-cutter"></div>
        <div class="rna-segment spacer-blue">${isEn ? 'Virus_C' : 'Вирус_C'}</div>
        <div class="laser-cutter"></div>
        <div class="rna-segment repeat">${isEn ? 'Repeat' : 'Повтор'}<div class="tracr-link">tracrРНК</div></div>
    `;
}

renderFactoryLine();

if (nextFactoryBtn) {
    nextFactoryBtn.addEventListener("click", () => {
        currentFactoryStep++;
        
        if (currentFactoryStep > 4) {
            currentFactoryStep = 1;
            renderFactoryLine();
            factoryContainer.classList.remove("sliced");
            document.querySelectorAll(".factory-btn").forEach((b, idx) => {
                b.classList.remove("active");
                if(idx === 0) b.classList.add("active");
            });
            updateFactoryText();
            nextFactoryBtn.innerText = isEn ? "Launch Process ➔" : "Запустить процесс ➔";
            return;
        }

        const currentTab = document.getElementById(`rna-step-${currentFactoryStep}`);
        if (currentTab) {
            document.querySelectorAll(".factory-btn").forEach(b => b.classList.remove("active"));
            currentTab.disabled = false;
            currentTab.classList.add("active");
        }

        if (currentFactoryStep === 2) {
            document.querySelectorAll(".rna-segment.repeat").forEach(el => el.classList.add("attached"));
            showCyberToast(isEn ? "tracrRNA successfully aligned with repeats!" : "tracrРНК успешно пристыковалась к повторам!", "success");
        } 
        else if (currentFactoryStep === 3) {
            document.querySelectorAll(".laser-cutter").forEach(el => el.classList.add("active-cut"));
            setTimeout(() => {
                factoryContainer.classList.add("sliced");
                showCyberToast(isEn ? "RNase III executed site-specific cleavage!" : "РНКаза III выполнила точечный разрез ленты!", "success");
            }, 500);
        } 
        else if (currentFactoryStep === 4) {
            const luckySpacer = document.querySelector(".spacer-yellow");
            if (luckySpacer) {
                luckySpacer.style.transform = "translateY(-40px) scale(1.2)";
                luckySpacer.style.boxShadow = "0 0 30px 10px #00f0ff";
                luckySpacer.style.background = "#00f0ff";
                luckySpacer.style.color = "#111827";
            }
            showCyberToast(isEn ? "Guide RNA assembly loaded into Cas9 active pocket!" : "Гидовая РНК успешно загружена в белок Cas9!", "success");
            nextFactoryBtn.innerText = isEn ? "🔄 Restart Conveyor" : "🔄 Перезапустить конвейер";
        }

        updateFactoryText();
    });
}

function updateFactoryText() {
    const data = factoryStepData[currentFactoryStep];
    if (data && factoryTitle && factoryText) {
        factoryTitle.innerText = isEn ? data.titleEn : data.titleRu;
        factoryText.innerText = isEn ? data.textEn : data.textRu;
    }
}

// ==========================================================================
// ЧАСТЬ 2.2: КНОПКИ ПРЕСЕТОВ И ПОИСК ЦЕЛИ CAS9
// ==========================================================================

// Кнопки-пресеты готовых мутаций в Лаборатории
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        const replace = btn.getAttribute("data-replace");
        
        // Вживляем цель в случайное место ДНК для бесшовного UX
        const midPoint = Math.floor(sequence.length / 3);
        const leftPart = sequence.slice(0, midPoint);
        const rightPart = sequence.slice(midPoint + target.length + 2);
        
        sequence = leftPart + target + "GG" + rightPart;
        renderDNA();
        updateProsthesisVisual('nominal'); // Сбрасываем свечение руки в режим ожидания

        document.getElementById("guideRNA").value = target;
        document.getElementById("replaceRNA").value = replace;
        
        document.getElementById("step-2").style.display = "none";
        if (cas9) cas9.style.left = "-100px";
        
        showCyberToast(isEn ? `Preset loaded! Target: ${target}. Donor: ${replace}` : `Пресет загружен! Цель: ${target}. Донор: ${replace}`, "success");
    });
});

// КНОПКА ЗАПУСКА СAS9 (ШАГ 1 СИМУЛЯТОРА)
const findBtn = document.getElementById("findBtn");
if (findBtn) {
    findBtn.addEventListener("click", () => {
        const target = document.getElementById("guideRNA").value.toUpperCase().trim();

        if (!target) {
            showCyberToast(isEn ? "Please enter target sequence!" : "Введите последовательность для поиска!", "error");
            return;
        }

        let start = sequence.indexOf(target);
        const bases = document.querySelectorAll(".base");
        bases.forEach(b => b.classList.remove("target", "pam-target", "slice-effect"));

        // Если такой комбинации в рандомной строке нет — аккуратно вживляем её
        if (start === -1) {
            const insertIndex = Math.floor(sequence.length / 2);
            const leftPart = sequence.slice(0, insertIndex);
            const rightPart = sequence.slice(insertIndex + target.length + 2);
            sequence = leftPart + target + "GG" + rightPart;
            renderDNA();
            start = insertIndex;
        }

        // По законам биологии форматируем две буквы после цели в PAM-маркер (GG)
        const pamIndex = start + target.length;
        const updatedSequenceArray = sequence.split("");
        updatedSequenceArray[pamIndex] = "G";
        updatedSequenceArray[pamIndex + 1] = "G";
        sequence = updatedSequenceArray.join("");
        renderDNA();

        const updatedBases = document.querySelectorAll(".base");
        lastStartIndex = start;
        lastTargetLength = target.length;

        // Подсвечиваем цель гена в цепочке
        for (let i = start; i < start + target.length; i++) {
            updatedBases[i].classList.add("target");
        }
        
        // Подсвечиваем PAM-маркер фиолетовым неоном
        updatedBases[pamIndex].classList.add("pam-target");
        updatedBases[pamIndex + 1].classList.add("pam-target");

        // Перемещаем ножницы Cas9 точно к цели
        const targetElement = updatedBases[start];
        const rect = targetElement.getBoundingClientRect();
        if (cas9) {
            cas9.style.left = (rect.left + window.scrollX + (rect.width / 2) - 20) + "px";
            cas9.style.top = (rect.top + window.scrollY - 50) + "px";
        }

        showCyberToast(isEn ? "Cas9 successfully docked! PAM-marker (GG) identified." : "Cas9 успешно состыковался с целью! Найден PAM-маркер (GG).", "success");
        document.getElementById("step-2").style.display = "flex"; // Открываем шаг 2
    });
}

// ==========================================================================
// БЛОК 2: АНИМАЦИЯ ШПРИЦА, РАЗРЕЗ ДНК И МОДИФИКАЦИЯ РОБО-РУКИ
// ==========================================================================

const editBtn = document.getElementById("editBtn");
if (editBtn) {
    editBtn.addEventListener("click", () => {
        const replacement = document.getElementById("replaceRNA").value.toUpperCase().trim();
        const syringe = document.getElementById("injector-syringe");
        
        if (!replacement) {
            showCyberToast(isEn ? "Please enter donor sequence!" : "Введите новую последовательность для вставки!", "error");
            return;
        }

        // АНИМАЦИЯ ИНЪЕКЦИИ: Шприц плавно опускается в ДНК-редактор
        if (syringe) {
            syringe.classList.add("injecting");
            showCyberToast(isEn ? "Injecting donor RNA complex..." : "Впрыск донорского РНК комплекса...", "success");
        }

        // Задержка 800мс, пока шприц делает укол, затем запускаем разрез
        setTimeout(() => {
            if (syringe) syringe.classList.remove("injecting"); // Убираем шприц обратно вверх

            const bases = document.querySelectorAll(".base");
            for (let i = lastStartIndex; i < lastStartIndex + lastTargetLength; i++) {
                if (bases[i]) bases[i].classList.add("slice-effect"); // Запуск анимации взрыва ДНК
            }

            // Ждем еще 500мс, пока отработает взрыв цепи, и меняем геном
            setTimeout(() => {
                const leftPart = sequence.slice(0, lastStartIndex);
                const rightPart = sequence.slice(lastStartIndex + lastTargetLength);
                
                // Симуляция шанса успеха: 30% на точную вставку (HDR), 70% на мутацию (NHEJ)
                const successChance = Math.random(); 
                
                if (successChance <= 0.30) {
                    // Идеальный исход (HDR)
                    sequence = leftPart + replacement + rightPart;
                    showCyberToast(isEn ? `HDR Success! Template integrated: ${replacement}` : `Успех HDR! Клетка успешно внедрила шаблон: ${replacement}`, "success");
                    updateProsthesisVisual('success'); // Рука заливается стабильным бирюзовым неоном
                } else {
                    // Сбой и случайная мутация (NHEJ)
                    const mutations = ["AAAA", "TTTT", "CC", "GG", "🧬X"];
                    const randomMutation = mutations[Math.floor(Math.random() * mutations.length)];
                    sequence = leftPart + randomMutation + rightPart;
                    showCyberToast(isEn ? `HDR Failure! NHEJ emergency pathway activated. Mutation: ${randomMutation}` : `Сбой HDR! Сработал метод NHEJ. Возникла мутация: ${randomMutation}`, "error");
                    updateProsthesisVisual('error'); // Рука начинает тревожно мигать красным
                }
                
                renderDNA(); // Перерисовываем нить с новыми буквами
                
                // Сбрасываем симулятор в режим ожидания нового ввода
                if (cas9) cas9.style.left = "-100px";
                document.getElementById("step-2").style.display = "none";
                document.getElementById("guideRNA").value = "";
                document.getElementById("replaceRNA").value = "";
            }, 500);

        }, 800);
    });
}

// ==========================================================================
// БЛОК 3: ЖИВАЯ СТАТИСТИКА CRISPR С БАЗОЙ ДАННЫХ GOOGLE FIRESTORE
// ==========================================================================

// Функция загрузки и отображения реальной статистики из Firebase
async function loadEthicsStats() {
    try {
        const snapshot = await db.collection("ethics_votes").get();
        let votesData = {
            q1: { yes: 0, no: 0 },
            q2: { yes: 0, no: 0 },
            q3: { yes: 0, no: 0 }
        };

        // Собираем все голоса из базы данных
        snapshot.forEach(doc => {
            const data = doc.data();
            if (votesData[data.question]) {
                if (data.vote === 'yes') votesData[data.question].yes++;
                if (data.vote === 'no') votesData[data.question].no++;
            }
        });

        // Обновляем проценты на экране для каждой карточки
        document.querySelectorAll(".ethics-card").forEach(card => {
            const qId = card.getAttribute("data-question");
            const qStats = votesData[qId];
            const total = qStats.yes + qStats.no;

            // Если голосов ещё нет, ставим базовые исторические значения, чтобы не было 0%
            let yesPercent = total > 0 ? Math.round((qStats.yes / total) * 100) : (qId === 'q1' ? 94 : qId === 'q2' ? 18 : 41);
            let noPercent = 100 - yesPercent;

            const vYes = card.querySelector(".v-yes");
            const vNo = card.querySelector(".v-no");

            if (vYes && vNo) {
                vYes.innerText = isEn ? `FOR: ${yesPercent}%` : `ЗА: ${yesPercent}%`;
                vNo.innerText = isEn ? `AGAINST: ${noPercent}%` : `ПРОТИВ: ${noPercent}%`;
            }
        });
    } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
    }
}

// Запускаем скачивание реальной мировой статистики сразу при загрузке сайта
loadEthicsStats();

// Обработка кликов по кнопкам голосования
document.querySelectorAll(".ethics-card").forEach(card => {
    const qId = card.getAttribute("data-question");
    const actionBlock = card.querySelector(".ethics-actions");
    const votesBlock = card.querySelector(".ethics-votes");

    card.querySelectorAll(".vote-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const userVote = btn.classList.contains("yes") ? "yes" : "no";

            if (actionBlock && votesBlock) {
                actionBlock.style.display = "none"; // Прячем кнопки управления
                
                try {
                    // ОТПРАВЛЯЕМ ГОЛОС В КОСМОС (В Firestore)
                    await db.collection("ethics_votes").add({
                        question: qId,
                        vote: userVote,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });

                    // Пересчитываем и плавно выводим обновленные проценты
                    await loadEthicsStats();
                    votesBlock.style.display = "flex";

                    showCyberToast(
                        isEn ? "Your vote has been securely synchronized with the global database!" : "Ваш голос успешно синхронизирован с глобальной базой биоинженеров!", 
                        "success"
                    );
                } catch (error) {
                    console.error("Ошибка отправки голоса:", error);
                    votesBlock.style.display = "flex"; // Всё равно показываем графики, если сеть упала
                }
            }
        });
    });
});



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA6NOupysk0cJjXa6Sf5oneahuMoK81XGU",
  authDomain: "biohub-survey.firebaseapp.com",
  databaseURL: "https://biohub-survey-default-rtdb.firebaseio.com",
  projectId: "biohub-survey",
  storageBucket: "biohub-survey.firebasestorage.app",
  messagingSenderId: "496732337214",
  appId: "1:496732337214:web:60666a67c600f910b88d6f",
  measurementId: "G-3VXVKBG33K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);