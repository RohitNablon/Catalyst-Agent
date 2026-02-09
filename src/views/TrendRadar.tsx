import { useState } from 'react';
import {
    Target, TrendingUp, Radio
} from 'lucide-react';
import { GlassPanel } from '@lego/components/primitives/GlassPanel';
import { Badge } from '@lego/components/primitives/Badge';
import trendRadar from '../data/trendRadar.json';

export default function TrendRadar() {
    const [selectedRing, setSelectedRing] = useState<'all' | 'mainstream' | 'emerging' | 'weak_signal'>('all');
    const [selectedTrend, setSelectedTrend] = useState<string | null>(null);

    const filteredTrends = selectedRing === 'all'
        ? trendRadar
        : trendRadar.filter(t => t.ring === selectedRing);

    const ringColors = {
        mainstream: 'cyan',
        emerging: 'purple',
        weak_signal: 'orange'
    };

    const ringLabels = {
        mainstream: 'Mainstream',
        emerging: 'Emerging',
        weak_signal: 'Weak Signal'
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Trend Radar & Cultural Intelligence</h1>
                    <p className="text-zinc-400">Sonar-style trend visualization and emerging cultural signals</p>
                </div>

                {/* Ring Filter */}
                <div className="mb-6 flex items-center gap-3">
                    <span className="text-sm text-zinc-400">Filter by Ring:</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedRing('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRing === 'all'
                                ? 'bg-cyan-500 text-black'
                                : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            All Trends
                        </button>
                        <button
                            onClick={() => setSelectedRing('mainstream')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRing === 'mainstream'
                                ? 'bg-cyan-500 text-black'
                                : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            🎯 Mainstream
                        </button>
                        <button
                            onClick={() => setSelectedRing('emerging')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRing === 'emerging'
                                ? 'bg-purple-500 text-white'
                                : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            📈 Emerging
                        </button>
                        <button
                            onClick={() => setSelectedRing('weak_signal')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedRing === 'weak_signal'
                                ? 'bg-orange-500 text-white'
                                : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            🔮 Weak Signals
                        </button>
                    </div>
                </div>

                {/* 3-Column Layout: Radar + Trend List + Details */}
                <div className="grid grid-cols-3 gap-6">
                    {/* LEFT: Circular Radar */}
                    <GlassPanel>
                        <h2 className="text-xl font-bold text-white mb-4">Sonar Radar</h2>
                        <div className="relative w-full aspect-square">
                            {/* Concentric Rings */}
                            <svg viewBox="0 0 200 200" className="w-full h-full">
                                {/* Outer Ring - Weak Signals */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="95"
                                    fill="none"
                                    stroke="rgba(251, 146, 60, 0.2)"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="95"
                                    fill="rgba(251, 146, 60, 0.05)"
                                />

                                {/* Middle Ring - Emerging */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="65"
                                    fill="none"
                                    stroke="rgba(168, 85, 247, 0.3)"
                                    strokeWidth="1"
                                    strokeDasharray="4 2"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="65"
                                    fill="rgba(168, 85, 247, 0.08)"
                                />

                                {/* Inner Ring - Mainstream */}
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="35"
                                    fill="none"
                                    stroke="rgba(34, 211, 238, 0.4)"
                                    strokeWidth="1"
                                />
                                <circle
                                    cx="100"
                                    cy="100"
                                    r="35"
                                    fill="rgba(34, 211, 238, 0.1)"
                                />

                                {/* Center Point */}
                                <circle cx="100" cy="100" r="3" fill="rgba(34, 211, 238, 1)" />

                                {/* Crosshairs */}
                                <line x1="5" y1="100" x2="195" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                                <line x1="100" y1="5" x2="100" y2="195" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

                                {/* Trend Bubbles */}
                                {filteredTrends.map((trend) => {
                                    const angleRad = (trend.position.angle * Math.PI) / 180;
                                    const x = 100 + trend.position.radius * Math.cos(angleRad);
                                    const y = 100 + trend.position.radius * Math.sin(angleRad);

                                    const ringColor = trend.ring === 'mainstream' ? '#22d3ee' :
                                        trend.ring === 'emerging' ? '#a855f7' : '#fb923c';

                                    return (
                                        <g
                                            key={trend.id}
                                            className="cursor-pointer transition-all hover:scale-110"
                                            onClick={() => setSelectedTrend(trend.id)}
                                        >
                                            <circle
                                                cx={x}
                                                cy={y}
                                                r={selectedTrend === trend.id ? "8" : "6"}
                                                fill={ringColor}
                                                opacity={selectedTrend === trend.id ? "1" : "0.7"}
                                            />
                                            {selectedTrend === trend.id && (
                                                <circle
                                                    cx={x}
                                                    cy={y}
                                                    r="12"
                                                    fill="none"
                                                    stroke={ringColor}
                                                    strokeWidth="2"
                                                    opacity="0.5"
                                                >
                                                    <animate
                                                        attributeName="r"
                                                        from="12"
                                                        to="20"
                                                        dur="1.5s"
                                                        repeatCount="indefinite"
                                                    />
                                                    <animate
                                                        attributeName="opacity"
                                                        from="0.5"
                                                        to="0"
                                                        dur="1.5s"
                                                        repeatCount="indefinite"
                                                    />
                                                </circle>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* Legend */}
                            <div className="absolute bottom-2 left-2 space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                    <span className="text-zinc-400">Mainstream</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                                    <span className="text-zinc-400">Emerging</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                                    <span className="text-zinc-400">Weak Signal</span>
                                </div>
                            </div>
                        </div>
                    </GlassPanel>

                    {/* MIDDLE: Trend Selection List */}
                    <GlassPanel>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Select Trend</h2>
                            <Badge color="gray" size="sm">{filteredTrends.length} trends</Badge>
                        </div>

                        <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {filteredTrends.map((trend) => (
                                <div
                                    key={trend.id}
                                    onClick={() => setSelectedTrend(trend.id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedTrend === trend.id
                                            ? 'bg-cyan-500/20 border-cyan-500 scale-[1.02]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">{trend.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h3 className="text-sm font-semibold text-white truncate">{trend.title}</h3>
                                                <Badge
                                                    color={ringColors[trend.ring as keyof typeof ringColors] as any}
                                                    size="sm"
                                                >
                                                    {ringLabels[trend.ring as keyof typeof ringLabels]}
                                                </Badge>
                                            </div>

                                            <div className="flex items-center gap-2 text-xs mb-2">
                                                <TrendingUp className={`w-3 h-3 ${trend.momentum === 'high' ? 'text-green-400' :
                                                        trend.momentum === 'medium' ? 'text-yellow-400' :
                                                            'text-gray-400'
                                                    }`} />
                                                <span className="text-zinc-400">{trend.growth}</span>
                                                <span className="text-zinc-600">•</span>
                                                <span className="text-zinc-400">{trend.signals.tiktok}</span>
                                            </div>

                                            {trend.actionable && (
                                                <div className="flex items-center gap-1 text-xs text-green-400">
                                                    <Target className="w-3 h-3" />
                                                    <span>Actionable ({trend.priority})</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassPanel>

                    {/* RIGHT: Trend Details Panel */}
                    <GlassPanel>
                        <h2 className="text-xl font-bold text-white mb-4">
                            {selectedTrend
                                ? 'Trend Details'
                                : 'Select a Trend'}
                        </h2>

                        {selectedTrend ? (
                            <>
                                {(() => {
                                    const trend = trendRadar.find(t => t.id === selectedTrend)!;
                                    return (
                                        <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                                            {/* Header Info */}
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="text-3xl">{trend.icon}</span>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">{trend.title}</h3>
                                                    <p className="text-xs text-zinc-400">{trend.category}</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 flex-wrap">
                                                <Badge
                                                    color={ringColors[trend.ring as keyof typeof ringColors] as any}
                                                    size="sm"
                                                >
                                                    {ringLabels[trend.ring as keyof typeof ringLabels]}
                                                </Badge>
                                                <Badge
                                                    color={trend.momentum === 'high' ? 'green' : trend.momentum === 'medium' ? 'yellow' : 'gray'}
                                                    size="sm"
                                                >
                                                    {trend.growth} growth
                                                </Badge>
                                            </div>

                                            {/* Signals */}
                                            <div className="p-3 bg-white/5 rounded-lg">
                                                <h4 className="text-xs font-semibold text-white mb-2">Signal Strength</h4>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div className="p-2 bg-white/5 rounded text-center">
                                                        <div className="text-zinc-400 mb-1">TikTok</div>
                                                        <div className="text-cyan-400 font-bold">{trend.signals.tiktok}</div>
                                                    </div>
                                                    <div className="p-2 bg-white/5 rounded text-center">
                                                        <div className="text-zinc-400 mb-1">Reddit</div>
                                                        <div className="text-purple-400 font-bold">{trend.signals.reddit}</div>
                                                    </div>
                                                    <div className="p-2 bg-white/5 rounded text-center">
                                                        <div className="text-zinc-400 mb-1">Google</div>
                                                        <div className="text-orange-400 font-bold">{trend.signals.google}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Opportunity */}
                                            <div className={`p-3 rounded-lg border ${trend.actionable
                                                    ? 'bg-green-500/10 border-green-500/30'
                                                    : 'bg-gray-500/10 border-gray-500/30'
                                                }`}>
                                                <h4 className="text-xs font-semibold text-white mb-2">💡 Opportunity</h4>
                                                <p className="text-xs text-zinc-300">{trend.opportunity}</p>
                                            </div>

                                            {/* Demographics */}
                                            <div className="grid grid-cols-2 gap-2 text-xs">
                                                <div className="p-2 bg-white/5 rounded">
                                                    <div className="text-zinc-400 mb-1">Age Group</div>
                                                    <div className="text-white font-semibold">{trend.peakAge}</div>
                                                </div>
                                                <div className="p-2 bg-white/5 rounded">
                                                    <div className="text-zinc-400 mb-1">Priority</div>
                                                    <Badge
                                                        color={trend.priority === 'P0' ? 'red' : trend.priority === 'P1' ? 'yellow' : 'gray'}
                                                        size="sm"
                                                    >
                                                        {trend.priority}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Geographic */}
                                            <div className="p-2 bg-white/5 rounded">
                                                <div className="text-xs text-zinc-400 mb-2">Geographic Hotspots</div>
                                                <div className="flex gap-1 flex-wrap">
                                                    {trend.geographic.map((geo, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                                                            {geo}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Relevance Score */}
                                            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-semibold text-white">Relevance to OneBlade</span>
                                                    <span className="text-xl font-bold text-cyan-400">{trend.relevance}/10</span>
                                                </div>
                                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-cyan-500 transition-all"
                                                        style={{ width: `${(trend.relevance / 10) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <Radio className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                                <p className="text-sm text-zinc-400">Select a trend from the list</p>
                                <p className="text-xs text-zinc-500 mt-1">or click a bubble on the radar</p>
                            </div>
                        )}
                    </GlassPanel>
                </div>
            </div>
        </div>
    );
}
