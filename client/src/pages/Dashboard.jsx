import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const STATUSES = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

const STATUS_STYLES = {
  Applied: { dot: "bg-blue-500", badge: "bg-blue-500/15 text-blue-400", accent: "bg-blue-500" },
  Screening: { dot: "bg-yellow-500", badge: "bg-yellow-500/15 text-yellow-400", accent: "bg-yellow-500" },
  Interview: { dot: "bg-purple-500", badge: "bg-purple-500/15 text-purple-400", accent: "bg-purple-500" },
  Offer: { dot: "bg-green-500", badge: "bg-green-500/15 text-green-400", accent: "bg-green-500" },
  Rejected: { dot: "bg-red-500", badge: "bg-red-500/15 text-red-400", accent: "bg-red-500" },
};

const SOURCES = [
  "LinkedIn", "Naukri", "Indeed", "Internshala",
  "Company Website", "Referral", "Other",
];

const EMPTY_FORM = {
  company: "",
  role: "",
  status: "Applied",
  source: "LinkedIn",
  jobLink: "",
  notes: "",
  appliedDate: new Date().toISOString().split("T")[0],
};

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedNotes, setExpandedNotes] = useState({})

  const toggleNote = (id) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setEditJob(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setEditJob(job);
    setForm({
      company: job.company,
      role: job.role,
      status: job.status,
      source: job.source,
      jobLink: job.jobLink || "",
      notes: job.notes || "",
      appliedDate: job.appliedDate
        ? job.appliedDate.split("T")[0]
        : new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditJob(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      alert("Company and Role are required!");
      return;
    }
    try {
      if (editJob) {
        const res = await API.put("/jobs/" + editJob._id, form);
        setJobs((prev) =>
          prev.map((j) => (j._id === editJob._id ? res.data : j))
        );
      } else {
        const res = await API.post("/jobs", form);
        setJobs((prev) => [res.data, ...prev]);
      }
      closeModal();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete("/jobs/" + id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;
  const rejected = jobs.filter((j) => j.status === "Rejected").length;

  const filteredStatuses =
    activeFilter === "All"
      ? STATUSES
      : STATUSES.filter((s) => s === activeFilter);

  const filters = ["All", "Applied", "Screening", "Interview", "Offer", "Rejected"];

  return (
    <div className="min-h-screen bg-[#060d1a] relative overflow-x-hidden">

      {/* Background glows */}
      <div
        className="pointer-events-none fixed top-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none fixed bottom-0 left-[-100px] w-[400px] h-[400px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
      />

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-semibold">Your applications</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage all your job applications in one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "TOTAL APPLIED", value: total, color: "text-blue-400", icon: "📋", top: "bg-blue-500", iconBg: "bg-blue-500/10" },
            { label: "INTERVIEWS", value: interviews, color: "text-purple-400", icon: "🎯", top: "bg-purple-500", iconBg: "bg-purple-500/10" },
            { label: "OFFERS", value: offers, color: "text-green-400", icon: "✅", top: "bg-green-500", iconBg: "bg-green-500/10" },
            { label: "REJECTED", value: rejected, color: "text-red-400", icon: "❌", top: "bg-red-500", iconBg: "bg-red-500/10" },
          ].map((s) => (
            <div
              key={s.label}
              className="relative rounded-2xl overflow-hidden border border-white/5"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className={"absolute top-0 left-0 right-0 h-[2px] " + s.top} />
              <div className="p-5">
                <div className={"w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3 " + s.iconBg}>
                  {s.icon}
                </div>
                <p className="text-gray-500 text-xs tracking-wider mb-1">{s.label}</p>
                <p className={"text-3xl font-semibold " + s.color}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={
                  "px-4 py-1.5 rounded-lg text-xs font-medium transition border " +
                  (activeFilter === f
                    ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                    : "border-white/8 text-gray-500 hover:text-gray-300 bg-white/3"
                  )
                }
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            + Add Job
          </button>
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-white text-xl font-medium">No applications yet</p>
            <p className="text-gray-500 text-sm mt-2 mb-6">
              Click &quot;+ Add Job&quot; to track your first application
            </p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
            >
              + Add your first job
            </button>
          </div>
        )}

        {/* Jobs grouped by status */}
        {filteredStatuses.map((status) => {
          const filtered = jobs.filter((j) => j.status === status);
          if (filtered.length === 0) return null;
          const style = STATUS_STYLES[status];

          return (
            <div key={status} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <div className={"w-2 h-2 rounded-full " + style.dot} />
                <span className="text-gray-200 text-sm font-medium">{status}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-gray-500"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {filtered.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((job) => (
                  <div
                    key={job._id}
                    className="relative rounded-2xl border border-white/5 overflow-hidden transition hover:border-white/10 flex flex-col"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className={"absolute left-0 top-0 bottom-0 w-[3px] " + STATUS_STYLES[job.status].accent} />

                    <div className="pl-5 pr-4 pt-4 pb-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-medium text-base leading-tight">
                            {job.company}
                          </h4>
                          <p className="text-gray-500 text-xs mt-0.5">{job.role}</p>
                        </div>
                        <span className={"text-xs px-2.5 py-1 rounded-full font-medium ml-2 " + STATUS_STYLES[job.status].badge}>
                          {job.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 mb-3">
                        <span className="text-gray-500 text-xs">
                          📅 {job.appliedDate ? job.appliedDate.split("T")[0] : "—"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          🌐 {job.source}
                        </span>
                      </div>

                      {job.notes ? (
                        <div
                          className="rounded-lg px-3 py-2 mb-3 border border-white/5 text-gray-400 text-xs"
                          style={{ background: "rgba(255,255,255,0.03)" }}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <span className={expandedNotes[job._id] ? "" : "line-clamp-2"}>
                              📝 {job.notes}
                            </span>
                            {job.notes.length > 80 ? (
                              <button
                                onClick={() => toggleNote(job._id)}
                                className="text-blue-400 hover:text-blue-300 transition shrink-0"
                              >
                                {expandedNotes[job._id] ? "less" : "more"}
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ) : null}

                      {job.jobLink ? (
                        <a
                          href={job.jobLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-xs block mb-3 transition"
                        >
                          🔗 View job posting
                        </a>
                      ) : null}

                      <div className="flex gap-2 pt-1 mt-auto">
                        <button
                          onClick={() => openEditModal(job)}
                          className="flex-1 text-xs py-2 rounded-lg text-gray-400 hover:text-white border border-white/6 transition"
                          style={{ background: "rgba(255,255,255,0.04)" }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="flex-1 text-xs py-2 rounded-lg text-red-400 hover:text-red-300 border border-red-500/10 transition"
                          style={{ background: "rgba(239,68,68,0.05)" }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-white/8 p-6"
            style={{ background: "#0f1829" }}
          >
            <h3 className="text-white text-lg font-semibold mb-5">
              {editJob ? "Edit application" : "Add new application"}
            </h3>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-gray-500 text-xs mb-1.5 block">Company name *</label>
                <input
                  name="company"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs mb-1.5 block">Job role *</label>
                <input
                  name="role"
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                    style={{ background: "#0f1829" }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-xs mb-1.5 block">Source</label>
                  <select
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                    style={{ background: "#0f1829" }}
                  >
                    {SOURCES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-500 text-xs mb-1.5 block">Job link</label>
                <input
                  name="jobLink"
                  placeholder="https://..."
                  value={form.jobLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs mb-1.5 block">Date applied</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={form.appliedDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>
              <div>
                <label className="text-gray-500 text-xs mb-1.5 block">Notes</label>
                <textarea
                  name="notes"
                  placeholder="Interview tips, follow-up date, contacts..."
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none border border-white/8 focus:border-blue-500 transition resize-none"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white border border-white/8 transition"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  {editJob ? "Update" : "Save job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}