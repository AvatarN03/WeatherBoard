import { DatabaseZap, RefreshCw } from "lucide-react";

export default function DataNotAvailable() {
  return (
    <div className="min-h-screen bg-[#13111e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-8 py-12 text-center max-w-sm">

        <div className="w-14 h-14 rounded-2xl bg-[#1e1a30] border border-[#2e2848] flex items-center justify-center">
          <DatabaseZap size={24} className="text-violet-400" strokeWidth={1.8} />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-violet-100 tracking-tight">
            No data available
          </h2>
          <p className="text-sm text-violet-400/60 leading-relaxed">
            We couldn't find anything to show here right now. Try refreshing or come back later.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-1 flex items-center gap-2 px-5 py-2 rounded-xl border border-[#2e2848] bg-[#1e1a30] text-violet-300 text-sm font-medium hover:bg-[#252040] hover:border-violet-700 transition-colors cursor-pointer"
        >
          <RefreshCw size={14} strokeWidth={2} />
          Refresh
        </button>

      </div>
    </div>
  );
}