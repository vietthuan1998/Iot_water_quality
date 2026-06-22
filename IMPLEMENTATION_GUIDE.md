# 🎨 Custom Font Setup - Hướng dẫn triển khai toàn bộ dự án

## ✅ Những gì đã được tạo

### 1. **CustomText Component** (`src/components/CustomText.tsx`)
   - Component tùy chỉnh để áp dụng font chữ toàn cục
   - Hỗ trợ 9 variant text khác nhau
   - Cho phép custom color và style

### 2. **Theme với Typography** (`src/theme.ts`)
   - Cấu hình font sizes, weights, line heights
   - Định nghĩa letter spacing
   - Tập trung hóa tất cả cài đặt typography

### 3. **Component Index** (`src/components/index.ts`)
   - Export tất cả components
   - Giúp import dễ dàng hơn

### 4. **Tài liệu & Ví dụ**
   - `FONT_SETUP_GUIDE.md` - Hướng dẫn chi tiết
   - `src/components/CustomTextExamples.tsx` - Ví dụ sử dụng
   - `MIGRATION_HELPER.sh` - Script hỗ trợ thay thế

---

## 🚀 Cách sử dụng nhanh

### Cách 1: Import từ component index (Recommended)
```typescript
import { CustomText } from '@/components';

<CustomText variant="h1">Tiêu đề</CustomText>
```

### Cách 2: Import trực tiếp
```typescript
import CustomText from '@/components/CustomText';

<CustomText variant="body">Nội dung</CustomText>
```

---

## 📋 Text Variants (Kiểu chữ)

| Variant | Kích cỡ | Weight | Dùng cho |
|---------|--------|--------|----------|
| `h1` | 32px | 700 | Tiêu đề lớn nhất |
| `h2` | 28px | 700 | Tiêu đề cấp 2 |
| `h3` | 24px | 700 | Tiêu đề cấp 3 |
| `h4` | 20px | 600 | Tiêu đề cấp 4 |
| `body` | 16px | 400 | Nội dung chính |
| `bodyBold` | 16px | 600 | Nội dung đậm |
| `label` | 14px | 500 | Nhãn, button |
| `caption` | 12px | 400 | Chú thích |
| `captionBold` | 12px | 600 | Chú thích đậm |

---

## 🔄 Bước thay thế Text trong component

### Bước 1: Thêm import CustomText
```typescript
// Thêm dòng này
import { CustomText } from '@/components';
// hoặc
import CustomText from '@/components/CustomText';
```

### Bước 2: Thay thế `<Text>` bằng `<CustomText>`

**TRƯỚC:**
```typescript
import { Text } from 'react-native';

<Text style={{ fontSize: 16, fontWeight: '600' }}>
  Tiêu đề
</Text>
```

**SAU:**
```typescript
import { CustomText } from '@/components';

<CustomText variant="bodyBold">
  Tiêu đề
</CustomText>
```

### Bước 3: Xóa inline font styles
- Xóa `fontSize`, `fontWeight`, `lineHeight`
- Giữ lại styling khác (margin, padding, color, v.v.)

### Bước 4: Sử dụng prop `color` nếu cần custom màu
```typescript
<CustomText variant="body" color="#ef233c">
  Text màu đỏ
</CustomText>
```

---

## 🎯 Ví dụ thực tế từ dự án

### Ví dụ 1: Alert Card
```typescript
// TRƯỚC
<View style={styles.alertCard}>
  <Text style={{ fontSize: 24, fontWeight: '700' }}>
    ⚠️ Cảnh báo
  </Text>
  <Text style={{ fontSize: 16, marginVertical: 8 }}>
    Oxy hòa tan thấp
  </Text>
  <Text style={{ fontSize: 12, color: '#697086' }}>
    Cập nhật: 09:41 AM
  </Text>
</View>

// SAU
<View style={styles.alertCard}>
  <CustomText variant="h3">
    ⚠️ Cảnh báo
  </CustomText>
  <CustomText variant="body" style={{ marginVertical: 8 }}>
    Oxy hòa tan thấp
  </CustomText>
  <CustomText variant="caption">
    Cập nhật: 09:41 AM
  </CustomText>
</View>
```

### Ví dụ 2: Metric Display
```typescript
// SAU
<View style={styles.metricContainer}>
  <CustomText variant="h2" color="#ef233c">
    3.2
  </CustomText>
  <CustomText variant="caption">mg/L</CustomText>
  <CustomText variant="label" color="#ef233c">
    Rất thấp ↓
  </CustomText>
</View>
```

### Ví dụ 3: Form Input Label
```typescript
// SAU
<CustomText variant="label" style={{ marginBottom: 8 }}>
  Tên thiết bị
</CustomText>
<TextInput
  style={styles.input}
  placeholder="Nhập tên thiết bị"
/>
```

---

## 📝 Danh sách file cần cập nhật (Priority)

### 🔴 Cao (Critical)
- [ ] `src/screens/HomeScreen.tsx`
- [ ] `src/screens/LoginScreen.tsx`
- [ ] `src/screens/AlertsScreen.tsx`
- [ ] `src/screens/AlertsScreen2.tsx`

### 🟡 Trung bình
- [ ] `src/screens/DeviceManageScreen.tsx`
- [ ] `src/screens/DeviceDetail.tsx`
- [ ] `src/components/home/Header.tsx`
- [ ] `src/components/home/MetricGrid.tsx`
- [ ] `src/components/alerts/AlertCard.tsx`
- [ ] `src/components/device/DeviceCard.tsx`

### 🟢 Thấp
- [ ] `src/components/BottomNav.tsx`
- [ ] `src/components/Counter.tsx`
- [ ] `src/components/FormField.tsx`
- [ ] `src/components/Dropdown.tsx`

---

## 💡 Mẹo sử dụng Find & Replace trong VS Code

### Nhanh chóng thay thế `<Text>` → `<CustomText>`
1. Bấm `Ctrl+H` (Windows/Linux) hoặc `Cmd+H` (macOS)
2. **Find:** `<Text\s` (regex mode enabled)
3. **Replace:** `<CustomText `
4. Bấm "Replace All"

⚠️ **Sau đó cần kiểm tra manual!** Vì quá trình tự động có thể không hoàn hảo.

---

## 🔧 Tùy chỉnh Font (Optional)

Nếu muốn sử dụng custom font file thay vì system font:

### Android:
1. Đặt font file (`.ttf` hoặc `.otf`) vào: `android/app/src/main/assets/fonts/`
2. Cập nhật `CustomText.tsx`:
   ```typescript
   fontFamily: 'YourFontName',
   ```

### iOS:
1. Thêm font vào Xcode project
2. Cập nhật `Info.plist`
3. Cập nhật `CustomText.tsx` với font name đúng

---

## 🧪 Kiểm tra & Testing

### Trước khi commit:
- [ ] Kiểm tra trên iOS simulator
- [ ] Kiểm tra trên Android emulator
- [ ] Kiểm tra responsive trên các kích thước khác nhau
- [ ] Kiểm tra text wrapping
- [ ] Kiểm tra consistency font trên toàn app

### Command test:
```bash
# Android
npm run android

# iOS
npm run ios

# Hoặc build
npm run build
```

---

## ❓ Câu hỏi thường gặp

### Q: Có phải thay thế TẤT CẢ Text bằng CustomText không?
**A:** Có, để đảm bảo consistency font trên toàn app.

### Q: Nếu tôi quên thêm variant sẽ sao?
**A:** Nó sẽ dùng mặc định `variant="body"` với font 16px regular.

### Q: Có thể combine variant style với custom style không?
**A:** Có! Custom style sẽ override variant default.
```typescript
<CustomText variant="body" style={{ fontSize: 18 }}>
  Text với font 18px (override variant)
</CustomText>
```

### Q: Performance sẽ bị ảnh hưởng không?
**A:** Không, vì CustomText là thin wrapper.

---

## 📞 Hỗ trợ

Nếu gặp lỗi:
1. Kiểm tra import path có đúng không
2. Đảm bảo CustomText.tsx đã được tạo
3. Restart development server: `npm start`
4. Xóa build cache: `npm run clean` (nếu có)

---

**Chúc bạn thực hiện thành công!** 🎉
