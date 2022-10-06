import Header from "../header/Header"
import Forms from "./form/Forms"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0,
    },
}

const NftCreate = ({ account, wrapSetAccount }) => {
    return (
        <div
            style={style.container}
        >
            <Header
                account={account}
                wrapSetAccount={wrapSetAccount}
            />
            <div
                style={{
                    width: '40%',
                    margin: '150px auto',
                    paddingBottom: '5em'
                }}
            >
                <p
                    style={{
                        color: 'white',
                        fontSize: '48px',
                        fontWeight: 'bold'
                    }}
                >
                    Create New NFT
                </p>
                <Forms
                    account={account}
                />
            </div>
        </div>
    )
}

export default NftCreate