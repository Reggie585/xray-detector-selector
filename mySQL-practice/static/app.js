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
            exactEnergy: "Custom target or exact energy",
            exactEnergyPlaceholder: "Example: Fe, Co-Kalpha, or 12 keV",
            exactEnergyPrompt: "Enter the non-standard target or exact energy, for example Fe, Co-Kalpha, or 12 keV",
            exactPhotonEnergy: "I know the exact photon energy",
            exactPhotonEnergyDescription: "Enter a value in eV or keV.",
            exactPhotonEnergyPlaceholder: "Example: 92 eV or 0.5 keV",
            exactPhotonEnergyPrompt: "Enter the photon energy, for example 92 eV or 0.5 keV",
            contactTitle: "Who should the engineer contact?",
            contactCopy: "Leave contact details after reviewing the product matches. Sending is not connected yet.",
            contactName: "Name",
            contactNamePlaceholder: "Your name",
            contactEmail: "Email",
            contactInfo: "Contact info or notes",
            contactInfoPlaceholder: "Phone, company, preferred contact method, or anything the engineer should know",
            contactNote: "This demo only prepares the recommendation for engineer review. A production version should save messages in an admin backend or email them to a configured inbox.",
            contactValidationRequired: "Please add an email address or phone/contact note before finishing.",
            contactValidationEmail: "Please enter a valid email address, or leave email blank and use the notes field for phone/contact details.",
            engineerSaving: "Saving the engineer-review request...",
            engineerSaved: "Saved to the backend review log. Email sending is not connected yet. Backend view: /admin/submissions",
            engineerSaveFailed: "Could not save the request. Please keep the recommendation on this page and try again later.",
            reviewTitle: "Recommendation Review",
            reviewCopy: "Review the selected conditions and generate detector matches before leaving contact information.",
            reviewReadOnlyTitle: "Selected-condition summary",
            reviewReadOnlyCopy: "These cards are read-only. Use the left flow or Back button to edit earlier answers.",
            reviewReadOnlyBadge: "Read only",
            reviewEditHint: "To change anything, use the left flow or Back button. This page only confirms what will be scored.",
            reviewEmptyValue: "Not selected",
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
            flowTitle: "Research flow",
            summaryTitle: "Live requirements summary",
            summaryNotSet: "Not set",
            summaryApplication: "Application",
            summaryEnergy: "Source",
            summaryPixel: "Pixel",
            summaryInstallation: "Environment",
            loading: "Finding detector matches...",
            noContact: "No contact details were added. The recommendation can still be reviewed here.",
            contactPrepared: "Engineer review prepared with the contact details from the previous step. Sending is not connected yet.",
            needMoreInfo: "Need more information before showing product matches.",
            reviseConflict: "The current answers contain a conflict, so product matches are paused. Please review the conflict above or ask an engineer to confirm.",
            infoEmptyConflict: "Please revise the conflicting energy and pixel-size answers before showing product matches.",
            needMoreInfoMessage: "Need more information. Please choose at least an application, energy range, or pixel size before requesting detector matches.",
            lowInfoWarning: "This recommendation might not be accurate because several answers are unknown. Please add more information for a stronger match.",
            possibleConflict: "Possible conflict: high/hard X-ray energy and under 1 micrometer pixel size may require custom optics, scintillator coupling, or engineer review.",
            conflictCheck: "Conflict check",
            conflictFallbackTitle: "Selected answers contain a technical conflict",
            conflictFallbackMessage: "Automatic product matching is paused. Please review the conflict before viewing detector recommendations.",
            product: "Product",
            detector: "Detector",
            energy: "Energy",
            pixel: "Pixel",
            activeArea: "Active area",
            software: "Software",
            unknownManufacturer: "Unknown manufacturer",
            match: "match",
            notAvailable: "N/A",
            productLink: "View product page",
            productLinkPending: "Product link pending",
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
            aiNeedsConfirmation: "Needs confirmation",
            aiStrongMatch: "Strong match preview",
            aiStrongMatchCopy: "The assistant found enough information to show controlled matches. You can apply these choices to the selector for the full result page.",
            aiNeedsReviewCopy: "Possible matches are shown below, but the information is not strong enough for an automatic final recommendation. Add the missing details or ask an engineer to review the case.",
            aiConflictClarifyCopy: "Some extracted requirements point in different directions. The AI Helper will not show product matches until those details are confirmed.",
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
            photonDialogTitle: "Enter the photon energy",
            photonDialogCopy: "Use eV or keV for EUV / soft X-ray sources. If no unit is typed, the app assumes keV.",
            photonDialogEnergyLabel: "Photon energy",
            dialogCancel: "Cancel",
            dialogSave: "Use energy",
        },
        outputTypes: {
            xrd_saxs_waxs: "Diffraction / scattering pattern",
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
            heroKicker: "智能探测器推荐流程",
            heroSubtitle: "回答几个问题，我们会帮助你找到最适合应用场景的探测器。",
            aiHelperOpen: "AI 助手",
            infoSummary: "这是什么工具？",
            infoTitle: "更快找到合适的 X 射线探测器。",
            infoCopy: "这个选型工具会根据应用场景、样品、射线源能量、分辨率需求、灵敏度、速度和安装环境，帮助用户选择合适的 X 射线探测器。用户不需要逐页阅读数据手册，只需回答几个引导问题，或向 AI 助手描述需求。系统会将需求与结构化探测器数据库进行比较，并给出最匹配的产品和清晰理由。",
            chooseClosest: "请选择最接近的一项。",
            choosePriorities: "最多选择 2 个优先级。",
            stepOf: "第 {current} 步，共 {total} 步",
            knownTarget: "已知靶材",
            exactEnergy: "非标靶材 / 精确能量",
            exactEnergyPlaceholder: "示例：Fe、Co-Kα 或 12 keV",
            exactEnergyPrompt: "请输入非标靶材或精确能量，例如 Fe、Co-Kα 或 12 keV",
            exactPhotonEnergy: "我知道精确光子能量",
            exactPhotonEnergyDescription: "输入 eV 或 keV 数值。",
            exactPhotonEnergyPlaceholder: "示例：92 eV 或 0.5 keV",
            exactPhotonEnergyPrompt: "请输入光子能量，例如 92 eV 或 0.5 keV",
            contactTitle: "工程师应该联系谁？",
            contactCopy: "在查看产品匹配结果之后留下联系方式。当前还没有真正发送功能。",
            contactName: "姓名",
            contactNamePlaceholder: "你的姓名",
            contactEmail: "邮箱",
            contactInfo: "联系方式或备注",
            contactInfoPlaceholder: "电话、公司、首选联系方式，或工程师需要了解的其他信息",
            contactNote: "当前演示版只会准备工程师复核信息，不会真正发送。正式版建议接入后台留言管理，或发送邮件到指定邮箱。",
            contactValidationRequired: "请至少填写邮箱，或在备注中填写电话 / 公司 / 联系方式。",
            contactValidationEmail: "邮箱格式不正确。请填写有效邮箱，或留空邮箱并在备注中填写电话 / 联系方式。",
            engineerSaving: "正在保存工程师复核请求...",
            engineerSaved: "已保存到后台留言记录。邮件发送功能尚未接入。后台查看地址：/admin/submissions",
            engineerSaveFailed: "保存请求失败。请先保留当前推荐页面，稍后再试。",
            reviewTitle: "推荐结果确认",
            reviewCopy: "请先确认已选择的条件，并生成探测器匹配结果，然后再留下联系方式。",
            reviewReadOnlyTitle: "已选条件概览",
            reviewReadOnlyCopy: "这些卡片只是只读摘要，不是可点击选项；如需修改，请使用左侧流程或返回上一步。",
            reviewReadOnlyBadge: "只读",
            reviewEditHint: "如需修改，请点击左侧流程或返回上一步。本页只用于确认即将参与评分的条件。",
            reviewEmptyValue: "未选择",
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
            flowTitle: "选型流程",
            summaryTitle: "实时需求摘要",
            summaryNotSet: "未设置",
            summaryApplication: "应用",
            summaryEnergy: "射线源",
            summaryPixel: "像素",
            summaryInstallation: "环境",
            loading: "正在查找匹配的探测器...",
            noContact: "未填写联系方式。你仍然可以在这里查看推荐结果。",
            contactPrepared: "已使用上一步填写的联系方式准备工程师复核信息。当前还没有真正发送。",
            needMoreInfo: "需要更多信息后才能显示产品匹配结果。",
            reviseConflict: "当前答案存在冲突，暂不显示产品匹配。请先根据上方说明修改答案，或联系工程师确认。",
            infoEmptyConflict: "请先修改冲突的能量和像素尺寸答案，再查看产品匹配结果。",
            needMoreInfoMessage: "需要更多信息。请至少选择应用场景、能量范围或像素尺寸中的一项，再请求探测器匹配。",
            lowInfoWarning: "由于多个答案为“不确定”，本次推荐可能不够准确。请补充更多信息以获得更强的匹配结果。",
            possibleConflict: "可能存在冲突：高能/硬 X 射线与小于 1 微米像素尺寸的组合，可能需要定制光学、闪烁体耦合或工程师复核。",
            conflictCheck: "冲突检查",
            conflictFallbackTitle: "所选答案存在技术冲突",
            conflictFallbackMessage: "自动产品匹配已暂停。请先查看下面的冲突原因，再调整答案或联系工程师确认。",
            product: "产品",
            detector: "探测器",
            energy: "能量",
            pixel: "像素",
            activeArea: "有效面积",
            software: "软件",
            unknownManufacturer: "未知厂商",
            match: "匹配",
            notAvailable: "未提供",
            productLink: "查看产品资料",
            productLinkPending: "产品链接待补充",
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
            aiNeedsConfirmation: "需要确认信息",
            aiStrongMatch: "强匹配预览",
            aiStrongMatchCopy: "AI 助手已获得足够信息，可以显示受控匹配结果。你可以将这些选择应用到选型流程，查看完整结果页。",
            aiNeedsReviewCopy: "下面会显示可能匹配项，但信息还不足以作为自动最终推荐。请补充缺失信息，或让工程师复核该案例。",
            aiConflictClarifyCopy: "AI 提取到的需求之间有不一致之处。确认这些信息前，AI 助手不会显示产品匹配结果。",
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
            photonDialogTitle: "输入光子能量",
            photonDialogCopy: "EUV / 软 X 射线源请使用 eV 或 keV。如果没有输入单位，系统会默认按 keV 处理。",
            photonDialogEnergyLabel: "光子能量",
            dialogCancel: "取消",
            dialogSave: "使用该能量",
        },
        outputTypes: {
            xrd_saxs_waxs: "衍射、散射图样",
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
            xrd_saxs_waxs: { label: "XRD / SAXS / WAXS", description: "用于粉末、晶体、薄膜、聚合物、合金或结构材料样品的衍射、散射图样。" },
            xafs_absorption: { label: "XAFS / 吸收光谱", description: "用于 XANES、EXAFS、吸收边扫描、透射或吸收测量。" },
            euv_soft_xray_spectroscopy: { label: "EUV / 软 X 射线光谱", description: "用于 EUV、VUV、软 X 射线、等离子体发射、HHG 或弱信号光谱。" },
            xray_euv_imaging: { label: "X 射线 / EUV 成像", description: "用于二维图像采集、XRF 成像、CDI、ptychography 或通用科学成像。" },
            microscopy_metrology: { label: "X 射线显微 / 计量", description: "用于微米或亚微米成像、小样品、高分辨率 CT 或尺寸检测。" },
            ct_3d: { label: "CT / 三维成像", description: "用于重建样品或部件的三维体数据。" },
            industrial_ndt: { label: "工业无损检测", description: "用于焊缝、管道、阀门、电池、电子器件、复合材料、铸件或工业部件。" },
            material_identification: { label: "材料识别", description: "用于能量分辨或彩色 X 射线成像，以区分不同材料。" },
            radiation_particle: { label: "辐射监测 / 粒子追踪", description: "用于 α、β、伽马、中子、宇宙射线、源定位或粒子轨迹。" },
            education_demo: { label: "教学 / 演示", description: "用于课堂实验、简单辐射可视化或粒子物理教学。" },
            not_sure_application: { label: "不确定", description: "先保持应用筛选较宽，继续回答后续问题。" },
        },
        energy: {
            synchrotron_beamline: { label: "同步辐射 / 束线", description: "可调谐 EUV 或软 X 射线源，适用于光谱、吸收、RIXS、XANES、EXAFS 或束线实验。" },
            hhg_source: { label: "HHG / 高次谐波源", description: "激光驱动的 EUV / 软 X 射线源，适用于超快光谱或高次谐波实验。" },
            laser_plasma_source: { label: "激光等离子体源", description: "等离子体产生的 EUV / 软 X 射线源，适用于成像、光谱或 EUV 光学测试。" },
            discharge_plasma_source: { label: "放电等离子体源", description: "常用于 EUV 光刻相关实验和光源开发的 EUV 光源。" },
            low_energy_soft_xray_tube: { label: "低能软 X 射线管", description: "实验室软 X 射线源，通常不同于普通 Cu/Mo XRD 管。" },
            microfocus_xray_source: { label: "微焦点 X 射线源", description: "用于显微、计量、CT 或需要较小焦点尺寸的成像系统。" },
            standard_lab_xray_source: { label: "标准实验室 X 射线源", description: "常规实验室 X 射线源，用于标准成像、CT、XRF 或谱学配置。" },
            high_energy_industrial_xray: { label: "高能工业 X 射线源", description: "用于厚样品、高穿透或工业检测的较高能量 X 射线源。" },
            photon_counting_energy_resolved_setup: { label: "光子计数 / 能量分辨配置", description: "用于材料识别、能量分辨成像或光谱式 X 射线成像。" },
            alpha_beta_particles: { label: "Alpha / beta 粒子", description: "用于 α、β 粒子探测或粒子轨迹可视化。" },
            gamma_source: { label: "Gamma 源", description: "用于伽马成像、辐射监测或源定位。" },
            neutron_source: { label: "中子源", description: "用于中子探测、转换层或中子成像相关实验。" },
            cosmic_mixed_radiation: { label: "宇宙射线 / 混合辐射场", description: "用于宇宙射线、混合辐射场或开放式辐射监测。" },
            ion_particle_beam: { label: "离子束 / 粒子束", description: "用于离子束、粒子束或束流诊断实验。" },
            education_alpha_beta_gamma: { label: "Alpha / beta / gamma 可视化", description: "用于课堂中的基础辐射可视化实验。" },
            cosmic_ray_observation: { label: "宇宙射线观测", description: "用于教学或演示中的宇宙射线观察。" },
            radioactive_sample_demo: { label: "简单放射源演示", description: "用于安全、基础的放射样品演示。" },
            shielding_experiment: { label: "屏蔽实验", description: "用于比较不同材料的辐射屏蔽效果。" },
            cr_ka: { label: "Cr 靶材", description: "Cr-Kα，约 5.4 keV。" },
            cu_ka: { label: "Cu 靶材", description: "Cu-Kα，约 8.04 keV。" },
            mo_ka: { label: "Mo 靶材", description: "Mo-Kα，约 17.4 keV。" },
            rh_ka: { label: "Rh 靶材", description: "Rh-Kα，约 20.2 keV。" },
            ag_ka: { label: "Ag 靶材", description: "Ag-Kα，约 22.2 keV。" },
            w_la: { label: "W 靶材", description: "W-Lα，约 8.4 keV。" },
            euv_vuv_soft: { label: "EUV / VUV / 软 X 射线", description: "低于约 1 keV、真空实验或软 X 射线实验。" },
            low_energy_lab: { label: "低能实验室 X 射线", description: "Cr-Kα、Cu-Kα、W-Lα 或类似 5-9 keV 射线源。" },
            higher_energy_lab: { label: "较高能实验室 X 射线", description: "Mo、Rh、Ag 或类似 17-22 keV 的较高能靶材。" },
            hard_xray: { label: "硬 X 射线 / 高穿透", description: "30-150 keV、厚样品、高密度金属或工业检测。" },
            gamma_neutron_particles: { label: "伽马 / 中子 / 粒子", description: "辐射监测、中子转换、伽马成像或源定位。" },
            exact_energy: { label: "非标靶材 / 自定义输入", description: "输入其他靶材名称，或输入已知 eV、keV、MeV 能量。" },
            not_sure_energy: { label: "不确定，帮我推荐", description: "保持能量筛选较宽，并降低置信度；必要时建议工程师复核。" },
        },
        target: {
            cr_ka: { label: "Cr-Kα", description: "5.4 keV" },
            cu_ka: { label: "Cu-Kα", description: "8.04 keV" },
            w_la: { label: "W-Lα", description: "8.4 keV" },
            mo_ka: { label: "Mo-Kα", description: "17.4 keV" },
            rh_ka: { label: "Rh-Kα", description: "20.2 keV" },
            ag_ka: { label: "Ag-Kα", description: "22.2 keV" },
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
            single_event: { label: "单光子 / 粒子灵敏度", description: "单粒子轨迹、辐射监测、宇宙射线、α、β、伽马或中子探测。" },
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
        energy: { title: "射线源与能量", question: "你使用的射线源或能量是什么？" },
        energyXrd: { title: "XRD 靶材 / 能量", question: "你使用的 X 射线靶材或能量是什么？" },
        energyEuv: { title: "EUV / 软 X 射线源", question: "你使用的 EUV / 软 X 射线源或光子能量是什么？" },
        energyImaging: { title: "成像射线源", question: "你用于成像的射线源或能量范围是什么？" },
        energyMicroscopy: { title: "显微 / 计量射线源", question: "显微或计量系统使用什么射线源？" },
        energyCt: { title: "CT / 三维成像射线源", question: "你需要哪种射线源或穿透能力？" },
        energyNdt: { title: "工业检测射线源", question: "你使用的检测射线源或能量是什么？" },
        energyMaterial: { title: "材料识别光谱配置", question: "你使用的射线源或光谱配置是什么？" },
        energyRadiation: { title: "辐射 / 粒子类型", question: "你需要探测哪种辐射或粒子？" },
        energyEducation: { title: "教学实验类型", question: "计划进行哪种课堂实验？" },
        energyXafs: { title: "吸收光谱射线源", question: "你用于吸收光谱的射线源或能量是什么？" },
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
let contactStepUnlocked = false;

const SIMPLIFIED_INSTALLATION_IDS = ["simple_lab", "vacuum_uhv", "not_sure_installation"];

const APPLICATION_ENERGY_CONFIG = {
    xrd_saxs_waxs: {
        translationKey: "energyXrd",
        ids: ["cr_ka", "cu_ka", "w_la", "mo_ka", "rh_ka", "ag_ka", "exact_energy", "not_sure_energy"],
    },
    xafs_absorption: {
        translationKey: "energyXafs",
        ids: ["synchrotron_beamline", "standard_lab_xray_source", "hard_xray", "exact_energy", "not_sure_energy"],
    },
    euv_soft_xray_spectroscopy: {
        translationKey: "energyEuv",
        ids: [
            "synchrotron_beamline",
            "hhg_source",
            "laser_plasma_source",
            "discharge_plasma_source",
            "low_energy_soft_xray_tube",
            "exact_energy",
            "not_sure_energy",
        ],
    },
    xray_euv_imaging: {
        translationKey: "energyImaging",
        ids: ["euv_vuv_soft", "low_energy_lab", "microfocus_xray_source", "synchrotron_beamline", "standard_lab_xray_source", "exact_energy", "not_sure_energy"],
    },
    microscopy_metrology: {
        translationKey: "energyMicroscopy",
        ids: ["low_energy_lab", "microfocus_xray_source", "synchrotron_beamline", "euv_vuv_soft", "exact_energy", "not_sure_energy"],
    },
    ct_3d: {
        translationKey: "energyCt",
        ids: ["microfocus_xray_source", "standard_lab_xray_source", "hard_xray", "high_energy_industrial_xray", "exact_energy", "not_sure_energy"],
    },
    industrial_ndt: {
        translationKey: "energyNdt",
        ids: ["microfocus_xray_source", "standard_lab_xray_source", "hard_xray", "high_energy_industrial_xray", "gamma_source", "exact_energy", "not_sure_energy"],
    },
    material_identification: {
        translationKey: "energyMaterial",
        ids: ["standard_lab_xray_source", "hard_xray", "photon_counting_energy_resolved_setup", "synchrotron_beamline", "exact_energy", "not_sure_energy"],
    },
    radiation_particle: {
        translationKey: "energyRadiation",
        ids: ["alpha_beta_particles", "gamma_source", "neutron_source", "cosmic_mixed_radiation", "ion_particle_beam", "not_sure_energy"],
    },
    education_demo: {
        translationKey: "energyEducation",
        ids: ["education_alpha_beta_gamma", "cosmic_ray_observation", "radioactive_sample_demo", "shielding_experiment", "not_sure_energy"],
    },
};
const TARGET_TO_ENERGY_ID = {
    cr_ka: "low_energy_lab",
    cu_ka: "low_energy_lab",
    w_la: "low_energy_lab",
    mo_ka: "higher_energy_lab",
    rh_ka: "higher_energy_lab",
    ag_ka: "higher_energy_lab",
};

const TARGET_CHOICES_BY_ENERGY = {
    low_energy_lab: ["cr_ka", "cu_ka", "w_la"],
    higher_energy_lab: ["mo_ka", "rh_ka", "ag_ka"],
};

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
    sidebarFlowTitle: document.querySelector("#sidebar-flow-title"),
    sidebarCurrentTitle: document.querySelector("#sidebar-current-title"),
    liveSummaryTitle: document.querySelector("#live-summary-title"),
    summaryApplicationLabel: document.querySelector("#summary-application-label"),
    summaryEnergyLabel: document.querySelector("#summary-energy-label"),
    summaryPixelLabel: document.querySelector("#summary-pixel-label"),
    summaryInstallationLabel: document.querySelector("#summary-installation-label"),
    summaryApplication: document.querySelector("#summary-application"),
    summaryEnergy: document.querySelector("#summary-energy"),
    summaryPixel: document.querySelector("#summary-pixel"),
    summaryInstallation: document.querySelector("#summary-installation"),
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
    contactValidation: document.querySelector("#contact-validation"),
    contactSubmitStatus: document.querySelector("#contact-submit-status"),
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
    const energyConfig = APPLICATION_ENERGY_CONFIG[answers.application];
    const adaptiveTranslationKey = groupId === "energy" && energyConfig ? energyConfig.translationKey : groupId;
    const fallbackEnergyGroups = {
        energyXrd: {
            title: "X-ray Target / Energy",
            question: "What X-ray target or energy are you using?",
        },
        energyXafs: {
            title: "Absorption Spectroscopy Source",
            question: "What source or energy are you using for absorption spectroscopy?",
        },
        energyEuv: {
            title: "EUV / Soft X-ray Source",
            question: "What EUV / soft X-ray source or photon energy are you using?",
        },
        energyImaging: {
            title: "Imaging Source",
            question: "What source or energy range are you using for imaging?",
        },
        energyMicroscopy: {
            title: "Microscopy / Metrology Source",
            question: "What source is used for the microscope or metrology setup?",
        },
        energyCt: {
            title: "CT / 3D Source",
            question: "What kind of source or penetration level is needed?",
        },
        energyNdt: {
            title: "Industrial Inspection Source",
            question: "What source or inspection energy is used?",
        },
        energyMaterial: {
            title: "Spectral Setup",
            question: "What source or spectral setup are you using?",
        },
        energyRadiation: {
            title: "Radiation / Particle Type",
            question: "What radiation or particle type do you need to detect?",
        },
        energyEducation: {
            title: "Classroom Experiment",
            question: "What type of classroom experiment is planned?",
        },
    };
    return {
        ...group,
        title:
            GROUP_TRANSLATIONS[currentLanguage]?.[adaptiveTranslationKey]?.title ||
            fallbackEnergyGroups[adaptiveTranslationKey]?.title ||
            group.title,
        question:
            GROUP_TRANSLATIONS[currentLanguage]?.[adaptiveTranslationKey]?.question ||
            fallbackEnergyGroups[adaptiveTranslationKey]?.question ||
            group.question,
    };
}

function isEuvSoftEnergyFlow(source = answers) {
    return source?.application === "euv_soft_xray_spectroscopy";
}

function exactEnergyDisplayText(source = answers) {
    const photonEnergyFlow = isEuvSoftEnergyFlow(source);
    return {
        label: ui(photonEnergyFlow ? "exactPhotonEnergy" : "exactEnergy"),
        description: ui(photonEnergyFlow ? "exactPhotonEnergyDescription" : "exactEnergyPrompt"),
        placeholder: ui(photonEnergyFlow ? "exactPhotonEnergyPlaceholder" : "exactEnergyPlaceholder"),
        prompt: ui(photonEnergyFlow ? "exactPhotonEnergyPrompt" : "exactEnergyPrompt"),
        dialogTitle: ui(photonEnergyFlow ? "photonDialogTitle" : "dialogTitle"),
        dialogCopy: ui(photonEnergyFlow ? "photonDialogCopy" : "dialogCopy"),
        dialogEnergyLabel: ui(photonEnergyFlow ? "photonDialogEnergyLabel" : "dialogEnergyLabel"),
    };
}

function translatedChoice(groupId, choice, source = answers) {
    if (groupId === "energy" && choice.id === "exact_energy" && isEuvSoftEnergyFlow(source)) {
        const exactText = exactEnergyDisplayText(source);
        return {
            ...choice,
            label: exactText.label,
            description: exactText.description,
        };
    }

    const translation = CHOICE_TRANSLATIONS[currentLanguage]?.[groupId]?.[choice.id];
    return {
        ...choice,
        label: translation?.label || choice.label,
        description: translation?.description || choice.description,
    };
}

function translatedChoiceById(groupId, choiceId, source = answers) {
    const choice = visibleChoicesForGroup(groupId, source).find((item) => item.id === choiceId);
    return choice ? translatedChoice(groupId, choice, source) : null;
}

function adaptiveChoiceIds(groupId, source = answers) {
    if (groupId === "installation") return SIMPLIFIED_INSTALLATION_IDS;
    if (groupId === "target") return TARGET_CHOICES_BY_ENERGY[source.energy] || [];
    return null;
}

function choicesByIds(ids) {
    const targetChoices = window.CHOICE_GROUPS.target?.choices || [];
    const energyChoices = window.CHOICE_GROUPS.energy?.choices || [];
    const choicesById = new Map([...targetChoices, ...energyChoices].map((choice) => [choice.id, choice]));

    return ids
        .map((id) => choicesById.get(id))
        .filter(Boolean);
}

function visibleChoicesForGroup(groupId, source = answers) {
    if (groupId === "energy") {
        const config = APPLICATION_ENERGY_CONFIG[source.application] || APPLICATION_ENERGY_CONFIG.xray_euv_imaging;
        return choicesByIds(config.ids);
    }
    const choices = window.CHOICE_GROUPS[groupId]?.choices || [];
    const ids = adaptiveChoiceIds(groupId, source);
    if (!ids) return choices;
    return choices.filter((choice) => ids.includes(choice.id));
}

function sanitizeInstallationAnswer() {
    if (answers.installation && !SIMPLIFIED_INSTALLATION_IDS.includes(answers.installation)) {
        answers.installation = null;
    }
    if (aiState.extracted?.installation && !SIMPLIFIED_INSTALLATION_IDS.includes(aiState.extracted.installation)) {
        aiState.extracted.installation = null;
    }
    if (aiState.answers?.installation && !SIMPLIFIED_INSTALLATION_IDS.includes(aiState.answers.installation)) {
        aiState.answers.installation = "not_sure_installation";
    }
}

function sanitizeAdaptiveAnswers() {
    sanitizeInstallationAnswer();

    const visibleEnergyIds = new Set(visibleChoicesForGroup("energy").map((choice) => choice.id));
    const targetDrivenEnergyIsValid =
        answers.target &&
        TARGET_TO_ENERGY_ID[answers.target] === answers.energy &&
        visibleEnergyIds.has(answers.target);
    if (answers.energy && !visibleEnergyIds.has(answers.energy) && !targetDrivenEnergyIsValid) {
        answers.energy = null;
        answers.target = null;
        answers.exact_energy = "";
        if (els.energyValue) els.energyValue.value = "";
    }

    const visibleTargetIds = new Set(visibleChoicesForGroup("target").map((choice) => choice.id));
    if (answers.target && !visibleTargetIds.has(answers.target)) {
        answers.target = null;
    }

    if (answers.energy !== "exact_energy" && answers.exact_energy) {
        answers.exact_energy = "";
        if (els.energyValue) els.energyValue.value = "";
    }
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
    const exactText = exactEnergyDisplayText();
    setText(els.energyValueLabel, exactText.label);
    setPlaceholder(els.energyValue, exactText.placeholder);
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
    setText(els.dialogTitle, exactText.dialogTitle);
    setText(els.dialogCopy, exactText.dialogCopy);
    setText(els.dialogEnergyLabel, exactText.dialogEnergyLabel);
    setText(els.sidebarFlowTitle, ui("flowTitle"));
    setText(els.liveSummaryTitle, ui("summaryTitle"));
    setText(els.summaryApplicationLabel, ui("summaryApplication"));
    setText(els.summaryEnergyLabel, ui("summaryEnergy"));
    setText(els.summaryPixelLabel, ui("summaryPixel"));
    setText(els.summaryInstallationLabel, ui("summaryInstallation"));
    setPlaceholder(els.dialogEnergyValue, exactText.placeholder);
    setText(els.energyCancel, ui("dialogCancel"));
    setText(els.energySave, ui("dialogSave"));
    if (els.languageToggle) {
        els.languageToggle.setAttribute(
            "aria-label",
            currentLanguage === "zh" ? "Switch to English" : "切换到中文",
        );
    }
}

const COMMON_ZH_PHRASES = {
    "X-ray Detector Selector": "X 射线探测器选型工具",
    "Recommendation output": "推荐结果",
    "Best matches": "最佳匹配",
    "Compare top 3": "对比前三项",
    "AI helper": "AI 助手",
    "Need help choosing": "需要帮助选型",
    "Contact Us": "联系我们",
    "Contact us": "联系我们",
    "Contact": "联系",
    "Back": "上一步",
    "Previous": "上一步",
    "Next": "下一步",
    "Finish": "完成",
    "Review": "结果",
    "Summary": "汇总",
    "Select": "请选择",
    "Application": "应用",
    "Source": "射线源",
    "Environment": "环境",
    "Priority": "优先级",
    "Install": "环境",
    "Product": "产品",
    "Detector": "探测器",
    "Energy": "能量",
    "Pixel": "像素",
    "Active area": "有效面积",
    "Interface": "接口",
    "Software": "软件",
    "match": "匹配",
    "Unknown manufacturer": "未知厂商",
    "Not available": "未提供",
    "N/A": "未提供",

    "Scientific VUV / EUV / soft X-ray / hard X-ray imaging and spectroscopy": "科学级 VUV / EUV / 软 X 射线 / 硬 X 射线成像与光谱",
    "Scientific VUV / EUV / soft X-ray / hard X-ray spectroscopy": "科学级 VUV / EUV / 软 X 射线 / 硬 X 射线光谱",
    "Scientific in-vacuum VUV / EUV / soft X-ray / hard X-ray spectroscopy": "真空内科学级 VUV / EUV / 软 X 射线 / 硬 X 射线光谱",
    "Scientific in-vacuum VUV / EUV / soft X-ray / hard X-ray imaging": "真空内科学级 VUV / EUV / 软 X 射线 / 硬 X 射线成像",
    "Scientific UV / visible / near-infrared spectroscopy": "科学级紫外 / 可见光 / 近红外光谱",
    "Scientific UV / visible / near-infrared imaging": "科学级紫外 / 可见光 / 近红外成像",
    "High-energy beam conditions": "高能束流条件",
    "Micron/submicron X-ray microscopy": "微米 / 亚微米 X 射线显微",
    "X-ray computed tomography": "X 射线计算机断层成像",
    "X-ray metrology": "X 射线计量",
    "Integration into larger industrial systems": "集成到大型工业系统",
    "Radiation monitoring, material analysis, X-ray imaging, particle tracking": "辐射监测、材料分析、X 射线成像、粒子追踪",

    "Deep-cooled scientific CCD imaging camera": "深度制冷科学级 CCD 成像相机",
    "Deep-cooled scientific CCD spectroscopy camera": "深度制冷科学级 CCD 光谱相机",
    "In-vacuum deep-cooled scientific CCD spectroscopy camera": "真空内深度制冷科学级 CCD 光谱相机",
    "In-vacuum deep-cooled scientific CCD imaging camera": "真空内深度制冷科学级 CCD 成像相机",
    "Deep-cooled direct-detection back-illuminated sCMOS scientific camera": "深度制冷背照式直接探测 sCMOS 科学相机",
    "Compact 2D X-ray sCMOS camera": "紧凑型二维 X 射线 sCMOS 相机",
    "Hybrid photon-counting particle-tracking / spectral imaging detector": "混合型光子计数粒子追踪 / 光谱成像探测器",
    "Large-area hybrid photon-counting spectral X-ray imaging detector": "大面积混合型光子计数光谱 X 射线成像探测器",
    "Rugged industrial multi-chip spectral X-ray scanning/imaging detector": "坚固型工业多芯片光谱 X 射线扫描 / 成像探测器",
    "Educational USB radiation / particle camera": "教学用 USB 辐射 / 粒子相机",
    "Compact low-power photon-counting radiation camera for integration": "用于集成的紧凑低功耗光子计数辐射相机",
    "Compact low-power photon-counting radiation camera": "紧凑低功耗光子计数辐射相机",

    "Integrating CCD spectroscopy camera with deep cooling": "带深度制冷的积分式 CCD 光谱相机",
    "In-vacuum integrating CCD spectroscopy camera with deep cooling": "真空内使用的深度制冷积分式 CCD 光谱相机",
    "In-vacuum integrating CCD imaging camera with deep cooling": "真空内使用的深度制冷积分式 CCD 成像相机",
    "Integrating CCD imaging camera with deep cooling": "带深度制冷的积分式 CCD 成像相机",
    "Integrating CCD camera with deep cooling": "带深度制冷的积分式 CCD 相机",
    "Direct-detection back-illuminated sCMOS camera with deep cooling": "带深度制冷的背照式直接探测 sCMOS 相机",
    "sCMOS X-ray camera with changeable lens/scintillator units": "带可更换镜头 / 闪烁体单元的 sCMOS X 射线相机",
    "Photon-counting, event-based / data-driven detector": "光子计数、事件驱动 / 数据驱动探测器",
    "Medipix3 hybrid photon-counting detector": "Medipix3 混合型光子计数探测器",
    "Timepix single-particle counting / particle tracking": "Timepix 单粒子计数 / 粒子追踪探测器",

    "VUV, EUV, SXR, HXR": "VUV、EUV、软 X 射线（SXR）、硬 X 射线（HXR）",
    "Alpha, beta, gamma, cosmic particles; exact X-ray energy range not specified": "α、β、伽马、宇宙粒子；未明确标注精确 X 射线能量范围",
    "Typical: Si 3–60 keV; CdTe 5–500 keV; product description also lists 1 mm CdT...": "典型值：Si 3–60 keV；CdTe 5–500 keV；产品说明还列出 1 mm CdT...",
    "100 μm Si: 3–20 keV; 300 μm Si: 5–40 keV; 500 μm Si: 8–60 keV": "100 微米 Si：3–20 keV；300 微米 Si：5–40 keV；500 微米 Si：8–60 keV",
    "500 μm Si commonly used for 8–60 keV X-rays": "500 微米 Si 常用于 8–60 keV X 射线",
    "Si up to 60 keV; CdTe up to 600 keV in datasheet; product summaries often lis...": "数据表中 Si 最高 60 keV；CdTe 最高 600 keV；产品摘要通常还列出...",
    "Si up to 60 keV; CdTe up to 600 keV in datasheet; product summary also lists ...": "数据表中 Si 最高 60 keV；CdTe 最高 600 keV；产品摘要还列出...",
    "UV, VIS, NIR": "紫外、可见光、近红外",
    "50 eV (vacuum version) – 30 keV": "50 eV（真空版本）– 30 keV",

    "Image / spectral imaging data": "图像 / 光谱成像数据",
    "Position, energy/ToT, arrival time/ToA, fast arrival time/FToA depending mode": "位置、能量 / ToT、到达时间 / ToA、快速到达时间 / FToA，取决于模式",
    "Tracking: deposited energy sum per pixel; Imaging: event count per pixel": "追踪：每像素沉积能量总和；成像：每像素事件计数",
    "Event count; deposited energy sum/ToT; first event arrival time/ToA": "事件计数；沉积能量总和 / ToT；首个事件到达时间 / ToA",
    "Photon counts above thresholds; spectral / material-sensitive images": "阈值以上光子计数；光谱 / 材料敏感图像",
    "Spectroscopy image/signal data": "光谱图像 / 信号数据",
    "Direct-detection sCMOS image data": "直接探测 sCMOS 图像数据",
    "2D X-ray images; CT / microscopy image data": "二维 X 射线图像；CT / 显微图像数据",
    "Image data": "图像数据",

    "EUV lithography": "EUV 光刻",
    "X-ray tomography/fluorescence imaging": "X 射线断层 / 荧光成像",
    "X-ray tomography": "X 射线断层成像",
    "Fourier-transform holography": "傅里叶变换全息成像",
    "X-ray diffraction": "X 射线衍射",
    "X-ray phase contrast imaging": "X 射线相位衬度成像",
    "XRF imaging": "XRF 成像",
    "CDI": "相干衍射成像（CDI）",
    "ptychography": "叠层成像",
    "GISAXS": "掠入射小角 X 射线散射（GISAXS）",
    "X-ray spectroscopy": "X 射线光谱",
    "Soft X-ray spectroscopy": "软 X 射线光谱",
    "soft X-ray spectroscopy": "软 X 射线光谱",
    "plasma emission spectroscopy": "等离子体发射光谱",
    "HHG spectroscopy": "高次谐波光谱",
    "HHG detection/experiments": "HHG 探测 / 实验",
    "high-repetition XFEL X-ray imaging": "高重复频率 XFEL X 射线成像",
    "Raman spectroscopy": "拉曼光谱",
    "near-infrared spectroscopy": "近红外光谱",
    "fluorescence spectroscopy": "荧光光谱",
    "absorption/transmission/reflection spectroscopy": "吸收 / 透射 / 反射光谱",
    "absorption spectroscopy": "吸收光谱",
    "transmission spectroscopy": "透射光谱",
    "reflection spectroscopy": "反射光谱",
    "Live fluorescence bioimaging": "活体荧光生物成像",
    "LIBS spectroscopy": "LIBS 光谱",
    "EL/PL imaging": "EL / PL 成像",
    "ultracold quantum research": "超冷量子研究",
    "astronomy": "天文观测",
    "neutron tomography": "中子断层成像",
    "CT imaging": "CT 成像",
    "material-sensitive imaging": "材料敏感成像",
    "low-density material/soft tissue defect detection": "低密度材料 / 软组织缺陷检测",
    "light-material/soft-tissue defect detection": "轻质材料 / 软组织缺陷检测",
    "large-sample NDT": "大样品无损检测",
    "mineral/geology inspection": "矿物 / 地质检测",
    "industrial radiography": "工业射线照相",
    "high-energy X-ray/gamma imaging": "高能 X 射线 / 伽马成像",
    "electronics/light-part inspection": "电子器件 / 轻质部件检测",
    "low-dose X-ray radiography": "低剂量 X 射线摄影",
    "scintigraphy/SPECT/isotope imaging": "闪烁显像 / SPECT / 同位素成像",
    "energy-dispersive XRD/SAXS/WAXS": "能量色散 XRD / SAXS / WAXS",
    "Synchrotron / Beamline": "同步辐射 / 束线",
    "HHG / High-Harmonic Source": "HHG / 高次谐波源",
    "Laser-Produced Plasma Source": "激光等离子体源",
    "Discharge-Produced Plasma Source": "放电等离子体源",
    "Low-Energy Soft X-ray Tube": "低能软 X 射线管",
    "high-harmonic": "高次谐波",
    "laser-driven": "激光驱动",
    "ultrafast": "超快",
    "beamline": "束线",
    "synchrotron": "同步辐射",
    "source development": "光源开发",
    "EUV lithography": "EUV 光刻",
    "particle tracking": "粒子追踪",
    "neutron imaging": "中子成像",
    "Compton camera": "康普顿相机",
    "TOF imaging": "飞行时间（TOF）成像",
    "Education": "教学 / 演示",
    "particle interaction experiments": "粒子相互作用实验",
    "shielding": "屏蔽实验",
    "air radioactivity": "空气放射性",
    "cosmic muon search": "宇宙缪子探测",
    "altitude/radiation studies": "海拔 / 辐射研究",
    "decay law observation": "衰变规律观察",
    "Medical X-ray imaging": "医学 X 射线成像",
    "material analysis": "材料分析",
    "radiation monitoring": "辐射监测",
    "gamma spectral imaging": "伽马光谱成像",
    "gamma camera": "伽马相机",
    "isotope imaging": "同位素成像",
    "particle physics research": "粒子物理研究",
    "Industrial-system integration": "工业系统集成",
    "phase identification": "物相识别",
    "compositional analysis": "成分分析",
    "defect detection": "缺陷检测",
    "inspection": "检测",
    "controlled laboratory environment": "受控实验室环境",
    "portable": "便携",
    "field": "现场",
    "vacuum": "真空",
    "laboratory": "实验室",
    "spectral imaging": "光谱成像",
    "material": "材料",
    "imaging": "成像",
    "spectroscopy": "光谱",
    "radiation studies": "辐射研究",
    "radiation": "辐射",
    "particle": "粒子",
    "cosmic": "宇宙射线",

    "With CF flange: UHV capability to 10^-10 mbar; bake-out max +80 °C": "带 CF 法兰：UHV 能力可达 10^-10 mbar；最高烘烤温度 +80 °C",
    "With CF flange: UHV capability to 10^-9 mbar; bake-out max +80 °C": "带 CF 法兰：UHV 能力可达 10^-9 mbar；最高烘烤温度 +80 °C",
    "In-vacuum camera; UHV capability to 10^-9 mbar; bake-out max +80 °C": "真空内相机；UHV 能力可达 10^-9 mbar；最高烘烤温度 +80 °C",
    "Possible; operate only below 10^-3 Pa when in vacuum; contact supplier for details": "可能支持；真空中仅可在低于 10^-3 Pa 时运行；详情请联系供应商",
    "Hermetically vacuum-sealed camera; window material MgF2/UVFS/BK7; not an in-vacuum camera": "气密真空密封相机；窗口材料 MgF2 / UVFS / BK7；不是真空内相机",
    "Vacuum version available upon request; EUV sensitivity can extend to ≥50 eV": "可按需提供真空版本；EUV 灵敏度可扩展至 ≥50 eV",

    "Flange distance and mechanical customization available": "可定制法兰距离和机械结构",
    "Sensor specification customizable": "可定制传感器规格",
    "Designed for integration into larger industrial systems": "面向大型工业系统集成设计",
    "Designed for integration; model/row/sensor configuration dependent": "面向集成设计；取决于型号 / 排列 / 传感器配置",
    "Industrial integration; rugged/compact form factor; SenseEdge option": "工业集成；坚固 / 紧凑结构；可选 SenseEdge",
    "Flange distance can be customized": "法兰距离可定制",
    "Sensor coating/window configuration options": "可选传感器镀膜 / 窗口配置",
    "Flange/window and cooling accessories available": "可提供法兰 / 窗口和冷却附件",
    "Changeable lens units; vacuum version available upon request": "可更换镜头单元；可按需提供真空版本",

    "Water cooling / temperature stabilization": "水冷 / 温度稳定",
    "External temperature stabilization recommended": "建议外部温度稳定",
    "Water cooling": "水冷",
    "deep thermoelectric cooling": "深度热电制冷",
    "deep cooling": "深度制冷",
    "liquid cooling only": "仅液冷",
    "forced air or liquid cooling": "强制风冷或液冷",
    "in-vacuum liquid-cooling configuration": "真空内液冷配置",
    "No water chiller necessary": "无需水冷机",
    "max pressure": "最大压力",
    "auto shutdown": "自动关机",
    "Down to": "最低",

    "Gigabit Ethernet, USB 3.0": "千兆以太网、USB 3.0",
    "10 Gigabit Ethernet, USB 3.0": "10 千兆以太网、USB 3.0",
    "USB 3.0 or 1 Gbps Ethernet": "USB 3.0 或 1 Gbps 以太网",
    "USB 3.0 SuperSpeed": "USB 3.0 超高速",
    "USB 2.0 High-Speed": "USB 2.0 高速",
    "2× RJ45 Gigabit Ethernet": "2× RJ45 千兆以太网",
    "3× RJ45 Gigabit Ethernet": "3× RJ45 千兆以太网",
    "1× 1 Gb/s Ethernet with PoE": "1× 1 Gb/s PoE 以太网",
    "Gigabit Ethernet": "千兆以太网",
    "ADVACAM / PIXet software ecosystem (specific software not consistently listed)": "ADVACAM / PIXet 软件生态（具体软件未完全统一列出）",
    "Intuitive software with basic tools; SDK included": "直观软件，包含基础工具；包含 SDK",
    "PIXet Pro / Timepix3 .t3 data formats referenced": "PIXet Pro / 支持 Timepix3 .t3 数据格式",
    "greateyes Vision": "greateyes Vision 软件",
    "PIXet Basic": "PIXet Basic 软件",
    "PIXet Pro": "PIXet Pro 软件",

    "Application & Result": "应用与结果",
    "Source Energy & Sample": "射线源与能量",
    "Performance Priority": "性能优先级",
    "Performance": "性能优先级",
    "Installation & Control": "安装环境与控制",
    "Installation": "安装环境",
    "Control": "控制",
    "Atmospheric fit": "大气环境匹配",
    "Atmospheric fallback": "大气环境备选",
    "Environment fit": "环境匹配",
    "Installation fit": "安装环境匹配",
    "Energy family fit": "能量类型匹配",
    "Pixel family fit": "像素类型匹配",
    "Energy family appears compatible with": "能量类型看起来兼容",
    "Energy family conflicts with requested": "能量类型与所选要求冲突",
    "Pixel range inferred from product text": "根据产品文字推断像素范围",
    "ADVACAM products can be applied flexibly": "ADVACAM 产品可灵活应用",
    "Rigaku may require customization for air operation": "Rigaku 可能需要定制后用于大气环境",
    "greateyes ELSE series": "greateyes ELSE 系列",
    "ELSE series": "ELSE 系列",
    "non-CCD/CMOS product kept for atmospheric use": "保留用于大气环境的非 CCD/CMOS 产品",
    "atmospheric operation": "大气环境运行",
    "direct atmospheric fits": "直接适配大气环境的产品",
    "direct vacuum camera fits": "直接适配真空相机的产品",
    "customizable atmospheric option": "可定制的大气环境备选",
    "customizable vacuum/UHV option": "可定制真空/UHV 备选",
    "CCD/CMOS camera with vacuum/UHV indicators": "具有真空/UHV 信息的 CCD/CMOS 相机",
    "CCD/CMOS camera family": "CCD/CMOS 相机类型",
    "vacuum/UHV indicators": "真空/UHV 相关信息",
    "Vacuum/UHV indicators": "真空/UHV 相关信息",
    "Vacuum/UHV selected": "已选择真空/UHV",
    "not a CCD or CMOS/sCMOS camera family": "不是 CCD 或 CMOS/sCMOS 相机类型",
    "not a simple lab setup": "不适合简单实验室环境",
    "vacuum/beamline-oriented": "偏向真空或束线场景",
    "Typical": "典型值",
    "product description also lists": "产品说明还列出",
    "product summaries often list": "产品摘要通常列出",
    "product summary also lists": "产品摘要还列出",
    "commonly used for": "常用于",
    "not clearly documented": "未明确记录",
    "Not scored by current answers": "当前答案未对此项评分",
    "not scored by current answers": "当前答案未对此项评分",
    "requested": "所选",
    "product has": "产品为",
    "fits": "符合",
    "in datasheet": "（数据表）",
    "datasheet": "数据表",
    "with PoE": "带 PoE",
    "data formats referenced": "数据格式已列出",
    "software ecosystem": "软件生态",
    "specific software not consistently listed": "具体软件未完全统一列出",
    "basic tools": "基础工具",
    "SDK included": "包含 SDK",
    "Effective pixel size": "等效像素尺寸",
    "Field of view": "视场",
    "calculated from pixel pitch": "由像素间距计算",
    "SuperSpeed": "超高速",
    "High-Speed": "高速",
    "up to": "最高",
    "Si up to": "Si 最高",
    "CdTe up to": "CdTe 最高",
    "X-rays": "X 射线",
    "X-ray": "X 射线",
    "soft X-ray": "软 X 射线",
    "hard X-ray": "硬 X 射线",
    "gamma": "伽马",
    "Gamma": "伽马",
    "alpha": "α",
    "Alpha": "α",
    "beta": "β",
    "Beta": "β",
    "near-infrared": "近红外",
    "fluorescence": "荧光",
    "Raman": "拉曼",
    "absorption": "吸收",
    "transmission": "透射",
    "reflection": "反射",
    "microscopy": "显微",
    "camera": "相机",
    "detector": "探测器",
    "event-based": "事件驱动",
    "data-driven": "数据驱动",
    "photon-counting": "光子计数",
    "single-particle": "单粒子",
    "tracking": "追踪",
    "deep cooling": "深度制冷",
    "deep-cooled": "深度制冷",
};

function applyZhPhraseMap(text, extraMap = {}) {
    let translated = String(text || "");
    const entries = Object.entries({ ...COMMON_ZH_PHRASES, ...extraMap })
        .sort(([left], [right]) => right.length - left.length);

    entries.forEach(([english, chinese]) => {
        translated = translated.replaceAll(english, chinese);
    });

    return translated;
}

function cleanupZhTechnicalText(value) {
    return String(value || "")
        .replace(/能量-resolved\s*成像/g, "能量分辨成像")
        .replace(/energy-resolved/g, "能量分辨")
        .replace(/吸收,\s*透射/g, "吸收、透射")
        .replace(/辐射,\s*粒子,\s*宇宙射线/g, "辐射、粒子、宇宙射线")
        .replace(/伽马,\s*α,\s*β/g, "伽马、α、β")
        .replace(/;\s*/g, "；")
        .replace(/\s+\/\s+/g, " / ")
        .replace(/(\d+(?:\.\d+)?(?:\s*[×x]\s*\d+(?:\.\d+)?)?)\s*(?:[µμ]m|um)\b/g, "$1 微米")
        .replace(/mm²/g, "平方毫米")
        .replace(/(\d+(?:\.\d+)?(?:\s*[×x]\s*\d+(?:\.\d+)?)?)\s*mm\b/g, "$1 毫米");
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
        "Detector type/application is not close to the selected application": "探测器类型/应用与所选应用不接近",
        "ADVACAM is not automatically preferred for vacuum/UHV; it remains only when application, energy, and pixel choices make it relevant": "ADVACAM 不会因为选择真空/UHV 环境而自动优先推荐；只有当应用、能量和像素选择相关时才会保留",
        "Vacuum/UHV possible only if photon-counting requirements are more important than installation fit": "仅当光子计数需求比安装环境匹配更重要时，才可能作为真空/UHV 方案考虑",
        "Strong Match": "强匹配",
        "Good Match": "良好匹配",
        "Possible Match": "可能匹配",
        "Weak Match": "弱匹配",
        "Engineer Review Required": "需要工程师复核",
        "Engineer Review Recommended": "建议工程师复核",
        "Application & Result: spectroscopy": "应用与结果：光谱",
        "Application & Result: spectral imaging": "应用与结果：光谱成像",
        "Application & Result: material": "应用与结果：材料识别",
        "Application & Result: absorption, transmission": "应用与结果：吸收、透射",
        "Application & Result: absorption/transmission/reflection": "应用与结果：吸收 / 透射 / 反射",
        "Application & Result: imaging": "应用与结果：成像",
        "Application & Result: microscopy": "应用与结果：显微 / 计量",
        "Application & Result: xrd": "应用与结果：XRD / 衍射",
        "Performance: Energy-resolved imaging": "性能优先级：能量分辨成像",
        "Performance: energy-resolved imaging": "性能优先级：能量分辨成像",
        "Atmospheric fit: greateyes ELSE series": "大气环境匹配：greateyes ELSE 系列",
        "Atmospheric fit: ADVACAM products can be applied flexibly": "大气环境匹配：ADVACAM 产品可灵活应用",
        "Application & Result: radiation, particle, cosmic": "应用与结果：辐射、粒子、宇宙射线",
        "Energy family fit: gamma, alpha, beta": "能量类型匹配：伽马、α、β",
        "Source Energy & Sample: cr": "射线源与能量：Cr 靶材",
        "Source Energy & Sample: cu": "射线源与能量：Cu 靶材",
        "Source Energy & Sample: w": "射线源与能量：W 靶材",
        "Source Energy & Sample: mo": "射线源与能量：Mo 靶材",
        "Source Energy & Sample: rh": "射线源与能量：Rh 靶材",
        "Source Energy & Sample: ag": "射线源与能量：Ag 靶材",
        "Installation & Control: ethernet": "安装环境与控制：以太网",
        "Installation & Control: usb": "安装环境与控制：USB",
        "Installation & Control: lab": "安装环境与控制：实验室",
        "Installation & Control: vacuum": "安装环境与控制：真空",
        "broad match": "宽泛匹配",
        "broad result because no strong filters were selected": "由于筛选条件较少，结果较宽泛",
        "Conflict check: selected answers need engineer review": "冲突检查：所选答案需要工程师复核",
        "Possible matches, but your answers contain conflicts": "所选答案存在技术冲突",
        "Some selected answers point toward different detector families. The products below are possible matches, but their percentages are reduced until the conflicts are reviewed.": "自动产品匹配已暂停。请先查看下面的冲突原因，再调整答案或联系工程师确认。",
        "Selected answers contain a technical conflict": "所选答案存在技术冲突",
        "Automatic product matching is paused. Please review the conflicting answers below before viewing detector recommendations.": "自动产品匹配已暂停。请先查看下面的冲突原因，再查看探测器推荐。",
        "Energy vs Pixel Size": "能量与像素尺寸冲突",
        "Application vs Energy": "应用与能量选择冲突",
        "Priority vs Detector Type": "性能优先级与探测器类型冲突",
        "High/hard X-ray measurements usually need thicker sensors, scintillators, or photon-counting detector geometries, while sub-1 micrometer effective pixels are normally associated with microscopy optics and lower-energy imaging setups.": "高能 / 硬 X 射线测量通常需要更厚的传感器、闪烁体或光子计数探测器结构；小于 1 微米的有效像素通常更接近显微光学或低能成像方案。",
        "Review the energy range or ask an engineer about optical coupling, scintillator, or custom geometry options.": "请复核能量范围，或让工程师评估光学耦合、闪烁体或定制几何结构方案。",
        "EUV/VUV/soft X-ray spectroscopy is normally below about 1 keV, but the selected source is a lab X-ray/XRD-style energy such as Cu-Kalpha or Mo-Kalpha.": "EUV / VUV / 软 X 射线光谱通常低于约 1 keV，但当前选择的是 Cu-Kalpha 或 Mo-Kalpha 这类实验室 X 射线 / XRD 能量。",
        "If the source is really Cu-Kalpha or another lab target, consider an XRD, XAFS, or X-ray imaging application instead.": "如果射线源确实是 Cu-Kalpha 或其他实验室靶材，请考虑改选 XRD、XAFS 或 X 射线成像应用。",
        "XRD/SAXS/WAXS usually uses lab or beamline X-ray energies, while EUV/VUV/soft X-ray choices point toward a different spectroscopy or imaging setup.": "XRD / SAXS / WAXS 通常使用实验室或束线 X 射线能量；EUV / VUV / 软 X 射线则更像另一类光谱或成像系统。",
        "Review whether the measurement is diffraction, soft X-ray spectroscopy, or EUV imaging.": "请确认测量目标到底是衍射、软 X 射线光谱，还是 EUV 成像。",
        "Single photon / particle sensitivity often points toward photon-counting or Timepix-style detectors. Some vacuum/EUV spectroscopy workflows still use CCD or sCMOS cameras, but they should be treated as possible matches, not guaranteed single-event detectors.": "单光子 / 粒子灵敏度通常指向光子计数或 Timepix 类探测器。有些真空 / EUV 光谱流程仍会使用 CCD 或 sCMOS 相机，但不应直接视为确定的单事件探测方案。",
        "Single photon / particle sensitivity often points toward photon-counting or Timepix-style detectors. Some vacuum/EUV spectroscopy workflows still use CCD or sCMOS cameras, but they should be treated as engineering-review options, not automatic recommendations.": "单光子 / 粒子灵敏度通常指向光子计数或 Timepix 类探测器。有些真空 / EUV 光谱流程仍会使用 CCD 或 sCMOS 相机，但这类方案应先由工程师复核，而不是直接自动推荐。",
        "Keep the CCD/sCMOS options as possible vacuum/spectroscopy matches, but ask an engineer if single-event counting is required.": "如果确实需要单事件计数，请让工程师确认；CCD/sCMOS 只能作为真空 / 光谱方向的备选思路。",
        "Revise the application or performance priority, or ask an engineer to confirm whether single-event counting is truly required.": "请修改应用或性能优先级，或让工程师确认是否真的需要单事件计数。",
        "ADVACAM particle/radiation detector family fit": "ADVACAM 粒子 / 辐射探测器系列匹配",
        "ADVACAM flexible detector platform": "ADVACAM 灵活探测器平台",
        "Allowed for atmospheric use because ADVACAM products can be applied flexibly": "允许用于大气环境，因为 ADVACAM 产品可灵活应用",
        "Rigaku is kept as a customizable atmospheric option, but ranked after direct atmospheric fits": "Rigaku 会作为可定制的大气环境备选保留，但排序低于直接适配大气环境的产品",
        "Allowed for atmospheric use because greateyes ELSE is the air-operation series": "允许用于大气环境，因为 greateyes ELSE 是适合空气环境运行的系列",
        "Atmospheric environment excludes greateyes ALEX, LOTTE, and CHARLIE; only ELSE is allowed": "大气环境会排除 greateyes ALEX、LOTTE 和 CHARLIE；只允许 ELSE 系列",
        "Atmospheric environment excludes this CCD/CMOS camera family unless it is ADVACAM, Rigaku, or greateyes ELSE": "大气环境会排除此类 CCD/CMOS 相机，除非它属于 ADVACAM、Rigaku 或 greateyes ELSE",
        "Not a CCD or CMOS/sCMOS camera; atmospheric details are not fully documented and only lightly affect the score": "该产品不是 CCD 或 CMOS/sCMOS 相机；大气环境细节未完整记录，因此只轻微影响评分",
        "Rigaku is kept as a customizable vacuum/UHV option, but ranked after direct vacuum camera fits": "Rigaku 会作为可定制真空/UHV 备选保留，但排序低于直接适配真空相机的产品",
        "Vacuum/UHV selected; CCD and CMOS/sCMOS camera products are prioritized": "已选择真空/UHV；CCD 和 CMOS/sCMOS 相机产品会优先考虑",
        "CCD/CMOS camera family is preferred for vacuum/UHV, but missing vacuum details reduce the environment score": "CCD/CMOS 相机类型更适合真空/UHV，但缺少真空细节会降低环境评分",
        "Vacuum/UHV indicators found, but product is not a CCD or CMOS/sCMOS camera family": "发现真空/UHV 相关信息，但该产品不是 CCD 或 CMOS/sCMOS 相机类型",
        "Installation environment text matches the selected environment": "安装环境文字与所选环境匹配",
        "Interface/software looks usable, but it has a smaller percentage impact than energy, pixel size, and application": "接口/软件看起来可用，但它对百分比的影响小于能量、像素尺寸和应用场景",
        "Interface/software match is useful, but it is weighted lightly in the total percentage": "接口/软件匹配有参考价值，但在总百分比中的权重较低",
        "CCD/CMOS camera is possible for vacuum/EUV spectroscopy, but single-event counting may need a different detector family": "CCD/CMOS 相机可用于真空 / EUV 光谱，但单事件计数可能需要不同的探测器类型",
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
        [/^Energy family fit: (.+)$/i, "能量类型匹配：$1"],
        [/^Energy family appears compatible with (.+)$/i, "能量类型看起来兼容：$1"],
        [/^Energy family conflicts with requested (.+)$/i, "能量类型与所选要求冲突：$1"],
        [/^Partial energy fit: (.+)$/i, "能量部分匹配：$1"],
        [/^Pixel fit: (.+)$/i, "像素匹配：$1"],
        [/^Pixel family fit: (.+)$/i, "像素类型匹配：$1"],
        [/^Pixel range inferred from product text: (.+)$/i, "根据产品文字推断像素范围：$1"],
        [/^Pixel is close but not exact: (.+)$/i, "像素接近但不完全匹配：$1"],
        [/^Application & Result: (.+)$/i, "应用与结果：$1"],
        [/^Source Energy & Sample: (.+)$/i, "射线源与能量：$1"],
        [/^Performance: (.+)$/i, "性能优先级：$1"],
        [/^Atmospheric fit: (.+)$/i, "大气环境匹配：$1"],
        [/^Atmospheric fallback: (.+)$/i, "大气环境备选：$1"],
        [/^Installation fit: (.+)$/i, "安装环境匹配：$1"],
        [/^Installation & Control: (.+)$/i, "安装环境与控制：$1"],
        [/^Environment fit: (.+)$/i, "使用环境匹配：$1"],
        [/^Conflict: (.+)$/i, "冲突：$1"],
    ];

    const phraseMap = {
        "Application & Result": "应用与结果",
        "Source Energy & Sample": "射线源与能量",
        "Performance": "性能优先级",
        "Installation": "安装环境",
        "Control": "控制",
        "Detector": "探测器",
        "Energy": "能量",
        "Pixel": "像素",
        "Active area": "有效面积",
        "Interface": "接口",
        "Software": "软件",
        "Atmospheric fit": "大气环境匹配",
        "Energy family fit": "能量类型匹配",
        "Pixel family fit": "像素类型匹配",
        "ADVACAM products can be applied flexibly": "ADVACAM 产品可灵活应用",
        "Rigaku may require customization for air operation": "Rigaku 可能需要定制后用于大气环境",
        "greateyes ELSE series": "greateyes ELSE 系列",
        "ELSE series": "ELSE 系列",
        "Typical": "典型值",
        "product description also lists": "产品说明还列出",
        "commonly used for": "常用于",
        "X-rays": "X 射线",
        "selected application": "所选应用",
        "type/application": "类型/应用",
        "not close to": "不接近",
        "photon-counting requirements": "光子计数需求",
        "installation fit": "安装环境匹配",
        "application, energy, and pixel choices": "应用、能量和像素选择",
        "not automatically preferred": "不会自动优先推荐",
        "remains only when": "只有在以下条件相关时才保留：",
        "make it relevant": "使它相关",
        "Medical X-ray imaging": "医学 X 射线成像",
        "material analysis": "材料分析",
        "material identification": "材料识别",
        "radiation monitoring": "辐射监测",
        "gamma spectral imaging": "伽马光谱成像",
        "gamma camera": "伽马相机",
        "isotope imaging": "同位素成像",
        "particle physics research": "粒子物理研究",
        "radiation": "辐射",
        "particle": "粒子",
        "cosmic": "宇宙射线",
        "gamma": "伽马",
        "Gamma": "伽马",
        "alpha": "α",
        "beta": "β",
        "Industrial-system integration": "工业系统集成",
        "spectroscopy": "光谱",
        "Raman spectroscopy": "拉曼光谱",
        "near-infrared spectroscopy": "近红外光谱",
        "fluorescence spectroscopy": "荧光光谱",
        "absorption/transmission/reflection spectroscopy": "吸收 / 透射 / 反射光谱",
        "near-infrared": "近红外",
        "fluorescence": "荧光",
        "Raman": "拉曼",
        "absorption": "吸收",
        "transmission": "透射",
        "reflection": "反射",
        "spectral imaging": "光谱成像",
        "material": "材料",
        "imaging": "成像",
        "microscopy": "显微",
        "ethernet": "以太网",
        "Ethernet": "以太网",
        "usb": "USB",
        "Low-energy lab X-ray": "低能实验室 X 射线",
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
    return cleanupZhTechnicalText(applyZhPhraseMap(translated, phraseMap));
}

function translateProductText(value) {
    const text = String(value || "");
    if (currentLanguage !== "zh" || !text) return text;

    const exactMap = {
        "Integrating CCD spectroscopy camera with deep cooling": "带深度制冷的积分式 CCD 光谱相机",
        "Medipix3 hybrid photon-counting detector": "Medipix3 混合型光子计数探测器",
        "sCMOS X-ray camera with changeable lens/scintillator units": "带可更换镜头 / 闪烁体单元的 sCMOS X 射线相机",
        "Integrating CCD camera with deep cooling": "带深度制冷的积分式 CCD 相机",
        "In-vacuum integrating CCD imaging camera with deep cooling": "真空内使用的深度制冷积分式 CCD 成像相机",
        "Integrating CCD imaging camera with deep cooling": "带深度制冷的积分式 CCD 成像相机",
        "Timepix single-particle counting / particle tracking": "Timepix 单粒子计数 / 粒子追踪探测器",
        "In-vacuum integrating CCD spectroscopy camera with deep cooling": "真空内使用的深度制冷积分式 CCD 光谱相机",
        "Photon-counting, event-based / data-driven detector": "光子计数、事件驱动 / 数据驱动探测器",
        "Direct-detection back-illuminated sCMOS camera with deep cooling": "带深度制冷的背照式直接探测 sCMOS 相机",
        "VUV, EUV, SXR, HXR": "VUV、EUV、软 X 射线（SXR）、硬 X 射线（HXR）",
        "Gigabit Ethernet, USB 3.0": "千兆以太网、USB 3.0",
        "Gigabit Ethernet": "千兆以太网",
        "USB 3.0 or 1 Gbps Ethernet": "USB 3.0 或 1 Gbps 以太网",
        "USB 2.0 High-Speed": "USB 2.0 高速",
        "2× RJ45 Gigabit Ethernet": "2× RJ45 千兆以太网",
        "3× RJ45 Gigabit Ethernet": "3× RJ45 千兆以太网",
        "1× 1 Gb/s Ethernet with PoE": "1× 1 Gb/s PoE 以太网",
        "USB 3.0 SuperSpeed": "USB 3.0 超高速",
        "10 Gigabit Ethernet, USB 3.0": "10 千兆以太网、USB 3.0",
        "greateyes Vision": "greateyes Vision 软件",
        "ADVACAM / PIXet software ecosystem (specific software not consistently listed)": "ADVACAM / PIXet 软件生态（具体软件未完全统一列出）",
        "Intuitive software with basic tools; SDK included": "直观软件，包含基础工具；包含 SDK",
        "PIXet Pro / Timepix3 .t3 data formats referenced": "PIXet Pro / 支持 Timepix3 .t3 数据格式",
        "PIXet Basic": "PIXet Basic 软件",
        "PIXet Pro": "PIXet Pro 软件",
    };

    if (exactMap[text]) return exactMap[text];

    const phraseMap = {
        "Effective pixel size": "等效像素尺寸",
        "Field of view": "视场",
        "calculated from pixel pitch": "由像素间距计算",
        "Typical": "典型值",
        "product description also lists": "产品说明还列出",
        "vacuum version": "真空版本",
        "with PoE": "带 PoE",
        "SuperSpeed": "超高速",
        "High-Speed": "高速",
        "data formats referenced": "数据格式已列出",
        "software ecosystem": "软件生态",
        "specific software not consistently listed": "具体软件未完全统一列出",
        "basic tools": "基础工具",
        "SDK included": "包含 SDK",
        "Si up to": "Si 最高",
        "CdTe up to": "CdTe 最高",
        "up to": "最高",
        "in datasheet": "（数据表）",
        "datasheet": "数据表",
        "product summaries often list": "产品摘要通常列出",
        "Raman spectroscopy": "拉曼光谱",
        "near-infrared spectroscopy": "近红外光谱",
        "fluorescence spectroscopy": "荧光光谱",
        "absorption/transmission/reflection spectroscopy": "吸收 / 透射 / 反射光谱",
        "absorption spectroscopy": "吸收光谱",
        "transmission spectroscopy": "透射光谱",
        "reflection spectroscopy": "反射光谱",
        "EUV lithography": "EUV 光刻",
        "CT imaging": "CT 成像",
        "X-ray spectroscopy": "X 射线光谱",
        "material-sensitive imaging": "材料敏感成像",
        "low-density material/soft tissue defect detection": "低密度材料 / 软组织缺陷检测",
        "NDT": "无损检测",
        "mineral/geology inspection": "矿物 / 地质检测",
        "industrial radiography": "工业射线照相",
        "high-energy X-ray/gamma imaging": "高能 X 射线 / 伽马成像",
        "electronics/light-part inspection": "电子器件 / 轻质部件检测",
        "Medical X-ray imaging": "医学 X 射线成像",
        "X-ray tomography": "X 射线断层成像",
        "Fourier-transform holography": "傅里叶变换全息成像",
        "XRF imaging": "XRF 成像",
        "CDI": "相干衍射成像（CDI）",
        "ptychography": "叠层成像",
        "GISAXS": "掠入射小角 X 射线散射（GISAXS）",
        "Soft X-ray spectroscopy": "软 X 射线光谱",
        "soft X-ray spectroscopy": "软 X 射线光谱",
        "plasma emission spectroscopy": "等离子体发射光谱",
        "HHG spectroscopy": "高次谐波光谱",
        "XANES": "XANES",
        "RIXS": "RIXS",
        "low-dose X-ray radiography": "低剂量 X 射线摄影",
        "scintigraphy/SPECT/isotope imaging": "闪烁显像 / SPECT / 同位素成像",
        "energy-dispersive XRD/SAXS/WAXS": "能量色散 XRD / SAXS / WAXS",
        "particle tracking": "粒子追踪",
        "neutron imaging": "中子成像",
        "Compton camera": "康普顿相机",
        "TOF imaging": "飞行时间（TOF）成像",
        "Education": "教学 / 演示",
        "particle interaction experiments": "粒子相互作用实验",
        "shielding": "屏蔽实验",
        "air radioactivity": "空气放射性",
        "cosmic muon search": "宇宙缪子探测",
        "altitude/radiation studies": "海拔 / 辐射研究",
        "decay law observation": "衰变规律观察",
        "material analysis": "材料分析",
        "radiation monitoring": "辐射监测",
        "radiation studies": "辐射研究",
        "gamma spectral imaging": "伽马光谱成像",
        "gamma camera": "伽马相机",
        "isotope imaging": "同位素成像",
        "particle physics research": "粒子物理研究",
        "particle": "粒子",
        "radiation": "辐射",
        "cosmic": "宇宙射线",
        "Industrial-system integration": "工业系统集成",
        "phase identification": "物相识别",
        "compositional analysis": "成分分析",
        "defect detection": "缺陷检测",
        "inspection": "检测",
        "controlled laboratory environment": "受控实验室环境",
        "portable": "便携",
        "field": "现场",
        "vacuum": "真空",
        "laboratory": "实验室",
        "commonly used for": "常用于",
        "X-rays": "X 射线",
        "X-ray micron/submicron microscopy": "X 射线微米 / 亚微米显微",
        "X-ray microscopy": "X 射线显微",
        "X-ray CT": "X 射线 CT",
        "X-ray metrology": "X 射线计量",
        "X-ray imaging": "X 射线成像",
        "X-ray radiography": "X 射线摄影",
        "ant head imaging": "蚂蚁头部成像",
        "ant leg CT": "蚂蚁腿部 CT",
        "carbon-fiber reinforced polymer": "碳纤维增强聚合物",
        "stained neurons": "染色神经元",
        "API tablet distribution": "API 药片分布",
    };

    let translated = text;
    Object.entries(phraseMap).forEach(([english, chinese]) => {
        translated = translated.replaceAll(english, chinese);
    });

    return cleanupZhTechnicalText(applyZhPhraseMap(translated, phraseMap));
}

function selectedLabels(groupId) {
    if (groupId === "contact") {
        const mainContact = answers.contact_email || answers.contact_name || answers.contact_info;
        return mainContact ? [mainContact] : [];
    }

    if (groupId === "energy") {
        if (answers.target) {
            const targetLabel = translatedChoiceById("target", answers.target)?.label;
            return targetLabel ? [targetLabel] : [];
        }
        if (answers.energy === "exact_energy") {
            const customLabel = translatedChoiceById("energy", "exact_energy")?.label || ui("exactEnergy");
            return answers.exact_energy ? [`${customLabel} (${answers.exact_energy})`] : [customLabel];
        }
        if (answers.energy === "not_sure_energy") {
            const unsureLabel = translatedChoiceById("energy", "not_sure_energy")?.label;
            return unsureLabel ? [unsureLabel] : [];
        }
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

function summaryLabelFor(groupId) {
    const labels = selectedLabels(groupId);
    return labels.length ? labels.join(", ") : ui("summaryNotSet");
}

function renderRequirementsSummary() {
    const current = steps[currentStep];
    setText(els.sidebarCurrentTitle, `${currentStep + 1}. ${stepText(current.id, "short")}`);
    setText(els.summaryApplication, summaryLabelFor("application"));
    setText(els.summaryEnergy, summaryLabelFor("energy"));
    setText(els.summaryPixel, summaryLabelFor("pixel_size"));
    setText(els.summaryInstallation, summaryLabelFor("installation"));
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

function isStepCompleteById(stepId) {
    if (stepId === "review") return resultsGenerated;
    if (stepId === "contact") return isContactValid();
    if (stepId === "energy" && answers.energy === "exact_energy") {
        return Boolean((answers.exact_energy || "").trim());
    }
    const value = answers[stepId];
    if (Array.isArray(value)) return value.length > 0;
    return Boolean(value);
}

function arePreviousStepsComplete(targetIndex) {
    return steps.slice(0, targetIndex).every((step) => {
        if (step.id === "review") return resultsGenerated;
        if (step.id === "contact") return true;
        return isStepCompleteById(step.id);
    });
}

function canNavigateToStep(index) {
    if (index <= currentStep) return true;
    const targetStep = steps[index];
    if (!targetStep) return false;
    if (targetStep.id === "contact") {
        return contactStepUnlocked && arePreviousStepsComplete(index);
    }
    return arePreviousStepsComplete(index);
}

function renderStepOverview() {
    els.stepOverview.innerHTML = steps
        .map((step, index) => {
            const done = index < currentStep;
            const active = index === currentStep;
            const locked = !canNavigateToStep(index);
            return `
                <button class="step-card ${active ? "active" : ""} ${done ? "done" : ""} ${locked ? "locked" : ""}" data-step="${index}" ${locked ? "disabled aria-disabled='true'" : ""}>
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
            const requestedStep = Number(button.dataset.step);
            if (!canNavigateToStep(requestedStep)) return;
            currentStep = requestedStep;
            render();
        });
    });
}

function isSelected(groupId, choiceId) {
    if (groupId === "energy") {
        if (TARGET_TO_ENERGY_ID[choiceId]) return answers.target === choiceId;
        return answers.energy === choiceId;
    }

    const value = answers[groupId];
    return Array.isArray(value) ? value.includes(choiceId) : value === choiceId;
}

function setSourceTargetChoice(choiceId) {
    if (TARGET_TO_ENERGY_ID[choiceId]) {
        const alreadySelected = answers.target === choiceId;
        answers.target = alreadySelected ? null : choiceId;
        answers.energy = alreadySelected ? null : TARGET_TO_ENERGY_ID[choiceId];
        answers.exact_energy = "";
        if (els.energyValue) els.energyValue.value = "";
        sanitizeAdaptiveAnswers();
        return;
    }

    if (choiceId === "exact_energy") {
        const alreadySelected = answers.energy === "exact_energy";
        answers.energy = alreadySelected ? null : "exact_energy";
        answers.target = null;
        if (alreadySelected) {
            answers.exact_energy = "";
            if (els.energyValue) els.energyValue.value = "";
        }
        sanitizeAdaptiveAnswers();
        return;
    }

    if (choiceId === "not_sure_energy") {
        const alreadySelected = answers.energy === "not_sure_energy";
        answers.energy = alreadySelected ? null : "not_sure_energy";
        answers.target = null;
        answers.exact_energy = "";
        if (els.energyValue) els.energyValue.value = "";
        sanitizeAdaptiveAnswers();
        return;
    }

    const energyChoiceExists = (window.CHOICE_GROUPS.energy?.choices || []).some((choice) => choice.id === choiceId);
    if (energyChoiceExists) {
        const alreadySelected = answers.energy === choiceId;
        answers.energy = alreadySelected ? null : choiceId;
        answers.target = null;
        answers.exact_energy = "";
        if (els.energyValue) els.energyValue.value = "";
        sanitizeAdaptiveAnswers();
    }
}

function toggleChoice(groupId, choiceId) {
    const group = window.CHOICE_GROUPS[groupId];
    const maxChoices = group.max_choices || 1;
    resultsGenerated = false;
    contactStepUnlocked = false;

    if (groupId === "energy") {
        setSourceTargetChoice(choiceId);
        return;
    }

    if (maxChoices === 1) {
        answers[groupId] = answers[groupId] === choiceId ? null : choiceId;
        sanitizeAdaptiveAnswers();
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
    sanitizeAdaptiveAnswers();
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
    sanitizeAdaptiveAnswers();
    els.cardsGrid.innerHTML = visibleChoicesForGroup(groupId).map((choice) => choiceCard(groupId, choice)).join("");
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
        const value = window.prompt(exactEnergyDisplayText().prompt, answers.exact_energy || "");
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

    document.querySelector(".subsection")?.remove();
    els.exactEnergy.classList.remove("visible");
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
    updateContactValidation();
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

    const reviewGroups = ["application", "energy", "pixel_size", "performance", "installation"];
    const summaryRows = reviewGroups
        .map((groupId) => {
            const title = translatedGroup(groupId).title;
            const labels = selectedLabels(groupId);
            const value = labels.length ? labels.join(", ") : ui("reviewEmptyValue");
            return `
                <div class="review-summary-row">
                    <dt>${escapeHtml(title)}</dt>
                    <dd>${escapeHtml(value)}</dd>
                </div>
            `;
        })
        .join("");

    els.reviewGrid.innerHTML = `
        <article class="review-summary-panel">
            <div class="review-summary-heading">
                <span>${escapeHtml(ui("reviewReadOnlyBadge"))}</span>
                <strong>${escapeHtml(ui("reviewReadOnlyTitle"))}</strong>
                <p>${escapeHtml(ui("reviewEditHint"))}</p>
            </div>
            <dl class="review-summary-list">
                ${summaryRows}
            </dl>
        </article>
        <article class="review-next-panel">
            <span>${escapeHtml(ui("nextStep"))}</span>
            <strong>${escapeHtml(ui("engineerCard"))}</strong>
        </article>
    `;
}

function specStatusClass(item, key) {
    const status = item.spec_quality?.[key]?.status || "unknown";
    return `status-${status}`;
}

function specBlock(item, key, label, value) {
    const displayValue = value ? translateProductText(value) : ui("notAvailable");
    return `
        <div class="${escapeHtml(specStatusClass(item, key))}">
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(displayValue)}</dd>
        </div>
    `;
}

function hideInterfaceSpecs(root = document) {
    root.querySelectorAll(".spec-grid div").forEach((spec) => {
        const label = spec.querySelector("dt")?.textContent.trim().toLowerCase();
        if (label === "interface" || label === "接口") {
            spec.remove();
        }
    });
}

function productLinkFor(item) {
    return item.product_url || item.source_url || "";
}

function renderProductLink(item) {
    const href = productLinkFor(item);
    if (href) {
        return `<a class="product-link" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(ui("productLink"))}</a>`;
    }
    return `<span class="product-link pending">${escapeHtml(ui("productLinkPending"))}</span>`;
}

function renderResultCard(item, index) {
    const modelName = item.model_name_variant || item.product_id || ui("notAvailable");
    const maker = item.manufacturer || ui("unknownManufacturer");
    const family = item.product_family || ui("notAvailable");
    const title = currentLanguage === "zh" ? `型号：${modelName}` : modelName;
    const makerLine = currentLanguage === "zh" ? `厂商：${maker} · 系列：${family}` : `${maker} · ${family}`;
    const applications = translateProductText(item.applications || "");
    const matchLabel = item.match_label ? translateBackendText(item.match_label) : "";
    const reviewLabel = item.engineer_review ? translateBackendText("Engineer Review Recommended") : "";
    const scoreClass = item.engineer_review ? "score review" : "score";
    const scoreNotes = [matchLabel, reviewLabel].filter(Boolean);

    return `
        <article class="result-card">
            <div class="rank">${index + 1}</div>
            <div class="result-body">
                <div class="result-title-row">
                    <div>
                        <h3>${escapeHtml(title)}</h3>
                        <p>${escapeHtml(makerLine)}</p>
                    </div>
                    <div class="score-wrap">
                        <span class="${scoreClass}">
                            <strong>${item.match_percent || 0}% ${ui("match")}</strong>
                        </span>
                        ${scoreNotes.length ? `<small class="score-note">${escapeHtml(scoreNotes.join(" / "))}</small>` : ""}
                    </div>
                </div>
                <dl class="spec-grid">
                    ${specBlock(item, "detector", ui("detector"), item.detector_principle)}
                    ${specBlock(item, "energy", ui("energy"), item.energy_range)}
                    ${specBlock(item, "pixel", ui("pixel"), item.pixel_size)}
                    ${specBlock(item, "active_area", ui("activeArea"), item.active_area)}
                    ${specBlock(item, "software", ui("software"), item.software)}
                </dl>
                <p class="applications">${escapeHtml(applications)}</p>
                <div class="reason-list">
                    ${item.reasons.map((reason) => `<span>${escapeHtml(translateBackendText(reason))}</span>`).join("")}
                </div>
                <div class="product-actions">
                    ${renderProductLink(item)}
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

function renderConflictSummary(conflict) {
    const details = conflict?.details || [];
    if (!details.length) {
        return escapeHtml(ui("reviseConflict"));
    }

    return `
        <div class="conflict-summary-mini">
            <strong>${escapeHtml(translateBackendText(conflict.title || ui("conflictFallbackTitle")))}</strong>
            <p>${escapeHtml(translateBackendText(conflict.message || ui("conflictFallbackMessage")))}</p>
            ${details
                .map((detail) => `
                    <div>
                        <b>${escapeHtml(translateBackendText(detail.title))}</b>
                        <span>${escapeHtml(translateBackendText(detail.selected))}</span>
                        <small>${escapeHtml(translateBackendText(detail.suggestion))}</small>
                    </div>
                `)
                .join("")}
        </div>
    `;
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
    translateRenderedEnglishText();
}

async function loadRecommendations() {
    renderStaticLanguageText();
    answers.exact_energy = els.energyValue.value.trim();
    els.resultsList.innerHTML = `<p class='loading'>${ui("loading")}</p>`;
    els.compareGrid.innerHTML = "";
    setEngineerStatus("");
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
            level: "block",
            message: translateBackendText(data.conflict.message),
        });
        latestConflict = data.conflict;
        renderConflictCheck(data.conflict);
        latestRecommendations = [];
        els.resultsList.innerHTML = `<article class='info-empty'>${ui("reviseConflict")}</article>`;
        markResultsGenerated();
        return;
    } else {
        renderConflictCheck(null);
    }
    latestRecommendations = data.recommendations || [];
    els.resultsList.innerHTML = latestRecommendations.map(renderResultCard).join("");
    hideInterfaceSpecs(els.resultsList);
    markResultsGenerated();
}

function setEngineerStatus(message, isError = false) {
    [els.engineerActionStatus, els.contactSubmitStatus].forEach((element) => {
        if (!element) return;
        element.textContent = message || "";
        element.classList.toggle("visible", Boolean(message));
        element.classList.toggle("error", isError);
    });
}

function engineerContextMessage(contactHint) {
    if (latestConflict) {
        return `${contactHint} ${ui("engineerAlternativePrepared")}`;
    }

    if (latestRecommendations.length) {
        const products = latestRecommendations
            .map((item) => item.model_name_variant || item.product_id)
            .slice(0, 3)
            .join(", ");
        return `${contactHint} ${ui("engineerProductsPrepared", { products })}`;
    }

    return `${contactHint} ${ui("engineerGenericPrepared")}`;
}

async function prepareEngineerRequest() {
    if (!isContactValid()) {
        updateContactValidation();
        setEngineerStatus(contactValidationMessage(), true);
        return;
    }

    const contactLine = answers.contact_email || answers.contact_name || answers.contact_info;
    const contactHint = contactLine
        ? ui("contactHintWithContact", { contact: contactLine })
        : ui("contactHintNoContact");
    const statusMessage = engineerContextMessage(contactHint);

    setEngineerStatus(`${statusMessage} ${ui("engineerSaving")}`);
    try {
        const response = await fetch("/api/engineer-request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contact: {
                    name: answers.contact_name || "",
                    email: answers.contact_email || "",
                    info: answers.contact_info || "",
                },
                answers: JSON.parse(JSON.stringify(answers)),
                recommendations: latestRecommendations.slice(0, 3).map((item) => ({
                    product_id: item.product_id,
                    model_name_variant: item.model_name_variant,
                    manufacturer: item.manufacturer,
                    product_family: item.product_family,
                    match_percent: item.match_percent,
                    engineer_review: item.engineer_review,
                })),
                conflict: latestConflict,
            }),
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data.ok) {
            throw new Error(data.message || "save failed");
        }
        setEngineerStatus(`${statusMessage} ${ui("engineerSaved")}`);
    } catch (error) {
        setEngineerStatus(`${statusMessage} ${ui("engineerSaveFailed")}`, true);
    }
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
                </tr>
            </thead>
            <tbody>
                ${top
                    .map((item) => `
                        <tr>
                            <td>${escapeHtml(item.model_name_variant || item.product_id || ui("notAvailable"))}</td>
                            <td>${escapeHtml(translateProductText(item.energy_range || ui("notAvailable")))}</td>
                            <td>${escapeHtml(translateProductText(item.pixel_size || ui("notAvailable")))}</td>
                            <td>${escapeHtml(translateProductText(item.active_area || ui("notAvailable")))}</td>
                        </tr>
                    `)
                    .join("")}
            </tbody>
        </table>
    `;
    translateRenderedEnglishText(els.compareGrid);
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function translateRenderedEnglishText(root = document.body) {
    if (currentLanguage !== "zh" || !root) return;

    const skipTags = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "OPTION", "CODE"]);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || skipTags.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
            if (!/[A-Za-z]/.test(node.nodeValue || "")) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
        node.nodeValue = translateProductText(node.nodeValue);
    });
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

function bestChoiceByTerms(groupId, text, source = answers) {
    const choices = visibleChoicesForGroup(groupId, source);
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

function extractEnergyFromText(text, source = answers) {
    const exactMatch = text.match(/(\d+(?:\.\d+)?)\s*(mev|kev|ev)\b/);
    const exactEnergy = exactMatch ? `${exactMatch[1]} ${exactMatch[2]}` : "";

    if (/\bcr\b|cr-k|5\.4/.test(text)) {
        return { energy: "low_energy_lab", target: "cr_ka", exact_energy: exactEnergy || "5.4 keV" };
    }
    if (/\bcu\b|cu-k|8\.04/.test(text)) {
        return { energy: "low_energy_lab", target: "cu_ka", exact_energy: exactEnergy || "8.04 keV" };
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
    if (/alpha|beta/.test(text)) {
        return { energy: "alpha_beta_particles", target: null, exact_energy: exactEnergy };
    }
    if (/neutron/.test(text)) {
        return { energy: "neutron_source", target: null, exact_energy: exactEnergy };
    }
    if (/cosmic|muon|mixed radiation/.test(text)) {
        return { energy: "cosmic_mixed_radiation", target: null, exact_energy: exactEnergy };
    }
    if (/ion beam|particle beam|beam diagnostics/.test(text)) {
        return { energy: "ion_particle_beam", target: null, exact_energy: exactEnergy };
    }
    if (/gamma/.test(text)) {
        return { energy: "gamma_source", target: null, exact_energy: exactEnergy };
    }
    if (/photon[- ]counting|energy[- ]resolved|energy discriminating|spectral setup|medipix|timepix/.test(text)) {
        return { energy: "photon_counting_energy_resolved_setup", target: null, exact_energy: exactEnergy };
    }
    if (/synchrotron|beamline|rixs|xanes|exafs/.test(text)) {
        return { energy: "synchrotron_beamline", target: null, exact_energy: exactEnergy };
    }
    if (/\bhhg\b|high[- ]harmonic|high harmonic|ultrafast/.test(text)) {
        return { energy: "hhg_source", target: null, exact_energy: exactEnergy };
    }
    if (/laser[- ]produced plasma|\blpp\b|laser plasma/.test(text)) {
        return { energy: "laser_plasma_source", target: null, exact_energy: exactEnergy };
    }
    if (/discharge[- ]produced plasma|\bdpp\b|discharge plasma|euv lithography/.test(text)) {
        return { energy: "discharge_plasma_source", target: null, exact_energy: exactEnergy };
    }
    if (/soft x-ray tube|soft xray tube|lab soft x-ray|low[- ]energy soft/.test(text)) {
        return { energy: "low_energy_soft_xray_tube", target: null, exact_energy: exactEnergy };
    }
    if (/euv|vuv|soft x-ray|sxr/.test(text)) {
        return { energy: "euv_vuv_soft", target: null, exact_energy: exactEnergy };
    }
    if (/microfocus|micro-focus|small focus/.test(text)) {
        return { energy: "microfocus_xray_source", target: null, exact_energy: exactEnergy };
    }
    if (/high[- ]energy industrial|industrial x-ray|industrial source/.test(text)) {
        return { energy: "high_energy_industrial_xray", target: null, exact_energy: exactEnergy };
    }
    if (/standard lab|lab x-ray source|x-ray tube|standard x-ray/.test(text)) {
        return { energy: "standard_lab_xray_source", target: null, exact_energy: exactEnergy };
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

    return { energy: bestChoiceByTerms("energy", text, source), target: null, exact_energy: "" };
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
    const application = bestChoiceByTerms("application", text);
    const energyInfo = extractEnergyFromText(text, { ...answers, application });

    return {
        application,
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
                <strong>${escapeHtml(translateProductText(value))}</strong>
            </div>
        `)
        .join("");
    els.aiExtractedCard.hidden = false;
    translateRenderedEnglishText(els.aiExtractedCard);
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
            const source = aiState.extracted || answers;
            const choices = visibleChoicesForGroup(groupId, source).map((choice) => translatedChoice(groupId, choice, source));
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
    translateRenderedEnglishText(els.aiFollowupsCard);
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
        if (groupId === "energy") {
            if (TARGET_TO_ENERGY_ID[choiceId]) {
                aiState.extracted.target = choiceId;
                aiState.extracted.energy = TARGET_TO_ENERGY_ID[choiceId];
                aiState.extracted.exact_energy = "";
            } else if (choiceId === "exact_energy") {
                aiState.extracted.energy = "exact_energy";
                aiState.extracted.target = null;
                const value = window.prompt(exactEnergyDisplayText(aiState.extracted).prompt, aiState.extracted.exact_energy || "");
                aiState.extracted.exact_energy = (value || "").trim();
            } else if (choiceId === "not_sure_energy") {
                aiState.extracted.energy = "not_sure_energy";
                aiState.extracted.target = null;
                aiState.extracted.exact_energy = "";
            } else {
                aiState.extracted.energy = choiceId;
            }
        } else {
            aiState.extracted[groupId] = choiceId;
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
                <span>${escapeHtml(currentLanguage === "zh" ? `厂商：${item.manufacturer || ui("unknownManufacturer")}` : item.manufacturer || ui("unknownManufacturer"))}</span>
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
    if (conflict.level !== "ok") {
        aiState.recommendations = [];
        aiState.confidence = calculateAiConfidence(aiState.extracted, []);
        renderAiExtractedInfo();
        els.aiResultTitle.textContent = ui("aiNeedsConfirmation");
        els.aiResultNote.textContent = ui("aiConflictClarifyCopy");
        els.aiResultList.innerHTML = `<article class='ai-empty'>${escapeHtml(conflict.message || ui("aiConflictPaused"))}</article>`;
        translateRenderedEnglishText(els.aiResultCard);
        return;
    }

    try {
        const response = await fetch("/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aiAnswers),
        });
        const data = await response.json();

        if (data.conflict?.has_conflict) {
            aiState.recommendations = [];
            aiState.confidence = calculateAiConfidence(aiState.extracted, []);
            renderAiExtractedInfo();
            els.aiResultTitle.textContent = ui("aiNeedsConfirmation");
            els.aiResultNote.textContent = ui("aiConflictClarifyCopy");
            els.aiResultList.innerHTML = `
                <article class='ai-empty'>
                    ${renderConflictSummary(data.conflict)}
                </article>
            `;
            translateRenderedEnglishText(els.aiResultCard);
            return;
        }

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
        translateRenderedEnglishText(els.aiResultCard);
    } catch (error) {
        els.aiResultTitle.textContent = ui("aiErrorTitle");
        els.aiResultNote.textContent = ui("aiErrorCopy");
        els.aiResultList.innerHTML = "";
        translateRenderedEnglishText(els.aiResultCard);
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
    contactStepUnlocked = false;
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

function isValidEmail(value) {
    const email = String(value || "").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function contactValidationMessage() {
    const email = (answers.contact_email || "").trim();
    const info = (answers.contact_info || "").trim();

    if (!email && !info) return ui("contactValidationRequired");
    if (email && !isValidEmail(email)) return ui("contactValidationEmail");
    return "";
}

function isContactValid() {
    return contactValidationMessage() === "";
}

function updateContactValidation() {
    if (!els.contactValidation) return;

    const isContactStep = steps[currentStep]?.id === "contact";
    const message = contactValidationMessage();
    els.contactValidation.textContent = isContactStep ? message : "";
    els.contactValidation.classList.toggle("visible", isContactStep && Boolean(message));

    const hasEmail = Boolean((answers.contact_email || "").trim());
    const hasInfo = Boolean((answers.contact_info || "").trim());
    els.contactEmail?.classList.toggle("invalid", isContactStep && hasEmail && !isValidEmail(answers.contact_email));
    els.contactInfo?.classList.toggle("invalid", isContactStep && !hasEmail && !hasInfo);
}

function canGoNext() {
    const step = steps[currentStep];
    if (step.id === "review") return true;
    if (step.id === "contact") return isContactValid();
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
    sanitizeAdaptiveAnswers();
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
    els.nextButton.disabled = !canGoNext();

    document.querySelector(".subsection")?.remove();
    renderStepOverview();
    renderFlowPosition();
    renderRequirementsSummary();

    if (steps[currentStep].id === "review") {
        renderReview();
    } else if (steps[currentStep].id === "contact") {
        renderContactStep();
    } else {
        renderQuestionStep();
    }

    translateRenderedEnglishText();
    updateContactValidation();
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

els.nextButton.addEventListener("click", async () => {
    if (steps[currentStep].id === "review") {
        if (resultsGenerated) {
            contactStepUnlocked = true;
            currentStep = Math.min(steps.length - 1, currentStep + 1);
            render();
        } else {
            loadRecommendations();
        }
        return;
    }
    if (steps[currentStep].id === "contact") {
        await prepareEngineerRequest();
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
    setEngineerStatus("");
    renderStepOverview();
    updateContactValidation();
    els.nextButton.disabled = !canGoNext();
});
els.contactEmail.addEventListener("input", () => {
    answers.contact_email = els.contactEmail.value.trim();
    setEngineerStatus("");
    renderStepOverview();
    updateContactValidation();
    els.nextButton.disabled = !canGoNext();
});
els.contactInfo.addEventListener("input", () => {
    answers.contact_info = els.contactInfo.value.trim();
    setEngineerStatus("");
    renderStepOverview();
    updateContactValidation();
    els.nextButton.disabled = !canGoNext();
});
els.energyValue.addEventListener("input", () => {
    answers.exact_energy = els.energyValue.value.trim();
    resultsGenerated = false;
    contactStepUnlocked = false;
    renderRequirementsSummary();
    renderStepOverview();
});
els.energySave.addEventListener("click", () => {
    answers.exact_energy = els.dialogEnergyValue.value.trim();
    els.energyValue.value = answers.exact_energy;
    resultsGenerated = false;
    contactStepUnlocked = false;
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
