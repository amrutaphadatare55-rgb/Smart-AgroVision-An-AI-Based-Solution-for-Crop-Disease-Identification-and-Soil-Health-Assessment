import { Leaf, BarChart3, Zap, Shield, Download, Users } from "lucide-react"

const features = [
  {
    icon: Leaf,
    title: "Crop Analysis",
    description: "Identify crop types and detect diseases quickly from photos — actionable results in seconds.",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: BarChart3,
    title: "Soil Intelligence",
    description: "Visual soil insights, fertility scoring and NPK guidance for healthier yields.",
    color: "from-yellow-300 to-amber-500",
  },
  {
    icon: Zap,
    title: "Nutrient Prediction",
    description: "Smart nutrient and treatment suggestions tuned to crop and soil conditions.",
    color: "from-indigo-400 to-violet-600",
  },
  {
    icon: Shield,
    title: "Disease Detection",
    description: "Spot disease early with severity estimates and curated treatment steps.",
    color: "from-red-400 to-pink-600",
  },
  {
    icon: Download,
    title: "PDF Reports",
    description: "Download clear, printable reports with charts and next-step recommendations.",
    color: "from-sky-400 to-blue-600",
  },
  {
    icon: Users,
    title: "Admin Dashboard",
    description: "Manage your operations, users and historical analyses from one place.",
    color: "from-gray-400 to-slate-600",
  },
]

export function Features() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Smart tools to grow healthier crops — faster
          </h2>
          <p className="text-lg text-color-muted max-w-xl">
            Combine image-based analysis with soil intelligence to get clear, actionable recommendations. Designed
            for farmers and agronomists who want confident decisions backed by data.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#dashboard"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-color-primary to-color-primary-dark text-color-background font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              Try Analysis
            </a>
            <a href="#how-it-works" className="text-sm text-color-muted hover:text-color-primary transition">
              How it works →
            </a>
          </div>

          <div className="mt-6 flex gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-300 to-emerald-400 flex items-center justify-center text-white">🌾</div>
              <div>
                <div className="text-sm font-semibold">Real-time Results</div>
                <div className="text-sm text-color-muted">Upload photo, get results in seconds</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-300 to-blue-400 flex items-center justify-center text-white">📄</div>
              <div>
                <div className="text-sm font-semibold">Reports</div>
                <div className="text-sm text-color-muted">Save PDF reports for records</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <article
              key={f.title}
              className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-white/60 to-color-card border border-color-border shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.color} text-white mb-4 shadow-md`}> 
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-color-muted mb-3">{f.description}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-color-primary/10 text-color-primary font-medium">Popular</span>
                <a className="text-sm text-color-primary hover:underline" href="#">Learn more</a>
              </div>
              <div className="absolute -right-10 -top-10 opacity-10 text-6xl select-none">{f.title.split(' ')[0]}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
