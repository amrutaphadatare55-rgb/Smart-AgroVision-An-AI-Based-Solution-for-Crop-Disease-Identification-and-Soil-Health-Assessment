import Link from "next/link"

export function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="relative rounded-2xl border border-color-border bg-gradient-to-r from-color-primary/10 to-color-accent/10 p-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-color-primary to-color-accent opacity-5 blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-xl text-color-muted mb-8 max-w-2xl mx-auto">
            Start analyzing your crops and soil today with AI-powered insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-color-primary to-color-primary-dark text-color-background font-semibold hover:shadow-lg hover:shadow-color-primary/30 transition"
            >
              Get Started Free
            </Link>
            <Link
              href="/prelogin"
              className="px-8 py-3 rounded-lg border border-color-border hover:border-color-primary transition font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
