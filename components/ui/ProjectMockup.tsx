interface ProjectMockupProps {
  variant: "dashboard" | "feed" | "table";
  gradient: [string, string];
  accent: string;
  label: string;
  image?: string;
}

function DashboardMock({ accent }: { accent: string }) {
  return (
    <div className="grid h-full grid-cols-[2.5rem_1fr] gap-3">
      <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface/60 p-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="size-6 rounded-lg"
            style={{
              background: i === 0 ? accent : "var(--color-surface-2)",
              opacity: i === 0 ? 0.9 : 0.6,
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-5 w-1/2 rounded-md bg-surface-2/80" />
        <div className="grid flex-1 grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-2 rounded-xl border border-border bg-surface/70 p-3"
            >
              <div className="h-2.5 w-3/4 rounded bg-surface-2" />
              <div className="h-2 w-1/2 rounded bg-surface-2/70" />
              <div className="mt-auto h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${40 + i * 15}%`, background: accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-3">
        <div className="size-9 shrink-0 rounded-full" style={{ background: accent, opacity: 0.85 }} />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 w-1/3 rounded bg-surface-2" />
          <div className="h-2 w-1/4 rounded bg-surface-2/70" />
        </div>
      </div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="flex-1 space-y-2.5 rounded-xl border border-border bg-surface/70 p-3"
        >
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-surface-2" />
            <div className="h-2 w-1/4 rounded bg-surface-2" />
          </div>
          <div className="h-2 w-full rounded bg-surface-2/70" />
          <div className="h-2 w-4/5 rounded bg-surface-2/70" />
        </div>
      ))}
    </div>
  );
}

function TableMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-surface/70 p-3">
            <div className="h-2 w-1/2 rounded bg-surface-2/70" />
            <div
              className="mt-2 h-4 w-2/3 rounded"
              style={{ background: i === 1 ? accent : "var(--color-surface-2)", opacity: i === 1 ? 0.85 : 1 }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 space-y-2.5 rounded-xl border border-border bg-surface/70 p-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="size-2 shrink-0 rounded-full" style={{ background: accent }} />
            <div className="h-2 flex-1 rounded bg-surface-2/70" />
            <div className="h-2 w-10 rounded bg-surface-2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProjectMockup({ variant, gradient, accent, label, image }: ProjectMockupProps) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/40 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/10" />
          <span className="size-2.5 rounded-full bg-foreground/10" />
          <span className="size-2.5 rounded-full bg-foreground/10" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-full bg-surface px-3 py-1 text-center text-xs text-muted-2">
          {label}
        </div>
      </div>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={label}
          className="h-full w-full flex-1 object-cover object-top"
        />
      ) : (
        <div
          className="relative flex-1 p-5"
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}1f, ${gradient[1]}1f)`,
          }}
        >
          {variant === "dashboard" && <DashboardMock accent={accent} />}
          {variant === "feed" && <FeedMock accent={accent} />}
          {variant === "table" && <TableMock accent={accent} />}
        </div>
      )}
    </div>
  );
}
