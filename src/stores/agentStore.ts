import { create } from 'zustand';
import type { Agent } from '../types';
import agentsData from '../data/agents.json';

interface AgentStore {
    agents: Agent[];
    updateAgentStatus: (id: string, status: Agent['status']) => void;
    updateAgentTask: (id: string, task: string | null) => void;
}

export const useAgentStore = create<AgentStore>((set) => ({
    agents: agentsData as Agent[],

    updateAgentStatus: (id, status) =>
        set((state) => ({
            agents: state.agents.map((agent) =>
                agent.id === id ? { ...agent, status } : agent
            ),
        })),

    updateAgentTask: (id, task) =>
        set((state) => ({
            agents: state.agents.map((agent) =>
                agent.id === id ? { ...agent, currentTask: task } : agent
            ),
        })),
}));
