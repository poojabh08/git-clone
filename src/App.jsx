import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import RepoCard from "./components/RepoCard";
import ContributionGraph from "./components/ContributionGraph";
import { pinnedOrder, activityOverview, contributionActivity } from "./data/mockData";
import "./App.css";

const USERNAME = "shreeramk";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [tab, setTab] = useState("Overview");
  const [error, setError] = useState("");

  useEffect(() => {
    // profile
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setError(data.message);
        } else {
          setUser(data);
        }
      })
      .catch(() => setError("Could not load profile"));

    // repos (extra points)
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
      });
  }, []);

  const pinned = pinnedOrder
    .map((name) => repos.find((r) => r.name === name))
    .filter(Boolean);

  const popular = pinned.length ? pinned : repos.slice(0, 6);

  return (
    <div className="page">
      <Header username={user?.login} avatar={user?.avatar_url} />

      <nav className="tabs">
        {["Overview", "Repositories", "Projects", "Packages"].map((name) => (
          <button
            key={name}
            type="button"
            className={tab === name ? "tab active" : "tab"}
            onClick={() => setTab(name)}
          >
            {name}
            {name === "Repositories" && user && (
              <span className="count">{user.public_repos}</span>
            )}
            {name === "Packages" && <span className="count">5</span>}
          </button>
        ))}
      </nav>

      <div className="layout">
        <Sidebar user={user} />

        <main className="main">
          {error && <p className="error">{error}</p>}
          {!user && !error && <p className="loading">Loading profile...</p>}

          {tab === "Overview" && user && (
            <>
              <div className="section-head">
                <h2>Popular repositories</h2>
                <span className="muted">Customize your pins</span>
              </div>

              <div className="repo-grid">
                {popular.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>

              <ContributionGraph username={USERNAME} />

              <section className="activity">
                <div className="activity-left">
                  <h3>Activity overview</h3>
                  <p>
                    Contributed to UptimeAI/uptime_webapp, UptimeAI/uptime_server,
                    UptimeAI/uptime_ml and 13 other repositories
                  </p>
                </div>
                <div className="activity-chart">
                  <span className="axis top">Code review</span>
                  <span className="axis left">{activityOverview.commits}% Commits</span>
                  <span className="axis right">Issues</span>
                  <span className="axis bottom">{activityOverview.pullRequests}% Pull requests</span>
                  <div className="chart-dot"></div>
                </div>
              </section>

              <section className="contrib-activity">
                <h2>Contribution activity</h2>
                <h3>{contributionActivity.month}</h3>
                <p>Created {contributionActivity.commits} commits in {contributionActivity.commitRepos} repositories</p>
                <p>Opened {contributionActivity.pullRequests} pull requests in {contributionActivity.prRepos} repositories</p>
                <ul>
                  {contributionActivity.prs.map((pr, i) => (
                    <li key={i}>
                      {pr.repo}
                      <span className={pr.status === "open" ? "open" : "merged"}>
                        {pr.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className="more-btn" type="button">
                  Show more activity
                </button>
              </section>
            </>
          )}

          {tab !== "Overview" && (
            <div className="empty-tab">
              <h2>{tab}</h2>
              <p>Nothing here yet.</p>
            </div>
          )}
        </main>
      </div>

      <footer className="footer">
        <span>© 2025 GitHub, Inc.</span>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">Security</a>
        <a href="#">Status</a>
        <a href="#">Community</a>
      </footer>
    </div>
  );
}

export default App;
