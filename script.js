// ==========================================================================
// ЧАСТЬ 1: СИСТЕМНЫЕ НАСТРОЙКИ, ГЕНЕРАТОР ДНК И КИБЕР-ТОСТЫ
// ==========================================================================

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

let selectedPathway = ""; // Хранит выбранный путь ремонта (nhej или hdr)

// Инициализация миссий лаборатории
function initLabMissions() {
    const presetButtons = document.querySelectorAll(".preset-btn");
    if (!presetButtons.length) return;

    presetButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            presetButtons.forEach(b => b.classList.remove("selected-mission"));
            btn.classList.add("selected-mission");

            const target = btn.getAttribute("data-target");
            const replace = btn.getAttribute("data-replace"); 
            
            const guideInput = document.getElementById("guideRNA");
            const replaceInput = document.getElementById("replaceRNA");

            if (guideInput && replaceInput && target) {
                if (!sequence.includes(target)) {
                    const midIndex = Math.floor(sequence.length / 2) - 3;
                    sequence = sequence.slice(0, midIndex) + target + sequence.slice(midIndex + target.length);
                    renderDNA(); 
                }

                guideInput.value = target;
                replaceInput.value = replace; 
                
                const panelTitle = document.getElementById("mission-panel-title");
                if (panelTitle) {
                    panelTitle.innerText = `🎯 TARGET ACQUIRED: LOCATE AND EXCISE THE "${target}" MUTATION`;
                }

                showCyberToast(
                    isEn 
                        ? "Anomaly detected! Click 'Launch Cas9' to dock the gRNA Complex." 
                        : "Аномалия обнаружена! Нажми 'Launch Cas9' для активации.", 
                    "success"
                );
            }
        });
    });
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

    showCyberToast(
        isEn 
            ? "Cas9 Armed! Click on DNA letters to select for cutting." 
            : "Cas9 активирован! Кликни на буквы ДНК для выбора.", 
        "success"
    );
    
    updateProsthesisVisual('nominal');

    const bases = document.querySelectorAll(".base");
    let selectedBasesForCut = [];

    // Очищаем старые слушатели перед добавлением новых
    cleanupBaseListeners();

    bases.forEach((base, index) => {
        base.style.cursor = "pointer";
        
        const mouseenterHandler = () => {
            if (!base.classList.contains("slice-effect")) {
                base.style.border = "2px solid #ff0055";
            }
        };

        const mouseleaveHandler = () => {
            if (!base.classList.contains("slice-effect")) {
                base.style.border = "";
            }
        };

        const clickHandler = () => {
            base.classList.add("slice-effect"); 
            base.style.backgroundColor = "#ff0055"; 
            
            if (!selectedBasesForCut.includes(index)) {
                selectedBasesForCut.push(index);
            }

            if (selectedBasesForCut.length > 0) {
                lastStartIndex = Math.min(...selectedBasesForCut);
                lastTargetLength = selectedBasesForCut.length;
                
                const step2Block = document.getElementById("step-2");
                if (step2Block) step2Block.style.display = "block";
            }

            // ========== FIX #2: FIRE LASER WHEN DNA BASE IS CLICKED ==========
            fireLaser(base);
        };

        base.addEventListener("mouseenter", mouseenterHandler);
        base.addEventListener("mouseleave", mouseleaveHandler);
        base.addEventListener("click", clickHandler);

        // Сохраняем слушатели для очистки
        cas9BaseListeners.push({
            element: base,
            listeners: {
                mouseenter: mouseenterHandler,
                mouseleave: mouseleaveHandler,
                click: clickHandler
            }
        });
    });
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
function initRepairAction() {
    const actionRepairBtn = document.getElementById("editBtn");
    if (!actionRepairBtn) return;

    actionRepairBtn.addEventListener("click", () => {
        const syringe = document.getElementById("injector-syringe");
        const replacement = document.getElementById("replaceRNA")?.value || "";
        const btnNhej = document.getElementById("pathway-nhej");
        const btnHdr = document.getElementById("pathway-hdr");
        
        if (!selectedPathway) {
            showCyberToast(
                isEn ? "Please select a repair pathway first!" : "Выбери путь ремонта!",
                "error"
            );
            return;
        }

        // Запускаем эффекты
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

        // Задержка перед изменением ДНК
        setTimeout(() => {
            if (syringe) syringe.classList.remove("injecting");

            // Проверяем валидность индексов
            if (lastStartIndex >= 0 && lastTargetLength > 0) {
                const leftPart = sequence.slice(0, lastStartIndex);
                const rightPart = sequence.slice(lastStartIndex + lastTargetLength);
                
                if (selectedPathway === "nhej") {
                    sequence = leftPart + rightPart;
                    showCyberToast(
                        isEn 
                            ? `NHEJ Sticking Completed! DNA shortened by ${lastTargetLength} bases.`
                            : `NHEJ Склеивание завершено! ДНК укорочена на ${lastTargetLength} оснований.`,
                        "success"
                    );
                    updateProsthesisVisual('error');
                } else if (selectedPathway === "hdr") {
                    sequence = leftPart + replacement + rightPart;
                    showCyberToast(
                        isEn 
                            ? `HDR Repair Completed! Sequence replaced with: ${replacement}`
                            : `HDR Ремонт завершено! Последовательность заменена на: ${replacement}`,
                        "success"
                    );
                    updateProsthesisVisual('success');
                }
                
                // Обновляем ДНК на экране
                renderDNA();
            }
            
            // Прячем шаг 2 после операции
            const step2Block = document.getElementById("step-2");
            if (step2Block) step2Block.style.display = "none";
            
            // Сброс состояния
            if (btnNhej) btnNhej.className = "pathway-select-btn";
            if (btnHdr) btnHdr.className = "pathway-select-btn";
            selectedPathway = "";
            lastStartIndex = -1;
            lastTargetLength = 0;
            
            // Очищаем слушатели
            cleanupBaseListeners();
            
            // Прячем Cas9
            if (cas9) cas9.style.left = "-100px";
        }, 1200);
    });
}

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
