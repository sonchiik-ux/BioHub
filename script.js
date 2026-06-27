// ==========================================================================
// ЧАСТЬ 1: СИСТЕМНЫЕ НАСТРОЙКИ, ГЕНЕРАТОР ДНК И КИБЕР-ТОСТЫ
// ==========================================================================

// Плавный скролл от шапки к симуляции
function initHeaderActions() {
    const startBtn = document.getElementById("start-explore-btn");
    // Предполагаем, что твой блок симуляции имеет id="simulation-section" или "step-1"
    const targetSection = document.getElementById("step-1") || document.querySelector("main");

    if (startBtn && targetSection) {
        startBtn.addEventListener("click", () => {
            targetSection.scrollIntoView({ behavior: "smooth" });
            showCyberToast(isEn ? "Initiating Molecular Scanner..." : "Запуск молекулярного сканера...", "success");
        });
    }
}

// Запускаем инициализацию шапки
initHeaderActions();


// ЖЕЛЕЗОБЕТОННАЯ ПРОВЕРКА ЯЗЫКА
const isEn = document.documentElement.lang === "en" || !window.location.href.includes("ru.html");

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
const colors = {
    A: "#d42c2cff",
    T: "#4d79ff",
    C: "#2dc72dff",
    G: "#d7d72bff"
};

let lastStartIndex = -1;
let lastTargetLength = 0;
let cas9BaseListeners = []; // Отслеживаем слушатели базовых элементов

// Безопасная отрисовка ДНК-цепочки
function renderDNA() {
    const currentContainer = document.getElementById("dna-sequence");
    if (!currentContainer) return;
    
    currentContainer.innerHTML = "";
    sequence.split("").forEach(base => {
        const span = document.createElement("div");
        span.classList.add("base");
        span.textContent = base;
        span.style.backgroundColor = colors[base] || "#9ca3af";
        currentContainer.appendChild(span);
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
    
    setTimeout(() => {
        toast.style.animation = 'toastFadeOut 0.5s ease forwards';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ==========================================================================
// ЧАСТЬ 2: ГЛАВНОЕ МЕНЮ ВКЛАДОК И СИМУЛЯЦИЯ БАКТЕРИЙ В ПРИРОДЕ
// ==========================================================================

// Инициализация табов
function initTabs() {
    const tabButtons = document.querySelectorAll(".hub-tab-btn");
    if (!tabButtons.length) return;

    tabButtons.forEach(tabBtn => {
        tabBtn.addEventListener("click", () => {
            // Удаляем активный класс со всех кнопок
            tabButtons.forEach(b => b.classList.remove("active"));
            tabBtn.classList.add("active");

            // Скрываем все контент-блоки
            const contentBlocks = document.querySelectorAll(".hub-content");
            contentBlocks.forEach(content => content.classList.remove("active-content"));
            
            // Показываем нужный контент
            const hubId = tabBtn.getAttribute("data-hub");
            const targetContent = document.getElementById(`hub-${hubId}`);
            if (targetContent) {
                targetContent.classList.add("active-content");
            }
            
            // Специальная обработка для "природы"
            if (hubId === 'nature') {
                renderNatureStep(1);
                const initialNatureTab = document.querySelector('.tab-btn[data-step="1"]');
                if (initialNatureTab) {
                    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
                    initialNatureTab.classList.add("active");
                }
            }
            
            // Прячем Cas9 ножницы
            if (cas9) cas9.style.left = "-100px";
        });
    });
}

initTabs();

// Инициализация кнопки "Start Explore"
function initExploreButton() {
    const startExploreBtn = document.getElementById("start-explore-btn");
    if (startExploreBtn) {
        startExploreBtn.addEventListener("click", () => {
            const contentHub = document.getElementById("content-hub");
            if (contentHub) {
                contentHub.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

initExploreButton();

// Обновление визуала протеза
function updateProsthesisVisual(status) {
    const statusPanel = document.getElementById("prosthesis-status-panel");
    const statusIcon = document.getElementById("status-panel-icon");
    const statusText = document.getElementById("status-panel-text");
    const armSvg = document.getElementById("interactive-prosthesis");
    
    const neonElements = [
        document.getElementById("elbow-neon"), 
        document.getElementById("wrist-neon"),
        document.getElementById("palm-neon"), 
        document.getElementById("thumb-neon"),
        document.getElementById("f1-neon"), 
        document.getElementById("f2-neon"),
        document.getElementById("f3-neon"), 
        document.getElementById("f4-neon")
    ].filter(el => el !== null); // Фильтруем null элементы

    if (!statusPanel || !statusIcon || !statusText || !armSvg) return;

    if (status === 'success') {
        statusPanel.className = "cyber-status-panel status-success";
        statusIcon.innerText = "🔵";
        statusText.innerText = isEn 
            ? "INTEGRATION: SUCCESSFUL // NEURAL INTERFACE SYNCHRONIZED" 
            : "ИНТЕГРАЦИЯ: УСПЕШНО // НЕЙРО-ИНТЕРФЕЙС СИНХРОНИЗИРОВАН";
        
        armSvg.style.filter = "drop-shadow(0 15px 30px rgba(0, 240, 255, 0.6))";
        neonElements.forEach(el => {
            el.style.stroke = "#00f0ff";
            if (el.tagName === 'circle') el.style.fill = "#00f0ff";
            el.style.animation = "none";
            el.style.opacity = "1";
        });
    } else if (status === 'error') {
        statusPanel.className = "cyber-status-panel status-error";
        statusIcon.innerText = "🔴";
        statusText.innerText = isEn 
            ? "INTEGRATION: FAILED // TISSUE CONFLICT (PROSTHESIS REJECTION)" 
            : "ИНТЕГРАЦИЯ: СБОЙ // КОНФЛИКТ ТКАНЕЙ (ОТТОРЖЕНИЕ ПРОТЕЗА)";
        
        armSvg.style.filter = "drop-shadow(0 15px 30px rgba(255, 0, 85, 0.6))";
        neonElements.forEach(el => {
            el.style.stroke = "#ff0055";
            if (el.tagName === 'circle') el.style.fill = "#ff0055";
            el.style.animation = "blink 0.4s infinite";
        });
    } else {
        statusPanel.className = "cyber-status-panel status-nominal";
        statusIcon.innerText = "🟢";
        statusText.innerText = isEn 
            ? "INTEGRATION: STABLE (AWAITING MODIFICATION)" 
            : "ИНТЕГРАЦИЯ: СТАБИЛЬНО (ОЖИДАНИЕ МОДИФИКАЦИИ)";
        armSvg.style.filter = "drop-shadow(0 10px 20px rgba(0,0,0,0.25))";
        neonElements.forEach(el => {
            el.style.stroke = "#00f0ff";
            if (el.tagName === 'circle') el.style.fill = "#00f0ff";
            el.style.animation = "none";
            el.style.opacity = "1";
        });
    }
}

// Данные о природе
const natureSteps = {
    1: {
        title: isEn 
            ? "Step 1: Viral Attack & Adaptation (Archiving)" 
            : "Шаг 1: Атака вируса и Адаптация (Запоминание)",
        text: isEn 
            ? "A hostile virus (bacteriophage) attacks the cell and injects its DNA. Bacterial proteins extract a fragment of the viral code and insert it into the bacterium's genome—directly into the CRISPR archive. The cell now holds a digital \"mugshot\" of the intruder." 
            : "Враждебный вирус (бактериофаг) атакует клетку и впрыскивает свою ДНК. Специальные белки бактерии вырезают фрагмент вирусного кода и вставляют его в геном бактерии — в архив CRISPR. Теперь у клетки есть «фотография» преступника.",
        html: `<div class="phage-virus">👾</div><div class="virus-dna">➔ ➔ AGTC ➔</div><div class="bacteria-wall"></div><div class="crisp-archive"><span class="archive-spacer">${isEn ? 'CRISPR Archive:' : '⚠️ CRISPR Архив:'}</span><span class="archive-spacer">CGTA</span><span class="archive-spacer new-spacer">AGTC</span></div>`
    },
    2: {
        title: isEn 
            ? "Step 2: Expression & Processing (Issuing Wanted Posters)" 
            : "Шаг 2: Экспрессия (Выпуск ориентировок)",
        text: isEn 
            ? "Once the archive is built, the bacterium continuously copies these viral segments, forging them into guide crRNA strands. Each crRNA is then loaded into a molecular Cas9 patrol protein, deploying an armed surveillance complex with a precise target lock." 
            : "Когда архив сформирован, бактерия постоянно копирует эти вирусные кусочки, превращая их в маленькие путеводные нити crРНК. Каждая такая РНК заряжается в молекулярный патрульный белок Cas9. Получается вооруженный комплекс с точной ориентировкой на вирус.",
        html: `<div class="cas9-protein">🤖<div class="rna-tail">${isEn ? 'crRNA: AGTC' : 'crРНК: AGTC'}</div></div><div style="color: #00f0ff; font-size: 1.4rem; font-weight: bold; animation: blink 1.5s infinite;">${isEn ? '⚙️ Deploying patrols...' : '⚙️ Выпуск патрулей...'}</div>`
    },
    3: {
        title: isEn 
            ? "Step 3: Interference & Cleavage (Neutralizing the Target)" 
            : "Шаг 3: Интерференция (Уничтожение вируса)",
        text: isEn 
            ? "Upon a recurring viral breach, the Cas9 patrol cross-checks the hostile DNA with its guide crRNA. The moment a perfect sequence match is detected, Cas9 deploys its molecular blades, slicing the viral DNA in half to neutralize the threat." 
            : "При повторной атаке вируса патруль Cas9 сверяет его ДНК со своей crРНК. Как только буквы идеально совпадают, Cas9 активирует свои лезвия и разрезает ДНК вируса пополам. Вирус обезеврежен, бактерия спасена!",
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

// Инициализация природных табов
function initNatureTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    if (!tabButtons.length) return;

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const step = parseInt(btn.getAttribute("data-step"));
            renderNatureStep(step);
        });
    });
}

initNatureTabs();

// ==========================================================================
// ЧАСТЬ 3: ФАБРИКА СОЗРЕВАНИЯ РНК (ИНТЕРФЕЙС И УПРАВЛЕНИЕ)
// ==========================================================================

const factoryStepData = {
    1: {
        titleEn: "Stage 1: pre-crRNA Transcription", 
        titleRu: "Этап 1: Транскрипция пре-crРНК",
        textEn: "The bacterium transcribes its CRISPR archive, synthesizing a long, continuous pre-crRNA strand. This archival tape alternates between neutral repeat-cassettes and vibrant, unique target vectors extracted from captured viruses.",
        textRu: "Бактерия копирует свой архив CRISPR, создавая единую длинную ленту пре-crРНК. Она состоит из серых повторов (кассет) и разноцветных уникальных спейсеров (кодов пойманных вирусов)."
    },
    2: {
        titleEn: "Stage 2: tracrRNA Alignment (Target Locking)", 
        titleRu: "Этап 2: Наведение tracrРНК",
        textEn: "The cell deploys auxiliary tracrRNA strands. Fired from above, they bind complementarily to the repeat-cassettes, precision-marking the coordinates for the upcoming molecular incisions.",
        textRu: "Клетка выпускает вспомогательные фиолетовые нити tracrРНК. Они прилетают сверху и по закону комплементарности намертво пристыковываются к серым кассетам-повторам, размечая будущие зоны разрезов."
    },
    3: {
        titleEn: "Stage 3: Laser Cleavage (RNase III Engine)", 
        titleRu: "Этап 3: Лазерная нарезка (РНКаза III)",
        textEn: "The cellular execution enzyme (RNase III) fires precise energy beams right at the repeat boundaries, processing the long tape into distinct, isolated crRNA targeting modules.",
        textRu: "Активируется клеточный фермент-ножницы (РНКаза III). Он бьёт лазерными лучами точно по границам повторов, разделяя длинную общую ленту на отдельные независимые боевые ориентировки — crРНК."
    },
    4: {
        titleEn: "Stage 4: Arming the Cas9 Matrix", 
        titleRu: "Этап 4: Зарядка оружия Cas9",
        textEn: "A single matured crRNA module locks seamlessly into the core of the massive Cas9 protein. Weapon system loaded: the surveillance complex initializes and transitions into a combat-ready patrol state!",
        textRu: "Один из созревших РНК-кусочков плавно затягивается внутрь массивного белка Cas9. Оружие заряжено ориентировкой на вирус, комплекс переходит в режим боевого патрулирования клетки!"
    }
};

let currentFactoryStep = 1;

function updateFactoryUI() {
    const step = factoryStepData[currentFactoryStep];
    const titleEl = document.getElementById("factory-title-text") || document.getElementById("factory-title");
    const textEl = document.getElementById("factory-desc-text") || document.getElementById("factory-text");
    const nextBtn = document.getElementById("next-factory-btn");

    const assemblyLine = document.getElementById("rna-assembly-line");
    const repeatSegments = document.querySelectorAll(".rna-segment.repeat");
    const lasers = document.querySelectorAll(".laser-cutter");

    if (titleEl && textEl && step) {
        titleEl.innerText = isEn ? (step.titleEn || step.title) : (step.titleRu || step.title);
        textEl.innerText = isEn ? (step.textEn || step.text) : (step.textRu || step.text);
    }

    if (assemblyLine) assemblyLine.classList.remove("sliced");
    repeatSegments.forEach(seg => seg.classList.remove("attached"));
    lasers.forEach(laser => laser.classList.remove("active-cut"));

    if (currentFactoryStep === 1) {
        // Базовое состояние ленты
    } 
    else if (currentFactoryStep === 2) {
        repeatSegments.forEach(seg => seg.classList.add("attached"));
    } 
    else if (currentFactoryStep === 3) {
        repeatSegments.forEach(seg => seg.classList.add("attached"));
        lasers.forEach(laser => laser.classList.add("active-cut"));
        setTimeout(() => {
            if (currentFactoryStep === 3 && assemblyLine) {
                assemblyLine.classList.add("sliced");
            }
        }, 400); 
    } 
    else if (currentFactoryStep === 4) {
        repeatSegments.forEach(seg => seg.classList.add("attached"));
        if (assemblyLine) assemblyLine.classList.add("sliced");
    }

    const factoryButtons = document.querySelectorAll(".factory-btn");
    factoryButtons.forEach((btn, index) => {
        const btnStep = index + 1;
        if (btnStep === currentFactoryStep) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
        if (btnStep <= currentFactoryStep) {
            btn.removeAttribute("disabled");
        }
    });

    if (nextBtn) {
        nextBtn.style.display = "block"; 
        if (currentFactoryStep === 4) {
            nextBtn.innerText = isEn ? "System Armed 🤖" : "Система Заряжена 🤖";
            nextBtn.style.background = "linear-gradient(90deg, #2dc72d, #10b981)";
        } else {
            nextBtn.innerText = isEn ? "Launch Process ➔" : "Запустить Процесс ➔";
            nextBtn.style.background = "";
        }
    }
}

// Инициализация фабрики
function initFactory() {
    const nextFactoryBtn = document.getElementById("next-factory-btn");
    if (nextFactoryBtn) {
        nextFactoryBtn.addEventListener("click", () => {
            if (currentFactoryStep < 4) {
                currentFactoryStep++;
                updateFactoryUI();
                showCyberToast(
                    isEn ? `Stage ${currentFactoryStep} Initialized` : `Этап ${currentFactoryStep} активирован!`, 
                    "success"
                );
            } else {
                showCyberToast(
                    isEn 
                        ? "Cas9 Security System is fully operational!" 
                        : "Комплекс Cas9 полностью готов к патрулированию клетки!", 
                    "success"
                );
            }
        });
    }

    const factoryButtons = document.querySelectorAll(".factory-btn");
    factoryButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentFactoryStep = index + 1;
            updateFactoryUI();
        });
    });

    updateFactoryUI();
}

initFactory();

// ==========================================================================
// ЧАСТЬ 4: CRISPR SURGICAL MONITOR & LAB MISSIONS
// ==========================================================================

// Наша единая научная база данных для миссий
const GENE_DATABASE = {
    ccr5: {
        name: isEn ? "CCR5 (HIV Resistance)" : "CCR5 (Иммунитет к ВИЧ)",
        targetSequence: "GTCATCCT", // Что нужно найти
        pam: "CGG",                 // PAM-сайт, который должен идти СРАЗУ за мишенью
        correctPathway: "nhej",     // Для поломки гена нужен NHEJ
        replacementNeeded: "",       // Матрица не нужна
        successMsg: isEn ? "HIV resistance locked! Immune boost activated." : "Иммунитет к ВИЧ получен! Защита активирована."
    },
    cep290: {
        name: isEn ? "CEP290 (Cyber-Vision Repair)" : "CEP290 (Восстановление зрения)",
        targetSequence: "TTTGCAGC",
        pam: "AGG",
        correctPathway: "hdr",      // Для починки нужен точный ремонт HDR
        replacementNeeded: "AAACGTCG", // Эту матрицу пользователь должен ввести сам
        successMsg: isEn ? "Photoreceptor synthesis restored! Vision matrix stable." : "Синтез фоторецепторов восстановлен! Зрение стабильно."
    },
    mstn: {
        name: isEn ? "MSTN (Muscle Density Boost)" : "MSTN (Мышечный апгрейд)",
        targetSequence: "AGCTCACGG",
        pam: "TGG",
        correctPathway: "nhej",
        replacementNeeded: "",
        successMsg: isEn ? "Myostatin blocked! Muscle hypertrophy initiated." : "Миостатин заблокирован! Рост мышечной массы запущен."
    },
    ampd1: {
        name: isEn ? "AMPD1 (Bio-Battery / Stamina)" : "AMPD1 (Био-Батарейка)",
        targetSequence: "CCGATTGA",
        pam: "GGG",
        correctPathway: "hdr",
        replacementNeeded: "GGCTAACT",
        successMsg: isEn ? "ATP recycling upgraded! Continuous energy stream." : "Рециркуляция АТФ улучшена! Бесконечная энергия."
    }
};

let currentGeneQuest = null; // Переменная для хранения активного квеста

function initLabMissions() {
    const presetButtons = document.querySelectorAll(".preset-btn");
    if (!presetButtons.length) return;

    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("selected-mission"));
            btn.classList.add("selected-mission");

            const geneKey = btn.getAttribute("data-gene") || btn.getAttribute("data-target")?.toLowerCase();
            currentGeneQuest = GENE_DATABASE[geneKey];

            if (!currentGeneQuest) {
                showCyberToast("Unknown gene configuration!", "error");
                return;
            }

            const guideInput = document.getElementById("guideRNA");
            const replaceInput = document.getElementById("replaceRNA");
            
            // ВРЕМЕННО ДЛЯ ТЕСТА: пусть ИИ сам заполняет поле, чтобы проверить механику кликов!
            if (guideInput) guideInput.value = currentGeneQuest.targetSequence;
            if (replaceInput) replaceInput.value = currentGeneQuest.replacementNeeded;

            const panelTitle = document.getElementById("mission-panel-title");
            if (panelTitle) {
                panelTitle.innerHTML = `
                    <span style="color: #00f0ff;">🧬 MISSION: ${currentGeneQuest.name}</span><br>
                    <small style="color: #9ca3af; font-size: 0.85rem; display: block; margin-top: 5px;">
                        ${isEn ? "Target sequence:" : "Целевая последовательность:"} <b>${currentGeneQuest.targetSequence}</b><br>
                        ${isEn ? "PAM site:" : "PAM-сайт:"} <span style="color: #ff0055;"><b>${currentGeneQuest.pam}</b></span>
                    </small>
                `;
            }

            // Генерируем ДНК, где точно есть этот ген
            generateRealBioDNA(currentGeneQuest.targetSequence, currentGeneQuest.pam);

            showCyberToast(
                isEn ? `Data loaded. Ready to launch Cas9!` : `Данные загружены. Готово к запуску Cas9!`, 
                "info"
            );
        });
    });

    // --- ЖЕСТКАЯ ПРИВЯЗКА КНОПКИ ЗАПУСКА ---
    const launchBtn = document.getElementById("findBtn");
    if (launchBtn) {
        // Убираем старые слушатели, чтобы не было дубликатов
        const newLaunchBtn = launchBtn.cloneNode(true);
        launchBtn.parentNode.replaceChild(newLaunchBtn, launchBtn);
        
        newLaunchBtn.addEventListener("click", (event) => {
            console.log("Кнопка Launch Cas9 успешно нажата! Активируем лазер...");
            // Запускаем нашу функцию активации и передаем координаты мыши
            triggerCas9Activation(event.clientX, event.clientY);
        });
    }
}


// Вспомогательная функция: создает случайную ДНК, но аккуратно вшивает туда наш квест
function generateRealBioDNA(target, pam) {
    const bases = ["A", "T", "G", "C"];
    console.log("Найдено букв ДНК для кликов:", bases.length);
if (bases.length === 0) {
    console.error("ОШИБКА: Элементы с классом .base не найдены на странице! Проверь функцию renderDNA.");
}

    let randomPrefix = "";
    let randomSuffix = "";
    
    // Создаем случайные буквы вокруг нашего гена
    for (let i = 0; i < 15; i++) {
        randomPrefix += bases[Math.floor(Math.random() * bases.length)];
        randomSuffix += bases[Math.floor(Math.random() * bases.length)];
    }
    
    // Склеиваем: случайное начало + ГЕН + PAM-сайт + случайный конец
    sequence = randomPrefix + target + pam + randomSuffix;
    
    // Перерисовываем ДНК на экране (вызываем твою функцию отрисовки)
    if (typeof renderDNA === "function") {
        renderDNA();
    }
}

initLabMissions();


// Очистка старых слушателей базовых элементов
function cleanupBaseListeners() {
    cas9BaseListeners.forEach(({ element, listeners }) => {
        Object.entries(listeners).forEach(([event, handler]) => {
            element.removeEventListener(event, handler);
        });
    });
    cas9BaseListeners = [];
}

// Активация Cas9 и управление базами
function triggerCas9Activation(clientX, clientY) {
    if (!cas9) return;

    const dnaDropZone = document.getElementById("dna-sequence");
    if (!dnaDropZone) return;

    const containerRect = dnaDropZone.getBoundingClientRect();
    let relativeLeft = clientX - containerRect.left;
    if (relativeLeft < 0) relativeLeft = 20;
    if (relativeLeft > containerRect.width) relativeLeft = containerRect.width - 20;
    
    cas9.style.left = `${relativeLeft}px`;

    // Подсказка пользователю
    if (currentGeneQuest) {
        showCyberToast(
            isEn 
                ? `Cas9 Armed! Click on the START of the target sequence: ${currentGeneQuest.targetSequence}` 
                : `Cas9 готов! Кликни на НАЧАЛО целевой последовательности: ${currentGeneQuest.targetSequence}`, 
            "info"
        );
    } else {
        showCyberToast(
            isEn ? "Cas9 Armed! Select DNA target." : "Cas9 активирован! Выберите цель на ДНК.", 
            "success"
        );
    }
    
    if (typeof updateProsthesisVisual === 'function') updateProsthesisVisual('nominal');

    const bases = document.querySelectorAll(".base");
    cleanupBaseListeners();

    bases.forEach((base, index) => {
        base.style.cursor = "pointer";
        
        const mouseenterHandler = () => {
            if (!base.classList.contains("slice-effect")) {
                base.style.border = "2px solid #00f0ff"; // Голубая подсветка при наведении — сканирование
            }
        };

        const mouseleaveHandler = () => {
            if (!base.classList.contains("slice-effect")) {
                base.style.border = "";
            }
        };

        const clickHandler = () => {
            // Если миссия не выбрана, работаем по старой логике свободных кликов
            if (!currentGeneQuest) {
                processFreeCut(base, index);
                return;
            }

            // --- НАУЧНАЯ ПРОВЕРКА КЛИКА (РЕАЛИЗМ) ---
            const targetLen = currentGeneQuest.targetSequence.length;
            const pamLen = currentGeneQuest.pam.length;
            
            // Вырезаем из реальной цепочки ДНК кусок, на который нажал пользователь + длину PAM-сайта
            const userSelectedSegment = sequence.slice(index, index + targetLen);
            const userSelectedPam = sequence.slice(index + targetLen, index + targetLen + pamLen);
            
            // Получаем то, что пользователь ввёл в поле гидовой РНК
            const enteredGuideRNA = (document.getElementById("guideRNA")?.value || "").toUpperCase().trim();

            // 1. Проверяем, ввёл ли пользователь gRNA в текстовое поле
            if (enteredGuideRNA !== currentGeneQuest.targetSequence) {
                showCyberToast(
                    isEn 
                        ? "gRNA Error: Your guide RNA sequence design is incorrect!" 
                        : "Ошибка gRNA: Последовательность гидовой РНК сконструирована неверно!", 
                    "error"
                );
                return;
            }

            // 2. Проверяем, кликнул ли пользователь именно на то место, где начинается мишень
            if (userSelectedSegment !== currentGeneQuest.targetSequence) {
                showCyberToast(
                    isEn 
                        ? "Off-target risk! CRISPR cannot bind here. Find the exact matching sequence." 
                        : "Риск внецелевой мутации! CRISPR не может связаться здесь. Найдите точное совпадение.", 
                    "error"
                );
                // Эффект ошибки на руке
                if (typeof updateProsthesisVisual === 'function') updateProsthesisVisual('error');
                return;
            }

            // 3. Проверяем наличие PAM-сайта (NGG) сразу за мишенью
            // Проверяем две последние буквы, так как первая может быть любой (N)
            const pamMatch = userSelectedPam.endsWith("GG"); 
            if (!pamMatch) {
                showCyberToast(
                    isEn 
                        ? "Binding failed! No PAM site (NGG) detected adjacent to the target." 
                        : "Связывание сорвано! Не обнаружен PAM-сайт (NGG) рядом с мишенью.", 
                    "error"
                );
                return;
            }

            // ЕСЛИ ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ — КУТ-ЭФФЕКТ (УСПЕХ)
            showCyberToast(
                isEn ? "Target Bound! PAM recognized. Activating Cas9 Endonuclease..." : "Цель захвачена! PAM распознан. Активация эндонуклеазы Cas9...",
                "success"
            );
            
            // Подсвечиваем весь вырезаемый кусок ДНК на экране
            let affectedBases = [];
            for (let i = 0; i < targetLen; i++) {
                const targetBaseEl = bases[index + i];
                if (targetBaseEl) {
                    targetBaseEl.classList.add("slice-effect");
                    targetBaseEl.style.backgroundColor = "#ff0055";
                    if (typeof fireLaser === 'function') fireLaser(targetBaseEl);
                }
                affectedBases.push(index + i);
            }

            // Сохраняем координаты для Шага 2 (Ремонт)
            lastStartIndex = index;
            lastTargetLength = targetLen;
            
            // Активируем панель Шага 2
            const step2Block = document.getElementById("step-2");
            if (step2Block) {
                step2Block.style.display = "block";
                // Подсказка для шага 2
                const repairHint = document.getElementById("repair-pathway-hint");
                if (repairHint) {
                    repairHint.innerHTML = isEn 
                        ? `Required pathway: <b style="color:#00f0ff">${currentGeneQuest.correctPathway.toUpperCase()}</b>. ${currentGeneQuest.replacementNeeded ? 'Donor matrix needed.' : 'No matrix needed.'}`
                        : `Требуемый путь: <b style="color:#00f0ff">${currentGeneQuest.correctPathway.toUpperCase()}</b>. ${currentGeneQuest.replacementNeeded ? 'Нужна донорская матрица.' : 'Матрица не нужна.'}`;
                }
            }
        };

        base.addEventListener("mouseenter", mouseenterHandler);
        base.addEventListener("mouseleave", mouseleaveHandler);
        base.addEventListener("click", clickHandler);

        cas9BaseListeners.push({
            element: base,
            listeners: { mouseenter: mouseenterHandler, mouseleave: mouseleaveHandler, click: clickHandler }
        });
    });
}

// Старая логика свободных кликов, если миссия не выбрана (чтобы ничего не ломалось)
function processFreeCut(base, index) {
    base.classList.add("slice-effect"); 
    base.style.backgroundColor = "#ff0055"; 
    if (typeof fireLaser === 'function') fireLaser(base);
    
    // Инициализируем массив, если он не был создан глобально
    if (typeof selectedBasesForCut === 'undefined') window.selectedBasesForCut = [];
    if (!window.selectedBasesForCut.includes(index)) {
        window.selectedBasesForCut.push(index);
    }

    lastStartIndex = Math.min(...window.selectedBasesForCut);
    lastTargetLength = window.selectedBasesForCut.length;
    
    const step2Block = document.getElementById("step-2");
    if (step2Block) step2Block.style.display = "block";
}


// ========== FIX #2: LASER FIRING FUNCTION ==========
function fireLaser(baseElement) {
    const laser = document.querySelector('.laser-beam');
    if (!laser) return;

    const baseRect = baseElement.getBoundingClientRect();
    const laserX = baseRect.left + (baseRect.width / 2);
    
    laser.style.left = `${laserX}px`;
    laser.classList.remove('fire'); // Reset animation
    
    // Trigger animation
    setTimeout(() => {
        laser.classList.add('fire');
    }, 10);
    
    // Remove animation class after it ends
    setTimeout(() => {
        laser.classList.remove('fire');
    }, 450);
}

// ===== LAUNCH CAS9 BUTTON FIX =====
function initLaunchCas9Button() {
    const findBtn = document.getElementById("findBtn");
    if (!findBtn) return;

    findBtn.addEventListener("click", () => {
        const dnaDropZone = document.getElementById("dna-sequence");
        if (dnaDropZone) {
            const rect = dnaDropZone.getBoundingClientRect();
            triggerCas9Activation(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
    });
}

initLaunchCas9Button();

// Инициализация выбора путей ремонта
function initRepairPathways() {
    const btnNhej = document.getElementById("pathway-nhej");
    const btnHdr = document.getElementById("pathway-hdr");
    const actionRepairBtn = document.getElementById("editBtn");

    if (!btnNhej || !btnHdr || !actionRepairBtn) return;

    btnNhej.addEventListener("click", () => {
        selectedPathway = "nhej";
        btnNhej.className = "pathway-select-btn chosen-nhej";
        btnHdr.className = "pathway-select-btn";
        actionRepairBtn.innerText = isEn 
            ? "Execute NHEJ (Emergency Sticking)" 
            : "Выполнить NHEJ (Экстренное склеивание)";
        actionRepairBtn.style.display = "block";
    });

    btnHdr.addEventListener("click", () => {
        selectedPathway = "hdr";
        btnHdr.className = "pathway-select-btn chosen-hdr";
        btnNhej.className = "pathway-select-btn";
        actionRepairBtn.innerText = isEn 
            ? "Execute HDR (Donor Blueprint Insertion)" 
            : "Выполнить HDR (Вставка донорской цепи)";
        actionRepairBtn.style.display = "block";
    });
}

initRepairPathways();

// Выполнение клеточной починки
// Переменная вне функции, чтобы не вешать клики бесконечно
let isRepairActionInitialized = false;

function initRepairAction() {
    const actionRepairBtn = document.getElementById("editBtn");
    if (!actionRepairBtn || isRepairActionInitialized) return;

    // Флаг, что слушатель уже повешен
    isRepairActionInitialized = true;

    actionRepairBtn.addEventListener("click", () => {
        const syringe = document.getElementById("injector-syringe");
        // Получаем введенный пользователем текст замены, если его нет — оставляем пустым
        const replacement = (document.getElementById("replaceRNA")?.value || "").toUpperCase().trim();
        const btnNhej = document.getElementById("pathway-nhej");
        const btnHdr = document.getElementById("pathway-hdr");
        
        if (!selectedPathway) {
            showCyberToast(
                isEn ? "Please select a repair pathway first!" : "Выбери путь ремонта!",
                "error"
            );
            return;
        }

        // Проверяем, был ли сделан разрез (выбран ли участок ДНК)
        if (lastStartIndex === -1 || lastTargetLength === 0) {
            showCyberToast(
                isEn ? "CRISPR-Cas9 must cut the DNA before repair!" : "Сначала CRISPR-Cas9 должен разрезать ДНК!",
                "error"
            );
            return;
        }

        // Анимация шприца или ферментов
        if (syringe && selectedPathway === "hdr") {
            syringe.classList.add("injecting");
            showCyberToast(
                isEn ? "Injecting donor template matrix..." : "Внедрение донорской матрицы...",
                "success"
            );
        } else {
            showCyberToast(
                isEn ? "NHEJ enzymes activated. Fusing chromosomal ends..." : "NHEJ активирован. Склеивание концов...",
                "success"
            );
        }

        // Задержка на анимацию (1.2 секунды)
        setTimeout(() => {
            if (syringe) syringe.classList.remove("injecting");

            const leftPart = sequence.slice(0, lastStartIndex);
            const rightPart = sequence.slice(lastStartIndex + lastTargetLength);
            
            if (selectedPathway === "nhej") {
                // При NHEJ кусок ДНК просто удаляется (мутация «индель»)
                sequence = leftPart + rightPart;
                showCyberToast(
                    isEn 
                        ? `NHEJ Completed! DNA shortened.`
                        : `NHEJ Склеивание завершено! ДНК укорочена.`,
                    "success"
                );
                if (typeof updateProsthesisVisual === 'function') updateProsthesisVisual('error');
            } else if (selectedPathway === "hdr") {
                // При HDR вставляется донорская матрица
                sequence = leftPart + replacement + rightPart;
                showCyberToast(
                    isEn 
                        ? `HDR Repair Completed! Replacement successful.`
                        : `HDR Ремонт завершен! Матрица успешно встроена.`,
                    "success"
                );
                if (typeof updateProsthesisVisual === 'function') updateProsthesisVisual('success');
            }
            
            // Важно: перерисовываем ДНК на экране, чтобы пользователь увидел изменения!
            if (typeof renderDNA === 'function') renderDNA();
            
            // Управляем отображением шагов интерфейса
            const step2Block = document.getElementById("step-2");
            const step3Block = document.getElementById("step-3"); // Ищем следующий шаг
            
            if (step2Block) step2Block.style.display = "none";
            if (step3Block) step3Block.style.display = "block"; // Показываем финальный шаг
            
            // Сбрасываем визуальные стили кнопок выбора пути
            if (btnNhej) btnNhej.className = "pathway-select-btn";
            if (btnHdr) btnHdr.className = "pathway-select-btn";
            
            // Мягкий сброс путей
            selectedPathway = "";
            
            // Очищаем слушатели и прячем Cas9
            if (typeof cleanupBaseListeners === 'function') cleanupBaseListeners();
            const cas9Element = document.getElementById("cas9"); // Исправлено обращение к элементу
            if (cas9Element) cas9Element.style.left = "-200px";
            
        }, 1200);
    });
}

// Запуск инициализации
initRepairAction();

// ==========================================================================
// ЧАСТЬ 5: FIREBASE ЭТИЧЕСКИЕ СТАТИСТИКА
// ==========================================================================

async function loadEthicsStats() {
    try {
        if (typeof db === 'undefined') {
            setDefaultStats();
            return;
        }

        const snapshot = await db.collection("ethics_votes").get();
        let votesData = { q1: { yes: 0, no: 0 }, q2: { yes: 0, no: 0 }, q3: { yes: 0, no: 0 } };
        
        snapshot.forEach(doc => {
            const data = doc.data();
            if (votesData[data.question]) {
                if (data.vote === 'yes') votesData[data.question].yes++;
                if (data.vote === 'no') votesData[data.question].no++;
            }
        });
        
        updateStatsUI(votesData);
    } catch (error) {
        console.warn("Firebase load failed, using default stats:", error);
        setDefaultStats();
    }
}

function updateStatsUI(votesData) {
    const ethicsCards = document.querySelectorAll(".ethics-card");
    if (!ethicsCards.length) return;

    ethicsCards.forEach(card => {
        const qId = card.getAttribute("data-question");
        const qStats = votesData[qId];
        
        if (!qStats) return;
        
        const total = qStats.yes + qStats.no;
        let yesPercent = total > 0 ? Math.round((qStats.yes / total) * 100) : getFallbackPercent(qId);
        let noPercent = 100 - yesPercent;
        
        const vYes = card.querySelector(".v-yes");
        const vNo = card.querySelector(".v-no");
        
        if (vYes && vNo) {
            vYes.innerText = `FOR: ${yesPercent}%`;
            vNo.innerText = `AGAINST: ${noPercent}%`;
        }
    });
}

function getFallbackPercent(qId) {
    const fallbacks = { q1: 94, q2: 18, q3: 41 };
    return fallbacks[qId] || 50;
}

function setDefaultStats() {
    const mockData = { q1: { yes: 94, no: 6 }, q2: { yes: 18, no: 82 }, q3: { yes: 41, no: 59 } };
    const ethicsCards = document.querySelectorAll(".ethics-card");
    
    ethicsCards.forEach(card => {
        const qId = card.getAttribute("data-question");
        const stats = mockData[qId];
        
        if (!stats) return;
        
        const vYes = card.querySelector(".v-yes");
        const vNo = card.querySelector(".v-no");
        
        if (vYes && vNo) {
            vYes.innerText = `FOR: ${stats.yes}%`;
            vNo.innerText = `AGAINST: ${stats.no}%`;
        }
    });
}

// Загружаем статистику при инициализации
loadEthicsStats();

// Инициализация голосования
function initVoting() {
    const ethicsCards = document.querySelectorAll(".ethics-card");
    if (!ethicsCards.length) return;

    ethicsCards.forEach(card => {
        const qId = card.getAttribute("data-question");
        const voteButtons = card.querySelectorAll(".vote-btn");
        
        voteButtons.forEach(btn => {
            btn.addEventListener("click", async () => {
                const userVote = btn.classList.contains("yes") ? "yes" : "no";
                showCyberToast(
                    isEn ? "Registering your vote in global ledger..." : "Регистрация голоса...",
                    "success"
                );

                if (typeof db !== 'undefined') {
                    try {
                        const timestamp = firebase?.firestore?.FieldValue?.serverTimestamp?.() || new Date();
                        await db.collection("ethics_votes").add({
                            question: qId,
                            vote: userVote,
                            timestamp: timestamp
                        });
                        
                        showCyberToast(
                            isEn ? "Vote submitted successfully!" : "Голос зарегистрирован!",
                            "success"
                        );
                        loadEthicsStats();
                    } catch (e) {
                        console.error("Vote submission error:", e);
                        showCyberToast(
                            isEn ? "Error submitting vote" : "Ошибка при голосовании",
                            "error"
                        );
                    }
                } else {
                    showCyberToast(
                        isEn ? "Demo Mode: Vote saved locally!" : "Демо-режим: голос сохранён локально!",
                        "success"
                    );
                }
            });
        });
    });
}

initVoting();

// ==========================================================================
// ЧАСТЬ 6: РЕДАКТОР ПЕРСОНАЖА ДНК (CHARACTER CREATOR) - WITH EYE GLOW FIX
// ==========================================================================

function initModalCharacterCreator() {
    const modal = document.getElementById('character-modal');
    const openBtn = document.getElementById('open-creator-btn');
    const closeBtn = document.getElementById('close-creator-btn');

    if (!modal || !openBtn || !closeBtn) return;

    // Открытие модального окна при клике на кнопку
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Закрытие окна при клике на крестик
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Элементы управления геномом
    const ccr5 = document.getElementById('ccr5-slider');
    const cep290 = document.getElementById('cep290-slider');
    const mstn = document.getElementById('mstn-slider');

    if (!ccr5 || !cep290 || !mstn) return;

    function updateMascotLogic() {
        const score = parseInt(ccr5.value) + parseInt(cep290.value) + parseInt(mstn.value);
        const statusTag = document.getElementById('status-tag');
        const card = document.getElementById('subject-card');
        const badge = document.getElementById('crispr-badge');
        const mascot = document.getElementById('mascot-img');
        const avatarZone = document.querySelector('.avatar-zone');

        // Пульс при сдвиге ползунка
        if (avatarZone) {
            avatarZone.classList.add('pulse-flash');
            setTimeout(() => avatarZone.classList.remove('pulse-flash'), 300);
        }

        if (score > 0) {
            statusTag.textContent = score === 3 ? "PERFECT GENOME" : "GENETICALLY MODIFIED";
            statusTag.className = "status-good";
            card.classList.add('upgraded');
            badge.textContent = "CRISPR ACTIVE";
            badge.classList.add('active');
            
            if (mascot) {
                if (score === 3) {
                    // ========== FIX #1: ADD MASCOT EYE GLOW ==========
                    mascot.style.filter = "grayscale(0%) brightness(1.1) drop-shadow(0 0 15px #00ff66) drop-shadow(inset 0 0 20px rgba(0, 255, 102, 0.5))";
                    mascot.classList.add('mascot-eyes-glow');
                } else {
                    mascot.style.filter = "grayscale(20%) brightness(1.0)";
                    mascot.classList.remove('mascot-eyes-glow');
                }
            }
        } else {
            statusTag.textContent = "UNMODIFIED";
            statusTag.className = "status-bad";
            card.classList.remove('upgraded');
            badge.textContent = "CRISPR IDLE";
            badge.classList.remove('active');
            
            if (mascot) {
                mascot.style.filter = "grayscale(80%) brightness(0.5)";
                mascot.classList.remove('mascot-eyes-glow');
            }
        }
    }

    // Слушатели для ползунков
    ccr5.addEventListener('input', (e) => {
        const dna = document.getElementById('ccr5-dna');
        const info = document.getElementById('info-immunity');
        if (e.target.value === "1") {
            dna.innerHTML = 'Sequence: GGTGGTC...<span style="color:#00ff66; font-weight:bold; text-decoration:line-through;">CTGGTG</span>...TC';
            info.textContent = "Immune to HIV (Δ32)";
            info.style.color = "#00ff66";
        } else {
            dna.innerHTML = 'Sequence: GGTGGTC...<span class="mut-text">CTGGTG</span>...TC';
            info.textContent = "Standard";
            info.style.color = "";
        }
        updateMascotLogic();
    });

    cep290.addEventListener('input', (e) => {
        const dna = document.getElementById('cep290-dna');
        const info = document.getElementById('info-vision');
        if (e.target.value === "1") {
            dna.innerHTML = 'Sequence: AAAGTT...<span style="color:#00ff66; font-weight:bold;">C</span>...GAAAA';
            info.textContent = "100% Perfect Vision";
            info.style.color = "#00ff66";
        } else {
            dna.innerHTML = 'Sequence: AAAGTT...<span class="mut-text">T</span>...GAAAA';
            info.textContent = "Leber Amaurosis Risk";
            info.style.color = "";
        }
        updateMascotLogic();
    });

    mstn.addEventListener('input', (e) => {
        const dna = document.getElementById('mstn-dna');
        const info = document.getElementById('info-muscle');
        if (e.target.value === "1") {
            dna.innerHTML = 'Sequence: TACTTG...<span style="color:#00ff66; font-weight:bold;">A</span>...AAATTT';
            info.textContent = "Enhanced Muscle Tone";
            info.style.color = "#00ff66";
        } else {
            dna.innerHTML = 'Sequence: TACTTG...<span class="mut-text">G</span>...AAATTT';
            info.textContent = "Standard Tone";
            info.style.color = "";
        }
        updateMascotLogic();
    });
}

// Запуск при загрузке документа
document.addEventListener("DOMContentLoaded", () => {
    initModalCharacterCreator();
});

// База данных последовательностей (исходная и мутировавшая для каждого гена)
const dnaSequences = {
    ccr5: {
        unmod: "GGTGGTCCTGGTGTGATC",
        mod: "GGTGGTC---GTGATC" // Пример делеции (CRISPR вырезал кусок)
    },
    cep290: {
        unmod: "AAAGTTTGAAAA",
        mod: "AAAGTTCGAAAA" // Точечная мутация T -> C
    },
    mstn: {
        unmod: "TACTTGGAAATTT",
        mod: "TACTTGGCCATTT" // Мутация АА -> СС
    }
};

// Функция подсчета GC-состава (Твой олимпиадный алгоритм, переведенный на JS!)
function calculateGCContent() {
    const ccr5El = document.getElementById('ccr5-dna');
    const cep290El = document.getElementById('cep290-dna');
    const mstnEl = document.getElementById('mstn-dna');
    const percentEl = document.getElementById('gc-percentage');
    const barEl = document.getElementById('gc-bar');
    if (!ccr5El || !cep290El || !mstnEl || !percentEl || !barEl) return 0;
    // 1. Собираем текст из всех трех ДНК-потоков на странице
    const ccr5Text = ccr5El.innerText.replace(/[^ATGC]/gi, '');
    const cep290Text = cep290El.innerText.replace(/[^ATGC]/gi, '');
    const mstnText = mstnEl.innerText.replace(/[^ATGC]/gi, '');
    
    // Соединяем всё в одну большую строку
    const fullSequence = (ccr5Text + cep290Text + mstnText).toUpperCase();
    
    if (fullSequence.length === 0) return 0;

    // 2. Считаем количество G и C
    let gcCount = 0;
    for (let char of fullSequence) {
        if (char === 'G' || char === 'C') {
            gcCount++;
        }
    }

    // 3. Вычисляем процент
    const percentage = Math.round((gcCount / fullSequence.length) * 100);
    
    // 4. Обновляем интерфейс сайта
    percentEl.innerText = `${percentage}%`;
    barEl.style.width = `${percentage}%`;
    return percentage;
}

// Функция обновления состояния слайдеров и ДНК
function updateTraits() {
    const ccr5Slider = document.getElementById('ccr5-slider');
    const cep290Slider = document.getElementById('cep290-slider');
    const mstnSlider = document.getElementById('mstn-slider');
    if (!ccr5Slider || !cep290Slider || !mstnSlider) return;
    // 1. Получаем значения слайдеров (Убедись, что эти строки стоят в НАЧАЛЕ функции)
    const ccr5Val = ccr5Slider.value;
    const cep290Val = cep290Slider.value;
    const mstnVal = mstnSlider.value;

    // Меняем текст ДНК на экране в зависимости от положения ползунка
    if (ccr5Val == "1") {
        document.getElementById('ccr5-dna').innerHTML = `Seq: GGTGGTC...<span class="mut-text" style="color: #ff00ff; font-weight: bold;">---</span>...TC`;
        document.getElementById('info-immunity').innerText = "HIV Resistant (Delta 32)";
    } else {
        document.getElementById('ccr5-dna').innerHTML = `Seq: GGTGGTC...<span class="mut-text">CTGGTG</span>...TC`;
        document.getElementById('info-immunity').innerText = "Standard";
    }

    if (cep290Val == "1") {
        document.getElementById('cep290-dna').innerHTML = `Seq: AAAGTT...<span class="mut-text" style="color: #ff00ff; font-weight: bold;">C</span>...GAAAA`;
        document.getElementById('info-vision').innerText = "Vision Restored";
    } else {
        document.getElementById('cep290-dna').innerHTML = `Seq: AAAGTT...<span class="mut-text">T</span>...GAAAA`;
        document.getElementById('info-vision').innerText = "Leber Amaurosis Risk";
    }

    if (mstnVal == "1") {
        document.getElementById('mstn-dna').innerHTML = `Seq: TACTTG...<span class="mut-text" style="color: #ff00ff; font-weight: bold;">CC</span>...AAATTT`;
        document.getElementById('info-muscle').innerText = "Increased Muscle Mass";
    } else {
        document.getElementById('mstn-dna').innerHTML = `Seq: TACTTG...<span class="mut-text">G</span>...AAATTT`;
        document.getElementById('info-muscle').innerText = "Standard Tone";
    }

    // Меняем общий статус
    const statusTag = document.getElementById('status-tag');
    const badge = document.getElementById('crispr-badge');
    if (ccr5Val == "1" || cep290Val == "1" || mstnVal == "1") {
        statusTag.innerText = "MODIFIED";
        statusTag.className = "status-good"; // Убедись, что этот класс есть в CSS (например, зеленый цвет)
        badge.innerText = "CRISPR MOD COMPLETE";
        badge.style.background = "#00ff00";
        badge.style.color = "#000";
    } else {
        statusTag.innerText = "UNMODIFIED";
        statusTag.className = "status-bad";
        badge.innerText = "CRISPR IDLE";
        badge.style.background = "transparent";
        badge.style.color = "#666";
    }

    // Пересчитываем GC-состав после каждого изменения!
    calculateGCContent();

        // === УМНАЯ ЛОГИКА СМЕШИВАНИЯ ЦВЕТОВ ===
    const avatarContainer = document.querySelector('.avatar-container-box');
    
    if (avatarContainer) {
        // Полностью очищаем все классы свечения перед новой проверкой
        avatarContainer.classList.remove('glow-green', 'glow-purple', 'glow-mixed-two', 'glow-god-mode');

        // Считаем сколько всего ползунков включено (переводим строки в числа 0 или 1)
        const activeCount = Number(ccr5Val) + Number(cep290Val) + Number(mstnVal);

        if (activeCount === 3) {
            // Включены ВСЕ ТРИ мутации
            avatarContainer.classList.add('glow-god-mode');
        } 
        else if (activeCount === 2) {
            // Включена любая ПАРА ползунков — запускаем красивое смешивание цветов
            avatarContainer.classList.add('glow-mixed-two');
        } 
        else if (activeCount === 1) {
            // Включен только ОДИН ползунок — проверяем какой именно
            if (cep290Val == "1") {
                avatarContainer.classList.add('glow-purple'); // Фиолетовый для зрения
            } else {
                avatarContainer.classList.add('glow-green');  // Зеленый для мышц или иммунитета
            }
        }
        // Если activeCount === 0, то классы не добавляются, маскот остается обычным "немодифицированным"
    }

    // Пересчитываем GC-состав
    calculateGCContent();
} // <- Вот эта закрывающая скобка функции updateTraits


// Вешаем слушатели событий на ползунки
[
    document.getElementById('ccr5-slider'),
    document.getElementById('cep290-slider'),
    document.getElementById('mstn-slider')
].filter(Boolean).forEach(slider => slider.addEventListener('input', updateTraits));


// Запускаем первичный расчет при старте
calculateGCContent();

// Логика генерации и скачивания геномного паспорта
const downloadPassportBtn = document.getElementById('download-passport-btn');
if (downloadPassportBtn) {
downloadPassportBtn.addEventListener('click', function () {
    const passportCard = document.getElementById('subject-card');
    const button = this;
    if (!passportCard || typeof html2canvas !== 'function') {
        showCyberToast("Passport generator is not ready yet.", "error");
        return;
    }

    button.innerText = "⏳ GENERATING...";
    button.disabled = true;

    // Идеальные настройки рендеринга для html2canvas
    html2canvas(passportCard, {
        backgroundColor: "#0d131a", 
        scale: 2,                   // Четкое Retina-качество изображения
        logging: false,
        useCORS: true,
        allowTaint: true,
        windowWidth: passportCard.scrollWidth,  // Принудительно берем исходную ширину
        windowHeight: passportCard.scrollHeight // Принудительно берем исходную высоту
    }).then(canvas => {
        const imageURL = canvas.toDataURL("image/png");
        const downloadLink = document.createElement('a');
        downloadLink.href = imageURL;
        downloadLink.download = 'BioHub_Genome_Passport.png';
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        button.innerText = "💾 DOWNLOAD GENOME PASSPORT";
        button.disabled = false;
    }).catch(error => {
        console.error("Passport download error:", error);
        button.innerText = "❌ ERROR, TRY AGAIN";
        button.disabled = false;
    });
});
}

function updateProsthesisVisual(resultType) {
    const statusPanel = document.getElementById("prosthesis-status-panel");
    const statusIcon = document.getElementById("status-panel-icon");
    const statusText = document.getElementById("status-panel-text");
    
    // Находим неоновые элементы внутри SVG робо-руки
    const neonElements = [
        document.getElementById("elbow-neon"),
        document.getElementById("wrist-neon"),
        document.getElementById("palm-neon"),
        document.getElementById("thumb-neon"),
        document.getElementById("f1-neon"),
        document.getElementById("f2-neon"),
        document.getElementById("f3-neon"),
        document.getElementById("f4-neon")
    ];

    if (!statusPanel) return;

    if (resultType === 'success') {
        // Если ремонт ДНК прошел успешно (Зеленый статус)
        statusPanel.className = "cyber-status-panel status-nominal"; // Твой CSS класс для успеха
        if (statusIcon) statusIcon.innerText = "🟢";
        statusText.innerText = isEn 
            ? "BIOLINK STABLE: GENETIC INTEGRATION 100%" 
            : "БИО-СВЯЗЬ СТАБИЛЬНА: ГЕНЕТИЧЕСКАЯ ИНТЕГРАЦИЯ 100%";

        // Перекрашиваем неон робо-руки в сочный бирюзовый/зеленый
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#00ff88";
                if (el.tagName === "circle") el.style.fill = "#00ff88";
            }
        });

    } else if (resultType === 'error') {
        // Если произошла мутация/разрыв (Красный статус)
        statusPanel.className = "cyber-status-panel status-critical"; // Твой CSS класс для ошибки
        if (statusIcon) statusIcon.innerText = "🔴";
        statusText.innerText = isEn 
            ? "CRITICAL CRASH: BIOMATERIAL REJECTION DETECTED" 
            : "КРИТИЧЕСКИЙ СБОЙ: ОБНАРУЖЕНО ОТТОРЖЕНИЕ БИОМАТЕРИАЛА";

        // Перекрашиваем неон робо-руки в тревожный красный/неоновый розовый
        neonElements.forEach(el => {
            if (el) {
                el.style.stroke = "#ff0055";
                if (el.tagName === "circle") el.style.fill = "#ff0055";
            }
        });
    }
}

// Логика переключения кнопок ремонта в интерфейсе
function initPathwayButtons() {
    const btnNhej = document.getElementById("pathway-nhej");
    const btnHdr = document.getElementById("pathway-hdr");

    if (btnNhej && btnHdr) {
        btnNhej.addEventListener("click", () => {
            selectedPathway = "nhej";
            btnNhej.style.background = "#ff0055"; // Подсвечиваем красным при выборе
            btnNhej.style.color = "#fff";
            btnHdr.style.background = ""; // Сбрасываем вторую кнопку
            btnHdr.style.color = "";
            showCyberToast(isEn ? "NHEJ Selected: Preparing for gene knockout." : "Выбран NHEJ: Подготовка к отключению гена.", "info");
        });

        btnHdr.addEventListener("click", () => {
            selectedPathway = "hdr";
            btnHdr.style.background = "#00ff88"; // Подсвечиваем зеленым при выборе
            btnHdr.style.color = "#000";
            btnNhej.style.background = ""; // Сбрасываем вторую кнопку
            btnNhej.style.color = "";
            showCyberToast(isEn ? "HDR Selected: Insert donor matrix template." : "Выбран HDR: Введите донорскую матрицу.", "info");
        });
    }
}

// Запускаем инициализацию кнопок
initPathwayButtons();

// ==========================================
// ГАРАНТИРОВАННЫЙ ФИКС ДЛЯ ВКЛАДКИ ЛАБОРАТОРИИ
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Находим саму секцию лаборатории по ключевым словам в тексте или ID
    const labSection = document.getElementById("laboratory") || 
                       Array.from(document.querySelectorAll("section")).find(s => s.textContent.includes("LABORATORY") || s.innerHTML.includes("lab-grid"));

    if (!labSection) return; // Если секцию вообще не нашли, выходим

    // На всякий случай даем ей точный ID, если его не было
    labSection.id = "laboratory";

    // 2. Функция, которая проверяет, какая кнопка меню сейчас активна
    function updateLabVisibility() {
        // Ищем кнопку переключения на вкладку лаборатории
        const labNavButton = document.querySelector('[data-target="laboratory"]') || 
                             document.querySelector('nav a[href="#laboratory"]') ||
                             Array.from(document.querySelectorAll("nav button, nav a")).find(b => b.textContent.toLowerCase().includes("лаборатория") || b.textContent.toLowerCase().includes("lab"));

        if (labNavButton && (labNavButton.classList.contains("active") || labNavButton.parentElement.classList.contains("active"))) {
            labSection.style.setProperty("display", "block", "important");
        } else {
            labSection.style.setProperty("display", "none", "important");
        }
    }

    // 3. Следим за кликами по всему меню навигации, чтобы вовремя скрывать/показывать лабу
    const navMenu = document.querySelector("nav") || document.body;
    navMenu.addEventListener("click", () => {
        // Делаем крошечную задержку в 10 миллисекунд, чтобы твой основной JS успел переключить классы active
        setTimeout(updateLabVisibility, 10);
    });

    // Запускаем проверку один раз при старте сайта
    setTimeout(updateLabVisibility, 10);
});

