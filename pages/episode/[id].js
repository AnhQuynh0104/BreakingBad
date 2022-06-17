import React from 'react'
import { useRouter } from 'next/router';
import Footer from '../../components/layout/Footer';
import HeaderGoBack from '../../components/layout/HeaderGoBack';
import { useState, useEffect } from 'react';
import { notification, Typography, Tag } from 'antd';
import styles from '../../styles/Home.module.css'

const {Title} = Typography

function EpisodeDetail(){
    const router = useRouter()
    const id = router.query.id
    const [episode, setEpisode] = useState([])

    useEffect(() => {
        async function fetchEpisode(){
            try {
                const response = await fetch(`https://www.breakingbadapi.com/api/episodes/${id}`)
                const data = await response.json()
                setEpisode(data)
            } catch (error) {
                notification.error({
                    message: error,
                    placement: 'topRight'
                })
            }
        }
        fetchEpisode()
    }, [])

    const onClickTag = async (c) => {
        const response = await fetch(`https://www.breakingbadapi.com/api/characters?name=${c}`)
        const data = await response.json()
        console.log(data)
        const character_id = data[0].char_id
        router.push(`/character/${character_id}`)
    }

    return(
        <>
            <HeaderGoBack />
            <div className={styles.body}>
                <h2>Episode {id} detail</h2>
                {episode.map((e) => (
                    <div key={e.episode}>
                        <Title>Title: {e.title}</Title>
                        <p><strong>Season:</strong> {e.season}</p>
                        <p><strong>Air date:</strong> {e.air_date}</p>
                        <div><strong>Characters: </strong> 
                            {e.characters.map((c) => (
                                <Tag key={c} onClick={() => onClickTag(c)}>{c}</Tag>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default EpisodeDetail