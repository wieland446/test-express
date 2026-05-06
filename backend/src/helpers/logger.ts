type Level = "info" | "warn" | "error";

function log(level: Level, message: string, meta?: unknown): void {
  const entry: Record<string, unknown> = {
    time: new Date().toISOString(),
    level,
    message,
  };
  if (meta !== undefined) entry.meta = meta;
  const out = JSON.stringify(entry);
  if (level === "error") {
    console.error(out);
  } else if (level === "warn") {
    console.warn(out);
  } else {
    console.log(out);
  }
}

export const logger = {
  info: (message: string, meta?: unknown) => log("info", message, meta),
  warn: (message: string, meta?: unknown) => log("warn", message, meta),
  error: (message: string, meta?: unknown) => log("error", message, meta),
};
