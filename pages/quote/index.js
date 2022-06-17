import React from 'react';
import { useRouter } from 'next/router';
import { List, Typography, Tag } from 'antd';
import { useEffect, useState } from 'react';
import HeaderGoBack from '../../components/layout/HeaderGoBack';
import Footer from '../../components/layout/Footer'
import styles from '../../styles/Home.module.css'

function Quote(){
    const router = useRouter()
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        async function fetchQuotes(){
            const response = await fetch('https://www.breakingbadapi.com/api/quotes')
            const data = await response.json()
            setQuotes(data)
        }
        fetchQuotes()
    }, [])

    const onClickTag = async (author) => {
        const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${author}`)
        const data = await response.json()
        const character_id = data[0].char_id
        router.push(`/character/${character_id}`)
    }

    return(
        <>
            <HeaderGoBack />
            <div className={styles.body}>
                <List
                    bordered
                    dataSource={quotes}
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text mark>
                                [{item.quote}] 
                            </Typography.Text> 
                            <br />
                            <Tag onClick={() => onClickTag(item.author)}>
                                {item.author}
                            </Tag> - {item.series}
                        </List.Item>
                    )}
                />
            </div>
            <Footer />
        </>
    )
}

export default Quote
