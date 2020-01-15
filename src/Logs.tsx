import React from 'react'
import { List, ListItemAvatar, ListItemText, Card, ListItem, Avatar } from '@material-ui/core'
import { Log } from './Gacha'

interface Props {
    logs: Log[]
}

const getDateString = (d: Date) => {
    return (
        `${d.getHours().toString().padStart(2, '0')}:` +
        `${d.getMinutes().toString().padStart(2, '0')}:` +
        `${d.getSeconds().toString().padStart(2, '0')}.` +
        `${d.getMilliseconds().toString().padStart(4, '0')}`
    )
}

export default (props: Props) => {
    const { logs } = props

    return (
        <Card>
            <List>
                {logs.map(v => {
                    const { display, timestamp, number } = v
                    const date = new Date()
                    date.setTime(timestamp)

                    return (
                        <ListItem key={timestamp}>
                            <ListItemAvatar>
                                <Avatar>{number}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={display} secondary={getDateString(date)} />
                        </ListItem>
                    )
                }).reverse()}
            </List>
        </Card>
    )
}