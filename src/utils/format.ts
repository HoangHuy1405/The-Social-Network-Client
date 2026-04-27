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

export const toApiEnum = (value: string): string => {
  if (!value) return "";
  return value.toUpperCase().replace(/[-\s]+/g, "_");
};
