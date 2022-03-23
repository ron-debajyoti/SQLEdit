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
  from?: Array<string>,
  where?: string,
  setFrom: 'dropbutton' | 'editor',
}

export type OptionsType = {
  value: string,
  label: string
}

export type SelectionProps = {
  columns: Array<TableColumn>,
  tableName: string,
  setFunction: React.Dispatch<React.SetStateAction<SelectedOptionsType | undefined>>,
  bool: boolean,
  setBoolean: React.Dispatch<React.SetStateAction<boolean>>
}

