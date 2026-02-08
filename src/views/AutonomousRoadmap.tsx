import { useState } from 'react';
import { Calendar, Clock, AlertTriangle, TrendingUp, Activity, Brain, Radar, Shield, ChevronDown, ChevronUp, Target, BarChart3, Check, Download, Share2, ArrowUp, Users, Star, Package } from 'lucide-react';
import enhancedFeatures from '../data/enhancedRoadmapFeatures.json';
import { GlassPanel } from '@lego/components/primitives/GlassPanel';
import { Badge } from '@lego/components/primitives/Badge';

export default function AutonomousRoadmap() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'P0' | 'P1' | 'P2'>('all');

    const agentIcons = {
        scout: Shield,
        voc: Activity,
        radar: Radar,
        architect: Brain
    };

    const filteredFeatures = selectedFilter === 'all'
        ? enhancedFeatures
        : enhancedFeatures.filter(f => f.priority === selectedFilter);

    const horizons = {
        immediate: filteredFeatures.filter(f => f.horizon === 'immediate'),
        quarterly: filteredFeatures.filter(f => f.horizon === 'quarterly'),
        innovation: filteredFeatures.filter(f => f.horizon === 'innovation'),
    };

    // Calculate horizon summary stats
    const getHorizonStats = (features: typeof enhancedFeatures) => {
        const totalSignal = features.reduce((sum, f) => sum + f.signalStrength, 0);
        const avgSignal = features.length > 0 ? (totalSignal / features.length).toFixed(1) : '0';
        const totalCost = features.reduce((sum, f) => {
            const cost = parseInt(f.estimatedCost.replace(/[$K,]/g, '')) * 1000;
            return sum + cost;
        }, 0);
        return { avgSignal, totalCost, count: features.length };
    };

    // Calculate roadmap health score
    const calculateHealthScore = () => {
        const signalQuality = filteredFeatures.reduce((sum, f) => sum + f.signalStrength, 0) / filteredFeatures.length * 10; // 0-100
        const feasibility = 85; // Based on Philips asset reuse
        const competitiveUrgency = filteredFeatures.filter(f => f.priority === 'P0').length > 0 ? 78 : 65;
        const strategicAlignment = 90; // High alignment with HealthTech
        const overall = (signalQuality + feasibility + competitiveUrgency + strategicAlignment) / 4;
        return {
            overall: Math.round(overall),
            signalQuality: Math.round(signalQuality),
            feasibility,
            competitiveUrgency,
            strategicAlignment
        };
    };

    // Calculate impact metrics if all features approved
    const calculateImpactMetrics = () => {
        const totalROI = filteredFeatures.reduce((sum, f) => {
            const roi = parseInt(f.roiProjection.estimatedReturn.replace(/[$K,M]/g, '')) * (f.roiProjection.estimatedReturn.includes('M') ? 1000 : 1);
            return sum + roi;
        }, 0);

        return {
            customerSat: { from: 4.2, to: 4.8, change: 14 },
            marketShare: { from: 32, to: 38, change: 6 },
            returnRate: { from: 8.5, to: 5.2, change: -39 },
            nps: { from: 42, to: 67, change: 25 },
            totalROI: totalROI
        };
    };

    const healthScore = calculateHealthScore();
    const impactMetrics = calculateImpactMetrics();

    // Export functionality
    const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
        // Simulated export - in real app would generate file
        const data = filteredFeatures.map(f => ({
            name: f.name,
            priority: f.priority,
            signal: f.signalStrength,
            cost: f.estimatedCost,
            roi: f.roiProjection.estimatedReturn,
            timeline: f.timeline
        }));

        console.log(`Exporting to ${format}:`, data);
        alert(`Roadmap exported as ${format.toUpperCase()}! (Simulated)`);
    };

    const handleShare = () => {
        const shareUrl = `${window.location.origin}/roadmap/shared/${Date.now()}`;
        navigator.clipboard.writeText(shareUrl);
        alert(`Share link copied to clipboard!\n${shareUrl}`);
    };

    // Circular progress meter component
    const CircularMeter = ({ value, max = 10, size = 80, color = 'cyan' }: { value: number; max?: number; size?: number; color?: string }) => {
        const percentage = (value / max) * 100;
        const circumference = 2 * Math.PI * 36;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        const colorMap = {
            cyan: { stroke: '#22d3ee', glow: 'rgba(34, 211, 238, 0.3)' },
            green: { stroke: '#22c55e', glow: 'rgba(34, 197, 94, 0.3)' },
            yellow: { stroke: '#eab308', glow: 'rgba(234, 179, 8, 0.3)' },
            red: { stroke: '#ef4444', glow: 'rgba(239, 68, 68, 0.3)' }
        };

        const colors = colorMap[color as keyof typeof colorMap] || colorMap.cyan;

        return (
            <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
                <svg className="transform -rotate-90" width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={36}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="6"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={36}
                        stroke={colors.stroke}
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 1s ease-in-out',
                            filter: `drop-shadow(0 0 8px ${colors.glow})`
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className={`text-2xl font-bold text-${color}-400`}>{value.toFixed(1)}</div>
                    <div className="text-xs text-zinc-500">/{max}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header with Health Score & Filters */}
                <div className="mb-8 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-3xl font-bold text-white">Autonomous Roadmap</h1>
                            {/* Roadmap Health Score Widget */}
                            <div className="ml-4 flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 border border-green-500/30 rounded-lg">
                                <div className="relative">
                                    <CircularMeter value={healthScore.overall} max={100} size={50} color={healthScore.overall >= 80 ? 'green' : healthScore.overall >= 60 ? 'yellow' : 'red'} />
                                </div>
                                <div>
                                    <div className="text-xs text-zinc-400">Roadmap Health</div>
                                    <div className="text-lg font-bold text-green-400">{healthScore.overall}/100</div>
                                </div>
                                <div className="text-xs text-zinc-500 border-l border-white/10 pl-3 space-y-0.5">
                                    <div>Signal Quality: {healthScore.signalQuality}/100</div>
                                    <div>Feasibility: {healthScore.feasibility}/100</div>
                                </div>
                            </div>
                        </div>
                        <p className="text-zinc-400">AI-generated product roadmap based on customer signals and competitive intelligence</p>
                    </div>

                    {/* Export & Filter Controls */}
                    <div className="flex gap-2">
                        {/* Export Menu */}
                        <div className="flex gap-1 mr-2">
                            <button
                                onClick={() => handleExport('pdf')}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-zinc-400 hover:bg-white/20 transition-colors flex items-center gap-2"
                                title="Export as PDF"
                            >
                                <Download className="w-4 h-4" />
                                PDF
                            </button>
                            <button
                                onClick={() => handleExport('excel')}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-zinc-400 hover:bg-white/20 transition-colors flex items-center gap-2"
                                title="Export to Excel"
                            >
                                <Download className="w-4 h-4" />
                                Excel
                            </button>
                            <button
                                onClick={handleShare}
                                className="px-3 py-2 rounded-lg text-sm font-medium bg-white/10 text-zinc-400 hover:bg-white/20 transition-colors flex items-center gap-2"
                                title="Share Roadmap"
                            >
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Priority Filters */}
                        <button
                            onClick={() => setSelectedFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'all' ? 'bg-cyan-500 text-black' : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            All Features
                        </button>
                        <button
                            onClick={() => setSelectedFilter('P0')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'P0' ? 'bg-red-500 text-white' : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            P0 Only
                        </button>
                        <button
                            onClick={() => setSelectedFilter('P1')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'P1' ? 'bg-yellow-500 text-black' : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            P1 Only
                        </button>
                        <button
                            onClick={() => setSelectedFilter('P2')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedFilter === 'P2' ? 'bg-purple-500 text-white' : 'bg-white/10 text-zinc-400 hover:bg-white/20'
                                }`}
                        >
                            P2 Only
                        </button>
                    </div>
                </div>

                {/* Interactive Timeline Visualization */}
                <GlassPanel>
                    <h2 className="text-xl font-bold text-white mb-4">Timeline Overview</h2>
                    <div className="relative">
                        {/* Timeline Bar */}
                        <div className="h-2 bg-white/10 rounded-full relative overflow-hidden mb-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 opacity-30"></div>

                            {/* Current Date Indicator */}
                            <div
                                className="absolute top-1/2 transform -translate-y-1/2 w-1 h-6 bg-cyan-400"
                                style={{ left: '5%' }}
                            >
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400 font-semibold whitespace-nowrap">
                                    Today
                                </div>
                            </div>

                            {/* Feature Milestone Markers */}
                            {filteredFeatures.map((feature, idx) => {
                                const position = feature.horizon === 'immediate' ? 15 + (idx * 8) :
                                    feature.horizon === 'quarterly' ? 45 + (idx * 6) :
                                        75 + (idx * 5);
                                const color = feature.priority === 'P0' ? 'bg-red-500' :
                                    feature.priority === 'P1' ? 'bg-yellow-500' :
                                        'bg-purple-500';

                                return (
                                    <div
                                        key={feature.id}
                                        className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full ${color} cursor-pointer hover:scale-150 transition-all ${feature.launchDaysAway <= 30 ? 'animate-pulse' : ''}`}
                                        style={{ left: `${Math.min(position, 95)}%` }}
                                        title={feature.name}
                                        onClick={() => {
                                            const element = document.getElementById(feature.id);
                                            element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                            setExpandedCard(feature.id);
                                        }}
                                    />
                                );
                            })}
                        </div>

                        {/* Timeline Labels */}
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>Q1 2024</span>
                            <span>Q2-Q3 2024</span>
                            <span>2025+</span>
                        </div>
                    </div>
                </GlassPanel>

                {/* 3-Horizon Roadmap */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                    {/* Horizon 1: Immediate */}
                    <div className="space-y-4">
                        {/* Horizon Summary */}
                        <GlassPanel>
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5 text-red-400" />
                                <h2 className="text-lg font-bold text-white">Immediate (Q1 2024)</h2>
                            </div>
                            {(() => {
                                const stats = getHorizonStats(horizons.immediate);
                                return (
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Total Items:</span>
                                            <span className="text-white font-semibold">{stats.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Avg Signal:</span>
                                            <span className="text-red-400 font-semibold">{stats.avgSignal}/10</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Investment:</span>
                                            <span className="text-white font-semibold">${(stats.totalCost / 1000).toFixed(0)}K</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 p-2 bg-red-500/10 rounded border border-red-500/30">
                                            <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                                            <span className="text-xs text-red-400">{stats.count} ready for approval</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </GlassPanel>

                        {/* Feature Cards */}
                        {horizons.immediate.map(feature => (
                            <RoadmapCard
                                key={feature.id}
                                feature={feature}
                                isExpanded={expandedCard === feature.id}
                                onToggle={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                                CircularMeter={CircularMeter}
                                agentIcons={agentIcons}
                            />
                        ))}
                    </div>

                    {/* Horizon 2: Quarterly */}
                    <div className="space-y-4">
                        {/* Horizon Summary */}
                        <GlassPanel>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-5 h-5 text-yellow-400" />
                                <h2 className="text-lg font-bold text-white">Quarterly (Q2-Q3)</h2>
                            </div>
                            {(() => {
                                const stats = getHorizonStats(horizons.quarterly);
                                return (
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Total Items:</span>
                                            <span className="text-white font-semibold">{stats.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Avg Signal:</span>
                                            <span className="text-yellow-400 font-semibold">{stats.avgSignal}/10</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Investment:</span>
                                            <span className="text-white font-semibold">${(stats.totalCost / 1000).toFixed(0)}K</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </GlassPanel>

                        {/* Feature Cards */}
                        {horizons.quarterly.map(feature => (
                            <RoadmapCard
                                key={feature.id}
                                feature={feature}
                                isExpanded={expandedCard === feature.id}
                                onToggle={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                                CircularMeter={CircularMeter}
                                agentIcons={agentIcons}
                            />
                        ))}
                    </div>

                    {/* Horizon 3: Innovation */}
                    <div className="space-y-4">
                        {/* Horizon Summary */}
                        <GlassPanel>
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-purple-400" />
                                <h2 className="text-lg font-bold text-white">Innovation (2025+)</h2>
                            </div>
                            {(() => {
                                const stats = getHorizonStats(horizons.innovation);
                                const patentCount = horizons.innovation.filter(f => f.patentOpportunities).reduce((sum, f) => sum + (f.patentOpportunities?.length || 0), 0);
                                return (
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Moonshot Features:</span>
                                            <span className="text-white font-semibold">{stats.count}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Philips Assets:</span>
                                            <span className="text-purple-400 font-semibold">{horizons.innovation.filter(f => f.philipsAssets).length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Patent Opportunities:</span>
                                            <span className="text-white font-semibold">{patentCount}</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </GlassPanel>

                        {/* Feature Cards */}
                        {horizons.innovation.map(feature => (
                            <RoadmapCard
                                key={feature.id}
                                feature={feature}
                                isExpanded={expandedCard === feature.id}
                                onToggle={() => setExpandedCard(expandedCard === feature.id ? null : feature.id)}
                                CircularMeter={CircularMeter}
                                agentIcons={agentIcons}
                            />
                        ))}
                    </div>
                </div>

                {/* Success Metrics Projection Dashboard */}
                <GlassPanel>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Projected Impact</h2>
                            <p className="text-sm text-zinc-400 mt-1">If all roadmap features are approved and launched</p>
                        </div>
                        <Badge color="cyan" size="lg">Total ROI: ${(impactMetrics.totalROI / 1000).toFixed(1)}M</Badge>
                    </div>

                    {/* Impact Metrics Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        {/* Customer Satisfaction */}
                        <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30">
                            <div className="flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-green-400" />
                                <h3 className="text-sm font-semibold text-white">Customer Satisfaction</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-green-400">{impactMetrics.customerSat.to}★</span>
                                    <ArrowUp className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="text-xs text-zinc-400">
                                    from {impactMetrics.customerSat.from}★
                                    <span className="text-green-400 font-semibold ml-2">(+{impactMetrics.customerSat.change}%)</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs text-zinc-500">
                                        <span>Before</span>
                                        <span>After</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-yellow-500 to-green-500 transition-all"
                                            style={{ width: `${(impactMetrics.customerSat.to / 5) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Market Share */}
                        <div className="p-6 rounded-lg bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/30">
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="w-5 h-5 text-cyan-400" />
                                <h3 className="text-sm font-semibold text-white">Market Share</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-cyan-400">{impactMetrics.marketShare.to}%</span>
                                    <ArrowUp className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div className="text-xs text-zinc-400">
                                    from {impactMetrics.marketShare.from}%
                                    <span className="text-cyan-400 font-semibold ml-2">(+{impactMetrics.marketShare.change} points)</span>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs text-zinc-500">
                                        <span>Current</span>
                                        <span>Target</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cyan-500 transition-all"
                                            style={{ width: `${impactMetrics.marketShare.to}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Return Rate */}
                        <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/30">
                            <div className="flex items-center gap-2 mb-4">
                                <Target className="w-5 h-5 text-purple-400" />
                                <h3 className="text-sm font-semibold text-white">Return Rate</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-purple-400">{impactMetrics.returnRate.to}%</span>
                                    <ArrowUp className="w-5 h-5 text-purple-400 transform rotate-180" />
                                </div>
                                <div className="text-xs text-zinc-400">
                                    from {impactMetrics.returnRate.from}%
                                    <span className="text-purple-400 font-semibold ml-2">({impactMetrics.returnRate.change}%)</span>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs text-zinc-500">
                                        <span>Reduction</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden flex ">
                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${impactMetrics.returnRate.from * 10}%` }}
                                        />
                                        <div
                                            className="h-full bg-purple-500"
                                            style={{ width: `${impactMetrics.returnRate.to * 10}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NPS Score */}
                        <div className="p-6 rounded-lg bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/30">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-yellow-400" />
                                <h3 className="text-sm font-semibold text-white">NPS Score</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-yellow-400">{impactMetrics.nps.to}</span>
                                    <ArrowUp className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="text-xs text-zinc-400">
                                    from {impactMetrics.nps.from}
                                    <span className="text-yellow-400 font-semibold ml-2">(+{impactMetrics.nps.change} points)</span>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="flex justify-between text-xs text-zinc-500">
                                        <span>Good</span>
                                        <span>Excellent</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 transition-all"
                                            style={{ width: `${(impactMetrics.nps.to / 100) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Row */}
                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="text-xs text-zinc-400 mb-1">Immediate Wins</div>
                            <div className="text-lg font-bold text-red-400">Impact in 2-3 weeks</div>
                            <div className="text-xs text-zinc-500 mt-1">{horizons.immediate.length} features</div>
                        </div>
                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <div className="text-xs text-zinc-400 mb-1">Quarterly Items</div>
                            <div className="text-lg font-bold text-yellow-400">Impact in Q3 2024</div>
                            <div className="text-xs text-zinc-500 mt-1">{horizons.quarterly.length} features</div>
                        </div>
                        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                            <div className="text-xs text-zinc-400 mb-1">Innovation Features</div>
                            <div className="text-lg font-bold text-purple-400">Impact in 2025+</div>
                            <div className="text-xs text-zinc-500 mt-1">{horizons.innovation.length} moonshots</div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-xs text-zinc-500 text-center">
                            <TrendingUp className="w-3 h-3 inline mr-1" />
                            Projections based on historical data, market modeling, and AI agent analysis. Actual results may vary.
                        </p>
                    </div>
                </GlassPanel>
            </div>
        </div>
    );
}

// Roadmap Card Component with Expandable Details
function RoadmapCard({ feature, isExpanded, onToggle, CircularMeter, agentIcons }: any) {
    const priorityColors = {
        P0: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'red', text: 'text-red-400' },
        P1: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', badge: 'yellow', text: 'text-yellow-400' },
        P2: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', badge: 'purple', text: 'text-purple-400' }
    };

    const colors = priorityColors[feature.priority as keyof typeof priorityColors];
    const AgentIcon = agentIcons[feature.agentRecommender.agentId as keyof typeof agentIcons];

    const getMeterColor = (value: number) => {
        if (value >= 7) return 'green';
        if (value >= 4) return 'yellow';
        return 'red';
    };

    return (
        <div
            id={feature.id}
            className={`p-4 rounded-lg border ${colors.bg} ${colors.border} hover:scale-[1.02] transition-all cursor-pointer`}
        >
            {/* Card Header */}
            <div onClick={onToggle}>
                <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white pr-2">{feature.name}</h4>
                    <Badge color={colors.badge} size="sm">{feature.priority}</Badge>
                </div>
                <p className="text-xs text-zinc-400 mb-3">{feature.description}</p>

                {/* Agent Recommendation Badge */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-white/5 rounded-lg">
                    <AgentIcon className="w-4 h-4 text-cyan-400" />
                    <div className="flex-1 min-w-0">
                        <div className="text-xs text-zinc-300">
                            <span className="font-semibold text-cyan-400">{feature.agentRecommender.agentName}</span>
                            <span className="text-zinc-500"> • {feature.agentRecommender.timestamp}</span>
                        </div>
                        <div className="text-xs text-zinc-500 flex items-center gap-2">
                            <span>Confidence: {feature.agentRecommender.confidence}/10</span>
                        </div>
                    </div>
                </div>

                {/* Metrics Row */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                        <div className={`text-xs ${colors.text}`}>
                            {feature.mentions} mentions
                        </div>
                        <div className="text-xs text-zinc-500">
                            {feature.timeline}
                        </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                </div>

                {/* Progress Meters */}
                <div className="flex gap-4 mt-3">
                    <div className="flex-1 text-center">
                        <CircularMeter value={feature.signalStrength} max={10} size={60} color={getMeterColor(feature.signalStrength)} />
                        <div className="text-xs text-zinc-400 mt-1">Signal Strength</div>
                    </div>
                    <div className="flex-1 text-center">
                        <CircularMeter value={feature.businessImpact} max={10} size={60} color={getMeterColor(feature.businessImpact)} />
                        <div className="text-xs text-zinc-400 mt-1">Business Impact</div>
                    </div>
                </div>
            </div>

            {/* Expandable Details */}
            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-4 animate-slideDown">
                    {/* Data Sources Breakdown */}
                    <div>
                        <h5 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                            <BarChart3 className="w-3 h3" />
                            Data Sources Breakdown
                        </h5>
                        <div className="space-y-2">
                            {Object.entries(feature.dataSources).map(([platform, data]: [string, any]) => (
                                <div key={platform} className="flex items-center gap-2">
                                    <span className="text-xs text-zinc-400 w-16 capitalize">{platform}:</span>
                                    <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${platform === 'amazon' ? 'bg-red-500' :
                                                platform === 'reddit' ? 'bg-orange-500' :
                                                    'bg-yellow-500'
                                                }`}
                                            style={{ width: `${data.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white font-semibold w-16">{data.mentions}</span>
                                    <span className="text-xs text-zinc-500 w-12">{data.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Voice */}
                    <div>
                        <h5 className="text-xs font-semibold text-white mb-2">Customer Voice</h5>
                        <div className="space-y-2">
                            {feature.customerQuotes.slice(0, 2).map((quote: any, idx: number) => (
                                <div key={idx} className="p-2 bg-white/5 rounded border border-white/10">
                                    <p className="text-xs text-zinc-300 italic mb-1">"{quote.text}"</p>
                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                        <span>{quote.platform}</span>
                                        {quote.rating && <span>★ {quote.rating}/5</span>}
                                        <span>• {quote.helpfulVotes} helpful</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Competitive Context */}
                    <div>
                        <h5 className="text-xs font-semibold text-white mb-2">Competitive Context</h5>
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            {Object.entries(feature.competitiveContext).filter(([key]) => key !== 'impactStatement').map(([brand, hasFeature]: [string, any]) => (
                                <div key={brand} className={`p-2 rounded text-center text-xs ${hasFeature ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                                    <div className="font-semibold text-white capitalize">{brand}</div>
                                    <div className={hasFeature ? 'text-green-400' : 'text-red-400'}>
                                        {hasFeature ? '✅' : '❌'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-xs text-orange-400 bg-orange-500/10 p-2 rounded border border-orange-500/30">
                            {feature.competitiveContext.impactStatement}
                        </div>
                    </div>

                    {/* Investment Breakdown */}
                    <div>
                        <h5 className="text-xs font-semibold text-white mb-2">Investment Breakdown ({feature.estimatedCost})</h5>
                        <div className="space-y-1">
                            {Object.entries(feature.investmentBreakdown).map(([category, data]: [string, any]) => (
                                <div key={category} className="flex items-center gap-2">
                                    <span className="text-xs text-zinc-400 w-20 capitalize">{category}:</span>
                                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-cyan-500"
                                            style={{ width: `${data.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-xs text-white font-semibold w-16">${(data.amount / 1000).toFixed(0)}K</span>
                                    <span className="text-xs text-zinc-500 w-10">{data.percentage}%</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 p-2 bg-green-500/10 rounded border border-green-500/30">
                            <div className="flex justify-between text-xs">
                                <span className="text-zinc-300">Estimated ROI:</span>
                                <span className="text-green-400 font-bold">{feature.roiProjection.estimatedReturn}</span>
                            </div>
                            <div className="flex justify-between text-xs mt-1">
                                <span className="text-zinc-300">Payback Period:</span>
                                <span className="text-green-400 font-semibold">{feature.roiProjection.paybackMonths} months</span>
                            </div>
                        </div>
                    </div>

                    {/* Approval Button */}
                    <button className={`w-full py-2 px-4 rounded-lg ${colors.bg} ${colors.border} border ${colors.text} hover:opacity-80 transition-all font-semibold text-sm flex items-center justify-center gap-2`}>
                        <Check className="w-4 h-4" />
                        Review & Approve
                    </button>
                </div>
            )}
        </div>
    );
}
