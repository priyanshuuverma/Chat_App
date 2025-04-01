export function formatMessageTime(date) {
  return new Date(date).toLocateTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
