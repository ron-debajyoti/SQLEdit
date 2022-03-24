import { getCLS, getFCP, getFID, getTTFB, getLCP, ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler | undefined) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
