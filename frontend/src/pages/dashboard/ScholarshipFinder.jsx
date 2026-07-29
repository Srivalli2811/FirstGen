import { useState } from "react";
import scholarships from "../../data/scholarships";

function ScholarshipFinder() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [firstGenOnly, setFirstGenOnly] = useState(false);

  const filtered = scholarships.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.provider.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || s.category === category;

    const matchesFirstGen =
      !firstGenOnly || s.forFirstGen;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesFirstGen
    );
  });

  return (
    <div className="scholarship-page">

      <div className="card">

        <h2 className="card-title">
          🎓 Scholarship Finder
        </h2>

        <p className="card-subtitle">
          Discover scholarships designed to
          support your academic journey.
        </p>

        <div className="scholarship-toolbar">

          <input
            className="scholarship-search"
            placeholder="🔍 Search scholarships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="government">Government</option>
            <option value="private">Private</option>
          </select>

          <label className="first-gen-checkbox">

            <input
              type="checkbox"
              checked={firstGenOnly}
              onChange={(e) =>
                setFirstGenOnly(e.target.checked)
              }
            />

            First Generation Only

          </label>

        </div>

        <div className="results-count">
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{scholarships.length}</strong> scholarships
        </div>

      </div>

      <div className="scholarship-grid">

        {filtered.length === 0 ? (

          <div className="card empty-scholarships">

            <div className="empty-icon">
              🎓
            </div>

            <h3>No Scholarships Found</h3>

            <p>
              Try changing your filters or
              search keywords.
            </p>

          </div>

        ) : (

          filtered.map((s) => (

            <div
              key={s.id}
              className="scholarship-card hover-lift"
            >

              <div className="scholarship-top">

                <div>

                  <h3>
                    {s.name}
                  </h3>

                  <p className="provider">
                    {s.provider}
                  </p>

                </div>

                {s.forFirstGen && (
                  <span className="first-gen-badge">
                    ⭐ First Gen
                  </span>
                )}

              </div>

              <p className="description">
                {s.description}
              </p>

              <div className="scholarship-info">

                <div className="info-card">
                  💰
                  <span>{s.amount}</span>
                </div>

                <div className="info-card">
                  📅
                  <span>{s.deadline}</span>
                </div>

              </div>

              <div className="eligibility-box">

                <strong>
                  Eligibility
                </strong>

                <p>
                  {s.eligibility}
                </p>

              </div>

              <a
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="apply-btn"
              >
                Apply Now →
              </a>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default ScholarshipFinder;