import { Form, Input, Select, Image } from "antd"
import { useEffect, useState } from "react";
import { openNotification } from "../../../components/notifications/notification";
import { mintCallFromUser } from '../../../anonejs/mintNft'
import { queryAllContracts, queryAllDataOfAllModels, queryCollectionAddressOfLaunchpad } from "../../../anonejs/queryInfo";
import Card from "../card/Card";
import './Forms.css'
import { openLoadingNotification } from "../../../components/notifications/notification";
import noAvtImg from "../../../assets/img/no-avt-img.png";
import Button from "../../../components/buttons/Button";
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
    }
}

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [collections, setCollections] = useState([])
    const [selectCollection, setSelectCollection] = useState('')
    const [models, setModels] = useState([])
    const [sizes, setSizes] = useState([])

    useEffect(() => {
        (async () => {
            const res = await queryAllContracts(process.env.REACT_APP_CODE_ID)
            setCollections([...res])
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const contractAddr = await queryCollectionAddressOfLaunchpad(selectCollection)
            const res = await queryAllDataOfAllModels(contractAddr);
            console.log(res)
            setModels([...res.all_models_info])
        })()
    }, [selectCollection])

    const handleChangeImg = (e, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (type === 'logo') {
                    setImgUrlLogo(reader.result)
                } else {
                    setImgUrlBanner(reader.result)
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
        setImgUrlBanner('')
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
            ><p
                style={{
                    ...style.label,
                    marginTop: '50px'
                }}
            >
                    Logo collection
                </p>
                <Form.Item
                    name={'logo'}
                    rules={[
                        () => ({
                            validator() {
                                if (imgUrlLogo && imgUrlLogo !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Must upload an image')
                            }
                        }),
                    ]}
                    status="error"
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
                        marginTop: '50px'
                    }}
                >
                    Name collection
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
                        placeholder="Collection name"
                        style={{
                            padding: '1em',
                            borderRadius: '10px',
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
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
                        marginTop: '50px',
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
                {/* <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Size
                </p>
                <Form.Item
                    name={'size'}
                    rules={[
                        { required: true, message: 'Please add at least one size!' },
                    ]}
                >
                    <Size wrapSetSize={wrapSetSize}/>
                </Form.Item> */}
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
                            marginTop: '50px',
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
                            marginTop: '50px',
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