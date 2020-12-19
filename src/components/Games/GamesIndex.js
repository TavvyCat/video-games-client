import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import { indexGames } from '../../api/games'

const GamesIndex = props => {
    const [games, setGames] = useState(null)

    useEffect(() => {
        indexGames()
            .then(console.log)
            .catch(console.error)
    }, [])

    return (
        <Container>
            <h2 className="text-center">Games</h2>
            <Grid></Grid>
        </Container>
    )
}