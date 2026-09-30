import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

function ContributionGraph({ username }) {
  const [data, setData] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username, year]);

  if (loading || !data) {
    return <p className="loading">Loading contributions...</p>;
  }

  const days = data.contributions || [];
  const total = data.total?.[year] || days.reduce((sum, d) => sum + d.count, 0);

  // years list on the right side (like github)
  const years = [];
  for (let y = new Date().getFullYear(); y >= 2013; y--) {
    years.push(y);
  }

  const option = {
    tooltip: {
      formatter: function (p) {
        return p.data[0] + ": " + p.data[1] + " contributions";
      },
    },
    visualMap: {
      show: false,
      min: 0,
      max: 4,
      inRange: {
        color: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
      },
    },
    calendar: {
      top: 24,
      left: 30,
      right: 10,
      bottom: 10,
      range: String(year),
      cellSize: [11, 11],
      itemStyle: {
        borderWidth: 2,
        borderColor: "#fff",
      },
      splitLine: { show: false },
      yearLabel: { show: false },
      monthLabel: {
        nameMap: "EN",
        fontSize: 10,
        color: "#656d76",
      },
      dayLabel: {
        firstDay: 1,
        nameMap: ["", "Mon", "", "Wed", "", "Fri", ""],
        fontSize: 10,
        color: "#656d76",
      },
    },
    series: [
      {
        type: "heatmap",
        coordinateSystem: "calendar",
        data: days.map((d) => [d.date, d.level]),
      },
    ],
  };

  return (
    <section className="contrib">
      <div className="contrib-head">
        <h2>
          {total.toLocaleString()} contributions in {year}
        </h2>
        <span className="muted">Contribution settings</span>
      </div>

      <div className="contrib-body">
        <div className="heatmap-wrap">
          <ReactECharts option={option} style={{ height: 160, width: "100%" }} />
          <div className="legend">
            <span>Less</span>
            <i className="c0"></i>
            <i className="c1"></i>
            <i className="c2"></i>
            <i className="c3"></i>
            <i className="c4"></i>
            <span>More</span>
          </div>
        </div>

        <div className="year-list">
          {years.map((y) => (
            <button
              key={y}
              type="button"
              className={y === year ? "active" : ""}
              onClick={() => setYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContributionGraph;
