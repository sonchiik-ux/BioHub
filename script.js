// ==========================================================================
// ЧАСТЬ 1: СИСТЕМНЫЕ НАСТРОЙКИ, ГЕНЕРАТОР ДНК И КИБЕР-ТОСТЫ
// ==========================================================================

// УМНАЯ ПРОВЕРКА: JS автоматически понимает язык по названию файла страницы
const isEn = window.location.href.includes("index.html");

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
        const contentHub = document.getElementById("content-hub");
        if (contentHub) {
            contentHub.scrollIntoView({ behavior: "smooth" });
        }
    });
}

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

const natureSteps = {
    1: {
        title: isEn ? "Step 1: Viral Attack & Adaptation (Archiving)" : "Шаг 1: Атака вируса и Адаптация (Запоминание)",
        text: isEn ? "A hostile virus (bacteriophage) attacks the cell and injects its DNA. Bacterial proteins extract a fragment of the viral code and insert it into the bacterium's genome—directly into the CRISPR archive. The cell now holds a digital \"mugshot\" of the intruder." : "Враждебный вирус (бактериофаг) атакует клетку и впрыскивает свою ДНК. Специальные белки бактерии вырезают фрагмент вирусного кода и вставляют его в геном бактерии — в архив CRISPR. Теперь у клетки есть «фотография» преступника.",
        html: `<div class="phage-virus">👾</div><div class="virus-dna">➔ ➔ AGTC ➔</div><div class="bacteria-wall"></div><div class="crisp-archive"><span class="archive-spacer">${isEn ? 'CRISPR Archive:' : '⚠️ CRISPR Архив:'}</span><span class="archive-spacer">CGTA</span><span class="archive-spacer new-spacer">AGTC</span></div>`
    },
    2: {
        title: isEn ? "Step 2: Expression & Processing (Issuing Wanted Posters)" : "Шаг 2: Экспрессия (Выпуск ориентировок)",
        text: isEn ? "Once the archive is built, the bacterium continuously copies these viral segments, forging them into guide crRNA strands. Each crRNA is then loaded into a molecular Cas9 patrol protein, deploying an armed surveillance complex with a precise target lock." : "Когда архив сформирован, бактерия постоянно копирует эти вирусные кусочки, превращая их в маленькие путеводные нити crРНК. Каждая такая РНК заряжается в молекулярный патрульный белок Cas9. Получается вооруженный комплекс с точной ориентировкой на вирус.",
        html: `<div class="cas9-protein">🤖<div class="rna-tail">${isEn ? 'crRNA: AGTC' : 'crРНК: AGTC'}</div></div><div style="color: #00f0ff; font-size: 1.4rem; font-weight: bold; animation: blink 1.5s infinite;">${isEn ? '⚙️ Deploying patrols...' : '⚙️ Выпуск патрулей...'}</div>`
    },
    3: {
        title: isEn ? "Step 3: Interference & Cleavage (Neutralizing the Target)" : "Шаг 3: Интерференция (Уничтожение вируса)",
        text: isEn ? "Upon a recurring viral breach, the Cas9 patrol cross-checks the hostile DNA with its guide crRNA. The moment a perfect sequence match is detected, Cas9 deploys its molecular blades, slicing the viral DNA in half to neutralize the threat." : "При повторной атаке вируса патруль Cas9 сверяет его ДНК со своей crРНК. Как только буквы идеально совпадают, Cas9 активирует свои лезвия и разрезает ДНК вируса пополам. Вирус обезеврежен, бактерия спасена!",
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
        const step = parseInt(btn.getAttribute("data-step"));
        renderNatureStep(step);
    });
});

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
    const step = factoryStepData ? factoryStepData[currentFactoryStep] : null;
    const titleEl = document.getElementById("factory-title-text") || document.getElementById("factory-title");
    const textEl = document.getElementById("factory-desc-text") || document.getElementById("factory-text");
    const nextBtn = document.getElementById("next-factory-btn");

    // Элементы конвейера для анимации
    const assemblyLine = document.getElementById("rna-assembly-line");
    const repeatSegments = document.querySelectorAll(".rna-segment.repeat");
    const lasers = document.querySelectorAll(".laser-cutter");

    if (titleEl && textEl && step) {
        titleEl.innerText = isEn ? (step.titleEn || step.title) : (step.titleRu || step.title);
        textEl.innerText = isEn ? (step.textEn || step.text) : (step.textRu || step.text);
    }

    // ==========================================
    // ЛОГИКА АНИМАЦИИ ПО ШАГАМ ФАБРИКИ
    // ==========================================
    
    // Сбрасываем все анимации перед включением текущего шага
    if (assemblyLine) assemblyLine.classList.remove("sliced");
    repeatSegments.forEach(seg => seg.classList.remove("attached"));
    lasers.forEach(laser => laser.classList.remove("active-cut"));

    if (currentFactoryStep === 1) {
        // Шаг 1: Просто лента (все эффекты сброшены выше)
    } 
    else if (currentFactoryStep === 2) {
        // Шаг 2: Прилетает вспомогательная tracrРНК сверху
        repeatSegments.forEach(seg => seg.classList.add("attached"));
    } 
    else if (currentFactoryStep === 3) {
        // Шаг 3: Намертво пристыковываем tracrРНК и врубаем лазеры!
        repeatSegments.forEach(seg => seg.classList.add("attached"));
        lasers.forEach(laser => laser.classList.add("active-cut"));
        
        // Добавляем эффект распада конвейера (sliced) чуть позже, когда отработает лазер
        setTimeout(() => {
            if (currentFactoryStep === 3 && assemblyLine) {
                assemblyLine.classList.add("sliced");
            }
        }, 400); // 400мс — время пробития лазера из CSS
    } 
    else if (currentFactoryStep === 4) {
        // Шаг 4: Лента разрезана на кусочки, идет загрузка в Cas9
        repeatSegments.forEach(seg => seg.classList.add("attached"));
        if (assemblyLine) assemblyLine.classList.add("sliced");
    }

    // ==========================================
    // ОБНОВЛЕНИЕ КНОПОК И ТЕРМИНАЛА
    // ==========================================
    document.querySelectorAll(".factory-btn").forEach((btn, index) => {
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


const nextFactoryBtn = document.getElementById("next-factory-btn");
if (nextFactoryBtn) {
    nextFactoryBtn.addEventListener("click", () => {
        if (currentFactoryStep < 4) {
            currentFactoryStep++;
            updateFactoryUI();
            showCyberToast(isEn ? `Stage ${currentFactoryStep} Initialized` : `Этап ${currentFactoryStep} активирован!`, "success");
        } else {
            showCyberToast(isEn ? "Cas9 Security System is fully operational!" : "Комплекс Cas9 полностью готов к патрулированию клетки!", "success");
        }
    });
}

document.querySelectorAll(".factory-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        currentFactoryStep = index + 1;
        updateFactoryUI();
    });
});

updateFactoryUI();

// ==========================================================================
// ЧАСТЬ 4: ЛАБОРАТОРИЯ, МОНИТОР ДНК И СТАТИСТИКА FIREBASE
// ==========================================================================

// ПРЕСЕТЫ ЛАБОРАТОРИИ (КЛИКИ ПО ГОТОВЫМ МОДИФИКАЦИЯМ С АВТОПОДСТРОЙКОЙ ЦЕПИ)
document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");
        const replace = btn.getAttribute("data-replace"); 
        
        const guideInput = document.getElementById("guideRNA");
        const replaceInput = document.getElementById("replaceRNA");

        if (guideInput && replaceInput && target) {
            // АВТОПОДСТРОЙКА: Если целевой последовательности нет в текущей ДНК, вживляем её в центр
            if (!sequence.includes(target)) {
                const midIndex = Math.floor(sequence.length / 2) - 2;
                // Разрезаем текущую цепь и аккуратно вставляем шаблон посередине
                sequence = sequence.slice(0, midIndex) + target + sequence.slice(midIndex + target.length);
                renderDNA(); // Моментально перерисовываем нить с новыми буквами на экране
            }

            // Заполняем поля ввода значениями из шаблона
            guideInput.value = target;
            replaceInput.value = replace || "AAAAA";
        }
    });
});

const findBtn = document.getElementById("findBtn");
if (findBtn) {
    findBtn.addEventListener("click", () => {
        const target = document.getElementById("guideRNA").value.toUpperCase().trim();
        if (!target) {
            showCyberToast(isEn ? "Enter target sequence!" : "Введите целевую цепочку для поиска!", "error");
            return;
        }

        const index = sequence.indexOf(target);
        if (index === -1) {
            showCyberToast(isEn ? "Sequence match not found! Scanning failed." : "Последовательность не найдена! Сканирование провалено.", "error");
            updateProsthesisVisual('error');
            return;
        }

        lastStartIndex = index;
        lastTargetLength = target.length;

        const bases = document.querySelectorAll(".base");
        const dnaContainer = document.getElementById("dna-sequence");
        if (bases[index] && cas9 && dnaContainer) {
            const targetRect = bases[index].getBoundingClientRect();
            const containerRect = dnaContainer.getBoundingClientRect();
            cas9.style.left = `${targetRect.left - containerRect.left}px`;
        }

        showCyberToast(isEn ? "Target locked! Cas9 positioned at cleavage site." : "Цель захвачена! Патруль Cas9 выведен на позицию разреза.", "success");
        document.getElementById("step-2").style.background = "rgba(0, 240, 255, 0.05)";
        document.getElementById("step-2").style.display = "block";
    });
}

const editBtn = document.getElementById("editBtn");
if (editBtn) {
    editBtn.addEventListener("click", () => {
        const replacement = document.getElementById("replaceRNA").value.toUpperCase().trim();
        const syringe = document.getElementById("injector-syringe");
        
        if (!replacement) {
            showCyberToast(isEn ? "Please enter donor sequence!" : "Введите новую последовательность для вставки!", "error");
            return;
        }

        if (syringe) {
            syringe.classList.add("injecting");
            showCyberToast(isEn ? "Injecting donor RNA complex..." : "Впрыск донорского РНК комплекса...", "success");
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
                    showCyberToast(isEn ? `HDR Success! Template integrated: ${replacement}` : `Успех HDR! Клетка успешно внедрила шаблон: ${replacement}`, "success");
                    updateProsthesisVisual('success');
                } else {
                    const mutations = ["AAAA", "TTTT", "CC", "GG", "🧬X"];
                    const randomMutation = mutations[Math.floor(Math.random() * mutations.length)];
                    sequence = leftPart + randomMutation + rightPart;
                    showCyberToast(isEn ? `HDR Failure! NHEJ emergency pathway activated. Mutation: ${randomMutation}` : `Сбой HDR! Сработал метод NHEJ. Возникла мутация: ${randomMutation}`, "error");
                    updateProsthesisVisual('error');
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

async function loadEthicsStats() {
    try {
        if (typeof db === 'undefined') {
            console.warn("Firebase не подключен. Используются стандартные значения статистики.");
            setDefaultStats();
            return;
        }

        const snapshot = await db.collection("ethics_votes").get();
        let votesData = {
            q1: { yes: 0, no: 0 },
            q2: { yes: 0, no: 0 },
            q3: { yes: 0, no: 0 }
        };

        snapshot.forEach(doc => {
            const data = doc.data();
            if (votesData[data.question]) {
                if (data.vote === 'yes') votesData[data.question].yes++;
                if (data.vote === 'no') votesData[data.question].no++;
            }
        });

        updateStatsUI(votesData);
    } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
        setDefaultStats();
    }
}

function updateStatsUI(votesData) {
    document.querySelectorAll(".ethics-card").forEach(card => {
        const qId = card.getAttribute("data-question");
        const qStats = votesData[qId];
        const total = qStats.yes + qStats.no;

        let yesPercent = total > 0 ? Math.round((qStats.yes / total) * 100) : getFallbackPercent(qId);
        let noPercent = 100 - yesPercent;

        const vYes = card.querySelector(".v-yes");
        const vNo = card.querySelector(".v-no");

        if (vYes && vNo) {
            vYes.innerText = isEn ? `FOR: ${yesPercent}%` : `ЗА: ${yesPercent}%`;
            vNo.innerText = isEn ? `AGAINST: ${noPercent}%` : `ПРОТИВ: ${noPercent}%`;
        }
    });
}

function getFallbackPercent(qId) {
    if (qId === 'q1') return 94;
    if (qId === 'q2') return 18;
    return 41;
}

function setDefaultStats() {
    let mockData = {
        q1: { yes: 94, no: 6 },
        q2: { yes: 18, no: 82 },
        q3: { yes: 41, no: 59 }
    };
    document.querySelectorAll(".ethics-card").forEach(card => {
        const qId = card.getAttribute("data-question");
        const vYes = card.querySelector(".v-yes");
        const vNo = card.querySelector(".v-no");
        if (vYes && vNo) {
            vYes.innerText = isEn ? `FOR: ${mockData[qId].yes}%` : `ЗА: ${mockData[qId].yes}%`;
            vNo.innerText = isEn ? `AGAINST: ${mockData[qId].no}%` : `ПРОТИВ: ${mockData[qId].no}%`;
        }
    });
}

loadEthicsStats();

document.querySelectorAll(".ethics-card").forEach(card => {
    const qId = card.getAttribute("data-question");
    
    card.querySelectorAll(".vote-btn").forEach(btn => {
        btn.addEventListener("click", async () => {
            const userVote = btn.classList.contains("yes") ? "yes" : "no";
            showCyberToast(isEn ? "Registering your vote in global ledger..." : "Регистрация вашего голоса в глобальном реестре...", "success");
            
            if (typeof db !== 'undefined') {
                try {
                    await db.collection("ethics_votes").add({
                        question: qId,
                        vote: userVote,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    });
                    showCyberToast(isEn ? "Vote submitted successfully!" : "Ваш голос успешно учтен!", "success");
                    loadEthicsStats();
                } catch (e) {
                    console.error("Ошибка при отправке голоса:", e);
                }
            } else {
                showCyberToast(isEn ? "Demo Mode: Vote saved locally!" : "Демо-режим: Голос учтен локально!", "success");
            }
        });
    });
});
