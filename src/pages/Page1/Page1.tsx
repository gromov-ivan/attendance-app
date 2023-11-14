import DivComponent from '@/components/divComponent';

function Page1() {
  return (
    <>
      <h1>Test page</h1>
      <DivComponent>
        <h1 style={{ color: 'black' }}>This is a test header for the div element!</h1>
        <p style={{ color: 'black' }}>This text paragraph is also meant for testing!</p>
      </DivComponent>
    </>
  );
}

export default Page1;
