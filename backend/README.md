# Backend — Hệ thống Quản lý Vòng đời Vật tư

Backend Spring Boot theo **Modular Monolith + Feature-based Architecture + Layered Architecture bên trong từng module**. Đây là điểm bắt đầu cho thành viên backend: cách chạy, ranh giới code, trách nhiệm dữ liệu và cách thêm chức năng.

Một ứng dụng, một artifact triển khai; module có API Java công khai và phần triển khai riêng. Frontend vẫn ở [../frontend](../frontend/README.md), chưa được chuyển từ prototype sang gọi backend này.

## 1. Phạm vi hiện có

Khung hiện có bootstrap, cấu hình HTTP/security/CORS, chuẩn lỗi MVC, health, OpenAPI local, profile persistence và test kiến trúc. Các module nghiệp vụ mới có `package-info.java` để đăng ký ranh giới và phạm vi, chưa có Controller/Service/Entity nghiệp vụ.

Chưa có API CRUD, bảng dữ liệu, đăng nhập, JWT/session contract, role, seed hoặc quy trình phê duyệt. Không sử dụng trạng thái/dữ liệu mẫu frontend làm quy tắc backend đã được khách xác nhận. Mỗi chức năng tiếp theo có đặc tả chức năng, contract và kiểm thử riêng.

## 2. Công nghệ và cách chạy

[Pom](pom.xml) sở hữu phiên bản/dependency và cấu hình build. Khung chọn Java 21, Spring Boot 3.5, Maven, Spring Modulith, Spring MVC, Validation, Security, JPA, PostgreSQL, Flyway, Actuator và springdoc. Không thêm Lombok/MapStruct vì chưa có entity/mapping cần chúng.

Yêu cầu **JDK 21**. Maven Enforcer sẽ báo lỗi nếu Maven dùng JDK khác. Wrapper pin Maven và SHA-256 của distribution; lần đầu cần Internet để tải Maven/dependency. Không cần Maven cài toàn máy khi dùng wrapper.

Từ thư mục `backend`:

```sh
./mvnw -B verify
./mvnw spring-boot:run
```

Windows dùng `mvnw.cmd` thay `./mvnw`. Trên macOS có nhiều JDK, có thể chỉ định cho từng lệnh:

```sh
JAVA_HOME="$(/usr/libexec/java_home -v 21)" ./mvnw -B verify
JAVA_HOME="$(/usr/libexec/java_home -v 21)" ./mvnw spring-boot:run
```

Backend local mặc định tại `http://127.0.0.1:8081`; frontend Vite dùng cổng riêng. Trước khi chạy, kiểm server hiện có; không khởi động nhiều bản hoặc dừng process của project khác. Đổi cổng có chủ đích qua `SERVER_PORT` khi cần. Muốn cho thiết bị khác truy cập phải cấu hình địa chỉ bind và chính sách mạng riêng.

- Health: `GET /actuator/health` — trạng thái ứng dụng, không công khai chi tiết hệ thống.
- Swagger UI local: `/swagger-ui/index.html`.
- OpenAPI local: `/v3/api-docs` — chưa có business path khi chưa triển khai Controller.
- API khác trả 403 theo chính sách chặn mặc định. Điều này không có nghĩa đăng nhập đã được triển khai.

## 3. Bản đồ kiến trúc

Package gốc: `com.materialmanagement`; entry: [MaterialManagementApplication](src/main/java/com/materialmanagement/MaterialManagementApplication.java).

| Vị trí | Trách nhiệm |
| --- | --- |
| [config](src/main/java/com/materialmanagement/config/) | Ghép cấu hình Spring, security chain, CORS, OpenAPI và kiểm tra profile DB |
| [common/error](src/main/java/com/materialmanagement/common/error/) | Chuẩn lỗi kỹ thuật dùng chung; không chứa luật hoặc trạng thái riêng nghiệp vụ |
| [modules](src/main/java/com/materialmanagement/modules/) | Chủ sở hữu nghiệp vụ, API Java công khai và phần triển khai nội bộ |
| [resources](src/main/resources/) | Configuration theo môi trường và nơi đặt migration sau khi schema được duyệt |
| [test](src/test/java/com/materialmanagement/) | Kiểm ranh giới, boot/config, HTTP/security và chuẩn lỗi |

Chưa tạo `infrastructure` chung vì chưa có storage/file/mail hoặc integration thực tế cần sở hữu. Khi phát sinh, adapter nào riêng feature nằm trong feature; chỉ cơ chế được nhiều module dùng mới cân nhắc đưa ra infrastructure. Repository JPA riêng của module không được dồn ra một thư mục persistence chung.

`common` không phải nơi gom mọi DTO, enum, constant và utility. Trạng thái chứng từ thuộc module chứng từ; lỗi riêng nghiệp vụ cũng thuộc module đó.

## 4. Module nghiệp vụ và quan hệ với frontend

Các ranh giới sau chuẩn bị theo phạm vi hệ thống hiện có; chưa xác lập schema hoặc API nghiệp vụ:

| Module | Nơi phát triển | Frontend tương ứng để tham khảo UI |
| --- | --- | --- |
| [identity](src/main/java/com/materialmanagement/modules/identity/) | Người dùng, đăng nhập, quyền khi contract được chọn | administration |
| [organization](src/main/java/com/materialmanagement/modules/organization/) | Cơ cấu đơn vị/phân xưởng theo đặc tả | Các màn dùng thông tin đơn vị |
| [material](src/main/java/com/materialmanagement/modules/material/) | Danh mục và định danh vật tư | Phần vật tư trong warehouse |
| [warehouse](src/main/java/com/materialmanagement/modules/warehouse/) | Kho và vị trí lưu trữ | Phần kho/vị trí trong warehouse |
| [inventory](src/main/java/com/materialmanagement/modules/inventory/) | Số lượng tồn, thao tác cập nhật và truy vấn tồn | inventory |
| [procurement](src/main/java/com/materialmanagement/modules/procurement/) | Nhu cầu, định mức và mua sắm; có thể chia nhỏ khi triển khai nếu nghiệp vụ cần | demand, technical-norms, procurement |
| [receiving](src/main/java/com/materialmanagement/modules/receiving/) | Nhập kho và xác nhận phiếu nhập | import |
| [issuing](src/main/java/com/materialmanagement/modules/issuing/) | Xuất/cấp phát và liên kết sử dụng | export |
| [recovery](src/main/java/com/materialmanagement/modules/recovery/) | Thu hồi, đánh giá và sửa chữa | recovery |
| [disposal](src/main/java/com/materialmanagement/modules/disposal/) | Thanh lý | disposal |
| [stocktaking](src/main/java/com/materialmanagement/modules/stocktaking/) | Kiểm kê và chênh lệch | stocktaking |
| [reporting](src/main/java/com/materialmanagement/modules/reporting/) | Báo cáo và truy vấn tổng hợp | reports, dashboard |

Tên package Java không có dấu gạch nối. `receiving/issuing` diễn tả nghiệp vụ nhập/xuất kho; không dùng `import/export` để tránh nhầm với thao tác nhập/xuất file. Một module backend không nhất thiết ứng với đúng một màn frontend.

## 5. Ranh giới và API giữa các module

[application.yml](src/main/resources/application.yml) dùng `explicitly-annotated`. Mỗi module được đánh dấu `@ApplicationModule` ở `package-info.java`, có ID ổn định. Điều này giúp tầng thư mục `modules/` không bị coi thành một module duy nhất.

Hiện `allowedDependencies = {}` nghĩa là chưa cho module nào phụ thuộc module khác. Khi có ca sử dụng cần liên kết, xác định chiều gọi, cập nhật danh sách cho phép và test trong cùng thay đổi. Không đổi sang module mở để làm test xanh.

Quy ước:

1. Các kiểu `public` ở package gốc của module là API Java công khai cho module khác. Chỉ đưa contract có chủ đích vào đây.
2. `internal/` và các package con là phần riêng. Java `public` không tự làm một kiểu nội bộ trở thành API module; test Modulith kiểm điều này.
3. Module khác chỉ gọi API được công khai. Không inject repository/service nội bộ, dùng entity hoặc truy cập bảng của module khác một cách tùy tiện.
4. Không có vòng phụ thuộc. Module không import `config` để lấy cơ chế ghép ứng dụng.
5. HTTP Controller nằm trong `internal/controller`; HTTP public URL và Java public API là hai ranh giới khác nhau.
6. Nếu cần một package API con riêng, khai báo Named Interface của Modulith có chủ đích và cập nhật dependency cho phép; chỉ đặt tên thư mục `api` chưa tự công khai nó.

Ví dụ định hướng, chưa phải contract đã triển khai: nhận phiếu nhập có thể gọi `InventoryOperations` công khai của inventory để cập nhật tồn. Receiving không gọi `InventoryRepository`. Inventory không gọi ngược ReceivingService để đọc thông tin nó vừa được truyền vào.

Không bắt buộc mọi API là Java interface. Một bean/class công khai có hợp đồng rõ cũng dùng được. Không tạo một cặp Service/ServiceImpl cho mọi thao tác chỉ vì convention.

## 6. Cấu trúc bên trong module khi bắt đầu chức năng

Module đang có marker và package `internal` để được nhận diện/giữ trong Git. Tạo các phần sau khi thực sự có code; không dựng CRUD giả để lấp chỗ trống:

```text
material/
├── package-info.java
├── MaterialOperations.java      # API cho module khác, nếu có nhu cầu
└── internal/
    ├── controller/
    ├── service/
    ├── repository/
    ├── entity/
    ├── dto/
    │   ├── request/
    │   └── response/
    ├── mapper/                  # Khi mapping đủ phức tạp
    └── specification/           # Khi có bộ lọc động JPA
```

Đây là ví dụ tổ chức khi triển khai, không phải danh sách class đã có.

| Layer | Làm gì | Tránh |
| --- | --- | --- |
| Controller | HTTP, DTO, `@Valid`, status code; gọi service | Gọi repository trực tiếp, tính tồn hoặc quyết định quyền chỉ bằng dữ liệu client |
| Service | Ca sử dụng, điều kiện nghiệp vụ, transaction và gọi API module khác được phép | Phụ thuộc Controller, trả entity làm response HTTP |
| Repository | Query/persistence trong dữ liệu module sở hữu | Gọi service/controller, chứa flow duyệt chứng từ |
| Entity | Mapping và hành vi phù hợp của thực thể | Trở thành API JSON hoặc bị module khác sửa tùy tiện |
| Request/Response DTO | Contract đầu vào/đầu ra HTTP theo chức năng | Dùng một DTO chung cho mọi thao tác hoặc nhận toàn entity từ client |
| Mapper/Specification | Mapping và lọc có nhu cầu thực tế | Tạo abstraction hoặc dependency chưa cần |

Luồng thông thường: HTTP request → Controller/validation → Service → Repository/API module → Response DTO. Chỉ thêm tầng domain/use-case riêng khi độ phức tạp thực tế cần nó; không trộn nhiều cách tổ chức trong cùng module mà không có lý do.

## 7. Database, transaction và migration

### Hai chế độ cấu hình

- `local` là profile mặc định: tắt auto-configuration DataSource/JPA/Flyway, chạy không cần DB. Không có H2 hoặc kho dữ liệu giả thay PostgreSQL.
- `postgres` là profile opt-in: JPA/PostgreSQL/Flyway bật theo cấu hình nền; cần biến môi trường `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` do từng thành viên cung cấp từ môi trường an toàn.
- Không bật `local,postgres` cùng nhau. [DatabaseProfileConfig](src/main/java/com/materialmanagement/config/DatabaseProfileConfig.java) chặn tổ hợp này để tránh tưởng đã dùng DB trong khi local vẫn loại auto-configuration.
- Schema validation, tắt Open Session in View, chặn Flyway clean và không tự baseline là cấu hình nền. Chưa có migration SQL hoặc entity.

Khi đã có DB phát triển, credential và schema/migration được duyệt, chạy từ môi trường đã cung cấp các biến cần thiết:

```sh
./mvnw spring-boot:run -Dspring-boot.run.profiles=postgres
```

Không ghi credential thật vào source, command được chia sẻ, log hoặc tài liệu. Không đổi sang `ddl-auto=update/create` để Hibernate tự sửa DB. Flyway có thể tạo bảng lịch sử và chạy migration khi profile postgres kết nối; chỉ bật nó trên DB được phép thay đổi, có backup/quy trình phù hợp. Bộ khung này chưa được chạy migration vào DB thật.

### Quyền sở hữu và tính nhất quán

Một database chung vẫn cần module sở hữu dữ liệu rõ. Module khác tham chiếu qua định danh/contract; không dùng JPA relationship xuyên module để vô tình kéo cả nội bộ vào nhau. Reporting đọc qua query contract/read model có chủ đích, không tự có quyền ghi tồn kho.

Transaction đặt ở service của ca sử dụng. Khi nhập/xuất phải cập nhật nhiều phần nguyên tử, xác định transaction chung, trạng thái và quyền cập nhật trước khi viết code. Các thao tác trong cùng transaction cần giữ cùng ngữ nghĩa transaction; không tự chuyển sang event bất đồng bộ nếu sẽ làm mất bảo đảm đó.

Chức năng cập nhật tồn cần test trạng thái không hợp lệ, xác nhận lặp, cạnh tranh cập nhật và rollback. Chọn optimistic/pessimistic locking, idempotency và constraint dựa trên đặc tả/DB của chức năng; scaffold chưa tự quyết định cơ chế hoặc schema.

## 8. HTTP, lỗi và bảo mật

- [SecurityConfig](src/main/java/com/materialmanagement/config/SecurityConfig.java) chỉ mở health GET và tài liệu khi được bật. Các đường dẫn khác bị chặn, kể cả Controller mới thêm. Tác vụ chức năng phải thiết kế authentication/authorization và cập nhật rule rõ ràng.
- Không có user mặc định hoặc mật khẩu Spring tự sinh; không có JWT giả. Basic/form login bị tắt; CSRF vẫn giữ. Cách đăng nhập và CSRF cần chốt cùng nhau khi làm identity.
- [CorsConfig](src/main/java/com/materialmanagement/config/CorsConfig.java) chỉ cho origin cụ thể trong local, không gửi credential cookie xuyên origin. CORS không thay thế kiểm quyền. Profile postgres mặc định không mở origin; cấu hình `app.cors.allowed-origins` theo môi trường khi tích hợp.
- Swagger/API docs mặc định tắt ở cấu hình nền; local chủ động bật. Với postgres sẽ tắt nếu không có cấu hình ghi đè; không dùng local làm cấu hình triển khai production.
- [GlobalExceptionHandler](src/main/java/com/materialmanagement/common/error/GlobalExceptionHandler.java) dùng ProblemDetail cho lỗi MVC. Lỗi validation có tên field và thông báo an toàn, không trả rejected value. Lỗi không dự kiến không trả message/stack nội bộ. Chưa có ánh xạ mã lỗi nghiệp vụ.
- Security filter nằm trước MVC; phản hồi 403 mặc định chưa có cùng body ProblemDetail. Chuẩn 401/403 và error code sẽ hoàn thiện cùng chức năng identity/API contract, không coi handler MVC đã xử lý mọi loại lỗi.
- Không bọc mọi response thành HTTP 200 kèm `success=false`. Response DTO/pagination và error code cụ thể được chọn theo contract từng API.

Chỉ health được Actuator công khai; không mở env/config/beans. Logging lỗi bất ngờ hiện chỉ ghi loại exception để tránh đưa dữ liệu request/credential vào log; cần thiết kế logging có mã theo dõi và redaction khi triển khai chức năng thật.

## 9. Kiểm thử và review

Chạy `./mvnw -B verify` trước khi bàn giao. Lệnh compile/test và đóng gói executable jar, không cần DB hoặc Docker cho các test foundation. Không coi việc khung build được là nghiệp vụ đã đúng.

| Nhóm test | Nơi sở hữu và mục tiêu |
| --- | --- |
| Kiến trúc | [ModuleArchitectureTest](src/test/java/com/materialmanagement/architecture/ModuleArchitectureTest.java): nhận diện module, ranh giới/cycle/dependency cho phép và chiều gọi layer |
| Local HTTP | [LocalApplicationTest](src/test/java/com/materialmanagement/configuration/LocalApplicationTest.java): boot không DB, health, tài liệu, deny-default và origin |
| Tắt tài liệu | [ClosedDocumentationTest](src/test/java/com/materialmanagement/configuration/ClosedDocumentationTest.java): endpoint tài liệu không bị mở khi flag tắt |
| Profile DB | [DatabaseProfileConfigTest](src/test/java/com/materialmanagement/configuration/DatabaseProfileConfigTest.java): cấu hình postgres và tổ hợp profile; không kết nối PostgreSQL |
| Chuẩn lỗi | [GlobalExceptionHandlerTest](src/test/java/com/materialmanagement/common/error/GlobalExceptionHandlerTest.java): test HTTP probe chỉ trong test, validation/JSON sai/lỗi bất ngờ; không thêm probe vào production |

Test layer hiện cho phép package controller/service/repository chưa có class. Khi thêm code, rule sẽ áp dụng; không bỏ rule để vượt kiểm tra. Khi thêm module hợp lệ, cập nhật kiểm tra danh sách module tương ứng. Không dùng `common` để lách ranh giới.

Với nghiệp vụ thật, thêm unit test logic, HTTP test quyền/validation và integration test repository/transaction trên PostgreSQL dùng riêng cho kiểm thử. Không dùng DB chung của nhóm làm nơi reset dữ liệu test. Chưa có kiểm chứng kết nối/migration PostgreSQL trong bộ test foundation.

## 10. Cách thành viên nhóm bắt đầu

1. Chọn module sở hữu chức năng, đọc đặc tả chức năng và contract tương ứng. Không lấy fixture frontend làm schema.
2. Viết migration/entity/DTO theo phần đã chốt; ghi rõ quyền sở hữu dữ liệu và quyền API.
3. Implement service và repository nội bộ, rồi HTTP Controller; chỉ công khai API Java khi module khác cần.
4. Nếu cần liên kết module, khai báo allowed dependency, dùng API công khai và kiểm transaction. Không tạo vòng.
5. Cập nhật OpenAPI qua DTO/annotation khi cần; phối hợp frontend về loading/error/pagination và shape dữ liệu.
6. Thêm test hành vi, chạy verify và kiểm endpoint trên môi trường phát triển phù hợp.

Chia việc theo module; phối hợp trước khi sửa pom, config/security, common/error, public API module hoặc migration có thứ tự chung. Không copy các file dùng chung vào từng module để tránh xung đột merge.

## 11. Tài liệu tham chiếu

- [Spring Boot: cách tổ chức source](https://docs.spring.io/spring-boot/3.5/reference/using/structuring-your-code.html).
- [Spring Modulith: module, API và ranh giới](https://docs.spring.io/spring-modulith/reference/1.4/fundamentals.html).
- [Spring Modulith: kiểm chứng kiến trúc](https://docs.spring.io/spring-modulith/reference/1.4/verification.html).
- [springdoc: tài liệu và tương thích](https://springdoc.org/).

Cập nhật tài liệu này khi thay ranh giới hoặc cách chạy. Phiên bản, cấu hình và hành vi chi tiết tiếp tục lấy từ source/manifest được liên kết; tài liệu này không thay đặc tả nghiệp vụ hoặc hồ sơ phê duyệt schema.
