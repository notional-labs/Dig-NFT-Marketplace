import { useEffect, useState } from "react"
import { Image } from "antd"
import Grid from "../../../components/grids/Grid"
import { fetchDummyTopNft } from "../../../utils/fetch"
import Button from "../../../components/buttons/Button"
import coinImg from '../../../assets/img/dig-coin.png'

const style = {
    title: {
        fontSize: '32px',
        textAlign: 'center',
        color: '#EEC13F',
        fontWeight: 'bold',
        marginBottom: '50px'
    },
    bannerCard: {
        padding: '0.8em',
    },
    avt: {
        position: 'relative',
        marginLeft: '40%',
        marginTop: '-13%'
    },
    grid: {
        
    },
    cardText: {
        textAlign: 'left',
        color: '#ffffff'
    },
    button: {
        color: '#000000',
        fontSize: '20px',
        fontWeight: 700,
        backgroundColor: '#EEC13F',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto',
        textAlign: 'center',
        width: '100%'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '2em'
    },
    imge: {

    },
    viewMoreButton: {
        color: '#EEC13F',
        fontSize: '20px',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: 'auto 0'
    },
}

const zeroPad = (num) => {
    return num.toString().padStart(3, "0");
}



const DemoNftList = ({ }) => {
    const [nfts, setNfts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const res = fetchDummyTopNft()
        if (Array.isArray(res) && res.length > 0) {
            setNfts([...res])
        }
    }, [])

    const handleClick = () => {

    }

    const getNftList = () => {
        let list = []
        const viewNft = nfts.slice(0, 8)
        viewNft.forEach(nft => {
            const jsx = (
                <div
                    className='glow-card'
                >
                    <div>
                        <Image
                            src={nft.img}
                            preview={false}
                            width={'100%'}
                            style={style.imge}
                        />
                    </div>
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
                            House #{zeroPad(nft.id)}
                        </p>
                        {/* <p>
                            {nft.quantity}/100
                        </p> */}
                    </div>
                    {/* <div
                        style={{
                            width: '100%'
                        }}
                    >
                        <Button
                            clickFunction={handleClickBuy}
                            style={style.button}
                            type={'function'}
                            text={'Buy'}
                            className={'buy-button'}
                        />
                    </div> */}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>

                        </div>
                        <div
                            style={{
                                color: '#EEC13F',
                                fontWeight: 'bold',
                                display: 'flex',
                                justifyContent: 'end'
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '20px',
                                    marginRight: '5px',
                                }}
                            >
                                {nft.price}
                            </div>
                            <div>
                                <img
                                    src={coinImg}
                                    alt={"dig-coin"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={style.grid}
        >
            <Grid
                lists={getNftList()}
                numberOfColumn={3}
                rowGap={50}
                colGap={50}
            />
        </div>
    )
}

export default DemoNftList