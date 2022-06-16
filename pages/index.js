import { useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import { Input, notification, Button, Form, Modal, Typography } from 'antd'
import banner from '../assets/images/banner.png'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import styles from '../styles/Home.module.css'

const { Title } = Typography

export default function Home() {

  const [onSearch, setOnSearch] = useState([])
  const [openModal, setOpenModal] = useState(false)
  
  const onFinish = async (onSearch) => {
    const itemSearch = Object.values(onSearch).toString().trim().replace(/''/i, '+')
    setOpenModal(true)
    try {
      const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${itemSearch}`)
      const data = await response.json()
      setOnSearch(data)
    } catch (error) {
      notification.error({
        message: error,
        placement: 'topRight'
      })
    }
  }

  const hideModal = () => {
    setOpenModal(false)
  }

  return (
    <>
      <Header />
      <Image src={banner} alt='banner' layout='responsive' />
      <div className={styles['search-input']}>
        <Form onFinish={onFinish} className={styles['search-form']}>
          <Form.Item 
            name='' 
            className={styles['input-value']}
            rules={[{ required: true, message: 'Please input something!' }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>Search</Button>
          </Form.Item>
        </Form>
      </div>
      <Modal 
        title="Search Result"
        visible={openModal}
        onOk={hideModal}
        onCancel={hideModal}>
          {onSearch.map((s) => (
            <div key={s.name}>
              <Title className={styles['title']}>{s.name}</Title>
              <div style={{
                display: "flex",
                justifyContent: "center",
              }}>
                <Image alt='img' 
                  src={`/api/imageFetcher?url=${encodeURIComponent(s.img)}`} 
                  width={200} 
                  height={250} 
              />
              </div>
              <p>Birthday: {s.birthday}</p>
              <p>Occupation: {s.occupation.toString()}</p>
              <p>Status: {s.status}</p>
              <p>Nickname: {s.nickname}</p>
              <p>Appearance: {s.appearance.toString()}</p>
              <p>Actor: {s.portrayed}</p>
              <p>Category: {s.category}</p>
              <p>Better Call Sul appearance:   
              {
                s.better_call_saul_appearance.toString() != '' 
                  ? s.better_call_saul_appearance.toString()
                  : 0
              }</p>
            </div>
          ))}
      </Modal>
      <Footer />
    </>
  )
}
