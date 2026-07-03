import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <h1 className="text-white text-xl font-semibold">
          Hire<span className="text-blue-500">Track</span>
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-xl text-sm text-gray-200 border border-gray-600 hover:border-gray-400 hover:text-white transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-xl text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-12 max-w-3xl mx-auto">
        <span className="inline-block bg-blue-500/10 text-blue-400 text-xs px-4 py-1.5 rounded-full border border-blue-500/20 mb-6">
          Built for job seekers
        </span>
        <h1 className="text-5xl font-semibold text-white leading-tight mb-5">
          Track every application.<br />
          <span className="text-blue-500">Land your dream job.</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Stop losing track of where you applied. HireTrack organizes all your
          job applications in one place — with a visual pipeline, analytics, and notes.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-base transition"
          >
            Start tracking for free
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-7 py-3 text-gray-200 border border-gray-600 hover:border-gray-400 hover:text-white rounded-xl text-base transition"
          >
            Login to your account
          </button>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="flex justify-center gap-12 flex-wrap py-8 border-y border-gray-800 mx-6">
        {[
          { num: "100%", label: "Free to use" },
          { num: "5", label: "Pipeline stages" },
          { num: "6+", label: "Job portals tracked" },
          { num: "1", label: "Dashboard for all" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-semibold text-blue-400">{s.num}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* App Preview Mockup */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          {/* Fake browser bar */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="flex-1 bg-gray-800 rounded-md h-6 ml-2"></div>
          </div>

          {/* Mini Stats */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: "Total Applied", value: "12", color: "text-blue-400" },
              { label: "Interviews", value: "4", color: "text-purple-400" },
              { label: "Offers", value: "1", color: "text-green-400" },
              { label: "Rejected", value: "3", color: "text-red-400" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-950 rounded-xl p-3 border border-gray-800">
                <p className="text-gray-500 text-xs">{s.label}</p>
                <p className={"text-2xl font-semibold mt-1 " + s.color}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Mini Kanban */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                title: "Applied",
                color: "text-blue-400",
                jobs: [
                  { company: "Google", role: "SDE Intern", tag: "LinkedIn", tagColor: "bg-blue-500/20 text-blue-400" },
                  { company: "Infosys", role: "React Dev", tag: "Naukri", tagColor: "bg-green-500/20 text-green-400" },
                ],
              },
              {
                title: "Interview",
                color: "text-purple-400",
                jobs: [
                  { company: "Razorpay", role: "Frontend Dev", tag: "Referral", tagColor: "bg-purple-500/20 text-purple-400" },
                ],
              },
              {
                title: "Offer",
                color: "text-green-400",
                jobs: [
                  { company: "Swiggy", role: "MERN Dev", tag: "LinkedIn", tagColor: "bg-blue-500/20 text-blue-400" },
                ],
              },
            ].map((col) => (
              <div key={col.title} className="bg-gray-950 rounded-xl p-3 border border-gray-800">
                <p className={"text-xs font-medium mb-3 " + col.color}>{col.title}</p>
                {col.jobs.map((job) => (
                  <div key={job.company} className="bg-gray-900 rounded-lg p-2.5 mb-2 border border-gray-800">
                    <p className="text-white text-xs font-medium">{job.company}</p>
                    <p className="text-gray-500 text-xs">{job.role}</p>
                    <span className={"text-xs px-2 py-0.5 rounded-full mt-1 inline-block " + job.tagColor}>
                      {job.tag}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500 text-sm mb-2">Features</p>
        <h2 className="text-center text-white text-3xl font-semibold mb-8">
          Everything you need to stay organized
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "📋",
              title: "Kanban pipeline",
              desc: "Drag and drop jobs across Applied, Screening, Interview, Offer and Rejected stages.",
              bg: "bg-blue-500/10",
            },
            {
              icon: "📊",
              title: "Analytics dashboard",
              desc: "See which job portals give you the best response rate and track weekly activity.",
              bg: "bg-green-500/10",
            },
            {
              icon: "🌐",
              title: "Source tracking",
              desc: "Track LinkedIn, Naukri, Indeed, Internshala and more — all in one place.",
              bg: "bg-purple-500/10",
            },
            {
              icon: "📝",
              title: "Notes per job",
              desc: "Add interview notes, follow-up reminders and job links for every application.",
              bg: "bg-orange-500/10",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4"
            >
              <div className={"w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" + f.bg}>
                {f.icon}
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <p className="text-center text-gray-500 text-sm mb-2">How it works</p>
        <h2 className="text-center text-white text-3xl font-semibold mb-8">
          Simple as 1, 2, 3
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: "01", title: "Create an account", desc: "Sign up for free. No credit card needed." },
            { step: "02", title: "Add your applications", desc: "Log jobs from LinkedIn, Naukri, Indeed or anywhere." },
            { step: "03", title: "Track your progress", desc: "Move cards as you progress and watch your stats update." },
          ].map((s) => (
            <div key={s.step} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 text-center">
              <p className="text-blue-500 text-3xl font-semibold mb-3">{s.step}</p>
              <h3 className="text-white font-medium mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center px-6 py-16">
        <h2 className="text-white text-3xl font-semibold mb-3">
          Start tracking your applications today
        </h2>
        <p className="text-gray-500 mb-8">Free forever. No credit card needed.</p>
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-base transition"
        >
          Create free account
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-600 text-sm">
        Built with MERN Stack &nbsp;·&nbsp; HireTrack 2026
      </footer>

    </div>
  );
}