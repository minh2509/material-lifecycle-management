// Gửi thông báo dùng chung trong ứng dụng.
export function showAppToast(message, type = "info") {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("app:show-toast", {
    detail: { message, type, id: Date.now() },
  });
  window.dispatchEvent(event);
}
