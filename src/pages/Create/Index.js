import { useState } from "react"
import Button from "../../components/buttons/Button"
import NftCreate from "../Nft_create/Index"
import CollectionCreate from "../Collection_create/Index"
import ConnectButton from "../header/connect_button/ConnectButton"
import Header from "../header/Header"
import ConnectWalletPage from "../Connect_wallet_error_page/Index"
import ModelCreate from "../Model_create/Index"

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
        fontSize: '32px',
        fontWeight: 'bold',
        width: '8em',
        cursor: 'pointer'
    },
}

const CreatePage = ({ account, wrapSetAccount }) => {
    const [tabSelect, setTabSelect] = useState(1)

    const changeTab = (value) => {
        setTabSelect(value)
    }

    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            {
                account ? (
                    <div
                        style={{
                            padding: '3em 35em',
                            position: 'relative',
                            marginTop: '100px'
                        }}
                    >
                        <p
                            style={{
                                fontSize: '48px',
                                color: '#EEC13F',
                                fontWeight: 'bold'
                            }}
                        >
                            Create
                        </p>
                        <div>
                            <div
                                style={style.buttonContainer}
                            >
                                <Button
                                    type={'function'}
                                    style={{
                                        ...style.button,
                                        backgroundColor: tabSelect === 1 ? '#EEC13F' : 'transparent',
                                        color: tabSelect === 1 ? '#000000' : '#ffffff'
                                    }}
                                    clickFunction={() => {
                                        changeTab(1)
                                    }}
                                    text={'NFT'}
                                />
                                <Button
                                    type={'function'}
                                    style={{
                                        ...style.button,
                                        backgroundColor: tabSelect === 2 ? '#EEC13F' : 'transparent',
                                        color: tabSelect === 2 ? '#000000' : '#ffffff'
                                    }}
                                    clickFunction={() => {
                                        changeTab(2)
                                    }}
                                    text={'COLLECTION'}
                                />
                            </div>
                            <div>
                                {
                                    tabSelect === 1 ? (
                                        <NftCreate
                                            account={account}
                                            wrapSetAccount={wrapSetAccount}
                                        />
                                    ) : tabSelect === 2 && (
                                        <CollectionCreate
                                            account={account}
                                            wrapSetAccount={wrapSetAccount}
                                        />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
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
                )
            }
        </div>
    )
}

export default CreatePage