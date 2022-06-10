import Head from 'next/head'
import Image from 'next/image'
import banner from '../assets/images/banner.png'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer';

export default function Home() {
  
  return (
    <>
      <Header />
      <Image src={banner} alt='banner' layout='responsive' />
      <Footer />
    </>
  )
}
