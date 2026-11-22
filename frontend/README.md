# Kiến trúc frontend — Hệ thống Quản lý Vòng đời Vật tư

Tài liệu dành cho thành viên phát triển frontend. Đọc tài liệu này trước khi sửa một màn, thêm chức năng hoặc thay thành phần dùng chung. Mọi đường dẫn bên dưới tương đối với thư mục chứa tài liệu, nên có thể đọc trực tiếp trên Git.

Frontend theo hướng **Modular Monolith + Feature-based Architecture + Design System**: một ứng dụng React, chia theo nghiệp vụ và dùng chung chuẩn giao diện. Mục tiêu là sửa một chức năng mà không phải hiểu hoặc thay toàn bộ ứng dụng.

Giao diện hiện tại là prototype của ứng dụng. Khi triển khai nghiệp vụ thật, giữ khuôn này và bổ sung hành vi theo đặc tả của chức năng. Dữ liệu mẫu, nút phê duyệt và tài khoản minh họa không phải bằng chứng về quy tắc nghiệp vụ, phân quyền hoặc backend đã hoàn thành.

## 1. Bắt đầu đọc từ đâu?

| Công việc | Điểm bắt đầu |
| --- | --- |
| Hiểu khởi tạo ứng dụng | [main.jsx](main.jsx), [App](app/app.jsx), [AppProviders](app/providers/app-providers.jsx) |
| Sửa route, menu, tiêu đề hoặc điều hướng mobile | [AppRouter](app/router/app-router.jsx), [navigation](app/router/navigation.js), [AppShell](app/layouts/app-shell.jsx) |
| Sửa một nghiệp vụ | `features/<feature>/index.js`, sau đó page và các khối mà page sử dụng |
| Sửa nút, ô nhập, bảng hoặc màu dùng chung | [design-system](design-system/), [tokens](design-system/tokens/tokens.css), [global.css](styles/global.css) |
| Tìm nguồn dữ liệu hoặc trạng thái liên màn | Mục 5 của tài liệu này và [usePrototypeStore](shared/hooks/use-prototype-store.js) |
| Xem ràng buộc kiến trúc được kiểm bằng code | [architecture.test.js](tests/frontend/architecture.test.js) |

Các thư viện và lệnh thực tế do [package.json](package.json) sở hữu. Dự án đang dùng JavaScript/JSX, React, Vite, React Router, TanStack Query, Axios, Bootstrap/React Bootstrap, React Hook Form, Zod và Recharts. Không mặc định có TypeScript, Storybook, Vitest hoặc Playwright trong quy trình test của repository.

## 2. Các phần của kiến trúc

| Vị trí | Sở hữu | Không nên đặt vào đây |
| --- | --- | --- |
| [app/](app/) | Ghép ứng dụng, provider, router, navigation, sidebar/topbar/footer và layout desktop/mobile | Công thức tồn kho, validation chứng từ, bảng riêng của một nghiệp vụ |
| [design-system/](design-system/) | Primitive UI, token và các quy tắc trình bày dùng chung | Tên trạng thái nghiệp vụ, gọi API, phê duyệt hoặc tính số lượng vật tư |
| [shared/](shared/) | Hook, utility, dữ liệu tham chiếu và thành phần thực sự được nhiều feature dùng | Một kho chứa mọi component; logic chỉ phục vụ một feature |
| [features/](features/) | Page, component, hook, service, schema và dữ liệu riêng theo nghiệp vụ | Nội bộ của feature khác; bản sao CSS của design-system |
| [infrastructure/](infrastructure/) | HTTP client, truy cập dữ liệu, storage và adapter prototype liên phân hệ | Layout, JSX của page hoặc quyền được quyết định bằng việc ẩn nút |
| [styles/](styles/) | Điểm nạp CSS, nền ứng dụng và utility dùng chung | Selector riêng của một màn mới |

`shared` và `design-system` khác nhau ở ý nghĩa: Button không biết vật tư là gì nên thuộc design-system; [PrototypePageHeader](shared/components/prototype-page-header.jsx) và [ProvenanceModal](shared/components/provenance-modal.jsx) phục vụ ngữ cảnh ứng dụng nên thuộc shared.

### Ranh giới phụ thuộc

Mũi tên dưới đây nghĩa là “được import”, không phải luồng xử lý nghiệp vụ:

```text
app ───────────────► features/<feature>/index.js
 │                           │
 │                           ├──► shared
 │                           ├──► infrastructure
 │                           └──► design-system
 ├─────────────────► shared
 ├─────────────────► infrastructure
 └─────────────────► design-system

shared ────────────► infrastructure / design-system
design-system ─────► nội bộ design-system và thư viện UI
infrastructure ────► adapter/client/dữ liệu hạ tầng và thư viện liên quan
```

Quy tắc nhóm cần giữ:

1. `app` đi vào feature qua `index.js`. Không import trực tiếp page, hook hoặc service nội bộ của feature.
2. Feature không import feature khác, kể cả qua `index.js`. `index.js` là interface cho phần ghép ứng dụng, không phải giấy phép phụ thuộc chéo.
3. `shared`, `design-system`, `infrastructure` không import ngược `app` hoặc `features`.
4. `design-system` không import `shared` hoặc hạ tầng. Nó phải dùng được mà không cần dữ liệu nghiệp vụ.
5. Không tạo vòng import. Trong cùng feature, import trực tiếp file nội bộ; tránh vòng qua chính `index.js` của feature.
6. Chuyển màn bằng router/Link hoặc callback; không import component của màn kia để “liên kết” hai nghiệp vụ.

Ví dụ, phiếu nhập có thể tham chiếu hồ sơ mua sắm bằng ID trong dữ liệu chung. `import` không cần và không được lấy `ProcurementPlanDrawer` từ nội bộ `procurement` để thực hiện quan hệ đó.

Các ràng buộc import hiện được kiểm trên relative import trong [bài test kiến trúc](tests/frontend/architecture.test.js). Đây là lớp bảo vệ hiện có, không phải bộ phân tích mọi cách import JavaScript. Dự án chưa cấu hình alias; không thêm cách import mới để đi vòng qua ranh giới.

## 3. Xác định feature sở hữu công việc

Tên thư mục là ranh giới code, không phải mỗi thư mục tương ứng đúng một mục sidebar. Menu có thể nhóm nhiều nghiệp vụ; route thực tế xem ở [AppRouter](app/router/app-router.jsx), cấu hình hiển thị xem ở [navigation.js](app/router/navigation.js).

| Feature / public entry | Phạm vi để tìm code |
| --- | --- |
| [dashboard](features/dashboard/index.js) | Tổng quan, các nhóm chỉ số, biến động và công việc chờ xử lý |
| [inventory](features/inventory/index.js) | Chi tiết tồn kho; workspace chuẩn bị dữ liệu catalog/kịch bản cho ứng dụng |
| [technical-norms](features/technical-norms/index.js) | Định mức kỹ thuật |
| [demand](features/demand/index.js) | Kế hoạch nhu cầu |
| [procurement](features/procurement/index.js) | Hồ sơ dự trù và màn thực hiện mua sắm; hai page thuộc cùng feature |
| [import](features/import/index.js) | Phiếu nhập và theo dõi lô; tên này nói về nhập kho |
| [export](features/export/index.js) | Yêu cầu cấp phát, phiếu xuất và sử dụng tại phân xưởng; không phải xuất file |
| [recovery](features/recovery/index.js) | Thu hồi, đánh giá và sửa chữa |
| [disposal](features/disposal/index.js) | Thanh lý |
| [warehouse](features/warehouse/index.js) | Danh mục hiện tại: vật tư, kho, vị trí, nhà cung cấp và phân xưởng |
| [stocktaking](features/stocktaking/index.js) | Kiểm kê và chênh lệch |
| [reports](features/reports/index.js) | Các tab báo cáo vật tư |
| [administration](features/administration/index.js) | Giao diện người dùng và quyền minh họa |

Không tự gộp hai feature chỉ vì chúng có bảng giống nhau. Nếu phần trình bày thực sự chung, dùng design-system; nội dung cột, lọc và hành động nghiệp vụ vẫn do feature sở hữu.

## 4. Tổ chức bên trong một feature

Không cần tạo đủ mọi thư mục. Tạo khi có nội dung thực tế:

| Vị trí | Trách nhiệm và thời điểm tách |
| --- | --- |
| `index.js` | Chỉ export những gì `app` cần. Giữ nhỏ; không export toàn bộ nội bộ bằng `export *` |
| `pages/` | Ghép các khối thành màn; điều phối sự kiện và trạng thái cấp màn |
| `components/` | Khối có trách nhiệm rõ: summary, filters, table, drawer, form hoặc details |
| `hooks/` | Logic có state/effect hoặc điều phối dữ liệu đủ phức tạp để tách khỏi page |
| `services/` | Tính toán/biến đổi dữ liệu; khi có API thật có thể chứa thao tác dữ liệu riêng feature dựa trên HTTP client chung |
| `schemas/` | Validation và chuẩn hóa đầu vào theo contract của feature |
| `data/` | Fixture/hằng số riêng feature; không đặt bản sao chứng từ liên màn ở đây |
| `styles/` hoặc cạnh component | `.module.css` cho trình bày riêng feature |

Một bộ lọc vài biến có thể ở ngay page. Không bắt buộc tạo `useXxx` chỉ để đổi tên `useState`. Ngược lại, page không nên chứa cả form dài, thuật toán tính tồn, HTTP và JSX bảng trong cùng file.

### Hai ví dụ đang có trong source

- [DashboardPage](features/dashboard/pages/dashboard-page.jsx) ghép header, summary, movements, tasks và dialog. [useDashboard](features/dashboard/hooks/use-dashboard.js) điều phối trạng thái; [dashboard-selectors](features/dashboard/services/dashboard-selectors.js) sở hữu phép chọn/tổng hợp dữ liệu. Đây là ví dụ tách theo khối chức năng.
- [ProcurementPlanDrawer](features/procurement/components/procurement-plan-drawer.jsx) giữ vòng đời form và hành động lưu; [ProcurementPlanForm](features/procurement/components/procurement-plan-form.jsx) render trường nhập; [schema](features/procurement/schemas/procurement-plan-schema.js) giữ validation. Đây là ví dụ tách form khỏi vỏ drawer và chi tiết chỉ đọc.

### Hợp đồng component

- Nhận dữ liệu và callback qua props có tên rõ, ví dụ `onSave`, `onClose`, `onSelectPlan`.
- Page/hook quyết định thao tác nghiệp vụ; bảng/form trình bày không tự điều hướng hoặc cập nhật module khác một cách ngầm định.
- Truyền nhóm dữ liệu liên quan khi có ý nghĩa; không truyền toàn bộ store xuống mọi component cho tiện.
- Dữ liệu suy ra từ props/state nên tính trực tiếp hoặc qua selector. Không tạo thêm state rồi dùng effect để giữ hai bản giống nhau.
- Dọn subscription, timer và event listener khi component kết thúc vòng đời.
- Giới hạn hiện được test cho JSX là **không quá 200 dòng/file**. Tách theo trách nhiệm; không lách bằng cách dồn nhiều câu lệnh vào một dòng hoặc chuyển cả JSX lớn sang file `.js`.

## 5. Dữ liệu và state: phải phân biệt các nguồn

Prototype hiện chưa có một nguồn backend thống nhất. Khi sửa một màn, trước tiên lần theo hook/service mà màn đó đọc. Không giả định mọi số lượng trên mọi màn đang lấy từ cùng một dataset.

### A. Catalog và provenance qua HTTP

Điểm đọc: [useCatalogQuery/useProvenanceQuery](shared/hooks/use-catalog-query.js), [catalog-service](infrastructure/api/catalog-service.js), [api-client](infrastructure/api/api-client.js).

Catalog JSON trong [public/demo](public/demo/) là fixture được đóng gói để clone chạy được, không phải API CRUD vật tư. Ứng dụng build và chạy demo trực tiếp từ JSON đi kèm.

[useInventoryWorkspace](features/inventory/hooks/use-inventory-workspace.js) kết hợp catalog với kịch bản minh họa và phép tính tồn của inventory. [App](app/app.jsx) đang gọi public hook này để giữ workspace, xử lý tải/lỗi và truyền dữ liệu vào router. Giữ điểm ghép hiện có khi sửa UI; không tự nâng toàn bộ state feature lên app.

### B. Dữ liệu riêng Dashboard

[dashboard-demo.js](features/dashboard/data/dashboard-demo.js) là nguồn minh họa riêng cho các khối Dashboard. Bộ chọn kỳ/kho đi qua workspace của app, nhưng điều đó không làm các chỉ số Dashboard tự đồng bộ với mọi chứng từ trong MockStore.

Khi triển khai Dashboard thật, cần xác định nguồn và công thức từng chỉ số theo đặc tả. Không lấy công thức hoặc con số fixture làm quy tắc được khách hàng xác nhận.

### C. Prototype store cho dữ liệu liên màn

Điểm đọc React: [usePrototypeStore](shared/hooks/use-prototype-store.js). Điểm cập nhật: [MockStore](infrastructure/prototype/mock-data-store.js), các nhóm [actions](infrastructure/prototype/actions/) và [storage adapter](infrastructure/storage/prototype-storage.js).

Luồng cần giữ là: sự kiện UI → callback page/hook → action → snapshot chung và thông báo thay đổi → các màn đăng ký đọc lại snapshot. Component không sửa trực tiếp object/array trong snapshot và không gọi localStorage để tạo một bản riêng của cùng chứng từ.

Các action đang ở infrastructure vì đây là adapter mô phỏng liên phân hệ của prototype. Khi có backend thật, không tiếp tục đưa luật nghiệp vụ production vào mock adapter cho tiện. Contract và giao dịch liên phân hệ phải được xác định trong phạm vi chức năng tương ứng.

LocalStorage giữ dữ liệu trên trình duyệt, không phải cơ sở dữ liệu dùng chung của nhóm. Không đổi key, xóa dữ liệu hoặc thay định dạng lưu chỉ để làm màn mới hiển thị đúng; cần xem tác động tương thích và dữ liệu cũ trước.

### Chọn nơi giữ state

| Loại state | Nơi phù hợp |
| --- | --- |
| Mở drawer, tab, chuỗi tìm kiếm, phân trang riêng màn | Component/page/hook của feature |
| Form và lỗi trường nhập | React Hook Form/schema trong feature khi form cần cơ chế này; không bắt buộc chuyển mọi input đơn lẻ thành form framework |
| Dữ liệu HTTP và cache | TanStack Query; dùng [QueryClient chung](app/providers/query-client.js) |
| Bộ chọn/dữ liệu cần ghép ở cấp ứng dụng | App sở hữu hoặc nhận qua public interface như workspace hiện có |
| Chứng từ liên màn của prototype | MockStore thông qua hook/action chung |
| Dữ liệu suy ra | Selector/hàm tính toán; tránh lưu thêm bản sao |

Chỉ có một [AppProviders](app/providers/app-providers.jsx) bọc QueryClientProvider ở entry. Không bọc QueryClientProvider mới cho từng page để xử lý lỗi cache.

### Khi thay prototype bằng API thật

Đây là hướng triển khai cho chức năng tiếp theo, chưa phải mô tả hệ thống đã có:

1. Chốt dữ liệu, trạng thái, quyền, validation và lỗi theo đặc tả của chức năng.
2. Tách thao tác HTTP riêng feature vào service; tái dùng client chung. Không gọi Axios rải trong JSX.
3. Hook điều phối query/mutation và cập nhật cache phù hợp contract. Không giữ song song mock và API làm hai nguồn ghi cho cùng thực thể.
4. Giữ props của khối trình bày ổn định khi có thể, để thay nguồn dữ liệu không kéo theo viết lại UI.
5. Kiểm loading, empty, error, lưu thất bại và dữ liệu liên quan sau cập nhật. Backend phải thực thi quyền và validation; frontend chỉ hỗ trợ trải nghiệm nhập liệu.

## 6. Design System và quy tắc CSS

### Dùng primitive hiện có trước

| Primitive | Cách chọn |
| --- | --- |
| [Button](design-system/button/button.jsx) | Chọn variant primary/secondary/outline khi phù hợp. Trong form, đặt `type` rõ ràng để tránh submit ngoài ý muốn |
| [Input](design-system/input/input.jsx), [Textarea](design-system/textarea/textarea.jsx) | Standard cho form thường, compact cho form nhỏ; native cho trường hợp giữ cách trình bày đặc biệt như checkbox/search hiện có |
| [Select](design-system/select/select.jsx) | Standard dùng giao diện select chung; native chỉ khi cần ngoại lệ đã có |
| [Table](design-system/table/table.jsx) | Vỏ bảng HTML có chuẩn CSS; cột, dòng, lọc và phân trang vẫn thuộc feature. Không có DataTable nghiệp vụ tổng quát được dựng sẵn |
| [Modal](design-system/modal/modal.jsx) | Entry dùng chung cho React Bootstrap Modal; drawer hiện có vẫn có component/vòng đời riêng |
| [Badge](design-system/badge/badge.jsx), [Icon](design-system/icon/icon.jsx) | Tái dùng cách thể hiện trạng thái và biểu tượng; ý nghĩa nghiệp vụ do feature quyết định |

Ngoài design-system, không render trực tiếp `button`, `input`, `select`, `textarea`, `table`; test kiến trúc hiện kiểm quy tắc này. Nhãn, cấu trúc bảng và các thẻ ngữ nghĩa khác vẫn dùng HTML bình thường. Dùng Link cho điều hướng, Button cho hành động.

Không dùng `native` để né chuẩn UI. Nếu một nhu cầu xuất hiện ở nhiều nơi, xem xét bổ sung variant nhỏ có mục đích rõ vào primitive, kiểm các consumer và giữ hành vi props/ref. Không thêm hàng chục cờ tùy chọn cho trường hợp chưa tồn tại.

### CSS global và CSS riêng

- [tokens.css](design-system/tokens/tokens.css) là nơi tìm màu, font, radius và shadow chung. Dùng biến có sẵn thay vì copy mã màu vào feature mới.
- [global.css](styles/global.css) là điểm ghép CSS; [main.jsx](main.jsx) nạp nó trước các module ứng dụng. Thứ tự import đang giữ cascade của giao diện hiện tại; không đổi thứ tự chỉ để sắp xếp tên file.
- CSS layout thuộc `app/layouts`; CSS primitive và mẫu hiển thị chung thuộc design-system; base/utility thuộc `styles`.
- Style riêng feature mới dùng `.module.css`. [dashboard.module.css](features/dashboard/styles/dashboard.module.css) là ví dụ. Không dùng `:global(...)` hoặc selector toàn cục để tác động màn khác.
- Các class Bootstrap/utility/design-system hiện có là hợp đồng global có chủ đích. CSS Modules không đồng nghĩa phải viết lại toàn bộ CSS hoặc thay giao diện hiện tại.
- Inline style cũ vẫn tồn tại. Khi thêm style lặp lại, đưa về đúng chủ sở hữu; không gom hàng loạt style cũ trong một task nghiệp vụ không liên quan.

Sửa `InventoryTable` trong feature chỉ tác động nơi dùng component đó. Sửa Table hoặc token chung có thể tác động nhiều feature. CSS Modules giúp giới hạn selector riêng, nhưng không loại bỏ ảnh hưởng của việc sửa tài nguyên dùng chung.

### Giữ trải nghiệm và khả năng truy cập

Khi sửa một khối, giữ hoặc kiểm lại label/id, thông báo lỗi, tên truy cập cho nút chỉ có icon, trạng thái disabled/loading và điều khiển bằng bàn phím. Với dialog/drawer, kiểm mở/đóng, Escape và focus; không suy ra mọi drawer tự có đủ cơ chế của React Bootstrap Modal.

Kiểm khối ở desktop và màn hình hẹp, đặc biệt bảng rộng, bộ lọc và hành động form. Không thay cấu trúc, khoảng cách, font hoặc màu của màn chỉ vì đang refactor logic.

## 7. Quy trình thực hiện một chức năng

### Sửa màn đã có

1. Mở public entry của feature, xác định page, khối UI và nguồn dữ liệu.
2. Đọc đặc tả chức năng liên quan; phân biệt hành vi đã xác nhận với fixture/đề xuất. Tài liệu này không thay đặc tả nghiệp vụ.
3. Chọn phạm vi nhỏ: UI riêng sửa trong feature; UI chung sửa đúng design-system/shared; thao tác dữ liệu sửa đúng service/adapter.
4. Giữ interface dữ liệu/callback nếu không có yêu cầu đổi. Cập nhật các caller và test khi contract thay đổi có chủ đích.
5. Chạy kiểm tra phù hợp và kiểm browser nếu ảnh hưởng hiển thị/tương tác.

### Thêm feature hoặc page

1. Kiểm feature hiện có trước. Ví dụ thêm một bước mua sắm có thể thuộc `procurement`, không mặc định tạo module mới.
2. Tạo page và các khối cần thiết; chỉ thêm hook/service/schema khi có trách nhiệm thật.
3. Export entry mà app cần qua `index.js` của feature.
4. Đăng ký route ở [AppRouter](app/router/app-router.jsx). Cập nhật [navigation](app/router/navigation.js) nếu cần menu, tra cứu/tiêu đề hoặc nhóm route liên quan; sidebar desktop và mobile dùng cấu hình này.
5. Dùng primitive/token chung, CSS Modules cho style riêng. Không import component nội bộ của feature khác.
6. Bổ sung kiểm thử cho quy tắc/hành vi mới theo chức năng. Không coi việc có route và fixture là hoàn tất nghiệp vụ.

### Làm việc cùng nhau

Chia công việc theo feature hoặc khối có chủ sở hữu rõ. Các file dễ xung đột cần phối hợp trước: router, navigation, provider, token/global CSS và store/action liên phân hệ. Không copy các file này vào feature để tránh merge conflict.

Khi thay thành phần chung, người thực hiện cần liệt kê consumer bị ảnh hưởng và kiểm chúng. Một người không phải hiểu mọi module để sửa feature riêng, nhưng phải hiểu phạm vi ảnh hưởng khi sửa hạ tầng hoặc design-system.

## 8. Chạy và kiểm chứng

Chạy lệnh từ thư mục `frontend`, nơi có [package.json](package.json). Cài dependency bằng `npm ci` trước lần chạy đầu tiên. Lệnh được định nghĩa trong manifest là nguồn chính; xem [Vite config](vite.config.js) cho cổng và cấu hình dev/preview. Không khởi động server trùng khi đã có server của project.

```sh
npm run dev
```

Các kiểm tra hiện có:

| Lệnh | Điều nó giúp kiểm |
| --- | --- |
| `npm run test:frontend` | Test native Node: ranh giới module, vòng import, giới hạn JSX, primitive/scoped CSS và một số hồi quy prototype |
| `npm run lint` | Static analysis theo [eslint.config.js](eslint.config.js), gồm source và test frontend |
| `npm run data:check` | Kiểm JSON demo và tính nhất quán catalog/provenance; không đối chiếu workbook gốc hoặc API backend |
| `npm run build` | Biên dịch production; prebuild kiểm JSON demo đi kèm, không cần tài liệu nguồn |

Test hiện ở [tests/frontend](tests/frontend/), dùng Node test runner. Khi thêm test JSX hoặc E2E cần công cụ khác, thống nhất công cụ và dependency trong phạm vi task; không ghi Vitest/Playwright/Storybook là đã có sẵn chỉ vì có trong đề xuất kiến trúc.

Test kiến trúc không thay được review; test store không chứng minh nghiệp vụ khách hàng đúng; lint/build không chứng minh UI không đổi. Với thay đổi UI hoặc component chung, kiểm browser các màn liên quan, trạng thái tải/rỗng/lỗi và luồng chính trên desktop/mobile. Không xóa test hoặc hạ điều kiện để làm task đạt.

## 9. Những điều cần tránh khi review

- Page lớn chứa cả JSX, form, HTTP và công thức nghiệp vụ; hoặc tách file vụn chỉ để đủ giới hạn dòng.
- Thư mục components chung chứa mọi bảng của mọi nghiệp vụ.
- Import chéo feature, export toàn bộ nội bộ, vòng import hoặc phụ thuộc ngược vào app.
- Lặp lại màu/nút/bảng ở từng feature; dùng CSS global của feature để sửa màn khác.
- Ghi trực tiếp localStorage hoặc mutate snapshot thay vì action chung.
- Tự ghép Dashboard/catalog/MockStore thành một nguồn dữ liệu mà chưa có contract.
- Coi tài khoản, quyền, trạng thái hoặc validation mẫu là triển khai production đã được duyệt.
- Thêm tầng trừu tượng, dependency hoặc thư mục rỗng chỉ để giống một sơ đồ kiến trúc.

Khi đổi ranh giới module hoặc cách làm việc, cập nhật tài liệu này cùng thay đổi. Chi tiết triển khai và danh sách lệnh luôn đối chiếu source/manifest được liên kết, không duy trì thêm một bản mô tả song song.

## Giới hạn prototype hiện tại

Các luồng lưu-duyệt mua sắm, lưu giải trình kiểm kê, validation số lượng nhập/xuất và liên kết thu hồi/sửa chữa vẫn cần hoàn thiện khi phát triển chức năng. Catalog hiện được tải ở cấp App, nên lỗi catalog có thể chặn cả các route khác. Không dùng hành vi mẫu làm chuẩn nghiệm thu nghiệp vụ.

## Cấu trúc thư mục

Code ứng dụng nằm trực tiếp trong app, features, design-system, shared, infrastructure, styles và main.jsx. Package/config/tests/public-demo được đặt cùng bên trong frontend để thành viên clone chạy độc lập.
