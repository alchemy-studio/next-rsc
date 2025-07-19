import Counter from './_components/Counter';

async function getEcho() {
  // Note: Using the full URL because this fetch is happening on the server.
  // With older Next.js versions, it's safer to use the absolute URL.
  const res = await fetch('http://localhost:3000/api/echo?message=Hello from Server Component!');
  if (!res.ok) {
    return { echo: 'Failed to fetch' };
  }
  return res.json();
}

export default async function Home() {
  const data = await getEcho();

  return (
    <main>
      <h1>Server + Client</h1>
      <Counter />
      <h2>Echo from API:</h2>
      <p>{data.echo}</p>
    </main>
  );
}
