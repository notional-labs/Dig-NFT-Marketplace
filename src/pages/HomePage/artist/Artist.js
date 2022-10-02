import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyTopArtists } from "../../../utils/fetch"
import { Link } from "react-router-dom"

const style = {
    title: {
        fontSize: '32px',
        textAlign: 'center',
        color: '#EEC13F',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'left'
    },
    grid: {
        padding: '2em 20em'
    },
    cardText: {
        textAlign: 'left',
        color: '#ffffff',
        margin: 'auto'
    },
    container: {
        marginTop: '10em'
    }
}

const Artist = ({ }) => {
    const [artists, setArtist] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyTopArtists()
        if (Array.isArray(res) && res.length > 0) {
            setArtist([...res])
        }
    }, [])

    const getArtistList = () => {
        let list = []
        const viewArtists = artists.slice(0, 8)
        viewArtists.forEach(artist => {
            const jsx = (
                <div
                    className="glow-card"
                >
                    <Link
                        to={`/profile/${artist.id}`}
                    >
                        <div
                            style={style.card}
                        >
                            <div>
                                <Image
                                    src={artist.avt}
                                    preview={false}
                                    width={100}
                                    style={{
                                        borderRadius: '50%'
                                    }}
                                />
                            </div>
                            <div
                                style={style.cardText}
                            >
                                <p
                                    style={{
                                        fontSize: '20px',
                                        margin: 0
                                    }}
                                >
                                    {artist.name}
                                </p>
                                <p
                                    style={{
                                        margin: 0
                                    }}
                                >
                                    Floor price: {artist.floor_price}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            )
            list.push(jsx)
        })

        return list
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={style.title}
            >
                    TOP INVESTORS
            </div>

            <div
                style={style.grid}
            >
                <Grid
                    lists={getArtistList()}
                    numberOfColumn={4}
                    rowGap={35}
                    colGap={50}
                />
            </div>
        </div>
    )
}

export default Artist