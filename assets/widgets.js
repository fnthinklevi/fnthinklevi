/* ============================================================
 * widgets.js —— capsule-render / typing-svg / shields 徽章 / komarev
 * 四个第三方服务的本地实现
 * ============================================================ */
(function () {
  /* ---------- 解析 "0:7C3AED,100:06B6D4" 形式的渐变 ---------- */
  function parseColors(str) {
    return str.split(",").map((s) => {
      const [o, c] = s.trim().split(":");
      return { offset: +o, color: "#" + c };
    });
  }

  /* ---------- capsule-render：waving 头图 ---------- */
  function capsuleHeader(host, { text, desc, color, height = 200, fontSize = 62, descSize = 17 }) {
    const w = 800, h = height;
    const stops = parseColors(color)
      .map((s) => `<stop offset="${s.offset}%" stop-color="${s.color}"/>`)
      .join("");
    // 波浪曲线：两组正弦叠加，模拟 capsule-render 的 waving
    const N = 60;
    const y = (x) =>
      h * 0.52 +
      Math.sin((x / w) * Math.PI * 2) * h * 0.13 +
      Math.sin((x / w) * Math.PI * 4 + 1.4) * h * 0.055;
    let d = `M0 0 L0 ${y(0).toFixed(1)} `;
    for (let i = 1; i <= N; i++) {
      const x = (i / N) * w;
      d += `L${x.toFixed(1)} ${y(x).toFixed(1)} `;
    }
    d += `L${w} 0 Z`;

    host.innerHTML = `
<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${text}">
  <defs>
    <linearGradient id="cap-grad-header" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stops}</linearGradient>
  </defs>
  <path d="${d}" fill="url(#cap-grad-header)"/>
  <g opacity="0">
    <animate attributeName="opacity" from="0" to="1" dur="1.4s" begin="0.05s" fill="freeze"/>
    <text x="${w / 2}" y="${(h * 0.40 + fontSize * 0.35).toFixed(0)}" text-anchor="middle"
      font-family="Verdana, Geneva, 'Microsoft YaHei', sans-serif" font-weight="700"
      font-size="${fontSize}" fill="#ffffff">${text}</text>
    <text x="${w / 2}" y="${(h * 0.62 + descSize * 0.35).toFixed(0)}" text-anchor="middle"
      font-family="Verdana, Geneva, 'Microsoft YaHei', sans-serif"
      font-size="${descSize}" fill="#ffffff" opacity="0.92">${desc}</text>
  </g>
</svg>`;
  }

  /* ---------- capsule-render：waving 底部 + twinkling ---------- */
  function capsuleFooter(host, { color, height = 120 }) {
    const w = 800, h = height;
    const stops = parseColors(color)
      .map((s) => `<stop offset="${s.offset}%" stop-color="${s.color}"/>`)
      .join("");
    const N = 60;
    const y = (x) =>
      h * 0.48 +
      Math.sin((x / w) * Math.PI * 2 + 0.8) * h * 0.14 +
      Math.sin((x / w) * Math.PI * 5 + 2.1) * h * 0.05;
    let d = `M0 ${h} L0 ${y(0).toFixed(1)} `;
    for (let i = 1; i <= N; i++) {
      const x = (i / N) * w;
      d += `L${x.toFixed(1)} ${y(x).toFixed(1)} `;
    }
    d += `L${w} ${h} Z`;

    // 星点闪烁
    let stars = "";
    for (let i = 0; i < 7; i++) {
      const x = 60 + i * 110, yy = 18 + (i % 3) * 14, r = 1.6 + (i % 2);
      stars += `<circle cx="${x}" cy="${yy}" r="${r}" fill="#ffffff" opacity="0.2">
        <animate attributeName="opacity" values="0.15;0.9;0.15" dur="${2.2 + i * 0.35}s" begin="${(i * 0.4).toFixed(1)}s" repeatCount="indefinite"/>
      </circle>`;
    }

    host.innerHTML = `
<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="footer wave">
  <defs>
    <linearGradient id="cap-grad-footer" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${w}" y2="0">${stops}</linearGradient>
  </defs>
  <path d="${d}" fill="url(#cap-grad-footer)">
    <animate attributeName="opacity" values="1;0.82;1" dur="3.6s" repeatCount="indefinite"/>
  </path>
  ${stars}
</svg>`;
  }

  /* ---------- readme-typing-svg：打字机动画 ---------- */
  function typingSVG(host, lines, { width = 600, height = 60, fontSize = 24, duration = 2000, pause = 500 }) {
    host.innerHTML = `
<svg viewBox="0 0 ${width} ${height}" width="${width}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="typing">
  <text x="${width / 2}" y="${height / 2}" text-anchor="middle" dominant-baseline="central"
    font-family="'Fira Code', Consolas, 'Courier New', monospace" font-weight="600"
    font-size="${fontSize}" fill="#A78BFA"></text>
</svg>`;
    const t = host.querySelector("text");
    let li = 0, ci = 0, mode = "type";
    function step() {
      const line = lines[li];
      if (mode === "type") {
        ci++;
        t.textContent = line.slice(0, ci);
        if (ci >= line.length) {
          mode = "pause";
          setTimeout(() => { mode = "erase"; step(); }, pause);
          return;
        }
        setTimeout(step, Math.max(30, Math.floor(duration / line.length)));
      } else if (mode === "erase") {
        ci--;
        t.textContent = line.slice(0, ci);
        if (ci <= 0) {
          mode = "type";
          li = (li + 1) % lines.length;
          setTimeout(step, 350);
          return;
        }
        setTimeout(step, 38);
      }
    }
    step();
  }

  /* ---------- shields.io for-the-badge 徽章（本地绘制 + 实测宽度） ---------- */
  function textWidth(s) {
    // 粗略估算：大写字母/数字 9.3px，全角字符 13.5px，空格 5px
    let w = 0;
    for (const ch of s) {
      if (/[\u2E80-\u9FFF\uFF00-\uFFEF]/.test(ch)) w += 13.5;
      else if (ch === " ") w += 5;
      else w += 9.3;
    }
    return w;
  }

  function makeBadge({ label, message, labelColor, color, textColor = "#fff", logo, logoColor = "#fff", href }) {
    const H = 28, FS = 12.5, PAD = 13, LOGO = 20, GAP = 8;
    const lc = labelColor || color;
    const hasLogo = !!logo && !!ICONS[logo];
    const estLabel = label ? textWidth(label) : 0;
    const estMsg = message != null ? textWidth(String(message)) : 0;
    // 布局：[PAD][logo?][label][PAD] | [PAD][message][PAD]
    const segL = label ? PAD + (hasLogo ? LOGO + GAP : 0) + estLabel + PAD : 0;
    const segM = message != null ? PAD + estMsg + PAD : 0;
    const total = Math.ceil(segL + segM);
    const labelX = PAD + (hasLogo ? LOGO + GAP : 0);

    const el = document.createElement(href ? "a" : "span");
    if (href) { el.href = href; el.target = "_blank"; el.rel = "noopener"; }
    const R = 4.5, YB = H;
    const bgPath = `M${R} 0 H${total} V${YB} H${R} Q0 ${YB} 0 ${YB - R} V${R} Q0 0 ${R} 0 Z`;
    const msgPath = message != null
      ? `M${segL} 0 H${total - R} Q${total} 0 ${total} ${R} V${YB - R} Q${total} ${YB} ${total - R} ${YB} H${segL} Z`
      : "";
    el.innerHTML = `
<svg width="${total}" height="${H}" viewBox="0 0 ${total} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label || message || ""}">
  <path d="${bgPath}" fill="${lc}"/>
  ${message != null ? `<path d="${msgPath}" fill="${color}"/>` : ""}
  ${hasLogo ? `<g transform="translate(${PAD} 4) scale(${LOGO / 24})">${ICONS[logo](logoColor)}</g>` : ""}
  ${label ? `<text class="b-label" x="${labelX}" y="${(H / 2 + FS * 0.36).toFixed(1)}" font-family="Verdana, 'Segoe UI', sans-serif" font-weight="700" font-size="${FS}" letter-spacing="0.4" fill="${textColor}">${label}</text>` : ""}
  ${message != null ? `<text class="b-msg" x="${segL + PAD}" y="${(H / 2 + FS * 0.36).toFixed(1)}" font-family="Verdana, 'Segoe UI', sans-serif" font-weight="700" font-size="${FS}" letter-spacing="0.4" fill="${textColor}">${message}</text>` : ""}
</svg>`;

    // 渲染后按实际文字宽度二次校准（估算值会被替换为实测值）
    requestAnimationFrame(() => {
      const svg = el.querySelector("svg");
      const lt = svg.querySelector(".b-label");
      const mt = svg.querySelector(".b-msg");
      const lw = lt ? lt.getBBox().width : 0;
      const mw = mt ? mt.getBBox().width : 0;
      const segL2 = Math.ceil(label ? PAD + (hasLogo ? LOGO + GAP : 0) + lw + PAD : 0);
      const segM2 = Math.ceil(message != null ? PAD + mw + PAD : 0);
      const total2 = segL2 + segM2;
      const paths = svg.querySelectorAll("path");
      svg.setAttribute("width", total2);
      svg.setAttribute("viewBox", `0 0 ${total2} ${H}`);
      paths[0].setAttribute("d", `M${R} 0 H${total2} V${YB} H${R} Q0 ${YB} 0 ${YB - R} V${R} Q0 0 ${R} 0 Z`);
      if (message != null) {
        paths[1].setAttribute("d", `M${segL2} 0 H${total2 - R} Q${total2} 0 ${total2} ${R} V${YB - R} Q${total2} ${YB} ${total2 - R} ${YB} H${segL2} Z`);
        mt.setAttribute("x", segL2 + PAD);
      }
    });
    return el;
  }

  /* ---------- komarev 阅读量计数（本地 localStorage 实现） ---------- */
  function localViewCount(key) {
    let n = 0;
    try {
      n = parseInt(localStorage.getItem(key) || "0", 10) + 1;
      localStorage.setItem(key, String(n));
    } catch (e) { n = 1; }
    return n;
  }

  /* ---------- 徽章行（对应 README 顶部的 for-the-badge 徽章组） ---------- */
  function buildBadgeRow(host) {
    const cfg = window.CONFIG;
    const n = localViewCount("fnthinklevi-views");
    host.appendChild(makeBadge({
      label: "GITHUB", color: "#100000", logo: "github", href: cfg.profileUrl,
    }));
    if (cfg.email) host.appendChild(makeBadge({
      label: "EMAIL", color: "#D14836", logo: "mail", href: "mailto:" + cfg.email,
    }));
    if (cfg.orcid) host.appendChild(makeBadge({
      label: "ORCID", color: "#A6CE39", logo: "orcid", href: "https://orcid.org/" + cfg.orcid,
    }));
    host.appendChild(makeBadge({
      label: "VIEWS", message: n.toLocaleString("en-US"),
      labelColor: "#6D28D9", color: "#7C3AED", logo: "eye",
    }));
    host.appendChild(makeBadge({
      label: "STARS", message: String(cfg.stats.stars),
      labelColor: "#0d1117", color: "#06B6D4", logo: "star",
    }));
    host.appendChild(makeBadge({
      label: "USE MY WEBSITE TEMPLATE", color: "#06B6D4", logo: "chrome", href: cfg.websiteRepo,
    }));
  }

  /* ---------- 章节标题旁的小动画图标 ---------- */
  function sectionIcon(name) {
    if (name === "robot") {
      return `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <line x1="24" y1="4" x2="24" y2="10" stroke="#7C3AED" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="24" cy="4.5" r="3" fill="#06B6D4">
    <animate attributeName="opacity" values="1;0.25;1" dur="1.6s" repeatCount="indefinite"/>
  </circle>
  <rect x="8" y="10" width="32" height="26" rx="8" fill="#1f2437" stroke="#7C3AED" stroke-width="2"/>
  <line x1="3" y1="21" x2="8" y2="21" stroke="#7C3AED" stroke-width="2.2" stroke-linecap="round"/>
  <line x1="40" y1="21" x2="45" y2="21" stroke="#7C3AED" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="18" cy="21" r="3.4" fill="#06B6D4">
    <animate attributeName="r" values="3.4;3.4;0.4;3.4;3.4" keyTimes="0;0.42;0.5;0.58;1" dur="3.2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="30" cy="21" r="3.4" fill="#06B6D4">
    <animate attributeName="r" values="3.4;3.4;0.4;3.4;3.4" keyTimes="0;0.42;0.5;0.58;1" dur="3.2s" begin="0.15s" repeatCount="indefinite"/>
  </circle>
  <path d="M18 28.5c2.2 2.6 9.8 2.6 12 0" stroke="#A78BFA" stroke-width="2.2" fill="none" stroke-linecap="round"/>
</svg>`;
    }
    const color = name === "sparkle-green" ? "#39d353" : "#A78BFA";
    return `
<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <path d="M24 4 28 20 44 24 28 28 24 44 20 28 4 24 20 20Z" fill="${color}">
    <animateTransform attributeName="transform" type="rotate"
      values="0 24 24;25 24 24;0 24 24" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.55;1" dur="2.6s" repeatCount="indefinite"/>
  </path>
  <path d="M38 6 39.5 11.5 45 13 39.5 14.5 38 20 36.5 14.5 31 13 36.5 11.5Z" fill="${color}" opacity="0.8">
    <animateTransform attributeName="transform" type="rotate"
      values="360 38 13;340 38 13;360 38 13" dur="5s" repeatCount="indefinite"/>
  </path>
</svg>`;
  }

  window.WIDGETS = { capsuleHeader, capsuleFooter, typingSVG, buildBadgeRow, sectionIcon };
})();
