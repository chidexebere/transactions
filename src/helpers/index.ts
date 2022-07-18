export const getIconDirection = (
  key: TableKey,
  sortConfig: TableConfig | null,
) => {
  if (!sortConfig) {
    return;
  }
  return sortConfig.key === key ? sortConfig.direction : undefined;
};
