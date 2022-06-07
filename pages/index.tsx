import { NextPage } from 'next';

import ProjectSection from 'containers/Home/ProjectsSection';
import Layout from 'components/Layout';

import dynamic from 'next/dynamic';
const Banner = dynamic(() => import('containers/Home/Banner'))

import NewsSection from 'containers/Home/NewsSection';

const Home: NextPage = () => {
  return (
    <Layout>
      <Banner />
      <NewsSection />
      <ProjectSection />
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, max-age=31536000, immutable'
  );

  return {
    props: {},
  };
}

export default Home;
