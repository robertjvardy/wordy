import type { QueryInputTypes } from "@repo/types";

function isValidDate(ts: any): ts is Date {
  return ts instanceof Date && !isNaN(ts.getTime());
}

export const formatPgQuery = (query: string, params?: QueryInputTypes[]) => {
  if (!params) {
    return query;
  }
  return query.replace(/\$(\d+)/g, (match, args) => {
    const value = params[args - 1];
    if (value === null || value === undefined) {
      return "NULL";
    }
    if (typeof value === "string") {
      return `'${value.replace(/'/g, "''")}'`; // escape single quotes
    }
    if (isValidDate(value)) {
      return `'${value.toISOString()}'`;
    }
    return String(value);
  });
};
