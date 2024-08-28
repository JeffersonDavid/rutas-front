import React from 'react';

const RealTimeDataDisplay: React.FC<{ data: any }> = ({ data }) => (
  <div className="text-white mt-4">
    <p><strong>Real Time Data:</strong></p>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default RealTimeDataDisplay;
