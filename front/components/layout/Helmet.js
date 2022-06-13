import Head from 'next/head';

export default function Helmet({ title }) {
  return (
    <Head>
      <title>{title} | 의자왕을 찾아라👑</title>
    </Head>
  );
}
