import { ArrowLeft, Download, Share2, AlertTriangle, CheckCircle2, Target, Zap, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import ROIAnalysis from '../components/dashboard/ROIAnalysis';

export default function FullReport() {
    const navigate = useNavigate();

    // Sample data for charts
    const sentiment90Days = [
        { date: 'Nov 8', sentiment: 8.1 }, { date: 'Nov 15', sentiment: 8.0 }, { date: 'Nov 22', sentiment: 8.2 },
        { date: 'Nov 29', sentiment: 8.3 }, { date: 'Dec 6', sentiment: 8.1 }, { date: 'Dec 13', sentiment: 8.4 },
        { date: 'Dec 20', sentiment: 8.5 }, { date: 'Dec 27', sentiment: 8.3 }, { date: 'Jan 3', sentiment: 8.2 },
        { date: 'Jan 10', sentiment: 8.6 }, { date: 'Jan 17', sentiment: 8.7 }, { date: 'Jan 24', sentiment: 8.5 },
        { date: 'Jan 31', sentiment: 8.9 }, { date: 'Feb 7', sentiment: 9.2 }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 fixed inset-0 z-50 overflow-y-auto">
            {/* Top Header */}
            <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-white/10">
                <div className="max-w-[1800px] mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="text-sm font-medium">Back to Dashboard</span>
                        </button>
                        <div className="h-6 w-px bg-white/10" />
                        <h1 className="text-xl font-bold text-white">Full Intelligence Report</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right mr-4">
                            <div className="text-xs text-zinc-500">Generated: Feb 8, 2026 2:34 PM</div>
                            <div className="text-xs text-zinc-500">Coverage: Last 30 days | Data sources: 15,847 signals</div>
                        </div>
                        <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium flex items-center gap-2 transition-all">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium flex items-center gap-2 transition-all">
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto px-8 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Sidebar - Navigation */}
                    <div className="col-span-2">
                        <div className="sticky top-24 space-y-2">
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Jump to Section</div>
                            <a href="#executive-summary" className="block px-3 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg font-medium">Executive Summary</a>
                            <a href="#roi-analysis" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">ROI Analysis</a>
                            <a href="#market-intelligence" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Market Intelligence</a>
                            <a href="#competitive-intelligence" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Competitive Intelligence</a>
                            <a href="#innovation-pipeline" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Innovation Pipeline</a>
                            <a href="#customer-intelligence" className="block px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Customer Intelligence</a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-7 space-y-8">
                        {/* SECTION 1: Executive Summary */}
                        <section id="executive-summary" className="glass-panel rounded-xl p-8 border-2 border-cyan-500/30">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-3xl">📊</span>
                                <h2 className="text-2xl font-bold text-white">Intelligence Snapshot - February 2026</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Overall Health Score */}
                                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                    <div className="text-sm text-green-400 mb-2">OVERALL HEALTH SCORE</div>
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-bold text-green-400">8.6</span>
                                        <span className="text-2xl text-green-400/70 mb-2">/10</span>
                                        <span className="text-lg text-green-400 mb-2 ml-2">🟢 +0.4 vs January</span>
                                    </div>
                                </div>

                                {/* Strategic Status */}
                                <div>
                                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-3">🎯 STRATEGIC STATUS</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-green-400">✅</span>
                                            <span className="text-zinc-300">Market sentiment at 18-month high (9.2/10)</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-green-400">✅</span>
                                            <span className="text-zinc-300">Viral cleaning feature driving organic growth</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-yellow-400">⚠️</span>
                                            <span className="text-zinc-300">Competitive pressure increasing (Braun aggressive)</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-yellow-400">⚠️</span>
                                            <span className="text-zinc-300">Price perception deteriorating (-0.8 points)</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-sm">
                                            <span className="text-red-400">🔴</span>
                                            <span className="text-zinc-300">Battery complaints spiking (+34% mentions)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Business Impact */}
                                <div>
                                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wide mb-3">💰 BUSINESS IMPACT</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="p-3 rounded-lg bg-white/5">
                                            <div className="text-xs text-zinc-500 mb-1">Revenue Opportunity</div>
                                            <div className="text-2xl font-bold text-green-400">$6.2M</div>
                                            <div className="text-xs text-zinc-400">Q1 2026</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5">
                                            <div className="text-xs text-zinc-500 mb-1">At-Risk Revenue</div>
                                            <div className="text-2xl font-bold text-red-400">$2.8M</div>
                                            <div className="text-xs text-zinc-400">Price war impact</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5">
                                            <div className="text-xs text-zinc-500 mb-1">Innovation Pipeline</div>
                                            <div className="text-2xl font-bold text-purple-400">$12.4M</div>
                                            <div className="text-xs text-zinc-400">If on time</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Immediate Actions */}
                                <div>
                                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-wide mb-3">⚡ IMMEDIATE ACTIONS REQUIRED</h3>
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                            <div className="text-sm font-medium text-white mb-1">1. Approve $180K marketing budget for cleaning campaign</div>
                                            <div className="text-xs text-red-300">Viral momentum window: 7-14 days before engagement drops</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                                            <div className="text-sm font-medium text-white mb-1">2. R&D investigate battery drain issue (high priority)</div>
                                            <div className="text-xs text-red-300">Affecting 18% of 1-star reviews, heavy beard users most impacted</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                            <div className="text-sm font-medium text-white mb-1">3. Product team evaluate LED Spotlight fast-track (Braun)</div>
                                            <div className="text-xs text-yellow-300">Can close 4-month gap by investing $180K acceleration budget</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                            <div className="text-sm font-medium text-white mb-1">4. Pricing strategy review (Braun promo ends March 15)</div>
                                            <div className="text-xs text-yellow-300">Bundle offer ($99) could recover 23% cart abandonment</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 1.5: ROI Analysis */}
                        <section id="roi-analysis">
                            <ROIAnalysis />
                        </section>

                        {/* SECTION 2: Market Intelligence */}
                        <section id="market-intelligence" className="glass-panel rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-2xl font-bold text-white">Market Intelligence Deep Dive</h2>
                            </div>

                            {/* Sentiment 90 Days */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4">Sentiment Trajectory (Last 90 Days)</h3>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart data={sentiment90Days}>
                                        <defs>
                                            <linearGradient id="sentimentGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="date" stroke="#52525b" fontSize={10} />
                                        <YAxis stroke="#52525b" fontSize={10} domain={[7.8, 9.5]} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="sentiment" stroke="#00D9FF" strokeWidth={2} fill="url(#sentimentGrad)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Sentiment Breakdown */}
                            <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-lg bg-white/5">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-400 mb-1">82%</div>
                                    <div className="text-xs text-zinc-400">Positive (12,973 mentions)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-red-400 mb-1">11%</div>
                                    <div className="text-xs text-zinc-400">Negative (1,741 mentions)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-yellow-400 mb-1">7%</div>
                                    <div className="text-xs text-zinc-400">Neutral (1,133 mentions)</div>
                                </div>
                            </div>

                            {/* Top Positive Themes */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-green-400 mb-4">TOP POSITIVE THEMES</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-white">1. Easy Cleaning</div>
                                            <div className="text-sm text-green-400">3,847 mentions (+45% MoM)</div>
                                        </div>
                                        <div className="space-y-1 mb-3">
                                            <div className="text-sm text-zinc-300 italic">💬 "Cleaning is literally one button - game changer"</div>
                                            <div className="text-sm text-zinc-300 italic">💬 "No more hair stuck in blades like my old Braun"</div>
                                        </div>
                                        <div className="text-xs text-green-400 font-semibold">Impact: Driving 23% of new customer acquisition</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-white">2. Sensitive Skin Performance</div>
                                            <div className="text-sm text-green-400">2,103 mentions (+12% MoM)</div>
                                        </div>
                                        <div className="space-y-1 mb-3">
                                            <div className="text-sm text-zinc-300 italic">💬 "No irritation for the first time ever"</div>
                                            <div className="text-sm text-zinc-300 italic">💬 "My dermatologist would approve of this shaver"</div>
                                        </div>
                                        <div className="text-xs text-green-400 font-semibold">Impact: Strong retention (89% repurchase intent)</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-white">3. Travel Convenience</div>
                                            <div className="text-sm text-green-400">1,456 mentions (+67% MoM)</div>
                                        </div>
                                        <div className="space-y-1 mb-3">
                                            <div className="text-sm text-zinc-300 italic">💬 "TSA-friendly and the lock actually works!"</div>
                                            <div className="text-sm text-zinc-300 italic">💬 "Perfect for business travel - compact and reliable"</div>
                                        </div>
                                        <div className="text-xs text-green-400 font-semibold">Impact: Premium segment growth (34% are frequent flyers)</div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Negative Themes */}
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-4">TOP NEGATIVE THEMES</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-white flex items-center gap-2">
                                                1. Battery Life
                                                <span className="text-xs px-2 py-1 rounded bg-red-500 text-white font-semibold">URGENT</span>
                                            </div>
                                            <div className="text-sm text-red-400">487 mentions (+34% MoM)</div>
                                        </div>
                                        <div className="space-y-1 mb-3">
                                            <div className="text-sm text-zinc-300 italic">💬 "Dies halfway through my beard - very frustrating"</div>
                                            <div className="text-sm text-zinc-300 italic">💬 "Charge lasts 2 shaves max, Braun does 5 shaves"</div>
                                        </div>
                                        <div className="text-xs text-red-400 mb-2">Impact: 18% cite this in 1-star reviews</div>
                                        <div className="text-xs text-zinc-400 mb-1">Root Cause: Heavy beard users (3+ day growth)</div>
                                        <div className="text-xs text-cyan-400 font-semibold">→ Firmware optimization + messaging</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="text-base font-bold text-white">2. Price Perception</div>
                                            <div className="text-sm text-yellow-400">356 mentions (+56% MoM)</div>
                                        </div>
                                        <div className="space-y-1 mb-3">
                                            <div className="text-sm text-zinc-300 italic">💬 "Great shaver but $20 more than Braun on sale"</div>
                                            <div className="text-sm text-zinc-300 italic">💬 "Would buy at $79, but $99 feels like a stretch"</div>
                                        </div>
                                        <div className="text-xs text-yellow-400 mb-2">Impact: 23% cart abandonment vs Braun</div>
                                        <div className="text-xs text-zinc-400 mb-1">Context: Braun Series 9 at $254 (was $299)</div>
                                        <div className="text-xs text-cyan-400 font-semibold">→ Limited-time bundle ($99 + travel case)</div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 3: Competitive Intelligence */}
                        <section id="competitive-intelligence" className="glass-panel rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-8 h-8 text-purple-400" />
                                <h2 className="text-2xl font-bold text-white">Competitive Intelligence</h2>
                            </div>

                            {/* Feature Parity Table */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-white mb-4">Feature Parity Analysis</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/10">
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-zinc-400">Feature</th>
                                                <th className="text-center py-3 px-2 text-xs font-semibold text-cyan-400">OneBlade</th>
                                                <th className="text-center py-3 px-2 text-xs font-semibold text-zinc-400">Braun</th>
                                                <th className="text-center py-3 px-2 text-xs font-semibold text-zinc-400">Manscaped</th>
                                                <th className="text-center py-3 px-2 text-xs font-semibold text-zinc-400">Gillette</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-white/10"><td colSpan={5} className="py-2 px-4 text-xs font-bold text-green-400">OUR ADVANTAGES</td></tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">Adaptive Blade</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">One-Touch Cleaning</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">Smart Travel Lock</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                            <tr className="border-b border-white/10"><td colSpan={5} className="py-2 px-4 text-xs font-bold text-red-400">GAPS TO CLOSE</td></tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">Dual Blade System</td>
                                                <td className="text-center text-red-400">❌</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">LED Spotlight</td>
                                                <td className="text-center text-red-400">❌</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                            <tr className="border-b border-white/10 hover:bg-white/5">
                                                <td className="py-3 px-4 text-white">Wireless Charging</td>
                                                <td className="text-center text-red-400">❌</td>
                                                <td className="text-center text-green-400">✅</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                                <td className="text-center text-zinc-600">❌</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                    <div className="text-sm font-bold text-yellow-400 mb-2">💰 REVENUE IMPACT OF GAPS</div>
                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div>
                                            <div className="text-red-400 font-semibold mb-1">Dual Blade gap</div>
                                            <div className="text-zinc-300">-$2.8M Q4 2025 lost to Braun</div>
                                        </div>
                                        <div>
                                            <div className="text-red-400 font-semibold mb-1">LED Spotlight gap</div>
                                            <div className="text-zinc-300">-$890K (tech-savvy to Manscaped)</div>
                                        </div>
                                        <div>
                                            <div className="text-red-400 font-semibold mb-1">Wireless Charging gap</div>
                                            <div className="text-zinc-300">-$240K (convenience premium)</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Competitive Moves */}
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">Recent Competitive Activity (Last 30 Days)</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-red-500/10 border-2 border-red-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-red-400 text-lg">🔴</span>
                                            <span className="text-xs font-bold text-red-400">HIGH IMPACT</span>
                                        </div>
                                        <div className="text-base font-bold text-white mb-2">Jan 15 - Braun Series 9 Pro Price Drop</div>
                                        <div className="text-sm text-zinc-300 mb-3">$299 → $254 (-15%) on Amazon, Walmart, Target</div>
                                        <div className="space-y-1 text-xs mb-3">
                                            <div className="text-zinc-400">• Your sales velocity -12% in week following</div>
                                            <div className="text-zinc-400">• Price comparison searches +89%</div>
                                            <div className="text-zinc-400">• "OneBlade vs Braun" queries +234%</div>
                                        </div>
                                        <div className="text-xs text-zinc-500 mb-2">Estimated Duration: Through March 15 (Q1 clearance)</div>
                                        <div className="p-3 rounded-lg bg-cyan-500/10 mt-3">
                                            <div className="text-xs font-semibold text-cyan-400 mb-1">RECOMMENDED COUNTER-MOVE:</div>
                                            <div className="text-xs text-cyan-300">Bundle: OneBlade 360 + Travel Case = $99</div>
                                            <div className="text-xs text-zinc-400 mt-1">Budget: $45K (marketing + margin hit)</div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-yellow-400 text-lg">🟡</span>
                                            <span className="text-xs font-bold text-yellow-400">MEDIUM IMPACT</span>
                                        </div>
                                        <div className="text-base font-bold text-white mb-2">Jan 28 - Manscaped 4.0 TikTok Campaign</div>
                                        <div className="text-sm text-zinc-300 mb-3">Influencer push highlighting LED spotlight feature</div>
                                        <div className="space-y-1 text-xs">
                                            <div className="text-zinc-400">Reach: 4.2M impressions, 89K engagements</div>
                                            <div className="text-zinc-400">Impact: "LED spotlight" searches +67% among 18-34 demo</div>
                                            <div className="text-green-400 mt-2">✅ Your cleaning viral video (2.3M views) outperformed - double down on TikTok</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 4: Innovation Pipeline */}
                        <section id="innovation-pipeline" className="glass-panel rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-8 h-8 text-purple-400" />
                                <h2 className="text-2xl font-bold text-white">Innovation Pipeline & Readiness</h2>
                            </div>

                            {/* Ready to Launch */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🚀</span>
                                    <h3 className="text-lg font-bold text-green-400">READY TO LAUNCH (100% Complete)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-lg bg-green-500/10 border-2 border-green-500/30">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-xl font-bold text-white mb-2">SenseIQ 2.0 Adaptive Blade System</h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="px-2 py-1 rounded bg-green-500 text-white text-xs font-bold">100%</div>
                                                    <span className="text-sm text-green-400">Launch Date: March 15, 2026 (6 weeks)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6 mb-4">
                                            <div>
                                                <div className="text-xs font-semibold text-zinc-400 mb-2">STATUS</div>
                                                <div className="text-sm text-white">✅ Patents filed (3)</div>
                                                <div className="text-sm text-white">✅ Prototype validated</div>
                                                <div className="text-sm text-white">✅ Manufacturing tooling ready</div>
                                            </ div>
                                            <div>
                                                <div className="text-xs font-semibold text-zinc-400 mb-2">MARKET OPPORTUNITY</div>
                                                <div className="text-2xl font-bold text-green-400">$8.2M</div>
                                                <div className="text-xs text-zinc-400">Year 1 revenue projection</div>
                                                <div className="text-xs text-green-400 mt-1">12-month competitive lead</div>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/10 mb-3">
                                            <div className="text-xs font-semibold text-zinc-400 mb-2">CUSTOMER VALIDATION</div>
                                            <div className="grid grid-cols-3 gap-4 text-xs">
                                                <div>
                                                    <div className="text-2xl font-bold text-green-400">94%</div>
                                                    <div className="text-zinc-400">Beta tester satisfaction</div>
                                                </div>
                                                <div className="col-span-2">
                                                    <div className="text-zinc-300 italic">"Adapts to my beard perfectly" - top feedback</div>
                                                    <div className="text-green-400 mt-1">Solves "too aggressive" complaint (-45% mentions)</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-green-500/20">
                                            <div className="text-sm font-bold text-green-400">✅ GREENLIGHT RECOMMENDATION</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* In Development */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">🟡</span>
                                    <h3 className="text-lg font-bold text-yellow-400">IN DEVELOPMENT (40-80% Complete)</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-white mb-2">LED Spotlight Precision Trimming</h4>
                                                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                                                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                                                </div>
                                                <div className="text-xs text-zinc-400 mt-1">65% complete</div>
                                            </div>
                                        </div>
                                        <div className="mb-4 text-sm">
                                            <div className="text-zinc-400 mb-1">Current Timeline: August 2026 (6 months)</div>
                                            <div className="text-cyan-400">Fast-Track Option: May 2026 (3 months, +$180K budget)</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 mb-3">
                                            <div className="text-xs font-bold text-red-400 mb-2">🔴 COMPETITIVE PRESSURE: HIGH</div>
                                            <div className="text-xs text-zinc-300 space-y-1">
                                                <div>• Braun launched Jan 15 (we're 4 months behind)</div>
                                                <div>• Manscaped has it (capturing tech-early adopters)</div>
                                                <div>• Customer requests: 234 "wish it had LED" mentions</div>
                                            </div>
                                        </div>
                                        <div className="text-sm mb-2">
                                            <span className="text-red-400 font-semibold">Revenue at Risk:</span>
                                            <span className="text-white ml-2">$890K (losing to Braun/Manscaped)</span>
                                        </div>
                                        <div className="p-3 rounded-lg bg-cyan-500/20">
                                            <div className="text-sm font-bold text-cyan-400">⚡ RECOMMEND FAST-TRACK TO MAY</div>
                                            <div className="text-xs text-cyan-300 mt-1">Approve $180K acceleration budget</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* SECTION 5: Customer Intelligence */}
                        <section id="customer-intelligence" className="glass-panel rounded-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Target className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-2xl font-bold text-white">Customer Intelligence</h2>
                            </div>

                            {/* Most Loved Features */}
                            <div>
                                <h3 className="text-lg font-bold text-green-400 mb-4">MOST LOVED FEATURES (Unprompted Mentions)</h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-base font-bold text-white">1. One-Touch Cleaning</div>
                                            <div className="text-sm text-green-400">3,847 mentions</div>
                                        </div>
                                        <div className="space-y-1 mb-2 text-sm text-zinc-300 italic">
                                            <div>"Cleaning is stupid easy - just press and rinse"</div>
                                            <div>"No more taking it apart like my old razor"</div>
                                        </div>
                                        <div className="text-xs font-semibold text-green-400">Impact: #1 reason for repeat purchase (67% cite this)</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-base font-bold text-white">2. Gentle on Sensitive Skin</div>
                                            <div className="text-sm text-green-400">2,103 mentions</div>
                                        </div>
                                        <div className="space-y-1 mb-2 text-sm text-zinc-300 italic">
                                            <div>"No razor burn for first time in my life"</div>
                                            <div>"My dermatologist asked what I'm using now"</div>
                                        </div>
                                        <div className="text-xs font-semibold text-green-400">Impact: Dermatologist recommendations up 34%</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="text-base font-bold text-white">3. Travel Lock Feature</div>
                                            <div className="text-sm text-green-400">1,456 mentions</div>
                                        </div>
                                        <div className="space-y-1 mb-2 text-sm text-zinc-300 italic">
                                            <div>"Finally a lock that actually works!"</div>
                                            <div>"TSA checkpoint was breeze - stayed locked"</div>
                                        </div>
                                        <div className="text-xs font-semibold text-green-400">Impact: Business travelers segment +67% growth</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar - Key Takeaways */}
                    <div className="col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Key Takeaways */}
                            <div className="glass-panel rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Key Takeaways</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Cleaning feature is your #1 asset - capitalize on viral moment</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">SenseIQ 2.0 ready for March launch with 12-month lead</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Braun price war impacting perception - counter with bundles</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">Battery complaints urgent - firmware team priority</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                        <span className="text-zinc-300">LED Spotlight gap - fast-track to May for $180K</span>
                                    </div>
                                </div>
                            </div>

                            {/* Recommended Actions */}
                            <div className="glass-panel rounded-xl p-6 border-2 border-cyan-500/30">
                                <h3 className="text-lg font-bold text-cyan-400 mb-4">Recommended Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium text-left transition-all">
                                        <div className="font-bold">1. URGENT: Battery Investigation</div>
                                        <div className="text-xs opacity-90 mt-1">R&D priority this sprint</div>
                                    </button>
                                    <button className="w-full px-4 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium text-left transition-all">
                                        <div className="font-bold">2. Approve Cleaning Campaign</div>
                                        <div className="text-xs opacity-90 mt-1">$180K budget for TikTok amplification</div>
                                    </button>
                                    <button className="w-full px-4 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium text-left transition-all">
                                        <div className="font-bold">3. Fast-Track LED Spotlight</div>
                                        <div className="text-xs opacity-90 mt-1">Close 4-month gap with Braun</div>
                                    </button>
                                    <button className="w-full px-4 py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium text-left transition-all">
                                        <div className="font-bold">4. Bundle Promotion Launch</div>
                                        <div className="text-xs opacity-90 mt-1">Counter Braun price war</div>
                                    </button>
                                </div>
                            </div>

                            {/* Report Metadata */}
                            <div className="text-xs text-zinc-500 space-y-1">
                                <div>Report Version: 2.8.1</div>
                                <div>Data Freshness: Real-time</div>
                                <div>Confidence Score: 94%</div>
                                <div>Next Update: Feb 15, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
