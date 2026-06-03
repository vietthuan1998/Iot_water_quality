export type Severity = 'normal' | 'warning' | 'danger';

export type SensorMetric = {
  id: string;
  label: string;
  shortLabel: string;
  value: number;
  unit: string;
  status: string;
  severity: Severity;
  trend: 'up' | 'down' | 'stable';
  safeRange: string;
  color: string;
  history: number[];
};

export type AlertItem = {
  id: string;
  metricId: string;
  title: string;
  value: number;
  unit: string;
  safeRange: string;
  level: 'Nguy hiểm' | 'Cảnh báo' | 'Lưu ý';
  color: string;
  updatedAt: string;
  history: number[];
  recommendations: string[];
  primaryAction?: string;
  secondaryAction?: string;
};

export const owner = {
  id: 'user-001',
  name: 'Nguyễn Văn An',
  role: 'Chủ hồ',
  avatarInitials: 'AN',
  phone: '0901 222 345',
};

export const waterArea = {
  id: 'area-koi-001',
  name: 'Hồ Koi An Cựu',
  type: 'Hồ cá Koi',
  location: 'TP. Huế',
  coordinates: {
    lat: 16.4498,
    lng: 107.5624,
  },
  volume: '18 m3',
  fishType: 'Koi Nhật',
  fishCount: 28,
  status: 'Nguy hiểm',
  updatedAt: '09:41 AM',
};

export const monitoringPoint = {
  id: 'point-main-pond',
  areaId: waterArea.id,
  name: 'Cụm cảm biến giữa hồ',
  connection: 'Online',
  battery: 86,
  signal: 'Wi-Fi mạnh',
  installedAt: '2026-04-12',
};

export const metrics: SensorMetric[] = [
  {
    id: 'do',
    label: 'Oxy hòa tan',
    shortLabel: 'DO',
    value: 3.2,
    unit: 'mg/L',
    status: 'Rất thấp',
    severity: 'danger',
    trend: 'down',
    safeRange: '> 5 mg/L',
    color: '#ef233c',
    history: [5.3, 5.1, 4.5, 4.6, 4.0, 3.6, 3.3, 2.8, 2.4, 2.1],
  },
  {
    id: 'temp',
    label: 'Nhiệt độ',
    shortLabel: 'Temp',
    value: 30.1,
    unit: '°C',
    status: 'Cao',
    severity: 'warning',
    trend: 'up',
    safeRange: '22 - 28 °C',
    color: '#ff6b1a',
    history: [29.1, 32.1, 31.8, 31.0, 30.6, 32.0, 29.8, 29.1, 28.8, 28.0],
  },
  {
    id: 'ph',
    label: 'pH',
    shortLabel: 'pH',
    value: 7.4,
    unit: '',
    status: 'Tốt',
    severity: 'normal',
    trend: 'stable',
    safeRange: '6.8 - 8.0',
    color: '#19b85a',
    history: [7.2, 7.3, 7.4, 7.4, 7.5, 7.4, 7.4, 7.3, 7.4, 7.4],
  },
  {
    id: 'turbidity',
    label: 'Độ đục',
    shortLabel: 'NTU',
    value: 2.6,
    unit: 'NTU',
    status: 'Hơi cao',
    severity: 'warning',
    trend: 'up',
    safeRange: '< 2 NTU',
    color: '#8f43ff',
    history: [1.7, 1.8, 2.0, 2.1, 2.1, 2.3, 2.4, 2.5, 2.6, 2.6],
  },
  {
    id: 'ammonia',
    label: 'Amoniac',
    shortLabel: 'NH3',
    value: 0.02,
    unit: 'mg/L',
    status: 'Cao',
    severity: 'danger',
    trend: 'up',
    safeRange: '< 0.01 mg/L',
    color: '#ff9f1c',
    history: [0.008, 0.014, 0.012, 0.016, 0.02, 0.021, 0.02],
  },
];

export const alerts: AlertItem[] = [
  {
    id: 'alert-do-low',
    metricId: 'do',
    title: 'Oxy hòa tan (DO) rất thấp',
    value: 3.2,
    unit: 'mg/L',
    safeRange: '> 5 mg/L',
    level: 'Nguy hiểm',
    color: '#ef233c',
    updatedAt: '09:41 AM',
    history: metrics[0].history,
    recommendations: [
      'Bật sục khí / máy oxy ngay lập tức.',
      'Kiểm tra hệ thống lọc và bơm.',
      'Giảm cho ăn và hạn chế cho cá hoạt động mạnh.',
    ],
    primaryAction: 'Bật oxy ngay',
    secondaryAction: 'Xem hướng dẫn',
  },
  {
    id: 'alert-ammonia-high',
    metricId: 'ammonia',
    title: 'Amoniac (NH3) cao',
    value: 0.02,
    unit: 'mg/L',
    safeRange: '< 0.01 mg/L',
    level: 'Nguy hiểm',
    color: '#ef233c',
    updatedAt: '09:41 AM',
    history: metrics[4].history,
    recommendations: [
      'Thay 20-30% nước ngay.',
      'Kiểm tra và vệ sinh hệ thống lọc.',
      'Hạn chế cho ăn, chỉ cho ăn lượng nhỏ.',
    ],
    secondaryAction: 'Mua chế phẩm',
  },
  {
    id: 'alert-temp-high',
    metricId: 'temp',
    title: 'Nhiệt độ cao',
    value: 30.1,
    unit: '°C',
    safeRange: '22 - 28 °C',
    level: 'Cảnh báo',
    color: '#ff6b1a',
    updatedAt: '09:41 AM',
    history: metrics[1].history,
    recommendations: [
      'Tăng cường sục khí để giảm nhiệt.',
      'Che nắng cho hồ nếu có thể.',
      'Theo dõi nhiệt độ thường xuyên.',
    ],
    secondaryAction: 'Xem hướng dẫn',
  },
];

export const aiInsights = [
  {
    id: 'ai-1',
    severity: 'danger' as Severity,
    text: 'Oxy đang rất thấp, nguy cơ cá nổi đầu.',
  },
  {
    id: 'ai-2',
    severity: 'warning' as Severity,
    text: 'Amoniac cao có thể gây độc cho cá.',
  },
  {
    id: 'ai-3',
    severity: 'warning' as Severity,
    text: 'Nhiệt độ cao làm giảm lượng oxy trong nước.',
  },
  {
    id: 'ai-4',
    severity: 'normal' as Severity,
    text: 'Cần xử lý sớm để tránh rủi ro.',
  },
];

export const devices = [
  { id: 'aerator', name: 'Máy oxy', status: 'Tắt', action: 'Bật ngay' },
  { id: 'pump', name: 'Máy bơm', status: 'Online', action: 'Kiểm tra' },
  { id: 'filter', name: 'Bộ lọc', status: 'Cần vệ sinh', action: 'Lên lịch' },
];
