export const formatJoinedDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatDateUi = (dateString: string): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
};

export const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

export const formatEnumToLowerCase = <T extends string>(value: string): T =>
  value.toLowerCase().replace(/_/g, "") as T;

const RELATIVE_TIME_THRESHOLDS: [number, Intl.RelativeTimeFormatUnit][] = [
  [60, "second"],
  [3600, "minute"],
  [86400, "hour"],
  [604800, "day"],
  [2592000, "week"],
  [31536000, "month"],
];

export const formatRelativeTime = (isoString: string): string => {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffSeconds = Math.round((then - now) / 1000);
  const absDiff = Math.abs(diffSeconds);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (let i = 0; i < RELATIVE_TIME_THRESHOLDS.length; i++) {
    const [threshold, unit] = RELATIVE_TIME_THRESHOLDS[i];
    if (absDiff < threshold) {
      const divisor = i > 0 ? RELATIVE_TIME_THRESHOLDS[i - 1][0] : 1;
      return rtf.format(Math.round(diffSeconds / divisor), unit);
    }
  }

  return rtf.format(Math.round(diffSeconds / 31536000), "year");
};
