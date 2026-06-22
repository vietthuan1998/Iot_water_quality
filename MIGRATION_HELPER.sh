#!/bin/bash

# Script để hỗ trợ thay thế Text component bằng CustomText
# 
# Lưu ý: Script này chỉ hỗ trợ, vẫn cần kiểm tra manual cho các trường hợp đặc biệt

echo "=========================================="
echo "Custom Text Migration Helper"
echo "=========================================="
echo ""

# Tìm tất cả files TypeScript/TSX có sử dụng Text từ react-native
echo "📍 Tìm các files sử dụng Text component:"
echo ""

find src -name "*.tsx" -o -name "*.ts" | while read file; do
  if grep -q "from.*react-native" "$file" && grep -q "<Text" "$file"; then
    echo "  ✓ $file"
  fi
done

echo ""
echo "=========================================="
echo "Các bước thay thế thủ công:"
echo "=========================================="
echo ""
echo "1. Mở file component"
echo ""
echo "2. Thêm import:"
echo "   import CustomText from '@/components/CustomText';"
echo ""
echo "3. Thay thế <Text> bằng <CustomText>"
echo ""
echo "4. Xóa hoặc chuyển inline styles:"
echo "   ❌ TRƯỚC:"
echo "      <Text style={{ fontSize: 16, fontWeight: '600' }}>"
echo ""
echo "   ✅ SAU:"
echo "      <CustomText variant=\"bodyBold\">"
echo ""
echo "5. Nếu cần màu sắc riêng:"
echo "   <CustomText variant=\"body\" color=\"#your-color\">"
echo ""
echo "6. Kiểm tra file:"
echo "   - Xóa unused imports (Text, StyleSheet nếu không dùng)"
echo "   - Format code"
echo "   - Test trên device"
echo ""

# Tạo list các file cần update
echo "=========================================="
echo "Danh sách file cần xem xét cập nhật:"
echo "=========================================="
echo ""

files_to_check=(
  "src/screens/HomeScreen.tsx"
  "src/screens/AlertsScreen.tsx"
  "src/screens/AlertsScreen2.tsx"
  "src/screens/LoginScreen.tsx"
  "src/screens/DeviceManageScreen.tsx"
  "src/screens/DeviceDetail.tsx"
  "src/components/home/Header.tsx"
  "src/components/home/MetricGrid.tsx"
  "src/components/home/AlertHero.tsx"
  "src/components/home/StatusPanel.tsx"
  "src/components/alerts/AlertCard.tsx"
  "src/components/alerts/AlertCard2.tsx"
  "src/components/device/DeviceCard.tsx"
  "src/components/BottomNav.tsx"
  "src/components/AppDrawerContent.tsx"
  "src/components/Counter.tsx"
  "src/components/FormField.tsx"
  "src/components/Dropdown.tsx"
  "src/components/DateTimeField.tsx"
)

for file in "${files_to_check[@]}"; do
  if [ -f "$file" ]; then
    echo "  • $file"
  fi
done

echo ""
echo "=========================================="
echo "💡 Mẹo: Sử dụng Find & Replace trong VS Code"
echo "=========================================="
echo ""
echo "1. Bấm Ctrl+H (macOS: Cmd+H) để mở Find & Replace"
echo ""
echo "2. Tìm: <Text"
echo "   Thay thế: <CustomText"
echo ""
echo "3. Tìm: </Text>"
echo "   Thay thế: </CustomText>"
echo ""
echo "⚠️  Sau đó vẫn cần kiểm tra manual!"
echo ""
