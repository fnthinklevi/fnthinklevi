/* ============================================================
 * app.js —— 页面装配入口
 * ============================================================ */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const cfg = window.CONFIG;
    const W = window.WIDGETS, CARDS = window.CARDS;

    // 顶部 / 底部波浪（capsule-render 本地实现）
    W.capsuleHeader(document.getElementById("header-wave"), {
      text: cfg.username,
      desc: cfg.tagline,
      color: cfg.headerColor,
      height: 200,
      fontSize: 62,
      descSize: 17,
    });
    W.capsuleFooter(document.getElementById("footer-wave"), {
      color: cfg.footerColor,
      height: 120,
    });

    // 打字机（readme-typing-svg 本地实现）
    W.typingSVG(document.getElementById("typing"), cfg.typingLines, {
      width: 600, height: 60, fontSize: 24, duration: 2000, pause: 500,
    });

    // 徽章行（shields.io / komarev 本地实现）
    W.buildBadgeRow(document.getElementById("badge-row"));

    // 技能图标（skillicons.dev 本地实现，9 个一行）
    const grid = document.getElementById("skill-grid");
    cfg.skills.forEach((name) => {
      const inner = window.SKILLS[name] || "";
      const div = document.createElement("div");
      div.className = "skill";
      div.title = name;
      div.innerHTML = `<svg viewBox="0 0 48 48" width="58" height="58" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">
        <rect width="48" height="48" rx="13" fill="#242938"/>${inner}</svg>`;
      grid.appendChild(div);
    });

    // Contributions 三卡片（profile-summary-cards 本地实现）
    const cards = document.getElementById("summary-cards");
    const statsBox = document.createElement("div");
    const repoLangBox = document.createElement("div");
    const commitLangBox = document.createElement("div");
    cards.append(statsBox, repoLangBox, commitLangBox);
    CARDS.statsCard(statsBox);
    CARDS.donutCard(repoLangBox, cfg.reposLanguages);
    CARDS.donutCard(commitLangBox, cfg.commitLanguages);

    // GitHub Activity：贪吃蛇 / 个人详情卡 / 3D 贡献图
    CARDS.snake(document.getElementById("snake"));
    CARDS.profileDetails(document.getElementById("profile-details"));
    CARDS.contrib3d(document.getElementById("contrib3d"));

    // 章节标题小图标
    document.querySelectorAll(".title-icon").forEach((el) => {
      el.innerHTML = W.sectionIcon(el.dataset.icon);
    });
  });
})();
