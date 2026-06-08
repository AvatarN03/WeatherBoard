import { useState } from "react";

export default function UnsubscribePage() {
    const email = new URLSearchParams(window.location.search).get("email");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleUnsubscribe = async () => {
        if (!email) return;
        try {
            setLoading(true);
            const response = await fetch("/api/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center p-6 relative overflow-hidden">

            {/* Ambient orbs */}
            <div className="fixed -top-25 -left-25 w-125 h-125 rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
            <div className="fixed -bottom-20 -right-20 w-100 h-100 rounded-full bg-violet-400/5 blur-[120px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-115 bg-[#1a1a2e] border border-[#2a2a3a] rounded-3xl px-10 py-12 animate-[fadeUp_0.5s_cubic-bezier(0.16,1,0.3,1)_both]">

                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-9">
                    <img
                        src="/logo.svg"
                        alt="WeatherBoard Logo"
                        className="w-12 h-12 rounded-full bg-linear-to-br from-purple-200 to-indigo-500 p-1"
                    />
                    <span className="text-violet-400 text-base font-semibold tracking-tight">WeatherBoard</span>
                </div>

                {/* ── Invalid link ── */}
                {!email && (
                    <>
                        <div className="w-16 h-16 rounded-[18px] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-6">
                            ⚠️
                        </div>
                        <h1 className="text-white text-[22px] font-semibold tracking-tight mb-2">Invalid link</h1>
                        <p className="text-gray-300 text-sm leading-relaxed mb-7">
                            This unsubscribe link is missing or malformed. Please use the link directly from your email.
                        </p>
                        <a
                            href="https://weather-board-js.vercel.app/"
                            className="block w-full py-3 text-center rounded-xl border-2 border-purple-300 text-gray-400 text-sm hover:text-gray-300 hover:border-purple-400 cursor-pointer transition-colors"
                        >
                            ← Back to WeatherBoard
                        </a>
                    </>
                )}

                {/* ── Success ── */}
                {email && success && (
                    <>
                        <div className="w-16 h-16 rounded-[18px] bg-green-500/10 border border-green-500/20 flex items-center justify-center text-3xl mb-6">
                            ✓
                        </div>
                        <div className="inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                            <span className="text-green-400 text-xs font-medium">Unsubscribed</span>
                        </div>
                        <h1 className="text-white text-[22px] font-semibold tracking-tight mb-2">You're unsubscribed</h1>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            We've removed <strong className="text-gray-300 font-medium">{email}</strong> from
                            the WeatherBoard daily digest. You won't receive any more emails from us.
                        </p>
                        <hr className="border-t border-[#2a2a3a] my-6" />
                        <p className="text-[#374151] text-xs text-center">
                            Changed your mind?{" "}
                            <a href="https://weather-board-js.vercel.app/" className="text-violet-600 hover:underline">
                                Re-subscribe on WeatherBoard
                            </a>
                        </p>
                    </>
                )}

                {/* ── Confirm form ── */}
                {email && !success && (
                    <>
                        <div className="w-16 h-16 rounded-[18px] bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl mb-6">
                            ✕
                        </div>
                        <h1 className="text-white text-[22px] font-semibold tracking-tight mb-2">Unsubscribe?</h1>
                        <p className="text-gray-500 text-sm leading-relaxed mb-7">
                            You're about to stop receiving your daily weather digest.
                        </p>

                        {/* Email pill */}
                        <div className="flex items-center gap-2 bg-[#0f0f1a] border border-[#2a2a3a] rounded-xl px-4 py-2.5 mb-7 w-full">
                            <span className="w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                            <span className="font-mono text-[13px] text-gray-300 truncate">{email}</span>
                        </div>

                        {/* Warning */}
                        <div className="flex gap-2.5 items-start bg-red-500/[0.07] border border-red-500/15 rounded-xl px-4 py-3.5 mb-7">
                            <span className="text-[15px] shrink-0 mt-px">ℹ️</span>
                            <span className="text-red-400 text-[13px] leading-relaxed">
                                This will permanently remove you from all WeatherBoard emails.
                                This action cannot be undone.
                            </span>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2.5 bg-red-500/[0.07] border border-red-500/20 rounded-xl px-3.5 py-3 mb-5 text-red-400 text-[13px] animate-[shake_0.4s_ease]">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        <button
                            onClick={handleUnsubscribe}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-linear-to-br from-red-600 to-red-500 text-white text-[15px] font-semibold mb-3 transition-all hover:-translate-y-px hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {loading && (
                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            )}
                            {loading ? "Unsubscribing…" : "Confirm Unsubscribe"}
                        </button>

                        <a
                            href="https://weather-board-js.vercel.app/"
                            className="block w-full py-3 text-center rounded-xl border border-[#2a2a3a] text-gray-500 text-sm hover:text-gray-300 hover:border-[#3a3a4a] transition-colors"
                        >
                            ← Keep my subscription
                        </a>
                    </>
                )}

            </div>

            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25%       { transform: translateX(-6px); }
          75%       { transform: translateX(6px); }
        }
      `}</style>
        </div>
    );
}