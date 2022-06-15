import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { notification, Typography, Tag } from 'antd'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import styles from '../../styles/CharacterDetail.module.css'

const { Title } = Typography

function CharacterDetail(){
    const router = useRouter()
    const id = router.query.id
    const [detail, setDetail] = useState([])

    useEffect(() => {
        async function fetchDetailCharacter(){
            try{
                const response = await fetch(`https://www.breakingbadapi.com/api/characters/${id}`)
                const data = await response.json()
                setDetail(data)
            } catch(error){
                notification.error({
                    placement: "topRight",
                    message: error
                })
            }
        }
        fetchDetailCharacter()
    }, [])


    return(
        <>
            <Header />
            {detail.map(d => (
            <div className={styles.section} key={d}>
                <div className={styles['section-left']}>
                    <Title>{d.name}</Title>
                    <p>Birthday: {d.birthday}</p>
                    <div>
                        Job: {d.occupation.map(o => (
                            <Tag key={o}>{o}</Tag>
                        ))}
                    </div>
                    <p>Status: {d.status}</p>
                    <p>Nickname: {d.nickname}</p>
                    <p>Actor: {d.portrayed}</p>
                    <p>Category: {d.category}</p>
                    <div>
                        Season appearance: {d.appearance.map(a => (<Tag key={a}>{a}</Tag>))}
                    </div> 
                    { detail.better_call_saul_appearance != '' ? 
                        <div>
                            Better Call Saul appearance: 
                            { d.better_call_saul_appearance.map(b => (<Tag key={b}>{b}</Tag>)) }
                        </div>
                        : null
                    }
                </div>
                <div className={styles['section-right']}>
                    <Image 
                        alt='img' 
                        src={`/api/imageFetcher?url=${encodeURIComponent(d.img)}`} 
                        width="100%" 
                        height="100%" 
                        layout="responsive" 
                        objectFit="contain"
                    />
                </div>
            </div>
            ))}
            <Footer />
        </>
    )
}

export default CharacterDetail