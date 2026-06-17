const steps = [
    { id: "application", short: "Application", hint: "Select" },
    { id: "energy", short: "Energy", hint: "Select" },
    { id: "pixel_size", short: "Pixel", hint: "Select" },
    { id: "performance", short: "Priority", hint: "Select" },
    { id: "installation", short: "Install", hint: "Select" },
    { id: "review", short: "Review", hint: "Summary" },
    { id: "contact", short: "Contact", hint: "Your info" },
];

const LANGUAGE_STORAGE_KEY = "detectorSelectorLanguage";
let currentLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) === "en" ? "en" : "zh";

const LANGUAGE_TEXT = {
    en: {
        langAttr: "en",
        toggleLabel: "中文",
        steps: {
            application: { short: "Application", hint: "Select" },
            energy: { short: "Energy", hint: "Select" },
            pixel_size: { short: "Pixel", hint: "Select" },
            performance: { short: "Priority", hint: "Select" },
            installation: { short: "Install", hint: "Select" },
            review: { short: "Review", hint: "Summary" },
            contact: { short: "Contact", hint: "Your info" },
        },
        ui: {
            documentTitle: "X-ray Detector Selector",
            heroTitle: "X-ray Detector Selector",
            heroKicker: "X 射线探测器选型工具",
            heroSubtitle: "Answer a few questions and we will help you find the detector that best fits your application.",
            aiHelperOpen: "AI helper",
            infoSummary: "What's the selector?",
            infoTitle: "Find the right X-ray detector faster.",
            infoCopy: "This research engine helps users choose suitable X-ray detectors based on their application, sample, source energy, resolution needs, sensitivity, speed, and installation environment. Instead of reading through many datasheets, users can answer a few guided questions or describe their needs to an AI helper. The system then compares their requirements with a structured detector database and recommends the best-matching products with clear reasons.",
            chooseClosest: "Choose the closest option.",
            choosePriorities: "Choose up to 2 priorities.",
            stepOf: "Step {current} of {total}",
            knownTarget: "Known target",
            exactEnergy: "Exact energy",
            exactEnergyPlaceholder: "Example: 8.04 keV",
            exactEnergyPrompt: "Enter the exact energy, for example 8.04 keV",
            contactTitle: "Who should the engineer contact?",
            contactCopy: "Leave contact details after reviewing the product matches. Sending is not connected yet.",
            contactName: "Name",
            contactNamePlaceholder: "Your name",
            contactEmail: "Email",
            contactInfo: "Contact info or notes",
            contactInfoPlaceholder: "Phone, company, preferred contact method, or anything the engineer should know",
            contactNote: "This step only prepares the recommendation for engineer review. Sending is not connected yet.",
            reviewTitle: "Recommendation Review",
            reviewCopy: "Review the selected conditions and generate detector matches before leaving contact information.",
            nextStep: "Next step",
            engineerCard: "Generate matches first, then add contact details in the final step.",
            showResults: "Show recommended detectors",
            resultsEyebrow: "Recommendation output",
            resultsTitle: "Best matches",
            compareTop: "Compare top 3",
            engineerAction: "Contact engineer to discuss alternative ways",
            previous: "Back",
            next: "Next",
            finish: "Finish",
            showResultsNext: "Show results",
            nextContact: "Next: Contact",
            secureNote: "Your information is secure and will only be used to recommend the best solution.",
            loading: "Finding detector matches...",
            noContact: "No contact details were added. The recommendation can still be reviewed here.",
            contactPrepared: "Engineer review prepared with the contact details from the previous step. Sending is not connected yet.",
            needMoreInfo: "Need more information before showing product matches.",
            reviseConflict: "Please revise the conflicting answers before showing product matches.",
            infoEmptyConflict: "Please revise the conflicting energy and pixel-size answers before showing product matches.",
            needMoreInfoMessage: "Need more information. Please choose at least an application, energy range, or pixel size before requesting detector matches.",
            lowInfoWarning: "This recommendation might not be accurate because several answers are unknown. Please add more information for a stronger match.",
            possibleConflict: "Possible conflict: high/hard X-ray energy and under 1 micrometer pixel size may require custom optics, scintillator coupling, or engineer review.",
            conflictCheck: "Conflict check",
            conflictFallbackTitle: "Possible matches, but review the answers",
            conflictFallbackMessage: "Some answers point toward different detector families.",
            product: "Product",
            detector: "Detector",
            energy: "Energy",
            pixel: "Pixel",
            activeArea: "Active area",
            interface: "Interface",
            software: "Software",
            unknownManufacturer: "Unknown manufacturer",
            match: "match",
            notAvailable: "N/A",
            contactHintWithContact: "Contact: {contact}.",
            contactHintNoContact: "Add an email or contact note in Step 6 so an engineer can follow up.",
            engineerAlternativePrepared: "Engineering review prepared to discuss alternative ways to reach the measurement goal, because some selected answers point toward different detector families. Sending is not connected yet.",
            engineerProductsPrepared: "Engineering review prepared for these recommended products: {products}. Sending is not connected yet.",
            engineerGenericPrepared: "Engineering review prepared. Generate recommendations first, or revise the answers if the current choices are blocked. Sending is not connected yet.",
            aiPanelEyebrow: "AI assistant",
            aiPanelTitle: "Describe your detector need",
            aiPanelCopy: "The helper extracts requirements, checks missing information, and uses the same recommendation engine.",
            aiStartTitle: "Start with a short measurement description.",
            aiStartCopy: "Include your application, source energy, pixel size or resolution need, performance priority, and environment if you know them.",
            aiInputLabel: "Measurement description",
            aiInputPlaceholder: "Example: I need a detector for powder XRD using Cu-Kalpha. I want high resolution and energy-resolved imaging. It will be used in a normal lab.",
            aiAnalyze: "Analyze request",
            aiClear: "Clear",
            aiExtractedEyebrow: "Extracted requirements",
            aiExtractedTitle: "What the assistant understood",
            aiFollowupsEyebrow: "Missing information",
            aiFollowupsTitle: "Answer only what is needed",
            aiResultEyebrow: "AI result",
            aiResultTitle: "Recommendation preview",
            aiApply: "Apply these choices to selector",
            aiViewFull: "View full recommendation",
            aiAskAgain: "Ask another question",
            aiUserRequest: "Your request",
            aiExtractedMessageTitle: "I extracted the technical choices below.",
            aiExtractedMessageCopy: "If anything is missing, answer the short follow-up cards, then I will refresh the possible matches.",
            aiDescribeFirstTitle: "Please describe the measurement first.",
            aiDescribeFirstCopy: "A short sentence is enough, for example: powder XRD with Cu-Kalpha in a normal lab.",
            aiCheckingTitle: "Checking possible matches",
            aiCheckingCopy: "Using the same strict recommendation endpoint as the manual selector.",
            aiEngineerReview: "Engineer review recommended",
            aiStrongMatch: "Strong match preview",
            aiStrongMatchCopy: "The assistant found enough information to show controlled matches. You can apply these choices to the selector for the full result page.",
            aiNeedsReviewCopy: "Possible matches are shown below, but the information is not strong enough for an automatic final recommendation. Add the missing details or ask an engineer to review the case.",
            aiConflictPaused: "Automatic product matching is paused because the selected requirements conflict.",
            aiNoMatch: "No possible product match was found from the current information.",
            aiPossibleDatabaseMatch: "Possible database match",
            aiErrorTitle: "Assistant error",
            aiErrorCopy: "The helper could not reach the recommendation endpoint. Check that the Flask app is running.",
            missing: "Missing",
            notProvided: "Not provided",
            inferredAfterApplication: "Inferred after application",
            sampleObject: "Sample / object",
            sourceEnergy: "Source / energy",
            outputType: "Output type",
            pixelSize: "Pixel size",
            performancePriority: "Performance priority",
            environment: "Environment",
            aiConfidence: "AI confidence",
            dialogEyebrow: "Exact energy",
            dialogTitle: "Enter the source energy",
            dialogCopy: "Use eV, keV, or MeV. If no unit is typed, the app assumes keV.",
            dialogEnergyLabel: "Energy value",
            dialogCancel: "Cancel",
            dialogSave: "Use energy",
        },
        outputTypes: {
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
        },
    },
    zh: {
        langAttr: "zh-CN",
        toggleLabel: "EN",
        steps: {
            application: { short: "应用", hint: "请选择" },
            energy: { short: "能量", hint: "请选择" },
            pixel_size: { short: "像素", hint: "请选择" },
            performance: { short: "优先级", hint: "请选择" },
            installation: { short: "环境", hint: "请选择" },
            review: { short: "结果", hint: "汇总" },
            contact: { short: "联系", hint: "你的信息" },
        },
        ui: {
            documentTitle: "X 射线探测器选型工具",
            heroTitle: "X 射线探测器选型工具",
            heroKicker: "X-ray Detector Selector",
            heroSubtitle: "回答几个问题，我们会帮助你找到最适合应用场景的探测器。",
            aiHelperOpen: "AI 助手",
            infoSummary: "这是什么工具？",
            infoTitle: "更快找到合适的 X 射线探测器。",
            infoCopy: "这个选型工具会根据应用场景、样品、射线源能量、分辨率需求、灵敏度、速度和安装环境，帮助用户选择合适的 X 射线探测器。用户不需要逐页阅读数据手册，只需回答几个引导问题，或向 AI 助手描述需求。系统会将需求与结构化探测器数据库进行比较，并给出最匹配的产品和清晰理由。",
            chooseClosest: "请选择最接近的一项。",
            choosePriorities: "最多选择 2 个优先级。",
            stepOf: "第 {current} 步，共 {total} 步",
            knownTarget: "已知靶材",
            exactEnergy: "精确能量",
            exactEnergyPlaceholder: "示例：8.04 keV",
            exactEnergyPrompt: "请输入精确能量，例如 8.04 keV",
            contactTitle: "工程师应该联系谁？",
            contactCopy: "在查看产品匹配结果之后留下联系方式。当前还没有真正发送功能。",
            contactName: "姓名",
            contactNamePlaceholder: "你的姓名",
            contactEmail: "邮箱",
            contactInfo: "联系方式或备注",
            contactInfoPlaceholder: "电话、公司、首选联系方式，或工程师需要了解的其他信息",
            contactNote: "这一步只会为工程师复核准备推荐信息，暂时还没有真正发送。",
            reviewTitle: "推荐结果确认",
            reviewCopy: "请先确认已选择的条件，并生成探测器匹配结果，然后再留下联系方式。",
            nextStep: "下一步",
            engineerCard: "先生成匹配结果，最后一步再添加联系方式。",
            showResults: "查看推荐探测器",
            resultsEyebrow: "推荐结果",
            resultsTitle: "最佳匹配",
            compareTop: "对比前三项",
            engineerAction: "联系工程师讨论其他实现方式",
            previous: "上一步",
            next: "下一步",
            finish: "完成",
            showResultsNext: "查看结果",
            nextContact: "下一步：联系信息",
            secureNote: "你的信息只会用于推荐最合适的方案。",
            loading: "正在查找匹配的探测器...",
            noContact: "未填写联系方式。你仍然可以在这里查看推荐结果。",
            contactPrepared: "已使用上一步填写的联系方式准备工程师复核信息。当前还没有真正发送。",
            needMoreInfo: "需要更多信息后才能显示产品匹配结果。",
            reviseConflict: "请先修改存在冲突的答案，再查看产品匹配结果。",
            infoEmptyConflict: "请先修改冲突的能量和像素尺寸答案，再查看产品匹配结果。",
            needMoreInfoMessage: "需要更多信息。请至少选择应用场景、能量范围或像素尺寸中的一项，再请求探测器匹配。",
            lowInfoWarning: "由于多个答案为“不确定”，本次推荐可能不够准确。请补充更多信息以获得更强的匹配结果。",
            possibleConflict: "可能存在冲突：高能/硬 X 射线与小于 1 微米像素尺寸的组合，可能需要定制光学、闪烁体耦合或工程师复核。",
            conflictCheck: "冲突检查",
            conflictFallbackTitle: "可以显示可能匹配项，但请复核答案",
            conflictFallbackMessage: "部分答案指向不同的探测器类型。",
            product: "产品",
            detector: "探测器",
            energy: "能量",
            pixel: "像素",
            activeArea: "有效面积",
            interface: "接口",
            software: "软件",
            unknownManufacturer: "未知厂商",
            match: "匹配",
            notAvailable: "N/A",
            contactHintWithContact: "联系方式：{contact}。",
            contactHintNoContact: "请在第 6 步添加邮箱或备注，方便工程师后续联系。",
            engineerAlternativePrepared: "已准备工程师复核信息，用于讨论其他实现测量目标的方式。因为部分答案指向不同探测器类型，建议工程师确认。当前还没有真正发送。",
            engineerProductsPrepared: "已为以下推荐产品准备工程师复核信息：{products}。当前还没有真正发送。",
            engineerGenericPrepared: "已准备工程师复核信息。请先生成推荐结果，或修改当前被阻止的答案。当前还没有真正发送。",
            aiPanelEyebrow: "AI 助手",
            aiPanelTitle: "描述你的探测器需求",
            aiPanelCopy: "AI 助手会提取需求、检查缺失信息，并使用同一套推荐算法。",
            aiStartTitle: "先简单描述你的测量需求。",
            aiStartCopy: "如果知道，请写出应用场景、射线源能量、像素尺寸或分辨率需求、性能优先级和使用环境。",
            aiInputLabel: "测量需求描述",
            aiInputPlaceholder: "示例：我需要一个用于 Cu-Kα 粉末 XRD 的探测器，希望高分辨率和能量分辨成像，会在普通实验室使用。",
            aiAnalyze: "分析需求",
            aiClear: "清空",
            aiExtractedEyebrow: "提取的需求",
            aiExtractedTitle: "AI 理解到的信息",
            aiFollowupsEyebrow: "缺失信息",
            aiFollowupsTitle: "只回答必要的问题",
            aiResultEyebrow: "AI 结果",
            aiResultTitle: "推荐预览",
            aiApply: "应用到选型流程",
            aiViewFull: "查看完整推荐",
            aiAskAgain: "重新提问",
            aiUserRequest: "你的需求",
            aiExtractedMessageTitle: "我提取出了下面这些技术选项。",
            aiExtractedMessageCopy: "如果有信息缺失，请回答简短的补充问题，我会刷新可能匹配项。",
            aiDescribeFirstTitle: "请先描述测量需求。",
            aiDescribeFirstCopy: "一句简短描述就可以，例如：普通实验室中使用 Cu-Kα 做粉末 XRD。",
            aiCheckingTitle: "正在检查可能匹配项",
            aiCheckingCopy: "正在使用与手动选型相同的严格推荐接口。",
            aiEngineerReview: "建议工程师复核",
            aiStrongMatch: "强匹配预览",
            aiStrongMatchCopy: "AI 助手已获得足够信息，可以显示受控匹配结果。你可以将这些选择应用到选型流程，查看完整结果页。",
            aiNeedsReviewCopy: "下面会显示可能匹配项，但信息还不足以作为自动最终推荐。请补充缺失信息，或让工程师复核该案例。",
            aiConflictPaused: "由于所选需求之间存在冲突，自动产品匹配已暂停。",
            aiNoMatch: "根据当前信息，没有找到可能匹配的产品。",
            aiPossibleDatabaseMatch: "数据库中的可能匹配项",
            aiErrorTitle: "AI 助手错误",
            aiErrorCopy: "AI 助手无法连接推荐接口。请检查 Flask 应用是否正在运行。",
            missing: "缺失",
            notProvided: "未提供",
            inferredAfterApplication: "选择应用后推断",
            sampleObject: "样品 / 对象",
            sourceEnergy: "射线源 / 能量",
            outputType: "输出类型",
            pixelSize: "像素尺寸",
            performancePriority: "性能优先级",
            environment: "使用环境",
            aiConfidence: "AI 置信度",
            dialogEyebrow: "精确能量",
            dialogTitle: "输入射线源能量",
            dialogCopy: "可使用 eV、keV 或 MeV。如果没有输入单位，系统会默认按 keV 处理。",
            dialogEnergyLabel: "能量数值",
            dialogCancel: "取消",
            dialogSave: "使用该能量",
        },
        outputTypes: {
            xrd_saxs_waxs: "衍射图样",
            xafs_absorption: "光谱 / 吸收曲线",
            euv_soft_xray_spectroscopy: "光谱",
            xray_euv_imaging: "二维图像",
            microscopy_metrology: "高分辨率图像",
            ct_3d: "CT 三维体数据",
            industrial_ndt: "二维 / CT / 检测图像",
            material_identification: "材料分辨图",
            radiation_particle: "粒子轨迹 / 辐射分布图",
            education_demo: "教学演示结果",
        },
    },
};

const CHOICE_TRANSLATIONS = {
    zh: {
        application: {
            xrd_saxs_waxs: { label: "XRD / SAXS / WAXS", description: "用于粉末、晶体、薄膜、聚合物、合金或结构材料样品的衍射图样。" },
            xafs_absorption: { label: "XAFS / 吸收光谱", description: "用于 XANES、EXAFS、吸收边扫描、透射或吸收测量。" },
            euv_soft_xray_spectroscopy: { label: "EUV / 软 X 射线光谱", description: "用于 EUV、VUV、软 X 射线、等离子体发射、HHG 或弱信号光谱。" },
            xray_euv_imaging: { label: "X 射线 / EUV 成像", description: "用于二维图像采集、XRF 成像、CDI、ptychography 或通用科学成像。" },
            microscopy_metrology: { label: "X 射线显微 / 计量", description: "用于微米或亚微米成像、小样品、高分辨率 CT 或尺寸检测。" },
            ct_3d: { label: "CT / 三维成像", description: "用于重建样品或部件的三维体数据。" },
            industrial_ndt: { label: "工业无损检测", description: "用于焊缝、管道、阀门、电池、电子器件、复合材料、铸件或工业部件。" },
            material_identification: { label: "材料识别", description: "用于能量分辨或彩色 X 射线成像，以区分不同材料。" },
            radiation_particle: { label: "辐射监测 / 粒子追踪", description: "用于 alpha、beta、gamma、中子、宇宙射线、源定位或粒子轨迹。" },
            education_demo: { label: "教学 / 演示", description: "用于课堂实验、简单辐射可视化或粒子物理教学。" },
            not_sure_application: { label: "不确定", description: "先保持应用筛选较宽，继续回答后续问题。" },
        },
        energy: {
            euv_vuv_soft: { label: "EUV / VUV / 软 X 射线", description: "低于约 1 keV、真空实验或软 X 射线实验。" },
            low_energy_lab: { label: "低能实验室 X 射线", description: "Cr-Kalpha、Cu-Kalpha、W-Lalpha 或类似 5-9 keV 射线源。" },
            standard_xrd: { label: "标准 XRD 射线源", description: "常见实验室 XRD 射线源，例如 Cu-Kalpha 或 Mo-Kalpha。" },
            higher_energy_lab: { label: "较高能实验室 X 射线", description: "Mo、Rh、Ag 或类似 17-22 keV 的较高能靶材。" },
            hard_xray: { label: "硬 X 射线 / 高穿透", description: "30-150 keV、厚样品、高密度金属或工业检测。" },
            gamma_neutron_particles: { label: "Gamma / 中子 / 粒子", description: "辐射监测、中子转换、gamma 成像或源定位。" },
            exact_energy: { label: "我知道精确能量", description: "在弹窗中输入 eV、keV 或 MeV 数值。" },
            not_sure_energy: { label: "不确定", description: "不通过射线源能量进行过度筛选。" },
        },
        target: {
            cr_ka: { label: "Cr-Kalpha", description: "5.4 keV" },
            cu_ka: { label: "Cu-Kalpha", description: "8.04 keV" },
            w_la: { label: "W-Lalpha", description: "8.4 keV" },
            mo_ka: { label: "Mo-Kalpha", description: "17.4 keV" },
            rh_ka: { label: "Rh-Kalpha", description: "20.2 keV" },
            ag_ka: { label: "Ag-Kalpha", description: "22.2 keV" },
        },
        pixel_size: {
            pixel_under_1: { label: "小于 1 微米", description: "用于亚微米细节、显微、计量或非常精细的空间分辨率。" },
            pixel_1_30: { label: "1 到 30 微米", description: "用于精细科学成像、CCD/sCMOS 相机和高分辨率探测器选择。" },
            pixel_30_100: { label: "30 到 100 微米", description: "用于光子计数探测器、较大像素传感器、信号收集或较高能量应用。" },
            not_sure_pixel: { label: "不确定", description: "不通过像素尺寸进行强筛选。" },
        },
        performance: {
            highest_resolution: { label: "最高分辨率", description: "亚微米或微米级细节、小结构、显微或计量。" },
            large_fov: { label: "大视场", description: "大样品、大有效面积、CT、工业部件或更快覆盖。" },
            fast_imaging: { label: "快速成像", description: "动态过程、实时视频、快速扫描或高通量测量。" },
            weak_signal_low_noise: { label: "弱信号 / 低噪声", description: "弱 X 射线/EUV 信号、长曝光、低通量、光谱或高灵敏度实验。" },
            energy_resolved: { label: "能量分辨成像", description: "光谱成像、材料区分或彩色 X 射线图像。" },
            high_dynamic_range: { label: "高动态范围", description: "同一图像中同时测量强弱信号，或避免饱和。" },
            single_event: { label: "单光子 / 粒子灵敏度", description: "单粒子轨迹、辐射监测、宇宙射线、alpha、beta、gamma 或中子探测。" },
            balanced: { label: "均衡性能", description: "通用科研探测器，没有特别极端的优先级。" },
            not_sure_performance: { label: "不确定", description: "由应用和射线源自动推断优先级。" },
        },
        installation: {
            simple_lab: { label: "大气环境", description: "允许空气存在。适用于普通房间或实验室中、非真空的使用场景。" },
            vacuum_uhv: { label: "真空 / UHV 腔体", description: "无空气。适用于真空腔体、UHV、EUV/VUV/软 X 射线或法兰安装相机。" },
            not_sure_installation: { label: "不确定", description: "同时展示适合大气环境和真空环境的可能产品。" },
        },
    },
};

const GROUP_TRANSLATIONS = {
    zh: {
        application: { title: "应用与结果", question: "你想测量什么？" },
        energy: { title: "射线源与能量", question: "你使用的 X 射线源或能量范围是什么？" },
        target: { title: "可选靶材", question: "已知实验室靶材" },
        pixel_size: { title: "像素尺寸", question: "你需要什么像素尺寸范围？" },
        performance: { title: "性能优先级", question: "你的测量最看重什么？" },
        installation: { title: "安装与使用环境", question: "探测器会在哪里、如何使用？" },
    },
};

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
let resultsGenerated = false;

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

function ensureLanguageToggle() {
    const existing = document.querySelector("#language-toggle");
    if (existing) return existing;

    const aiButton = document.querySelector("#ai-helper-open");
    if (!aiButton) return null;

    const button = document.createElement("button");
    button.className = "language-toggle";
    button.id = "language-toggle";
    button.type = "button";
    button.setAttribute("aria-label", "Switch language");
    button.innerHTML = `
        <span class="language-icon" aria-hidden="true">◎</span>
        <span id="language-toggle-label">EN</span>
    `;
    aiButton.insertAdjacentElement("beforebegin", button);
    return button;
}

const languageToggleElement = ensureLanguageToggle();

const els = {
    languageToggle: languageToggleElement,
    languageToggleLabel: languageToggleElement?.querySelector("#language-toggle-label"),
    heroTitle: document.querySelector("#hero-title") || document.querySelector(".hero-copy h1"),
    heroKicker: document.querySelector("#hero-kicker") || document.querySelector(".hero-cn"),
    heroSubtitle: document.querySelector("#hero-subtitle") || document.querySelector(".hero-copy .title-subtitle"),
    aiHelperOpenText: document.querySelector("#ai-helper-open-text") || document.querySelector("#ai-helper-open span:last-child"),
    selectorInfoSummary: document.querySelector("#selector-info-summary") || document.querySelector(".selector-info summary span:last-child"),
    selectorInfoTitle: document.querySelector("#selector-info-title") || document.querySelector(".selector-info-panel h2"),
    selectorInfoCopy: document.querySelector("#selector-info-copy") || document.querySelector(".selector-info-panel p"),
    contactNameLabel: document.querySelector("#contact-name-label"),
    contactEmailLabel: document.querySelector("#contact-email-label"),
    contactInfoLabel: document.querySelector("#contact-info-label"),
    contactNote: document.querySelector("#contact-note"),
    resultsEyebrow: document.querySelector("#results-eyebrow") || document.querySelector(".results-header .eyebrow"),
    resultsTitle: document.querySelector("#results-title") || document.querySelector(".results-header h2"),
    aiPanelEyebrow: document.querySelector("#ai-panel-eyebrow"),
    aiPanelTitle: document.querySelector("#ai-panel-title"),
    aiPanelCopy: document.querySelector("#ai-panel-copy"),
    aiInputLabel: document.querySelector("#ai-input-label"),
    aiExtractedEyebrow: document.querySelector("#ai-extracted-eyebrow"),
    aiExtractedTitle: document.querySelector("#ai-extracted-title"),
    aiFollowupsEyebrow: document.querySelector("#ai-followups-eyebrow"),
    aiFollowupsTitle: document.querySelector("#ai-followups-title"),
    aiResultEyebrow: document.querySelector("#ai-result-eyebrow"),
    dialogEyebrow: document.querySelector("#dialog-eyebrow"),
    dialogTitle: document.querySelector("#dialog-title"),
    dialogCopy: document.querySelector("#dialog-copy"),
    dialogEnergyLabel: document.querySelector("#dialog-energy-label"),
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
    conflictCheck: document.querySelector("#conflict-check"),
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
    energyValueLabel: document.querySelector("#energy-value-label"),
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

function languagePack() {
    return LANGUAGE_TEXT[currentLanguage] || LANGUAGE_TEXT.zh;
}

function ui(key, replacements = {}) {
    const text = languagePack().ui[key] ?? LANGUAGE_TEXT.en.ui[key] ?? key;
    return Object.entries(replacements).reduce(
        (value, [name, replacement]) => value.replaceAll(`{${name}}`, replacement),
        text,
    );
}

function stepText(stepId, key) {
    return languagePack().steps[stepId]?.[key] || LANGUAGE_TEXT.en.steps[stepId]?.[key] || "";
}

function translatedGroup(groupId) {
    const group = window.CHOICE_GROUPS[groupId] || {};
    return {
        ...group,
        title: GROUP_TRANSLATIONS[currentLanguage]?.[groupId]?.title || group.title,
        question: GROUP_TRANSLATIONS[currentLanguage]?.[groupId]?.question || group.question,
    };
}

function translatedChoice(groupId, choice) {
    const translation = CHOICE_TRANSLATIONS[currentLanguage]?.[groupId]?.[choice.id];
    return {
        ...choice,
        label: translation?.label || choice.label,
        description: translation?.description || choice.description,
    };
}

function translatedChoiceById(groupId, choiceId) {
    const choice = window.CHOICE_GROUPS[groupId]?.choices.find((item) => item.id === choiceId);
    return choice ? translatedChoice(groupId, choice) : null;
}

function setText(element, value) {
    if (element) element.textContent = value;
}

function setPlaceholder(element, value) {
    if (element) element.placeholder = value;
}

function renderStaticLanguageText() {
    document.documentElement.lang = languagePack().langAttr;
    document.title = ui("documentTitle");
    setText(els.languageToggleLabel, languagePack().toggleLabel);
    setText(els.heroTitle, ui("heroTitle"));
    setText(els.heroKicker, ui("heroKicker"));
    setText(els.heroSubtitle, ui("heroSubtitle"));
    setText(els.aiHelperOpenText, ui("aiHelperOpen"));
    setText(els.selectorInfoSummary, ui("infoSummary"));
    setText(els.selectorInfoTitle, ui("infoTitle"));
    setText(els.selectorInfoCopy, ui("infoCopy"));
    setText(els.contactNameLabel, ui("contactName"));
    setText(els.contactEmailLabel, ui("contactEmail"));
    setText(els.contactInfoLabel, ui("contactInfo"));
    setText(els.contactNote, ui("contactNote"));
    setPlaceholder(els.contactName, ui("contactNamePlaceholder"));
    setPlaceholder(els.contactInfo, ui("contactInfoPlaceholder"));
    setText(els.showResults, ui("showResults"));
    setText(els.resultsEyebrow, ui("resultsEyebrow"));
    setText(els.resultsTitle, ui("resultsTitle"));
    setText(els.compareTop, ui("compareTop"));
    setText(els.engineerContact, ui("engineerAction"));
    setText(els.energyValueLabel, ui("exactEnergy"));
    setPlaceholder(els.energyValue, ui("exactEnergyPlaceholder"));
    setText(els.aiPanelEyebrow, ui("aiPanelEyebrow"));
    setText(els.aiPanelTitle, ui("aiPanelTitle"));
    setText(els.aiPanelCopy, ui("aiPanelCopy"));
    setText(els.aiInputLabel, ui("aiInputLabel"));
    setPlaceholder(els.aiInput, ui("aiInputPlaceholder"));
    setText(els.aiSubmit, ui("aiAnalyze"));
    setText(els.aiReset, ui("aiClear"));
    setText(els.aiExtractedEyebrow, ui("aiExtractedEyebrow"));
    setText(els.aiExtractedTitle, ui("aiExtractedTitle"));
    setText(els.aiFollowupsEyebrow, ui("aiFollowupsEyebrow"));
    setText(els.aiFollowupsTitle, ui("aiFollowupsTitle"));
    setText(els.aiResultEyebrow, ui("aiResultEyebrow"));
    setText(els.aiApply, ui("aiApply"));
    setText(els.aiViewFull, ui("aiViewFull"));
    setText(els.aiAskAgain, ui("aiAskAgain"));
    setText(els.dialogEyebrow, ui("dialogEyebrow"));
    setText(els.dialogTitle, ui("dialogTitle"));
    setText(els.dialogCopy, ui("dialogCopy"));
    setText(els.dialogEnergyLabel, ui("dialogEnergyLabel"));
    setPlaceholder(els.dialogEnergyValue, ui("exactEnergyPlaceholder"));
    setText(els.energyCancel, ui("dialogCancel"));
    setText(els.energySave, ui("dialogSave"));
    if (els.languageToggle) {
        els.languageToggle.setAttribute(
            "aria-label",
            currentLanguage === "zh" ? "Switch to English" : "切换到中文",
        );
    }
}

function translateBackendText(value) {
    const text = String(value || "");
    if (currentLanguage !== "zh" || !text) return text;

    const exactMap = {
        "Detector type/application matches the request": "探测器类型/应用与需求匹配",
        "Application fit not evaluated": "未评估应用匹配度",
        "Energy not requested": "未指定能量要求",
        "Pixel size not requested": "未指定像素尺寸要求",
        "Not scored by current answers": "当前答案未对此项评分",
        "Installation not requested": "未指定安装环境",
        "Product appears vacuum/beamline-oriented, not a simple lab setup": "产品更偏向真空或束线场景，不适合简单大气实验室设置",
        "Vacuum/UHV fit is not documented": "未明确记录真空/UHV 适配信息",
        "Fits atmospheric use": "适合大气环境使用",
        "broad match": "宽泛匹配",
        "broad result because no strong filters were selected": "由于筛选条件较少，结果较宽泛",
        "Conflict check: selected answers need engineer review": "冲突检查：所选答案需要工程师复核",
    };
    if (exactMap[text]) return exactMap[text];

    const replacements = [
        [/^Fits requested energy: (.+)$/i, "符合所选能量：$1"],
        [/^Partial overlap with requested energy: (.+)$/i, "与所选能量部分重叠：$1"],
        [/^Energy range is far from requested (.+)$/i, "能量范围与所选要求差距较大：$1"],
        [/^Energy compatibility is not clearly documented for (.+)$/i, "未明确记录与该能量的兼容性：$1"],
        [/^Fits requested pixel range: (.+)$/i, "符合所选像素范围：$1"],
        [/^Close to requested pixel range: (.+)$/i, "接近所选像素范围：$1"],
        [/^Pixel size is far from requested (.+)$/i, "像素尺寸与所选要求差距较大：$1"],
        [/^Pixel size is not clearly documented for requested (.+)$/i, "未明确记录所选像素范围：$1"],
        [/^Energy fit: (.+)$/i, "能量匹配：$1"],
        [/^Partial energy fit: (.+)$/i, "能量部分匹配：$1"],
        [/^Pixel fit: (.+)$/i, "像素匹配：$1"],
        [/^Pixel is close but not exact: (.+)$/i, "像素接近但不完全匹配：$1"],
        [/^Application & Result: (.+)$/i, "应用与结果：$1"],
        [/^Source Energy & Sample: (.+)$/i, "射线源与能量：$1"],
        [/^Performance: (.+)$/i, "性能优先级：$1"],
        [/^Installation fit: (.+)$/i, "安装环境匹配：$1"],
        [/^Environment fit: (.+)$/i, "使用环境匹配：$1"],
        [/^Interface support: (.+)$/i, "接口支持：$1"],
        [/^Conflict: (.+)$/i, "冲突：$1"],
    ];

    const phraseMap = {
        "Application & Result": "应用与结果",
        "Source Energy & Sample": "射线源与能量",
        "Performance": "性能优先级",
        "Installation": "安装环境",
        "Detector": "探测器",
        "Energy": "能量",
        "Pixel": "像素",
        "Active area": "有效面积",
        "Interface": "接口",
        "Software": "软件",
        "Low-energy lab X-ray": "低能实验室 X 射线",
        "Standard XRD source": "标准 XRD 射线源",
        "Higher-energy lab X-ray": "较高能实验室 X 射线",
        "Hard X-ray / High penetration": "硬 X 射线 / 高穿透",
        "EUV / VUV / Soft X-ray": "EUV / VUV / 软 X 射线",
        "Gamma / Neutron / Particles": "Gamma / 中子 / 粒子",
        "Under 1 micrometer": "小于 1 微米",
        "1 to 30 micrometers": "1 到 30 微米",
        "30 to 100 micrometers": "30 到 100 微米",
        "Highest resolution": "最高分辨率",
        "Large field of view": "大视场",
        "Fast imaging": "快速成像",
        "Weak signal / low noise": "弱信号 / 低噪声",
        "Energy-resolved imaging": "能量分辨成像",
        "High dynamic range": "高动态范围",
        "Single photon / particle sensitivity": "单光子 / 粒子灵敏度",
        "Balanced performance": "均衡性能",
        "Atmospheric environment": "大气环境",
        "Vacuum / UHV chamber": "真空 / UHV 腔体",
        "Not sure": "不确定",
        "not clearly documented": "未明确记录",
        "fits": "符合",
        "requested": "所选",
        "product has": "产品为",
    };

    let translated = replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), text);
    Object.entries(phraseMap).forEach(([english, chinese]) => {
        translated = translated.replaceAll(english, chinese);
    });
    return translated;
}

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
        .map((id) => translatedChoiceById(groupId, id)?.label)
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
        return currentStep === index ? stepText(step.id, "hint") : stepText(step.id, "hint");
    }

    const labels = selectedLabels(step.id);
    return labels[0] || stepText(step.id, "hint");
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
                        <strong>${stepText(step.id, "short")}</strong>
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
    resultsGenerated = false;

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
    const displayChoice = translatedChoice(groupId, choice);
    return `
        <button class="choice-card ${isSelected(groupId, choice.id) ? "selected" : ""}" data-group="${groupId}" data-choice="${choice.id}">
            <span class="choice-icon">${iconForChoice(groupId, choice.id)}</span>
            <span class="choice-copy">
                <strong>${displayChoice.label}</strong>
                <small>${displayChoice.description}</small>
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
        const value = window.prompt(ui("exactEnergyPrompt"), answers.exact_energy || "");
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
            <p class="subsection-title">${ui("knownTarget")}</p>
            <div class="mini-card-grid">
                ${group.choices.map((choice) => choiceCard("target", choice)).join("")}
            </div>
        </div>
    `;
}

function renderQuestionStep() {
    const step = steps[currentStep];
    const group = translatedGroup(step.id);

    els.stepLabel.textContent = ui("stepOf", { current: currentStep + 1, total: steps.length });
    els.questionTitle.textContent = group.question;
    els.questionCopy.textContent = step.id === "performance" ? ui("choosePriorities") : ui("chooseClosest");
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
    els.stepLabel.textContent = ui("stepOf", { current: currentStep + 1, total: steps.length });
    els.questionTitle.textContent = ui("contactTitle");
    els.questionCopy.textContent = ui("contactCopy");
    els.cardsGrid.style.display = "none";
    els.exactEnergy.classList.remove("visible");
    els.reviewPanel.classList.remove("visible");
    els.resultsPanel.classList.remove("visible");
    els.contactPanel.classList.add("visible");
    document.querySelector(".subsection")?.remove();
}

function renderReview() {
    els.stepLabel.textContent = ui("stepOf", { current: currentStep + 1, total: steps.length });
    els.questionTitle.textContent = ui("reviewTitle");
    els.questionCopy.textContent = ui("reviewCopy");
    els.cardsGrid.style.display = "none";
    els.exactEnergy.classList.remove("visible");
    els.contactPanel.classList.remove("visible");
    els.reviewPanel.classList.add("visible");
    els.resultsPanel.classList.remove("visible");

    const reviewGroups = ["application", "energy", "target", "pixel_size", "performance", "installation"];
    const choiceCards = reviewGroups
        .map((groupId) => {
            const labels = selectedLabels(groupId);
            if (!labels.length) return "";
            const title = groupId === "contact" ? ui("contactTitle") : translatedGroup(groupId).title;
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
            <span>${ui("nextStep")}</span>
            <strong>${ui("engineerCard")}</strong>
        </article>
    `;

    els.reviewGrid.innerHTML = choiceCards + engineerCard;
}

function specStatusClass(item, key) {
    const status = item.spec_quality?.[key]?.status || "unknown";
    return `status-${status}`;
}

function specStatusNote(item, key) {
    return item.spec_quality?.[key]?.note || "";
}

function specBlock(item, key, label, value) {
    const note = specStatusNote(item, key);
    return `
        <div class="${specStatusClass(item, key)}">
            <dt>${label}</dt>
            <dd>${value || ui("notAvailable")}</dd>
            ${note ? `<small>${escapeHtml(translateBackendText(note))}</small>` : ""}
        </div>
    `;
}

function renderResultCard(item, index) {
    return `
        <article class="result-card">
            <div class="rank">${index + 1}</div>
            <div class="result-body">
                <div class="result-title-row">
                    <div>
                        <h3>${item.model_name_variant || item.product_id}</h3>
                        <p>${item.manufacturer || ui("unknownManufacturer")} · ${item.product_family || ui("notAvailable")}</p>
                    </div>
                    <span class="score">${item.match_percent || 0}% ${ui("match")}</span>
                </div>
                <dl class="spec-grid">
                    ${specBlock(item, "detector", ui("detector"), item.detector_principle)}
                    ${specBlock(item, "energy", ui("energy"), item.energy_range)}
                    ${specBlock(item, "pixel", ui("pixel"), item.pixel_size)}
                    ${specBlock(item, "active_area", ui("activeArea"), item.active_area)}
                    ${specBlock(item, "interface", ui("interface"), item.interface)}
                    ${specBlock(item, "software", ui("software"), item.software)}
                </dl>
                <p class="applications">${item.applications || ""}</p>
                <div class="reason-list">
                    ${item.reasons.map((reason) => `<span>${escapeHtml(translateBackendText(reason))}</span>`).join("")}
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
            level: "warn",
            message: ui("possibleConflict"),
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
            message: ui("needMoreInfoMessage"),
        };
    }

    if (unknownCount >= 3) {
        return {
            level: "warn",
            message: ui("lowInfoWarning"),
        };
    }

    return { level: "ok", message: "" };
}

function showConfidenceMessage(status) {
    els.confidenceWarning.textContent = translateBackendText(status.message);
    els.confidenceWarning.classList.toggle("visible", status.level !== "ok");
    els.confidenceWarning.classList.toggle("blocking", status.level === "block");
}

function renderConflictCheck(conflict) {
    if (!els.conflictCheck) return;

    const details = conflict?.details || [];
    if (!details.length) {
        els.conflictCheck.classList.remove("visible");
        els.conflictCheck.innerHTML = "";
        return;
    }

    els.conflictCheck.classList.add("visible");
    els.conflictCheck.innerHTML = `
        <div class="conflict-check-heading">
            <p class="eyebrow">${ui("conflictCheck")}</p>
            <h3>${escapeHtml(translateBackendText(conflict.title || ui("conflictFallbackTitle")))}</h3>
            <p>${escapeHtml(translateBackendText(conflict.message || ui("conflictFallbackMessage")))}</p>
        </div>
        <div class="conflict-list">
            ${details
                .map((detail) => `
                    <article class="conflict-item">
                        <strong>${escapeHtml(translateBackendText(detail.title))}</strong>
                        <span>${escapeHtml(translateBackendText(detail.selected))}</span>
                        <p>${escapeHtml(translateBackendText(detail.issue))}</p>
                        <small>${escapeHtml(translateBackendText(detail.suggestion))}</small>
                    </article>
                `)
                .join("")}
        </div>
    `;
}

function markResultsGenerated() {
    resultsGenerated = true;
    els.nextButton.innerHTML = `${ui("nextContact")} <span aria-hidden='true'>→</span>`;
    els.nextButton.disabled = false;
    renderStepOverview();
    renderFlowPosition();
}

async function loadRecommendations() {
    answers.exact_energy = els.energyValue.value.trim();
    els.resultsList.innerHTML = `<p class='loading'>${ui("loading")}</p>`;
    els.compareGrid.innerHTML = "";
    els.engineerActionStatus.textContent = "";
    renderConflictCheck(null);
    latestConflict = null;
    const conflict = selectionConflictStatus();
    const contactLine = answers.contact_email || answers.contact_name || answers.contact_info;
    els.engineerNote.textContent = contactLine
        ? ui("contactPrepared")
        : ui("noContact");
    els.resultsPanel.classList.add("visible");

    if (conflict.level === "block") {
        showConfidenceMessage(conflict);
        latestConflict = conflict;
        latestRecommendations = [];
        renderConflictCheck(null);
        els.resultsList.innerHTML = `<article class='info-empty'>${ui("infoEmptyConflict")}</article>`;
        markResultsGenerated();
        return;
    }

    const uncertainty = uncertaintyStatus();
    showConfidenceMessage(uncertainty);

    if (uncertainty.level === "block") {
        latestRecommendations = [];
        renderConflictCheck(null);
        els.resultsList.innerHTML = `<article class='info-empty'>${ui("needMoreInfo")}</article>`;
        markResultsGenerated();
        return;
    }

    const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
    });

    const data = await response.json();
    if (data.conflict?.has_conflict) {
        showConfidenceMessage({
            level: data.conflict.blocking ? "block" : "warn",
            message: translateBackendText(data.conflict.message),
        });
        latestConflict = data.conflict;
        renderConflictCheck(data.conflict);
        if (data.conflict.blocking) {
            latestRecommendations = [];
            els.resultsList.innerHTML = `<article class='info-empty'>${ui("reviseConflict")}</article>`;
            markResultsGenerated();
            return;
        }
    } else {
        renderConflictCheck(null);
    }
    latestRecommendations = data.recommendations || [];
    els.resultsList.innerHTML = latestRecommendations.map(renderResultCard).join("");
    markResultsGenerated();
}

function prepareEngineerRequest() {
    const contactLine = answers.contact_email || answers.contact_name || answers.contact_info;
    const contactHint = contactLine
        ? ui("contactHintWithContact", { contact: contactLine })
        : ui("contactHintNoContact");

    if (latestConflict) {
        els.engineerActionStatus.textContent = `${contactHint} ${ui("engineerAlternativePrepared")}`;
        return;
    }

    if (latestRecommendations.length) {
        const products = latestRecommendations
            .map((item) => item.model_name_variant || item.product_id)
            .slice(0, 3)
            .join(", ");
        els.engineerActionStatus.textContent = `${contactHint} ${ui("engineerProductsPrepared", { products })}`;
        return;
    }

    els.engineerActionStatus.textContent = `${contactHint} ${ui("engineerGenericPrepared")}`;
}

function renderComparison() {
    const top = latestRecommendations.slice(0, 3);
    if (!top.length) return;

    els.compareGrid.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>${ui("product")}</th>
                    <th>${ui("energy")}</th>
                    <th>${ui("pixel")}</th>
                    <th>${ui("activeArea")}</th>
                    <th>${ui("interface")}</th>
                </tr>
            </thead>
            <tbody>
                ${top
                    .map((item) => `
                        <tr>
                            <td>${item.model_name_variant || item.product_id}</td>
                            <td>${item.energy_range || ui("notAvailable")}</td>
                            <td>${item.pixel_size || ui("notAvailable")}</td>
                            <td>${item.active_area || ui("notAvailable")}</td>
                            <td>${item.interface || ui("notAvailable")}</td>
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
    return translatedChoiceById(groupId, choiceId)?.label || "";
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
    return languagePack().outputTypes[applicationId] || LANGUAGE_TEXT.en.outputTypes[applicationId] || "";
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
            <strong>${ui("aiUserRequest")}</strong>
            <span>${escapeHtml(userText)}</span>
        </article>
        <article class="ai-message assistant">
            <strong>${ui("aiExtractedMessageTitle")}</strong>
            <span>${ui("aiExtractedMessageCopy")}</span>
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
        [translatedGroup("application").title, applicationLabel || ui("missing")],
        [ui("sampleObject"), extracted.sample || ui("notProvided")],
        [ui("sourceEnergy"), [targetLabel, energyLabel, extracted.exact_energy].filter(Boolean).join(" · ") || ui("missing")],
        [ui("outputType"), extracted.output_type || ui("inferredAfterApplication")],
        [ui("pixelSize"), pixelLabel || ui("missing")],
        [ui("performancePriority"), performanceLabels.join(", ") || ui("missing")],
        [ui("environment"), installationLabel || ui("missing")],
        [ui("aiConfidence"), `${aiState.confidence}%`],
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
    return translatedGroup(groupId)?.question || ui("chooseClosest");
}

function renderAiFollowups() {
    if (!aiState.missing.length) {
        els.aiFollowupsCard.hidden = true;
        els.aiFollowupList.innerHTML = "";
        return;
    }

    els.aiFollowupList.innerHTML = aiState.missing
        .map((groupId) => {
            const choices = window.CHOICE_GROUPS[groupId].choices.map((choice) => translatedChoice(groupId, choice));
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
                const value = window.prompt(ui("exactEnergyPrompt"), aiState.extracted.exact_energy || "");
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
        return `<article class='ai-empty'>${ui("aiNoMatch")}</article>`;
    }

    return items.slice(0, 3).map((item) => `
        <article class="ai-mini-result">
            <div>
                <strong>${escapeHtml(item.model_name_variant || item.product_id)}</strong>
                <span>${escapeHtml(item.manufacturer || ui("unknownManufacturer"))}</span>
            </div>
            <b>${Number(item.match_percent || 0)}%</b>
            <p>${escapeHtml((item.reasons || []).slice(0, 2).map(translateBackendText).join(" · ") || ui("aiPossibleDatabaseMatch"))}</p>
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
    els.aiResultTitle.textContent = ui("aiCheckingTitle");
    els.aiResultNote.textContent = ui("aiCheckingCopy");
    els.aiResultList.innerHTML = `<p class='loading'>${ui("loading")}</p>`;

    const conflict = selectionConflictStatus(aiAnswers);
    if (conflict.level === "block") {
        aiState.recommendations = [];
        aiState.confidence = calculateAiConfidence(aiState.extracted, []);
        renderAiExtractedInfo();
        els.aiResultTitle.textContent = ui("aiEngineerReview");
        els.aiResultNote.textContent = translateBackendText(conflict.message);
        els.aiResultList.innerHTML = `<article class='ai-empty'>${ui("aiConflictPaused")}</article>`;
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
            els.aiResultTitle.textContent = ui("aiEngineerReview");
            els.aiResultNote.textContent = ui("aiNeedsReviewCopy");
        } else {
            els.aiResultTitle.textContent = ui("aiStrongMatch");
            els.aiResultNote.textContent = ui("aiStrongMatchCopy");
        }

        els.aiResultList.innerHTML = renderAiRecommendationList(aiState.recommendations);
    } catch (error) {
        els.aiResultTitle.textContent = ui("aiErrorTitle");
        els.aiResultNote.textContent = ui("aiErrorCopy");
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
            <strong>${ui("aiStartTitle")}</strong>
            <span>${ui("aiStartCopy")}</span>
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
    resultsGenerated = false;
    currentStep = steps.findIndex((step) => step.id === "review");
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
                <strong>${ui("aiDescribeFirstTitle")}</strong>
                <span>${ui("aiDescribeFirstCopy")}</span>
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
        .map((step, index) => `<span class="${index === currentStep ? "active" : ""} ${index < currentStep ? "done" : ""}" aria-label="${stepText(step.id, "short")}"></span>`)
        .join("");

    els.flowPosition.innerHTML = `
        <div class="flow-dots" aria-hidden="true">${dots}</div>
        <p>${ui("secureNote")}</p>
    `;
}

function nextStepButtonLabel(step) {
    const nextLabel = stepText(step.id, "short");
    return currentLanguage === "zh" ? `${ui("next")}：${nextLabel}` : `${ui("next")}: ${nextLabel}`;
}

function render() {
    renderStaticLanguageText();
    const currentId = steps[currentStep].id;
    els.stepCount.textContent = currentStep + 1;
    els.stepTotal.textContent = steps.length;
    els.progressFill.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
    els.backButton.disabled = currentStep === 0;
    els.backButton.innerHTML = `<span aria-hidden='true'>←</span> ${ui("previous")}`;
    if (currentId === "review") {
        els.nextButton.innerHTML = resultsGenerated
            ? `${ui("nextContact")} <span aria-hidden='true'>→</span>`
            : `${ui("showResultsNext")} <span aria-hidden='true'>→</span>`;
    } else if (currentId === "contact") {
        els.nextButton.innerHTML = `${ui("finish")} <span aria-hidden='true'>→</span>`;
    } else {
        els.nextButton.innerHTML = `${nextStepButtonLabel(steps[currentStep + 1])} <span aria-hidden='true'>→</span>`;
    }
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

function toggleLanguage() {
    currentLanguage = currentLanguage === "zh" ? "en" : "zh";
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    resetAiHelper(true);
    render();
}

els.backButton.addEventListener("click", () => {
    currentStep = Math.max(0, currentStep - 1);
    render();
});

els.nextButton.addEventListener("click", () => {
    if (steps[currentStep].id === "review") {
        if (resultsGenerated) {
            currentStep = Math.min(steps.length - 1, currentStep + 1);
            render();
        } else {
            loadRecommendations();
        }
        return;
    }
    if (steps[currentStep].id === "contact") {
        prepareEngineerRequest();
        return;
    }
    currentStep = Math.min(steps.length - 1, currentStep + 1);
    render();
});

els.languageToggle?.addEventListener("click", toggleLanguage);
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

resetAiHelper(true);
render();
