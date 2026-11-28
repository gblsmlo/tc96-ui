function section(value: unknown): object {
  return typeof value === 'object' && value ? value : {}
}

export function mergeRecordPreviewLabels<TLabels extends object>(
  base: TLabels,
  override: Partial<Record<keyof TLabels, unknown>> | undefined,
  nested: readonly (keyof TLabels)[],
): TLabels {
  const merged = { ...base, ...override }
  for (const key of nested)
    Object.assign(merged, {
      [key]: { ...section(base[key]), ...section(override?.[key]) },
    })
  return merged
}
