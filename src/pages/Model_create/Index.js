import Forms from "./form/Forms"
import Header from "../header/Header"

const style = {
    container: {
        color: '#F2F1F1',
        position: 'relative',
        zIndex: 0
    },
}

const ModelCreate = ({ account, wrapSetAccount }) => {
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
                    Create New Item
                </p>
                <Forms
                    account={account}
                />
            </div>
        </div>
    )
}

export default ModelCreate