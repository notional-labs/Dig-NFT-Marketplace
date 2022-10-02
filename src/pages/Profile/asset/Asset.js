import { useEffect, useState } from "react"
import NftList from "../nft/NftList"
import Collection from "../collection/Collection"
import Button from "../../../components/buttons/Button"
import DemoNftList from "../nft/DemoNftList"


const style = {
    container: {
        width: '100%',
        paddingLeft: '5em',
        marginTop: '100px'
    },
    button: {
        border: 'none',
        fontSize: '16px',
        fontWeight: 700,
        width: '10em',
        cursor: 'pointer',
        padding: '1em 2em'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start'
    },
    grid: {
        border: 'none',
        paddingTop: '2em'
    }
}

const Asset = ({ info, type, id }) => {
    const [tabSelect, setTabSelect] = useState(1)

    useEffect(() => {
        setTabSelect(1)
    }, [type])

    const changeTab = (value) => {
        setTabSelect(value)
    }

    return (
        <div
            style={style.container}
        >
            <div
                style={style.buttonContainer}
            >
                <Button
                    type={'function'}
                    style={{
                        ...style.button,
                        backgroundColor: tabSelect === 1 ? '#EEC13F' : '#D9D9D9',
                        color: '#000000',
                        borderRadius: '30px',
                        marginRight: '10px'
                    }}
                    clickFunction={() => {
                        changeTab(1)
                    }}
                    text={'NFT'}
                />
                {
                    type !== 'collection' && (
                        <Button
                            type={'function'}
                            style={{
                                ...style.button,
                                backgroundColor: tabSelect === 2 ? '#EEC13F' : '#D9D9D9',
                                color: '#000000',
                                borderRadius: '30px'
                            }}
                            clickFunction={() => {
                                changeTab(2)
                            }}
                            text={'COLLECTIONS'}
                        />
                    )
                }
            </div>
            <div
                style={style.grid}
            >
                {
                    tabSelect === 1 ? (
                        // <NftList
                        //     info={info}
                        //     id={id}
                        //     type={type}
                        // />
                        <DemoNftList/>
                    ) : (
                        <Collection />
                    )
                }
            </div>
        </div>
    )
}

export default Asset