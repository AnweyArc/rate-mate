import Head from 'next/head';
import CurrencyTracker from '../components/CurrencyTracker';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Currency Exchange Rate Tracker</title>
        <meta name="description" content="Track currency exchange rates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <CurrencyTracker />
      </main>
    </div>
  );
}
