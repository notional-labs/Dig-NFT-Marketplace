import { Image } from "antd"
import { features } from "process"
import noAvtImg from "../../../assets/img/no-avt-img.png";

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

const ImageFormCard = ({ featureImage, handleChange }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '65%',
                aspectRatio: '3/2'
            }}
        >
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
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='feature-1'
                        onChange={(e) => { handleChange(e, 'feature-1') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            width: '100%',
                            backgroundColor: '#626262',
                            aspectRatio: '2/1',
                            overflow: "hidden",
                            borderRadius: '10px'
                        }}
                    >
                        <label
                            htmlFor="feature-1"
                            className="logo"
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#C4C4C4'
                                }}
                            >
                                {
                                    !featureImage.banner1 ? (
                                        <Image
                                            src={noAvtImg}
                                            preview={false}
                                            width={'7%'}
                                            style={{
                                                position: 'relative',
                                                top: '40%'
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={featureImage.banner1}
                                            preview={false}
                                            width={'100%'}
                                            height={'100%'}
                                            style={{
                                                objectFit: 'cover'
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </label>
                    </div>
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
                        featureImage.imagesRow.map((image, i) => {
                            return (
                                <div
                                    style={{
                                        ...style.imageContainer,
                                        height: '100%',
                                        width: '100%',
                                    }}
                                >
                                    <input
                                        type='file'
                                        accept="image/png, image/jpeg, image/gif, image/jpg"
                                        id={`feature-row-${i + 1}`}
                                        onChange={(e) => { handleChange(e, `feature-row-${i}`) }}
                                        style={{
                                            display: 'none'
                                        }}
                                    />
                                    <div
                                        style={{
                                            width: '100%',
                                            backgroundColor: '#626262',
                                            aspectRatio: '2/1',
                                            overflow: "hidden",
                                            borderRadius: '10px'
                                        }}
                                    >
                                        <label
                                            htmlFor={`feature-row-${i + 1}`}
                                            className="logo"
                                        >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    backgroundColor: '#C4C4C4'
                                                }}
                                            >
                                                {
                                                    !image ? (
                                                        <Image
                                                            src={noAvtImg}
                                                            preview={false}
                                                            width={'20%'}
                                                            style={{
                                                                position: 'relative',
                                                                top: '30%'
                                                            }}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={image}
                                                            preview={false}
                                                            width={'100%'}
                                                            height={'100%'}
                                                            style={{
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ImageFormCard