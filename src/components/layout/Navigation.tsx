import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GitBranch, Swords, Lightbulb, Radar, CalendarDays } from 'lucide-react';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/product-action-center', icon: GitBranch, label: 'Product Action Center' },
    { path: '/competitive', icon: Swords, label: 'Competitive' },
    { path: '/innovation', icon: Lightbulb, label: 'Innovation' },
    { path: '/trends', icon: Radar, label: 'Trend Radar' },
    { path: '/roadmap', icon: CalendarDays, label: 'Roadmap' },
];

interface NavigationProps {
    isCollapsed: boolean;
}

export default function Navigation({ isCollapsed }: NavigationProps) {
    return (
        <nav className="p-4 border-b border-white/10">
            <div className="space-y-1">
                {navItems.map(item => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            title={isCollapsed ? item.label : undefined}
                            className={({ isActive }) =>
                                `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition-all ${isActive
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            {!isCollapsed && <span className="font-medium">{item.label}</span>}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
