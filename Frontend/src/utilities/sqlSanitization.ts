/**
 * Sanitizes text input to prevent SQL injection
 * @param input - The string to sanitize
 * @returns Sanitized string
 */
export const sanitizeSql = (input: string): string => {
  if (!input) return "";

  // convert input to string if not already
  const str = String(input);

  // Remove common SQL injection characters and keywords
  return (
    str
      // Remove SQL special characters
      .replace(/['";\\]/g, "")
      // Remove common SQL keywords that might be used in injections
      .replace(
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|UNION|CREATE|TABLE|FROM|WHERE|JOIN|OR|AND|NOT|LIKE|BETWEEN|IN|IS|NULL|TRUE|FALSE|EXEC|EXECUTE|PROCEDURE|DECLARE|--)\b/gi,
        ""
      )
  );
};

/**
 * Apply SQL sanitization to a form field
 * @param input - The input value from a form field
 * @returns Event handler function for React input.
 */
export const createSqlSafeHandler = (setter: (value: string) => void) => { 
  return (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    // takes the current value from the input field and passes it through the sanitizeSql function to remove any SQL injection attempts.
    const sanitizedValue = sanitizeSql(e.target.value); 
    setter(sanitizedValue);
  };
};
