import { useState } from 'react';
import {
    ArrowUp, ArrowDown, ExternalLink, TrendingUp,
    Clock, DollarSign, Target, AlertCircle,
    X, FileText, Users, Calendar
} from 'lucide-react';
import { GlassPanel } from '@lego/components/primitives/GlassPanel';
import { Badge } from '@lego/components/primitives/Badge';
import opportunities from '../data/opportunities.json';
import quarterlyRoadmap from '../data/quarterlyRoadmap.json';
import innovationPipeline from '../data/innovationPipeline.json';

type TabType = 'immediate' | 'quarterly' | 'innovation';

interface Opportunity {
    id: string;
    priority: string;
    opportunity: string;
    signalStrength: number;
    signalCount: number;
    estimatedImpact: string;
    effort: string;
    status: string;
    dataSources: Record<string, { mentions: number; sentiment: string; percentage: number }>;
    quotes: Array<{ text: string; source: string; rating: number | null; engagement: string }>;
    recommendedActions: Array<{ type: string; action: string; timeline: string; cost: string }>;
    competitiveContext: {
        competitor: string;
        hasFeature: boolean;
        sentiment: string;
        ourGap: string;
    };
    businessImpact: {
        returnReduction: string;
        npsImprovement: string;
        quickFixCost: string;
        fullRedesignCost: string | null;
    };
}

export default function ProductActionCenter() {
    const [activeTab, setActiveTab] = useState<TabType>('immediate');
    const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
    const [sortColumn, setSortColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('desc');
        }
    };

    const sortedOpportunities = [...opportunities].sort((a, b) => {
        if (!sortColumn) return 0;

        let aVal: any = a[sortColumn as keyof Opportunity];
        let bVal: any = b[sortColumn as keyof Opportunity];

        if (sortColumn === 'signalStrength') {
            aVal = a.signalStrength;
            bVal = b.signalStrength;
        } else if (sortColumn === 'priority') {
            const priorityOrder = { P0: 3, P1: 2, P2: 1 };
            aVal = priorityOrder[a.priority as keyof typeof priorityOrder];
            bVal = priorityOrder[b.priority as keyof typeof priorityOrder];
        }

        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        }
        return aVal < bVal ? 1 : -1;
    });

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'P0': return 'red';
            case 'P1': return 'yellow';
            case 'P2': return 'cyan';
            default: return 'gray';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ready': return 'green';
            case 'In Review': return 'yellow';
            case 'Backlog': return 'gray';
            default: return 'gray';
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Product Action Center</h1>
                    <p className="text-zinc-400">Core value delivery - actionable roadmap recommendations</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 border-b border-white/10">
                    <button
                        onClick={() => setActiveTab('immediate')}
                        className={`px-6 py-3 font-medium transition-all ${activeTab === 'immediate'
                            ? 'text-cyan-400 border-b-2 border-cyan-400'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Immediate Wins (0-30 Days)
                    </button>
                    <button
                        onClick={() => setActiveTab('quarterly')}
                        className={`px-6 py-3 font-medium transition-all ${activeTab === 'quarterly'
                            ? 'text-cyan-400 border-b-2 border-cyan-400'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Quarterly Roadmap (Q2-Q3 2026)
                    </button>
                    <button
                        onClick={() => setActiveTab('innovation')}
                        className={`px-6 py-3 font-medium transition-all ${activeTab === 'innovation'
                            ? 'text-cyan-400 border-b-2 border-cyan-400'
                            : 'text-zinc-400 hover:text-white'
                            }`}
                    >
                        Innovation Pipeline (AI & Edge)
                    </button>
                </div>

                {/* Tab 1: Immediate Wins */}
                {activeTab === 'immediate' && (
                    <GlassPanel className="overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th
                                            className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide cursor-pointer hover:text-cyan-400"
                                            onClick={() => handleSort('priority')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Priority
                                                {sortColumn === 'priority' && (
                                                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                            Opportunity
                                        </th>
                                        <th
                                            className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide cursor-pointer hover:text-cyan-400"
                                            onClick={() => handleSort('signalStrength')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Signal Strength
                                                {sortColumn === 'signalStrength' && (
                                                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                                                )}
                                            </div>
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                            Est. Impact
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                            Effort
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedOpportunities.map((opp) => (
                                        <tr
                                            key={opp.id}
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                                            onClick={() => setSelectedOpportunity(opp)}
                                        >
                                            <td className="px-4 py-4">
                                                <Badge color={getPriorityColor(opp.priority)} size="sm">
                                                    {opp.priority}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm font-medium text-white">{opp.opportunity}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${opp.signalStrength >= 8 ? 'bg-red-500' :
                                                        opp.signalStrength >= 7 ? 'bg-yellow-500' :
                                                            'bg-green-500'
                                                        }`} />
                                                    <span className="text-sm font-semibold text-white">{opp.signalStrength}/10</span>
                                                    <span className="text-xs text-zinc-500">({opp.signalCount} complaints)</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-emerald-400 font-medium">{opp.estimatedImpact}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-zinc-300">{opp.effort}</div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <Badge color={getStatusColor(opp.status)} size="sm">
                                                    {opp.status}
                                                </Badge>
                                            </td>
                                            <td className="px-4 py-4">
                                                <button
                                                    className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedOpportunity(opp);
                                                    }}
                                                >
                                                    View Details
                                                    <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </GlassPanel>
                )}

                {/* Tab 2: Quarterly Roadmap */}
                {activeTab === 'quarterly' && (
                    <div className="space-y-6">
                        {/* Q2 2026 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold text-white">Q2 2026</h2>
                                <Badge color="cyan" size="sm">April - June</Badge>
                            </div>
                            <div className="space-y-3">
                                {quarterlyRoadmap.filter(item => item.quarter === 'Q2').map((item) => (
                                    <GlassPanel key={item.id} className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                                <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-zinc-300">Validation: {item.validationScore}/10</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-zinc-300">{item.validationSignals} signals</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-zinc-300">{item.timeline.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge
                                                color={
                                                    item.status === 'In Development' ? 'cyan' :
                                                        item.status === 'Planning' ? 'yellow' :
                                                            'gray'
                                                }
                                            >
                                                {item.status}
                                            </Badge>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                                                <span>Progress</span>
                                                <span>{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Expandable Details */}
                                        <details className="group">
                                            <summary className="cursor-pointer text-sm text-cyan-400 hover:text-cyan-300 transition-colors list-none flex items-center gap-2">
                                                <span className="group-open:rotate-90 transition-transform">▶</span>
                                                View Full Market Validation
                                            </summary>
                                            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Market Demand</div>
                                                    <div className="text-sm text-white">{item.details.marketDemand}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Competitive Gap</div>
                                                    <div className="text-sm text-white">{item.details.competitiveGap}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Investment</div>
                                                    <div className="text-sm text-emerald-400 font-medium">{item.details.investment}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Expected ROI</div>
                                                    <div className="text-sm text-emerald-400 font-medium">{item.details.roi}</div>
                                                </div>
                                                {item.details.risks && (
                                                    <div className="col-span-2">
                                                        <div className="text-xs text-zinc-400 mb-1">Key Risks</div>
                                                        <div className="text-sm text-orange-400">{item.details.risks}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </details>
                                    </GlassPanel>
                                ))}
                            </div>
                        </div>

                        {/* Q3 2026 */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-2xl font-bold text-white">Q3 2026</h2>
                                <Badge color="purple" size="sm">July - September</Badge>
                            </div>
                            <div className="space-y-3">
                                {quarterlyRoadmap.filter(item => item.quarter === 'Q3').map((item) => (
                                    <GlassPanel key={item.id} className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                                <p className="text-sm text-zinc-400 mb-3">{item.description}</p>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <TrendingUp className="w-4 h-4 text-cyan-400" />
                                                        <span className="text-zinc-300">Validation: {item.validationScore}/10</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-emerald-400" />
                                                        <span className="text-zinc-300">{item.validationSignals} signals</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-yellow-400" />
                                                        <span className="text-zinc-300">{item.timeline.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge color="gray">{item.status}</Badge>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                                                <span>Progress</span>
                                                <span>{item.progress}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                                                    style={{ width: `${item.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Expandable Details */}
                                        <details className="group">
                                            <summary className="cursor-pointer text-sm text-cyan-400 hover:text-cyan-300 transition-colors list-none flex items-center gap-2">
                                                <span className="group-open:rotate-90 transition-transform">▶</span>
                                                View Full Market Validation
                                            </summary>
                                            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Market Demand</div>
                                                    <div className="text-sm text-white">{item.details.marketDemand}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Competitive Gap</div>
                                                    <div className="text-sm text-white">{item.details.competitiveGap}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Investment</div>
                                                    <div className="text-sm text-emerald-400 font-medium">{item.details.investment}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-zinc-400 mb-1">Expected ROI</div>
                                                    <div className="text-sm text-emerald-400 font-medium">{item.details.roi}</div>
                                                </div>
                                                {item.details.risks && (
                                                    <div className="col-span-2">
                                                        <div className="text-xs text-zinc-400 mb-1">Key Risks</div>
                                                        <div className="text-sm text-orange-400">{item.details.risks}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </details>
                                    </GlassPanel>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: Innovation Pipeline */}
                {activeTab === 'innovation' && (
                    <div className="space-y-8">
                        {[1, 2, 3, 4].map((tier) => {
                            const tierFeatures = innovationPipeline.filter(f => f.tier === tier);
                            if (tierFeatures.length === 0) return null;

                            const tierInfo = tierFeatures[0];
                            const tierColors = {
                                1: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
                                2: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
                                3: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
                                4: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' }
                            };
                            const colors = tierColors[tier as keyof typeof tierColors];

                            return (
                                <div key={tier}>
                                    {/* Tier Header */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <h2 className="text-2xl font-bold text-white">TIER {tier}: {tierInfo.tierName}</h2>
                                        <Badge color={tier === 1 ? 'cyan' : tier === 2 ? 'purple' : tier === 3 ? 'orange' : 'pink'}>
                                            {tierInfo.readiness}
                                        </Badge>
                                    </div>

                                    {/* Feature Cards Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {tierFeatures.map((feature) => (
                                            <GlassPanel key={feature.id} className={`p-6 border ${colors.border}`}>
                                                {/* Card Header */}
                                                <div className="mb-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h3 className={`text-lg font-semibold ${colors.text}`}>
                                                            {tier === 1 && '🧠 '}
                                                            {tier === 2 && '📱 '}
                                                            {tier === 3 && '🚀 '}
                                                            {tier === 4 && '🌟 '}
                                                            {feature.title}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-zinc-300 mb-4">{feature.capability}</p>

                                                    {/* Features List (for Tier 2) */}
                                                    {feature.features && (
                                                        <ul className="text-xs text-zinc-400 space-y-1 mb-4 ml-4 list-disc">
                                                            {feature.features.map((f: string, idx: number) => (
                                                                <li key={idx}>{f}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                                {/* Philips Assets */}
                                                <div className={`mb-4 p-3 rounded-lg ${colors.bg}`}>
                                                    <div className="text-xs font-semibold text-white mb-2">Philips Assets to Leverage:</div>
                                                    <div className="space-y-1">
                                                        {feature.philipsAssets.map((asset: string, idx: number) => (
                                                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                                                                <span className="text-green-400">✓</span>
                                                                {asset}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Metrics Grid */}
                                                <div className="grid grid-cols-2 gap-3 mb-4">
                                                    {/* Market Validation */}
                                                    <div>
                                                        <div className="text-xs text-zinc-400 mb-1">Market Validation</div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-lg font-bold ${colors.text}`}>{feature.marketValidation.score}/10</span>
                                                            <div className="flex-1">
                                                                <div className="text-xs text-zinc-500">{feature.marketValidation.signalCount} signals</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Technical Feasibility */}
                                                    <div>
                                                        <div className="text-xs text-zinc-400 mb-1">Technical Feasibility</div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg font-bold text-emerald-400">{feature.technicalFeasibility}/10</span>
                                                        </div>
                                                    </div>

                                                    {/* Development Time */}
                                                    <div>
                                                        <div className="text-xs text-zinc-400 mb-1">Development Time</div>
                                                        <div className="flex items-center gap-1 text-sm text-white">
                                                            <Clock className="w-3 h-3 text-yellow-400" />
                                                            {feature.developmentTime}
                                                        </div>
                                                    </div>

                                                    {/* Investment */}
                                                    <div>
                                                        <div className="text-xs text-zinc-400 mb-1">Investment</div>
                                                        <div className="flex items-center gap-1 text-sm font-semibold text-emerald-400">
                                                            <DollarSign className="w-3 h-3" />
                                                            {feature.investment}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Market Insight */}
                                                <div className="mb-4 p-3 bg-white/5 rounded border border-white/10">
                                                    <div className="text-xs text-zinc-400 mb-1">Key Insight</div>
                                                    <div className="text-sm text-white">{feature.marketValidation.keyInsight}</div>
                                                </div>

                                                {/* Competitive Gap */}
                                                <div className="mb-4">
                                                    <div className="text-xs text-zinc-400 mb-1">Competitive Gap</div>
                                                    <div className="text-sm text-orange-300">{feature.competitiveGap}</div>
                                                </div>

                                                {/* Edge/Cloud Split */}
                                                <div className="mb-4 p-3 bg-zinc-800/50 rounded border border-white/10">
                                                    <div className="text-xs font-semibold text-white mb-2">Edge/Cloud Architecture</div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-12 text-xs text-cyan-400 font-medium">Edge:</div>
                                                            <div className="flex-1 text-xs text-zinc-300">{feature.edgeCloudSplit.edge}</div>
                                                        </div>
                                                        <div className="flex items-start gap-2">
                                                            <div className="w-12 text-xs text-purple-400 font-medium">Cloud:</div>
                                                            <div className="flex-1 text-xs text-zinc-300">{feature.edgeCloudSplit.cloud}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors border border-white/20">
                                                        <FileText className="w-3 h-3" />
                                                        View Technical Spec
                                                    </button>
                                                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded transition-colors border border-white/20">
                                                        <TrendingUp className="w-3 h-3" />
                                                        Business Case
                                                    </button>
                                                </div>
                                            </GlassPanel>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Detail Modal */}
                {selectedOpportunity && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
                        <div className="bg-zinc-900 rounded-xl border border-white/10 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-white">{selectedOpportunity.opportunity}</h2>
                                        <Badge color={getPriorityColor(selectedOpportunity.priority)}>
                                            {selectedOpportunity.priority} - Critical
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-zinc-400">Signal Strength:</span>
                                        <span className="text-lg font-bold text-cyan-400">{selectedOpportunity.signalStrength}/10</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedOpportunity(null)}
                                    className="text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                {/* Data Sources */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        📊 DATA SOURCES
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(selectedOpportunity.dataSources).map(([platform, data]) => (
                                            <div key={platform} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-white capitalize">{platform}</span>
                                                    <Badge
                                                        color={data.sentiment === 'positive' ? 'green' : data.sentiment === 'negative' ? 'red' : 'yellow'}
                                                        size="sm"
                                                    >
                                                        {data.sentiment}
                                                    </Badge>
                                                </div>
                                                <div className="text-2xl font-bold text-cyan-400 mb-1">{data.mentions}</div>
                                                <div className="text-xs text-zinc-400">{data.percentage}% negative sentiment</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Representative Quotes */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        💬 REPRESENTATIVE QUOTES
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedOpportunity.quotes.map((quote, idx) => (
                                            <div key={idx} className="bg-white/5 rounded-lg p-4 border-l-4 border-cyan-500">
                                                <p className="text-white italic mb-2">"{quote.text}"</p>
                                                <div className="flex items-center gap-4 text-xs text-zinc-400">
                                                    <span className="font-medium">{quote.source}</span>
                                                    {quote.rating && <span>★ {quote.rating}/5</span>}
                                                    <span>{quote.engagement}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommended Actions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        🎯 RECOMMENDED ACTIONS
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedOpportunity.recommendedActions.map((action, idx) => (
                                            <div
                                                key={idx}
                                                className={`rounded-lg p-4 border ${action.type === 'Quick Fix' ? 'bg-green-500/10 border-green-500/30' :
                                                    action.type === 'Medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                                                        'bg-purple-500/10 border-purple-500/30'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            color={
                                                                action.type === 'Quick Fix' ? 'green' :
                                                                    action.type === 'Medium' ? 'yellow' :
                                                                        'purple'
                                                            }
                                                            size="sm"
                                                        >
                                                            {action.type}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs">
                                                        <div className="flex items-center gap-1 text-zinc-400">
                                                            <Clock className="w-3 h-3" />
                                                            {action.timeline}
                                                        </div>
                                                        <div className="flex items-center gap-1 text-emerald-400 font-medium">
                                                            <DollarSign className="w-3 h-3" />
                                                            {action.cost}
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-white">{action.action}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Competitive Context */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        🏆 COMPETITIVE CONTEXT
                                    </h3>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <div className="text-xs text-zinc-400 mb-1">Competitor</div>
                                                <div className="text-sm font-medium text-white">{selectedOpportunity.competitiveContext.competitor}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-zinc-400 mb-1">Has Feature</div>
                                                <Badge color={selectedOpportunity.competitiveContext.hasFeature ? 'green' : 'red'} size="sm">
                                                    {selectedOpportunity.competitiveContext.hasFeature ? 'Yes' : 'No'}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-xs text-zinc-400 mb-1">Sentiment</div>
                                            <div className="text-sm text-white">{selectedOpportunity.competitiveContext.sentiment}</div>
                                        </div>
                                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                                            <div className="flex items-start gap-2">
                                                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                                                <div>
                                                    <div className="text-xs font-semibold text-red-400 mb-1">Philips Gap</div>
                                                    <div className="text-sm text-white">{selectedOpportunity.competitiveContext.ourGap}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Impact */}
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        💰 BUSINESS IMPACT
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                                <div className="text-xs text-emerald-400 font-semibold">Return Reduction</div>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{selectedOpportunity.businessImpact.returnReduction}</div>
                                        </div>
                                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Target className="w-4 h-4 text-blue-400" />
                                                <div className="text-xs text-blue-400 font-semibold">NPS Improvement</div>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{selectedOpportunity.businessImpact.npsImprovement}</div>
                                        </div>
                                        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <DollarSign className="w-4 h-4 text-yellow-400" />
                                                <div className="text-xs text-yellow-400 font-semibold">Quick Fix Cost</div>
                                            </div>
                                            <div className="text-2xl font-bold text-white">{selectedOpportunity.businessImpact.quickFixCost}</div>
                                        </div>
                                        {selectedOpportunity.businessImpact.fullRedesignCost && (
                                            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <DollarSign className="w-4 h-4 text-purple-400" />
                                                    <div className="text-xs text-purple-400 font-semibold">Full Redesign Cost</div>
                                                </div>
                                                <div className="text-2xl font-bold text-white">{selectedOpportunity.businessImpact.fullRedesignCost}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4 border-t border-white/10">
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-medium rounded-lg transition-colors">
                                        <Users className="w-4 h-4" />
                                        Assign to Team
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/20">
                                        <Calendar className="w-4 h-4" />
                                        Add to Sprint
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors border border-white/20">
                                        <FileText className="w-4 h-4" />
                                        Export Report
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
