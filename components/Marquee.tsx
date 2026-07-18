"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  separator?: string;
};

const Marquee = ({ items, className, separator = "//" }: MarqueeProps) => {
  const row = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-8 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-phosphor/60">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden border-y border-border py-3",
        className
      )}
    >
      <div className="animate-marquee flex w-max motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
};

export default Marquee;
