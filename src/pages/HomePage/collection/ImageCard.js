import { Image } from "antd"
import noImg from '../../../assets/img/no_image.png'
import { EllipsisOutlined } from '@ant-design/icons'

const style = {
    imageContainer: {
        overflow: 'hidden',
        borderRadius: '10px',
        position: 'relative',
        textAlign: 'center',
        zIndex: 1
    },
    img: {
        objectFit: 'cover',
        position: 'relative',
        zIndex: 1
    }
}

const getImageContainer = (images) => {
    if (!images || images.length === 0) {
        return (
            <div
                style={{
                    ...style.imageContainer,
                    height: '100%',
                    width: '100%'
                }}
            >
                <img
                    src={noImg}
                    width={'100%'}
                    style={style.img}
                    alt="nft-img"
                />
            </div>
        )
    }
    else if (images.length === 1) {
        return (
            <div
                style={{
                    ...style.imageContainer,
                    height: '100%',
                    width: '100%'
                }}
            >
                <img
                    src={images[0].src}
                    height={'100%'}
                    width={'100%'}
                    alt="nft-img"
                    style={style.img}
                />
            </div>
        )
    }
    else if (images.length === 2) {
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    columnGap: '5px',
                    height: '100%',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        ...style.imageContainer,
                        height: '100%',
                    }}
                >
                    <img
                        src={images[0].src}
                        height={'100%'}
                        alt="nft-img"
                        style={style.img}
                    />
                </div>
                <div
                    style={{
                        ...style.imageContainer,
                        height: '100%',
                    }}
                >
                    <img
                        src={images[1].src}
                        height={'100%'}
                        alt="nft-img"
                        style={style.img}
                    />
                </div>
            </div>
        )
    }
    else if (images.length === 3 || images.length === 4) {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    gridTemplateRows: `2fr 1fr`,
                    gap: '10px'
                }}
            >
                <div
                    style={{
                        ...style.imageContainer,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <img
                        src={images[0].src}
                        width={'100%'}
                        alt="nft-img"
                        style={style.img}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(3, 1fr)`,
                        gap: '5px',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    {
                        images.slice(1).map((image, i) => {
                            return (
                                <div
                                    style={{
                                        ...style.imageContainer,
                                        height: '100%',
                                        width: '100%'
                                    }}
                                    key={i}
                                >
                                    <img
                                        src={image.src}
                                        width={'100%'}
                                        height={'100%'}
                                        alt="nft-img"
                                        style={style.img}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    else if (images.length > 4) {
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'grid',
                    gridTemplateRows: `4fr 2fr`,
                    gap: '10px'
                }}
            >
                <div
                    style={{
                        ...style.imageContainer,
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <img
                        src={images[0].src}
                        width={'100%'}
                        alt="nft-img"
                        style={style.img}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(3, 1fr)`,
                        gap: '5px',
                        height: '100%',
                        width: '100%'
                    }}
                >
                    {
                        images.slice(1, 4).map((image, i) => {
                            return (
                                <div
                                    style={style.imageContainer}
                                    key={i}
                                >
                                    <img
                                        src={image.src}
                                        height={'100%'}
                                        width={'100%'}
                                        alt="nft-img"
                                        style={style.img}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const ImageCard = ({ images }) => {
    return (
        <div
            style={{
                padding: '0.8em',
                position: 'relative',
                width: '100%',
                aspectRatio: '3/2'
            }}
        >
            {
                getImageContainer(images)
            }
        </div>
    )
}

export default ImageCard