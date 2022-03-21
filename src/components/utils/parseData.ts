
const parseDataToFormat = (dataset: Array<string[]>) => {
  const columns:string[] = dataset[0];
  columns.splice(0,0,'serial_number')

  const tableColumns = columns.map((column,i) => {
    return {
      Header: column,
      accessor: `${column}_${i}`
    }
  });
  
  const tempData = dataset.slice(1,dataset.length);
  const tableRows: Array<Record<string, any>> = tempData.map((d,j) => {
    var res: Record<string,string> = {}
    tableColumns.map((tc,i) => {
      if (i==0) {
        res[tc.accessor] = (j+1).toString();
      } else {
        res[tc.accessor] = d[i];
      }
    });
    return res;
  })

  return { tableColumns, tableRows };
};


export {
  parseDataToFormat
}
