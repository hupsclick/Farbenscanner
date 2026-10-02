"use strict";

/*
 * ============================================================
 * FARBSCANNER
 * ============================================================
 *
 * Die App unterscheidet zwischen:
 *
 * 1. GESCANNTER FARBE
 *    Der tatsächliche RGB/HEX-Wert, der aus dem Bild stammt.
 *
 * 2. REFERENZFARBE
 *    Die Farbe aus COLOR_NAMES, die dem Scanwert am nächsten ist.
 *
 * Beispiel:
 *
 *   Gescannte Farbe:    #6F3787
 *   Farbname:           Opalviolett
 *   Referenzfarbe:      #7B5763
 *
 * Wichtig:
 * Der Hex-Wert des Bildes wird niemals durch den Hex-Wert
 * der Referenzfarbe ersetzt.
 */


/* ============================================================
 * FARBEN-DATENBANK
 * ============================================================
 *
 * Alle Namen sind deutsch.
 * Jede Farbe besitzt einen eindeutigen Namen.
 * Die Hex-Werte dienen als Referenzpunkte für die Erkennung.
 */

const COLOR_NAMES = [

  // ==========================================================
  // ⚫ NEUTRALE FARBEN
  // ==========================================================

  { name: "Schwarz", hex: "#000000" },
  { name: "Tiefschwarz", hex: "#0D0D0D" },
  { name: "Anthrazit", hex: "#2C2C2C" },
  { name: "Dunkelgrau", hex: "#404040" },
  { name: "Schiefergrau", hex: "#696969" },
  { name: "Grau", hex: "#808080" },
  { name: "Silbergrau", hex: "#A3A49F" },
  { name: "Vulkangrau", hex: "#A49F9F" },
  { name: "Platingrau", hex: "#A3A49F" },
  { name: "Silber", hex: "#C0C0C0" },
  { name: "Betongrau", hex: "#CDC7C0" },
  { name: "Hellgrau", hex: "#D3D3D3" },
  { name: "Seidengrau", hex: "#D9D7D5" },
  { name: "Weiß", hex: "#FFFFFF" },
  { name: "Schneeweiß", hex: "#FFFAFA" },
  { name: "Elfenbein", hex: "#FFFFF0" },
  { name: "Knochenweiß", hex: "#E8DCC8" },
  { name: "Perlweiß", hex: "#F5F5F5" },


  // ==========================================================
  // 🔴 ROTE FARBEN
  // ==========================================================

  { name: "Dunkelrot", hex: "#8B0000" },
  { name: "Herzenrot", hex: "#8C2634" },
  { name: "Burgunderrot", hex: "#5C1A1A" },
  { name: "Karmesinrot", hex: "#DC143C" },
  { name: "Scharlachrot", hex: "#FF2400" },
  { name: "Feuerrot", hex: "#B22222" },
  { name: "Mohnrot", hex: "#F2003C" },
  { name: "Rot", hex: "#FF0000" },
  { name: "Rosenrot", hex: "#AF686A" },
  { name: "Korallenrot", hex: "#FF7F50" },
  { name: "Tomatenrot", hex: "#FF6347" },
  { name: "Lachsrot", hex: "#FA8072" },


  // ==========================================================
  // 🌸 ROSA FARBEN
  // ==========================================================

  { name: "Dunkelrosa", hex: "#DB7093" },
  { name: "Altrosa", hex: "#BC8F8F" },
  { name: "Rosa", hex: "#FFC0CB" },
  { name: "Hellrosa", hex: "#FFB6C1" },
  { name: "Puderrosa", hex: "#B9ADB1" },
  { name: "Kristallrosa", hex: "#DCC8C8" },
  { name: "Pfirsichrosa", hex: "#FFDAB9" },
  { name: "Kräftigrosa", hex: "#FF1493" },
  { name: "Pink", hex: "#FF69B4" },


  // ==========================================================
  // 🟣 VIOLETTE UND LILA FARBEN
  // ==========================================================

  { name: "Dunkelviolett", hex: "#9400D3" },
  { name: "Violett", hex: "#EE82EE" },
  { name: "Lila", hex: "#800080" },
  { name: "Opalviolett", hex: "#7B5763" },
  { name: "Indigoviolett", hex: "#4B0082" },
  { name: "Pflaumenlila", hex: "#DDA0DD" },
  { name: "Lavendel", hex: "#E6E6FA" },
  { name: "Flieder", hex: "#D8BFD8" },
  { name: "Orchideenlila", hex: "#DA70D6" },
  { name: "Purpur", hex: "#9370DB" },
  { name: "Rotviolett", hex: "#C71585" },
  { name: "Blaubeerviolett", hex: "#8A2BE2" },
  { name: "Schieferlila", hex: "#6A5ACD" },


  // ==========================================================
  // 🟠 ORANGE FARBEN
  // ==========================================================

  { name: "Dunkelorange", hex: "#FF8C00" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Orangerot", hex: "#FF4500" },
  { name: "Terrakotta", hex: "#C65D3B" },
  { name: "Rostorange", hex: "#A04000" },
  { name: "Kürbisorange", hex: "#D35400" },
  { name: "Aprikose", hex: "#FBCEB1" },
  { name: "Pfirsich", hex: "#FFE5B4" },
  { name: "Lachsorange", hex: "#FFA07A" },


  // ==========================================================
  // 🟡 GELBE FARBEN
  // ==========================================================

  { name: "Dunkelgelb", hex: "#D4A017" },
  { name: "Goldgelb", hex: "#FDE89B" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Gelb", hex: "#FFFF00" },
  { name: "Sonnengelb", hex: "#FFF3B3" },
  { name: "Champagnergelb", hex: "#EFE5C4" },
  { name: "Wüstengelb", hex: "#D0C0A1" },
  { name: "Pergamentgelb", hex: "#EBE4CB" },
  { name: "Zitronengelb", hex: "#FFFACD" },
  { name: "Maisgelb", hex: "#FFF8DC" },
  { name: "Hellgelb", hex: "#FFFFE0" },
  { name: "Blasses Goldgelb", hex: "#EEE8AA" },
  { name: "Khakigelb", hex: "#F0E68C" },
  { name: "Senfgelb", hex: "#D4A017" },


  // ==========================================================
  // 🟢 GRÜNE FARBEN
  // ==========================================================

  { name: "Dunkelgrün", hex: "#006400" },
  { name: "Tiefwaldgrün", hex: "#0B3D0B" },
  { name: "Waldgrün", hex: "#228B22" },
  { name: "Gedämpftes Waldgrün", hex: "#4E685F" },
  { name: "Tannengrün", hex: "#1E5631" },
  { name: "Piniengrün", hex: "#6C7F69" },
  { name: "Moosgrün", hex: "#4A7C59" },
  { name: "Olivgrün", hex: "#6B8E23" },
  { name: "Oliv", hex: "#808000" },
  { name: "Salbeigrün", hex: "#8FBC8F" },
  { name: "Agavengrün", hex: "#829D94" },
  { name: "Jadegrün", hex: "#B6C1B5" },
  { name: "Meergrün", hex: "#2E8B57" },
  { name: "Minzgrün", hex: "#98FF98" },
  { name: "Hellgrün", hex: "#90EE90" },
  { name: "Frühlingsgrün", hex: "#00FF7F" },
  { name: "Leuchtgrün", hex: "#39FF14" },
  { name: "Gelbgrün", hex: "#ADFF2F" },
  { name: "Lindgrün", hex: "#7CFC00" },
  { name: "Blassgrün", hex: "#98FB98" },
  { name: "Dunkelmeergrün", hex: "#8FBC8F" },
  { name: "Türkisgrün", hex: "#20B2AA" },
  { name: "Salbeiblattgrün", hex: "#E5EEE2" },


  // ==========================================================
  // 🔵 BLAUE FARBEN
  // ==========================================================

  { name: "Dunkelblau", hex: "#00008B" },
  { name: "Marineblau", hex: "#000080" },
  { name: "Mitternachtsblau", hex: "#191970" },
  { name: "Tiefseeblau", hex: "#434D67" },
  { name: "Königsblau", hex: "#4169E1" },
  { name: "Kobaltblau", hex: "#0000CD" },
  { name: "Stahlblau", hex: "#4682B4" },
  { name: "Schieferblau", hex: "#708090" },
  { name: "Kornblumenblau", hex: "#6495ED" },
  { name: "Himmelblau", hex: "#87CEEB" },
  { name: "Horizontblau", hex: "#819BB2" },
  { name: "Nordischblau", hex: "#A9B8BF" },
  { name: "Hellblau", hex: "#ADD8E6" },
  { name: "Eisblau", hex: "#BECDD6" },
  { name: "Lichtblau", hex: "#E0E4E9" },
  { name: "Azurblau", hex: "#F0FFFF" },
  { name: "Leuchtblau", hex: "#1E90FF" },
  { name: "Tiefhimmelblau", hex: "#00BFFF" },


  // ==========================================================
  // 🩵 TÜRKIS- UND AQUAMARINFARBEN
  // ==========================================================

  { name: "Dunkeltürkis", hex: "#008B8B" },
  { name: "Türkis", hex: "#40E0D0" },
  { name: "Aquamarin", hex: "#7FFFD4" },
  { name: "Helltürkis", hex: "#AFEEEE" },
  { name: "Mitteltürkis", hex: "#48D1CC" },
  { name: "Leuchttürkis", hex: "#00CED1" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Schaumgrün", hex: "#E8F6F3" },


  // ==========================================================
  // 🟤 BRAUNE FARBEN
  // ==========================================================

  { name: "Dunkelbraun", hex: "#3E2723" },
  { name: "Braun", hex: "#A52A2A" },
  { name: "Schokoladenbraun", hex: "#D2691E" },
  { name: "Sattelbraun", hex: "#8B4513" },
  { name: "Siennabraun", hex: "#A0522D" },
  { name: "Erdbraun", hex: "#A6957D" },
  { name: "Kaffeebraun", hex: "#5D4037" },
  { name: "Lattebraun", hex: "#8D6E63" },
  { name: "Karamellbraun", hex: "#A1887F" },
  { name: "Kaschmirbraun", hex: "#A99D93" },
  { name: "Rostbraun", hex: "#A04000" },


  // ==========================================================
  // 🟫 BEIGE- UND ERDFARBEN
  // ==========================================================

  { name: "Beige", hex: "#F5F5DC" },
  { name: "Wollbeige", hex: "#CFC0AE" },
  { name: "Strandbeige", hex: "#CBBFB3" },
  { name: "Leinenbeige", hex: "#EBE6DC" },
  { name: "Sand", hex: "#F4A460" },
  { name: "Sandbeige", hex: "#D2B48C" },
  { name: "Lehm", hex: "#8B5E3C" },
  { name: "Pergament", hex: "#EBE4CB" },
  { name: "Creme", hex: "#FFFDD0" },
  { name: "Vanillecreme", hex: "#FDF5E6" },
  { name: "Weizen", hex: "#F5DEB3" },
  { name: "Mandelcreme", hex: "#FFEBCD" },
  { name: "Mokka", hex: "#8B6F5A" },


  // ==========================================================
  // 🍑 HELLE WARMFARBEN
  // ==========================================================

  { name: "Muschelweiß", hex: "#FFF5EE" },
  { name: "Blütenweiß", hex: "#FFFAF0" },
  { name: "Antikweiß", hex: "#FAEBD7" },
  { name: "Leinenweiß", hex: "#FAF0E6" },
  { name: "Pfirsichcreme", hex: "#FFEFD5" },
  { name: "Pfirsichhaut", hex: "#FFDAB9" },
  { name: "Mokassin", hex: "#FFE4B5" },
  { name: "Bisque", hex: "#FFE4C4" },
  { name: "Blassgold", hex: "#FAFAD2" }

];


/* ============================================================
 * FARBPALETTEN / VORLAGEN
 * ============================================================ */

const TEMPLATES = [

  {
    name: "Ozeanbrise",
    colors: [
      { name: "Tiefes Nachtblau", hex: "#0A1628" },
      { name: "Ozeanblau", hex: "#1B4F72" },
      { name: "Meeresgrün", hex: "#148F77" },
      { name: "Aquamarinblau", hex: "#5DADE2" },
      { name: "Himmelblau", hex: "#AED6F1" },
      { name: "Meeresschaum", hex: "#E8F6F3" }
    ]
  },

  {
    name: "Sonnenuntergang",
    colors: [
      { name: "Tiefes Violett", hex: "#2C1654" },
      { name: "Purpurrosa", hex: "#8E2A6B" },
      { name: "Korallenrot", hex: "#E74C3C" },
      { name: "Orange", hex: "#E67E22" },
      { name: "Goldgelb", hex: "#F1C40F" },
      { name: "Creme", hex: "#FDEBD0" }
    ]
  },

  {
    name: "Waldgrün",
    colors: [
      { name: "Tiefes Waldgrün", hex: "#0B3D0B" },
      { name: "Tannengrün", hex: "#1E5631" },
      { name: "Moosgrün", hex: "#4A7C59" },
      { name: "Salbeigrün", hex: "#8FBC8F" },
      { name: "Minzgrün", hex: "#C8E6C9" },
      { name: "Elfenbein", hex: "#F5F5DC" }
    ]
  },

  {
    name: "Pastelltraum",
    colors: [
      { name: "Lavendel", hex: "#E6E6FA" },
      { name: "Zartrosa", hex: "#FFD1DC" },
      { name: "Pfirsich", hex: "#FFDAB9" },
      { name: "Minzgrün", hex: "#B2F2BB" },
      { name: "Himmelblau", hex: "#A0D2DB" },
      { name: "Flieder", hex: "#D4B5E8" }
    ]
  },

  {
    name: "Monochrom",
    colors: [
      { name: "Schwarz", hex: "#0D0D0D" },
      { name: "Anthrazit", hex: "#2C2C2C" },
      { name: "Schiefergrau", hex: "#4A4A4A" },
      { name: "Grau", hex: "#7A7A7A" },
      { name: "Silber", hex: "#B0B0B0" },
      { name: "Weiß", hex: "#F5F5F5" }
    ]
  },

  {
    name: "Herbstlaub",
    colors: [
      { name: "Burgunderrot", hex: "#5C1A1A" },
      { name: "Rostbraun", hex: "#A04000" },
      { name: "Kürbisorange", hex: "#D35400" },
      { name: "Bernstein", hex: "#E67E22" },
      { name: "Senfgelb", hex: "#D4A017" },
      { name: "Weizen", hex: "#F5DEB3" }
    ]
  },

  {
    name: "Nordlicht",
    colors: [
      { name: "Mitternachtsblau", hex: "#0B0B2B" },
      { name: "Indigoblau", hex: "#1A237E" },
      { name: "Violett", hex: "#6A1B9A" },
      { name: "Purpurrot", hex: "#AD1457" },
      { name: "Leuchttürkis", hex: "#00E5FF" },
      { name: "Leuchtgrün", hex: "#76FF03" }
    ]
  },

  {
    name: "Kaffee und Creme",
    colors: [
      { name: "Espressobraun", hex: "#3E2723" },
      { name: "Kaffeebraun", hex: "#5D4037" },
      { name: "Lattebraun", hex: "#8D6E63" },
      { name: "Karamell", hex: "#A1887F" },
      { name: "Cremebeige", hex: "#D7CCC8" },
      { name: "Milchschaum", hex: "#EFEBE9" }
    ]
  },

  {
    name: "Neonnacht",
    colors: [
      { name: "Schwarz", hex: "#0A0A0A" },
      { name: "Leuchtblau", hex: "#00D4FF" },
      { name: "Neonrosa", hex: "#FF00AA" },
      { name: "Neongrün", hex: "#39FF14" },
      { name: "Neongelb", hex: "#FFFF00" },
      { name: "Leuchtviolett", hex: "#BF00FF" }
    ]
  },

  {
    name: "Erdige Töne",
    colors: [
      { name: "Lehmbraun", hex: "#8B5E3C" },
      { name: "Terrakotta", hex: "#C65D3B" },
      { name: "Sandbeige", hex: "#D2B48C" },
      { name: "Olivgrün", hex: "#6B8E23" },
      { name: "Steingrau", hex: "#8B8680" },
      { name: "Knochenweiß", hex: "#E8DCC8" }
    ]
  }

];


/* ============================================================
 * STATE
 * ============================================================ */

let stream = null;
let currentColor = null;
let userPalette = [];

const MAX_PALETTE = 12;

let crossX = 0.5;
let crossY = 0.5;
let isDragging = false;


/* ============================================================
 * DOM
 * ============================================================ */

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const previewImg = document.getElementById("previewImg");
const placeholder = document.getElementById("placeholder");
const crosshair = document.getElementById("crosshair");
const previewWrap = document.getElementById("previewWrap");
const scanControls = document.getElementById("scanControls");

const resultSwatch = document.getElementById("resultSwatch");
const resultName = document.getElementById("resultName");
const resultHex = document.getElementById("resultHex");
const resultRgb = document.getElementById("resultRgb");

const paletteStripColors = document.getElementById("paletteStripColors");
const paletteCount = document.getElementById("paletteCount");

const fileInput = document.getElementById("fileInput");
const toastEl = document.getElementById("toast");

const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");
const menuBtn = document.getElementById("menuBtn");
const menuPaletteList = document.getElementById("menuPaletteList");

const templatesModal = document.getElementById("templatesModal");
const templatesBody = document.getElementById("templatesBody");

const rotateHint = document.getElementById("rotateHint");


/* ============================================================
 * ZUSÄTZLICHE ERGEBNIS-INFORMATIONEN
 * ============================================================
 *
 * Wir erzeugen diese Elemente automatisch, falls sie im HTML
 * noch nicht vorhanden sind.
 */

function ensureResultDetails() {

  if (!resultName || !resultHex || !resultRgb) {
    return null;
  }

  let details = document.getElementById("resultDetails");

  if (!details) {

    details = document.createElement("div");
    details.id = "resultDetails";

    details.style.marginTop = "8px";
    details.style.fontSize = "12px";
    details.style.lineHeight = "1.5";
    details.style.opacity = "0.8";

    resultRgb.insertAdjacentElement("afterend", details);
  }

  return details;
}


/* ============================================================
 * CROSSHAIR DOM
 * ============================================================ */

(function initCrosshairDOM() {

  if (!crosshair) return;

  if (!crosshair.querySelector(".crosshair-ring")) {

    const ring = document.createElement("div");

    ring.className = "crosshair-ring";

    crosshair.appendChild(ring);
  }

})();


/* ============================================================
 * HILFSFUNKTIONEN
 * ============================================================ */

function hexToRgb(hex) {

  if (typeof hex !== "string") {
    return { r: 0, g: 0, b: 0 };
  }

  const h = hex.replace("#", "").trim();

  const full =
    h.length === 3
      ? h.split("").map(c => c + c).join("")
      : h;

  const n = parseInt(full, 16);

  if (Number.isNaN(n)) {
    return { r: 0, g: 0, b: 0 };
  }

  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255
  };
}


function rgbToHex(r, g, b) {

  return "#" + [r, g, b]
    .map(v =>
      Math.max(0, Math.min(255, Math.round(v)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")
    .toUpperCase();

}


/*
 * Klassischer euklidischer RGB-Abstand.
 *
 * Maximale Entfernung:
 * sqrt(255² + 255² + 255²)
 *
 * Diese Methode ist einfach und schnell und eignet sich
 * für den lokalen Farbnamen-Vergleich.
 */
function colorDistance(c1, c2) {

  return Math.sqrt(
    Math.pow(c1.r - c2.r, 2) +
    Math.pow(c1.g - c2.g, 2) +
    Math.pow(c1.b - c2.b, 2)
  );

}


/*
 * Wandelt die Distanz in eine verständliche Prozentzahl um.
 *
 * 100 % = exakt gleiche RGB-Farbe
 * 0 %   = maximal weit entfernt
 */
function colorSimilarity(distance) {

  const maxDistance = Math.sqrt(
    Math.pow(255, 2) +
    Math.pow(255, 2) +
    Math.pow(255, 2)
  );

  const similarity =
    (1 - distance / maxDistance) * 100;

  return Math.max(
    0,
    Math.min(100, similarity)
  );

}


/* ============================================================
 * NÄCHSTE REFERENZFARBE FINDEN
 * ============================================================
 *
 * WICHTIG:
 *
 * Diese Funktion gibt jetzt NICHT mehr nur den Namen zurück.
 *
 * Sie liefert:
 *
 * {
 *   name: "Opalviolett",
 *   hex: "#7B5763",
 *   distance: ...,
 *   similarity: ...
 * }
 *
 * Dadurch kennen wir sowohl den Namen als auch die
 * tatsächlich verwendete Referenzfarbe.
 */

function nearestColor(hex) {

  const rgb = hexToRgb(hex);

  let best = COLOR_NAMES[0];
  let bestDist = Infinity;

  for (const color of COLOR_NAMES) {

    const referenceRgb = hexToRgb(color.hex);

    const distance =
      colorDistance(rgb, referenceRgb);

    if (distance < bestDist) {

      bestDist = distance;
      best = color;

    }

  }

  return {

    name: best.name,
    hex: best.hex,
    distance: bestDist,
    similarity: colorSimilarity(bestDist)

  };

}


/*
 * Kompatibilitätsfunktion.
 *
 * Falls an anderer Stelle des Programms nur der Name
 * benötigt wird, funktioniert nearestColorName() weiterhin.
 */

function nearestColorName(hex) {

  return nearestColor(hex).name;

}


/* ============================================================
 * ERGEBNIS ANZEIGEN
 * ============================================================ */

function setResult(hex) {

  if (!hex) return;

  const normalizedHex =
    rgbToHex(
      hexToRgb(hex).r,
      hexToRgb(hex).g,
      hexToRgb(hex).b
    );

  const rgb = hexToRgb(normalizedHex);

  const reference =
    nearestColor(normalizedHex);

  /*
   * currentColor enthält bewusst BEIDE Farben:
   *
   * hex:
   *    tatsächlich gescannte Farbe
   *
   * referenceHex:
   *    Farbe aus der Datenbank
   */

  currentColor = {

    hex: normalizedHex,

    name: reference.name,

    rgb: rgb,

    referenceHex: reference.hex,

    referenceName: reference.name,

    distance: reference.distance,

    similarity: reference.similarity

  };


  /* ----------------------------------------------------------
   * Hauptanzeige
   * -------------------------------------------------------- */

  if (resultSwatch) {
    resultSwatch.style.background = normalizedHex;
  }

  if (resultName) {
    resultName.textContent = reference.name;
  }

  if (resultHex) {
    resultHex.textContent = normalizedHex;
  }

  if (resultRgb) {

    resultRgb.textContent =
      `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  }


  /* ----------------------------------------------------------
   * Zusätzliche Informationen
   * -------------------------------------------------------- */

  const details = ensureResultDetails();

  if (details) {

    details.innerHTML = `
      <div>
        Referenzfarbe:
        <strong>${reference.name}</strong>
        ${reference.hex}
      </div>
      <div>
        Ähnlichkeit:
        <strong>${reference.similarity.toFixed(1)} %</strong>
      </div>
    `;

  }

}


/* ============================================================
 * TOAST
 * ============================================================ */

function showToast(msg, duration = 10000) {

  if (!toastEl) return;

  toastEl.textContent = msg;

  toastEl.classList.add("is-visible");

  clearTimeout(showToast._t);

  showToast._t = setTimeout(
    () => toastEl.classList.remove("is-visible"),
    duration
  );

}


/* ============================================================
 * PALETTE UI
 * ============================================================ */

function updatePaletteUI() {

  if (paletteStripColors) {

    paletteStripColors.innerHTML = "";

    userPalette.forEach((color) => {

      const dot =
        document.createElement("div");

      dot.className = "palette-dot";

      dot.style.background = color.hex;

      dot.dataset.hex = color.hex;

      dot.title =
        `${color.name} ${color.hex}`;

      dot.addEventListener(
        "click",
        () => setResult(color.hex)
      );

      paletteStripColors.appendChild(dot);

    });

  }


  if (paletteCount) {
    paletteCount.textContent =
      userPalette.length;
  }


  if (!menuPaletteList) return;

  menuPaletteList.innerHTML = "";


  if (userPalette.length === 0) {

    menuPaletteList.innerHTML =
      '<p style="color:var(--text-muted);font-size:13px;">Noch keine Farben gespeichert.</p>';

    return;
  }


  userPalette.forEach((color, index) => {

    const item =
      document.createElement("div");

    item.className =
      "menu-color-item";


    const referenceText =
      color.referenceHex
        ? `Referenz: ${color.referenceHex}`
        : "";


    item.innerHTML = `
      <div
        class="menu-color-swatch"
        style="background:${color.hex}">
      </div>

      <div class="menu-color-meta">

        <div class="menu-color-name">
          ${color.name}
        </div>

        <div class="menu-color-hex">
          ${color.hex}
        </div>

        ${
          referenceText
            ? `<div class="menu-color-reference">${referenceText}</div>`
            : ""
        }

      </div>

      <button
        class="menu-color-remove"
        type="button"
        data-i="${index}"
        aria-label="Entfernen">
        ×
      </button>
    `;


    item
      .querySelector(".menu-color-remove")
      .addEventListener("click", (event) => {

        event.stopPropagation();

        userPalette.splice(index, 1);

        savePalette();

        updatePaletteUI();

        showToast("Farbe entfernt");

      });


    item.addEventListener(
      "click",
      () => {

        setResult(color.hex);

        closeMenu();

      }
    );


    menuPaletteList.appendChild(item);

  });

}


/* ============================================================
 * PALETTE SPEICHERN
 * ============================================================ */

function savePalette() {

  try {

    localStorage.setItem(
      "farbenscanner_palette",
      JSON.stringify(userPalette)
    );

  } catch (_) {

    console.warn(
      "Palette konnte nicht gespeichert werden."
    );

  }

}


/* ============================================================
 * PALETTE LADEN
 * ============================================================ */

function loadPalette() {

  try {

    const raw =
      localStorage.getItem(
        "farbenscanner_palette"
      );

    if (raw) {

      const parsed =
        JSON.parse(raw);

      if (Array.isArray(parsed)) {

        userPalette =
          parsed
            .filter(item =>
              item &&
              typeof item.hex === "string"
            )
            .map(item => {

              const hex =
                rgbToHex(
                  hexToRgb(item.hex).r,
                  hexToRgb(item.hex).g,
                  hexToRgb(item.hex).b
                );

              const reference =
                nearestColor(hex);

              return {

                hex,

                name:
                  item.name ||
                  reference.name,

                rgb:
                  hexToRgb(hex),

                referenceHex:
                  item.referenceHex ||
                  reference.hex,

                referenceName:
                  item.referenceName ||
                  reference.name,

                distance:
                  typeof item.distance === "number"
                    ? item.distance
                    : reference.distance,

                similarity:
                  typeof item.similarity === "number"
                    ? item.similarity
                    : reference.similarity

              };

            })
            .slice(0, MAX_PALETTE);

      }

    }

  } catch (_) {

    userPalette = [];

  }

  updatePaletteUI();

}


/* ============================================================
 * CROSSHAIR POSITION
 * ============================================================ */

function updateCrosshairPosition() {

  if (!previewWrap || !crosshair) return;

  const rect =
    previewWrap.getBoundingClientRect();

  if (
    rect.width <= 0 ||
    rect.height <= 0
  ) {
    return;
  }

  const x =
    crossX * rect.width;

  const y =
    crossY * rect.height;

  crosshair.style.left =
    x + "px";

  crosshair.style.top =
    y + "px";

  crosshair.style.marginLeft =
    "-18px";

  crosshair.style.marginTop =
    "-18px";

}


function setCrosshairFromEvent(
  clientX,
  clientY
) {

  if (!previewWrap) return;

  const rect =
    previewWrap.getBoundingClientRect();

  if (
    rect.width <= 0 ||
    rect.height <= 0
  ) {
    return;
  }

  let x =
    (clientX - rect.left) /
    rect.width;

  let y =
    (clientY - rect.top) /
    rect.height;

  x =
    Math.max(
      0.02,
      Math.min(0.98, x)
    );

  y =
    Math.max(
      0.02,
      Math.min(0.98, y)
    );

  crossX = x;
  crossY = y;

  updateCrosshairPosition();

}


function showCrosshair() {

  if (!crosshair) return;

  crosshair.style.display =
    "block";

  crossX = 0.5;
  crossY = 0.5;

  updateCrosshairPosition();

}


function hideCrosshair() {

  if (!crosshair) return;

  crosshair.style.display =
    "none";

  isDragging = false;

  crosshair.classList.remove(
    "is-dragging"
  );

}


/* ============================================================
 * DRAG HANDLER
 * ============================================================ */

function onPointerDown(event) {

  if (
    !crosshair ||
    crosshair.style.display === "none"
  ) {
    return;
  }

  event.preventDefault();

  isDragging = true;

  crosshair.classList.add(
    "is-dragging"
  );

  const point =
    event.touches
      ? event.touches[0]
      : event;

  setCrosshairFromEvent(
    point.clientX,
    point.clientY
  );

}


function onPointerMove(event) {

  if (!isDragging) return;

  event.preventDefault();

  const point =
    event.touches
      ? event.touches[0]
      : event;

  setCrosshairFromEvent(
    point.clientX,
    point.clientY
  );

}


function onPointerUp() {

  if (!isDragging) return;

  isDragging = false;

  if (crosshair) {

    crosshair.classList.remove(
      "is-dragging"
    );

  }

}


if (crosshair) {

  crosshair.addEventListener(
    "mousedown",
    onPointerDown
  );

  crosshair.addEventListener(
    "touchstart",
    onPointerDown,
    { passive: false }
  );

}


if (previewWrap) {

  previewWrap.addEventListener(
    "mousedown",
    (event) => {

      if (
        !crosshair ||
        crosshair.style.display === "none"
      ) {
        return;
      }

      if (
        event.target.closest("button")
      ) {
        return;
      }

      onPointerDown(event);

    }
  );


  previewWrap.addEventListener(
    "touchstart",
    (event) => {

      if (
        !crosshair ||
        crosshair.style.display === "none"
      ) {
        return;
      }

      if (
        event.target.closest("button")
      ) {
        return;
      }

      onPointerDown(event);

    },
    { passive: false }
  );

}


document.addEventListener(
  "mousemove",
  onPointerMove
);

document.addEventListener(
  "touchmove",
  onPointerMove,
  { passive: false }
);

document.addEventListener(
  "mouseup",
  onPointerUp
);

document.addEventListener(
  "touchend",
  onPointerUp
);

document.addEventListener(
  "touchcancel",
  onPointerUp
);


window.addEventListener(
  "resize",
  () => {

    if (
      crosshair &&
      crosshair.style.display !== "none"
    ) {
      updateCrosshairPosition();
    }

  }
);


/* ============================================================
 * SAMPLE POINT
 * ============================================================ */

function getSamplePoint(
  naturalW,
  naturalH
) {

  if (!previewWrap) {

    return {
      x: Math.floor(naturalW / 2),
      y: Math.floor(naturalH / 2)
    };

  }

  const rect =
    previewWrap.getBoundingClientRect();

  const wrapW =
    rect.width;

  const wrapH =
    rect.height;

  if (
    wrapW <= 0 ||
    wrapH <= 0 ||
    naturalW <= 0 ||
    naturalH <= 0
  ) {

    return {
      x: Math.floor(naturalW / 2),
      y: Math.floor(naturalH / 2)
    };

  }


  const scale =
    Math.min(
      wrapW / naturalW,
      wrapH / naturalH
    );

  const dispW =
    naturalW * scale;

  const dispH =
    naturalH * scale;

  const offsetX =
    (wrapW - dispW) / 2;

  const offsetY =
    (wrapH - dispH) / 2;

  const px =
    crossX * wrapW;

  const py =
    crossY * wrapH;


  let sx =
    (px - offsetX) /
    scale;

  let sy =
    (py - offsetY) /
    scale;


  sx =
    Math.max(
      0,
      Math.min(
        naturalW - 1,
        sx
      )
    );

  sy =
    Math.max(
      0,
      Math.min(
        naturalH - 1,
        sy
      )
    );


  return {
    x: Math.floor(sx),
    y: Math.floor(sy)
  };

}


/* ============================================================
 * FARBE AUS CANVAS AUSLESEN
 * ============================================================ */

function sampleFromCanvas() {

  if (
    !canvas ||
    !canvas.width ||
    !canvas.height
  ) {
    return;
  }


  const ctx =
    canvas.getContext(
      "2d",
      {
        willReadFrequently: true
      }
    );

  if (!ctx) return;


  const point =
    getSamplePoint(
      canvas.width,
      canvas.height
    );


  /*
   * Wir verwenden nicht nur einen einzelnen Pixel.
   *
   * Dadurch wird das Ergebnis stabiler, wenn sich
   * beispielsweise Bildrauschen oder kleine Details
   * unter dem Fadenkreuz befinden.
   */

  const size =
    Math.max(
      6,
      Math.min(
        20,
        Math.floor(
          Math.min(
            canvas.width,
            canvas.height
          ) / 40
        )
      )
    );


  const x0 =
    Math.max(
      0,
      point.x -
        Math.floor(size / 2)
    );

  const y0 =
    Math.max(
      0,
      point.y -
        Math.floor(size / 2)
    );


  const w =
    Math.min(
      size,
      canvas.width - x0
    );

  const h =
    Math.min(
      size,
      canvas.height - y0
    );


  if (w <= 0 || h <= 0) {
    return;
  }


  let data;

  try {

    data =
      ctx.getImageData(
        x0,
        y0,
        w,
        h
      ).data;

  } catch (error) {

    console.error(
      "Pixel konnten nicht gelesen werden:",
      error
    );

    showToast(
      "Farbe konnte nicht gelesen werden"
    );

    return;

  }


  let r = 0;
  let g = 0;
  let b = 0;
  let count = 0;


  for (
    let i = 0;
    i < data.length;
    i += 4
  ) {

    const alpha =
      data[i + 3];

    /*
     * Transparente Pixel werden ignoriert.
     */

    if (alpha === 0) {
      continue;
    }

    r += data[i];
    g += data[i + 1];
    b += data[i + 2];

    count++;

  }


  if (count === 0) {
    return;
  }


  r =
    Math.round(r / count);

  g =
    Math.round(g / count);

  b =
    Math.round(b / count);


  const hex =
    rgbToHex(r, g, b);


  setResult(hex);


  const reference =
    nearestColor(hex);


  showToast(
    `${reference.name} · ${hex}`,
    10000
  );

}


/* ============================================================
 * VIDEO AUF CANVAS ÜBERTRAGEN
 * ============================================================ */

function captureFromVideo() {

  if (
    !video ||
    !video.videoWidth
  ) {
    return;
  }


  const ctx =
    canvas.getContext(
      "2d",
      {
        willReadFrequently: true
      }
    );

  if (!ctx) return;


  canvas.width =
    video.videoWidth;

  canvas.height =
    video.videoHeight;


  ctx.drawImage(
    video,
    0,
    0
  );


  sampleFromCanvas();

}


/* ============================================================
 * BILD AUF CANVAS ÜBERTRAGEN
 * ============================================================ */

function prepareImageCanvas() {

  if (
    !previewImg ||
    !previewImg.naturalWidth
  ) {
    return;
  }


  const ctx =
    canvas.getContext(
      "2d",
      {
        willReadFrequently: true
      }
    );

  if (!ctx) return;


  canvas.width =
    previewImg.naturalWidth;

  canvas.height =
    previewImg.naturalHeight;


  ctx.drawImage(
    previewImg,
    0,
    0
  );

}


/* ============================================================
 * KAMERA
 * ============================================================ */

async function startCamera() {

  stopCamera();

  try {

    stream =
      await navigator.mediaDevices
        .getUserMedia({

          video: {
            facingMode: {
              ideal: "environment"
            },
            width: {
              ideal: 1280
            },
            height: {
              ideal: 720
            }
          },

          audio: false

        });


    video.srcObject =
      stream;

    video.style.display =
      "block";

    canvas.style.display =
      "none";

    previewImg.style.display =
      "none";

    placeholder.style.display =
      "none";

    scanControls.style.display =
      "flex";


    showCrosshair();


    await video.play();

  } catch (error) {

    showToast(
      "Kamera nicht verfügbar: " +
      (
        error.message ||
        "Berechtigung fehlt"
      )
    );

    console.error(error);

  }

}


/* ============================================================
 * KAMERA STOPPEN
 * ============================================================ */

function stopCamera() {

  if (stream) {

    stream
      .getTracks()
      .forEach(
        track => track.stop()
      );

    stream = null;

  }


  if (video) {

    video.srcObject =
      null;

    video.style.display =
      "none";

  }


  hideCrosshair();


  if (scanControls) {

    scanControls.style.display =
      "none";

  }


  if (
    previewImg &&
    previewImg.style.display !== "block"
  ) {

    placeholder.style.display =
      "flex";

  }

}


/* ============================================================
 * BILD LADEN
 * ============================================================ */

function loadImageFile(file) {

  if (
    !file ||
    !file.type.startsWith("image/")
  ) {

    showToast(
      "Bitte eine Bilddatei wählen"
    );

    return;
  }


  stopCamera();


  const url =
    URL.createObjectURL(file);


  previewImg.onload =
    () => {

      placeholder.style.display =
        "none";

      previewImg.style.display =
        "block";

      video.style.display =
        "none";

      canvas.style.display =
        "none";

      scanControls.style.display =
        "flex";


      showCrosshair();


      prepareImageCanvas();

      sampleFromCanvas();


      URL.revokeObjectURL(url);

    };


  previewImg.onerror =
    () => {

      showToast(
        "Bild konnte nicht geladen werden"
      );

      URL.revokeObjectURL(url);

    };


  previewImg.src =
    url;

}


/* ============================================================
 * MENÜ
 * ============================================================ */

function openMenu() {

  if (!sideMenu) return;

  sideMenu.classList.add(
    "is-open"
  );

  sideMenu.setAttribute(
    "aria-hidden",
    "false"
  );


  if (menuOverlay) {

    menuOverlay.classList.add(
      "is-open"
    );

  }


  if (menuBtn) {

    menuBtn.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  updatePaletteUI();

}


function closeMenu() {

  if (!sideMenu) return;

  sideMenu.classList.remove(
    "is-open"
  );

  sideMenu.setAttribute(
    "aria-hidden",
    "true"
  );


  if (menuOverlay) {

    menuOverlay.classList.remove(
      "is-open"
    );

  }


  if (menuBtn) {

    menuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

  }

}


/* ============================================================
 * VORLAGEN RENDERN
 * ============================================================ */

function renderTemplates() {

  if (!templatesBody) return;

  templatesBody.innerHTML = "";


  TEMPLATES.forEach(
    (template, index) => {

      const card =
        document.createElement("div");

      card.className =
        "template-card";


      const colorsHtml =
        template.colors
          .map(color => `
            <div
              class="template-swatch"
              style="background:${color.hex}"
              data-hex="${color.hex}"
              title="${color.name} ${color.hex}">
            </div>
          `)
          .join("");


      const labelsHtml =
        template.colors
          .map(color => `
            <div
              class="template-label"
              title="${color.name}">
              ${color.name}
            </div>
          `)
          .join("");


      card.innerHTML = `

        <div class="template-name">
          ${template.name}
        </div>

        <div class="template-colors">
          ${colorsHtml}
        </div>

        <div class="template-labels">
          ${labelsHtml}
        </div>

        <div class="template-actions">

          <button
            class="template-use-btn"
            type="button"
            data-idx="${index}">
            Palette übernehmen
          </button>

        </div>

      `;


      card
        .querySelectorAll(
          ".template-swatch"
        )
        .forEach(
          swatch => {

            swatch.addEventListener(
              "click",
              () => {

                setResult(
                  swatch.dataset.hex
                );

                showToast(
                  swatch.dataset.hex,
                  10000
                );

              }
            );

          }
        );


      card
        .querySelector(
          ".template-use-btn"
        )
        .addEventListener(
          "click",
          () => {

            const template =
              TEMPLATES[index];


            userPalette =
              template.colors
                .map(color => {

                  const reference =
                    nearestColor(
                      color.hex
                    );

                  return {

                    hex: color.hex,

                    name: color.name,

                    rgb:
                      hexToRgb(
                        color.hex
                      ),

                    referenceHex:
                      reference.hex,

                    referenceName:
                      reference.name,

                    distance:
                      reference.distance,

                    similarity:
                      reference.similarity

                  };

                });


            savePalette();

            updatePaletteUI();


            if (template.colors[0]) {

              setResult(
                template.colors[0].hex
              );

            }


            closeTemplates();


            showToast(
              `„${template.name}“ geladen`
            );

          }
        );


      templatesBody.appendChild(
        card
      );

    }
  );

}


/* ============================================================
 * VORLAGEN ÖFFNEN / SCHLIESSEN
 * ============================================================ */

function openTemplates() {

  if (!templatesModal) return;

  renderTemplates();

  templatesModal.classList.add(
    "is-open"
  );

  templatesModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeTemplates() {

  if (!templatesModal) return;

  templatesModal.classList.remove(
    "is-open"
  );

  templatesModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


/* ============================================================
 * KAFFEE-MODAL
 * ============================================================ */

function openCoffeeModal() {

  const modal =
    document.getElementById(
      "coffeeModal"
    );

  if (!modal) return;

  modal.classList.add(
    "is-open"
  );

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  const closeButton =
    document.getElementById(
      "coffeeClose"
    );

  if (closeButton) {
    closeButton.focus();
  }

}


function closeCoffeeModal() {

  const modal =
    document.getElementById(
      "coffeeModal"
    );

  if (!modal) return;

  modal.classList.remove(
    "is-open"
  );

  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  const trigger =
    document.getElementById(
      "coffeeTrigger"
    );

  if (trigger) {
    trigger.focus();
  }

}


/* ============================================================
 * BUTTON-EVENTS
 * ============================================================ */

const cameraBtn =
  document.getElementById(
    "cameraBtn"
  );

if (cameraBtn) {

  cameraBtn.addEventListener(
    "click",
    startCamera
  );

}


const imageBtn =
  document.getElementById(
    "imageBtn"
  );

if (imageBtn) {

  imageBtn.addEventListener(
    "click",
    () => {

      if (fileInput) {
        fileInput.click();
      }

    }
  );

}


const paletteBtn =
  document.getElementById(
    "paletteBtn"
  );

if (paletteBtn) {

  paletteBtn.addEventListener(
    "click",
    openMenu
  );

}


const templatesBtn =
  document.getElementById(
    "templatesBtn"
  );

if (templatesBtn) {

  templatesBtn.addEventListener(
    "click",
    openTemplates
  );

}


/* ============================================================
 * AUFNAHME-BUTTON
 * ============================================================ */

const captureBtn =
  document.getElementById(
    "captureBtn"
  );

if (captureBtn) {

  captureBtn.addEventListener(
    "click",
    () => {

      if (
        video &&
        video.style.display !== "none" &&
        stream
      ) {

        captureFromVideo();

      } else if (
        previewImg &&
        previewImg.style.display !== "none"
      ) {

        prepareImageCanvas();

        sampleFromCanvas();

      } else if (
        canvas &&
        canvas.width
      ) {

        sampleFromCanvas();

      }

    }
  );

}


/* ============================================================
 * KAMERA STOP BUTTON
 * ============================================================ */

const stopCamBtn =
  document.getElementById(
    "stopCamBtn"
  );

if (stopCamBtn) {

  stopCamBtn.addEventListener(
    "click",
    () => {

      stopCamera();


      if (previewImg) {

        previewImg.style.display =
          "none";

      }


      if (canvas) {

        canvas.style.display =
          "none";

      }


      if (placeholder) {

        placeholder.style.display =
          "flex";

      }


      hideCrosshair();


      if (scanControls) {

        scanControls.style.display =
          "none";

      }

    }
  );

}


/* ============================================================
 * DATEI-INPUT
 * ============================================================ */

if (fileInput) {

  fileInput.addEventListener(
    "change",
    event => {

      const file =
        event.target.files &&
        event.target.files[0];

      if (file) {

        loadImageFile(file);

      }

      fileInput.value = "";

    }
  );

}


/* ============================================================
 * HEX KOPIEREN
 * ============================================================ */

const copyHexBtn =
  document.getElementById(
    "copyHexBtn"
  );

if (copyHexBtn) {

  copyHexBtn.addEventListener(
    "click",
    async () => {

      if (!currentColor) return;

      try {

        await navigator.clipboard
          .writeText(
            currentColor.hex
          );

        showToast(
          "HEX kopiert: " +
          currentColor.hex
        );

      } catch (_) {

        showToast(
          "Kopieren nicht möglich"
        );

      }

    }
  );

}


/* ============================================================
 * RGB KOPIEREN
 * ============================================================ */

const copyRgbBtn =
  document.getElementById(
    "copyRgbBtn"
  );

if (copyRgbBtn) {

  copyRgbBtn.addEventListener(
    "click",
    async () => {

      if (!currentColor) return;


      const text =
        `rgb(${currentColor.rgb.r}, ${currentColor.rgb.g}, ${currentColor.rgb.b})`;


      try {

        await navigator.clipboard
          .writeText(text);

        showToast(
          "RGB kopiert"
        );

      } catch (_) {

        showToast(
          "Kopieren nicht möglich"
        );

      }

    }
  );

}


/* ============================================================
 * FARBE ZUR PALETTE HINZUFÜGEN
 * ============================================================ */

const addToPaletteBtn =
  document.getElementById(
    "addToPaletteBtn"
  );

if (addToPaletteBtn) {

  addToPaletteBtn.addEventListener(
    "click",
    () => {

      if (!currentColor) {

        showToast(
          "Zuerst eine Farbe scannen"
        );

        return;

      }


      if (
        userPalette.some(
          color =>
            color.hex ===
            currentColor.hex
        )
      ) {

        showToast(
          "Farbe bereits in Palette"
        );

        return;

      }


      if (
        userPalette.length >=
        MAX_PALETTE
      ) {

        showToast(
          "Palette voll (max. " +
          MAX_PALETTE +
          ")"
        );

        return;

      }


      userPalette.push({

        hex:
          currentColor.hex,

        name:
          currentColor.name,

        rgb:
          { ...currentColor.rgb },

        referenceHex:
          currentColor.referenceHex,

        referenceName:
          currentColor.referenceName,

        distance:
          currentColor.distance,

        similarity:
          currentColor.similarity

      });


      savePalette();

      updatePaletteUI();


      showToast(
        "Zur Palette hinzugefügt"
      );

    }
  );

}


/* ============================================================
 * PALETTE LEEREN
 * ============================================================ */

const clearPaletteBtn =
  document.getElementById(
    "clearPaletteBtn"
  );

if (clearPaletteBtn) {

  clearPaletteBtn.addEventListener(
    "click",
    () => {

      if (
        userPalette.length === 0
      ) {
        return;
      }


      userPalette = [];


      savePalette();

      updatePaletteUI();


      showToast(
        "Palette geleert"
      );

    }
  );

}


/* ============================================================
 * PALETTE EXPORTIEREN
 * ============================================================ */

const exportPaletteBtn =
  document.getElementById(
    "exportPaletteBtn"
  );

if (exportPaletteBtn) {

  exportPaletteBtn.addEventListener(
    "click",
    () => {

      if (
        userPalette.length === 0
      ) {

        showToast(
          "Palette ist leer"
        );

        return;

      }


      /*
       * Export enthält jetzt:
       *
       * Farbname
       * gescannter HEX-Wert
       * RGB-Wert
       * Referenz-HEX
       * Ähnlichkeit
       */

      const text =
        userPalette
          .map(color => {

            return [
              color.name,
              color.hex,
              `rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`,
              `Referenz: ${color.referenceHex || ""}`,
              `Ähnlichkeit: ${
                typeof color.similarity === "number"
                  ? color.similarity.toFixed(1) + "%"
                  : ""
              }`
            ].join("\t");

          })
          .join("\n");


      navigator.clipboard
        .writeText(text)
        .then(
          () =>
            showToast(
              "Palette kopiert"
            )
        )
        .catch(
          () =>
            showToast(
              "Export fehlgeschlagen"
            )
        );

    }
  );

}


/* ============================================================
 * MENÜ BUTTON
 * ============================================================ */

if (menuBtn) {

  menuBtn.addEventListener(
    "click",
    () => {

      if (
        sideMenu &&
        sideMenu.classList.contains(
          "is-open"
        )
      ) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );

}


const closeMenuBtn =
  document.getElementById(
    "closeMenuBtn"
  );

if (closeMenuBtn) {

  closeMenuBtn.addEventListener(
    "click",
    closeMenu
  );

}


if (menuOverlay) {

  menuOverlay.addEventListener(
    "click",
    closeMenu
  );

}


/* ============================================================
 * TEMPLATE MODAL
 * ============================================================ */

const closeTemplatesBtn =
  document.getElementById(
    "closeTemplatesBtn"
  );

if (closeTemplatesBtn) {

  closeTemplatesBtn.addEventListener(
    "click",
    closeTemplates
  );

}


if (templatesModal) {

  templatesModal.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        templatesModal
      ) {

        closeTemplates();

      }

    }
  );

}


/* ============================================================
 * KAFFEE MODAL
 * ============================================================ */

const coffeeTrigger =
  document.getElementById(
    "coffeeTrigger"
  );

if (coffeeTrigger) {

  coffeeTrigger.addEventListener(
    "click",
    openCoffeeModal
  );

}


const coffeeClose =
  document.getElementById(
    "coffeeClose"
  );

if (coffeeClose) {

  coffeeClose.addEventListener(
    "click",
    closeCoffeeModal
  );

}


const coffeeModal =
  document.getElementById(
    "coffeeModal"
  );

if (coffeeModal) {

  coffeeModal.addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "coffeeModal"
      ) {

        closeCoffeeModal();

      }

    }
  );

}


/* ============================================================
 * ESCAPE-TASTE
 * ============================================================ */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") {
      return;
    }


    const coffee =
      document.getElementById(
        "coffeeModal"
      );


    if (
      coffee &&
      coffee.classList.contains(
        "is-open"
      )
    ) {

      closeCoffeeModal();

    } else if (
      templatesModal &&
      templatesModal.classList.contains(
        "is-open"
      )
    ) {

      closeTemplates();

    } else if (
      sideMenu &&
      sideMenu.classList.contains(
        "is-open"
      )
    ) {

      closeMenu();

    }

  }
);


/* ============================================================
 * SERVICE WORKER
 * ============================================================ */

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    () => {

      navigator.serviceWorker
        .register(
          "./sw.js",
          {
            scope: "./"
          }
        )
	.then(
	  registration => {

		// Beim Start der App sofort nach einer neuen sw.js suchen
		registration.update();

		// Zusätzlich alle 5 Minuten prüfen
		setInterval(
		  () => registration.update(),
		  5 * 60 * 1000
		);

		registration.addEventListener(
		  "updatefound",
		  () => {


                const newWorker =
                  registration.installing;

                if (!newWorker) {
                  return;
                }


                newWorker.addEventListener(
                  "statechange",
                  () => {

                    if (
                      newWorker.state ===
                        "installed" &&
                      navigator
                        .serviceWorker
                        .controller
                    ) {

                      newWorker.postMessage({
                        type:
                          "SKIP_WAITING"
                      });

                    }

                  }
                );

              }
            );

          }
        )
        .catch(
          error =>
            console.warn(
              "SW registration failed:",
              error
            )
        );


      let refreshing = false;


      navigator.serviceWorker.addEventListener(
        "controllerchange",
        () => {

          if (refreshing) {
            return;
          }

          refreshing = true;


          showToast(
            "App aktualisiert – neu laden…",
            1500
          );


          setTimeout(
            () =>
              window.location.reload(),
            800
          );

        }
      );

    }
  );

}


/* ============================================================
 * INITIALISIERUNG
 * ============================================================ */

loadPalette();

/*
 * Startfarbe.
 *
 * Auch hier wird die Farbe als echter Scanwert behandelt
 * und bekommt automatisch eine Referenzfarbe.
 */
setResult("#00D4FF");


/* ============================================================
 * HOCH-/QUERFORMAT
 * ============================================================ */

function checkRotate() {

  if (!rotateHint) {
    return;
  }


  if (
    window.matchMedia(
      "(orientation: landscape)"
    ).matches ||
    window.innerWidth > 400
  ) {

    rotateHint.style.display =
      "none";

  } else {

    rotateHint.style.display =
      "";

  }

}


window.addEventListener(
  "orientationchange",
  checkRotate
);

window.addEventListener(
  "resize",
  checkRotate
);

checkRotate();
