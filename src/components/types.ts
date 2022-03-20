export type AppFileType = {
  file: File,
  type: 'csv',
}

type TableColumn = {
  Header: string,
  accessor: string,
}

export type DataType = {
  columns: Array<TableColumn>,
  data: Record<any, string>[],
  type: 'csv',
}

