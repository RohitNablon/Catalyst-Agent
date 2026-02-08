export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-white/10 z-20">
            <div className="h-full px-6 flex items-center justify-between">
                {/* Logo and Title - TOP LEFT */}
                <div className="flex items-center gap-4">
                    <img
                        src="/assets/nablon-logo.png"
                        alt="Nablon"
                        className="h-8"
                    />
                    <div className="border-l border-white/20 pl-4">
                        <h1 className="text-xl font-bold gradient-text">
                            Catalyst AI
                        </h1>
                        <p className="text-xs text-zinc-400">Product Intelligence Platform</p>
                    </div>
                </div>

                {/* OneBlade Context - TOP RIGHT */}
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-sm font-medium text-white">Philips OneBlade 360</p>
                        <p className="text-xs text-zinc-400">Grooming Product Intelligence</p>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-400">Live</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
