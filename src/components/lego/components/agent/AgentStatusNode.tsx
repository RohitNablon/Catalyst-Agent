import { cn } from '@/lib/utils';
import { LucideIcon, Brain, CheckCircle2, Clock, PlayCircle, PauseCircle } from 'lucide-react';

export type AgentStatus = 'idle' | 'thinking' | 'working' | 'paused' | 'completed' | 'failed';

interface AgentStatusNodeProps {
    name: string;
    status: AgentStatus | string;
    icon: LucideIcon;
    taskCount?: number;
    metadata?: any;
    className?: string;
    onClick?: () => void;
}

const statusConfig: Record<string, { color: string; icon: LucideIcon; label: string }> = {
    idle: { color: 'text-zinc-500', icon: Clock, label: 'Idle' },
    thinking: { color: 'text-purple-400', icon: Brain, label: 'Thinking' },
    working: { color: 'text-cyan-400', icon: PlayCircle, label: 'Working' },
    paused: { color: 'text-yellow-400', icon: PauseCircle, label: 'Paused' },
    completed: { color: 'text-green-400', icon: CheckCircle2, label: 'Completed' },
    failed: { color: 'text-red-400', icon: CheckCircle2, label: 'Failed' }, // Using CheckCircle2 for now as fallback
};

export function AgentStatusNode({
    name,
    status,
    icon: Icon,
    taskCount = 0,
    metadata,
    className,
    onClick
}: AgentStatusNodeProps) {
    const config = statusConfig[status as string] || statusConfig.idle;
    const StatusIcon = config.icon;

    return (
        <div
            onClick={onClick}
            className={cn(
                "p-3 rounded-lg border bg-white/5 border-white/10 hover:bg-white/10 transition-all cursor-pointer group",
                className
            )}
        >
            <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-md bg-white/5", config.color)}>
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-white truncate pr-2">{name}</h3>
                        {taskCount > 0 && (
                            <span className="text-xs text-zinc-500 bg-white/10 px-1.5 py-0.5 rounded-full">
                                {taskCount}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 text-xs">
                        <StatusIcon className={cn("w-3 h-3", config.color)} />
                        <span className={cn("font-medium", config.color)}>
                            {config.label}
                        </span>
                    </div>

                    {metadata && (
                        <div className="mt-2 text-xs text-zinc-400 truncate border-t border-white/5 pt-2">
                            {metadata.description || JSON.stringify(metadata)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
