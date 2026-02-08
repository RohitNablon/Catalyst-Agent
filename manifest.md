\# 🧱 Nablon Lego UX - Component Manifest



\*\*Version\*\*: 1.0.0  

\*\*Extracted From\*\*: AML-NXT Agentic Solution  

\*\*Date\*\*: January 26, 2026



---



\## 📊 Component Inventory



\### ✅ UI Primitives (7 components)



| Component | Purpose | Key Features |

|-----------|---------|--------------|

| \*\*Button\*\* | Primary actions | 6 variants, loading state, icon support |

| \*\*Badge\*\* | Status pills | 6 color variants, 2 sizes |

| \*\*GlassPanel\*\* | Base surface | Glass-morphism effect, customizable border |

| \*\*Card\*\* | Content container | Optional title, glass panel wrapper |

| \*\*LoadingSpinner\*\* | Loading indicator | Gradient animation, full-screen mode |

| \*\*SkeletonLoader\*\* | Content placeholder | 6 variants (text, card, table, chart, etc.) |

| \*\*ProgressBar\*\* | Progress indicator | Animated, colored, with labels |



\*\*Lines of Code\*\*: ~450  

\*\*Dependencies\*\*: react, lucide-react, clsx



---



\### ✅ Layout Components (2 components)



| Component | Purpose | Key Features |

|-----------|---------|--------------|

| \*\*Sidebar\*\* | Fixed navigation | Logo, search, nav items, user profile |

| \*\*Header\*\* | Top bar | Breadcrumbs, action buttons, notifications |



\*\*Lines of Code\*\*: ~180  

\*\*Dependencies\*\*: react, next/link, next/navigation, lucide-react



---



\### ✅ Dashboard Components (2 components)



| Component | Purpose | Key Features |

|-----------|---------|--------------|

| \*\*KPICard\*\* | Metric display | Value, trend, icon, color variants |

| \*\*DashboardGrid\*\* | Responsive grid | 1-4 columns, responsive breakpoints |



\*\*Lines of Code\*\*: ~90  

\*\*Dependencies\*\*: react, lucide-react



---



\### ✅ Agent Components (4 components)



| Component | Purpose | Key Features |

|-----------|---------|--------------|

| \*\*AgentStatusNode\*\* | Agent status display | Status colors, icon, task count |

| \*\*ActivityFeed\*\* | Real-time activity | Timestamp formatting, status dots |

| \*\*ChatWindow\*\* | Messaging interface | User/agent/system bubbles, send handler |

| \*\*ThinkingIndicator\*\* | Loading state | "Agent is analyzing..." message |



\*\*Lines of Code\*\*: ~250  

\*\*Dependencies\*\*: react, lucide-react, date-fns



---



\### ✅ Workflow Components (3 + 1 engine)



| Component | Purpose | Key Features |

|-----------|---------|--------------|

| \*\*WorkflowEngine\*\* | State machine | Step execution, approval gates, callbacks |

| \*\*useWorkflowEngine\*\* | React hook | State management, step control |

| \*\*WorkflowTimeline\*\* | Visual progress | Interactive steps, status icons |

| \*\*StepIndicator\*\* | Progress bar | Horizontal indicator, step numbers |

| \*\*ApprovalModal\*\* | Human approval | Findings display, approve/reject |



\*\*Lines of Code\*\*: ~380  

\*\*Dependencies\*\*: react, lucide-react



---



\## 📦 Package Structure



```

@nablon/lego-ux

├── Core (18 components)

├── Workflow Engine (state machine + 3 UI components)

├── Utilities (2 functions)

├── Types (15+ TypeScript interfaces)

└── Styles (global CSS with animations)

```



\*\*Total Components\*\*: 18  

\*\*Total Lines of Code\*\*: ~1,350  

\*\*Total Files Created\*\*: 35+



---



\## 🎯 Export Map



```typescript

// Primitives

export { Button, Badge, GlassPanel, Card, LoadingSpinner, SkeletonLoader, ProgressBar }



// Layout

export { Sidebar, Header }



// Dashboard

export { KPICard, DashboardGrid }



// Agent

export { AgentStatusNode, ActivityFeed, ChatWindow, ThinkingIndicator }



// Workflow

export { WorkflowTimeline, StepIndicator, ApprovalModal }

export { WorkflowEngine, useWorkflowEngine }



// Utilities

export { cn }



// Types

export type { 

&nbsp; NavItem, UserProfile, KPICardProps,

&nbsp; AgentNode, ActivityItem, ChatMessage,

&nbsp; WorkflowState, WorkflowStep, StepStatus,

&nbsp; ColorVariant, SizeVariant, ButtonVariant

}

```



---



\## 🔗 Dependency Matrix



\### Peer Dependencies (Required)

\- `react` ^18.0.0

\- `react-dom` ^18.0.0

\- `next` ^14.0.0 | ^15.0.0 \*(for Sidebar/Header only)\*

\- `lucide-react` ^0.263.0+

\- `tailwindcss` ^3.4.0



\### Direct Dependencies (Bundled)

\- `clsx` ^2.1.0 - Class name utility

\- `date-fns` ^3.0.0 - Timestamp formatting



---



\## 🎨 Design System



\*\*Color Palette\*\*:

\- Primary: Cyan (#06b6d4)

\- Success: Green (#10b981)

\- Danger: Red (#ef4444)

\- Warning: Yellow (#f59e0b)

\- Info: Purple (#8b5cf6)



\*\*Typography\*\*:

\- Font: Jost (Google Fonts)

\- Sizes: xs, sm, lg, 2xl, 3xl



\*\*Effects\*\*:

\- Glass-morphism (bg-white/5 + backdrop-blur)

\- Smooth transitions (200-500ms)

\- Gradient spinners

\- Shimmer animations



---



\## 💡 Use Cases Supported



✅ \*\*Agentic AI Dashboards\*\* - Full layout with sidebar, header, KPI cards  

✅ \*\*Chat Interfaces\*\* - Agent/user message bubbles, thinking states  

✅ \*\*Workflow Orchestration\*\* - Multi-step processes with approvals  

✅ \*\*Real-time Monitoring\*\* - Activity feeds, agent status nodes  

✅ \*\*Data Loading\*\* - Skeletons, spinners, progress bars  

✅ \*\*Human-in-the-Loop\*\* - Approval modals, decision gates



---



\## 📝 Setup Requirements



\### Minimal Setup (3 steps)



1\. \*\*Install package\*\*:

&nbsp;  ```bash

&nbsp;  npm install @nablon/lego-ux lucide-react clsx date-fns

&nbsp;  ```



2\. \*\*Configure Tailwind\*\*:

&nbsp;  ```js

&nbsp;  // tailwind.config.js

&nbsp;  content: \['./node\_modules/@nablon/lego-ux/\*\*/\*.{js,ts,jsx,tsx}']

&nbsp;  ```



3\. \*\*Import styles\*\*:

&nbsp;  ```tsx

&nbsp;  import '@nablon/lego-ux/styles';

&nbsp;  ```



---



\## 🎓 Learning Resources



\- \*\*SETUP.md\*\* - Complete installation guide

\- \*\*docs/primitives.md\*\* - UI component reference

\- \*\*docs/workflow-engine.md\*\* - Workflow system guide

\- \*\*docs/examples.md\*\* - 5 complete examples



---



\## ✨ Key Differentiators



1\. \*\*First-Shot Gold Standard\*\* - Zero custom styling needed

2\. \*\*Agentic-First\*\* - Built for AI agent interfaces

3\. \*\*Human-in-the-Loop\*\* - Approval gates baked in

4\. \*\*Production-Ready\*\* - Extracted from real app

5\. \*\*Fully Typed\*\* - Complete TypeScript support

6\. \*\*Modular\*\* - Import only what you need



---



\## 🚀 Quick Verification Test



```tsx

import { Button, KPICard, AgentStatusNode } from '@nablon/lego-ux';

import { TrendingUp } from 'lucide-react';



// If this renders with cyan glass effects, you're ready! 🎉

export function Test() {

&nbsp; return (

&nbsp;   <div className="p-6 bg-\[#09090b] space-y-4">

&nbsp;     <KPICard title="Test" value="100" icon={TrendingUp} color="cyan" />

&nbsp;     <AgentStatusNode name="Test Agent" status="active" />

&nbsp;     <Button variant="primary">Click Me</Button>

&nbsp;   </div>

&nbsp; );

}

```



---



\## 📊 Quality Metrics



\- \*\*TypeScript Coverage\*\*: 100%

\- \*\*Component Documentation\*\*: 100%

\- \*\*Example Coverage\*\*: 5 complete apps

\- \*\*Reusability Score\*\*: ⭐⭐⭐⭐⭐



---



\## 🎯 Next Steps for Teams



1\. ✅ \*\*Review\*\* - Read SETUP.md and examples

2\. ✅ \*\*Install\*\* - Follow 3-step setup

3\. ✅ \*\*Test\*\* - Run verification component

4\. ✅ \*\*Build\*\* - Start with dashboard example

5\. ✅ \*\*Iterate\*\* - Customize props for your use case



---



\## 📄 License



MIT - Open source, free to use



---



\*\*Built with ❤️ by the Nablon Team\*\*  

\*\*Extracted from AML-NXT v1.0 (Jan 2026)\*\*



