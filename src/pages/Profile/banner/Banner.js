import { Image, Typography } from "antd"
import Contact from "../contact/Contact"
import verifiedImg from '../../../assets/img/verified.png'
import noImg from '../../../assets/img/no_image.png'
import Asset from "../asset/Asset"
import { getDate } from "../../../utils/stringConvert"

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

const Banner = ({ user, type, id, isCollection }) => {
    return (
        <div>
            <div
                style={{
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        backgroundImage: `url("https://ipfs.io/ipfs/${JSON.parse(user).user.banner.split('ipfs://')[1]}")`,
                        backgroundColor: 'gray',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        height: '35vh',
                        display: 'block',
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
                            {JSON.parse(user).user.logo ? (
                                <Image
                                    src={
                                       `https://ipfs.io/ipfs/${JSON.parse(user).user.logo.split('ipfs://')[1]}`
                                    }
                                    preview={false}
                                    width={'55%'}
                                    style={{
                                        borderRadius: '50%',
                                        position: 'relative',
                                        border: 'solid 2px white',
                                        marginBottom: '20px',
                                        aspectRatio: '1/1'
                                    }}
                                    fallback={noImg}
                                />
                            ) : (
                                <Image
                                    src={noImg}
                                    preview={false}
                                    width={'55%'}
                                    style={{
                                        borderRadius: '50%',
                                        position: 'relative',
                                        border: 'solid 2px white',
                                        marginBottom: '20px',
                                        aspectRatio: '1/1',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
                            <p
                                style={{

                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    position: 'relative',
                                    marginBottom: '10px'
                                }}
                            >
                                {
                                    JSON.parse(user).user.name
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
                                            text: JSON.parse(user).user.address,
                                        }}
                                    >
                                        <p
                                            style={style.address}
                                        >
                                            {JSON.parse(user).user.address}
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
                                {JSON.parse(user).user.description}
                            </p>
                            <Contact
                                type={type}
                                user={user}
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
                                Member since {getDate(JSON.parse(user).user.joinDate)}
                            </p>
                        </div>
                    </div>
                    <Asset
                        id={id}
                        user={user}
                        type={type}
                        isCollection={isCollection}
                    />
                </div>
            </div>
        </div >
    )
}

export default Banner