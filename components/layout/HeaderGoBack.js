import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ArrowLeftOutlined } from '@ant-design/icons'

function HeaderGoBack(){
    const router = useRouter()
    
    return(
        <>
            <Layout.Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key='1' onClick={() => router.back()}>
                        <ArrowLeftOutlined />
                    </Menu.Item>
                    <Menu.Item key='2'>
                        <Link href='/'>Home</Link>
                    </Menu.Item>
                </Menu>
                
            </Layout.Header>
        </>
    )
}

export default HeaderGoBack