import { useState, useEffect } from "react"
import Image from "next/image";
import { Card, Typography, Tag, Button, Modal, notification } from 'antd'
import Header from "../../components/layout/Header"
import Footer from '../../components/layout/Footer'
import styles from '../../styles/Home.module.css'
import stylesCharacter from '../../styles/Character.module.css'
import Link from "next/link";

const { Meta } = Card
const { Title } = Typography

function Character(){
    const [character, setCharacter] = useState([])

    useEffect(() => {
        async function fetchCharacter(){
            try {
                const response =  await fetch('https://www.breakingbadapi.com/api/characters')
                const data = await response.json()
                setCharacter(data)
            } catch (error) {
                notification.error({
                    placement: "topRight",
                    message: error
                })
            }
        }
        fetchCharacter()
    }, [])

    return(
        <>
            <Header />
            <div className={styles.body}>
                <Title>Character</Title>
                <div className={stylesCharacter['list-character']} >
                {
                    character.map(c => (
                        <Link 
                            key={c.char_id}
                            href={`/character/${c.char_id}`}>
                            <Card 
                                key={c.id} 
                                className={stylesCharacter['list-character-item']}
                                hoverable
                                cover={
                                    <Image 
                                        alt="img" 
                                        src={`/api/imageFetcher?url=${encodeURIComponent(c.img)}`} 
                                        width="100%" 
                                        height="100%" 
                                        layout="responsive" 
                                        objectFit="contain"
                                    />
                                }
                            >
                                <Meta 
                                    title={c.name} 
                                    description={c.occupation.map((des) => (
                                        <Tag key={des}>{des}</Tag>
                                        ))
                                    }
                                />
                            </Card>
                        </Link>
                    ))
                }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Character