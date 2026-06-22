import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '@/components/CustomText';
import { palette } from '@/theme';

/**
 * EXAMPLE: Cách sử dụng CustomText thay vì Text mặc định
 * 
 * Hãy theo đúng pattern này khi thay thế Text trong các component
 */

export const CustomTextExamples = () => {
  return (
    <View style={styles.container}>
      {/* ========== HEADINGS ========== */}
      <View style={styles.section}>
        <CustomText variant="h1">Heading 1 - 32px Bold</CustomText>
        <CustomText variant="h2">Heading 2 - 28px Bold</CustomText>
        <CustomText variant="h3">Heading 3 - 24px Bold</CustomText>
        <CustomText variant="h4">Heading 4 - 20px Semibold</CustomText>
      </View>

      {/* ========== BODY TEXT ========== */}
      <View style={styles.section}>
        <CustomText variant="body">Body - Normal text 16px Regular</CustomText>
        <CustomText variant="bodyBold">Body Bold - 16px Semibold</CustomText>
      </View>

      {/* ========== LABELS & CAPTIONS ========== */}
      <View style={styles.section}>
        <CustomText variant="label">Label - 14px Medium</CustomText>
        <CustomText variant="caption">Caption - 12px Regular</CustomText>
        <CustomText variant="captionBold">Caption Bold - 12px Semibold</CustomText>
      </View>

      {/* ========== WITH CUSTOM COLORS ========== */}
      <View style={styles.section}>
        <CustomText variant="h2" color={palette.red}>
          Red Heading
        </CustomText>
        <CustomText variant="body" color={palette.orange}>
          Orange Body Text
        </CustomText>
        <CustomText variant="body" color={palette.green}>
          Green Body Text
        </CustomText>
        <CustomText variant="body" color={palette.blue}>
          Blue Body Text
        </CustomText>
      </View>

      {/* ========== WITH CUSTOM STYLES ========== */}
      <View style={styles.section}>
        <CustomText
          variant="label"
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: palette.border,
            borderRadius: 6,
          }}
        >
          Label with background
        </CustomText>

        <CustomText
          variant="body"
          style={{
            textAlign: 'center',
            marginVertical: 10,
            lineHeight: 28,
          }}
        >
          Centered body text with custom line height
        </CustomText>
      </View>

      {/* ========== ALERT CARD EXAMPLE ========== */}
      <View style={[styles.section, styles.alertCard]}>
        <CustomText variant="h3" color={palette.red}>
          ⚠️ Alert Title
        </CustomText>
        <CustomText variant="body" style={{ marginVertical: 8 }}>
          This is an alert message using custom text component
        </CustomText>
        <CustomText variant="caption" color={palette.muted}>
          09:41 AM • Cập nhật lần cuối
        </CustomText>
      </View>

      {/* ========== METRIC EXAMPLE ========== */}
      <View style={styles.metricContainer}>
        <View style={styles.metric}>
          <CustomText variant="h2" color={palette.red}>
            3.2
          </CustomText>
          <CustomText variant="caption" color={palette.muted}>
            mg/L
          </CustomText>
          <CustomText variant="label" color={palette.red}>
            Rất thấp ↓
          </CustomText>
        </View>

        <View style={styles.metric}>
          <CustomText variant="h2" color={palette.blue}>
            30.1
          </CustomText>
          <CustomText variant="caption" color={palette.muted}>
            °C
          </CustomText>
          <CustomText variant="label" color={palette.blue}>
            Cao ↑
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.page,
    padding: 16,
  },
  section: {
    marginVertical: 16,
  },
  alertCard: {
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: palette.red,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  metricContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: palette.surface,
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
  },
  metric: {
    alignItems: 'center',
  },
});

export default CustomTextExamples;
