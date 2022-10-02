import { Image } from "antd"
import { useLocation } from "react-router-dom"
import { openNotification } from "../../../components/notifications/notification"
import Button from "../../../components/buttons/Button"
import emailImg from '../../../assets/img/email.png'
import facebookImg from '../../../assets/img/settingFb.png'
import twitterImg from '../../../assets/img/settingTwitter.png'
import behanceImg from '../../../assets/img/settingBe.png'
import igImg from '../../../assets/img/settingIg.png'
import shareImg from '../../../assets/img/share.png'
import shareImg2 from '../../../assets/img/share2.png'
import settingImg from '../../../assets/img/setting.png'
import bookmarkImg from '../../../assets/img/bookmark.png'

const style = {
    link: {
        marginLeft: '20px',
        color: '#ffffff',
        fontSize: '16px',
    },
    contactContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
    },
    button: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,

    }
}

const Contact = ({ type, info, id, account }) => {
    let location = useLocation();

    const handleClick = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}${location.pathname}`)
        openNotification('success', 'Save to clipboard')
    }

    const handleFollow = () => {
        alert('followed')
    }

    return (
        <div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: type === 'profile' ? '3fr 1fr 1fr' : '1fr 1fr',
                    gap: '10px',
                    marginBottom: '30px',
                    padding: '0 15%'
                }}
            >
                {type === 'profile' && (
                    <>
                        <Button
                            type={'function'}
                            style={{
                                ...style.button,
                                borderRadius: '30px',
                                padding: '.5em 1em',
                                backgroundColor: '#EEC13F',
                                width: '100%'
                            }}
                            clickFunction={handleFollow}
                            text={(
                                'Follow'
                            )}
                        />
                        <Button
                            type={'function'}
                            style={{
                                ...style.button,
                                height: '100%'
                            }}
                            clickFunction={handleClick}
                            text={(
                                <Image
                                    src={shareImg}
                                    preview={false}
                                    width={'100%'}
                                />
                            )}
                        />
                        <Button
                            type={'function'}
                            style={{
                                ...style.button,
                                height: '100%'
                            }}
                            clickFunction={handleClick}
                            text={(
                                <Image
                                    src={bookmarkImg}
                                    preview={false}
                                    width={'100%'}
                                />
                            )}
                        />
                    </>
                )}
                {
                    type === 'user-profile' ? (
                        <>
                            <Button
                                type={'function'}
                                style={{
                                    ...style.button,
                                    borderRadius: '30px',
                                    padding: '.5em 1em',
                                    backgroundColor: '#EEC13F',
                                    width: '100%'
                                }}
                                clickFunction={handleClick}
                                text={
                                    <>
                                        <Image
                                            src={shareImg2}
                                            preview={false}
                                        />
                                        <span
                                            style={{
                                                marginLeft: '5px'
                                            }}
                                        >
                                            Share
                                        </span>
                                    </>
                                }
                            />
                            <Button
                                type={'link'}
                                style={{
                                    ...style.button,
                                    borderRadius: '30px',
                                    padding: '.5em 1em',
                                    backgroundColor: '#EEC13F',
                                    width: '100%',
                                    color: 'black'
                                }}
                                url={'/user/edit'}
                                text={(
                                    <>
                                        <Image
                                            src={settingImg}
                                            preview={false}
                                        />
                                        <span
                                            style={{
                                                marginLeft: '5px'
                                            }}
                                        >
                                            Edit
                                        </span>
                                    </>
                                )}
                            />
                        </>
                    ) : type === 'collection' && account && JSON.parse(info).creator === JSON.parse(account).account.address && (
                        <Button
                            type={'link'}
                            style={style.button}
                            url={`/collection/${id}/edit`}
                            text={(
                                <Image
                                    src={settingImg}
                                    preview={false}
                                    width={'100%'}
                                />
                            )}
                        />
                    )
                }
            </div>
            {
                type !== 'collection' && (
                    <div
                        style={style.contactContainer}
                    >
                        <p>
                            <Image
                                src={emailImg}
                                preview={false}
                                width={'50%'}

                            />
                        </p>
                        <p>
                            <Image
                                src={facebookImg}
                                preview={false}
                                width={'50%'}

                            />
                        </p>
                        <p>
                            <Image
                                src={twitterImg}
                                preview={false}
                                width={'50%'}

                            />
                        </p>
                        <p
                            style={{
                                margin: 0
                            }}
                        >
                            <Image
                                src={behanceImg}
                                preview={false}
                                width={'50%'}

                            />
                        </p>
                        <p
                            style={{
                                margin: 0
                            }}
                        >
                            <Image
                                src={igImg}
                                preview={false}
                                width={'50%'}

                            />
                        </p>
                    </div>
                )
            }
        </div>
    )
}

export default Contact