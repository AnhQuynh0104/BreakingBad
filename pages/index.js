import Head from 'next/head'
import Image from 'next/image'
import { Input } from 'antd'
import banner from '../assets/images/banner.png'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import styles from '../styles/Home.module.css'

const { Search } = Input

export default function Home() {
  
  const search = async () => {
    
  }

  return (
    <>
      <Header />
      <Image src={banner} alt='banner' layout='responsive' />
      <Search
          placeholder="Search something..."
          allowClear
          enterButton="Search"
          size="large"
          onClick={search}
          className={styles['search-input']}
        />
      <Footer />
    </>
  )
}
