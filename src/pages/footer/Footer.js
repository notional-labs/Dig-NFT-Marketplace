import { Image, Input } from "antd"
import { useState } from "react"
import Button from "../../components/buttons/Button"
import github from '../../assets/img/github.png'
import twitter from '../../assets/img/twitter.png'
import discord from '../../assets/img/discord.png'
import telegram from '../../assets/img/telegram.png'

const style = {
    container: {
        padding: '0em 15em',
        marginTop: '10em',
        paddingBottom: '5em'
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
    },
    img: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        padding: '0em 7em 2em 7em',
    },
    contact: {

    },
    contackLink: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    contactContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10em 0',
    },
    bannerText: {
        texAlign: 'left',
        position: 'relative',
        width: '60%'
    },
    text: {
        texAlign: 'left',
        fontSize: '16px',
        width: '70%',
        margin: 0,
    },
    subscription: {
        display: 'grid',
        gridTemplateColumns: '3fr 1fr',
        gap: '10px',
        marginTop: '10px',
        width: '70%',
    },
    subscriptionButton: {
        backgroundColor: '#EEC13F',
        padding: '1em 2em',
        color: '#000000',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '10px',
    }
}

const Footer = ({ }) => {
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
            style={style.container}
        >
            <div
                style={style.contactContainer}
            >
                <div
                    style={style.bannerText}
                >
                    <p
                        style={{ ...style.text, fontWeight: 'bold', fontSize: '32px', color: '#EEC13F' }}
                    >
                        STAY IN THE MINES
                    </p>
                    <p
                        style={{ ...style.text, color: 'white' }}
                    >
                        Join our mailing list to stay in the mines with our newest feature releases, NFT drops, and tips and tricks for navigating DigChain. Email address
                    </p>
                    <div
                        style={style.subscription}
                    >
                        <Input
                            className="banner"
                            placeholder="Email"
                            onChange={handleChangeSubscriptionInput}
                            style={{
                                width: '100%',
                                borderRadius: '10px',
                                height: '100%'
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
                    style={style.contact}
                >
                    <p
                        style={{
                            fontSize: '32px',
                            color: '#EEC13F',
                            fontWeight: 'bold'
                        }}
                    >
                        JOIN OUR COMMUNITY
                    </p>
                    <div
                        style={style.contackLink}
                    >
                        <a
                            href='https://github.com/notional-labs/dig'
                            target={'_blank'}
                        >
                            <Image
                                src={github}
                                preview={false}
                                width={50}
                            />
                        </a>
                        <a
                            href='https://twitter.com/dig_chain'
                            target={'_blank'}
                        >
                            <Image
                                src={twitter}
                                preview={false}
                                width={50}
                            />
                        </a>
                        <a
                            href='https://discord.gg/UTNjQbGA'
                            target={'_blank'}
                        >
                            <Image
                                src={discord}
                                preview={false}
                                width={50}
                            />
                        </a>
                        <a
                            href='https://t.me/dig_chain_official'
                            target={'_blank'}
                        >
                            <Image
                                src={telegram}
                                preview={false}
                                width={50}
                            />
                        </a>
                    </div>
                </div>
            </div>
            <p
                style={{
                    fontSize: '16px',
                    color: '#ffffff',
                    paddingBottom: '5em'
                }}
            >
                {'Copyright © 2021 Digchain.'}
            </p>
        </div>
    )
}

export default Footer