/**
 * Recursively flattens and converts an array of unknown values into an array of strings.
 *
 * Handles nested arrays, objects, and primitive values:
 * - Nested arrays are recursively flattened and processed.
 * - Objects are converted to strings in `key:value` format.
 * - Primitives are coerced to strings using `String()`.
 * - Falsy values (null, undefined, false, 0, '') are filtered out.
 *
 * @example
 * toStringArray(["a", 1, { foo: "bar" }, [2, "b"]])
 * // ➝ ["a", "1", "foo:bar", "2", "b"]
 *
 * @param values - An array of unknown values to process.
 * @returns A flat array of strings representing the input values.
 */
export function toStringArray(values: unknown[]): string[] {
  return (
    values?.filter(Boolean)?.flatMap((item) => {
      // Recursively flatten and process nested arrays
      if (Array.isArray(item)) {
        return toStringArray(item);
      }

      // Convert objects to "key:value" string format
      if (typeof item === "object" && item !== null) {
        return Object.entries(item).map(([key, value]) => `${key}:${value}`);
      }

      // Convert primitive values to strings
      return String(item);
    }) ?? []
  );
}
