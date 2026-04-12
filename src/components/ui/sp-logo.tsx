"use client";

interface SPLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { sp: "text-lg", group: "text-[8px]", gap: "gap-0" },
  md: { sp: "text-2xl", group: "text-xs", gap: "gap-0.5" },
  lg: { sp: "text-4xl", group: "text-sm", gap: "gap-1" },
};

export function SPLogo({ size = "md", className = "" }: SPLogoProps) {
  const s = sizes[size];
  return (
    <div className={`flex flex-col items-center ${s.gap} ${className}`}>
      <span className={`${s.sp} font-black tracking-tight text-sp-brand leading-none`}>
        SP
      </span>
      <span className={`${s.group} font-medium text-muted-foreground tracking-widest uppercase leading-none`}>
        Group
      </span>
    </div>
  );
}
