import { Image, Input } from "antd"
import { useState } from "react"
import bannerImg from '../../../assets/img/banner.png'
import Button from "../../../components/buttons/Button"
import bannerBackground from "../../../assets/img/banner-background.png"
import Carosel from "../../../components/carousal/carousal"

const style = {
    bannerContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        color: '#ffffff',
        marginTop: '250px',
        overflow: 'hidden',
        padding: '0 20em 0 20em',
        texAlign: 'left',
        height: '70vh'
    },
    bannerText: {
        texAlign: 'left',
        position: 'relative',
    },
    text: {
        texAlign: 'left',
        fontSize: '16px',
        width: '70%',
        margin: 0
    },
    header: {
        color: '#EEC13F',
        fontWeight: 'bold',
        fontSize: '48px',
        margin: 0,
    },
    subscription: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '30px'
    },
    subscriptionButton: {
        backgroundColor: '#EEC13F',
        padding: '1em 2em',
        color: '#000000',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '10px'
    }
}

const Banner = ({ }) => {
    const [subscriptionInput, setSubscriptionInput] = useState('')

    const handleClickSubscription = () => {
        console.log(subscriptionInput)
        // need add subscription feature
    }

    const handleChangeSubscriptionInput = (e) => {
        setSubscriptionInput(e.target.value)
    }

    return (
        <div
            style={style.bannerContainer}
        >
            <div
                style={{
                    backgroundImage: `url(${bannerBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    overFlow: 'hidden',
                    opacity: 0.25,
                    width: '100%',
                    position: 'fixed',
                    minHeight: '100%'
                }}
            />
            <div
                style={style.bannerText}
            >
                <p
                    style={{ ...style.text, fontWeight: 500, fontSize: '24px' }}
                >
                    WELCOME TO DIG NFT MARKETPLACE
                </p>
                <h1
                    style={style.header}
                >
                    HOUSE
                </h1>
                <p
                    style={{ ...style.text }}
                >
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
                <div
                    style={style.subscription}
                >
                    <p
                        style={{
                            fontSize: '1.5em',
                            color: '#EEC13F',
                            fontWeight: 'bold',
                            margin: 'auto 0'
                        }}
                    >
                        SIGN UP FOR DROP
                    </p>
                    <Input
                        className="banner"
                        placeholder="Email"
                        onChange={handleChangeSubscriptionInput}
                        style={{
                            width: '50%',
                            marginLeft: '10px',
                            borderRadius: '10px'
                        }}
                    />
                    <Button
                        style={style.subscriptionButton}
                        text={'Submit'}
                        clickFunction={handleClickSubscription}
                        type={'function'}
                    />
                </div>
            </div>

            <div
                style={{
                    position: 'relative',
                    zIndex: 0
                }}
            >
               {Carosel}
            </div>
        </div>
    )
}

export default Banner