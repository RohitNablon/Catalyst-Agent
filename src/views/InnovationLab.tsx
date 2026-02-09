import { useState } from 'react';
import {
    Sparkles, Zap, Shield, Mic, Eye, Heart, Clock, DollarSign,
    TrendingUp, Target, Play, ChevronDown, ChevronUp
} from 'lucide-react';
import { GlassPanel } from '@lego/components/primitives/GlassPanel';
import { Badge } from '@lego/components/primitives/Badge';
import innovationSimulators from '../data/innovationSimulators.json';
import innovationPipeline from '../data/innovationPipeline.json';

type SimulatorType = 'voice' | 'ar' | 'health' | null;

export default function InnovationLab() {
    const [senseIQValue, setSenseIQValue] = useState(5);
    const [activeSimulator, setActiveSimulator] = useState<SimulatorType>(null);
    const [voiceCommand, setVoiceCommand] = useState('stubble');
    const [arScenario, setArScenario] = useState('guidance');
    const [healthInsight, setHealthInsight] = useState('quality');
    const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());

    const voiceSim = innovationSimulators.find(s => s.type === 'voice');
    const arSim = innovationSimulators.find(s => s.type === 'ar');
    const healthSim = innovationSimulators.find(s => s.type === 'health');

    const toggleFeature = (id: string) => {
        const newExpanded = new Set(expandedFeatures);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedFeatures(newExpanded);
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Innovation Lab</h1>
                    <p className="text-zinc-400">Interactive feature simulators • Philips asset reuse • Edge-Cloud architecture</p>
                </div>

                {/* Interactive Simulators */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Interactive Feature Simulators</h2>

                    {/* Simulator Selection */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {/* SenseIQ (Original) */}
                        <button
                            onClick={() => setActiveSimulator(activeSimulator === null ? null : null)}
                            className={`p-4 rounded-lg border transition-all ${activeSimulator === null
                                ? 'bg-cyan-500/20 border-cyan-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <Zap className={`w-8 h-8 mb-2 ${activeSimulator === null ? 'text-cyan-400' : 'text-zinc-400'}`} />
                            <h3 className="text-sm font-semibold text-white mb-1">SenseIQ 2.0</h3>
                            <p className="text-xs text-zinc-500">Adaptive Blade</p>
                        </button>

                        {/* Voice Control */}
                        <button
                            onClick={() => setActiveSimulator(activeSimulator === 'voice' ? null : 'voice')}
                            className={`p-4 rounded-lg border transition-all ${activeSimulator === 'voice'
                                ? 'bg-purple-500/20 border-purple-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <Mic className={`w-8 h-8 mb-2 ${activeSimulator === 'voice' ? 'text-purple-400' : 'text-zinc-400'}`} />
                            <h3 className="text-sm font-semibold text-white mb-1">Voice Control</h3>
                            <p className="text-xs text-zinc-500">Hands-free AI</p>
                            <Badge color="purple" size="sm" className="mt-2">Tier 3</Badge>
                        </button>

                        {/* AR Mirror */}
                        <button
                            onClick={() => setActiveSimulator(activeSimulator === 'ar' ? null : 'ar')}
                            className={`p-4 rounded-lg border transition-all ${activeSimulator === 'ar'
                                ? 'bg-orange-500/20 border-orange-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <Eye className={`w-8 h-8 mb-2 ${activeSimulator === 'ar' ? 'text-orange-400' : 'text-zinc-400'}`} />
                            <h3 className="text-sm font-semibold text-white mb-1">AR Mirror</h3>
                            <p className="text-xs text-zinc-500">Visual Guidance</p>
                            <Badge color="orange" size="sm" className="mt-2">Tier 3</Badge>
                        </button>

                        {/* Skin Health */}
                        <button
                            onClick={() => setActiveSimulator(activeSimulator === 'health' ? null : 'health')}
                            className={`p-4 rounded-lg border transition-all ${activeSimulator === 'health'
                                ? 'bg-pink-500/20 border-pink-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                                }`}
                        >
                            <Heart className={`w-8 h-8 mb-2 ${activeSimulator === 'health' ? 'text-pink-400' : 'text-zinc-400'}`} />
                            <h3 className="text-sm font-semibold text-white mb-1">Skin Health</h3>
                            <p className="text-xs text-zinc-500">AI Monitoring</p>
                            <Badge color="pink" size="sm" className="mt-2">Tier 4</Badge>
                        </button>
                    </div>

                    {/* SenseIQ Simulator (Original - Default) */}
                    {activeSimulator === null && (
                        <GlassPanel className="p-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4">Adjust Skin Sensitivity</h4>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        value={senseIQValue}
                                        onChange={(e) => setSenseIQValue(Number(e.target.value))}
                                        className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="flex justify-between text-xs text-zinc-500 mt-2">
                                        <span>Soft</span>
                                        <span>Normal</span>
                                        <span>Coarse</span>
                                    </div>

                                    <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Zap className="w-5 h-5 text-cyan-400" />
                                            <h5 className="font-semibold text-white">AI Response</h5>
                                        </div>
                                        <p className="text-sm text-zinc-300">
                                            {senseIQValue <= 3
                                                ? "Reducing blade pressure by 40%. Perfect for sensitive skin."
                                                : senseIQValue <= 7
                                                    ? "Optimal pressure detected. Standard blade performance."
                                                    : "Increasing blade speed by 25% for efficient grooming on coarse hair."}
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <h5 className="text-sm font-semibold text-white mb-3">Philips Asset Reuse</h5>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                                                <Badge color="green" size="sm">Direct</Badge>
                                                <span className="text-xs text-zinc-300">Sonicare Pressure Sensor Tech</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-2 rounded bg-white/5">
                                                <Badge color="yellow" size="sm">Adapt</Badge>
                                                <span className="text-xs text-zinc-300">Lumea Skin Analysis Algorithm 4.1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4">Edge-Cloud Architecture</h4>
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Shield className="w-4 h-4 text-purple-400" />
                                                <h5 className="text-sm font-semibold text-white">Edge (Device)</h5>
                                            </div>
                                            <ul className="text-xs text-zinc-300 space-y-1 ml-6 list-disc">
                                                <li>Real-time pressure detection</li>
                                                <li>Immediate blade adjustment</li>
                                                <li>Safety cutoff logic</li>
                                            </ul>
                                        </div>

                                        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                                <h5 className="text-sm font-semibold text-white">Cloud (Learning)</h5>
                                            </div>
                                            <ul className="text-xs text-zinc-300 space-y-1 ml-6 list-disc">
                                                <li>Usage pattern learning</li>
                                                <li>Personalization model updates</li>
                                                <li>Aggregate insights</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                                        <h5 className="text-sm font-semibold text-white mb-2">Business Impact</h5>
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div>
                                                <p className="text-zinc-400">Estimated Cost</p>
                                                <p className="text-green-400 font-semibold">$600K</p>
                                            </div>
                                            <div>
                                                <p className="text-zinc-400">Development Time</p>
                                                <p className="text-green-400 font-semibold">8-10 months</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    )}

                    {/* Voice Control Simulator */}
                    {activeSimulator === 'voice' && voiceSim && (
                        <GlassPanel className="p-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                        <Mic className="w-4 h-4 text-purple-400" />
                                        {voiceSim.name}
                                    </h4>
                                    <p className="text-sm text-zinc-400 mb-6">{voiceSim.description}</p>

                                    <div className="space-y-3 mb-6">
                                        <h5 className="text-xs font-semibold text-zinc-400">Try a Command:</h5>
                                        {voiceSim.demoCommands.map((cmd, idx) => {
                                            const cmdKey = idx === 0 ? 'stubble' : idx === 1 ? 'formal' : idx === 2 ? 'touchup' : 'blade';
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setVoiceCommand(cmdKey)}
                                                    className={`w-full p-3 rounded-lg border text-left transition-all ${voiceCommand === cmdKey
                                                        ? 'bg-purple-500/20 border-purple-500'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Play className="w-3 h-3 text-purple-400" />
                                                        <span className="text-sm text-white">"{cmd}"</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Sparkles className="w-5 h-5 text-purple-400" />
                                            <h5 className="font-semibold text-white">AI Response</h5>
                                        </div>
                                        <p className="text-sm text-zinc-300">
                                            {voiceSim.responses[voiceCommand as keyof typeof voiceSim.responses]}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold text-white mb-4">Technical Specifications</h5>
                                    <div className="space-y-4">
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Edge Processing</div>
                                            <div className="text-sm text-white">{voiceSim.technicalSpec.edgeProcessing}</div>
                                        </div>
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Cloud Processing</div>
                                            <div className="text-sm text-white">{voiceSim.technicalSpec.cloudProcessing}</div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="p-3 rounded bg-white/5">
                                                <div className="text-xs text-zinc-400 mb-1">Languages</div>
                                                <div className="text-lg font-bold text-cyan-400">{voiceSim.technicalSpec.languages}</div>
                                            </div>
                                            <div className="p-3 rounded bg-white/5">
                                                <div className="text-xs text-zinc-400 mb-1">Accuracy</div>
                                                <div className="text-lg font-bold text-emerald-400">{voiceSim.technicalSpec.accuracy}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                                        <h6 className="text-sm font-semibold text-white mb-3">Philips Assets</h6>
                                        {voiceSim.philipsAssets.map((asset, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 mb-2">
                                                <span className="text-green-400">✓</span>
                                                {asset}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Cost</div>
                                            <div className="text-emerald-400 font-semibold">{voiceSim.businessImpact.cost}</div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Timeline</div>
                                            <div className="text-yellow-400 font-semibold">{voiceSim.businessImpact.timeline}</div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Validation</div>
                                            <div className="text-cyan-400 font-semibold">{voiceSim.marketValidation.score}/10</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    )}

                    {/* AR Mirror Simulator */}
                    {activeSimulator === 'ar' && arSim && (
                        <GlassPanel className="p-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-orange-400" />
                                        {arSim.name}
                                    </h4>
                                    <p className="text-sm text-zinc-400 mb-6">{arSim.description}</p>

                                    <div className="space-y-3 mb-6">
                                        <h5 className="text-xs font-semibold text-zinc-400">AR Scenarios:</h5>
                                        {arSim.features.map((feature, idx) => {
                                            const scenarioKey = idx === 0 ? 'guidance' : idx === 1 ? 'missed' : idx === 2 ? 'preview' : 'timeline';
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setArScenario(scenarioKey)}
                                                    className={`w-full p-3 rounded-lg border text-left transition-all ${arScenario === scenarioKey
                                                        ? 'bg-orange-500/20 border-orange-500'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <span className="text-sm text-white">{feature}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Eye className="w-5 h-5 text-orange-400" />
                                            <h5 className="font-semibold text-white">AR Display</h5>
                                        </div>
                                        <p className="text-sm text-zinc-300">
                                            {arSim.scenarios[arScenario as keyof typeof arSim.scenarios]}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold text-white mb-4">Technical Specifications</h5>
                                    <div className="space-y-4">
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Edge Processing</div>
                                            <div className="text-sm text-white">{arSim.technicalSpec.edgeProcessing}</div>
                                        </div>
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Cloud Processing</div>
                                            <div className="text-sm text-white">{arSim.technicalSpec.cloudProcessing}</div>
                                        </div>
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Hardware</div>
                                            <div className="text-sm text-white">{arSim.technicalSpec.hardware}</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                                        <h6 className="text-sm font-semibold text-white mb-3">Philips Assets</h6>
                                        {arSim.philipsAssets.map((asset, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 mb-2">
                                                <span className="text-green-400">✓</span>
                                                {asset}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Cost</div>
                                            <div className="text-emerald-400 font-semibold">{arSim.businessImpact.cost}</div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Timeline</div>
                                            <div className="text-yellow-400 font-semibold">{arSim.businessImpact.timeline}</div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Validation</div>
                                            <div className="text-cyan-400 font-semibold">{arSim.marketValidation.score}/10</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    )}

                    {/* Health Monitor Simulator */}
                    {activeSimulator === 'health' && healthSim && (
                        <GlassPanel className="p-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-pink-400" />
                                        {healthSim.name}
                                    </h4>
                                    <p className="text-sm text-zinc-400 mb-6">{healthSim.description}</p>

                                    <div className="space-y-3 mb-6">
                                        <h5 className="text-xs font-semibold text-zinc-400">Monitoring Capabilities:</h5>
                                        {healthSim.capabilities.map((capability, idx) => {
                                            const insightKey = idx === 0 ? 'irregularity' : idx === 1 ? 'quality' : idx === 2 ? 'risk' : 'health';
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => setHealthInsight(insightKey)}
                                                    className={`w-full p-3 rounded-lg border text-left transition-all ${healthInsight === insightKey
                                                        ? 'bg-pink-500/20 border-pink-500'
                                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        }`}
                                                >
                                                    <span className="text-sm text-white">{capability}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Heart className="w-5 h-5 text-pink-400" />
                                            <h5 className="font-semibold text-white">Health Insight</h5>
                                        </div>
                                        <p className="text-sm text-zinc-300">
                                            {healthSim.insights[healthInsight as keyof typeof healthSim.insights]}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold text-white mb-4">Medical-Grade Technology</h5>
                                    <div className="space-y-4">
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Edge Processing</div>
                                            <div className="text-sm text-white">{healthSim.technicalSpec.edgeProcessing}</div>
                                        </div>
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Cloud Processing</div>
                                            <div className="text-sm text-white">{healthSim.technicalSpec.cloudProcessing}</div>
                                        </div>
                                        <div className="p-3 rounded bg-white/5">
                                            <div className="text-xs text-zinc-400 mb-1">Sensors</div>
                                            <div className="text-sm text-white">{healthSim.technicalSpec.sensors}</div>
                                        </div>
                                        <div className="p-3 rounded bg-green-500/10 border border-green-500/30">
                                            <div className="text-xs text-zinc-400 mb-1">Accuracy</div>
                                            <div className="text-sm font-bold text-emerald-400">{healthSim.technicalSpec.accuracy}</div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
                                        <h6 className="text-sm font-semibold text-white mb-3">Philips Healthcare Assets</h6>
                                        {healthSim.philipsAssets.map((asset, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 mb-2">
                                                <span className="text-green-400">✓</span>
                                                {asset}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Investment</div>
                                            <div className="text-pink-400 font-semibold">{healthSim.businessImpact.cost}</div>
                                        </div>
                                        <div className="p-2 bg-white/5 rounded text-center">
                                            <div className="text-zinc-400">Timeline</div>
                                            <div className="text-yellow-400 font-semibold">{healthSim.businessImpact.timeline}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassPanel>
                    )}
                </div>

                {/* Innovation Pipeline Gallery */}
                <div className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white">Innovation Pipeline</h2>
                        <div className="flex items-center gap-2">
                            <Badge color="cyan">Tier 1-4</Badge>
                            <span className="text-sm text-zinc-400">{innovationPipeline.length} Features</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {innovationPipeline.map((feature) => (
                            <GlassPanel key={feature.id} className="p-5">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge color={
                                                feature.tier === 1 ? 'cyan' :
                                                    feature.tier === 2 ? 'purple' :
                                                        feature.tier === 3 ? 'orange' : 'pink'
                                            } size="sm">
                                                Tier {feature.tier}
                                            </Badge>
                                            <Badge color="gray" size="sm">{feature.readiness}</Badge>
                                        </div>
                                        <h3 className="text-md font-semibold text-white">{feature.title}</h3>
                                    </div>
                                    <button
                                        onClick={() => toggleFeature(feature.id)}
                                        className="text-zinc-400 hover:text-white transition-colors"
                                    >
                                        {expandedFeatures.has(feature.id) ?
                                            <ChevronUp className="w-5 h-5" /> :
                                            <ChevronDown className="w-5 h-5" />
                                        }
                                    </button>
                                </div>

                                <p className="text-sm text-zinc-400 mb-4">{feature.capability}</p>

                                <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                                    <div className="p-2 bg-white/5 rounded text-center">
                                        <div className="text-zinc-500">Market</div>
                                        <div className="text-cyan-400 font-bold">{feature.marketValidation.score}/10</div>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded text-center">
                                        <div className="text-zinc-500">Technical</div>
                                        <div className="text-emerald-400 font-bold">{feature.technicalFeasibility}/10</div>
                                    </div>
                                    <div className="p-2 bg-white/5 rounded text-center">
                                        <div className="text-zinc-500">Signals</div>
                                        <div className="text-yellow-400 font-bold">{feature.marketValidation.signalCount}</div>
                                    </div>
                                </div>

                                {expandedFeatures.has(feature.id) && (
                                    <div className="pt-4 border-t border-white/10 space-y-3">
                                        {/* Philips Assets */}
                                        <div>
                                            <h5 className="text-xs font-semibold text-zinc-400 mb-2">Philips Assets</h5>
                                            <div className="space-y-1">
                                                {feature.philipsAssets.map((asset: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                                                        <span className="text-green-400">✓</span>
                                                        {asset}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Market Insight */}
                                        <div className="p-3 bg-white/5 rounded">
                                            <div className="text-xs text-zinc-400 mb-1">Key Insight</div>
                                            <div className="text-sm text-white">{feature.marketValidation.keyInsight}</div>
                                        </div>

                                        {/* Edge/Cloud */}
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/30">
                                                <div className="text-xs font-semibold text-cyan-400 mb-1">Edge</div>
                                                <div className="text-xs text-zinc-300">{feature.edgeCloudSplit.edge}</div>
                                            </div>
                                            <div className="p-2 bg-purple-500/10 rounded border border-purple-500/30">
                                                <div className="text-xs font-semibold text-purple-400 mb-1">Cloud</div>
                                                <div className="text-xs text-zinc-300">{feature.edgeCloudSplit.cloud}</div>
                                            </div>
                                        </div>

                                        {/* Business Impact */}
                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="w-3 h-3 text-emerald-400" />
                                                <span className="text-emerald-400 font-semibold">{feature.investment}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-yellow-400" />
                                                <span className="text-yellow-400 font-semibold">{feature.developmentTime}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </GlassPanel>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
