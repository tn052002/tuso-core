import Link from 'next/link';

export default function WebPage() {
  return (
    <main className="container">
      <h1>Placeholder Web Page</h1>
      <p>This is the /web route.</p>
      <Link href="/">Back to home</Link>
    </main>
  );
}
