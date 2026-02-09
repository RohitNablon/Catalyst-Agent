
import { cn } from "@/lib/utils";
import React from "react";

type BadgeColor = "default" | "cyan" | "green" | "red" | "yellow" | "purple" | "gray" | "orange";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
    color?: BadgeColor | string; // Allow string for flexibility based on usage
    size?: BadgeSize;
    className?: string;
}

const colorVariants: Record<string, string> = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    gray: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const sizeVariants: Record<BadgeSize, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
};

export function Badge({
    children,
    color = "default",
    size = "md",
    className,
    ...props
}: BadgeProps) {
    // safe fallback for color
    const colorClass = colorVariants[color as string] || colorVariants.default;
    const sizeClass = sizeVariants[size];

    return (
        <span
            className={cn(
                "inline-flex items-center justify-center font-medium rounded-full border transition-colors",
                colorClass,
                sizeClass,
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}
