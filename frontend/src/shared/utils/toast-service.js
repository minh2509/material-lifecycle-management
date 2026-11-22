// Dịch vụ thông báo in-app chuẩn UX Viettel (Không dùng window.alert mặc định)
export function showAppToast(message, type = "info") {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("app:show-toast", {
    detail: { message, type, id: Date.now() },
  });
  window.dispatchEvent(event);
}
