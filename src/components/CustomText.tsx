import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { palette } from '../theme';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyBold' | 'caption' | 'captionBold' | 'label';

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
}

const styles = StyleSheet.create({
  // Heading 1
  h1: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: 0,
    color: palette.ink,
  },
  // Heading 2
  h2: {
    fontFamily: 'System',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: 0,
    color: palette.ink,
  },
  // Heading 3
  h3: {
    fontFamily: 'System',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    letterSpacing: 0,
    color: palette.ink,
  },
  // Heading 4
  h4: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0,
    color: palette.ink,
  },
  // Body Regular
  body: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: palette.ink,
  },
  // Body Bold
  bodyBold: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: palette.ink,
  },
  // Caption
  caption: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: palette.muted,
  },
  // Caption Bold
  captionBold: {
    fontFamily: 'System',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.4,
    color: palette.ink,
  },
  // Label
  label: {
    fontFamily: 'System',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.25,
    color: palette.ink,
  },
});

const CustomText = React.forwardRef<Text, CustomTextProps>(
  ({ variant = 'body', color, style, ...props }, ref) => {
    const baseStyle = styles[variant];
    
    return (
      <Text
        ref={ref}
        style={[
          baseStyle,
          color && { color },
          style,
        ]}
        {...props}
      />
    );
  }
);

CustomText.displayName = 'CustomText';

export default CustomText;
