import { useState } from "react"
import Button from "../../components/buttons/Button"
import NftCreate from "../Nft_create/Index"
import CollectionCreate from "../Collection_create/Index"
import ConnectButton from "../header/connect_button/ConnectButton"
import Header from "../header/Header"
import ConnectWalletPage from "../Connect_wallet_error_page/Index"
import ModelCreate from "../Model_create/Index"
import singleNftImg from '../../assets/img/single-nft.png'
import collectionImg from '../../assets/img/collection.png'
import { Image } from "antd"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0,
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start'
    },
    button: {
        border: 'solid 1px #EEC13F',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '50%',
        cursor: 'pointer',
        marginTop: '30px',
        borderRadius: '10px',
        padding: '1em 0',
        backgroundColor: '#EEC13F',
        color: 'black'
    },
}

const CreatePage = ({ account, wrapSetAccount }) => {

    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            {
                !account ? (
                    <div
                        style={{
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '40%',
                            margin: 'auto'
                        }}
                    >
                        <ConnectWalletPage
                            wrapSetAccount={wrapSetAccount}
                        />
                    </div>
                ) : (
                    <div
                        style={{
                            padding: '3em 30em',
                            position: 'relative',
                            marginTop: '100px',
                            textAlign: 'center'
                        }}
                    >
                        <p
                            style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginBottom: '20px'
                            }}
                        >
                            Upload item
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                marginBottom: '50px'
                            }}
                        >
                            Choose “Single NFT” if you want your collectible to be one of a kind or “Collection” if
                            <br />
                            you want to be sell one collectible multiple times/
                        </p>
                        {
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '70px'
                                }}
                            >
                                <div>
                                    <Image
                                        src={singleNftImg}
                                        preview={false}
                                        width={'100%'}
                                        style={{
                                            borderRadius: '10px'
                                        }}
                                    />
                                    <Button
                                        type={'link'}
                                        url={'/nft/create'}
                                        style={{
                                            ...style.button,
                                        }}
                                        text={'Single NFT'}

                                    />
                                </div>
                                <div>
                                    <Image
                                        src={collectionImg}
                                        preview={false}
                                        width={'100%'}
                                        style={{
                                            borderRadius: '10px'
                                        }}
                                    />
                                    <Button
                                        type={'link'}
                                        url={'/item/create'}
                                        style={{
                                            ...style.button,
                                        }}
                                        text={'Real estate'}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default CreatePage