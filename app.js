const steps = [
    { id: "application", short: "Application", hint: "Select" },
    { id: "energy", short: "Energy", hint: "Select" },
    { id: "pixel_size", short: "Pixel", hint: "Select" },
    { id: "performance", short: "Priority", hint: "Select" },
    { id: "installation", short: "Install", hint: "Select" },
    { id: "contact", short: "Contact", hint: "Your info" },
    { id: "review", short: "Review", hint: "Summary" },
];

const answers = {
    application: null,
    energy: null,
    target: null,
    pixel_size: null,
    performance: [],
    installation: null,
    contact_name: "",
    contact_email: "",
    contact_info: "",
    exact_energy: "",
};

let currentStep = 0;
let latestRecommendations = [];
let latestConflict = null;

const ICONS = {
    diffraction: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M9 44h46"/><path d="M13 38h8l5-21 8 34 7-25 6 12h6"/><path d="M17 26l7 7"/><path d="M47 28l-7 7"/></svg>',
    spectrum: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 42h8l4-10 6 18 6-26 7 16 4-8 7 10"/><path d="M13 50h38"/><path d="M15 34h3"/><path d="M48 34h3"/></svg>',
    soft: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M11 47c9 0 11-27 19-27s8 27 19 27"/><path d="M11 47h42"/><path d="M39 38l5-10 5 10"/></svg>',
    imaging: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 24v-9h9"/><path d="M41 15h9v9"/><path d="M50 40v9h-9"/><path d="M23 49h-9v-9"/><circle cx="32" cy="32" r="8"/><path d="M32 17v8M32 39v8M17 32h8M39 32h8"/></svg>',
    microscope: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M28 12l13 7-4 8-13-7z"/><path d="M30 24l-8 21"/><path d="M39 27c4 7 1 16-7 20"/><path d="M17 51h33"/><path d="M24 44h20"/><path d="M25 12l-4 8"/></svg>',
    cube: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 9l20 11v24L32 55 12 44V20z"/><path d="M12 20l20 12 20-12"/><path d="M32 32v23"/></svg>',
    factory: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 50V20l12 9V20l12 9V20l12 9v21z"/><path d="M20 43h7M33 43h7M46 43h4"/></svg>',
    material: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10l10 6v12l-10 6-10-6V16z"/><path d="M20 34l10 6v12l-10 6-10-6V40z"/><path d="M44 34l10 6v12l-10 6-10-6V40z"/></svg>',
    particles: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M15 49l34-34"/><path d="M27 52l25-25"/><path d="M12 36l17-17"/><circle cx="18" cy="18" r="2"/><circle cx="35" cy="15" r="2"/><circle cx="49" cy="44" r="2"/><circle cx="24" cy="39" r="2"/></svg>',
    education: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M8 24l24-12 24 12-24 12z"/><path d="M18 31v12c8 6 20 6 28 0V31"/><path d="M56 24v17"/></svg>',
    help: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 24a8 8 0 1 1 12 7c-4 3-5 5-5 9"/><path d="M32 49v1"/></svg>',
    energy: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M35 7L15 36h16l-3 21 21-31H34z"/></svg>',
    pixel: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 14h36v36H14z"/><path d="M26 14v36M38 14v36M14 26h36M14 38h36"/></svg>',
    priority: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 9v10"/><path d="M32 45v10"/><path d="M9 32h10"/><path d="M45 32h10"/><circle cx="32" cy="32" r="10"/><path d="M44 20l7-7M13 51l7-7M44 44l7 7M13 13l7 7"/></svg>',
    install: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 18h32v22H16z"/><path d="M24 48h16"/><path d="M32 40v8"/><path d="M22 25h20"/><path d="M22 32h12"/></svg>',
    contact: '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="22" r="9"/><path d="M16 54c3-12 29-12 32 0"/><path d="M44 17h8v14h-7"/></svg>',
    review: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M19 10h20l8 8v36H19z"/><path d="M39 10v9h8"/><path d="M25 29h18M25 38h18M25 47h12"/></svg>',
    default: '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10l20 12v20L32 54 12 42V22z"/><path d="M22 26h20M22 38h20"/></svg>',
};

const choiceIconMap = {
    application: {
        xrd_saxs_waxs: "diffraction",
        xafs_absorption: "spectrum",
        euv_soft_xray_spectroscopy: "soft",
        xray_euv_imaging: "imaging",
        microscopy_metrology: "microscope",
        ct_3d: "cube",
        industrial_ndt: "factory",
        material_identification: "material",
        radiation_particle: "particles",
        education_demo: "education",
        not_sure_application: "help",
    },
    energy: {
        default: "energy",
        not_sure_energy: "help",
    },
    target: {
        default: "energy",
        not_sure_target: "help",
    },
    pixel_size: {
        default: "pixel",
        not_sure_pixel: "help",
    },
    performance: {
        default: "priority",
        energy_resolved: "material",
        single_event: "particles",
        highest_resolution: "microscope",
        fast_imaging: "imaging",
        balanced: "priority",
        not_sure_performance: "help",
    },
    installation: {
        default: "install",
        vacuum_uhv: "soft",
        industrial_oem: "factory",
        inline_robot: "factory",
        portable_field: "contact",
        classroom: "education",
        beamline_advanced: "priority",
        not_sure_installation: "help",
    },
};

const els = {
    stepCount: document.querySelector("#step-count"),
    stepTotal: document.querySelector("#step-total"),
    progressFill: document.querySelector("#progress-fill"),
    stepOverview: document.querySelector("#step-overview"),
    stepLabel: document.querySelector("#step-label"),
    questionTitle: document.querySelector("#question-title"),
    questionCopy: document.querySelector("#question-copy"),
    cardsGrid: document.querySelector("#cards-grid"),
    contactPanel: document.querySelector("#contact-panel"),
    contactName: document.querySelector("#contact-name"),
    contactEmail: document.querySelector("#contact-email"),
    contactInfo: document.querySelector("#contact-info"),
    exactEnergy: document.querySelector("#exact-energy"),
    energyValue: document.querySelector("#energy-value"),
    reviewPanel: document.querySelector("#review-panel"),
    reviewGrid: document.querySelector("#review-grid"),
    resultsPanel: document.querySelector("#results-panel"),
    confidenceWarning: document.querySelector("#confidence-warning"),
    engineerNote: document.querySelector("#engineer-note"),
    engineerContact: document.querySelector("#engineer-contact"),
    engineerActionStatus: document.querySelector("#engineer-action-status"),
    resultsList: document.querySelector("#results-list"),
    compareGrid: document.querySelector("#compare-grid"),
    showResults: document.querySelector("#show-results"),
    compareTop: document.querySelector("#compare-top"),
    backButton: document.querySelector("#back-button"),
    nextButton: document.querySelector("#next-button"),
    flowPosition: document.querySelector("#flow-position"),
    energyDialog: document.querySelector("#energy-dialog"),
    dialogEnergyValue: document.querySelector("#dialog-energy-value"),
    energyCancel: document.querySelector("#energy-cancel"),
    energySave: document.querySelector("#energy-save"),
    aiOpen: document.querySelector("#ai-helper-open"),
    aiClose: document.querySelector("#ai-helper-close"),
    aiBackdrop: document.querySelector("#ai-helper-backdrop"),
    aiPanel: document.querySelector("#ai-helper-panel"),
    aiMessages: document.querySelector("#ai-helper-messages"),
    aiInput: document.querySelector("#ai-helper-input"),
    aiSubmit: document.querySelector("#ai-helper-submit"),
    aiReset: document.querySelector("#ai-helper-reset"),
    aiExtractedCard: document.querySelector("#ai-extracted-card"),
    aiExtractedGrid: document.querySelector("#ai-extracted-grid"),
    aiFollowupsCard: document.querySelector("#ai-followups-card"),
    aiFollowupList: document.querySelector("#ai-followup-list"),
    aiResultCard: document.querySelector("#ai-result-card"),
    aiResultTitle: document.querySelector("#ai-result-title"),
    aiResultNote: document.querySelector("#ai-result-note"),
    aiResultList: document.querySelector("#ai-result-list"),
    aiApply: document.querySelector("#ai-apply"),
    aiViewFull: document.querySelector("#ai-view-full"),
    aiAskAgain: document.querySelector("#ai-ask-again"),
};

const aiState = {
    extracted: null,
    answers: null,
    missing: [],
    recommendations: [],
    confidence: 0,
};

function selectedLabels(groupId) {
    if (groupId === "contact") {
        const mainContact = answers.contact_email || answers.contact_name || answers.contact_info;
        return mainContact ? [mainContact] : [];
    }

    const group = window.CHOICE_GROUPS[groupId];
    if (!group) return [];

    const selected = Array.isArray(answers[groupId])
        ? answers[groupId]
        : [answers[groupId]].filter(Boolean);

    const labels = selected
        .map((id) => group.choices.find((choice) => choice.id === id)?.label)
        .filter(Boolean);

    if (groupId === "energy" && answers.energy === "exact_energy" && answers.exact_energy) {
        labels[0] = `${labels[0]} (${answers.exact_energy})`;
    }

    return labels;
}

function iconForChoice(groupId, choiceId) {
    const iconName = choiceIconMap[groupId]?.[choiceId] || choiceIconMap[groupId]?.default || "default";
    return ICONS[iconName] || ICONS.default;
}

function stepLabelText(step, index) {
    if (step.id === "review") {
        return currentStep === index ? "Summary" : step.hint;
    }

    const labels = selectedLabels(step.id);
    return labels[0] || step.hint;
}

function renderStepOverview() {
    els.stepOverview.innerHTML = steps
        .map((step, index) => {
            const done = index < currentStep;
            const active = index === currentStep;
            return `
                <button class="step-card ${active ? "active" : ""} ${done ? "done" : ""}" data-step="${index}">
                    <span class="step-number">${done ? "✓" : index + 1}</span>
                    <span class="step-copy">
                        <strong>${step.short}</strong>
                        <small>${stepLabelText(step, index)}</small>
                    </span>
                </button>
            `;
        })
        .join("");

    document.querySelectorAll(".step-card").forEach((button) => {
        button.addEventListener("click", () => {
            currentStep = Number(button.dataset.step);
            render();
        });
    });
}

function isSelected(groupId, choiceId) {
    const value = answers[groupId];
    return Array.isArray(value) ? value.includes(choiceId) : value === choiceId;
}

function toggleChoice(groupId, choiceId) {
    const group = window.CHOICE_GROUPS[groupId];
    const maxChoices = group.max_choices || 1;

    if (maxChoices === 1) {
        answers[groupId] = answers[groupId] === choiceId ? null : choiceId;
        return;
    }

    const selected = new Set(answers[groupId] || []);
    if (selected.has(choiceId)) {
        selected.delete(choiceId);
    } else {
        if (selected.size >= maxChoices) {
            const first = selected.values().next().value;
            selected.delete(first);
        }
        selected.add(choiceId);
    }

    answers[groupId] = Array.from(selected);
}

function choiceCard(groupId, choice) {
    return `
        <button class="choice-card ${isSelected(groupId, choice.id) ? "selected" : ""}" data-group="${groupId}" data-choice="${choice.id}">
            <span class="choice-icon">${iconForChoice(groupId, choice.id)}</span>
            <span class="choice-copy">
                <strong>${choice.label}</strong>
                <small>${choice.description}</small>
            </span>
            <span class="choice-check">${isSelected(groupId, choice.id) ? "✓" : ""}</span>
        </button>
    `;
}

function renderChoiceCards(groupId) {
    const group = window.CHOICE_GROUPS[groupId];
    els.cardsGrid.innerHTML = group.choices.map((choice) => choiceCard(groupId, choice)).join("");
    els.cardsGrid.classList.toggle("compact", groupId === "performance");

    document.querySelectorAll(".choice-card").forEach((button) => {
        button.addEventListener("click", () => {
            toggleChoice(button.dataset.group, button.dataset.choice);
            if (button.dataset.group === "energy" && answers.energy === "exact_energy") {
                openExactEnergyDialog();
            }
            render();
        });
    });
}

function openExactEnergyDialog() {
    els.dialogEnergyValue.value = answers.exact_energy || "";
    if (typeof els.energyDialog.showModal === "function") {
        els.energyDialog.showModal();
    } else {
        const value = window.prompt("Enter the exact energy, for example 8.04 keV", answers.exact_energy || "");
        if (value !== null) {
            answers.exact_energy = value.trim();
            els.energyValue.value = answers.exact_energy;
        }
    }
}

function closeExactEnergyDialog() {
    if (els.energyDialog.open) {
        els.energyDialog.close();
    }
}

function renderOptionalTarget() {
    const shouldShowTarget = ["low_energy_lab", "standard_xrd", "higher_energy_lab"].includes(answers.energy);
    if (!shouldShowTarget) {
        answers.target = null;
        return "";
    }

    const group = window.CHOICE_GROUPS.target;
    return `
        <div class="subsection">
            <p class="subsection-title">Known target</p>
            <div class="mini-card-grid">
                ${group.choices.map((choice) => choiceCard("target", choice)).join("")}
            </div>
        </div>
    `;
}

function renderQuestionStep() {
    const step = steps[currentStep];
    const group = window.CHOICE_GROUPS[step.id];

    els.stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    els.questionTitle.textContent = group.question;
    els.questionCopy.textContent = step.id === "performance" ? "Choose up to 2 priorities." : "Choose the closest option.";
    els.contactPanel.classList.remove("visible");
    els.reviewPanel.classList.remove("visible");
    els.resultsPanel.classList.remove("visible");
    els.cardsGrid.style.display = "grid";

    renderChoiceCards(step.id);

    if (step.id === "energy") {
        els.cardsGrid.insertAdjacentHTML("afterend", renderOptionalTarget());
        document.querySelectorAll(".subsection .choice-card").forEach((button) => {
            button.addEventListener("click", () => {
                toggleChoice(button.dataset.group, button.dataset.choice);
                render();
            });
        });
        els.exactEnergy.classList.remove("visible");
    } else {
        document.querySelector(".subsection")?.remove();
        els.exactEnergy.classList.remove("visible");
    }
}

function renderContactStep() {
    els.stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    els.questionTitle.textContent = "Who should the engineer contact?";
    els.questionCopy.textContent = "Add contact details so the final recommendation can be prepared for engineer review later.";
    els.cardsGrid.style.display = "none";
    els.exactEnergy.classList.remove("visible");
    els.reviewPanel.classList.remove("visible");
    els.resultsPanel.classList.remove("visible");
    els.contactPanel.classList.add("visible");
    document.querySelector(".subsection")?.remove();
}

function renderReview() {
    els.stepLabel.textContent = `Step ${steps.length} of ${steps.length}`;
    els.questionTitle.textContent = "Recommendation Review";
    els.questionCopy.textContent = "Review the selected conditions before generating detector matches.";
    els.cardsGrid.style.display = "none";
    els.exactEnergy.classList.remove("visible");
    els.contactPanel.classList.remove("visible");
    els.reviewPanel.classList.add("visible");
    els.resultsPanel.classList.remove("visible");

    const reviewGroups = ["application", "energy", "target", "pixel_size", "performance", "installation", "contact"];
    const choiceCards = reviewGroups
        .map((groupId) => {
            const labels = selectedLabels(groupId);
            if (!labels.length) return "";
            const title = groupId === "contact" ? "Engineer Contact" : window.CHOICE_GROUPS[groupId].title;
            return `
                <article class="review-card">
                    <span>${title}</span>
                    <strong>${labels.join(", ")}</strong>
                </article>
            `;
        })
        .join("");

    const engineerCard = `
        <article class="review-card engineer-card">
            <span>Engineer handoff</span>
            <strong>Recommendation report will be prepared after results are generated.</strong>
        </article>
    `;

    els.reviewGrid.innerHTML = choiceCards + engineerCard;
}

function renderResultCard(item, index) {
    return `
        <article class="result-card">
            <div class="rank">${index + 1}</div>
            <div class="result-body">
                <div class="result-title-row">
                    <div>
                        <h3>${item.model_name_variant || item.product_id}</h3>
                        <p>${item.manufacturer || "Unknown manufacturer"} · ${item.product_family || "N/A"}</p>
                    </div>
                    <span class="score">${item.match_percent || 0}% match</span>
                </div>
                <dl class="spec-grid">
                    <div><dt>Detector</dt><dd>${item.detector_principle || "N/A"}</dd></div>
                    <div><dt>Energy</dt><dd>${item.energy_range || "N/A"}</dd></div>
                    <div><dt>Pixel</dt><dd>${item.pixel_size || "N/A"}</dd></div>
                    <div><dt>Active area</dt><dd>${item.active_area || "N/A"}</dd></div>
                    <div><dt>Interface</dt><dd>${item.interface || "N/A"}</dd></div>
                    <div><dt>Software</dt><dd>${item.software || "N/A"}</dd></div>
                </dl>
                <p class="applications">${item.applications || ""}</p>
                <div class="reason-list">
                    ${item.reasons.map((reason) => `<span>${reason}</span>`).join("")}
                </div>
            </div>
        </article>
    `;
}

function isUnknownAnswer(value) {
    return typeof value === "string" && value.startsWith("not_sure");
}

function parseEnergyToKev(value) {
    const match = String(value || "").toLowerCase().match(/(\d+(?:\.\d+)?)\s*(mev|kev|ev)?/);
    if (!match) return null;

    const number = Number(match[1]);
    const unit = match[2] || "kev";
    if (unit === "mev") return number * 1000;
    if (unit === "ev") return number / 1000;
    return number;
}

function selectionConflictStatus(source = answers) {
    const exactEnergyKev = source.energy === "exact_energy" ? parseEnergyToKev(source.exact_energy) : null;
    const isHighOrHardEnergy =
        ["higher_energy_lab", "hard_xray"].includes(source.energy) ||
        (exactEnergyKev !== null && exactEnergyKev >= 17);

    if (source.pixel_size === "pixel_under_1" && isHighOrHardEnergy) {
        return {
            level: "block",
            message: "Conflicting choices: high/hard X-ray energy and under 1 micrometer pixel size are not a practical detector-selection pair. Please change either the energy range or the pixel-size requirement before viewing product matches.",
        };
    }

    return { level: "ok", message: "" };
}

function uncertaintyStatus() {
    const performanceUnknown = (answers.performance || []).includes("not_sure_performance");
    const unknownCount = [
        answers.application,
        answers.energy,
        answers.pixel_size,
        answers.installation,
    ].filter(isUnknownAnswer).length + (performanceUnknown ? 1 : 0);

    const allUnknown =
        answers.application === "not_sure_application" &&
        answers.energy === "not_sure_energy" &&
        answers.pixel_size === "not_sure_pixel" &&
        performanceUnknown &&
        answers.installation === "not_sure_installation";

    if (allUnknown) {
        return {
            level: "block",
            message: "Need more information. Please choose at least an application, energy range, or pixel size before requesting detector matches.",
        };
    }

    if (unknownCount >= 3) {
        return {
            level: "warn",
            message: "This recommendation might not be accurate because several answers are unknown. Please add more information for a stronger match.",
        };
    }

    return { level: "ok", message: "" };
}

function showConfidenceMessage(status) {
    els.confidenceWarning.textContent = status.message;
    els.confidenceWarning.classList.toggle("visible", status.level !== "ok");
    els.confidenceWarning.classList.toggle("blocking", status.level === "block");
}

async function loadRecommendations() {
    answers.exact_energy = els.energyValue.value.trim();
    els.resultsList.innerHTML = "<p class='loading'>Finding detector matches...</p>";
    els.compareGrid.innerHTML = "";
    els.engineerActionStatus.textContent = "";
    latestConflict = null;
    const conflict = selectionConflictStatus();
    const contactLine = answers.contact_email || answers.contact_name || answers.contact_info;
    els.engineerNote.textContent = contactLine
        ? "Engineer review prepared with the contact details from the previous step. Sending is not connected yet."
        : "No contact details were added. The recommendation can still be reviewed here.";
    els.resultsPanel.classList.add("visible");

    if (conflict.level === "block") {
        showConfidenceMessage(conflict);
        latestConflict = conflict;
        latestRecommendations = [];
        els.resultsList.innerHTML = "<article class='info-empty'>Please revise the conflicting energy and pixel-size answers before showing product matches.</article>";
        return;
    }

    const uncertainty = uncertaintyStatus();
    showConfidenceMessage(uncertainty);

    if (uncertainty.level === "block") {
        latestRecommendations = [];
        els.resultsList.innerHTML = "<article class='info-empty'>Need more information before showing product matches.</article>";
        return;
    }

    const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
    });

    const data = await response.json();
    if (data.conflict?.has_conflict) {
        showConfidenceMessage({ level: "block", message: data.conflict.message });
        latestConflict = data.conflict;
        latestRecommendations = [];
        els.resultsList.innerHTML = "<article class='info-empty'>Please revise the conflicting answers before showing product matches.</article>";
        return;
    }
    latestRecommendations = data.recommendations || [];
    els.resultsList.innerHTML = latestRecommendations.map(renderResultCard).join("");
}

function prepareEngineerRequest() {
    const contactLine = answers.contact_email || answers.contact_name || answers.contact_info;
    const contactHint = contactLine
        ? `Contact: ${contactLine}.`
        : "Add an email or contact note in Step 6 so an engineer can follow up.";

    if (latestConflict) {
        els.engineerActionStatus.textContent = `${contactHint} Engineering review prepared to discuss alternative ways to reach the measurement goal, because the selected energy and pixel size conflict with standard detector matches. Sending is not connected yet.`;
        return;
    }

    if (latestRecommendations.length) {
        const products = latestRecommendations
            .map((item) => item.model_name_variant || item.product_id)
            .slice(0, 3)
            .join(", ");
        els.engineerActionStatus.textContent = `${contactHint} Engineering review prepared for these recommended products: ${products}. Sending is not connected yet.`;
        return;
    }

    els.engineerActionStatus.textContent = `${contactHint} Engineering review prepared. Generate recommendations first, or revise the answers if the current choices are blocked. Sending is not connected yet.`;
}

function renderComparison() {
    const top = latestRecommendations.slice(0, 3);
    if (!top.length) return;

    els.compareGrid.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Energy</th>
                    <th>Pixel</th>
                    <th>Active area</th>
                    <th>Interface</th>
                </tr>
            </thead>
            <tbody>
                ${top
                    .map((item) => `
                        <tr>
                            <td>${item.model_name_variant || item.product_id}</td>
                            <td>${item.energy_range || "N/A"}</td>
                            <td>${item.pixel_size || "N/A"}</td>
                            <td>${item.active_area || "N/A"}</td>
                            <td>${item.interface || "N/A"}</td>
                        </tr>
                    `)
                    .join("")}
            </tbody>
        </table>
    `;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function normalizeAiText(value) {
    return String(value || "")
        .toLowerCase()
        .replaceAll("α", "alpha")
        .replaceAll("µ", "u")
        .replaceAll("μ", "u")
        .replace(/[‐‑‒–—]/g, "-");
}

function labelForChoice(groupId, choiceId) {
    return window.CHOICE_GROUPS[groupId]?.choices.find((choice) => choice.id === choiceId)?.label || "";
}

function labelsForAiGroup(groupId, value) {
    if (groupId === "performance") {
        return (value || []).map((id) => labelForChoice(groupId, id)).filter(Boolean);
    }
    return value ? [labelForChoice(groupId, value)].filter(Boolean) : [];
}

function countChoiceTermHits(text, choice) {
    return (choice.terms || []).reduce((score, term) => {
        const normalized = normalizeAiText(term);
        return normalized && text.includes(normalized) ? score + 1 : score;
    }, 0);
}

function bestChoiceByTerms(groupId, text) {
    const choices = window.CHOICE_GROUPS[groupId]?.choices || [];
    let best = { id: null, score: 0 };

    choices.forEach((choice) => {
        if (choice.id.startsWith("not_sure")) return;
        const score = countChoiceTermHits(text, choice);
        if (score > best.score) {
            best = { id: choice.id, score };
        }
    });

    return best.score > 0 ? best.id : null;
}

function extractSampleText(text) {
    const samples = [
        "powder",
        "crystal",
        "thin film",
        "wafer",
        "polymer",
        "alloy",
        "metal",
        "weld",
        "pipe",
        "battery",
        "electronics",
        "composite",
        "casting",
        "biological sample",
        "radiation source",
    ];
    return samples.filter((sample) => text.includes(sample)).slice(0, 3).join(", ");
}

function outputTypeForApplication(applicationId) {
    const map = {
        xrd_saxs_waxs: "Diffraction pattern",
        xafs_absorption: "Spectrum / absorption curve",
        euv_soft_xray_spectroscopy: "Spectrum",
        xray_euv_imaging: "2D image",
        microscopy_metrology: "High-resolution image",
        ct_3d: "CT volume",
        industrial_ndt: "2D / CT / inspection image",
        material_identification: "Material map",
        radiation_particle: "Particle tracks / radiation map",
        education_demo: "Demonstration result",
    };
    return map[applicationId] || "";
}

function extractEnergyFromText(text) {
    const exactMatch = text.match(/(\d+(?:\.\d+)?)\s*(mev|kev|ev)\b/);
    const exactEnergy = exactMatch ? `${exactMatch[1]} ${exactMatch[2]}` : "";

    if (/\bcr\b|cr-k|5\.4/.test(text)) {
        return { energy: "low_energy_lab", target: "cr_ka", exact_energy: exactEnergy || "5.4 keV" };
    }
    if (/\bcu\b|cu-k|8\.04/.test(text)) {
        return { energy: "standard_xrd", target: "cu_ka", exact_energy: exactEnergy || "8.04 keV" };
    }
    if (/\bw-l\b|w-lalpha|8\.4/.test(text)) {
        return { energy: "low_energy_lab", target: "w_la", exact_energy: exactEnergy || "8.4 keV" };
    }
    if (/\bmo\b|mo-k|17\.4/.test(text)) {
        return { energy: "higher_energy_lab", target: "mo_ka", exact_energy: exactEnergy || "17.4 keV" };
    }
    if (/\brh\b|rh-k|20\.2/.test(text)) {
        return { energy: "higher_energy_lab", target: "rh_ka", exact_energy: exactEnergy || "20.2 keV" };
    }
    if (/\bag\b|ag-k|22\.2/.test(text)) {
        return { energy: "higher_energy_lab", target: "ag_ka", exact_energy: exactEnergy || "22.2 keV" };
    }
    if (/gamma|neutron|alpha particle|beta|cosmic|particle/.test(text)) {
        return { energy: "gamma_neutron_particles", target: null, exact_energy: exactEnergy };
    }
    if (/euv|vuv|soft x-ray|sxr/.test(text)) {
        return { energy: "euv_vuv_soft", target: null, exact_energy: exactEnergy };
    }
    if (/hard x-ray|hxr|high penetration|dense metal|30\s*kev|150\s*kev/.test(text)) {
        return { energy: "hard_xray", target: null, exact_energy: exactEnergy };
    }
    if (exactMatch) {
        const kev = parseEnergyToKev(exactEnergy);
        if (kev !== null && kev < 1) return { energy: "euv_vuv_soft", target: null, exact_energy: exactEnergy };
        if (kev !== null && kev > 30) return { energy: "hard_xray", target: null, exact_energy: exactEnergy };
        return { energy: "exact_energy", target: null, exact_energy: exactEnergy };
    }

    return { energy: bestChoiceByTerms("energy", text), target: null, exact_energy: "" };
}

function extractPixelFromText(text) {
    const submicron = /under\s*1|<\s*1|less than\s*1|submicron|sub-micron|nanometer|nm\b/.test(text);
    if (submicron) return "pixel_under_1";

    const pixelMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:um|micron|micrometer|micrometers)\b/);
    if (pixelMatch) {
        const value = Number(pixelMatch[1]);
        if (value < 1) return "pixel_under_1";
        if (value <= 30) return "pixel_1_30";
        if (value <= 100) return "pixel_30_100";
    }

    if (/large pixel|photon-counting|photon counting|timepix|medipix|high energy/.test(text)) {
        return "pixel_30_100";
    }
    if (/small pixel|high resolution|scientific imaging|ccd|scmos/.test(text)) {
        return "pixel_1_30";
    }

    return bestChoiceByTerms("pixel_size", text);
}

function extractPerformanceFromText(text) {
    const choices = window.CHOICE_GROUPS.performance.choices
        .filter((choice) => choice.id !== "not_sure_performance")
        .map((choice) => {
            let score = countChoiceTermHits(text, choice);
            if (choice.id === "highest_resolution" && /high resolution|small pixel|submicron|microscopy/.test(text)) score += 2;
            if (choice.id === "energy_resolved" && /energy-resolved|energy resolved|material|color x-ray|spectral/.test(text)) score += 2;
            if (choice.id === "weak_signal_low_noise" && /weak signal|low noise|low flux|deep cooling|dark current/.test(text)) score += 2;
            if (choice.id === "fast_imaging" && /fast|frame rate|real-time|high-throughput|dynamic/.test(text)) score += 2;
            return { id: choice.id, score };
        })
        .filter((choice) => choice.score > 0)
        .sort((a, b) => b.score - a.score);

    return choices.slice(0, 2).map((choice) => choice.id);
}

function extractRequirementsFromText(rawText) {
    const text = normalizeAiText(rawText);
    const energyInfo = extractEnergyFromText(text);

    return {
        application: bestChoiceByTerms("application", text),
        energy: energyInfo.energy,
        target: energyInfo.target,
        pixel_size: extractPixelFromText(text),
        performance: extractPerformanceFromText(text),
        installation: bestChoiceByTerms("installation", text),
        exact_energy: energyInfo.exact_energy,
        sample: extractSampleText(text),
        output_type: "",
        original_text: rawText.trim(),
    };
}

function completeAiAnswers(extracted) {
    return {
        application: extracted.application || "not_sure_application",
        energy: extracted.energy || "not_sure_energy",
        target: extracted.target || null,
        pixel_size: extracted.pixel_size || "not_sure_pixel",
        performance: extracted.performance?.length ? extracted.performance : ["not_sure_performance"],
        installation: extracted.installation || "not_sure_installation",
        contact_name: answers.contact_name,
        contact_email: answers.contact_email,
        contact_info: answers.contact_info,
        exact_energy: extracted.exact_energy || "",
    };
}

function getAiMissingGroups(extracted) {
    const missing = [];
    if (!extracted.application) missing.push("application");
    if (!extracted.energy) missing.push("energy");
    if (!extracted.pixel_size) missing.push("pixel_size");
    if (!extracted.performance?.length) missing.push("performance");
    if (!extracted.installation) missing.push("installation");
    return missing;
}

function calculateAiConfidence(extracted, recommendations = []) {
    const weights = {
        application: 20,
        energy: 24,
        pixel_size: 24,
        performance: 18,
        installation: 14,
    };

    let score = 0;
    if (extracted.application) score += weights.application;
    if (extracted.energy) score += weights.energy;
    if (extracted.pixel_size) score += weights.pixel_size;
    if (extracted.performance?.length) score += weights.performance;
    if (extracted.installation) score += weights.installation;
    if (recommendations[0]?.match_percent) {
        score = Math.round((score * 0.75) + (Number(recommendations[0].match_percent) * 0.25));
    }
    return Math.min(100, score);
}

function renderAiMessages(userText) {
    els.aiMessages.innerHTML = `
        <article class="ai-message user">
            <strong>Your request</strong>
            <span>${escapeHtml(userText)}</span>
        </article>
        <article class="ai-message assistant">
            <strong>I extracted the technical choices below.</strong>
            <span>If anything is missing, answer the short follow-up cards, then I will refresh the possible matches.</span>
        </article>
    `;
}

function renderAiExtractedInfo() {
    const extracted = aiState.extracted;
    if (!extracted) {
        els.aiExtractedCard.hidden = true;
        return;
    }

    const applicationLabel = labelForChoice("application", extracted.application);
    const energyLabel = labelForChoice("energy", extracted.energy);
    const targetLabel = labelForChoice("target", extracted.target);
    const pixelLabel = labelForChoice("pixel_size", extracted.pixel_size);
    const performanceLabels = labelsForAiGroup("performance", extracted.performance);
    const installationLabel = labelForChoice("installation", extracted.installation);
    extracted.output_type = outputTypeForApplication(extracted.application);

    const rows = [
        ["Application", applicationLabel || "Missing"],
        ["Sample / object", extracted.sample || "Not provided"],
        ["Source / energy", [targetLabel, energyLabel, extracted.exact_energy].filter(Boolean).join(" · ") || "Missing"],
        ["Output type", extracted.output_type || "Inferred after application"],
        ["Pixel size", pixelLabel || "Missing"],
        ["Performance priority", performanceLabels.join(", ") || "Missing"],
        ["Environment", installationLabel || "Missing"],
        ["AI confidence", `${aiState.confidence}%`],
    ];

    els.aiExtractedGrid.innerHTML = rows
        .map(([label, value]) => `
            <div>
                <span>${escapeHtml(label)}</span>
                <strong>${escapeHtml(value)}</strong>
            </div>
        `)
        .join("");
    els.aiExtractedCard.hidden = false;
}

function aiFollowupQuestion(groupId) {
    const map = {
        application: "What are you trying to measure?",
        energy: "What X-ray source or energy are you using?",
        pixel_size: "What pixel size range do you need?",
        performance: "What matters most for your measurement?",
        installation: "Where will the detector be used?",
    };
    return map[groupId] || window.CHOICE_GROUPS[groupId]?.question || "Choose the closest option.";
}

function renderAiFollowups() {
    if (!aiState.missing.length) {
        els.aiFollowupsCard.hidden = true;
        els.aiFollowupList.innerHTML = "";
        return;
    }

    els.aiFollowupList.innerHTML = aiState.missing
        .map((groupId) => {
            const choices = window.CHOICE_GROUPS[groupId].choices;
            return `
                <div class="ai-followup-group">
                    <strong>${escapeHtml(aiFollowupQuestion(groupId))}</strong>
                    <div class="ai-followup-options">
                        ${choices.map((choice) => `
                            <button type="button" data-ai-group="${groupId}" data-ai-choice="${choice.id}">
                                ${escapeHtml(choice.label)}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `;
        })
        .join("");

    document.querySelectorAll("[data-ai-group]").forEach((button) => {
        button.addEventListener("click", () => {
            applyAiFollowupChoice(button.dataset.aiGroup, button.dataset.aiChoice);
        });
    });

    els.aiFollowupsCard.hidden = false;
}

function applyAiFollowupChoice(groupId, choiceId) {
    if (!aiState.extracted) return;

    if (groupId === "performance") {
        if (choiceId === "not_sure_performance") {
            aiState.extracted.performance = ["not_sure_performance"];
        } else {
            const selected = new Set((aiState.extracted.performance || []).filter((id) => id !== "not_sure_performance"));
            selected.add(choiceId);
            aiState.extracted.performance = Array.from(selected).slice(-2);
        }
    } else {
        aiState.extracted[groupId] = choiceId;
        if (groupId === "energy") {
            if (choiceId === "exact_energy") {
                const value = window.prompt("Enter the exact energy, for example 8.04 keV", aiState.extracted.exact_energy || "");
                aiState.extracted.exact_energy = (value || "").trim();
            } else {
                aiState.extracted.exact_energy = aiState.extracted.exact_energy || "";
            }
        }
    }

    aiState.missing = getAiMissingGroups(aiState.extracted);
    aiState.confidence = calculateAiConfidence(aiState.extracted, aiState.recommendations);
    renderAiExtractedInfo();
    renderAiFollowups();
    runAiRecommendationPreview();
}

function renderAiRecommendationList(items) {
    if (!items.length) {
        return "<article class='ai-empty'>No possible product match was found from the current information.</article>";
    }

    return items.slice(0, 3).map((item) => `
        <article class="ai-mini-result">
            <div>
                <strong>${escapeHtml(item.model_name_variant || item.product_id)}</strong>
                <span>${escapeHtml(item.manufacturer || "Unknown manufacturer")}</span>
            </div>
            <b>${Number(item.match_percent || 0)}%</b>
            <p>${escapeHtml((item.reasons || []).slice(0, 2).join(" · ") || "Possible database match")}</p>
        </article>
    `).join("");
}

function countUnknownInAiAnswers(aiAnswers) {
    return [
        aiAnswers.application,
        aiAnswers.energy,
        aiAnswers.pixel_size,
        aiAnswers.installation,
    ].filter(isUnknownAnswer).length + ((aiAnswers.performance || []).includes("not_sure_performance") ? 1 : 0);
}

async function runAiRecommendationPreview() {
    if (!aiState.extracted) return;

    const aiAnswers = completeAiAnswers(aiState.extracted);
    aiState.answers = aiAnswers;
    els.aiResultCard.hidden = false;
    els.aiResultTitle.textContent = "Checking possible matches";
    els.aiResultNote.textContent = "Using the same strict recommendation endpoint as the manual selector.";
    els.aiResultList.innerHTML = "<p class='loading'>Finding possible detector matches...</p>";

    const conflict = selectionConflictStatus(aiAnswers);
    if (conflict.level === "block") {
        aiState.recommendations = [];
        aiState.confidence = calculateAiConfidence(aiState.extracted, []);
        renderAiExtractedInfo();
        els.aiResultTitle.textContent = "Engineer review recommended";
        els.aiResultNote.textContent = `${conflict.message} A detector setup may still be possible, but the approach should be reviewed by an engineer.`;
        els.aiResultList.innerHTML = "<article class='ai-empty'>Automatic product matching is paused because the selected requirements conflict.</article>";
        return;
    }

    try {
        const response = await fetch("/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aiAnswers),
        });
        const data = await response.json();
        aiState.recommendations = data.recommendations || [];
        aiState.confidence = calculateAiConfidence(aiState.extracted, aiState.recommendations);
        renderAiExtractedInfo();

        const unknownCount = countUnknownInAiAnswers(aiAnswers);
        const topMatch = Number(aiState.recommendations[0]?.match_percent || 0);
        const needsReview = aiState.missing.length >= 2 || unknownCount >= 3 || aiState.confidence < 70 || topMatch < 55;

        if (needsReview) {
            els.aiResultTitle.textContent = "Engineer review recommended";
            els.aiResultNote.textContent = "Possible matches are shown below, but the information is not strong enough for an automatic final recommendation. Add the missing details or ask an engineer to review the case.";
        } else {
            els.aiResultTitle.textContent = "Strong match preview";
            els.aiResultNote.textContent = "The assistant found enough information to show controlled matches. You can apply these choices to the selector for the full result page.";
        }

        els.aiResultList.innerHTML = renderAiRecommendationList(aiState.recommendations);
    } catch (error) {
        els.aiResultTitle.textContent = "Assistant error";
        els.aiResultNote.textContent = "The helper could not reach the recommendation endpoint. Check that the Flask app is running.";
        els.aiResultList.innerHTML = "";
    }
}

function openAiHelper() {
    els.aiPanel.classList.add("visible");
    els.aiBackdrop.classList.add("visible");
    els.aiPanel.setAttribute("aria-hidden", "false");
    els.aiInput.focus();
}

function closeAiHelper() {
    els.aiPanel.classList.remove("visible");
    els.aiBackdrop.classList.remove("visible");
    els.aiPanel.setAttribute("aria-hidden", "true");
}

function resetAiHelper(keepInput = false) {
    aiState.extracted = null;
    aiState.answers = null;
    aiState.missing = [];
    aiState.recommendations = [];
    aiState.confidence = 0;
    if (!keepInput) els.aiInput.value = "";
    els.aiMessages.innerHTML = `
        <article class="ai-message assistant">
            <strong>Start with a short measurement description.</strong>
            <span>Include your application, source energy, pixel size or resolution need, performance priority, and environment if you know them.</span>
        </article>
    `;
    els.aiExtractedCard.hidden = true;
    els.aiFollowupsCard.hidden = true;
    els.aiResultCard.hidden = true;
}

function applyAiChoicesToSelector() {
    if (!aiState.answers) return;
    Object.assign(answers, aiState.answers);
    els.energyValue.value = answers.exact_energy || "";
    currentStep = steps.length - 1;
    closeAiHelper();
    render();
}

async function viewFullAiRecommendation() {
    applyAiChoicesToSelector();
    await loadRecommendations();
}

async function analyzeAiRequest() {
    const text = els.aiInput.value.trim();
    if (!text) {
        els.aiMessages.innerHTML = `
            <article class="ai-message assistant warning">
                <strong>Please describe the measurement first.</strong>
                <span>A short sentence is enough, for example: powder XRD with Cu-Kalpha in a normal lab.</span>
            </article>
        `;
        return;
    }

    renderAiMessages(text);
    aiState.extracted = extractRequirementsFromText(text);
    aiState.missing = getAiMissingGroups(aiState.extracted);
    aiState.confidence = calculateAiConfidence(aiState.extracted, []);
    aiState.recommendations = [];
    renderAiExtractedInfo();
    renderAiFollowups();
    await runAiRecommendationPreview();
}

function canGoNext() {
    const step = steps[currentStep];
    if (step.id === "review") return true;
    if (step.id === "contact") return true;
    if (step.id === "energy" && answers.energy === "exact_energy") {
        return Boolean((answers.exact_energy || "").trim());
    }
    const value = answers[step.id];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
}

function renderFlowPosition() {
    if (!els.flowPosition) return;

    const dots = steps
        .map((step, index) => `<span class="${index === currentStep ? "active" : ""} ${index < currentStep ? "done" : ""}" aria-label="${step.short}"></span>`)
        .join("");

    els.flowPosition.innerHTML = `
        <div class="flow-dots" aria-hidden="true">${dots}</div>
        <p>Your information is secure and will only be used to recommend the best solution.</p>
    `;
}

function render() {
    els.stepCount.textContent = currentStep + 1;
    els.stepTotal.textContent = steps.length;
    els.progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    els.backButton.disabled = currentStep === 0;
    els.backButton.innerHTML = "<span aria-hidden='true'>←</span> Back";
    els.nextButton.innerHTML = currentStep === steps.length - 1
        ? "Show results <span aria-hidden='true'>→</span>"
        : `Next: ${steps[currentStep + 1].short} <span aria-hidden='true'>→</span>`;
    els.nextButton.disabled = !canGoNext() && currentStep !== steps.length - 1;

    document.querySelector(".subsection")?.remove();
    renderStepOverview();
    renderFlowPosition();

    if (steps[currentStep].id === "review") {
        renderReview();
    } else if (steps[currentStep].id === "contact") {
        renderContactStep();
    } else {
        renderQuestionStep();
    }
}

els.backButton.addEventListener("click", () => {
    currentStep = Math.max(0, currentStep - 1);
    render();
});

els.nextButton.addEventListener("click", () => {
    if (steps[currentStep].id === "review") {
        loadRecommendations();
        return;
    }
    currentStep = Math.min(steps.length - 1, currentStep + 1);
    render();
});

els.showResults.addEventListener("click", loadRecommendations);
els.compareTop.addEventListener("click", renderComparison);
els.engineerContact.addEventListener("click", prepareEngineerRequest);
els.contactName.addEventListener("input", () => {
    answers.contact_name = els.contactName.value.trim();
    renderStepOverview();
});
els.contactEmail.addEventListener("input", () => {
    answers.contact_email = els.contactEmail.value.trim();
    renderStepOverview();
});
els.contactInfo.addEventListener("input", () => {
    answers.contact_info = els.contactInfo.value.trim();
    renderStepOverview();
});
els.energyValue.addEventListener("input", () => {
    answers.exact_energy = els.energyValue.value.trim();
});
els.energySave.addEventListener("click", () => {
    answers.exact_energy = els.dialogEnergyValue.value.trim();
    els.energyValue.value = answers.exact_energy;
    closeExactEnergyDialog();
    render();
});
els.energyCancel.addEventListener("click", () => {
    if (!answers.exact_energy) {
        answers.energy = null;
    }
    closeExactEnergyDialog();
    render();
});
els.dialogEnergyValue.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        els.energySave.click();
    }
});
els.aiOpen.addEventListener("click", openAiHelper);
els.aiClose.addEventListener("click", closeAiHelper);
els.aiBackdrop.addEventListener("click", closeAiHelper);
els.aiSubmit.addEventListener("click", analyzeAiRequest);
els.aiReset.addEventListener("click", () => resetAiHelper());
els.aiApply.addEventListener("click", applyAiChoicesToSelector);
els.aiViewFull.addEventListener("click", viewFullAiRecommendation);
els.aiAskAgain.addEventListener("click", () => resetAiHelper(true));
els.aiInput.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        analyzeAiRequest();
    }
});

render();
