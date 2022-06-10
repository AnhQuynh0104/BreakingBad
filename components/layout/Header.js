import { Layout, Menu } from 'antd'
import Link from 'next/link'

function Header(){
    const menuItems = [
        {
            key: '1',
            
        }
    ]
    return(
        <>
            <Layout.Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key='1'>Home</Menu.Item>
                    <Menu.Item key='2'>
                        <Link href='/character'>Character</Link>
                    </Menu.Item>
                    <Menu.Item key='3'>
                        <Link href='/episode'>Episode</Link>
                    </Menu.Item>
                    <Menu.Item key='4'>
                        <Link href='/quote'>Quote</Link>
                    </Menu.Item>
                    <Menu.Item key='5'>
                        <Link href='/death'>Death</Link>
                    </Menu.Item>
                </Menu>
                
            </Layout.Header>
        </>
    )
}

export default Header