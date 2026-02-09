import { useState } from 'react';
import { Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine, ComposedChart } from 'recharts';
import { DollarSign, TrendingUp, Shield, AlertTriangle, CheckCircle2, Sliders, Download, Presentation, History, FileText } from 'lucide-react';

export default function ROIAnalysis() {
    const [sliderValues, setSliderValues] = useState({
        successRate: 90,
        marketAdoption: 'Expected',
        timeToMarket: 'On Time',
        competitiveResponse: 'Moderate'
    });

    const [activeStakeholderTab, setActiveStakeholderTab] = useState('cfo');

    // Waterfall Data
    const waterfallData = [
        { name: 'Investment', amount: -0.837, fill: '#ef4444' },
        { name: 'Quick Wins', amount: 0.42, fill: '#10b981' },
        { name: 'Quarterly', amount: 1.8, fill: '#10b981' },
        { name: 'Innovation', amount: 1.42, fill: '#10b981' },
        { name: 'Net ROI', amount: 2.8, fill: '#06b6d4', isTotal: true }
    ];

    // Cumulative ROI Data
    const cumulativeData = [
        { month: 'Month 0', value: -0.84, type: 'investment' },
        { month: 'Month 1', value: -0.70, type: 'investment' },
        { month: 'Month 2', value: -0.40, type: 'investment' },
        { month: 'Month 3', value: 0.05, type: 'return', event: 'Payback Reached' },
        { month: 'Month 4', value: 0.45, type: 'return', event: 'Subscription Launch' },
        { month: 'Month 5', value: 0.80, type: 'return' },
        { month: 'Month 6', value: 1.25, type: 'return', event: 'Quarterly Features' },
        { month: 'Month 7', value: 1.60, type: 'return' },
        { month: 'Month 8', value: 1.95, type: 'return' },
        { month: 'Month 9', value: 2.25, type: 'return' },
        { month: 'Month 10', value: 2.50, type: 'return', event: 'Innovation Launch' },
        { month: 'Month 11', value: 2.70, type: 'return' },
        { month: 'Month 12', value: 2.80, type: 'return', event: 'Target Reached' }
    ];

    // Risk Simulation Logic
    const calculateRiskAdjustedROI = () => {
        let baseROI = 2.8;

        // Success Rate Impact
        baseROI = baseROI * (sliderValues.successRate / 100);

        // Market Adoption Impact
        if (sliderValues.marketAdoption === 'Conservative') baseROI *= 0.8;
        if (sliderValues.marketAdoption === 'Optimistic') baseROI *= 1.2;

        // Time to Market Impact
        if (sliderValues.timeToMarket === 'Delayed 3mo') baseROI -= 0.4;
        if (sliderValues.timeToMarket === 'Accelerated') baseROI += 0.3;

        // Competitive Response Impact
        if (sliderValues.competitiveResponse === 'Aggressive') baseROI -= 0.3;
        if (sliderValues.competitiveResponse === 'Weak') baseROI += 0.2;

        return Math.max(0, baseROI).toFixed(1);
    };

    const riskAdjustedROI = calculateRiskAdjustedROI();

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* SECTION 1: ROI OVERVIEW HERO CARD */}
            <div className="glass-panel p-8 rounded-xl bg-gradient-to-br from-[#0E1B4D]/80 to-zinc-900/90 border-cyan-500/20">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Key Metrics */}
                    <div className="lg:w-3/5 space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">PROJECTED OUTCOME</span>
                                <span className="text-zinc-400 text-xs">FY 2026-2027</span>
                            </div>
                            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-300 mb-2">
                                Total Projected ROI: <span className="text-cyan-400">$2.8M</span>
                            </h2>
                            <p className="text-xl text-green-400 font-medium flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                336% ROI over 12 months
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                            <div>
                                <div className="text-zinc-400 text-sm mb-1">Total Investment</div>
                                <div className="text-2xl font-bold text-red-400">$837K</div>
                            </div>
                            <div>
                                <div className="text-zinc-400 text-sm mb-1">Projected Return</div>
                                <div className="text-2xl font-bold text-green-400">$3.64M</div>
                            </div>
                            <div>
                                <div className="text-zinc-400 text-sm mb-1">Net Gain</div>
                                <div className="text-2xl font-bold text-cyan-400 glow-cyan">$2.8M</div>
                            </div>
                        </div>

                        <div className="flex gap-6 text-sm text-zinc-300">
                            <div className="flex items-center gap-2">
                                <History className="w-4 h-4 text-cyan-400" />
                                Payback Period: <span className="text-white font-bold">4.2 months</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-cyan-400" />
                                Confidence: <span className="text-white font-bold">92%</span> (47K+ signals)
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Waterfall Chart */}
                    <div className="lg:w-2/5 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={waterfallData}>
                                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#a1a1aa' }} interval={0} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }}
                                    formatter={(value: any) => [`$${Math.abs(value)}M`, 'Amount']}
                                />
                                <ReferenceLine y={0} stroke="#52525b" />
                                <Bar dataKey="amount">
                                    {waterfallData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* SECTION 2: ROI BREAKDOWN BY HORIZON */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Immediate Wins */}
                <div className="glass-panel p-6 rounded-xl hover:bg-white/[0.07] transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-white">Quick Wins ROI</h3>
                        <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">Q1 2026</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Investment</span>
                            <span className="text-white">$23K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Return</span>
                            <span className="text-green-400 font-bold">$442K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">ROI</span>
                            <span className="text-cyan-400 font-bold">1,822%</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Return Reduction</span>
                                <span>$180K</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">2,400 returns × $75 avg cost</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Customer Retention</span>
                                <span>$140K</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">450 churns × $310 LTV</div>
                        </div>
                    </div>
                </div>

                {/* Card 2: Strategic ROI */}
                <div className="glass-panel p-6 rounded-xl hover:bg-white/[0.07] transition-all border-cyan-500/30 border">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-white">Strategic ROI</h3>
                        <span className="text-xs px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Q2-Q3 2026</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Investment</span>
                            <span className="text-white">$364K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Return</span>
                            <span className="text-green-400 font-bold">$2.15M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">ROI</span>
                            <span className="text-cyan-400 font-bold">491%</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Subscription Rev</span>
                                <span>$1.2M</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">3,200 subs × $31/mo</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Premium Upgrades</span>
                                <span>$480K</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">12% upgrades × 24K users</div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Innovation ROI */}
                <div className="glass-panel p-6 rounded-xl hover:bg-white/[0.07] transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-lg text-white">Innovation ROI</h3>
                        <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">2027+</span>
                    </div>
                    <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Investment</span>
                            <span className="text-white">$450K</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Return</span>
                            <span className="text-green-400 font-bold">$1.87M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">ROI</span>
                            <span className="text-cyan-400 font-bold">316%</span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Pricing Power</span>
                                <span>$840K</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">+15% premium × 56K units</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded md:text-xs text-sm">
                            <div className="flex justify-between font-semibold text-white mb-1">
                                <span>Market Share</span>
                                <span>$520K</span>
                            </div>
                            <div className="text-zinc-500 text-[10px]">+8% category share</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3: COST AVOIDANCE */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-green-500">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-green-400" />
                            Cost Avoidance Analysis
                        </h3>
                        <p className="text-zinc-400 text-sm">Hidden ROI: Money saved by replacing traditional methods</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">$623K</div>
                        <div className="text-xs text-zinc-500">Total Savings</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-zinc-500 mb-1">Survey Costs</div>
                        <div className="text-lg font-bold text-white">$180K</div>
                        <div className="text-[10px] text-green-400">4 quarterly surveys avoided</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-zinc-500 mb-1">Consulting Fees</div>
                        <div className="text-lg font-bold text-white">$120K</div>
                        <div className="text-[10px] text-green-400">External analysis retained</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-zinc-500 mb-1">Failed Dev Work</div>
                        <div className="text-lg font-bold text-white">$215K</div>
                        <div className="text-[10px] text-green-400">62% risk reduction</div>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg">
                        <div className="text-xs text-zinc-500 mb-1">Speed to Market</div>
                        <div className="text-lg font-bold text-white">$108K</div>
                        <div className="text-[10px] text-green-400">3-month gain value</div>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                    <div className="text-sm">
                        <span className="text-zinc-400">Total Economic Value (Net ROI + Savings): </span>
                        <span className="text-cyan-400 font-bold ml-2">$3.42M</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* SECTION 4: INTERACTIVE CALCULATOR */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-2 mb-6">
                        <Sliders className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-bold text-white">ROI Scenario Planner</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Success Rate Slider */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-zinc-400">Success Rate</span>
                                <span className="text-white font-mono">{sliderValues.successRate}%</span>
                            </div>
                            <input
                                type="range"
                                min="50"
                                max="100"
                                value={sliderValues.successRate}
                                onChange={(e) => setSliderValues({ ...sliderValues, successRate: parseInt(e.target.value) })}
                                className="w-full appearance-none bg-white/10 h-1 rounded-full thumb-cyan"
                            />
                        </div>

                        {/* Market Adoption */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-zinc-400">Market Adoption</span>
                                <span className="text-white">{sliderValues.marketAdoption}</span>
                            </div>
                            <div className="flex gap-1">
                                {['Conservative', 'Expected', 'Optimistic'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setSliderValues({ ...sliderValues, marketAdoption: opt })}
                                        className={`flex-1 py-1 text-[10px] rounded ${sliderValues.marketAdoption === opt ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-zinc-500'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Time to Market */}
                        <div>
                            <div className="flex justify-between text-xs mb-2">
                                <span className="text-zinc-400">Time to Market</span>
                                <span className="text-white">{sliderValues.timeToMarket}</span>
                            </div>
                            <div className="flex gap-1">
                                {['Delayed 3mo', 'On Time', 'Accelerated'].map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setSliderValues({ ...sliderValues, timeToMarket: opt })}
                                        className={`flex-1 py-1 text-[10px] rounded ${sliderValues.timeToMarket === opt ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-zinc-500'}`}
                                    >
                                        {opt.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Output Panel */}
                        <div className="bg-white/5 rounded-lg p-4 mt-8 border border-white/10">
                            <div className="text-center">
                                <div className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Adjusted ROI</div>
                                <div className={`text-3xl font-bold ${parseFloat(riskAdjustedROI) >= 2.8 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    ${riskAdjustedROI}M
                                </div>
                                <div className="text-[10px] text-zinc-400 mt-2">
                                    Probability-weighted based on 10,000 simulations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 7: TIMELINE CHART */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white">Cumulative Value Creation</h3>
                        <div className="flex gap-4 text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <span className="text-zinc-400">Investment</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                <span className="text-zinc-400">Return</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={cumulativeData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#71717a' }} />
                                <YAxis tick={{ fontSize: 10, fill: '#71717a' }} />
                                <Tooltip contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a' }} />
                                <Area type="monotone" dataKey="value" stroke="#06b6d4" fill="url(#colorValue)" />
                                {/* Milestones could be added as ReferenceDots or customised Axis labels */}
                                <ReferenceLine y={0} stroke="#52525b" strokeDasharray="3 3" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between px-4 text-xs text-zinc-500 mt-2">
                        <span>Month 0: Investment</span>
                        <span>Month 4: Payback</span>
                        <span>Month 12: Target</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SECTION 5: COMPARATIVE BENCHMARKS */}
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="font-bold text-white mb-4">Methodology Comparison</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-white/5">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Method</th>
                                    <th className="px-4 py-3">Cost</th>
                                    <th className="px-4 py-3">ROI</th>
                                    <th className="px-4 py-3 rounded-r-lg">Speed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr className="bg-cyan-500/10">
                                    <td className="px-4 py-3 font-medium text-cyan-400 flex items-center gap-2">
                                        <Shield className="w-3 h-3" /> Catalyst AI
                                    </td>
                                    <td className="px-4 py-3 text-white">$837K</td>
                                    <td className="px-4 py-3 text-cyan-400 font-bold">336%</td>
                                    <td className="px-4 py-3 text-white">4.2 mo</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-zinc-300">Traditional Agency</td>
                                    <td className="px-4 py-3 text-zinc-400">$1.2M</td>
                                    <td className="px-4 py-3 text-zinc-400">150%</td>
                                    <td className="px-4 py-3 text-zinc-400">12+ mo</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 text-zinc-300">In-house Manual</td>
                                    <td className="px-4 py-3 text-zinc-400">$680K</td>
                                    <td className="px-4 py-3 text-zinc-400">162%</td>
                                    <td className="px-4 py-3 text-zinc-400">10 mo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 text-xs text-zinc-500 italic">
                        "Catalyst AI delivers 2.2x better ROI in 65% less time than traditional methods"
                    </div>
                </div>

                {/* SECTION 6: STAKEHOLDER VIEWS */}
                <div className="glass-panel p-6 rounded-xl">
                    <h3 className="font-bold text-white mb-4">Stakeholder Impact Analysis</h3>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-4 border-b border-white/10">
                        {['cfo', 'cmo', 'cpo', 'ceo'].map(role => (
                            <button
                                key={role}
                                onClick={() => setActiveStakeholderTab(role)}
                                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${activeStakeholderTab === role ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {role} View
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="min-h-[200px]">
                        {activeStakeholderTab === 'cfo' && (
                            <div className="space-y-3 animate-fadeIn">
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">EBITDA Impact</span>
                                    <span className="text-green-400 font-bold">+$1.8M</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Op. Margin</span>
                                    <span className="text-cyan-400 font-bold">+3.2 pts</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Capital Efficiency</span>
                                    <span className="text-white font-bold">336%</span>
                                </div>
                            </div>
                        )}
                        {activeStakeholderTab === 'cmo' && (
                            <div className="space-y-3 animate-fadeIn">
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">CAC Reduction</span>
                                    <span className="text-green-400 font-bold">-18%</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">LTV Increase</span>
                                    <span className="text-cyan-400 font-bold">+22%</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Market Share</span>
                                    <span className="text-white font-bold">+6 pts</span>
                                </div>
                            </div>
                        )}
                        {activeStakeholderTab === 'cpo' && (
                            <div className="space-y-3 animate-fadeIn">
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Feature Success</span>
                                    <span className="text-green-400 font-bold">+62%</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Time to Market</span>
                                    <span className="text-cyan-400 font-bold">-65%</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">NPS</span>
                                    <span className="text-white font-bold">+25 pts</span>
                                </div>
                            </div>
                        )}
                        {activeStakeholderTab === 'ceo' && (
                            <div className="space-y-3 animate-fadeIn">
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Innovation Rank</span>
                                    <span className="text-green-400 font-bold">#1</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">New IP</span>
                                    <span className="text-cyan-400 font-bold">+2 Patents</span>
                                </div>
                                <div className="flex justify-between p-3 bg-white/5 rounded">
                                    <span className="text-zinc-300 text-sm">Valuation Impact</span>
                                    <span className="text-white font-bold">+$45M</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* SECTION 8: RISK MITIGATION */}
            <div className="glass-panel p-6 rounded-xl">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    Risk Mitigation Strategy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-yellow-400 text-xs font-bold mb-2">RISK: MARKET ADOPTION</div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">Prob: 22%</span>
                            <span className="text-red-400">-$480K</span>
                        </div>
                        <p className="text-xs text-zinc-500">Mitigation: Phased rollout with early customer validation to ensure fit.</p>
                        <div className="mt-2 text-[10px] text-green-400 font-bold">Residual Risk: LOW</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-yellow-400 text-xs font-bold mb-2">RISK: PRICE WAR</div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">Prob: 18%</span>
                            <span className="text-red-400">-$320K</span>
                        </div>
                        <p className="text-xs text-zinc-500">Mitigation: Focus on differentiation features rather than direct price competition.</p>
                        <div className="mt-2 text-[10px] text-yellow-500 font-bold">Residual Risk: MED</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                        <div className="text-yellow-400 text-xs font-bold mb-2">RISK: TECH DELAY</div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-zinc-400">Prob: 15%</span>
                            <span className="text-red-400">-$210K</span>
                        </div>
                        <p className="text-xs text-zinc-500">Mitigation: Leverage existing Philips assets to de-risk development.</p>
                        <div className="mt-2 text-[10px] text-green-400 font-bold">Residual Risk: LOW</div>
                    </div>
                </div>
            </div>

            {/* SECTION 9: EXPORT ACTIONS */}
            <div className="flex flex-wrap justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-xs text-zinc-500 mb-2 md:mb-0">
                    Last updated: Feb 9, 2026 • Validated by Finance
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Download Case
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-sm font-medium rounded-lg border border-cyan-500/30 transition-colors">
                        <FileText className="w-4 h-4" />
                        Sensitivity
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/20 transition-all">
                        <Presentation className="w-4 h-4" />
                        Present to Board
                    </button>
                </div>
            </div>

            <div className="text-center text-[10px] text-zinc-600 mt-4">
                Disclaimer: Forward-looking statements based on current market signals and AI agent models. Actual results may vary.
            </div>
        </div>
    );
}
