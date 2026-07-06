import Marquee from "@/components/ui/marquee";
import proofData from "@/data/proof.json";

export default function ProofStrip() {
  return (
    <div className="border-y py-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
      <Marquee
        pauseOnHover
        className="motion-reduce:hidden [--duration:35s] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        {proofData.items.map((item) => (
          <span key={item} className="flex shrink-0 items-center gap-x-[--gap]">
            {item}
            <span aria-hidden="true" className="select-none text-border">
              ·
            </span>
          </span>
        ))}
      </Marquee>

      {/* Static fallback for prefers-reduced-motion */}
      <ul className="flex flex-col flex-wrap gap-x-3 gap-y-2 motion-safe:hidden sm:flex-row sm:items-center">
        {proofData.items.map((item, i) => (
          <li key={item} className="flex items-center gap-x-3">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden select-none text-border sm:inline"
              >
                ·
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
