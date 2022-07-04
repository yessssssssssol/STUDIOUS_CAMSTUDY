import Head from 'next/head';

export default function Helmet({ title }) {
  return (
    <Head>
      <title>{title} | STUDIOUS CAMSTUDY </title>
      <meta
        name="description"
        content={
          'description' ||
          'STUDIOUS는 AI가 캠을 통해 유저를 인식하고 타이머를 자동으로 측정해줍니다. 원하는 스터디를 자유롭게 개설하고 참여해보세요!'
        }
      />
    </Head>
  );
}
