import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Home, Settings } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'

interface Props {
    isMenuOpened: boolean
    onMenuClosed: () => void
    menuItems?: MenuItemType[]
}

const Menus: MenuItemType[] = [
    {
        primary: 'Home',
        path: '/',
        icon: <Home />
    },
    {
        primary: 'Preferences',
        path: '/preferences',
        icon: <Settings />
    }
]

export type MenuItemType = {
    primary: string,
    path: string,
    icon: JSX.Element
}

export default (props: Props) => {
    const { isMenuOpened, onMenuClosed, menuItems = Menus } = props
    const history = useHistory()
    const location = useLocation()

    const onMenuClicked = (path: string, onMenuClosed: () => void) => {
        return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            history.push(path.toLowerCase())
            onMenuClosed()
        }
    }

    return (
        <Drawer open={isMenuOpened} onClose={() => { onMenuClosed() }}>
            <List>
                {menuItems.map((v, i) => {
                    return (
                        <ListItem button onClick={onMenuClicked(v.path, onMenuClosed)} key={i} disabled={v.path === location.pathname}>
                            <ListItemIcon>{v.icon}</ListItemIcon>
                            <ListItemText primary={v.primary} />
                        </ListItem>
                    )
                })}
            </List>
        </Drawer>
    )
}