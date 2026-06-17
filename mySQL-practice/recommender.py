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
    "energy": 24,
    "target": 8,
    "pixel_size": 24,
    "performance": 5,
    "installation": 14,
}

STRICT_MATCH_WEIGHTS = {
    "energy": 30,
    "pixel_size": 30,
    "application": 22,
    "performance": 12,
    "installation": 14,
}


LAB_XRD_ENERGY_IDS = {"low_energy_lab", "standard_xrd", "higher_energy_lab"}
LAB_TARGET_IDS = {"cr_ka", "cu_ka", "w_la", "mo_ka", "rh_ka", "ag_ka"}
HIGH_HARD_ENERGY_IDS = {"higher_energy_lab", "hard_xray"}
ENERGY_FIT_WEIGHT = GROUP_WEIGHTS["energy"] + GROUP_WEIGHTS["target"]
PIXEL_FIT_WEIGHT = GROUP_WEIGHTS["pixel_size"]
INTERFACE_SUPPORT_TERMS = {
    "usb",
    "ethernet",
    "software",
    "windows",
    "sdk",
    "trigger",
    "api",
    "python",
    "epics",
    "tango",
}
ENERGY_FIELDS = [
    "minimum_energy_threshold",
    "detectable_energy_radiation_range",
    "sensor_material",
    "sensor_thickness",
    "typical_applications",
    "industry_tags",
]

ENERGY_REQUIREMENTS = {
    "euv_vuv_soft": {
        "range": (0.001, 1),
        "label": "EUV / VUV / Soft X-ray",
        "terms": ["euv", "vuv", "soft x-ray", "sxr", "50 ev", "ev"],
        "hard_exclude_terms": ["gamma", "neutron", "particle only"],
    },
    "low_energy_lab": {
        "range": (5, 9),
        "label": "Low-energy lab X-ray",
        "terms": ["5.4", "8.04", "8.4", "cr", "cu", "w-l", "x-ray", "kev"],
        "hard_exclude_terms": ["gamma", "neutron", "particle only"],
    },
    "standard_xrd": {
        "range": (8, 18),
        "label": "Standard XRD source",
        "terms": ["xrd", "diffraction", "cu", "mo", "8.04", "17.4", "kev"],
        "hard_exclude_terms": ["gamma", "neutron", "particle only"],
    },
    "higher_energy_lab": {
        "range": (17, 23),
        "label": "Higher-energy lab X-ray",
        "terms": ["17.4", "20.2", "22.2", "mo", "rh", "ag", "hxr", "kev"],
        "hard_exclude_terms": ["euv only", "vuv only", "gamma", "neutron", "particle only"],
    },
    "hard_xray": {
        "range": (30, 150),
        "label": "Hard X-ray / High penetration",
        "terms": ["hard", "hxr", "30", "150", "cdte", "high penetration", "kev"],
        "hard_exclude_terms": ["euv only", "vuv only"],
    },
    "gamma_neutron_particles": {
        "range": (150, 1000000),
        "label": "Gamma / Neutron / Particles",
        "terms": ["gamma", "neutron", "alpha", "beta", "particle", "timepix"],
        "hard_exclude_terms": ["euv only", "vuv only", "soft x-ray only"],
    },
}

TARGET_ENERGIES_KEV = {
    "cr_ka": 5.4,
    "cu_ka": 8.04,
    "w_la": 8.4,
    "mo_ka": 17.4,
    "rh_ka": 20.2,
    "ag_ka": 22.2,
}

PIXEL_REQUIREMENTS = {
    "pixel_under_1": {
        "range": (0, 1),
        "label": "Under 1 micrometer",
    },
    "pixel_1_30": {
        "range": (1, 30),
        "label": "1 to 30 micrometers",
    },
    "pixel_30_100": {
        "range": (30, 100),
        "label": "30 to 100 micrometers",
    },
}


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


def is_vacuum_or_uhv_product(product):
    text = field_text(
        product,
        [
            "vacuum_compatibility",
            "cooling_temperature_control",
            "connector_type",
            "dimensions",
            "target_market_intended_use",
            "typical_applications",
            "source_page_notes",
        ],
    )
    return any(
        term in text
        for term in [
            "vacuum",
            "uhv",
            "flange",
            "cf",
            "10^-",
            "10-",
            "bake",
            "euv",
            "vuv",
            "soft x-ray",
            "beamline",
        ]
    )


def should_exclude_product(product, answers):
    # Step 5 is a practical-use gate. A simple in-air lab setup should not
    # return CCD camera families that normally imply vacuum/deep-cooled setups.
    if answers.get("installation") == "simple_lab" and is_ccd_camera(product):
        return True

    # For lab XRD/SAXS/WAXS source selection, users normally expect diffraction
    # or photon-counting detectors, not broad scientific CCD camera families.
    if is_lab_xrd_request(answers) and is_ccd_camera(product):
        return True

    energy_fit = energy_range_fit(product, answers)
    if energy_fit["hard_exclude"]:
        return True

    return False


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
        r"(\d+(?:\.\d+)?)\s*(mev|kev|ev)?(?:\s*\([^)]*\))?\s*(?:-|~|to)\s*"
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


def requested_energy_range(answers):
    target_energy = TARGET_ENERGIES_KEV.get(answers.get("target"))
    if target_energy is not None:
        margin = max(0.15, target_energy * 0.03)
        return {
            "range": (target_energy - margin, target_energy + margin),
            "label": get_choice("target", answers.get("target"))["label"],
            "exact": target_energy,
            "terms": [],
        }

    if answers.get("energy") == "exact_energy":
        exact_energy = parse_energy_to_kev(answers.get("exact_energy"))
        if exact_energy is None:
            return None
        margin = max(0.05, exact_energy * 0.05)
        return {
            "range": (max(0, exact_energy - margin), exact_energy + margin),
            "label": f"{exact_energy:g} keV",
            "exact": exact_energy,
            "terms": [],
        }

    requirement = ENERGY_REQUIREMENTS.get(answers.get("energy"))
    if not requirement:
        return None

    return {
        **requirement,
        "exact": None,
    }


def ranges_overlap(first, second):
    return max(first[0], second[0]) <= min(first[1], second[1])


def overlap_fraction(first, second):
    overlap = max(0, min(first[1], second[1]) - max(first[0], second[0]))
    width = max(first[1] - first[0], 0.000001)
    return overlap / width


def range_gap(first, second):
    if ranges_overlap(first, second):
        return 0
    if first[1] < second[0]:
        return second[0] - first[1]
    return first[0] - second[1]


def energy_text_has_only_soft_family(text):
    has_soft = any(term in text for term in ["euv", "vuv", "soft x-ray", "sxr", "50 ev"])
    has_hard_or_lab = any(term in text for term in ["hxr", "hard", "kev", "x-ray", "xrd", "cdte", "30 kev", "150 kev"])
    return has_soft and not has_hard_or_lab


def energy_text_has_conflicting_family(text, requirement):
    energy_label = normalize(requirement.get("label"))
    if "hard" in energy_label or "higher" in energy_label:
        return energy_text_has_only_soft_family(text)
    if "euv" in energy_label or "soft" in energy_label:
        return any(term in text for term in ["gamma", "neutron", "particle only"])
    if "gamma" in energy_label or "neutron" in energy_label:
        return energy_text_has_only_soft_family(text)
    return False


def energy_range_fit(product, answers):
    requirement = requested_energy_range(answers)
    if not requirement:
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
            "status": "unknown",
            "note": "Energy not requested",
            "hard_exclude": False,
        }

    weight = ENERGY_FIT_WEIGHT
    product_text = field_text(product, ENERGY_FIELDS)
    ranges = extract_energy_ranges(product_text)
    requested = requirement["range"]
    product_range_label = first_value(product, "detectable_energy_radiation_range", "minimum_energy_threshold")
    requested_label = requirement["label"]

    if ranges:
        best_overlap = max((overlap_fraction(requested, product_range) for product_range in ranges), default=0)
        if best_overlap >= 0.95 or any(
            requirement.get("exact") is not None and low <= requirement["exact"] <= high
            for low, high in ranges
        ):
            return {
                "matched": weight,
                "possible": weight,
                "reason": f"Energy fit: {requested_label} fits {product_range_label}",
                "status": "good",
                "note": f"Fits requested energy: {requested_label}",
                "hard_exclude": False,
            }
        if best_overlap > 0:
            return {
                "matched": round(weight * 0.62, 2),
                "possible": weight,
                "reason": f"Partial energy fit: {requested_label} overlaps {product_range_label}",
                "status": "warn",
                "note": f"Partial overlap with requested energy: {requested_label}",
                "hard_exclude": False,
            }

        nearest_gap = min(range_gap(requested, product_range) for product_range in ranges)
        requested_width = max(requested[1] - requested[0], 0.1)
        huge_gap = nearest_gap > max(10, requested_width * 2.5, requested[1] * 0.75)
        return {
            "matched": 0,
            "possible": weight,
            "reason": None,
            "status": "bad",
            "note": f"Energy range is far from requested {requested_label}",
            "hard_exclude": huge_gap,
        }

    text_matches = count_term_matches(product_text, requirement.get("terms", []))
    if text_matches:
        return {
            "matched": round(weight * 0.82, 2),
            "possible": weight,
            "reason": f"Energy family fit: {', '.join(text_matches[:3])}",
            "status": "good",
            "note": f"Energy family appears compatible with {requested_label}",
            "hard_exclude": False,
        }

    if energy_text_has_conflicting_family(product_text, requirement):
        return {
            "matched": 0,
            "possible": weight,
            "reason": None,
            "status": "bad",
            "note": f"Energy family conflicts with requested {requested_label}",
            "hard_exclude": True,
        }

    return {
        "matched": round(weight * 0.32, 2),
        "possible": weight,
        "reason": None,
        "status": "warn",
        "note": f"Energy compatibility is not clearly documented for {requested_label}",
        "hard_exclude": False,
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


def answer_label(group_id, choice_id, fallback="Not selected"):
    choice = get_choice(group_id, choice_id)
    return (choice or {}).get("label", fallback)


def add_conflict_detail(details, title, selected, issue, suggestion):
    details.append(
        {
            "title": title,
            "selected": selected,
            "issue": issue,
            "suggestion": suggestion,
        }
    )


def get_selection_conflict(answers):
    details = []
    application_id = answers.get("application")
    energy_id = answers.get("energy")
    target_id = answers.get("target")
    pixel_id = answers.get("pixel_size")
    performance_ids = set(answers.get("performance") or [])
    exact_energy_kev = parse_energy_to_kev(answers.get("exact_energy")) if energy_id == "exact_energy" else None
    is_high_or_hard_energy = (
        energy_id in HIGH_HARD_ENERGY_IDS
        or (exact_energy_kev is not None and exact_energy_kev >= 17)
    )
    is_lab_or_xrd_energy = (
        energy_id in LAB_XRD_ENERGY_IDS
        or target_id in LAB_TARGET_IDS
        or (exact_energy_kev is not None and 1 <= exact_energy_kev <= 30)
    )
    is_soft_energy = energy_id == "euv_vuv_soft" or (exact_energy_kev is not None and exact_energy_kev < 1)

    if pixel_id == "pixel_under_1" and is_high_or_hard_energy:
        energy_label = (
            f"{exact_energy_kev:g} keV"
            if exact_energy_kev is not None
            else answer_label("energy", energy_id, "high/hard X-ray")
        )
        pixel_label = answer_label("pixel_size", pixel_id, "under 1 micrometer")
        add_conflict_detail(
            details,
            "Energy vs Pixel Size",
            f"{energy_label} + {pixel_label}",
            (
                "High/hard X-ray measurements usually need thicker sensors, scintillators, "
                "or photon-counting detector geometries, while sub-1 micrometer effective pixels "
                "are normally associated with microscopy optics and lower-energy imaging setups."
            ),
            "Review the energy range or ask an engineer about optical coupling, scintillator, or custom geometry options.",
        )

    if application_id == "euv_soft_xray_spectroscopy" and is_lab_or_xrd_energy:
        energy_label = (
            f"{exact_energy_kev:g} keV"
            if exact_energy_kev is not None
            else answer_label("target", target_id, answer_label("energy", energy_id, "lab X-ray source"))
        )
        add_conflict_detail(
            details,
            "Application vs Energy",
            f"{answer_label('application', application_id)} + {energy_label}",
            (
                "EUV/VUV/soft X-ray spectroscopy is normally below about 1 keV, "
                "but the selected source is a lab X-ray/XRD-style energy such as Cu-Kalpha or Mo-Kalpha."
            ),
            "If the source is really Cu-Kalpha or another lab target, consider an XRD, XAFS, or X-ray imaging application instead.",
        )

    if application_id == "xrd_saxs_waxs" and is_soft_energy:
        add_conflict_detail(
            details,
            "Application vs Energy",
            f"{answer_label('application', application_id)} + {answer_label('energy', energy_id, 'soft X-ray energy')}",
            (
                "XRD/SAXS/WAXS usually uses lab or beamline X-ray energies, "
                "while EUV/VUV/soft X-ray choices point toward a different spectroscopy or imaging setup."
            ),
            "Review whether the measurement is diffraction, soft X-ray spectroscopy, or EUV imaging.",
        )

    if "single_event" in performance_ids and application_id not in {"radiation_particle", "material_identification"}:
        add_conflict_detail(
            details,
            "Priority vs Detector Type",
            f"{answer_label('performance', 'single_event')} + {answer_label('application', application_id)}",
            (
                "Single photon / particle sensitivity often points toward photon-counting or Timepix-style detectors. "
                "Some vacuum/EUV spectroscopy workflows still use CCD or sCMOS cameras, but they should be treated as possible matches, not guaranteed single-event detectors."
            ),
            "Keep the CCD/sCMOS options as possible vacuum/spectroscopy matches, but ask an engineer if single-event counting is required.",
        )

    if not details:
        return {
            "has_conflict": False,
            "blocking": False,
            "title": "",
            "message": "",
            "details": [],
        }

    return {
        "has_conflict": True,
        "blocking": False,
        "title": "Possible matches, but your answers contain conflicts",
        "message": "Some selected answers point toward different detector families. The products below are possible matches, but their percentages are reduced until the conflicts are reviewed.",
        "details": details,
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


def split_interface_support_matches(matches):
    interface_matches = []
    environment_matches = []
    for match in matches:
        clean_match = normalize(match)
        if clean_match in INTERFACE_SUPPORT_TERMS:
            interface_matches.append(match)
        else:
            environment_matches.append(match)
    return interface_matches, environment_matches


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


def distance_from_range(value, expected_range):
    low, high = expected_range
    if low <= value <= high:
        return 0
    if value < low:
        return low - value
    return value - high


def pixel_size_fit(product, answers):
    choice = get_choice("pixel_size", answers.get("pixel_size"))
    requirement = PIXEL_REQUIREMENTS.get(answers.get("pixel_size"))
    if not choice or not requirement:
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
            "status": "unknown",
            "note": "Pixel size not requested",
        }

    weight = PIXEL_FIT_WEIGHT
    pixel_value = parse_pixel_size_micrometers(product.get("pixel_size"))
    text = field_text(product, SEARCH_FIELDS["pixel_size"])
    expected_range = requirement["range"]
    label = requirement["label"]
    listed_pixel = product.get("pixel_size") or "pixel size not listed"

    if pixel_value is not None:
        if expected_range[0] <= pixel_value <= expected_range[1]:
            return {
                "matched": weight,
                "possible": weight,
                "reason": f"Pixel fit: {label} ({listed_pixel})",
                "status": "good",
                "note": f"Fits requested pixel range: {label}",
            }

        distance = distance_from_range(pixel_value, expected_range)
        range_width = max(expected_range[1] - expected_range[0], 1)
        close_limit = max(2, range_width * 0.45)
        if choice["id"] == "pixel_under_1":
            close_limit = 2

        if distance <= close_limit:
            closeness = max(0.38, 1 - (distance / (close_limit * 1.7)))
            return {
                "matched": round(weight * closeness, 2),
                "possible": weight,
                "reason": f"Pixel is close but not exact: requested {label}, product has {listed_pixel}",
                "status": "warn",
                "note": f"Close to requested pixel range: {label}",
            }

        return {
            "matched": round(weight * 0.08, 2),
            "possible": weight,
            "reason": None,
            "status": "bad",
            "note": f"Pixel size is far from requested {label}",
        }

    matches = count_term_matches(text, choice["terms"])
    if matches:
        return {
            "matched": round(weight * 0.55, 2),
            "possible": weight,
            "reason": f"Pixel family fit: {', '.join(matches[:3])}",
            "status": "warn",
            "note": f"Pixel range inferred from product text: {label}",
        }

    return {
        "matched": round(weight * 0.2, 2),
        "possible": weight,
        "reason": None,
        "status": "warn",
        "note": f"Pixel size is not clearly documented for requested {label}",
    }


def installation_fit(product, answers):
    choice = get_choice("installation", answers.get("installation"))
    if not choice or not choice.get("terms"):
        return {
            "matched": 0,
            "possible": 0,
            "reason": None,
            "status": "unknown",
            "note": "Installation not requested",
            "tie_bonus": 0,
        }

    weight = GROUP_WEIGHTS["installation"]
    product_text = field_text(product, SEARCH_FIELDS["installation"])
    matches = count_term_matches(product_text, choice["terms"])
    interface_matches, environment_matches = split_interface_support_matches(matches)
    ccd_camera = is_ccd_camera(product)
    vacuum_product = is_vacuum_or_uhv_product(product)

    if choice["id"] == "simple_lab":
        if ccd_camera:
            return {
                "matched": 0,
                "possible": weight,
                "reason": None,
                "status": "bad",
                "note": "Simple lab setup excludes CCD camera products",
                "tie_bonus": -10,
            }

        if environment_matches:
            return {
                "matched": weight,
                "possible": weight,
                "reason": f"Installation fit: simple lab setup ({', '.join(environment_matches[:3])})",
                "status": "good",
                "note": "Fits simple lab setup; CCD camera products were excluded",
                "tie_bonus": 3,
            }

        if interface_matches:
            return {
                "matched": round(weight * 0.42, 2),
                "possible": weight,
                "reason": f"Interface support: {', '.join(interface_matches[:3])}",
                "status": "warn",
                "note": "Interface/software looks usable, but it has a smaller percentage impact than energy, pixel size, and application",
                "tie_bonus": 0.5,
            }

        if vacuum_product:
            return {
                "matched": round(weight * 0.12, 2),
                "possible": weight,
                "reason": None,
                "status": "bad",
                "note": "Product appears vacuum/beamline-oriented, not a simple lab setup",
                "tie_bonus": -4,
            }

        return {
            "matched": round(weight * 0.35, 2),
            "possible": weight,
            "reason": "Installation fit: non-CCD product kept for simple lab setup",
            "status": "warn",
            "note": "Not a CCD camera; simple-lab interface details are not fully documented and only lightly affect the score",
            "tie_bonus": 1,
        }

    if choice["id"] == "vacuum_uhv":
        if ccd_camera and vacuum_product:
            return {
                "matched": weight,
                "possible": weight,
                "reason": "Installation fit: CCD camera with vacuum/UHV indicators",
                "status": "good",
                "note": "Vacuum/UHV selected; CCD camera products are prioritized",
                "tie_bonus": 8,
            }

        if ccd_camera:
            return {
                "matched": round(weight * 0.62, 2),
                "possible": weight,
                "reason": "Installation fit: CCD camera family",
                "status": "warn",
                "note": "CCD camera is preferred for vacuum/UHV, but missing vacuum details reduce the installation score",
                "tie_bonus": 5,
            }

        if vacuum_product or environment_matches:
            return {
                "matched": round(weight * 0.45, 2),
                "possible": weight,
                "reason": f"Installation fit: vacuum/UHV indicators ({', '.join(environment_matches[:3])})" if environment_matches else "Installation fit: vacuum/UHV indicators",
                "status": "warn",
                "note": "Vacuum/UHV indicators found, but product is not a CCD camera family",
                "tie_bonus": -1,
            }

        return {
            "matched": 0,
            "possible": weight,
            "reason": None,
            "status": "bad",
            "note": "Vacuum/UHV fit is not documented",
            "tie_bonus": -5,
        }

    if environment_matches:
        return {
            "matched": weight,
            "possible": weight,
            "reason": f"{CHOICE_GROUPS['installation']['title']}: {', '.join(environment_matches[:3])}",
            "status": "good",
            "note": "Installation environment text matches the selected environment",
            "tie_bonus": min(len(matches), 3) * 0.1,
        }

    if interface_matches:
        return {
            "matched": round(weight * 0.35, 2),
            "possible": weight,
            "reason": f"Interface support: {', '.join(interface_matches[:3])}",
            "status": "warn",
            "note": "Interface/software match is useful, but it is weighted lightly in the total percentage",
            "tie_bonus": 0.2,
        }

    return {
        "matched": 0,
        "possible": weight,
        "reason": None,
        "status": "warn",
        "note": "Installation/interface fit is not clearly documented",
        "tie_bonus": -1,
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
    spec_quality = {
        "detector": {"status": "unknown", "note": "Application fit not evaluated"},
        "energy": {"status": "unknown", "note": "Energy not requested"},
        "pixel": {"status": "unknown", "note": "Pixel size not requested"},
        "active_area": {"status": "unknown", "note": "Not scored by current answers"},
        "interface": {"status": "unknown", "note": "Not scored by current answers"},
        "software": {"status": "unknown", "note": "Not scored by current answers"},
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
            spec_quality["detector"] = {
                "status": "good",
                "note": "Detector type/application matches the request",
            }
        else:
            spec_quality["detector"] = {
                "status": "bad",
                "note": "Detector type/application is not close to the selected application",
            }

    energy_fit = energy_range_fit(product, answers)
    if energy_fit["possible"]:
        possible_points += energy_fit["possible"]
        breakdown["energy"]["possible"] += energy_fit["possible"]
        match_points += energy_fit["matched"]
        score += energy_fit["matched"]
        breakdown["energy"]["matched"] += energy_fit["matched"]
        spec_quality["energy"] = {
            "status": energy_fit["status"],
            "note": energy_fit["note"],
        }
        if energy_fit["status"] == "good":
            tie_breaker += 0.6
        elif energy_fit["status"] == "warn":
            tie_breaker -= 0.4
        elif energy_fit["status"] == "bad":
            tie_breaker -= 2.0
        if energy_fit["reason"]:
            reasons.append(energy_fit["reason"])

    pixel_fit = pixel_size_fit(product, answers)
    if pixel_fit["possible"]:
        possible_points += pixel_fit["possible"]
        breakdown["pixel_size"]["possible"] += pixel_fit["possible"]
        match_points += pixel_fit["matched"]
        score += pixel_fit["matched"]
        breakdown["pixel_size"]["matched"] += pixel_fit["matched"]
        spec_quality["pixel"] = {
            "status": pixel_fit["status"],
            "note": pixel_fit["note"],
        }
        if pixel_fit["status"] == "good":
            tie_breaker += 0.5
        elif pixel_fit["status"] == "warn":
            tie_breaker -= 0.3
        elif pixel_fit["status"] == "bad":
            tie_breaker -= 1.6
        if pixel_fit["reason"]:
            reasons.append(pixel_fit["reason"])

    install_fit = installation_fit(product, answers)
    if install_fit["possible"]:
        possible_points += install_fit["possible"]
        breakdown["installation"]["possible"] += install_fit["possible"]
        match_points += install_fit["matched"]
        score += install_fit["matched"]
        breakdown["installation"]["matched"] += install_fit["matched"]
        tie_breaker += install_fit["tie_bonus"]
        spec_quality["interface"] = {
            "status": install_fit["status"],
            "note": install_fit["note"],
        }
        if install_fit["reason"]:
            reasons.append(install_fit["reason"])

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
    return rank_score, reasons, match_points, possible_points, breakdown, spec_quality


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


def conflict_score_adjustment(product, answers, conflict):
    if not conflict.get("has_conflict"):
        return 0, [], {}

    details = conflict.get("details", [])
    penalty = min(16, len(details) * 4)
    reasons = ["Conflict check: selected answers need engineer review"]
    quality_updates = {}

    application_id = answers.get("application")
    energy_id = answers.get("energy")
    target_id = answers.get("target")
    performance_ids = set(answers.get("performance") or [])
    exact_energy_kev = parse_energy_to_kev(answers.get("exact_energy")) if energy_id == "exact_energy" else None
    lab_or_xrd_energy = (
        energy_id in LAB_XRD_ENERGY_IDS
        or target_id in LAB_TARGET_IDS
        or (exact_energy_kev is not None and 1 <= exact_energy_kev <= 30)
    )

    if application_id == "euv_soft_xray_spectroscopy" and lab_or_xrd_energy:
        penalty += 5
        reasons.append("Conflict: EUV/soft X-ray application was paired with a lab XRD-style energy")

    if "single_event" in performance_ids and is_ccd_camera(product):
        penalty += 5
        reasons.append("Conflict: single-event priority may require photon-counting or Timepix-style detection")
        quality_updates["detector"] = {
            "status": "warn",
            "note": "CCD camera is possible for vacuum/EUV spectroscopy, but single-event counting may need a different detector family",
        }

    if answers.get("pixel_size") == "pixel_under_1" and (
        energy_id in HIGH_HARD_ENERGY_IDS
        or (exact_energy_kev is not None and exact_energy_kev >= 17)
    ):
        penalty += 7
        reasons.append("Conflict: high/hard X-ray energy and sub-1 micrometer pixels may require custom optics or scintillator design")

    return min(penalty, 30), reasons, quality_updates


def get_recommendations(answers, limit=3):
    conflict = get_selection_conflict(answers)
    products = get_products()
    candidates = []
    eligible_products = []

    for product in products:
        if should_exclude_product(product, answers):
            continue
        eligible_products.append(product)

        score, reasons, match_points, possible_points, breakdown, spec_quality = score_product(product, answers)
        if score > 0:
            match_percent = strict_match_percent(answers, breakdown)
            conflict_penalty, conflict_reasons, quality_updates = conflict_score_adjustment(product, answers, conflict)
            match_percent = max(0, match_percent - conflict_penalty)
            reasons.extend(conflict_reasons)
            spec_quality.update(quality_updates)
            candidates.append(
                {
                    "match_percent": min(match_percent, 100),
                    "rank_score": score,
                    "product": product,
                    "product_id": product.get("product_id"),
                    "reasons": reasons,
                    "breakdown": breakdown,
                    "spec_quality": spec_quality,
                    "performance_percent": fit_percent(breakdown["performance"]),
                    "energy_percent": fit_percent(breakdown["energy"]),
                    "pixel_percent": fit_percent(breakdown["pixel_size"]),
                    "application_percent": fit_percent(breakdown["application"]),
                    "installation_percent": fit_percent(breakdown["installation"]),
                }
            )

    if not candidates and eligible_products:
        candidates = [
            {
                "match_percent": 0,
                "rank_score": 1,
                "product": product,
                "product_id": product.get("product_id"),
                "reasons": ["broad match"],
                "breakdown": {},
                "spec_quality": {},
                "performance_percent": 0,
                "energy_percent": 0,
                "pixel_percent": 0,
                "application_percent": 0,
                "installation_percent": 0,
            }
            for product in eligible_products[:limit]
        ]

    candidates.sort(
        key=lambda item: (
            item["match_percent"],
            item["rank_score"],
            item["energy_percent"],
            item["pixel_percent"],
            item["application_percent"],
            item["performance_percent"],
            item["installation_percent"],
        ),
        reverse=True,
    )
    selected = candidates[:limit]

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
                "spec_quality": candidate["spec_quality"],
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
