import Link from 'next/link';

export default function AppPage() {
  return (
    <main className="container">
      <h1>Placeholder App Page</h1>
      <p>This is the /app route.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
