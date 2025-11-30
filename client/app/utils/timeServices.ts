export function getTimeDifference(start: Date, end: Date): string {
  if (start > end) return "Đã kết thúc";

  const diffMs = end.getTime() - start.getTime(); // milliseconds
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) {
    const hours = diffHours % 24;
    return `${diffDays} ngày ${hours} giờ`;
  } else if (diffHours >= 1) {
    const minutes = diffMinutes % 60;
    return `${diffHours} giờ ${minutes} phút`;
  } else {
    return `${diffMinutes} phút`;
  }
}
