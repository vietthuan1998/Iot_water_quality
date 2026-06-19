export const normalizeValue = (
  value?: any | null,
  thresholdValue?: any[] | [],
) => {
  if (value === null) return;
  const matchedRule = thresholdValue?.find(
    item =>
      item.parameterId === value.parameterId &&
      item.deviceIdFk === value.deviceIdFk &&
      item.maxValue >= value.valueNumeric &&
      item.minValue <= value.valueNumeric,
  );
  return { ...value, status: matchedRule.alertLevel };
};
