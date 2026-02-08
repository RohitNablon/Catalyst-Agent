import { useState } from 'react';
import {
    TrendingUp, AlertCircle, Target, Clock,
    Zap, ChevronRight
} from 'lucide-react';
import { GlassPanel } from '@lego/components/primitives/GlassPanel';
import { Badge } from '@lego/components/primitives/Badge';
import competitiveAlerts from '../data/competitiveAlerts.json';
import featureGaps from '../data/featureGaps.json';

export default function Competitive() {
    const [sortGapsBy, setSortGapsBy] = useState<'demand' | 'complexity'>('demand');

    // Sort "They Have, We Don't" by demand or complexity
    const sortedGaps = [...featureGaps.theyHaveWeFont].sort((a, b) => {
        if (sortGapsBy === 'demand') {
            return b.demandSignals - a.demandSignals;
        }
        const complexityOrder = { Low: 1, Medium: 2, High: 3 };
        return complexityOrder[a.complexity as keyof typeof complexityOrder] -
            complexityOrder[b.complexity as keyof typeof complexityOrder];
    });

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Competitive War Room</h1>
                    <p className="text-zinc-400">Real-time competitive intelligence and strategic positioning</p>
                </div>

                {/* Vertical Stacked Layout */}
                <div className="space-y-8">
                    {/* SECTION 1: Market Position Matrix */}
                    <GlassPanel>
                        <h2 className="text-2xl font-bold text-white mb-6">Market Position</h2>
                        <div className="h-96 relative bg-zinc-900 rounded-lg p-6">
                            {/* Axes */}
                            <div className="absolute bottom-6 left-6 right-6 h-px bg-white/20"></div>
                            <div className="absolute top-6 left-6 bottom-6 w-px bg-white/20"></div>

                            {/* Axis Labels */}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-zinc-500">
                                Innovation →
                            </div>
                            <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-zinc-500">
                                Satisfaction →
                            </div>

                            {/* Grid Lines */}
                            <div className="absolute left-6 right-6 bottom-1/3 h-px bg-white/5"></div>
                            <div className="absolute left-6 right-6 bottom-2/3 h-px bg-white/5"></div>
                            <div className="absolute left-1/3 top-6 bottom-6 w-px bg-white/5"></div>
                            <div className="absolute left-2/3 top-6 bottom-6 w-px bg-white/5"></div>

                            {/* OneBlade Position - Sweet Spot */}
                            <div
                                className="absolute w-24 h-24 rounded-full bg-cyan-500/20 border-2 border-cyan-500 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
                                style={{ left: '60%', top: '35%' }}
                            >
                                <div className="text-center">
                                    <p className="text-xs font-bold text-cyan-400">OneBlade</p>
                                    <p className="text-[10px] text-cyan-400/70">7.8, 7.5</p>
                                    <div className="mt-1 w-full h-1 bg-cyan-500 rounded-full animate-pulse"></div>
                                </div>
                            </div>

                            {/* Braun - Top Right (Leader) */}
                            <div
                                className="absolute w-20 h-20 rounded-full bg-red-500/10 border border-red-500/50 flex items-center justify-center hover:scale-110 cursor-pointer transition-all"
                                style={{ left: '72%', top: '22%' }}
                            >
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-red-400">Braun</p>
                                    <p className="text-[10px] text-red-400/70">8.5, 8.2</p>
                                </div>
                            </div>

                            {/* Manscaped - Mid (Competent) */}
                            <div
                                className="absolute w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/50 flex items-center justify-center hover:scale-110 cursor-pointer transition-all"
                                style={{ left: '48%', top: '48%' }}
                            >
                                <div className="text-center">
                                    <p className="text-[10px] font-semibold text-orange-400">Manscaped</p>
                                    <p className="text-[9px] text-orange-400/70">6.5, 6.8</p>
                                </div>
                            </div>

                            {/* Gillette - Lower Left (Legacy) */}
                            <div
                                className="absolute w-18 h-18 rounded-full bg-yellow-500/10 border border-yellow-500/50 flex items-center justify-center hover:scale-110 cursor-pointer transition-all"
                                style={{ left: '38%', top: '58%' }}
                            >
                                <div className="text-center">
                                    <p className="text-[10px] font-semibold text-yellow-400">Gillette</p>
                                    <p className="text-[9px] text-yellow-400/70">5.2, 6.0</p>
                                </div>
                            </div>

                            {/* Quadrant Labels */}
                            <div className="absolute top-8 right-8 text-[10px] text-zinc-600 font-semibold">LEADERS</div>
                            <div className="absolute bottom-8 right-8 text-[10px] text-zinc-600 font-semibold">INNOVATORS</div>
                            <div className="absolute top-8 left-8 text-[10px] text-zinc-600 font-semibold">LEGACY</div>
                        </div>

                        {/* Position Summary */}
                        <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm font-semibold text-white">Our Position</span>
                            </div>
                            <p className="text-xs text-zinc-300">
                                Strong positioning in the innovation-satisfaction sweet spot.
                                Opportunity to push towards leadership quadrant with Q2 roadmap features.
                            </p>
                        </div>
                    </GlassPanel>

                    {/* SECTION 2: Feature Gap Analysis */}
                    <GlassPanel>
                        <h2 className="text-2xl font-bold text-white mb-6">Feature Gap Analysis</h2>

                        <div className="grid grid-cols-2 gap-6">
                            {/* They Have, We Don't */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-red-400">🔴 They Have, We Don't</h3>
                                    <select
                                        value={sortGapsBy}
                                        onChange={(e) => setSortGapsBy(e.target.value as 'demand' | 'complexity')}
                                        className="text-xs bg-zinc-800 text-zinc-300 border border-white/10 rounded px-2 py-1"
                                    >
                                        <option value="demand">Sort by Demand</option>
                                        <option value="complexity">Sort by Complexity</option>
                                    </select>
                                </div>

                                <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                                    {sortedGaps.map((gap) => (
                                        <div
                                            key={gap.id}
                                            className="p-4 rounded-lg bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="text-sm font-semibold text-white">{gap.feature}</h4>
                                                <Badge color={gap.priority === 'P0' ? 'red' : gap.priority === 'P1' ? 'yellow' : 'gray'} size="sm">
                                                    {gap.priority}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge color="orange" size="sm">{gap.competitor}</Badge>
                                                <span className="text-xs text-zinc-500">•</span>
                                                <span className="text-xs text-zinc-400">{gap.complexity} complexity</span>
                                            </div>

                                            <div className="flex items-center gap-4 mb-2 text-xs">
                                                <div className="flex items-center gap-1">
                                                    <TrendingUp className="w-3 h-3 text-cyan-400" />
                                                    <span className="text-zinc-400">{gap.demandSignals} signals</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-yellow-400" />
                                                    <span className="text-zinc-400">{gap.timeline}</span>
                                                </div>
                                            </div>

                                            <p className="text-xs text-zinc-500 italic mb-2">"{gap.userQuote}"</p>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className={`font-medium ${gap.roadmapStatus.includes('Already') ? 'text-green-400' :
                                                    gap.roadmapStatus.includes('Proposed') ? 'text-yellow-400' :
                                                        'text-gray-400'
                                                    }`}>
                                                    {gap.roadmapStatus}
                                                </span>
                                                <span className="text-emerald-400">{gap.potentialImpact}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* We Have, They Don't */}
                            <div>
                                <h3 className="text-lg font-semibold text-green-400 mb-3">🟢 We Have, They Don't</h3>
                                <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                                    {featureGaps.weHaveTheyDont.map((advantage) => (
                                        <div
                                            key={advantage.id}
                                            className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 hover:bg-green-500/10 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-semibold text-white">{advantage.feature}</h4>
                                                <Badge
                                                    color={
                                                        advantage.amplificationOpportunity === 'UNDERMARKETED' ? 'yellow' :
                                                            advantage.amplificationOpportunity === 'STRONG DIFFERENTIATOR' ? 'green' :
                                                                'cyan'
                                                    }
                                                    size="sm"
                                                >
                                                    {advantage.userPreference}% prefer
                                                </Badge>
                                            </div>

                                            <div className="text-xs text-orange-400 font-medium mb-2">
                                                ⚠️ {advantage.amplificationOpportunity}
                                            </div>

                                            <p className="text-xs text-zinc-400 mb-2">{advantage.suggestedAction}</p>

                                            <div className="flex items-center justify-between text-xs">
                                                <span className="text-zinc-500">Awareness: {advantage.marketAwareness}</span>
                                                <span className="text-emerald-400">{advantage.projectedImpact}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassPanel>

                    {/* SECTION 3: Competitive Alert Feed */}
                    <GlassPanel>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Live Alert Feed</h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-xs text-zinc-400">Live</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {competitiveAlerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={` p-4 rounded-lg border transition-all hover:scale-[1.02] cursor-pointer ${alert.severity === 'high'
                                        ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/15'
                                        : alert.severity === 'medium'
                                            ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15'
                                            : 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/15'
                                        }`}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">{alert.icon}</span>
                                            <div>
                                                <div className="text-xs text-zinc-500">{alert.timestamp}</div>
                                                <Badge color={
                                                    alert.severity === 'high' ? 'red' :
                                                        alert.severity === 'medium' ? 'yellow' :
                                                            'blue'
                                                } size="sm">{alert.action}</Badge>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-zinc-600" />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-sm font-semibold text-white mb-2">{alert.title}</h3>

                                    {/* Description */}
                                    <p className="text-xs text-zinc-400 mb-3">{alert.description}</p>

                                    {/* Our Roadmap */}
                                    <div className="p-2 rounded bg-white/5 mb-3">
                                        <div className="text-xs text-zinc-500 mb-1">Our Roadmap:</div>
                                        <div className="text-xs text-white">{alert.ourRoadmap}</div>
                                    </div>

                                    {/* Recommendation */}
                                    <div className={`p-3 rounded-lg border ${alert.severity === 'high'
                                        ? 'bg-red-500/20 border-red-500/40'
                                        : alert.severity === 'medium'
                                            ? 'bg-yellow-500/20 border-yellow-500/40'
                                            : 'bg-cyan-500/20 border-cyan-500/40'
                                        }`}>
                                        <div className="flex items-start gap-2">
                                            <Zap className={`w-4 h-4 flex-shrink-0 mt-0.5 ${alert.severity === 'high' ? 'text-red-400' :
                                                alert.severity === 'medium' ? 'text-yellow-400' :
                                                    'text-cyan-400'
                                                }`} />
                                            <div className="text-xs text-white">
                                                <strong>RECOMMENDATION:</strong> {alert.recommendation}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="flex items-center gap-4 mt-3 text-xs">
                                        <div className="flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3 text-cyan-400" />
                                            <span className="text-zinc-400">{alert.signals} signals</span>
                                        </div>
                                        <div className={`flex items-center gap-1 ${alert.sentiment === 'positive' ? 'text-green-400' :
                                            alert.sentiment === 'negative' ? 'text-red-400' :
                                                'text-yellow-400'
                                            }`}>
                                            {alert.sentiment === 'positive' ? '↑' : alert.sentiment === 'negative' ? '↓' : '→'}
                                            {alert.sentiment}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>
                </div>
            </div>
        </div>
    );
}
