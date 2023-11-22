import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page2() {
  return (
    <>
      <Meta title="page 2" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">QR Code</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page2;
