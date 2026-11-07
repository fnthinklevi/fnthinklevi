/* ============================================================
 * config.js —— 你的个人信息与示例数据，都在这里改
 * ============================================================ */
window.CONFIG = {
  // 基础信息
  username: "fnthinklevi",
  displayName: "fnthinklevi",
  tagline: "Android · Flutter · Web Developer",
  typingLines: [
    "Android & Flutter Developer | Web Developer",
    "Dart · Kotlin · Java · JavaScript",
    "Mobile Apps · Websites · Cross-Platform",
    "Building smooth apps & clean code",
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
    { name: "Dart",        pct: 30.2, color: "#00B4AB" },
    { name: "Kotlin",      pct: 18.5, color: "#A97BFF" },
    { name: "JavaScript",  pct: 16.4, color: "#f1e05a" },
    { name: "TypeScript",  pct: 14.2, color: "#3178c6" },
    { name: "Java",        pct: 11.6, color: "#b07219" },
    { name: "HTML",        pct:  9.1, color: "#e34c26" },
  ],
  commitLanguages: [
    { name: "Dart",        pct: 33.5, color: "#00B4AB" },
    { name: "Kotlin",      pct: 20.4, color: "#A97BFF" },
    { name: "JavaScript",  pct: 15.8, color: "#f1e05a" },
    { name: "TypeScript",  pct: 13.2, color: "#3178c6" },
    { name: "Java",        pct:  9.6, color: "#b07219" },
    { name: "HTML",        pct:  7.5, color: "#e34c26" },
  ],

  // 技能图标（顺序与 README 中 skillicons 一致）
  skills: [
    "dart", "flutter", "androidstudio", "kotlin", "java", "js", "ts",
    "html", "css", "nodejs", "mysql", "firebase", "mongodb", "docker",
    "git", "github", "vscode", "linux",
  ],

  // capsule-render 渐变色
  headerColor: "0:7C3AED,100:06B6D4",
  footerColor: "0:7C3AED,50:4E7FD4,100:06B6D4",
};
