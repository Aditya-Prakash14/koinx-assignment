export const fmt = (n) => "₹" + Math.abs(Math.round(n)).toLocaleString("en-IN");

export const fmtQty = (n) => {
  if (n === 0) return "0";
  if (n < 0.001) return n.toExponential(2);
  const str = n >= 1000 ? n.toLocaleString("en-IN", { maximumFractionDigits: 3 }) : n.toFixed(3);
  return str.replace(/\.?0+$/, "");
};
