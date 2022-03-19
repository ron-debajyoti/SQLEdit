import { DataType } from "../types";

const parseDataToFormat = (dataset:DataType) => {
  const { columns, data} = dataset;
  const dataLength = data.length;

  const tableColumns = columns.map((column,i) => {
    return {
      Header: column,
      accessor: `${column}_${i}`
    }
  });
  
  const tableRows: Array<Record<string, any>> = data.map((d) => {
    var res: Record<string,string> = {}
    tableColumns.map((tc,i) => {
      res[tc.accessor] = d[i];
    });
    return res;
  })

  return { tableColumns, tableRows };
};


export {
  parseDataToFormat
}
