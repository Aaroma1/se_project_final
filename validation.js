export function validateEmailFormat(value) {
  if (value.length < 2 || value.length > 30) {
    return "Invalid email address";
  }
  if (!value.includes("@")) {
    return "Invalid email address";
  }
  if (!(value.endsWith(".com") || value.endsWith(".edu"))) {
    return "Invalid email address";
  }
  return "";
}
