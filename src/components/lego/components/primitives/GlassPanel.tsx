
import { cn } from "@/lib/utils";
import React from "react";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
    return (
        <div
            className={cn(
                "bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
