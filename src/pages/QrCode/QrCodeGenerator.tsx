import React, { useEffect, useState } from 'react';

import QRCode from 'qrcode.react';

interface QrCodeGeneratorProps {
  courseName: string;
  date: string;
}

const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ courseName, date }) => {
  const [qrCodeData, setQrCodeData] = useState<string>('');

  useEffect(() => {
    const newData = `${courseName}-${date}`;
    console.log('QR Code Data:', newData);
    setQrCodeData(newData);
  }, [courseName, date]);

  return (
    <div>
      <br />
      <QRCode value={qrCodeData} />
    </div>
  );
};

export default QrCodeGenerator;
