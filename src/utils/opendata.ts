export async function checkStaffStatus(username: string, password: string) {
  const response = await fetch('https://streams.metropolia.fi/2.0/api/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(import.meta.env.VITE_API_KEY_METROPOLIA || ''),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message);
  }

  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}
