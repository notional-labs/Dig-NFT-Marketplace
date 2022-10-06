import { Image, Typography } from "antd"
import Contact from "../contact/Contact"
import verifiedImg from '../../../assets/img/verified.png'
import Asset from "../asset/Asset"

const style = {
    address: {
        fontSize: '16px',
        fontWeight: 400,
        marginBottom: '10px',
        width: '100%',
        overflow: 'hidden',
        display: '-webkit-box',
        textOverflow: 'ellipsis',
        lineHeight: '16px',
        maxHeight: '5em',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
    }
}

const Banner = ({ user, type, id, info, isCollection }) => {
    console.log(info)
    return (
        <div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url(${type === 'profile' ? JSON.parse(user).banner_img : JSON.parse(user).user.banner_img
                            })`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '35vh',
                        display: 'block'
                    }}
                />
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 3fr',
                        padding: '0 10em'
                    }}
                >
                    <div
                        style={{
                            marginLeft: 'auto',
                            textAlign: 'center',
                            backgroundColor: 'white',
                            borderRadius: '30px',
                            padding: '2em 2em 0em 2em',
                            width: '90%',
                            position: 'relative',
                            top: '-150px',
                            boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.3)',
                            minHeight: '55vh',
                            maxHeight: '65vh',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <Image
                                src={
                                    type === 'profile' ? JSON.parse(user).avt : JSON.parse(user).user.avt
                                }
                                preview={false}
                                width={'55%'}
                                style={{
                                    borderRadius: '50%',
                                    position: 'relative',
                                    border: 'solid 2px white',
                                    marginBottom: '20px'
                                }}
                            />
                            <p
                                style={{

                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    position: 'relative',
                                    marginBottom: '10px'
                                }}
                            >
                                {
                                    type === 'profile' ? JSON.parse(user).userName : JSON.parse(user).user.userName
                                }
                                <Image
                                    src={verifiedImg}
                                    preview={false}
                                    width={'20px'}
                                    style={{
                                        marginLeft: '10px',
                                    }}
                                />
                            </p>
                            {
                                type === 'user-profile' ? (
                                    <Typography.Paragraph
                                        copyable={{
                                            text: JSON.parse(user).account.address,
                                        }}
                                    >
                                        <p
                                            style={style.address}
                                        >
                                            {JSON.parse(user).account.address}
                                        </p>
                                    </Typography.Paragraph>
                                ) : type === 'profile' && (
                                    <Typography.Paragraph
                                        copyable={{
                                            text: JSON.parse(info).addr,
                                        }}
                                    >
                                        <p
                                            style={style.address}
                                        >
                                            {JSON.parse(info).addr}
                                        </p>
                                    </Typography.Paragraph>
                                )
                            }
                            <p
                                id='description'
                                style={{
                                    fontSize: '12px',
                                    position: 'relative',
                                    marginBottom: '30px',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    textOverflow: 'ellipsis',
                                    lineHeight: '16px',
                                    maxHeight: '5em',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {type === 'profile' ? JSON.parse(user).description : JSON.parse(user).user.description}
                            </p>
                            <Contact
                                type={type}
                            />
                        </div>
                        <div>
                            <hr
                                style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold'
                                }}
                            />
                            <p>
                                Member since Dec 02, 2021
                            </p>
                        </div>
                    </div>
                    <Asset
                        id={id}
                        info={info}
                        type={type}
                        isCollection={isCollection}
                    />
                </div>
            </div>
        </div >
    )
}

export default Banner