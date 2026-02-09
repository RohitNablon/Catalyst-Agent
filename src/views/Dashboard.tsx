import { TrendingUp, Sparkles, Shield, Heart, Clock, AlertCircle, TrendingDown, CheckCircle2, ArrowUpRight, ExternalLink, Flame, AlertTriangle, Wrench, Zap, ChevronRight, ChevronDown, MessageCircle, Lightbulb } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart, ReferenceDot } from 'recharts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardData from '../data/dashboardData.json';
import ROIAnalysis from '../components/dashboard/ROIAnalysis';

export default function Dashboard() {
    const navigate = useNavigate();
    const { executiveSummary, kpis, sentimentTrend, sentimentDrivers, sentimentHeatmap, agentActivity, priorityAlerts } = dashboardData;

    // Expandable card state - DEFAULT EXPANDED
    const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({
        marketSentiment: true,
        innovationReadiness: true,
        competitiveGap: true,
        customerSatisfaction: true,
    });

    // Animate KPI values
    const [animatedKPIs, setAnimatedKPIs] = useState({
        marketSentiment: 0,
        innovationReadiness: 0,
        competitiveGap: 0,
        customerSatisfaction: 0,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedKPIs({
                marketSentiment: kpis.marketSentiment.value,
                innovationReadiness: kpis.innovationReadiness.value,
                competitiveGap: kpis.competitiveGap.value,
                customerSatisfaction: kpis.customerSatisfaction.value,
            });
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const toggleCard = (cardName: string) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardName]: !prev[cardName]
        }));
    };

    const priorityIcons = {
        'CAPITALIZE': Flame,
        'DEFEND': Shield,
        'FIX': Wrench,
        'ACCELERATE': Zap
    };

    const priorityColors = {
        'CAPITALIZE': 'from-green-500 to-emerald-600',
        'DEFEND': 'from-yellow-500 to-orange-600',
        'FIX': 'from-red-500 to-rose-600',
        'ACCELERATE': 'from-cyan-500 to-blue-600'
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-[1800px] mx-auto">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-white mb-2">Intelligence Command Center</h1>
                    <p className="text-zinc-400">Real-time product intelligence for Philips OneBlade 360</p>
                </div>

                {/* Executive Summary Banner */}
                <div className="glass-panel rounded-xl p-6 mb-8 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-cyan-500/30">
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        THIS WEEK'S STRATEGIC PRIORITIES
                    </h2>
                    <div className="grid grid-cols-4 gap-4">
                        {executiveSummary.priorities.map((priority) => {
                            const Icon = priorityIcons[priority.type as keyof typeof priorityIcons];
                            const colorClass = priorityColors[priority.type as keyof typeof priorityColors];
                            return (
                                <div
                                    key={priority.id}
                                    className="p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all group cursor-pointer"
                                >
                                    <div className="flex items-start gap-3 mb-2">
                                        <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass}`}>
                                            <Icon className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-cyan-400 mb-1">{priority.type}</div>
                                            <div className="text-sm text-white font-medium leading-tight mb-1">{priority.title}</div>
                                            <div className="text-xs text-zinc-400">{priority.action}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-4 text-right">
                        <button
                            onClick={() => navigate('/full-report')}
                            className="text-sm text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 group"
                        >
                            View Full Intel Report
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Executive Intelligence Grid */}
                <div className="mb-2">
                    <h2 className="text-2xl font-bold text-white">Executive Intelligence Grid</h2>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    {/* Market Sentiment - EXPANDABLE */}
                    <div className="glass-panel rounded-xl p-6 relative overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer"
                        onClick={() => toggleCard('marketSentiment')}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-cyan-500/10">
                                <TrendingUp className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                {kpis.marketSentiment.trend === 'up' && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10">
                                        <ArrowUpRight className="w-3 h-3 text-green-400" />
                                        <span className="text-xs font-semibold text-green-400">+{kpis.marketSentiment.change}</span>
                                    </div>
                                )}
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedCards.marketSentiment ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">Market Sentiment</h3>
                        <div className="flex items-end gap-2 mb-3">
                            <span className="text-4xl font-bold text-white transition-all duration-1000">
                                {animatedKPIs.marketSentiment.toFixed(1)}
                            </span>
                            <span className="text-xl text-zinc-500 mb-1">/10</span>
                        </div>
                        <div className="text-xs text-zinc-500 mb-3">{kpis.marketSentiment.changeLabel}</div>

                        {/* Sparkline */}
                        <ResponsiveContainer width="100%" height={40}>
                            <LineChart data={kpis.marketSentiment.sparklineData.map((val, idx) => ({ value: val }))}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#22d3ee"
                                    strokeWidth={2}
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>

                        {/* EXPANDED SECTION */}
                        {expandedCards.marketSentiment && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                                {/* Sentiment Breakdown */}
                                <div>
                                    <div className="text-xs font-semibold text-cyan-400 mb-2">CHANNEL BREAKDOWN</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-300">├─ Amazon: {kpis.marketSentiment.breakdown.amazon.score}/10</span>
                                            <span className="text-cyan-400">⭐ {kpis.marketSentiment.breakdown.amazon.label}</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 ml-3">({kpis.marketSentiment.breakdown.amazon.reviews.toLocaleString()} reviews)</div>

                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-300">├─ Walmart: {kpis.marketSentiment.breakdown.walmart.score}/10</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 ml-3">({kpis.marketSentiment.breakdown.walmart.reviews.toLocaleString()} reviews)</div>

                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-300">├─ Target: {kpis.marketSentiment.breakdown.target.score}/10</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 ml-3">({kpis.marketSentiment.breakdown.target.reviews.toLocaleString()} reviews)</div>

                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-zinc-300">└─ Best Buy: {kpis.marketSentiment.breakdown.bestBuy.score}/10</span>
                                            <span className="text-yellow-400">⚠️ {kpis.marketSentiment.breakdown.bestBuy.alert}</span>
                                        </div>
                                        <div className="text-xs text-zinc-500 ml-3">({kpis.marketSentiment.breakdown.bestBuy.reviews.toLocaleString()} reviews)</div>
                                    </div>
                                </div>

                                {/* Alert Indicator */}
                                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                    <div className="flex items-start gap-2">
                                        <span className="text-yellow-400">{kpis.marketSentiment.trendingAlert.icon}</span>
                                        <span className="text-xs font-semibold text-yellow-300">{kpis.marketSentiment.trendingAlert.text}</span>
                                    </div>
                                </div>

                                {/* Conversation Starter */}
                                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                                    <div className="flex items-start gap-2">
                                        <MessageCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs font-semibold text-cyan-400 mb-1">💬 ASK:</div>
                                            <div className="text-xs text-cyan-300">{kpis.marketSentiment.conversationStarter}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Innovation Readiness - EXPANDABLE */}
                    <div className="glass-panel rounded-xl p-6 relative overflow-hidden hover:border-purple-500/30 transition-all cursor-pointer"
                        onClick={() => toggleCard('innovationReadiness')}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-purple-500/10">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10">
                                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                                    <span className="text-xs font-semibold text-green-400">+{kpis.innovationReadiness.change}%</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedCards.innovationReadiness ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">Innovation Readiness</h3>
                        <div className="flex items-end gap-2 mb-3">
                            <span className="text-4xl font-bold text-white transition-all duration-1000">
                                {animatedKPIs.innovationReadiness}
                            </span>
                            <span className="text-xl text-zinc-500 mb-1">%</span>
                        </div>
                        <div className="text-xs text-zinc-500 mb-2">{kpis.innovationReadiness.changeLabel}</div>
                        <div className="text-xs text-purple-400/80">{kpis.innovationReadiness.launchReady}</div>

                        {/* EXPANDED SECTION */}
                        {expandedCards.innovationReadiness && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                                {/* Ready to Launch */}
                                <div>
                                    <div className="text-xs font-semibold text-green-400 mb-2">✅ READY TO LAUNCH (100%)</div>
                                    <div className="space-y-2">
                                        {kpis.innovationReadiness.pipeline.ready.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white">• {item.name}</div>
                                                <div className="text-zinc-500 ml-3">{item.status}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* In Development */}
                                <div>
                                    <div className="text-xs font-semibold text-yellow-400 mb-2">🟡 IN DEVELOPMENT (60%)</div>
                                    <div className="space-y-2">
                                        {kpis.innovationReadiness.pipeline.inDevelopment.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white">• {item.name}</div>
                                                <div className="text-zinc-500 ml-3">{item.status}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Concept Stage */}
                                <div>
                                    <div className="text-xs font-semibold text-red-400 mb-2">🔴 CONCEPT STAGE (20%)</div>
                                    <div className="space-y-2">
                                        {kpis.innovationReadiness.pipeline.concept.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white">• {item.name}</div>
                                                <div className="text-zinc-500 ml-3">{item.status}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Competitive Urgency */}
                                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                    <div className="text-xs font-semibold text-red-400 mb-2">⚠️ PRESSURE POINTS:</div>
                                    <div className="space-y-1">
                                        {kpis.innovationReadiness.competitiveUrgency.pressurePoints.map((point, idx) => (
                                            <div key={idx} className="text-xs text-red-300">• {point}</div>
                                        ))}
                                    </div>
                                </div>

                                {/* R&D Velocity */}
                                <div className="p-2 rounded bg-purple-500/10">
                                    <div className="text-xs text-purple-300">📈 {kpis.innovationReadiness.rdVelocity}</div>
                                </div>

                                {/* Conversation Starter */}
                                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                                    <div className="flex items-start gap-2">
                                        <MessageCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs font-semibold text-purple-400 mb-1">💬 DISCUSS:</div>
                                            <div className="text-xs text-purple-300">{kpis.innovationReadiness.conversationStarter}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Competitive Gap - EXPANDABLE */}
                    <div className="glass-panel rounded-xl p-6 relative overflow-hidden hover:border-green-500/30 transition-all cursor-pointer"
                        onClick={() => toggleCard('competitiveGap')}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-green-500/10">
                                <Shield className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10">
                                    <TrendingDown className="w-3 h-3 text-green-400" />
                                    <span className="text-xs font-semibold text-green-400">{kpis.competitiveGap.change}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedCards.competitiveGap ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">Competitive Gap</h3>
                        <div className="flex items-end gap-2 mb-3">
                            <span className="text-4xl font-bold text-white transition-all duration-1000">
                                {animatedKPIs.competitiveGap}
                            </span>
                            <span className="text-xl text-zinc-500 mb-1">features</span>
                        </div>
                        <div className="text-xs text-zinc-500 mb-2">{kpis.competitiveGap.changeLabel}</div>
                        <div className="text-xs text-green-400/80">{kpis.competitiveGap.gapTrend}</div>

                        {/* EXPANDED SECTION */}
                        {expandedCards.competitiveGap && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                                {/* Missing Features */}
                                <div>
                                    <div className="text-xs font-semibold text-red-400 mb-2">🔴 MISSING (competitors have, we don't):</div>
                                    <div className="space-y-3">
                                        {kpis.competitiveGap.featureGap.missing.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white font-medium">• {item.name} ({item.competitor}) - {item.impact}</div>
                                                <div className="text-zinc-500 ml-3">└─ {item.demand}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Our Advantages */}
                                <div>
                                    <div className="text-xs font-semibold text-green-400 mb-2">🟢 OUR ADVANTAGES:</div>
                                    <div className="space-y-2">
                                        {kpis.competitiveGap.featureGap.advantages.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white">• {item.name} - {item.status}</div>
                                                <div className="text-zinc-500 ml-3">{item.advantage}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Revenue Impact */}
                                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                    <div className="text-xs font-semibold text-yellow-400 mb-2">💰 COST OF GAP:</div>
                                    <div className="space-y-1 text-xs text-yellow-300">
                                        <div>• Lost: {kpis.competitiveGap.revenueImpact.lost}</div>
                                        <div>• Potential: {kpis.competitiveGap.revenueImpact.potential}</div>
                                    </div>
                                </div>

                                {/* Competitive Alert */}
                                <div className="p-2 rounded bg-red-500/10">
                                    <div className="text-xs text-red-300">🚨 WATCH: {kpis.competitiveGap.competitiveAlert}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Customer Satisfaction - EXPANDABLE */}
                    <div className="glass-panel rounded-xl p-6 relative overflow-hidden hover:border-cyan-500/30 transition-all cursor-pointer"
                        onClick={() => toggleCard('customerSatisfaction')}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 rounded-lg bg-cyan-500/10">
                                <Heart className="w-6 h-6 text-cyan-400" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10">
                                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                                    <span className="text-xs font-semibold text-green-400">+{kpis.customerSatisfaction.change}</span>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${expandedCards.customerSatisfaction ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-2">Customer Satisfaction</h3>
                        <div className="flex items-end gap-2 mb-3">
                            <span className="text-4xl font-bold text-white transition-all duration-1000">
                                {animatedKPIs.customerSatisfaction.toFixed(1)}
                            </span>
                            <span className="text-xl text-zinc-500 mb-1">/10</span>
                        </div>
                        <div className="text-xs text-zinc-500 mb-2">{kpis.customerSatisfaction.changeLabel}</div>
                        <div className="flex items-center gap-2 text-xs">
                            <span className="text-cyan-400/80">{kpis.customerSatisfaction.platforms}</span>
                            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">NPS {kpis.customerSatisfaction.nps}</span>
                        </div>

                        {/* EXPANDED SECTION */}
                        {expandedCards.customerSatisfaction && (
                            <div className="mt-4 pt-4 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                                {/* Top Satisfiers */}
                                <div>
                                    <div className="text-xs font-semibold text-green-400 mb-2">✅ TOP SATISFIERS</div>
                                    <div className="space-y-2">
                                        {kpis.customerSatisfaction.satisfactionDrivers.topSatisfiers.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="text-white font-medium">• {item.driver}</div>
                                                <div className="text-zinc-500 ml-3">{item.mentions.toLocaleString()} mentions</div>
                                                <div className="text-green-400 ml-3 italic">{item.impact}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Top Detractors */}
                                <div>
                                    <div className="text-xs font-semibold text-red-400 mb-2">⚠️ TOP DETRACTORS</div>
                                    <div className="space-y-2">
                                        {kpis.customerSatisfaction.satisfactionDrivers.topDetractors.map((item, idx) => (
                                            <div key={idx} className="text-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-medium">• {item.driver}</span>
                                                    {item.trend === 'rising' && <TrendingUp className="w-3 h-3 text-red-400" />}
                                                </div>
                                                <div className="text-zinc-500 ml-3">{item.mentions.toLocaleString()} mentions</div>
                                                <div className="text-red-400 ml-3 italic">{item.impact}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Channel Performance */}
                                <div>
                                    <div className="text-xs font-semibold text-cyan-400 mb-2">CHANNEL PERFORMANCE</div>
                                    <div className="space-y-2">
                                        {kpis.customerSatisfaction.channelPerformance.map((channel, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-xs">
                                                <span className="text-zinc-300">{channel.channel}:</span>
                                                <span className="text-white">{channel.rating}⭐ ({channel.satisfaction}/10)</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cohort Analysis */}
                                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                                    <div className="text-xs font-semibold text-purple-400 mb-1">👥 COHORT INSIGHT:</div>
                                    <div className="text-xs text-purple-300">{kpis.customerSatisfaction.cohortAnalysis}</div>
                                </div>

                                {/* Detractor Trend Alert */}
                                <div className="p-2 rounded bg-red-500/10">
                                    <div className="text-xs text-red-300">🔴 WATCH: {kpis.customerSatisfaction.detractorTrend}</div>
                                </div>

                                {/* Conversation Starter */}
                                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                                    <div className="flex items-start gap-2">
                                        <MessageCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <div className="text-xs font-semibold text-cyan-400 mb-1">💬 ASK:</div>
                                            <div className="text-xs text-cyan-300">{kpis.customerSatisfaction.conversationStarter}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* ROI Analysis Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Financial Impact Analysis</h2>
                    <ROIAnalysis />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6 mb-6">
                    {/* Sentiment Trend Chart + Drivers */}
                    <div className="col-span-9 glass-panel rounded-xl p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Market Sentiment Trend</h3>
                                <p className="text-xs text-zinc-400">{sentimentDrivers.dataSource}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-cyan-400">{kpis.marketSentiment.value.toFixed(1)}</div>
                                <div className="text-xs text-green-400">+{kpis.marketSentiment.change} vs 8 weeks ago</div>
                            </div>
                        </div>

                        {/* Chart */}
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={sentimentTrend}>
                                <defs>
                                    <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                />
                                <YAxis
                                    stroke="#52525b"
                                    fontSize={12}
                                    tickLine={false}
                                    domain={[7.5, 10]}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload[0]) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="p-3">
                                                    <div className="font-semibold text-white mb-1">{data.date}</div>
                                                    <div className="text-cyan-400 font-bold text-lg mb-2">{data.sentiment.toFixed(1)}/10</div>
                                                    {data.event && (
                                                        <div className="text-xs mt-2 pt-2 border-t border-white/10">
                                                            <div className="text-white font-medium mb-1">
                                                                {data.event.icon} {data.event.title}
                                                            </div>
                                                            <div className="text-zinc-400">{data.event.description}</div>
                                                            <div className="text-cyan-400 mt-1">{data.event.impact}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                {sentimentTrend.filter(d => d.event).map((point, idx) => (
                                    <ReferenceDot
                                        key={idx}
                                        x={point.date}
                                        y={point.sentiment}
                                        r={6}
                                        fill="#00D9FF"
                                        stroke="#0E1B4D"
                                        strokeWidth={2}
                                    />
                                ))}
                                <Area
                                    type="monotone"
                                    dataKey="sentiment"
                                    stroke="#00D9FF"
                                    strokeWidth={3}
                                    fill="url(#sentimentGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>

                        {/* Sentiment Breakdown */}
                        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="text-2xl font-bold text-green-400">{sentimentDrivers.breakdown.positive.current}%</div>
                                    <div className="flex items-center gap-1 text-xs text-green-400">
                                        <TrendingUp className="w-3 h-3" />
                                        +{sentimentDrivers.breakdown.positive.change}%
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-400">Positive</div>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="text-2xl font-bold text-red-400">{sentimentDrivers.breakdown.negative.current}%</div>
                                    <div className="flex items-center gap-1 text-xs text-green-400">
                                        <TrendingDown className="w-3 h-3" />
                                        {sentimentDrivers.breakdown.negative.change}%
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-400">Negative</div>
                            </div>
                            <div className="text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <div className="text-2xl font-bold text-yellow-400">{sentimentDrivers.breakdown.neutral.current}%</div>
                                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                                        →{sentimentDrivers.breakdown.neutral.change}%
                                    </div>
                                </div>
                                <div className="text-xs text-zinc-400">Neutral</div>
                            </div>
                        </div>

                        {/* Executive Insight Box */}
                        <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                            <h4 className="text-sm font-bold text-cyan-400 mb-3">📊 EXECUTIVE INSIGHT</h4>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <span className="text-green-400 font-semibold">📈 MOMENTUM:</span>
                                    <span className="text-zinc-300 ml-2">{sentimentDrivers.executiveInsight.momentum}</span>
                                </div>
                                <div>
                                    <span className="text-yellow-400 font-semibold">⚠️ WATCH:</span>
                                    <span className="text-zinc-300 ml-2">{sentimentDrivers.executiveInsight.watch}</span>
                                </div>
                                <div>
                                    <span className="text-cyan-400 font-semibold">✅ ACTION:</span>
                                    <span className="text-zinc-300 ml-2">{sentimentDrivers.executiveInsight.action}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sentiment Drivers Panel */}
                    <div className="col-span-3 glass-panel rounded-xl p-6">
                        <h3 className="text-sm font-semibold text-white mb-4">Top Sentiment Drivers</h3>

                        {/* Positive Signals */}
                        <div className="mb-6">
                            <div className="text-xs font-bold text-green-400 uppercase tracking-wide mb-3">Positive Signals</div>
                            <div className="space-y-3">
                                {sentimentDrivers.positive.map((signal, idx) => (
                                    <div key={idx} className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="text-xs font-medium text-white">{signal.text}</div>
                                            <TrendingUp className="w-3 h-3 text-green-400 flex-shrink-0" />
                                        </div>
                                        <div className="text-xs text-green-400 font-semibold">{signal.mentions.toLocaleString()} mentions</div>
                                        <div className="text-xs text-zinc-400 mt-1">+{signal.change}% vs last month</div>
                                        {signal.note && <div className="text-xs text-zinc-500 mt-1 italic">{signal.note}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Negative Signals */}
                        <div>
                            <div className="text-xs font-bold text-red-400 uppercase tracking-wide mb-3">Negative Signals</div>
                            <div className="space-y-3">
                                {sentimentDrivers.negative.map((signal, idx) => (
                                    <div key={idx} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="text-xs font-medium text-white">{signal.text}</div>
                                            {signal.trend === 'up' ? (
                                                <TrendingUp className="w-3 h-3 text-red-400 flex-shrink-0" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 text-green-400 flex-shrink-0" />
                                            )}
                                        </div>
                                        <div className="text-xs text-red-400 font-semibold">{signal.mentions.toLocaleString()} mentions</div>
                                        <div className={`text-xs mt-1 ${signal.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                                            {signal.change > 0 ? '+' : ''}{signal.change}% vs last month
                                        </div>
                                        {signal.note && <div className="text-xs text-zinc-500 mt-1 italic">{signal.note}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sentiment Heatmap */}
                <div className="glass-panel rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2">Sentiment Drivers Heatmap</h3>
                    <p className="text-xs text-zinc-400 mb-4">Last 8 Weeks</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-400">Feature</th>
                                    {sentimentTrend.map((week, idx) => (
                                        <th key={idx} className="text-center py-3 px-2 text-xs font-semibold text-zinc-400">{week.date}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sentimentHeatmap.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="border-b border-white/10 hover:bg-white/5">
                                        <td className="py-3 px-4 text-xs font-medium text-white">{row.feature}</td>
                                        {row.data.map((cell, cellIdx) => {
                                            const emoji = cell.status === 'strong' ? '🟢' : cell.status === 'moderate' ? '🟡' : '🔴';
                                            return (
                                                <td key={cellIdx} className="text-center py-3 px-2">
                                                    <div className="inline-flex items-center gap-1">
                                                        <span>{emoji}</span>
                                                        <span className={`text-xs font-semibold ${cell.status === 'strong' ? 'text-green-400' :
                                                            cell.status === 'moderate' ? 'text-yellow-400' : 'text-red-400'
                                                            }`}>
                                                            {cell.score.toFixed(1)}
                                                        </span>
                                                        {cell.alert && <AlertTriangle className="w-3 h-3 text-red-400" />}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 flex items-center gap-6 text-xs text-zinc-400">
                        <div className="flex items-center gap-2">
                            <span>Legend:</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🟢 &gt;8.0 (Strong)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🟡 7.0-8.0 (Moderate)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span>🔴 &lt;7.0 (Concern)</span>
                        </div>
                    </div>
                </div>

                {/* Agent Activity Feed */}
                <div className="glass-panel rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Live Agent Activity</h3>
                    <div className="grid grid-cols-5 gap-4">
                        {agentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex flex-col gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all group"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold text-cyan-400">{activity.agentName}</span>
                                    <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' :
                                        activity.status === 'warning' ? 'bg-yellow-500' :
                                            activity.status === 'info' ? 'bg-cyan-500' : 'bg-red-500'
                                        } animate-pulse`} />
                                </div>
                                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">{activity.action}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {activity.relativeTime}
                                    </span>
                                    {activity.impact && (
                                        <div className={`px-2 py-0.5 rounded text-xs ${activity.impact === 'high' ? 'bg-red-500/10 text-red-400' :
                                            activity.impact === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                                'bg-cyan-500/10 text-cyan-400'
                                            }`}>
                                            {activity.impact.toUpperCase()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Priority Alerts */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6">Priority Alerts</h2>
                    <div className="grid grid-cols-3 gap-6">
                        {priorityAlerts.map((alert) => (
                            <div
                                key={alert.id}
                                className={`glass-panel rounded-xl p-6 border-2 ${alert.priority === 'critical' ? 'border-red-500/30 hover:border-red-500/50' :
                                    alert.priority === 'watch' ? 'border-yellow-500/30 hover:border-yellow-500/50' :
                                        'border-green-500/30 hover:border-green-500/50'
                                    } transition-all group`}
                            >
                                <div className="flex items-start gap-3 mb-4">
                                    <span className="text-2xl">{alert.icon}</span>
                                    <div className="flex-1">
                                        <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${alert.priority === 'critical' ? 'text-red-400' :
                                            alert.priority === 'watch' ? 'text-yellow-400' :
                                                'text-green-400'
                                            }`}>
                                            {alert.priority}
                                        </div>
                                        <h4 className="text-base font-bold text-white">{alert.title}</h4>
                                    </div>
                                </div>

                                <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{alert.description}</p>

                                <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-lg bg-white/5">
                                    {Object.entries(alert.metrics).map(([key, value]) => (
                                        <div key={key} className="text-center">
                                            <div className="text-xs text-zinc-400 mb-1 capitalize">
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </div>
                                            <div className="text-sm font-semibold text-white"> {value as string}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 mb-4">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-cyan-300 leading-relaxed">{alert.recommendation}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {alert.actions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-xs font-medium text-white transition-all group"
                                        >
                                            {action}
                                            <ExternalLink className="w-3 h-3 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
