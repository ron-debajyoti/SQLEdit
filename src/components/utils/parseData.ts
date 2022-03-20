
const parseDataToFormat = (dataset: Array<string[]>) => {
  const columns:string[] = dataset[0];

  const tableColumns = columns.map((column,i) => {
    return {
      Header: column,
      accessor: `${column}_${i}`
    }
  });
  
  const tempData = dataset.slice(1,dataset.length);
  const tableRows: Array<Record<string, any>> = tempData.map((d) => {
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
