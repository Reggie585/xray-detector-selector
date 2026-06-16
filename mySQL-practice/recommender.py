import os
import re
import json
from collections import Counter
from pathlib import Path

import mysql.connector


BASE_DIR = Path(__file__).resolve().parent
PRODUCTS_JSON = BASE_DIR / "products.json"

DB_CONFIG = {
    "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
    "port": int(os.getenv("MYSQL_PORT", "3306")),
    "user": os.getenv("MYSQL_USER", "root"),
    "password": os.getenv("MYSQL_PASSWORD", "your_password"),
    "database": os.getenv("MYSQL_DATABASE", "xray_detector_db"),
}


PRODUCT_FIELDS = [
    "product_id",
    "manufacturer",
    "brand",
    "product_family",
    "model_name_variant",
    "product_category",
    "target_market_intended_use",
    "detector_principle",
    "readout_chip_type",
    "sensor_material",
    "sensor_thickness",
    "sensor_type_options",
    "pixel_matrix_sensor_resolution",
    "pixel_size",
    "active_sensitive_area",
    "spatial_resolution_max_resolvable_pattern",
    "minimum_energy_threshold",
    "detectable_energy_radiation_range",
    "energy_resolution",
    "quantum_absorption_efficiency",
    "dynamic_range_counter_depth_bit_depth",
    "dark_current",
    "noise_readout_noise",
    "max_frame_rate_readout_speed_hit_rate",
    "frame_rate_speed_condition",
    "readout_time",
    "measurement_outputs",
    "spectral_imaging_material_discrimination",
    "tdi_continuous_scanning",
    "particle_tracking_radiation_type_id",
    "data_interface",
    "connector_type",
    "software",
    "os_support",
    "sdk_drivers",
    "network_multi_detector_operation",
    "trigger_i_o",
    "cooling_temperature_control",
    "ip_rating_environmental_protection",
    "vacuum_compatibility",
    "dimensions",
    "weight",
    "typical_applications",
    "industry_tags",
    "customization_oem",
    "source_document_s",
    "source_page_notes",
    "data_confidence_conflict_notes",
]


CHOICE_GROUPS = {
    "application": {
        "title": "Application & Result",
        "question": "What are you trying to measure?",
        "max_choices": 1,
        "choices": [
            {
                "id": "xrd_saxs_waxs",
                "label": "XRD / SAXS / WAXS",
                "description": "Diffraction patterns from powder, crystal, thin film, polymer, alloy, or structural samples.",
                "terms": ["xrd", "saxs", "waxs", "diffraction", "powder", "crystal", "thin film"],
                "technical": "Diffraction pattern measurement; detector should fit lab or beamline diffraction geometry.",
            },
            {
                "id": "xafs_absorption",
                "label": "XAFS / Absorption Spectroscopy",
                "description": "XANES, EXAFS, edge scans, transmission, or absorption measurements.",
                "terms": ["xafs", "xanes", "exafs", "absorption", "transmission", "edge scan"],
                "technical": "Absorption spectrum workflow; spectroscopy-capable detector and source-energy fit matter.",
            },
            {
                "id": "euv_soft_xray_spectroscopy",
                "label": "EUV / Soft X-ray Spectroscopy",
                "description": "EUV, VUV, soft X-ray, plasma emission, HHG, or weak-signal spectroscopy.",
                "terms": ["euv", "vuv", "soft x-ray", "sxr", "plasma", "hhg", "spectroscopy", "weak signal"],
                "technical": "Vacuum-facing, high-QE, low-noise CCD or sCMOS style detector is likely.",
            },
            {
                "id": "xray_euv_imaging",
                "label": "X-ray / EUV Imaging",
                "description": "2D image capture, XRF imaging, CDI, ptychography, or general scientific imaging.",
                "terms": ["imaging", "2d", "xrf", "cdi", "ptychography", "euv", "x-ray imaging"],
                "technical": "2D scientific image output; CCD, sCMOS, or photon-counting options remain open.",
            },
            {
                "id": "microscopy_metrology",
                "label": "X-ray Microscopy / Metrology",
                "description": "Micron or submicron imaging, small samples, high-resolution CT, or dimensional inspection.",
                "terms": ["microscopy", "metrology", "micron", "submicron", "high-resolution", "inspection"],
                "technical": "Small pixel size, optical coupling, and spatial resolution should be prioritized.",
            },
            {
                "id": "ct_3d",
                "label": "CT / 3D Imaging",
                "description": "Reconstructing a 3D volume of a sample or component.",
                "terms": ["ct", "3d", "tomography", "volume", "reconstruction"],
                "technical": "Stable imaging detector with suitable field of view and scan speed.",
            },
            {
                "id": "industrial_ndt",
                "label": "Industrial NDT",
                "description": "Welds, pipes, valves, batteries, electronics, composites, castings, or industrial parts.",
                "terms": ["ndt", "industrial", "weld", "pipe", "battery", "electronics", "composite", "casting"],
                "technical": "Robust industrial detector; high-energy compatibility may matter.",
            },
            {
                "id": "material_identification",
                "label": "Material Identification",
                "description": "Energy-resolved or color X-ray imaging to separate materials.",
                "terms": ["energy-resolved", "energy-discriminating", "material discrimination", "spectral x-ray", "color radiography", "threshold", "photon-counting", "medipix", "timepix"],
                "technical": "Photon-counting or energy-discriminating detector preferred.",
            },
            {
                "id": "radiation_particle",
                "label": "Radiation Monitoring / Particle Tracking",
                "description": "Alpha, beta, gamma, neutron, cosmic rays, source localization, or particle tracks.",
                "terms": ["radiation", "particle", "alpha", "beta", "gamma", "neutron", "cosmic", "timepix"],
                "technical": "Single-event or Timepix-style detector is likely.",
            },
            {
                "id": "education_demo",
                "label": "Education / Demonstration",
                "description": "Classroom experiments, simple radiation visualization, or teaching particle physics.",
                "terms": ["education", "classroom", "demo", "teaching", "edx", "minipix edu"],
                "technical": "Entry-level portable detector with simple software.",
            },
            {
                "id": "not_sure_application",
                "label": "Not sure",
                "description": "Keep the first filter broad and continue with the next choices.",
                "terms": [],
                "technical": "Broad search; later answers will drive the ranking.",
            },
        ],
    },
    "energy": {
        "title": "Source Energy & Sample",
        "question": "What X-ray source or energy range are you using?",
        "max_choices": 1,
        "choices": [
            {
                "id": "euv_vuv_soft",
                "label": "EUV / VUV / Soft X-ray",
                "description": "Below about 1 keV, vacuum work, or soft X-ray experiments.",
                "terms": ["euv", "vuv", "soft x-ray", "sxr", "vacuum", "high qe"],
                "technical": "Low-energy response, high QE, and vacuum compatibility are important.",
            },
            {
                "id": "low_energy_lab",
                "label": "Low-energy lab X-ray",
                "description": "Cr-Kalpha, Cu-Kalpha, W-Lalpha, or similar 5-9 keV sources.",
                "terms": ["cr", "cu", "w-l", "5.4", "8.04", "8.4", "low energy", "lab x-ray"],
                "technical": "Good low-energy response around 5-9 keV.",
            },
            {
                "id": "standard_xrd",
                "label": "Standard XRD source",
                "description": "Common laboratory XRD sources such as Cu-Kalpha or Mo-Kalpha.",
                "terms": ["xrd", "cu", "mo", "8.04", "17.4", "diffraction", "lab"],
                "technical": "Standard lab diffraction energy range.",
            },
            {
                "id": "higher_energy_lab",
                "label": "Higher-energy lab X-ray",
                "description": "Mo, Rh, Ag, or similar higher-energy targets around 17-22 keV.",
                "terms": ["mo", "rh", "ag", "17.4", "20.2", "22.2", "higher energy", "penetration"],
                "technical": "Higher-energy response and sensor thickness/material matter.",
            },
            {
                "id": "hard_xray",
                "label": "Hard X-ray / High penetration",
                "description": "30-150 keV, thick samples, dense metals, or industrial inspection.",
                "terms": ["hard x-ray", "hxr", "30", "150", "high penetration", "dense", "cdte", "industrial"],
                "technical": "High-energy-compatible sensor or detector design preferred.",
            },
            {
                "id": "gamma_neutron_particles",
                "label": "Gamma / Neutron / Particles",
                "description": "Radiation monitoring, neutron conversion, gamma imaging, or source localization.",
                "terms": ["gamma", "neutron", "alpha", "beta", "particle", "radiation", "timepix"],
                "technical": "Particle/radiation detector or converter layer may be required.",
            },
            {
                "id": "exact_energy",
                "label": "I know the exact energy",
                "description": "Enter an exact value in eV, keV, or MeV on the review page.",
                "terms": [],
                "technical": "Exact-energy filter can be reviewed by an engineer if product ranges are textual.",
            },
            {
                "id": "not_sure_energy",
                "label": "Not sure",
                "description": "Avoid over-filtering by source energy.",
                "terms": [],
                "technical": "Energy kept broad.",
            },
        ],
    },
    "target": {
        "title": "Optional Target",
        "question": "Known lab target",
        "max_choices": 1,
        "optional": True,
        "choices": [
            {"id": "cr_ka", "label": "Cr-Kalpha", "description": "5.4 keV", "terms": ["cr", "5.4"], "technical": "Cr-Kalpha, about 5.4 keV."},
            {"id": "cu_ka", "label": "Cu-Kalpha", "description": "8.04 keV", "terms": ["cu", "8.04"], "technical": "Cu-Kalpha, about 8.04 keV."},
            {"id": "w_la", "label": "W-Lalpha", "description": "8.4 keV", "terms": ["w-l", "8.4"], "technical": "W-Lalpha, about 8.4 keV."},
            {"id": "mo_ka", "label": "Mo-Kalpha", "description": "17.4 keV", "terms": ["mo", "17.4"], "technical": "Mo-Kalpha, about 17.4 keV."},
            {"id": "rh_ka", "label": "Rh-Kalpha", "description": "20.2 keV", "terms": ["rh", "20.2"], "technical": "Rh-Kalpha, about 20.2 keV."},
            {"id": "ag_ka", "label": "Ag-Kalpha", "description": "22.2 keV", "terms": ["ag", "22.2"], "technical": "Ag-Kalpha, about 22.2 keV."},
        ],
    },
    "pixel_size": {
        "title": "Pixel Size",
        "question": "What pixel size range do you need?",
        "max_choices": 1,
        "choices": [
            {
                "id": "pixel_under_1",
                "label": "Under 1 micrometer",
                "description": "For submicron detail, microscopy, metrology, or very fine spatial resolution.",
                "terms": ["submicron", "sub-micron", "nanometer", "nm", "microscopy", "metrology"],
                "technical": "Prefer pixel sizes below 1 micrometer.",
            },
            {
                "id": "pixel_1_30",
                "label": "1 to 30 micrometers",
                "description": "For fine scientific imaging, CCD/sCMOS cameras, and high-resolution detector choices.",
                "terms": ["scientific", "ccd", "scmos", "imaging", "small pixel", "high resolution"],
                "technical": "Prefer pixel sizes from 1 to 30 micrometers.",
            },
            {
                "id": "pixel_30_100",
                "label": "30 to 100 micrometers",
                "description": "For photon-counting detectors, larger-pixel sensors, signal collection, or higher-energy work.",
                "terms": ["photon-counting", "timepix", "medipix", "large pixel", "signal", "high energy"],
                "technical": "Prefer pixel sizes from 30 to 100 micrometers.",
            },
            {
                "id": "not_sure_pixel",
                "label": "I don't know",
                "description": "Do not filter strongly by pixel size.",
                "terms": [],
                "technical": "Pixel size kept broad.",
            },
        ],
    },
    "performance": {
        "title": "Performance Priority",
        "question": "What matters most for your measurement?",
        "max_choices": 2,
        "choices": [
            {
                "id": "highest_resolution",
                "label": "Highest resolution",
                "description": "Submicron or micron-level detail, small structures, microscopy, or metrology.",
                "terms": ["small pixel", "micron", "submicron", "high resolution", "microscopy", "metrology"],
                "technical": "Small pixel size and spatial resolution prioritized.",
            },
            {
                "id": "large_fov",
                "label": "Large field of view",
                "description": "Large samples, active area, CT, industrial parts, or faster coverage.",
                "terms": ["large area", "large active", "wide", "field of view", "widepix", "flat panel", "ct"],
                "technical": "Large active area and coverage prioritized.",
            },
            {
                "id": "fast_imaging",
                "label": "Fast imaging",
                "description": "Dynamic processes, real-time video, quick scans, or high-throughput measurements.",
                "terms": ["fast", "high speed", "frame rate", "fps", "real-time", "mhz", "high-throughput"],
                "technical": "Frame rate, readout speed, and throughput prioritized.",
            },
            {
                "id": "weak_signal_low_noise",
                "label": "Weak signal / low noise",
                "description": "Very weak X-ray/EUV signals, long exposure, low flux, spectroscopy, or high sensitivity.",
                "terms": ["low noise", "dark current", "deep cooling", "-90", "-100", "weak signal", "high qe"],
                "technical": "Low dark current, deep cooling, and sensitivity prioritized.",
            },
            {
                "id": "energy_resolved",
                "label": "Energy-resolved imaging",
                "description": "Spectral imaging, material separation, or color X-ray images.",
                "terms": ["spectral", "energy-resolved", "material", "color", "threshold", "medipix", "timepix"],
                "technical": "Photon-counting or energy-threshold detector prioritized.",
            },
            {
                "id": "high_dynamic_range",
                "label": "High dynamic range",
                "description": "Strong and weak signals in the same image, or avoiding saturation.",
                "terms": ["dynamic range", "bit depth", "18-bit", "24-bit", "counter depth", "saturation"],
                "technical": "High bit depth or counter depth prioritized.",
            },
            {
                "id": "single_event",
                "label": "Single photon / particle sensitivity",
                "description": "Single-particle tracks, radiation monitoring, cosmic rays, alpha, beta, gamma, or neutron detection.",
                "terms": ["single photon", "particle", "track", "timepix", "alpha", "beta", "gamma", "neutron"],
                "technical": "Single-event detection prioritized.",
            },
            {
                "id": "balanced",
                "label": "Balanced performance",
                "description": "General research detector without one extreme priority.",
                "terms": ["research", "general", "balanced"],
                "technical": "Balanced detector fit.",
            },
            {
                "id": "not_sure_performance",
                "label": "Not sure",
                "description": "Infer priority from the application and source.",
                "terms": [],
                "technical": "Performance kept broad.",
            },
        ],
    },
    "installation": {
        "title": "Installation & Control",
        "question": "Where and how will the detector be used?",
        "max_choices": 1,
        "choices": [
            {
                "id": "simple_lab",
                "label": "Simple lab setup",
                "description": "Normal lab use in air, easy installation, and ready-to-use software.",
                "terms": ["usb", "ethernet", "software", "windows", "lab", "air"],
                "technical": "Standard software and USB/Ethernet style setup preferred.",
            },
            {
                "id": "vacuum_uhv",
                "label": "Vacuum / UHV chamber",
                "description": "Vacuum chambers, beamlines, EUV/VUV/soft X-ray experiments, or internal-vacuum camera use.",
                "terms": ["vacuum", "uhv", "flange", "cf", "10^-10", "bake-out", "euv", "vuv"],
                "technical": "Vacuum compatibility, flange options, and cooling are important.",
            },
            {
                "id": "industrial_oem",
                "label": "Industrial machine / OEM",
                "description": "Commercial instrument, factory system, or custom machine integration.",
                "terms": ["industrial", "oem", "sdk", "trigger", "ethernet", "api", "customization"],
                "technical": "SDK/API, trigger I/O, and robust integration prioritized.",
            },
            {
                "id": "inline_robot",
                "label": "Inline / robot inspection",
                "description": "Continuous scanning, robot CT, conveyor inspection, or large structure inspection.",
                "terms": ["inline", "robot", "continuous", "tdi", "scanning", "poe", "ethernet", "inspection"],
                "technical": "Continuous scanning, active area, and robust interface prioritized.",
            },
            {
                "id": "portable_field",
                "label": "Portable / field use",
                "description": "Field measurements, temporary setup, radiation checks, or easy transport.",
                "terms": ["portable", "field", "usb", "low power", "compact", "small", "light"],
                "technical": "Size, weight, power, and simple connection prioritized.",
            },
            {
                "id": "classroom",
                "label": "Classroom / education",
                "description": "Students, demonstrations, simple experiments, and easy operation.",
                "terms": ["education", "classroom", "simple", "student", "demo", "edx"],
                "technical": "Entry-level detector and simple software preferred.",
            },
            {
                "id": "beamline_advanced",
                "label": "Beamline / advanced research",
                "description": "Synchrotron, automation, trigger synchronization, EPICS, Tango, or Python control.",
                "terms": ["beamline", "synchrotron", "trigger", "epics", "tango", "python", "sdk", "automation"],
                "technical": "Trigger, SDK, EPICS/Tango/Python support prioritized.",
            },
            {
                "id": "not_sure_installation",
                "label": "Not sure",
                "description": "Keep installation filters broad and show notes in the result.",
                "terms": [],
                "technical": "Installation kept broad.",
            },
        ],
    },
}


SEARCH_FIELDS = {
    "application": [
        "product_category",
        "target_market_intended_use",
        "detector_principle",
        "measurement_outputs",
        "typical_applications",
        "industry_tags",
    ],
    "energy": [
        "sensor_material",
        "sensor_thickness",
        "minimum_energy_threshold",
        "detectable_energy_radiation_range",
        "typical_applications",
        "industry_tags",
    ],
    "target": [
        "detectable_energy_radiation_range",
        "target_market_intended_use",
        "typical_applications",
        "source_page_notes",
    ],
    "pixel_size": [
        "pixel_size",
        "spatial_resolution_max_resolvable_pattern",
        "detector_principle",
        "product_category",
        "typical_applications",
        "industry_tags",
    ],
    "performance": [
        "pixel_size",
        "active_sensitive_area",
        "spatial_resolution_max_resolvable_pattern",
        "quantum_absorption_efficiency",
        "dark_current",
        "noise_readout_noise",
        "max_frame_rate_readout_speed_hit_rate",
        "dynamic_range_counter_depth_bit_depth",
        "spectral_imaging_material_discrimination",
        "particle_tracking_radiation_type_id",
        "measurement_outputs",
    ],
    "installation": [
        "data_interface",
        "connector_type",
        "software",
        "sdk_drivers",
        "trigger_i_o",
        "cooling_temperature_control",
        "vacuum_compatibility",
        "dimensions",
        "weight",
        "customization_oem",
    ],
}


GROUP_WEIGHTS = {
    "application": 10,
    "energy": 14,
    "target": 8,
    "pixel_size": 14,
    "performance": 5,
    "installation": 2,
}

STRICT_MATCH_WEIGHTS = {
    "energy": 30,
    "pixel_size": 30,
    "application": 22,
    "performance": 12,
    "installation": 6,
}


LAB_XRD_ENERGY_IDS = {"low_energy_lab", "standard_xrd", "higher_energy_lab"}
LAB_TARGET_IDS = {"cr_ka", "cu_ka", "w_la", "mo_ka", "rh_ka", "ag_ka"}
HIGH_HARD_ENERGY_IDS = {"higher_energy_lab", "hard_xray"}
EXACT_ENERGY_WEIGHT = 8
SAME_BRAND_ADVANTAGE_PERCENT = 8
SAME_BRAND_ADVANTAGE_SCORE = 2
ENERGY_FIELDS = [
    "minimum_energy_threshold",
    "detectable_energy_radiation_range",
    "sensor_material",
    "sensor_thickness",
    "typical_applications",
    "industry_tags",
]


def is_lab_xrd_request(answers):
    if answers.get("application") != "xrd_saxs_waxs":
        return False

    exact_energy = parse_energy_to_kev(answers.get("exact_energy"))
    return (
        answers.get("energy") in LAB_XRD_ENERGY_IDS
        or answers.get("target") in LAB_TARGET_IDS
        or (answers.get("energy") == "exact_energy" and exact_energy is not None and 1 <= exact_energy <= 30)
    )


def is_ccd_camera(product):
    text = field_text(
        product,
        [
            "product_category",
            "detector_principle",
            "readout_chip_type",
            "sensor_type_options",
            "product_family",
            "model_name_variant",
        ],
    )
    return "ccd" in text


def should_exclude_product(product, answers):
    # For lab XRD/SAXS/WAXS source selection, users normally expect diffraction
    # or photon-counting detectors, not broad scientific CCD camera families.
    if is_lab_xrd_request(answers) and is_ccd_camera(product):
        return True

    energy_fit = exact_energy_fit(product, answers)
    if energy_fit["known_incompatible"]:
        return True

    return False


def get_brand_key(product):
    raw = first_value(product, "brand", "manufacturer")
    raw = re.split(r"[/|;,()]", raw.lower())[0]
    key = re.sub(r"[^a-z0-9]+", "", raw)
    return key or normalize(product.get("manufacturer"))


def parse_energy_to_kev(value):
    text = normalize(value)
    match = re.search(r"(\d+(?:\.\d+)?)\s*(mev|kev|ev)?", text)
    if not match:
        return None

    number = float(match.group(1))
    unit = match.group(2) or "kev"
    if unit == "mev":
        return number * 1000
    if unit == "ev":
        return number / 1000
    return number


def convert_energy_number(number, unit):
    unit = (unit or "kev").lower()
    if unit == "mev":
        return number * 1000
    if unit == "ev":
        return number / 1000
    return number


def extract_energy_ranges(text):
    cleaned = normalize(text)
    cleaned = cleaned.replace("–", "-").replace("—", "-").replace("－", "-")
    cleaned = cleaned.replace("至", "-").replace("到", "-")
    pattern = re.compile(
        r"(\d+(?:\.\d+)?)\s*(mev|kev|ev)?\s*(?:-|~|to)\s*"
        r"(\d+(?:\.\d+)?)\s*(mev|kev|ev)"
    )

    ranges = []
    for match in pattern.finditer(cleaned):
        first = float(match.group(1))
        first_unit = match.group(2) or match.group(4)
        second = float(match.group(3))
        second_unit = match.group(4)
        low = convert_energy_number(first, first_unit)
        high = convert_energy_number(second, second_unit)
        ranges.append((min(low, high), max(low, high)))
    return ranges


def text_energy_family_matches(text, energy_kev):
    if energy_kev is None:
        return False
    if energy_kev < 1:
        return any(term in text for term in ["euv", "vuv", "soft x-ray", "sxr"])
    if energy_kev <= 30:
        return any(term in text for term in ["x-ray", "xrd", "saxs", "waxs", "sxr", "hxr", "kev"])
    return any(term in text for term in ["hard", "hxr", "high", "gamma", "cdte", "500 kev", "mev"])


def exact_energy_fit(product, answers):
    if answers.get("energy") != "exact_energy":
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
            "known_incompatible": False,
        }

    energy_kev = parse_energy_to_kev(answers.get("exact_energy"))
    if energy_kev is None:
        return {
            "matched": 0,
            "possible": EXACT_ENERGY_WEIGHT,
            "reason": None,
            "known_incompatible": False,
        }

    text = field_text(product, ENERGY_FIELDS)
    ranges = extract_energy_ranges(text)
    if ranges:
        if any(low <= energy_kev <= high for low, high in ranges):
            return {
                "matched": EXACT_ENERGY_WEIGHT,
                "possible": EXACT_ENERGY_WEIGHT,
                "reason": f"Exact energy fits documented range: {answers.get('exact_energy')}",
                "known_incompatible": False,
            }
        return {
            "matched": 0,
            "possible": EXACT_ENERGY_WEIGHT,
            "reason": None,
            "known_incompatible": True,
        }

    if text_energy_family_matches(text, energy_kev):
        return {
            "matched": EXACT_ENERGY_WEIGHT // 2,
            "possible": EXACT_ENERGY_WEIGHT,
            "reason": f"Energy family appears compatible with {answers.get('exact_energy')}",
            "known_incompatible": False,
        }

    return {
        "matched": 0,
        "possible": EXACT_ENERGY_WEIGHT,
        "reason": None,
        "known_incompatible": False,
    }


def get_db_connection():
    return mysql.connector.connect(**DB_CONFIG)


def get_products_from_json():
    if not PRODUCTS_JSON.exists():
        return []
    with PRODUCTS_JSON.open("r", encoding="utf-8") as file:
        return json.load(file)


def get_products():
    columns = ", ".join(f"`{field}`" for field in PRODUCT_FIELDS)
    sql = f"SELECT {columns} FROM database_wide_updated"
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute(sql)
        rows = cursor.fetchall()
        cursor.close()
        db.close()
        return rows
    except mysql.connector.Error:
        return get_products_from_json()


def get_choice(group_id, choice_id):
    if not choice_id:
        return None
    group = CHOICE_GROUPS.get(group_id, {})
    for choice in group.get("choices", []):
        if choice["id"] == choice_id:
            return choice
    return None


def get_choices(group_id, choice_ids):
    if isinstance(choice_ids, str):
        choice_ids = [choice_ids]
    if not choice_ids:
        return []
    return [choice for choice_id in choice_ids if (choice := get_choice(group_id, choice_id))]


def get_selection_conflict(answers):
    energy_id = answers.get("energy")
    pixel_id = answers.get("pixel_size")
    exact_energy_kev = parse_energy_to_kev(answers.get("exact_energy")) if energy_id == "exact_energy" else None
    is_high_or_hard_energy = (
        energy_id in HIGH_HARD_ENERGY_IDS
        or (exact_energy_kev is not None and exact_energy_kev >= 17)
    )

    if pixel_id == "pixel_under_1" and is_high_or_hard_energy:
        energy_choice = get_choice("energy", energy_id)
        pixel_choice = get_choice("pixel_size", pixel_id)
        energy_label = (
            f"{exact_energy_kev:g} keV"
            if exact_energy_kev is not None
            else (energy_choice or {}).get("label", "high/hard X-ray")
        )
        pixel_label = (pixel_choice or {}).get("label", "under 1 micrometer")
        return {
            "has_conflict": True,
            "title": "Conflicting energy and pixel-size choices",
            "message": (
                f"{energy_label} and {pixel_label} are not a practical detector-selection pair. "
                "High/hard X-ray measurements usually need thicker sensors, scintillators, or photon-counting detector geometries, "
                "while sub-1 micrometer effective pixels are normally associated with microscopy optics and lower-energy imaging setups. "
                "Please change either the energy range or the pixel-size requirement before viewing product matches."
            ),
        }

    return {
        "has_conflict": False,
        "title": "",
        "message": "",
    }


def normalize(value):
    return str(value or "").lower()


def field_text(product, fields):
    return " | ".join(normalize(product.get(field)) for field in fields)


def count_term_matches(text, terms):
    matches = []
    for term in terms:
        clean_term = normalize(term)
        if clean_term and clean_term in text:
            matches.append(term)
    return matches


def first_value(product, *fields):
    for field in fields:
        value = product.get(field)
        if value not in (None, ""):
            return str(value)
    return "N/A"


def application_fit(product, answers):
    choice = get_choice("application", answers.get("application"))
    if not choice or not choice.get("terms"):
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
        }

    weight = GROUP_WEIGHTS["application"]
    if choice["id"] == "material_identification":
        text = field_text(
            product,
            [
                "product_category",
                "product_family",
                "detector_principle",
                "measurement_outputs",
                "spectral_imaging_material_discrimination",
                "industry_tags",
            ],
        )
        capability_text = normalize(product.get("spectral_imaging_material_discrimination"))
        explicit_no = (
            "not photon-counting" in capability_text
            or "not photon counting" in capability_text
            or capability_text in {"n/a", "na", "none", "no"}
        )
        positive_terms = [
            "energy-resolved",
            "energy resolved",
            "energy-discriminating",
            "energy discriminating",
            "material discrimination",
            "material-sensitive",
            "material sensitive",
            "spectral x-ray",
            "spectral / material",
            "color radiography",
            "colour radiography",
            "photon-counting",
            "photon counting",
            "energy-threshold",
            "threshold",
            "medipix",
            "timepix",
            "chromatic",
        ]
        matches = [] if explicit_no else count_term_matches(text, positive_terms)
        if matches:
            return {
                "matched": weight,
                "possible": weight,
                "reason": f"{CHOICE_GROUPS['application']['title']}: {', '.join(matches[:3])}",
            }
        return {
            "matched": 0,
            "possible": weight,
            "reason": None,
        }

    text = field_text(product, SEARCH_FIELDS["application"])
    matches = count_term_matches(text, choice["terms"])
    return {
        "matched": weight if matches else 0,
        "possible": weight,
        "reason": f"{CHOICE_GROUPS['application']['title']}: {', '.join(matches[:3])}" if matches else None,
    }


def parse_first_number(value):
    match = re.search(r"\d+(?:\.\d+)?", str(value or ""))
    return float(match.group()) if match else None


def parse_pixel_size_micrometers(value):
    text = normalize(value)
    match = re.search(r"\d+(?:\.\d+)?", text)
    if not match:
        return None

    number = float(match.group())
    if "nm" in text or "nanometer" in text:
        return number / 1000
    if "mm" in text or "millimeter" in text:
        return number * 1000
    return number


def pixel_size_fit(product, answers):
    choice = get_choice("pixel_size", answers.get("pixel_size"))
    if not choice or not choice.get("terms"):
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
        }

    pixel_value = parse_pixel_size_micrometers(product.get("pixel_size"))
    text = field_text(product, SEARCH_FIELDS["pixel_size"])
    matched = False

    if choice["id"] == "pixel_under_1":
        matched = pixel_value is not None and pixel_value < 1
    elif choice["id"] == "pixel_1_30":
        matched = pixel_value is not None and 1 <= pixel_value <= 30
    elif choice["id"] == "pixel_30_100":
        matched = pixel_value is not None and 30 <= pixel_value <= 100

    if not matched:
        matches = count_term_matches(text, choice["terms"])
        matched = bool(matches)

    return {
        "matched": GROUP_WEIGHTS["pixel_size"] if matched else 0,
        "possible": GROUP_WEIGHTS["pixel_size"],
        "reason": f"Pixel fit: {choice['label']} ({product.get('pixel_size') or 'pixel size not listed'})" if matched else None,
    }


def special_numeric_boost(product, selected_ids):
    score = 0
    reasons = []
    matched_ids = set()

    pixel_size = parse_pixel_size_micrometers(product.get("pixel_size"))
    active_area = parse_first_number(product.get("active_sensitive_area"))

    if "highest_resolution" in selected_ids and pixel_size is not None and pixel_size <= 10:
        score += 4
        matched_ids.add("highest_resolution")
        reasons.append(f"small pixel size: {product.get('pixel_size')}")

    if "large_fov" in selected_ids and active_area is not None and active_area >= 40:
        score += 3
        matched_ids.add("large_fov")
        reasons.append(f"large active area: {product.get('active_sensitive_area')}")

    if "weak_signal_low_noise" in selected_ids:
        cooling_text = normalize(product.get("cooling_temperature_control"))
        dark_text = normalize(product.get("dark_current"))
        if "-90" in cooling_text or "-100" in cooling_text or "deep" in cooling_text:
            score += 3
            matched_ids.add("weak_signal_low_noise")
            reasons.append("deep cooling / low-noise operation")
        if "low" in dark_text or "dark current" in dark_text:
            score += 2
            matched_ids.add("weak_signal_low_noise")
            reasons.append("dark-current or low-noise data available")

    return score, reasons, matched_ids


def score_product(product, answers):
    score = 0
    match_points = 0
    possible_points = 0
    tie_breaker = 0
    reasons = []
    breakdown = {
        "application": {"matched": 0, "possible": 0},
        "energy": {"matched": 0, "possible": 0},
        "pixel_size": {"matched": 0, "possible": 0},
        "performance": {"matched": 0, "possible": 0},
        "installation": {"matched": 0, "possible": 0},
    }
    selected_performance_ids = set(answers.get("performance") or [])
    matched_performance_ids = set()

    app_fit = application_fit(product, answers)
    if app_fit["possible"]:
        possible_points += app_fit["possible"]
        breakdown["application"]["possible"] += app_fit["possible"]
        if app_fit["matched"]:
            match_points += app_fit["matched"]
            score += app_fit["matched"]
            breakdown["application"]["matched"] += app_fit["matched"]
            tie_breaker += 0.3
            if app_fit["reason"]:
                reasons.append(app_fit["reason"])

    for group_id in ["energy", "target", "installation"]:
        choice = get_choice(group_id, answers.get(group_id))
        if not choice or not choice.get("terms"):
            continue

        bucket = "energy" if group_id == "target" else group_id
        weight = GROUP_WEIGHTS[group_id]
        possible_points += weight
        breakdown[bucket]["possible"] += weight
        text = field_text(product, SEARCH_FIELDS[group_id])
        matches = count_term_matches(text, choice["terms"])
        if matches:
            match_points += weight
            score += weight
            breakdown[bucket]["matched"] += weight
            tie_breaker += min(len(matches), 3) * 0.1
            reasons.append(f"{CHOICE_GROUPS[group_id]['title']}: {', '.join(matches[:3])}")

    energy_fit = exact_energy_fit(product, answers)
    if energy_fit["possible"]:
        possible_points += energy_fit["possible"]
        breakdown["energy"]["possible"] += energy_fit["possible"]
        if energy_fit["matched"]:
            match_points += energy_fit["matched"]
            score += energy_fit["matched"]
            breakdown["energy"]["matched"] += energy_fit["matched"]
            if energy_fit["reason"]:
                reasons.append(energy_fit["reason"])

    pixel_fit = pixel_size_fit(product, answers)
    if pixel_fit["possible"]:
        possible_points += pixel_fit["possible"]
        breakdown["pixel_size"]["possible"] += pixel_fit["possible"]
        if pixel_fit["matched"]:
            match_points += pixel_fit["matched"]
            score += pixel_fit["matched"]
            breakdown["pixel_size"]["matched"] += pixel_fit["matched"]
            tie_breaker += 0.4
            if pixel_fit["reason"]:
                reasons.append(pixel_fit["reason"])

    for choice in get_choices("performance", answers.get("performance")):
        if not choice.get("terms"):
            continue
        weight = GROUP_WEIGHTS["performance"]
        possible_points += weight
        breakdown["performance"]["possible"] += weight
        text = field_text(product, SEARCH_FIELDS["performance"])
        matches = count_term_matches(text, choice["terms"])
        if matches:
            match_points += weight
            score += weight
            breakdown["performance"]["matched"] += weight
            matched_performance_ids.add(choice["id"])
            tie_breaker += min(len(matches), 3) * 0.1
            reasons.append(f"Performance: {choice['label']}")

    numeric_score, numeric_reasons, numeric_ids = special_numeric_boost(product, selected_performance_ids)
    tie_breaker += numeric_score * 0.1
    reasons.extend(numeric_reasons)

    for performance_id in numeric_ids - matched_performance_ids:
        if performance_id in selected_performance_ids:
            weight = GROUP_WEIGHTS["performance"]
            match_points += weight
            score += weight
            breakdown["performance"]["matched"] += weight
            matched_performance_ids.add(performance_id)

    if score == 0 and not has_specific_answers(answers):
        score = 1
        match_points = 1
        possible_points = 1
        breakdown["application"] = {"matched": 1, "possible": 1}
        reasons.append("broad result because no strong filters were selected")

    rank_score = score + tie_breaker
    return rank_score, reasons, match_points, possible_points, breakdown


def has_specific_answers(answers):
    selected = [
        answers.get("application"),
        answers.get("energy"),
        answers.get("target"),
        answers.get("pixel_size"),
        answers.get("installation"),
        *(answers.get("performance") or []),
    ]
    return any(value and "not_sure" not in value and value != "balanced" for value in selected)


def has_meaningful_performance_priority(answers):
    ignored = {"balanced", "not_sure_performance"}
    return any(choice_id not in ignored for choice_id in (answers.get("performance") or []))


def fit_percent(bucket):
    possible = bucket.get("possible", 0)
    if not possible:
        return 0
    return round((bucket.get("matched", 0) / possible) * 100)


def selected_is_unknown(value):
    return isinstance(value, str) and value.startswith("not_sure")


def weighted_bucket_points(weight, bucket):
    possible = bucket.get("possible", 0)
    if not possible:
        return 0
    return weight * (bucket.get("matched", 0) / possible)


def strict_match_percent(answers, breakdown):
    total = 0
    matched = 0

    application = answers.get("application")
    if application:
        total += STRICT_MATCH_WEIGHTS["application"]
        if not selected_is_unknown(application):
            matched += weighted_bucket_points(
                STRICT_MATCH_WEIGHTS["application"],
                breakdown["application"],
            )

    energy = answers.get("energy")
    if energy:
        total += STRICT_MATCH_WEIGHTS["energy"]
        if not selected_is_unknown(energy):
            matched += weighted_bucket_points(
                STRICT_MATCH_WEIGHTS["energy"],
                breakdown["energy"],
            )

    pixel_size = answers.get("pixel_size")
    if pixel_size:
        total += STRICT_MATCH_WEIGHTS["pixel_size"]
        if not selected_is_unknown(pixel_size):
            matched += weighted_bucket_points(
                STRICT_MATCH_WEIGHTS["pixel_size"],
                breakdown["pixel_size"],
            )

    performance = answers.get("performance") or []
    if performance:
        total += STRICT_MATCH_WEIGHTS["performance"]
        if not any(selected_is_unknown(choice_id) for choice_id in performance):
            matched += weighted_bucket_points(
                STRICT_MATCH_WEIGHTS["performance"],
                breakdown["performance"],
            )

    installation = answers.get("installation")
    if installation:
        total += STRICT_MATCH_WEIGHTS["installation"]
        if not selected_is_unknown(installation):
            matched += weighted_bucket_points(
                STRICT_MATCH_WEIGHTS["installation"],
                breakdown["installation"],
            )

    if not total:
        return 0
    return max(0, min(round((matched / total) * 100), 100))


def apply_priority_filters(candidates, answers, limit):
    if answers.get("energy") == "exact_energy":
        energy_matches = [item for item in candidates if item["energy_percent"] > 0]
        if len(energy_matches) >= min(limit, len(candidates)):
            candidates = energy_matches

    if answers.get("pixel_size") and answers.get("pixel_size") != "not_sure_pixel":
        pixel_matches = [
            item for item in candidates if item["pixel_percent"] > 0
        ]
        if len(pixel_matches) >= min(limit, len(candidates)):
            candidates = pixel_matches

    if answers.get("application") and answers.get("application") != "not_sure_application":
        application_matches = [
            item for item in candidates if item["application_percent"] > 0
        ]
        if application_matches:
            candidates = application_matches

    if has_meaningful_performance_priority(answers):
        performance_matches = [
            item for item in candidates if item["performance_percent"] > 0
        ]
        if len(performance_matches) >= min(limit, len(candidates)):
            candidates = performance_matches

    return candidates


def select_brand_diverse(candidates, limit):
    selected = []
    selected_ids = set()
    selected_brands = set()

    for candidate in candidates:
        if len(selected) >= limit:
            break
        if candidate["product_id"] in selected_ids:
            continue

        brand_key = candidate["brand_key"]
        if brand_key in selected_brands:
            comparisons = [
                other for other in selected
                if other["brand_key"] != brand_key
            ]
            comparisons.extend([
                other for other in candidates
                if other["product_id"] not in selected_ids
                and other["brand_key"] not in selected_brands
            ])
            best_other_brand = comparisons[0] if comparisons else None
            if best_other_brand:
                percent_advantage = (
                    candidate["match_percent"] - best_other_brand["match_percent"]
                )
                score_advantage = candidate["rank_score"] - best_other_brand["rank_score"]
                if (
                    percent_advantage < SAME_BRAND_ADVANTAGE_PERCENT
                    and score_advantage < SAME_BRAND_ADVANTAGE_SCORE
                ):
                    continue

        selected.append(candidate)
        selected_ids.add(candidate["product_id"])
        selected_brands.add(brand_key)

    return selected


def get_recommendations(answers, limit=3):
    if get_selection_conflict(answers)["has_conflict"]:
        return []

    products = get_products()
    candidates = []

    for product in products:
        if should_exclude_product(product, answers):
            continue

        score, reasons, match_points, possible_points, breakdown = score_product(product, answers)
        if score > 0:
            match_percent = strict_match_percent(answers, breakdown)
            candidates.append(
                {
                    "match_percent": min(match_percent, 100),
                    "rank_score": score,
                    "product": product,
                    "product_id": product.get("product_id"),
                    "brand_key": get_brand_key(product),
                    "reasons": reasons,
                    "breakdown": breakdown,
                    "performance_percent": fit_percent(breakdown["performance"]),
                    "energy_percent": fit_percent(breakdown["energy"]),
                    "pixel_percent": fit_percent(breakdown["pixel_size"]),
                    "application_percent": fit_percent(breakdown["application"]),
                    "installation_percent": fit_percent(breakdown["installation"]),
                }
            )

    if not candidates:
        candidates = [
            {
                "match_percent": 0,
                "rank_score": 1,
                "product": product,
                "product_id": product.get("product_id"),
                "brand_key": get_brand_key(product),
                "reasons": ["broad match"],
                "breakdown": {},
                "performance_percent": 0,
                "energy_percent": 0,
                "pixel_percent": 0,
                "application_percent": 0,
                "installation_percent": 0,
            }
            for product in products[:limit]
        ]

    candidates = apply_priority_filters(candidates, answers, limit)
    candidates.sort(
        key=lambda item: (
            item["energy_percent"] + item["pixel_percent"],
            item["energy_percent"],
            item["pixel_percent"],
            item["application_percent"],
            item["performance_percent"],
            item["installation_percent"],
            item["match_percent"],
            item["rank_score"],
        ),
        reverse=True,
    )
    selected = select_brand_diverse(candidates, limit)

    results = []
    for candidate in selected:
        product = candidate["product"]
        results.append(
            {
                "match_percent": candidate["match_percent"],
                "performance_percent": candidate["performance_percent"],
                "energy_percent": candidate["energy_percent"],
                "pixel_percent": candidate["pixel_percent"],
                "application_percent": candidate["application_percent"],
                "installation_percent": candidate["installation_percent"],
                "score": round(candidate["rank_score"], 2),
                "product_id": product.get("product_id"),
                "manufacturer": product.get("manufacturer"),
                "model_name_variant": product.get("model_name_variant"),
                "product_family": product.get("product_family"),
                "product_category": product.get("product_category"),
                "detector_principle": product.get("detector_principle"),
                "pixel_size": product.get("pixel_size"),
                "active_area": product.get("active_sensitive_area"),
                "energy_range": product.get("detectable_energy_radiation_range"),
                "frame_rate": product.get("max_frame_rate_readout_speed_hit_rate"),
                "interface": first_value(product, "data_interface", "connector_type"),
                "software": first_value(product, "software", "sdk_drivers"),
                "vacuum": product.get("vacuum_compatibility"),
                "applications": product.get("typical_applications"),
                "source": product.get("source_document_s"),
                "reasons": list(dict.fromkeys(candidate["reasons"]))[:5],
            }
        )

    return results


def get_review_summary(answers):
    review = []
    for group_id in ["application", "energy", "target", "pixel_size", "performance", "installation"]:
        group = CHOICE_GROUPS[group_id]
        values = answers.get(group_id)
        choices = get_choices(group_id, values)
        if not choices:
            continue
        review.append(
            {
                "title": group["title"],
                "labels": [choice["label"] for choice in choices],
                "technical": [choice["technical"] for choice in choices if choice.get("technical")],
            }
        )
    return review


def summarize_reason_counts(recommendations):
    counter = Counter()
    for item in recommendations:
        for reason in item.get("reasons", []):
            counter[reason] += 1
    return counter.most_common(5)
