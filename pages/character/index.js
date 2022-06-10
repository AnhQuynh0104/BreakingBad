import { useState, useEffect } from "react"
import Image from "next/image";
import Header from "../../components/layout/Header"
import Footer from '../../components/layout/Footer';

function Character(){
    const [character, setCharacter] = useState([])

    useEffect(() => {
        async function fetchCharacter(){
            const response =  await fetch('https://www.breakingbadapi.com/api/characters')
            const data = await response.json()
            setCharacter(data)
        }
        fetchCharacter()
    }, [])


    return(
        <>
            <Header />
            <h1>Character</h1>
            {
                character.map(c => (
                    <div key={c.id}>
                        <p>{c.name}</p>
                        <p>{c.birthday}</p>
                        <p>{c.occupation.toString()}</p>
                        {/* <Image src={c.img} alt='image' width={100} height={100} /> */}
                        <p>{c.status}</p>
                        <p>{c.nickname}</p>
                        <p>{c.appearance.toString()}</p>
                    </div>
                ))
            }
            <Footer />
        </>
    )
}

export default Character