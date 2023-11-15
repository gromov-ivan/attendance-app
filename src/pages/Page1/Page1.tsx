import AsideComponent from '@/components/asideComponent';
import DivComponent from '@/components/divComponent';

function Page1() {
  return (
    <>
      <DivComponent>
        <h1 style={{ color: 'black' }}>This is a test header for the div element!</h1>
        <p style={{ color: 'black' }}>This text paragraph is also meant for testing!</p>
      </DivComponent>
      <AsideComponent>
        <h1 style={{ color: 'black' }}>Test page</h1>
        <p style={{ color: 'black' }}>This paragraph tests the aside element.</p>
      </AsideComponent>
    </>
  );
}

export default Page1;
