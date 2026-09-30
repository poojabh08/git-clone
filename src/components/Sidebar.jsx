import { extraProfile } from "../data/mockData";

function Sidebar({ user }) {
  if (!user) return null;

  return (
    <aside className="sidebar">
      <img className="avatar" src={user.avatar_url} alt={user.login} />

      <h1 className="name">{user.name}</h1>
      <p className="username">{user.login}</p>

      {user.bio && <p className="bio">{user.bio}</p>}

      <button className="edit-btn" type="button">
        Edit profile
      </button>

      <div className="follow-row">
        <span>
          <b>{user.followers}</b> followers
        </span>
        <span> · </span>
        <span>
          <b>{user.following}</b> following
        </span>
      </div>

      <ul className="info-list">
        {user.company && <li>🏢 {user.company}</li>}
        {user.location && <li>📍 {user.location}</li>}
        {extraProfile.email && <li>✉️ {extraProfile.email}</li>}
        {user.blog && (
          <li>
            🔗 <a href={user.blog}>{user.blog}</a>
          </li>
        )}
        {extraProfile.linkedin && <li>in/{extraProfile.linkedin}</li>}
        {user.twitter_username && <li>𝕏 @{user.twitter_username}</li>}
      </ul>

      <div className="side-block">
        <h3>Achievements</h3>
        <div className="badges">
          {extraProfile.achievements.map((item) => (
            <div
              key={item.name}
              className="badge"
              style={{ background: item.color }}
              title={item.name}
            >
              {item.count ? `x${item.count}` : "★"}
            </div>
          ))}
        </div>
      </div>

      <div className="side-block">
        <h3>Organizations</h3>
        <div className="orgs">
          {extraProfile.orgs.map((org) => (
            <div key={org.name} className="org-box" title={org.name}>
              {org.name[0]}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
