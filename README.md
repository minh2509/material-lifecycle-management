# Material Lifecycle Management

Sản phẩm quản lý vòng đời vật tư, tổ chức thành hai ứng dụng độc lập:

- [frontend](frontend/README.md): React/Vite, giao diện prototype và tài liệu kiến trúc frontend.
- [backend](backend/README.md): Spring Boot modular monolith, cấu hình và tài liệu kiến trúc backend.

## Chạy frontend

Yêu cầu Node.js 22.12 trở lên và npm. Từ thư mục frontend:

```sh
npm ci
npm run dev
```

Ứng dụng ở http://127.0.0.1:5173. JSON demo đã có trong frontend/public/demo; không cần workbook hay thư mục tài liệu ngoài repo.

Kiểm tra: `npm run test:frontend`, `npm run lint`, `npm run data:check`, `npm run build`.

## Chạy backend

Cần JDK21. Từ thư mục backend:

```sh
./mvnw -B verify
./mvnw spring-boot:run
```

Windows dùng mvnw.cmd. Backend local ở http://127.0.0.1:8081, health tại /actuator/health và Swagger tại /swagger-ui/index.html. Local chạy không cần DB; profile postgres và biến cấu hình được giải thích trong README backend.

## Trạng thái sản phẩm

Frontend đang dùng fixture và prototype store; backend mới là bộ khung, hai phía chưa nối API nghiệp vụ. Các lỗi prototype về lưu/duyệt, kiểm kê, validation số lượng và liên kết liên màn vẫn cần được xử lý khi triển khai chức năng. Test/build thành công không có nghĩa các nghiệp vụ đã hoàn tất.

Repository chỉ chứa sản phẩm và các file cần để nhóm clone/chạy/kiểm thử; không chứa tài liệu khách hàng gốc hoặc bộ công cụ/quy trình làm việc cá nhân.
