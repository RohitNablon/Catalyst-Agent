// Core types for Catalyst AI - OneBlade Use Case

export type Signal = {
    id: string;
    platform: 'amazon' | 'reddit' | 'youtube' | 'tiktok' | 'instagram';
    content: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    sentimentScore: number; // -1 to 1
    category: string;
    timestamp: string;
    volume: number;
    priority: 'p0' | 'p1' | 'p2' | 'p3';
    relatedFeature?: string;
}

export type Competitor = {
    id: string;
    name: string;
    marketPosition: {
        x: number; // Innovation score
        y: number; // Market share
        size: number; // Revenue/company size
    };
    features: {
        [key: string]: boolean | 'planned' | 'unknown';
    };
    pricing: number;
    recentActivity?: string[];
}

export type Feature = {
    id: string;
    name: string;
    description: string;
    tier: 1 | 2 | 3 | 4; // Immediate, Quarterly, Horizon 3, Innovation
    signalStrength: number; // 0-10
    philipsAssets?: {
        asset: string;
        source: string; // e.g., "Sonicare", "Lumea"
        reusability: 'direct' | 'adaptation' | 'inspiration';
    }[];
    edgeCloudSplit?: {
        edge: string[];
        cloud: string[];
    };
    estimatedCost?: string;
    estimatedROI?: string;
    validationEvidence: string[];
    status: 'ideation' | 'validated' | 'in-development' | 'shipped';
}

export type Trend = {
    id: string;
    name: string;
    description: string;
    momentum: 'rising' | 'stable' | 'declining';
    impactScore: number; // 0-10
    relatedSignals: string[];
    timeDetected: string;
}

export type Agent = {
    id: string;
    name: 'Voice of Customer Agent' | 'Trend Radar Agent' | 'Competitive Scout Agent' | 'Feature Prioritization Agent' | 'Feature Validation Agent';
    description: string;
    status: 'active' | 'idle' | 'processing' | 'error';
    connectedSources: string[];
    tasksCompleted: number;
    currentTask?: string;
}

export type RoadmapItem = {
    id: string;
    featureId: string;
    title: string;
    description: string;
    horizon: 'immediate' | 'quarterly' | 'innovation';
    quarter?: string; // e.g., "Q2 2024"
    priority: 'p0' | 'p1' | 'p2';
    signalSources: string[];
    approvalStatus: 'pending' | 'approved' | 'rejected';
    estimatedEffort: string;
}

export type ActivityLog = {
    id: string;
    agentId: string;
    timestamp: string;
    action: string;
    status: 'success' | 'info' | 'warning' | 'error';
    metadata?: Record<string, unknown>;
}

export type KPI = {
    marketSentiment: number; // 0-10
    innovationReadiness: number; // percentage
    competitiveGap: number; // gap score
    customerSatisfaction: number; // 0-10
}
