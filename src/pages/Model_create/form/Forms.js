import { Form, Input, Select, Image, InputNumber } from "antd"
import { useEffect, useState } from "react";
import { openNotification } from "../../../components/notifications/notification";
import { mintCallFromUser } from '../../../anonejs/mintNft'
import { queryAllContracts, queryAllDataOfAllModels, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo";
import Card from "../card/Card";
import './Forms.css'
import { openLoadingNotification } from "../../../components/notifications/notification";
import noAvtImg from "../../../assets/img/no-avt-img.png";
import uploadImg from '../../../assets/img/upload.png'
import addImg from '../../../assets/img/add-img.png'
import Button from "../../../components/buttons/Button";
import { TiDeleteOutline } from "react-icons/ti";
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons'
import Map from "./Map";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const { Option } = Select;

const style = {
    container: {
        position: 'relative',
    },
    title: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#EEC13F'
    },
    label: {
        color: '#F2F1F1',
        fontSize: '24px',
        marginBottom: 0,
        fontWeight: 'bold'
    },
    propertiesText: {
        margin: 0
    },
    input: {
        marign: '10px',
        padding: '1em',
        borderRadius: '10px'
    },
}

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [cordinate, setCordinate] = useState({
        lat: '',
        long: ''
    })
    const [properties, setProperties] = useState([{
        trait_type: '',
        value: ''
    }])
    const [images, setImages] = useState([])
    const [collections, setCollections] = useState([])
    const [selectCollection, setSelectCollection] = useState('')

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(process.env.REACT_APP_CODE_ID)
            setCollections([...res])
        })()
    }, [])

    const handleChangeImg = (e, type, index = 0) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (type === 'logo') {
                    setImgUrlLogo(reader.result)
                } else if (type === 'gallery') {
                    let newImgs = images.map((img, i) => {
                        return i === index ? reader.result : img
                    })
                    setImages([...newImgs])
                }
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const create = async (values) => {
        try {
            setLoading(true)
            openLoadingNotification('open')
            let config = {
                ...values,
                address: JSON.parse(account).account.address
            }
            const mintConfig = {
                size: '38',
                minterContract: config.collection,
                modelId: config.model,
                address: config.address
            }
            await mintCallFromUser(mintConfig)
            openLoadingNotification('close')
            openNotification('success', 'Submit successfully')
            reset()
        }
        catch (e) {
            openLoadingNotification('close')
            console.log(e.message)
            openNotification('error', e.message)
            reset()
        }
    }

    const submitFail = () => {
        openNotification('error', 'Submit unsuccessfully')
    }

    const reset = () => {
        form.resetFields()
        setImgUrlLogo('')
    }

    const handleRemoveProperty = (index) => {
        const filterProperties = properties.filter((prop, i) => i !== index)
        setProperties([...filterProperties])
    }

    const onChange = (e, index, type) => {
        let propList = [...properties]
        propList[index] = type === 'type' ? {
            ...propList[index],
            trait_type: e.target.value
        } : {
            ...propList[index],
            value: e.target.value
        }
        setProperties([...propList])
    }

    // const handleChange = (e, type) => {
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         if (reader.readyState === 2) {
    //             type === 'logo' ? setImgUrlLogo(reader.result) : setImgUrlBanner(reader.result)
    //         }
    //     }
    //     reader.readAsDataURL(e.target.files[0]);
    // };

    return (
        <div
            style={style.container}
        >
            <Form
                form={form}
                onFinish={create}
                onReset={reset}
                onFinishFailed={submitFail}
                layout="vertical"
            >
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Background Image
                </p>
                <Form.Item
                    name={'logo'}
                    rules={[
                        () => ({
                            validator() {
                                if (imgUrlLogo !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Must upload an image')
                            }
                        }),
                    ]}
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-logo'
                        onChange={(e) => { handleChangeImg(e, 'logo') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            aspectRatio: '1.5/1',
                            width: '50%',
                            backgroundColor: '#626262',
                            borderRadius: '10px',
                        }}
                    >
                        <label
                            htmlFor="input-logo"
                            className="logo"
                        >
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    borderRadius: '10px',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#C4C4C4',
                                    overflow: 'hidden'
                                }}
                            >
                                {
                                    !imgUrlLogo ? (
                                        <Image
                                            src={noAvtImg}
                                            preview={false}
                                            width={'20%'}
                                            style={{
                                                position: 'relative',
                                                top: '35%',
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={imgUrlLogo}
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
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Name
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Max 80 characters long.
                </p>
                <Form.Item
                    name={'name'}
                    rules={[
                        { required: true, message: 'Please input your collection name!' },
                        { max: 80, message: 'Max 80 characters!' }
                    ]}
                >
                    <Input
                        placeholder="NFT name"
                        style={{
                            padding: '1em',
                            borderRadius: '10px',
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Description
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Add a description to your collection. This will appear on the collection page.
                </p>
                <Form.Item
                    name={'description'}
                    rules={[
                        { required: true, message: 'Please input your collection description!' },
                        { max: 2000, message: 'Max 2000 characters!' }
                    ]}
                >
                    <TextArea rows={6}
                        placeholder="Description"
                        style={{
                            padding: '1em',
                            borderRadius: '10px',
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Location
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '16px',
                        marginTop: '10px'
                    }}
                >
                    Cordinate ( {cordinate.lat} : {cordinate.long} )
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Latitude and Longitude of the property
                </p>
                <Map
                    wrapSetCordinate={(lat, long) => {
                        setCordinate({
                            lat,
                            long
                        })
                    }}
                />
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '30px'
                    }}
                >
                    <div>
                        <p
                            style={{
                                ...style.label,
                                marginTop: '30px'
                            }}
                        >
                            Land Area (m2)
                        </p>
                        <Form.Item
                            name={'landArea'}
                            rules={[
                                { required: true, message: 'Please input land area!' },
                            ]}
                        >
                            <InputNumber
                                placeholder="Land area"
                                style={{
                                    padding: '1em',
                                    borderRadius: '10px',
                                    width: '100%'
                                }}
                                min={0}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <p
                            style={{
                                ...style.label,
                                marginTop: '30px'
                            }}
                        >
                            Construction Area (m2)
                        </p>
                        <Form.Item
                            name={'constructionArea'}
                            rules={[
                                { required: true, message: 'Please input construction area!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("landArea") >= value) {
                                            return Promise.resolve()
                                        }
                                        return Promise.reject('Construction area must be smaller than land area')
                                    }
                                }),

                            ]}
                        >
                            <InputNumber
                                placeholder="Construction area"
                                style={{
                                    padding: '1em',
                                    borderRadius: '10px',
                                    width: '100%'
                                }}
                                min={0}
                            />
                        </Form.Item>
                    </div>
                </div>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px',
                    }}
                >
                    Image Gallery
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Max 30 Image
                </p>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: '20px'
                    }}
                >
                    {
                        images.map((img, i) => {
                            return (
                                <div
                                    key={i}
                                >
                                    <Button
                                        type={'function'}
                                        text={<CloseOutlined />}
                                        clickFunction={() => {
                                            let newImg = [...images]
                                            newImg.splice(i, 1)
                                            setImages([...newImg])
                                        }}
                                        style={{
                                            position: 'relative',
                                            left: '90%',
                                            top: '15px',
                                            border: 0,
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                            zIndex: 2,
                                            aspectRatio: '1/1'
                                        }}
                                    />
                                    <input
                                        type='file'
                                        accept="image/png, image/jpeg, image/gif, image/jpg"
                                        id={`input-gallery-${i}`}
                                        onChange={(e) => { handleChangeImg(e, 'gallery', i) }}
                                        style={{
                                            display: 'none'
                                        }}
                                    />
                                    <div
                                        style={{
                                            aspectRatio: '1/1',
                                            width: '100%',
                                            backgroundColor: '#626262',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <label
                                            htmlFor={`input-gallery-${i}`}
                                            className="logo"
                                        >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    borderRadius: '10px',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    backgroundColor: '#C4C4C4',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {
                                                    !img ? (
                                                        <Image
                                                            src={uploadImg}
                                                            preview={false}
                                                            width={'30%'}
                                                            style={{
                                                                position: 'relative',
                                                                top: '40%',
                                                            }}
                                                        />
                                                    ) : (
                                                        <Image
                                                            src={img}
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
                    {
                        images.length < 30 && (
                            <div>
                                <Button
                                    type={'function'}
                                    text={<CloseOutlined />}
                                    style={{
                                        position: 'relative',
                                        left: '90%',
                                        top: '15px',
                                        border: 0,
                                        borderRadius: '50%',
                                        backgroundColor: 'transparent',
                                        zIndex: 2,
                                        aspectRatio: '1/1'
                                    }}
                                />
                                <Button
                                    type={'function'}
                                    text={<Image
                                        src={addImg}
                                        preview={false}
                                        width={'30%'}
                                    />}
                                    clickFunction={() => {
                                        setImages(['', ...images])
                                    }}
                                    style={{
                                        border: 'dashed 1px #EEC13F',
                                        borderRadius: '10px',
                                        backgroundColor: 'transparent',
                                        width: '100%',
                                        aspectRatio: '1/1',
                                        height: '100%',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        )
                    }
                </div>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px',
                    }}
                >
                    Collection
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    This is the collection where your item will appear.
                </p>
                <Form.Item
                    name={'collection'}
                    rules={[
                        { required: true, message: 'Please select a collection!' },
                    ]}
                    preserve={false}
                >
                    <Select
                        placeholder='Select Collection'
                        allowClear={true}
                        style={{
                            width: '100%',
                            borderRadius: '10px',
                        }}
                        onSelect={(val) => {
                            setSelectCollection(val)
                        }}
                        autoClearSearchValue={true}
                    >
                        {
                            collections.map(collection => {
                                return (
                                    <Option
                                        value={`${collection}`}
                                    >
                                        <Card
                                            addr={collection}
                                            type={'collection'}
                                        />
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Attributes
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    Properties show up underneath your item. Each nft can have upto 10 Properties
                </p>
                <div

                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            color: '#ffffff',
                            fontSize: '1.2rem'
                        }}
                    >
                        <div
                            style={{
                                width: '100%'
                            }}
                        >
                            <p
                                style={
                                    style.propertiesText
                                }
                            >
                                Property
                            </p>
                        </div>
                        <div
                            style={{
                                width: '100%',
                                textAlign: 'start'
                            }}
                        >
                            <p
                                style={{
                                    ...style.propertiesText,
                                    textAlign: 'start'
                                }}
                            >
                                Value
                            </p>
                        </div>
                    </div>
                    {
                        properties.map((property, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '10px',
                                            marginTop: '10px'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: '100%',
                                                marginRight: '10px'
                                            }}
                                        >
                                            <Input
                                                style={style.input}
                                                placeholder='Name'
                                                onChange={(e) => onChange(e, index, 'type')}
                                                value={property.trait_type}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                width: '100%',
                                                textAlign: 'end'
                                            }}
                                        >
                                            <Input
                                                style={style.input}
                                                placeholder='Value'
                                                onChange={(e) => onChange(e, index, 'value')}
                                                value={property.value}
                                            />
                                        </div>
                                    </div>
                                    {
                                        properties.length > 1 && (
                                            <Button
                                                type={'function'}
                                                clickFunction={() => handleRemoveProperty(index)}
                                                text={(
                                                    <div>
                                                        <TiDeleteOutline />
                                                    </div>
                                                )}
                                                style={{
                                                    border: 0,
                                                    backgroundColor: 'transparent',
                                                    cursor: 'pointer',
                                                    color: '#ffffff',
                                                    fontSize: '2rem',
                                                    position: 'relative',
                                                    top: '20%',
                                                }}
                                            />
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Button
                        type={'function'}
                        clickFunction={() => {
                            setProperties([...properties, {
                                trait_type: '',
                                value: ''
                            }])
                        }}
                        text={(
                            <div>
                                <PlusCircleOutlined /> Add more
                            </div>
                        )}
                        style={{
                            width: '30%',
                            border: 'solid 1px #ED9D26',
                            borderRadius: '10px',
                            color: '#ED9D26',
                            backgroundColor: 'transparent',
                            fontSize: '20px',
                            padding: '.5em',
                            cursor: 'pointer',
                            marginTop: '20px'
                        }}
                    />
                </div>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Supply per address
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    The number of items that can be minted.
                </p>
                <Form.Item
                    name={'limit'}
                    rules={[
                        { required: true, message: 'Please input a number!' },
                    ]}
                >
                    <InputNumber
                        placeholder="limit per address"
                        min={0}
                        max={50}
                        step={1}
                        style={{
                            padding: '.5em',
                            width: '100%',
                            fontSize: '20px',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'start'
                    }}
                >
                    <button
                        htmlType="submit"
                        style={{
                            border: 0,
                            backgroundColor: '#EEC13F',
                            color: '#000000',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginTop: '30px',
                            marginRight: '15px',
                            padding: '1em 0',
                            width: '20%',
                            cursor: 'pointer',
                            borderRadius: '10px'
                        }}
                    >
                        Create
                    </button>
                    <Link
                        to='/create'
                        style={{
                            border: 0,
                            backgroundColor: '#EEC13F',
                            color: '#000000',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginTop: '30px',
                            padding: '1em 0',
                            width: '20%',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        Back
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default Forms