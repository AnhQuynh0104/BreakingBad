import React from "react"
import { List, Typography, notification } from "antd"
import { useState, useEffect } from "react"
import Link from 'next/link'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import styles from '../../styles/Home.module.css'

const {Title} = Typography

function Episode(){

    const [episodes, setEpisodes] = useState([])

    useEffect(() => {
        async function fetchEpisodes(){
            try {
                const response = await fetch('https://www.breakingbadapi.com/api/episodes')
                const data = await response.json()
                setEpisodes(data)
            } catch (error) {
                notification.error({
                    message: error,
                    placement: 'topRight'
                })
            }
        }
        fetchEpisodes()
    }, [])

    return(
        <>
            <Header />
            <div className={styles.body}>
                <Title>List episodes</Title>
                <List
                    header={<div>List Episodes</div>}
                    bordered
                    dataSource={episodes}
                    renderItem={item => (
                        <List.Item>
                            <Link href={`/episode/${item.episode_id}`}>
                                <div>
                                    <Typography.Text mark>[{item.episode_id}]</Typography.Text> {item.title}
                                </div>   
                            </Link>
                        </List.Item>
                    )}
                />
            </div>
            <Footer />
        </>
    )
}

export default Episode