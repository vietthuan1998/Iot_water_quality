# Hướng dẫn sử dụng Custom Text Component

## 📌 Giới thiệu

Để áp dụng font chữ toàn cục cho dự án, chúng ta sử dụng `CustomText` component thay vì `Text` component mặc định của React Native.

## 🎯 Cách sử dụng

### 1. Import CustomText

```typescript
import CustomText from '@/components/CustomText';
```

### 2. Các variant (kiểu) chữ có sẵn

| Variant | Kích cỡ | Font Weight | Mô tả |
|---------|--------|------------|-------|
| `h1` | 32px | 700 (Bold) | Tiêu đề lớn nhất |
| `h2` | 28px | 700 (Bold) | Tiêu đề cấp 2 |
| `h3` | 24px | 700 (Bold) | Tiêu đề cấp 3 |
| `h4` | 20px | 600 (Semibold) | Tiêu đề cấp 4 |
| `body` | 16px | 400 (Regular) | Nội dung chính |
| `bodyBold` | 16px | 600 (Semibold) | Nội dung đậm |
| `label` | 14px | 500 (Medium) | Nhãn, button text |
| `caption` | 12px | 400 (Regular) | Chú thích, text nhỏ |
| `captionBold` | 12px | 600 (Semibold) | Chú thích đậm |

### 3. Ví dụ sử dụng

#### Ví dụ cơ bản:
```typescript
import CustomText from '@/components/CustomText';

export const MyComponent = () => {
  return (
    <>
      <CustomText variant="h1">Tiêu đề chính</CustomText>
      <CustomText variant="body">Nội dung thông thường</CustomText>
      <CustomText variant="caption">Chú thích nhỏ</CustomText>
    </>
  );
};
```

#### Ví dụ với màu sắc tùy chỉnh:
```typescript
<CustomText variant="h2" color="#ef233c">
  Tiêu đề đỏ
</CustomText>

<CustomText variant="body" color="#697086">
  Nội dung xám
</CustomText>
```

#### Ví dụ với style tùy chỉnh:
```typescript
<CustomText 
  variant="bodyBold" 
  style={{ marginVertical: 10, textAlign: 'center' }}
>
  Nội dung đặc biệt
</CustomText>
```

### 4. Thay thế Text hiện tại

#### Trước (sử dụng Text mặc định):
```typescript
import { Text } from 'react-native';

<Text style={{ fontSize: 16, fontWeight: '600' }}>
  Tiêu đề
</Text>
```

#### Sau (sử dụng CustomText):
```typescript
import CustomText from '@/components/CustomText';

<CustomText variant="bodyBold">
  Tiêu đề
</CustomText>
```

## 📝 Hướng dẫn thay thế toàn cục

Để áp dụng CustomText cho toàn bộ dự án:

1. **Tìm tất cả `import { Text }` từ `react-native`:**
   ```bash
   grep -r "import.*Text.*from.*react-native" src/
   ```

2. **Thay thế trong các file:**
   - Xóa hoặc thêm: `import CustomText from '@/components/CustomText';`
   - Thay thế `<Text>` thành `<CustomText>`
   - Xóa các inline styles về font (fontSize, fontWeight, lineHeight)
   - Sử dụng prop `variant` thay thế

3. **Ví dụ file:**
   - [src/screens/HomeScreen.tsx](../../screens/HomeScreen.tsx)
   - [src/components/Header.tsx](../../components/home/Header.tsx)
   - [src/screens/LoginScreen.tsx](../../screens/LoginScreen.tsx)

## 🎨 Tùy chỉnh Font (Tuỳ chọn)

Nếu muốn sử dụng custom font thay vì system font:

### Cho Android:
1. Tải font file (.ttf hoặc .otf) vào `android/app/src/main/assets/fonts/`
2. Cập nhật `CustomText.tsx`:
   ```typescript
   fontFamily: 'YourFontName', // thay 'System' bằng tên font
   ```

### Cho iOS:
1. Link font trong `Podfile`
2. Cập nhật `Info.plist`
3. Cập nhật font name trong `CustomText.tsx`

## 💡 Mẹo

- Sử dụng `CustomText` cho **TẤT CẢ** text thay vì `Text` mặc định
- Luôn chọn variant phù hợp với nội dung
- Chỉ override style khi thực sự cần thiết
- Kiểm tra consistency trên cả iOS và Android

## ✅ Checklist

- [ ] Import `CustomText` trong file component
- [ ] Thay thế `Text` bằng `CustomText`
- [ ] Sử dụng prop `variant` thích hợp
- [ ] Xóa inline font styles
- [ ] Kiểm tra trên device/emulator
- [ ] Commit changes
