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

function selectionConflictStatus() {
    const exactEnergyKev = answers.energy === "exact_energy" ? parseEnergyToKev(answers.exact_energy) : null;
    const isHighOrHardEnergy =
        ["higher_energy_lab", "hard_xray"].includes(answers.energy) ||
        (exactEnergyKev !== null && exactEnergyKev >= 17);

    if (answers.pixel_size === "pixel_under_1" && isHighOrHardEnergy) {
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

render();
