export type AppFileType = {
  file: File,
  type: 'csv',
}

export type TableColumn = {
  Header: string,
  accessor: string,
}

export type DataType = {
  columns: Array<TableColumn>,
  data: Record<any, string>[],
  type: 'csv',
  table: string,
}

export type SelectedOptionsType = {
  select?: Array<string>,
  from?: string,
  where?: string,
}

export type OptionsType = {
  value: string,
  label: string
}
