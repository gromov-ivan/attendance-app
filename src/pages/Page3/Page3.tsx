import Typography from '@mui/material/Typography';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Page3() {
  return (
    <>
      <Meta title="page 3" />
      <FullSizeCenteredFlexBox>
        <Typography variant="h3">Settings</Typography>
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Page3;
