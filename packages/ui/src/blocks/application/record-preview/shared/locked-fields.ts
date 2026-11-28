export function createFieldLock<TField extends string>(
  readOnly: boolean,
  readOnlyFields: readonly TField[] | undefined,
) {
  return (field: TField) => readOnly || Boolean(readOnlyFields?.includes(field))
}
