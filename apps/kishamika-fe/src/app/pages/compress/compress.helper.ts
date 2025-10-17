export function dataUrlSize(dataUrl: string): number {
  const base64String = dataUrl.split(',')[1];

  // Base64 length gives us an approximation
  const padding = (base64String.match(/=+$/) || [''])[0].length;
  return (base64String.length * 3) / 4 - padding;
}
