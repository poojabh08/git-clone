import { repoExtras } from "../data/mockData";

const colors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Dart: "#00B4AB",
  "Jupyter Notebook": "#DA5B0B",
  Python: "#3572A5",
};

function RepoCard({ repo }) {
  const extra = repoExtras[repo.name] || {};
  const language = repo.language || extra.language;
  const forkedFrom = extra.forkedFrom;

  return (
    <div className="repo-card">
      <div className="repo-top">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
        <span className="visibility">{repo.private ? "Private" : "Public"}</span>
      </div>

      {repo.fork && forkedFrom && (
        <p className="forked">Forked from {forkedFrom}</p>
      )}

      {repo.description && <p className="repo-desc">{repo.description}</p>}

      {language && (
        <p className="lang">
          <span
            className="dot"
            style={{ background: colors[language] || "#8b949e" }}
          />
          {language}
        </p>
      )}
    </div>
  );
}

export default RepoCard;
