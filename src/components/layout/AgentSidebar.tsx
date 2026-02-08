import { Activity, Brain, Radar, Shield, Sparkles, ChevronLeft, ChevronRight, Database, CheckCircle2 } from 'lucide-react';
import { useAgentStore } from '../../stores/agentStore';
import { useState } from 'react';
// Import Lego components
import { AgentStatusNode } from '@lego/components/agent/AgentStatusNode';
import Navigation from './Navigation';

const agentIcons = {
    'Voice of Customer Agent': Activity,
    'Trend Radar Agent': Radar,
    'Competitive Scout Agent': Shield,
    'Feature Prioritization Agent': Brain,
    'Feature Validation Agent': Sparkles,
};

interface AgentSidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

export default function AgentSidebar({ isCollapsed, onToggle }: AgentSidebarProps) {
    const { agents } = useAgentStore();
    const [showDataSources, setShowDataSources] = useState(false);

    return (
        <div className={`fixed left-0 top-16 bottom-0 bg-zinc-950 border-r border-white/10 overflow-hidden transition-all duration-300 z-10 ${isCollapsed ? 'w-16' : 'w-72'}`}>
            {/* Collapse Toggle Button - Top Position */}
            <div className="sticky top-0 z-20 bg-zinc-950 border-b border-white/10">
                <button
                    onClick={onToggle}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-4 py-3 hover:bg-white/5 transition-colors text-zinc-400 hover:text-white`}
                    aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                    {!isCollapsed && <span className="text-sm font-medium">Collapse Menu</span>}
                    {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            {/* Content Wrapper with Scroll */}
            <div className="h-full overflow-y-auto flex flex-col">
                {!isCollapsed && (
                    <>
                        {/* Connected Data Sources - Top Section */}
                        <div className="p-4 border-b border-white/10">
                            <button
                                onClick={() => setShowDataSources(!showDataSources)}
                                className="w-full flex items-center justify-between text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Database className="w-4 h-4" />
                                    <span>Data Sources</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                                        {agents[0]?.connectedSources.length || 3} connected
                                    </span>
                                    {showDataSources ? <ChevronRight className="w-3 h-3 transform rotate-90" /> : <ChevronRight className="w-3 h-3" />}
                                </div>
                            </button>

                            {showDataSources && (
                                <div className="mt-3 space-y-2 animate-slideDown">
                                    {agents[0]?.connectedSources.map((source, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 rounded px-2 py-1.5">
                                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                                            <span>{source}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {/* Navigation */}
                <Navigation isCollapsed={isCollapsed} />

                {!isCollapsed && (
                    <>
                        {/* AI Agents Header */}
                        <div className="p-4 border-b border-white/10">
                            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide">AI Agents</h2>
                            <p className="text-xs text-zinc-500 mt-1">Autonomous Intelligence</p>
                        </div>

                        {/* Agent List */}
                        <div className="p-4 space-y-3 flex-1">
                            {agents.map((agent) => {
                                const Icon = agentIcons[agent.name];

                                return (
                                    <AgentStatusNode
                                        key={agent.id}
                                        name={agent.name}
                                        status={agent.status}
                                        icon={Icon}
                                        taskCount={agent.tasksCompleted}
                                        metadata={agent.currentTask || undefined}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
