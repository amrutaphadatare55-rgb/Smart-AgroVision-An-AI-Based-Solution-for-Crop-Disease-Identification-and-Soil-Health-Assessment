import { MultiCropAnalyzer } from "@/components/analysis/multi-crop-analyzer"
import { Header } from "@/components/layout/header"

export default function AnalysisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
            <Header />
            <main className="container mx-auto px-4 py-8 relative z-10">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]" />
                </div>

                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Multi-Crop Real-Time Analysis
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                        Upload multiple crop images to instantly detect diseases, analyze health, and get actionable insights powered by AI.
                    </p>
                </div>

                <MultiCropAnalyzer />
            </main>
        </div>
    )
}
