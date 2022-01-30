/* eslint-disable @next/next/link-passhref */
import WebApi from '../components/WebApi.jsx';
import WithPackage from '../components/WithPackage';

export default function Home() {
  return (
    <div>
<h1 className='text-center text-4xl font-semibold pt-10'>Next Js Text to Speech </h1>
      
      <WithPackage />
      <WebApi />
    </div>
  );
}