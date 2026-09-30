// stuff that is not coming from the github user api
export const extraProfile = {
  email: "kushwaha.shreeram@gmail.com",
  linkedin: "shreeramkushwaha",
  achievements: [
    { name: "YOLO", color: "#f59e0b" },
    { name: "Pair Extraordinaire", count: 4, color: "#8b5cf6" },
  ],
  orgs: [
    { name: "UptimeAI", img: "" },
  ],
};

export const activityOverview = {
  commits: 83,
  pullRequests: 17,
  issues: 0,
  codeReviews: 0,
};

export const contributionActivity = {
  month: "October 2025",
  commits: 56,
  commitRepos: 11,
  pullRequests: 29,
  prRepos: 5,
  prs: [
    { repo: "uptimeai/uptime_webapp", status: "open", extra: "merged" },
    { repo: "uptimeai/uptime_ml", status: "merged" },
    { repo: "uptimeai/uptime_scripts", status: "merged" },
    { repo: "uptimeai/uptime_ml_encrypted", status: "merged" },
    { repo: "uptimeai/uptime_ml", status: "merged" },
  ],
};

// github list api does not always send parent / language for forks
export const repoExtras = {
  "Complete-Python-3-Bootcamp": { language: "Jupyter Notebook" },
  flutter_login_ui: { language: "Dart", forkedFrom: "marcusung/flutter_login_ui" },
  gitignore: { forkedFrom: "github/gitignore" },
  "node-opcua-logger": { language: "JavaScript" },
  kafkajs: { language: "JavaScript", forkedFrom: "tulios/kafkajs" },
  "node-opcua-1": { language: "TypeScript", forkedFrom: "node-opcua/node-opcua" },
};

export const pinnedOrder = [
  "Complete-Python-3-Bootcamp",
  "flutter_login_ui",
  "gitignore",
  "node-opcua-logger",
  "kafkajs",
  "node-opcua-1",
];
