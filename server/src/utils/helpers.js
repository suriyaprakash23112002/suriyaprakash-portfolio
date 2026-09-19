export const slugify = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const cleanText = (value) => {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();

  return cleaned || null;
};

export const uniqueIds = (values = []) => {
  if (!Array.isArray(values)) {
    return [];
  }

  return [
    ...new Set(
      values.filter(
        (value) =>
          typeof value === "string" &&
          value.trim()
      )
    ),
  ];
};

export const parseDate = (value) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

export const parseInteger = (
  value,
  fallback = 0
) => {
  const parsed = Number(value);

  return Number.isInteger(parsed)
    ? parsed
    : fallback;
};

export const parseFloatValue = (
  value,
  fallback = null
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed)
    ? fallback
    : parsed;
};