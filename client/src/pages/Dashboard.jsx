import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

const STATUSES = ["Applied", "Screening", "Interview", "Offer", "Rejected"];

const STATUS_COLORS = {
  Applied: "bg-blue-500/20 text-blue-400",
  Screening: "bg-yellow-500/20 text-yellow-400",
  Interview: "bg-purple-500/20 text-purple-400",
  Offer: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
};

const SOURCES = [
  "LinkedIn",
  "Naukri",
  "Indeed",
  "Internshala",
  "Company Website",
  "Referral",
  "Other",
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
      console.log("1. Submitting form...");
      if (editJob) {
        const res = await API.put("/jobs/" + editJob._id, form);
        setJobs((prev) =>
          prev.map((j) => (j._id === editJob._id ? res.data : j))
        );
      } else {
        console.log("2. Posting new job...");
        const res = await API.post("/jobs", form);
        console.log("3. Job created:", res.data);
        setJobs((prev) => [res.data, ...prev]);
        console.log("4. State updated");
      }
      console.log("5. Closing modal...");
      closeModal();
      console.log("6. Modal closed");
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

  const stats = [
    { label: "Total Applied", value: total, color: "text-blue-400" },
    { label: "Interviews", value: interviews, color: "text-purple-400" },
    { label: "Offers", value: offers, color: "text-green-400" },
    { label: "Rejected", value: rejected, color: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900 rounded-2xl p-5 border border-gray-800"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className={"text-4xl font-bold mt-1 " + stat.color}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Header Row */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-semibold">
            Your Applications
          </h2>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-medium transition"
          >
            + Add Job
          </button>
        </div>

        {/* Empty State */}
        {jobs.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-xl">No applications yet</p>
            <p className="text-sm mt-2">
              Click &quot;+ Add Job&quot; to track your first application
            </p>
          </div>
        )}

        {/* Jobs grouped by Status */}
        {STATUSES.map((status) => {
          const filtered = jobs.filter((j) => j.status === status);
          if (filtered.length === 0) return null;

          return (
            <div key={status} className="mb-8">
              <span
                className={
                  "text-sm font-semibold px-3 py-1 rounded-full inline-block mb-3 " +
                  STATUS_COLORS[status]
                }
              >
                {status} ({filtered.length})
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((job) => (
                  <div
                    key={job._id}
                    className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
                  >
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {job.company}
                        </h4>
                        <p className="text-gray-400 text-sm">{job.role}</p>
                      </div>
                      <span
                        className={
                          "text-xs px-2 py-1 rounded-full " +
                          STATUS_COLORS[job.status]
                        }
                      >
                        {job.status}
                      </span>
                    </div>

                    {/* Card Meta */}
                    <p className="text-gray-500 text-xs mb-1">
                      📅 {job.appliedDate ? job.appliedDate.split("T")[0] : "—"}
                    </p>
                    <p className="text-gray-500 text-xs mb-3">
                      🌐 {job.source}
                    </p>

                    {/* Notes */}
                    {job.notes ? (
                      <p className="text-gray-400 text-xs bg-gray-800 px-3 py-2 rounded-lg mb-3">
                        📝 {job.notes}
                      </p>
                    ) : null}

                    {/* Job Link */}
                    {job.jobLink ? (
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-400 text-xs hover:underline block mb-3"
                      >
                        🔗 View Job Posting
                      </a>
                    ) : null}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(job)}
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded-xl transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="flex-1 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-sm py-2 rounded-xl transition"
                      >
                        Delete
                      </button>
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
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-800">
            <h3 className="text-white text-xl font-bold mb-4">
              {editJob ? "Edit Application" : "Add New Application"}
            </h3>

            <div className="flex flex-col gap-3">
              <input
                name="company"
                placeholder="Company Name *"
                value={form.company}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="role"
                placeholder="Job Role *"
                value={form.role}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <input
                name="jobLink"
                placeholder="Job Link (optional)"
                value={form.jobLink}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <div className="flex gap-3 mt-2">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                  {editJob ? "Update" : "Save Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}