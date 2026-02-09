import { create } from 'zustand';
import type { Signal, Competitor, Feature, Trend } from '../types';
import signalsData from '../data/signals.json';
import competitorsData from '../data/competitors.json';
import featuresData from '../data/features.json';
import trendsData from '../data/trends.json';

interface DataStore {
    signals: Signal[];
    competitors: Competitor[];
    features: Feature[];
    trends: Trend[];
}

export const useDataStore = create<DataStore>(() => ({
    signals: signalsData as Signal[],
    competitors: competitorsData as Competitor[],
    features: featuresData as Feature[],
    trends: trendsData as Trend[],
}));
