import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyBestCollections } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import ImageCard from "./ImageCard"

const style = {
    title: {
        fontSize: '32px',
        textAlign: 'center',
        color: '#EEC13F',
        fontWeight: 'bold',
        marginTop: '200px'
    },
    container: {

    },
    card: {
        color: '#000000',
    },
    grid: {
        padding: '2em 10em'
    },
    cardText: {
        textAlign: 'left',
        color: 'white',
        padding: '0.8em',
    },
    button: {
        color: '#EEC13F',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto 0'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2em'
    }
}

const Collection = ({ }) => {
    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyBestCollections()
        if (Array.isArray(res) && res.length > 0) {
            setCollections([...res])
        }
    }, [])

    const handleClick = () => {

    }

    const getCollectionsList = () => {
        let list = []
        const viewCollection = collections.slice(0, 6)
        viewCollection.forEach(col => {
            const jsx = (
                <div
                    className="glow-card"
                >
                    <a
                        href={`${process.env.REACT_APP_HOST}/collection/${col.id}`}
                    >
                        <div
                            style={style.card}
                        >
                            <ImageCard
                                images={col.nft.images}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    style={style.cardText}
                                >
                                    <p
                                        style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            margin: 0
                                        }}
                                    >
                                        {col.title}
                                    </p>
                                    <div
                                        style={{
                                            margin: 0,
                                            display: 'flex',
                                            justifyContent: 'start'
                                        }}
                                    >
                                        <Image
                                            src={col.avt}
                                            preview={false}
                                            style={{
                                                borderRadius: '50%',
                                            }}
                                            width={'50px'}
                                        />
                                        <p
                                            style={{
                                                marginLeft: '10px',
                                                position: 'relative',
                                                marginTop: 'auto'
                                            }}
                                        >
                                            by
                                            <span
                                                style={{
                                                    marginLeft: '5px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                {col.description}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        color: '#EEC13F',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        marginTop: 'auto',
                                        padding: '0.8em',
                                    }}
                                >
                                    40 items
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div>
            <div
                style={style.title}
            >
                TOP COLLECTIONS
            </div>

            <div
                style={style.grid}
            >
                <Grid
                    lists={getCollectionsList()}
                    numberOfColumn={3}
                    rowGap={35}
                    colGap={50}
                />
            </div>
            <div
                style={style.buttonContainer}
            >
                <Button
                    clickFunction={handleClick}
                    text={'View more...'}
                    style={style.button}
                    type={'function'}
                />
            </div>
        </div>
    )
}

export default Collection