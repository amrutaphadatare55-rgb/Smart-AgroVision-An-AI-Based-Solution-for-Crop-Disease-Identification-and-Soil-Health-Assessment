import { Upload, Zap, BarChart3, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    number: 1,
    title: "Upload Image",
    description: "Capture or upload a photo of your crop or soil sample",
  },
  {
    icon: Zap,
    number: 2,
    title: "AI Analysis",
    description: "Our models analyze the image within seconds",
  },
  {
    icon: BarChart3,
    number: 3,
    title: "Get Results",
    description: "View detailed analysis with confidence scores and recommendations",
  },
  {
    icon: Download,
    number: 4,
    title: "Export Report",
    description: "Download comprehensive PDF report with charts",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">How It Works</h2>
        <p className="text-xl text-color-muted max-w-2xl mx-auto">Simple, fast, and accurate agricultural analysis</p>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <div key={step.number} className="relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-color-primary to-color-accent flex items-center justify-center mb-4 text-2xl font-bold">
                {step.number}
              </div>
              <step.icon className="w-8 h-8 text-color-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-color-muted text-sm">{step.description}</p>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-1/2 w-full h-1 bg-gradient-to-r from-color-primary/50 to-transparent"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
