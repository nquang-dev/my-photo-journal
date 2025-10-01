# Photo Journal

Ứng dụng nhật ký ảnh được xây dựng bằng React, TypeScript, Vite và Capacitor. Ứng dụng cho phép người dùng chụp ảnh, lưu trữ với tiêu đề tùy chỉnh, xem chi tiết và chia sẻ ảnh một cách dễ dàng.

## Mô tả dự án

Photo Journal là một ứng dụng mobile cross-platform được phát triển để giúp người dùng tạo và quản lý nhật ký ảnh cá nhân. Ứng dụng cung cấp các tính năng chính sau:

### Tính năng chính

- **Chụp ảnh**: Sử dụng camera của thiết bị để chụp ảnh mới
- **Lưu trữ ảnh**: Lưu ảnh với tiêu đề tùy chỉnh và thời gian tạo
- **Xem thư viện**: Hiển thị danh sách tất cả ảnh đã lưu theo thứ tự thời gian mới nhất
- **Xem chi tiết**: Xem ảnh ở kích thước lớn với thông tin chi tiết
- **Chỉnh sửa tiêu đề**: Cập nhật tiêu đề ảnh sau khi đã lưu
- **Xóa ảnh**: Xóa ảnh khỏi thư viện với xác nhận
- **Chia sẻ**: Chia sẻ ảnh sang các ứng dụng khác trên thiết bị

### Công nghệ sử dụng

- **Frontend**: React 19.1.1 với TypeScript
- **Build Tool**: Vite 7.1.7
- **Mobile Framework**: Capacitor 7.4.3
- **Styling**: Tailwind CSS 3.4.17
- **Navigation**: React Router DOM 7.9.3
- **State Management**: React Context API
- **Storage**: Capacitor Preferences cho metadata, Capacitor Filesystem cho file ảnh
- **Camera**: Capacitor Camera Plugin
- **Date Handling**: Day.js
- **Unique IDs**: UUID v4

### Cấu trúc dự án

```
src/
├── components/          # Các component UI tái sử dụng
├── context/            # React Context cho state management
├── hooks/              # Custom hooks
├── pages/              # Các trang chính của ứng dụng
├── routes/             # Cấu hình routing
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## Yêu cầu hệ thống

- Node.js 16.0 trở lên
- npm hoặc yarn
- Android Studio (để build và test trên Android)
- Android SDK (API level 22 trở lên)

## Cài đặt và chạy dự án

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy trên web browser (development)

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### 3. Build dự án

```bash
npm run build
```

### 4. Chạy trên Android

#### Chuẩn bị môi trường Android:

- Cài đặt Android Studio
- Cấu hình Android SDK
- Tạo Android Virtual Device (AVD) hoặc kết nối thiết bị Android thật

#### Build và sync với Android:

```bash
npm run sync:android
```

#### Mở trong Android Studio:

```bash
npm run android
```

#### Hoặc chạy trực tiếp trên thiết bị:

```bash
npm run android:run
```

### 5. Các lệnh khác

#### Kiểm tra linting:

```bash
npm run lint
```

#### Preview production build:

```bash
npm run preview
```

## Cấu hình

### Capacitor Configuration

File `capacitor.config.ts` chứa cấu hình cơ bản:

- App ID: `com.example.photojournal`
- App Name: `Photo Journal`
- Web Directory: `dist`

### Environment Variables

Dự án không yêu cầu environment variables đặc biệt. Tất cả cấu hình được quản lý thông qua Capacitor config.

## Cách sử dụng

1. **Trang chủ**: Hiển thị danh sách ảnh đã lưu và nút chụp ảnh mới
2. **Chụp ảnh**: Nhấn nút chụp ảnh để mở camera
3. **Lưu ảnh**: Sau khi chụp, nhập tiêu đề và lưu ảnh
4. **Xem chi tiết**: Nhấn vào ảnh để xem chi tiết và các tùy chọn
5. **Chỉnh sửa**: Trong trang chi tiết, nhấn nút chỉnh sửa để thay đổi tiêu đề
6. **Chia sẻ**: Sử dụng nút chia sẻ để gửi ảnh sang ứng dụng khác
7. **Xóa**: Sử dụng nút xóa với xác nhận để loại bỏ ảnh

## Lưu trữ dữ liệu

- **Metadata**: Lưu trong Capacitor Preferences dưới dạng JSON
- **File ảnh**: Lưu trực tiếp vào filesystem của thiết bị
- **Preview**: Sử dụng base64 URI để hiển thị nhanh

## Troubleshooting

### Lỗi camera không hoạt động:

- Kiểm tra quyền camera trong settings của thiết bị
- Đảm bảo ứng dụng được cấp quyền truy cập camera

### Lỗi build Android:

- Kiểm tra Android SDK đã được cài đặt đúng
- Đảm bảo ANDROID_HOME environment variable được set
- Chạy `npx cap sync android` để đồng bộ lại

### Lỗi không load được ảnh:

- Kiểm tra quyền storage của ứng dụng
- Xóa cache và data của ứng dụng, sau đó thử lại

## Đóng góp

Để đóng góp cho dự án:

1. Fork repository
2. Tạo feature branch
3. Commit các thay đổi
4. Push lên branch
5. Tạo Pull Request

## License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.
