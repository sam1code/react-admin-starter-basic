export default function generateRandomColor() {
  // exclude white and light colors
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (color === "#ffffff" || color === "#f0f0f0") {
    return generateRandomColor();
  }
  return color;
}
