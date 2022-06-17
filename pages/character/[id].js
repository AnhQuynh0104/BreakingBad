import { useRouter } from 'next/router'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { notification, Typography, Tag } from 'antd'
import HeaderGoBack from '../../components/layout/HeaderGoBack'
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
            <HeaderGoBack />
            {detail.map(d => (
            <div className={styles.section} key={d}>
                <div className={styles['section-left']}>
                    <Title>{d.name}</Title>
                    <p><strong>Birthday: </strong> {d.birthday}</p>
                    <div><strong>
                        Job: </strong>{d.occupation.map(o => (
                            <Tag key={o}>{o}</Tag>
                        ))}
                    </div>
                    <br />
                    <p><strong>Status: </strong>{d.status}</p>
                    <p><strong>Nickname: </strong> {d.nickname}</p>
                    <p><strong>Actor: </strong>{d.portrayed}</p>
                    <p><strong>Category: </strong>{d.category}</p>
                    <div>
                        <strong>Season appearance: </strong>{d.appearance.map(a => (<Tag key={a}>{a}</Tag>))}
                    </div> 
                    <br />
                    <p>
                        <strong>Better Call Saul appearance: </strong>
                        { detail.better_call_saul_appearance != '' ? 
                            d.better_call_saul_appearance.map(b => (<Tag key={b}>{b}</Tag>))
                            : 0 
                        }
                    </p>
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