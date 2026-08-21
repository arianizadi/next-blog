export function BlogIndexHeader() {
  return (
    <header>
      <p className="font-serif text-lg italic text-muted-foreground md:text-xl">
        Writing
      </p>
      <h1 className="mt-6 max-w-4xl text-statement font-light text-foreground">
        Notes from the workbench<span className="text-accent">.</span>
      </h1>
      <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
        Engineering notes on embedded systems, security, research, and the
        occasional detour.
      </p>
    </header>
  );
}
