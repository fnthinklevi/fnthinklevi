/* ============================================================
 * icons.js —— 徽章 logo 与技能图标，全部本地绘制，无外部请求
 * ============================================================ */
(function () {
  /* ---------- 徽章 logo（24×24，fn(color) 返回 svg 内容） ---------- */
  window.ICONS = {
    github: (c) =>
      `<path fill="${c}" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>`,

    mail: (c) =>
      `<g fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.4"/><path d="M3 6.8 12 13.6 21 6.8" stroke-linecap="round"/></g>`,

    orcid: (c) =>
      `<g fill="none"><circle cx="12" cy="12" r="9.6" stroke="${c}" stroke-width="2"/><text x="12" y="16.6" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="11.5" fill="${c}">iD</text></g>`,

    scholar: (c) =>
      `<g fill="${c}"><path d="M12 3 1 9l11 6 9-4.9V17h2V9z"/><path d="M5 13.2V17c0 1.66 3.13 3 7 3s7-1.34 7-3v-3.8l-7 3.8z"/></g>`,

    red: (c) =>
      `<text x="12" y="16.2" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="9.5" letter-spacing="0.6" fill="${c}">RED</text>`,

    eye: (c) =>
      `<g fill="none" stroke="${c}" stroke-width="2" stroke-linejoin="round"><path d="M1.5 12S5.6 5 12 5s10.5 7 10.5 7-4.1 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3.1" fill="${c}" stroke="none"/></g>`,

    star: (c) =>
      `<path fill="${c}" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>`,

    chrome: (c) =>
      `<g fill="none" stroke="${c}"><circle cx="12" cy="12" r="9.8" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke-width="2"/><path d="M12 8h9.4M8.2 14 3.6 6.4M15.7 14.2 11 22.3" stroke-width="1.8"/></g>`,
  };

  /* ---------- 技能图标（48×48 内容，绘制在深色圆角块上） ---------- */
  const H = "#03599c"; // hexagon blue
  window.SKILLS = {
    python: `
      <path fill="#4584b6" d="M23.8 5c-5.6 0-8.8 2.2-8.8 6v3.5h9v1.8H10.4c-3.6 0-6.4 2.6-6.4 7.2 0 4.6 2.8 7.5 6.4 7.5h3.2v-4.4c0-3.9 3.2-6.6 6.8-6.6h8.2c2.9 0 5.4-2.2 5.4-5.2v-3.8c0-4-3.4-6-8.4-6h-1.8zm-4.3 3.1c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
      <path fill="#ffd43b" d="M24.2 43c5.6 0 8.8-2.2 8.8-6v-3.5h-9v-1.8h13.6c3.6 0 6.4-2.6 6.4-7.2 0-4.6-2.8-7.5-6.4-7.5h-3.2v4.4c0 3.9-3.2 6.6-6.8 6.6h-8.2c-2.9 0-5.4 2.2-5.4 5.2v3.8c0 4 3.4 6 8.4 6h1.8zm4.3-3.1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>`,

    cpp: `
      <path fill="${H}" d="M24 3 43 13.5v21L24 45 5 34.5v-21z"/>
      <text x="24" y="29.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="14" fill="#fff">C++</text>`,

    c: `
      <path fill="${H}" d="M24 3 43 13.5v21L24 45 5 34.5v-21z"/>
      <text x="24" y="31.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#fff">C</text>`,

    java: `
      <path fill="#5382a1" d="M13 29c0 4.2 5 6.4 11 6.4S35 33.2 35 29l-2-5.5H15z"/>
      <path fill="none" stroke="#5382a1" stroke-width="2.2" stroke-linecap="round" d="M35.4 25.6c2.9-.2 4.6.8 4 2.4-.5 1.5-2.9 2.4-5.4 2.4"/>
      <path fill="#5382a1" d="M11 36.4c4 1.4 22 1.6 26-1-1.6 2.6-4.4 4-13 4s-11.4-1.4-13-3z"/>
      <path fill="none" stroke="#e76f00" stroke-width="1.7" stroke-linecap="round" d="M19 19.6c-1.4-1.9 1.4-2.9 0-4.8m5 4.8c-1.4-1.9 1.4-2.9 0-4.8m5 4.8c-1.4-1.9 1.4-2.9 0-4.8"/>`,

    mysql: `
      <path fill="#00618a" d="M6.5 33.5c4.8-.8 8-4.6 12-6.8 3.6-2 8.2-2.4 11.4-.6 1.9-2.4 4.8-3.4 6.9-2.9-.9 1-1.4 2.4-1 3.8l-2.6 1.6c.4 3-.7 6-3.2 8.2l-2-.6c1.4-1.7 1.9-3.8 1.3-5.7-3.9 1.8-8.8 2-12.7.4-2.8 1.9-6.4 3.6-10.1 2.6z"/>
      <path fill="#f29111" d="M34.6 23c.9-.5 2-.3 2.6.5-.8.2-1.5.8-1.9 1.6-.3-.8-.6-1.5-.7-2.1z"/>
      <text x="24" y="42" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="7.5" fill="#e8f2fc">MySQL</text>`,

    pytorch: `
      <path fill="none" stroke="#ee4c2c" stroke-width="3.6" stroke-linecap="round" d="M28.5 9.5c6.5 2 10 8.3 10 13.8 0 7.6-6.5 14-14.5 14S9.5 30.9 9.5 23.4c0-5.9 3.9-11.3 9.8-13.3"/>
      <path fill="#ee4c2c" d="M24 3.6c1.8 2.4 2.8 4.1 2.8 5.5A2.9 2.9 0 0 1 24 11.7a2.9 2.9 0 0 1-2.8-2.6c0-1.4 1-3.1 2.8-5.5z"/>`,

    tensorflow: `
      <path fill="#ff6f00" d="M23 4 11 11v26l12 7V33l7 4v-7l-7-4v-8.5l9.5 5.5V32l3.5-2V17.6L23 9.7z"/>
      <path fill="#ffb300" d="M35.5 24.5 39 26.5v5l-3.5 2z"/>`,

    mongodb: `
      <path fill="#4faa41" d="M24 3.5c-6.2 8.2-9.3 14.4-9.3 20.6 0 7.2 4.2 12.4 9.3 16.6 5.1-4.2 9.3-9.4 9.3-16.6 0-6.2-3.1-12.4-9.3-20.6z"/>
      <path fill="#3f8f31" d="M24 3.5c6.2 8.2 9.3 14.4 9.3 20.6 0 7.2-4.2 12.4-9.3 16.6z"/>
      <path fill="none" stroke="#cdecab" stroke-width="1.1" d="M24 8v30"/>`,

    linux: `
      <ellipse cx="24" cy="27" rx="12" ry="15" fill="#1b1b1b"/>
      <ellipse cx="24" cy="31.5" rx="7.4" ry="9" fill="#fff"/>
      <circle cx="24" cy="12.5" r="8.2" fill="#1b1b1b"/>
      <circle cx="21" cy="11.3" r="1.7" fill="#fff"/><circle cx="27" cy="11.3" r="1.7" fill="#fff"/>
      <circle cx="21.4" cy="11.6" r="0.8" fill="#000"/><circle cx="27.4" cy="11.6" r="0.8" fill="#000"/>
      <path d="M21.4 14.6h5.2L24 18.6z" fill="#f6b40e"/>
      <ellipse cx="18.5" cy="41" rx="3.4" ry="1.6" fill="#f6b40e"/>
      <ellipse cx="29.5" cy="41" rx="3.4" ry="1.6" fill="#f6b40e"/>`,

    matlab: `
      <path fill="#e8703a" d="M7 38 20.5 12l4 8 4.2-6.4L41 38z"/>
      <path fill="#ffb04f" d="M20.5 12l4 8 3.6-5.6L39.6 38H27.4z" opacity="0.85"/>`,

    html: `
      <path fill="#e44d26" d="M10 4h28l-2.6 28L24 37l-11.4-5z"/>
      <path fill="#f16529" d="M24 4h14l-2.6 28L24 37z"/>
      <text x="24" y="24.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#fff">5</text>`,

    css: `
      <path fill="#1572b6" d="M10 4h28l-2.6 28L24 37l-11.4-5z"/>
      <path fill="#33a9dc" d="M24 4h14l-2.6 28L24 37z"/>
      <text x="24" y="24.5" text-anchor="middle" font-family="Arial, sans-serif" font-weight="800" font-size="16" fill="#fff">3</text>`,

    js: `
      <rect x="6" y="6" width="36" height="36" rx="4" fill="#f7df1e"/>
      <text x="37" y="37.5" text-anchor="end" font-family="Arial, sans-serif" font-weight="800" font-size="13.5" fill="#111">JS</text>`,

    git: `
      <rect x="10" y="10" width="28" height="28" rx="3.5" transform="rotate(45 24 24)" fill="#f05133"/>
      <path fill="none" stroke="#fff" stroke-width="1.8" d="M17 28.5V23c0-4 3-5.5 6.5-5.5H28"/>
      <circle cx="17" cy="30.5" r="2.1" fill="#fff"/>
      <circle cx="30" cy="17.5" r="2.1" fill="#fff"/>`,

    vscode: `
      <path fill="#007acc" d="M33 4.5 15.5 19.4 8 13.6 4.6 15.4 12.3 24 4.6 32.6 8 34.4 15.5 28.6 33 43.5 43.5 39V9z"/>
      <path fill="#0d1117" opacity="0.28" d="M33 13.6 20.4 24 33 34.4z"/>`,

    latex: `
      <text x="24" y="29.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="13.5" fill="#eef2f7">LaTeX</text>`,

    github: `
      <g transform="translate(12 12)"><path fill="#fff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></g>`,

    docker: `
      <g fill="#2496ed">
        <rect x="10" y="21.2" width="4.8" height="4.8" rx="0.6"/><rect x="16" y="21.2" width="4.8" height="4.8" rx="0.6"/><rect x="22" y="21.2" width="4.8" height="4.8" rx="0.6"/><rect x="28" y="21.2" width="4.8" height="4.8" rx="0.6"/>
        <rect x="16" y="16" width="4.8" height="4.8" rx="0.6"/><rect x="22" y="16" width="4.8" height="4.8" rx="0.6"/><rect x="28" y="16" width="4.8" height="4.8" rx="0.6"/>
        <rect x="22" y="10.8" width="4.8" height="4.8" rx="0.6"/>
        <path d="M4.5 27h34.6c0 4.2-2.1 7.4-6.2 9.2-5.6 2.4-14.2 2.4-19.8.4C8.2 34.8 5.1 31.2 4.5 27z"/>
        <path d="M39.5 27c2.4-.6 4.3-2.1 4.9-4.4-2.1.4-3.9 1.7-4.9 3.4z"/>
      </g>
      <path fill="none" stroke="#2496ed" stroke-width="1.8" stroke-linecap="round" d="M10 40.5h6.5m4.5 0h6.5m4.5 0h6.5"/>`,
  };
})();
