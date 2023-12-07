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
    setQrCodeData(newData);
  }, [courseName, date]);

  return (
    <div>
      <QRCode value={qrCodeData} />
    </div>
  );
};

export default QrCodeGenerator;
