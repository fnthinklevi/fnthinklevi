/* ============================================================
 * config.js —— 你的个人信息与示例数据，都在这里改
 * ============================================================ */
window.CONFIG = {
  // 基础信息
  username: "fnthinklevi",
  displayName: "fnthinklevi",
  tagline: "AI4Data · AI Agents · Multimodal LLMs",
  typingLines: [
    "AI4Data Researcher | AI Agent Builder",
    "Multimodal LLM Explorer",
    "Data-Driven · Agent-Powered · Vision-Aware",
    "Building Agents that Think & Act",
  ],

  // 以下信息填好后，对应徽章会自动出现在页面上（留空则隐藏）
  email: "fnthinklevi@gmail.com",
  orcid: "0009-0003-3958-7865",

  // 链接
  profileUrl: "https://github.com/fnthinklevi",
  templateRepo: "https://github.com/fnthinklevi/awesome-github-readme-profile",
  websiteRepo: "https://github.com/fnthinklevi/fnthinklevi.github.io",

  // GitHub 数据（本地演示用示例数据，可随意修改）
  stats: {
    repos: 24,
    followers: 108,
    following: 42,
    stars: 12,
    commits: 1286,
    prs: 47,
    issues: 23,
    contributedTo: 18,
  },

  // 语言占比（GitHub 官方语言配色）
  reposLanguages: [
    { name: "Python",           pct: 35.8, color: "#3572A5" },
    { name: "Jupyter Notebook", pct: 22.4, color: "#DA5B0B" },
    { name: "TypeScript",       pct: 13.9, color: "#3178c6" },
    { name: "JavaScript",       pct:  9.6, color: "#f1e05a" },
    { name: "HTML",             pct:  7.2, color: "#e34c26" },
    { name: "CSS",              pct:  5.4, color: "#563d7c" },
    { name: "Other",            pct:  5.7, color: "#8b949e" },
  ],
  commitLanguages: [
    { name: "Python",           pct: 41.2, color: "#3572A5" },
    { name: "Jupyter Notebook", pct: 18.7, color: "#DA5B0B" },
    { name: "TypeScript",       pct: 14.3, color: "#3178c6" },
    { name: "JavaScript",       pct: 11.5, color: "#f1e05a" },
    { name: "Shell",            pct:  7.8, color: "#89e051" },
    { name: "Dockerfile",       pct:  6.5, color: "#384d54" },
  ],

  // 技能图标（顺序与 README 中 skillicons 一致）
  skills: [
    "python", "cpp", "c", "java", "mysql", "pytorch", "tensorflow",
    "mongodb", "linux", "matlab", "html", "css", "js", "git",
    "vscode", "latex", "github", "docker",
  ],

  // capsule-render 渐变色
  headerColor: "0:7C3AED,100:06B6D4",
  footerColor: "0:7C3AED,50:4E7FD4,100:06B6D4",
};
