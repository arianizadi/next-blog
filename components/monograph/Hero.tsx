import { MaskedLine, Plate, Rise } from "@/components/monograph/motion";
import { TechnicalObject } from "@/components/monograph/TechnicalObject";

/**
 * Opening spread of the monograph: one enormous thin statement paired with
 * one giant rounded monochrome media plate.
 */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative px-5 pb-24 pt-28 md:px-10 md:pb-36 md:pt-40"
    >
      <div className="mx-auto max-w-[1500px]">
        <Rise>
          <p className="font-serif text-base italic tracking-wide text-muted-foreground md:text-lg">
            Arian Izadi — Embedded Software Engineer II, Konami Gaming,&nbsp;Inc.
          </p>
        </Rise>

        <h1 className="mt-8 text-mega font-light text-foreground md:mt-10">
          <MaskedLine delay={0.05}>Embedded systems,</MaskedLine>
          <MaskedLine delay={0.16}>built close to</MaskedLine>
          <MaskedLine delay={0.27}>
            the machine<span className="text-accent">.</span>
          </MaskedLine>
        </h1>

        <Rise delay={0.35} className="relative z-10 mt-8 max-w-xl md:-mb-16 md:mt-10">
          <p className="text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            Production C/C++ for embedded hardware — Linux, real-time control,
            and networking that has to hold up under constraint.
          </p>
        </Rise>

        <Plate
          className="mt-10 h-[64vh] min-h-[380px] w-full rounded-[28px] md:-mt-4 md:h-[70vh] md:max-h-[760px] md:min-h-[520px] md:rounded-[40px]"
          delay={0.1}
        >
          <TechnicalObject kind="keyboard" idPrefix="hero" />
        </Plate>

        <Rise
          delay={0.15}
          className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2"
        >
          <p className="font-serif text-sm italic text-muted-foreground md:text-base">
            Fig. 01 — Hardware, treated as a designed object.
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground md:text-sm">
            C/C++ · Linux · Real-time systems
          </p>
        </Rise>
      </div>
    </section>
  );
}
