/* ============================================================
 * cards.js —— github-profile-summary-cards / 贪吃蛇 / 3D 贡献图
 * 三个"部署在别处"的服务的本地实现（tokyonight 配色）
 * ============================================================ */
(function () {
  const C = () => window.CONFIG;
  const TN = {
    bg: "#16161e", border: "#303446", text: "#f2f2f2", muted: "#9aa5ce", dim: "#7a84ab",
  };

  /* ---------- 简易确定性随机 ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- feather 风格线性小图标 ---------- */
  const FE = {
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    commit: '<circle cx="12" cy="12" r="3.5"/><path d="M1.5 12h7M15.5 12h7"/>',
    pr: '<circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><circle cx="18" cy="18" r="2.6"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M6 8.6V15.4"/>',
    issue: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4.5"/><path d="M12 16h.01"/>',
  };
  function feIcon(name, x, y, size, color) {
    return `<g transform="translate(${x} ${y}) scale(${size / 24})" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${FE[name]}</g>`;
  }

  /* ---------- 本地 identicon 头像（代替远程 avatar） ---------- */
  function identicon(seedStr, size = 104) {
    let h = 0;
    for (const ch of seedStr) h = ((h * 131) + ch.charCodeAt(0)) >>> 0;
    const rng = mulberry32(h);
    const cell = size / 6.5, m = (size - cell * 5) / 2;
    const c1 = [124, 58, 237], c2 = [6, 182, 212];
    let blocks = "";
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 5; y++) {
        if (rng() > 0.42) {
          const t = x / 2;
          const col = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
          const fill = `rgb(${col[0]},${col[1]},${col[2]})`;
          blocks += `<rect x="${(m + x * cell).toFixed(1)}" y="${(m + y * cell).toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}" fill="${fill}"/>`;
          if (x < 2) blocks += `<rect x="${(m + (4 - x) * cell).toFixed(1)}" y="${(m + y * cell).toFixed(1)}" width="${cell.toFixed(1)}" height="${cell.toFixed(1)}" fill="${fill}"/>`;
        }
      }
    }
    return `<g><rect width="${size}" height="${size}" rx="16" fill="#1c2233"/>${blocks}</g>`;
  }

  /* ---------- profile-details 卡片 ---------- */
  function profileDetails(host) {
    const cfg = C(), s = cfg.stats;
    const rows = [
      { icon: "folder", label: "Public Repos", value: s.repos },
      { icon: "users", label: "Followers", value: s.followers },
      { icon: "user", label: "Following", value: s.following },
    ];
    let right = "";
    rows.forEach((r, i) => {
      const y = 52 + i * 40;
      right += feIcon(r.icon, 508, y - 12, 18, TN.muted)
        + `<text x="536" y="${y + 5}" font-size="14" fill="${TN.muted}" font-family="Segoe UI, sans-serif">${r.label}</text>`
        + `<text x="770" y="${y + 5}" text-anchor="end" font-size="15" font-weight="700" fill="${TN.text}" font-family="Segoe UI, sans-serif">${r.value}</text>`;
    });
    host.innerHTML = `
<svg viewBox="0 0 800 160" width="800" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="profile details">
  <rect width="800" height="160" rx="14" fill="${TN.bg}" stroke="${TN.border}"/>
  <g transform="translate(26 28)">${identicon(cfg.username, 104)}</g>
  <text x="152" y="66" font-size="21" font-weight="700" fill="${TN.text}" font-family="Segoe UI, sans-serif">${cfg.displayName}</text>
  <text x="152" y="92" font-size="13.5" fill="${TN.muted}" font-family="Segoe UI, sans-serif">@${cfg.username}</text>
  <text x="152" y="116" font-size="12" fill="${TN.dim}" font-family="Segoe UI, sans-serif">${cfg.tagline}</text>
  ${right}
</svg>`;
  }

  /* ---------- stats 卡片（commits / PRs / issues / contributed） ---------- */
  function statsCard(host) {
    const s = C().stats;
    const rows = [
      { icon: "commit", label: "Total Commits", value: s.commits.toLocaleString("en-US") },
      { icon: "pr", label: "Total PRs", value: s.prs },
      { icon: "issue", label: "Total Issues", value: s.issues },
      { icon: "users", label: "Contributed to", value: s.contributedTo },
    ];
    let body = "";
    rows.forEach((r, i) => {
      const y = 46 + i * 38;
      body += feIcon(r.icon, 34, y - 12, 18, TN.muted)
        + `<text x="64" y="${y + 5}" font-size="14" fill="${TN.muted}" font-family="Segoe UI, sans-serif">${r.label}</text>`
        + `<text x="310" y="${y + 5}" text-anchor="end" font-size="15" font-weight="700" fill="${TN.text}" font-family="Segoe UI, sans-serif">${r.value}</text>`;
    });
    host.innerHTML = `
<svg viewBox="0 0 340 190" width="340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="stats">
  <rect width="340" height="190" rx="14" fill="${TN.bg}" stroke="${TN.border}"/>
  ${body}
</svg>`;
  }

  /* ---------- 语言占比环形图（repos-per-language / most-commit-language） ---------- */
  function donutCard(host, data) {
    const cx = 88, cy = 98, r = 46, SW = 21;
    const R2 = 2 * Math.PI * r;
    let acc = 0, segs = "";
    data.forEach((d) => {
      const len = (d.pct / 100) * R2;
      segs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${SW}"
        stroke-dasharray="${len.toFixed(2)} ${(R2 - len).toFixed(2)}" stroke-dashoffset="${(-acc).toFixed(2)}"
        transform="rotate(-90 ${cx} ${cy})"/>`;
      acc += len;
    });
    let legend = "";
    data.forEach((d, i) => {
      const y = 38 + i * 24;
      legend += `<rect x="172" y="${y - 10}" width="12" height="12" rx="3" fill="${d.color}"/>
        <text x="192" y="${y + 1}" font-size="12.5" fill="${TN.text}" font-family="Segoe UI, sans-serif">${d.name}</text>
        <text x="312" y="${y + 1}" text-anchor="end" font-size="12.5" fill="${TN.muted}" font-family="Segoe UI, sans-serif">${d.pct.toFixed(1)}%</text>`;
    });
    host.innerHTML = `
<svg viewBox="0 0 340 190" width="340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="languages donut">
  <rect width="340" height="190" rx="14" fill="${TN.bg}" stroke="${TN.border}"/>
  ${segs}
  <circle cx="${cx}" cy="${cy}" r="${r - SW / 2 - 5}" fill="none"/>
  ${legend}
</svg>`;
  }

  /* ---------- 贡献贪吃蛇动画（Platane/snk 本地实现，暗色） ---------- */
  function snake(host) {
    const COLS = 52, ROWS = 7, P = 12, CELL = 10, PAD = 8;
    const W = COLS * P + PAD * 2 - 2, H2 = ROWS * P + PAD * 2 - 2;
    const COLORS = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
    const SNAKE = "#11151c", EATEN = "#161b22";

    // 确定性伪随机贡献格
    const rng = mulberry32(20261107);
    const level = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const r = rng();
      level.push(r < 0.30 ? 0 : r < 0.55 ? 1 : r < 0.78 ? 2 : r < 0.92 ? 3 : 4);
    }
    // 蛇的行走路线：逐行蛇形
    const route = [];
    for (let v = 0; v < ROWS; v++) {
      for (let u = 0; u < COLS; u++) {
        route.push([v % 2 === 0 ? u : COLS - 1 - u, v]);
      }
    }
    const px = ([u, v]) => [PAD + u * P, PAD + v * P];

    let cells = "";
    route.forEach(([u, v], i) => {
      const [x, y] = px([u, v]);
      cells += `<rect id="c${i}" x="${x}" y="${y}" width="${CELL}" height="${CELL}" rx="2" fill="${COLORS[level[i]]}"/>`;
    });

    host.innerHTML = `
<svg viewBox="0 0 ${W} ${H2}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="contribution snake">
  ${cells}
  <g id="snake-head">
    <circle r="5.6" fill="${SNAKE}" stroke="#39d353" stroke-width="1.4"/>
    <circle id="eye1" r="1.15" fill="#fff"/>
    <circle id="eye2" r="1.15" fill="#fff"/>
  </g>
</svg>`;

    const BODY = 14, SPEED = 16; // 格/秒
    const rectEls = route.map((_, i) => host.querySelector(`#c${i}`));
    const headG = host.querySelector("#snake-head");
    const eye1 = host.querySelector("#eye1"), eye2 = host.querySelector("#eye2");
    let prev = { head: -1, loop: -1 };

    function frame(tms) {
      const t = tms / 1000;
      const cycle = (route.length + BODY) / SPEED + 1.2; // 末尾停顿
      const pos = t % cycle;
      const idx = Math.min(Math.floor(pos * SPEED), route.length + BODY);
      const loop = Math.floor(t / cycle);

      if (loop !== prev.loop) {
        // 新循环：整盘恢复
        rectEls.forEach((el, i) => el.setAttribute("fill", COLORS[level[i]]));
        prev = { head: -1, loop };
      }
      if (idx !== prev.head) {
        // 尾巴扫过的格子变空
        for (let i = Math.max(prev.head - BODY, 0); i < idx - BODY; i++) {
          if (i >= 0 && i < route.length) rectEls[i].setAttribute("fill", EATEN);
        }
        // 蛇身经过的格子涂蛇色
        for (let i = Math.max(prev.head + 1, idx - BODY); i <= Math.min(idx, route.length - 1); i++) {
          if (i >= 0) rectEls[i].setAttribute("fill", SNAKE);
        }
        prev.head = idx;
      }

      // 蛇头位置与朝向
      const hi = Math.min(idx, route.length - 1);
      const [hx, hy] = px(route[hi]);
      const pj = Math.max(hi - 1, 0);
      const [ax, ay] = px(route[pj]);
      let dx = hx - ax, dy = hy - ay;
      if (dx === 0 && dy === 0) { dx = 1; dy = 0; }
      const len = Math.hypot(dx, dy) || 1;
      dx /= len; dy /= len;
      const fx = dx * 2.0, fy = dy * 2.0;     // 眼睛向前进方向偏移
      const pxp = -dy * 2.3, pyp = dx * 2.3;  // 垂直方向
      headG.setAttribute("transform", `translate(${hx + CELL / 2} ${hy + CELL / 2})`);
      eye1.setAttribute("cx", (fx + pxp).toFixed(2)); eye1.setAttribute("cy", (fy + pyp).toFixed(2));
      eye2.setAttribute("cx", (fx - pxp).toFixed(2)); eye2.setAttribute("cy", (fy - pyp).toFixed(2));
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- 3D 贡献城市（profile-3d-contrib night-rainbow 本地实现） ---------- */
  function contrib3d(host) {
    const rng = mulberry32(0xFACEB00C);
    const WEEKS = 52, DAYS = 7;
    const tw = 20, th = 10, HMAX = 46;
    const heights = [];
    for (let i = 0; i < WEEKS * DAYS; i++) {
      const r = rng();
      heights.push(r < 0.34 ? 0 : Math.max(1, Math.round(Math.pow(rng(), 1.5) * 13)));
    }
    const maxC = Math.max(...heights, 1);
    const hOf = (c) => (c === 0 ? 3 : 4 + (c / maxC) * HMAX);

    const offX = DAYS * (tw / 2) + 30, offY = 64;
    const X = (u, v) => (u - v) * (tw / 2) + offX;
    const Ybase = (u, v) => (u + v) * (th / 2) + offY;

    let body = "", minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9;
    for (let s = 0; s <= WEEKS + DAYS - 2; s++) {
      for (let u = Math.max(0, s - (DAYS - 1)); u <= Math.min(s, WEEKS - 1); u++) {
        const v = s - u;
        const c = heights[u * DAYS + v];
        const h = hOf(c);
        if (c === 0) continue;
        const x = X(u, v), yb = Ybase(u, v), yt = yb - h;
        const hue = (205 + u * 3.1) % 360;
        const lt = 44 + (c / maxC) * 16;
        const top = `hsl(${hue.toFixed(0)} 66% ${(lt + 12).toFixed(0)}%)`;
        const right = `hsl(${hue.toFixed(0)} 66% ${(lt - 4).toFixed(0)}%)`;
        const left = `hsl(${hue.toFixed(0)} 66% ${(lt - 14).toFixed(0)}%)`;
        // 顶面 / 右面 / 左面（等距投影棱柱）
        body += `
  <polygon points="${x},${yt - th / 2} ${x + tw / 2},${yt} ${x},${yt + th / 2} ${x - tw / 2},${yt}" fill="${top}"/>
  <polygon points="${x},${yt + th / 2} ${x + tw / 2},${yt} ${x + tw / 2},${yb} ${x},${yb + th / 2}" fill="${right}"/>
  <polygon points="${x - tw / 2},${yt} ${x},${yt + th / 2} ${x},${yb + th / 2} ${x - tw / 2},${yb}" fill="${left}"/>`;
        minX = Math.min(minX, x - tw / 2); maxX = Math.max(maxX, x + tw / 2);
        minY = Math.min(minY, yt - th / 2); maxY = Math.max(maxY, yb + th / 2);
      }
    }
    const vbX = (minX - 14).toFixed(0), vbY = (minY - 12).toFixed(0);
    const vbW = (maxX - minX + 28).toFixed(0), vbH = (maxY - minY + 26).toFixed(0);
    host.innerHTML = `
<svg viewBox="${vbX} ${vbY} ${vbW} ${vbH}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="3d contributions">
  <rect x="${vbX}" y="${vbY}" width="${vbW}" height="${vbH}" rx="14" fill="${TN.bg}" stroke="${TN.border}"/>
  ${body}
</svg>`;
  }

  window.CARDS = { profileDetails, statsCard, donutCard, snake, contrib3d };
})();
