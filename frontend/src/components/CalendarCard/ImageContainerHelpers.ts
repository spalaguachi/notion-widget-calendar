// if multiple use, move to constants file...
export const maxFileSizeBytes = 5242880;
export const acceptedFileTypes = ["image/jpeg", "image/png"];
export const imageBgColor = "#D4BFFF";
export const hoverImageBgColor = "#F1EAFF";

export const fmtBytes = (n: number) => {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(0)} MB`;
};
