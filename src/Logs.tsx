import React from 'react'
import { List, ListItemAvatar, ListItemText, Card, ListItem, Avatar, ListSubheader, Grid, IconButton } from '@material-ui/core'
import { ClearAll } from '@material-ui/icons'
import { Log } from './Gacha'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

interface Props {
    logs: Log[]
    clearHistory: () => void
}

const getDateString = (d: Date) => {
    return (
        `${d.getHours().toString().padStart(2, '0')}:` +
        `${d.getMinutes().toString().padStart(2, '0')}:` +
        `${d.getSeconds().toString().padStart(2, '0')}.` +
        `${d.getMilliseconds().toString().padStart(4, '0')}`
    )
}

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            maxHeight: '50vh',
            overflowY: 'scroll'
        },
        listHeader: {
            height: 0
        }
    })
)

export default (props: Props) => {
    const { logs, clearHistory } = props
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <List subheader={
                <ListSubheader className={classes.listHeader}>
                    <Grid container justify='flex-end'>
                        <Grid item><IconButton onClick={clearHistory}><ClearAll /></IconButton></Grid>
                    </Grid>
                </ListSubheader>
            }>
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