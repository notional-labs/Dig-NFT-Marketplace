import { Form, Input, Slider, InputNumber, Image } from "antd"
import { useState } from "react";
import { createCollection } from "../../../anonejs/createCollection";
import { openNotification } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
import noImg from "../../../assets/img/no_image.png";
import emailImg from '../../../assets/img/email.png'
import facebookImg from '../../../assets/img/facebook.png'
import igImg from '../../../assets/img/instagram.png'
import twitterImg from '../../../assets/img/twit.png'
import behanceImg from '../../../assets/img/behance.png'
import webImg from '../../../assets/img/web.png'
import noAvtImg from '../../../assets/img/no-avt-img.png'
import './Forms.css'

const { TextArea } = Input;

const style = {
    container: {
        width: '70%'
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
        fontWeight: 'bold',
        marginTop: '50px'
    }
}

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [paymentAddr, setPaymentAddr] = useState(JSON.parse(account).account.address)

    const update = async (values) => {
        let val = { ...values }
        val.log = imgUrlLogo
        val.banner = imgUrlBanner
        console.log(val)
    }

    const submitFail = () => {
        openNotification('error', 'Submit unsuccessfully')
    }

    const reset = () => {
        form.resetFields()
        setImgUrlLogo('')
        setImgUrlBanner('')
    }

    const handleChange = (e, type) => {
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

    const handleClick = () => {
        console.log(form.getFieldsValue())
    }

    const handleChangeAddress = (e) => {
        setPaymentAddr(e.target.value)
    }

    return (
        <div style={style.container}>
            <p
                style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#EEC13F'
                }}
            >
                Profile Settings
            </p>
            <Form
                form={form}
                onFinish={update}
                onReset={reset}
                onFinishFailed={submitFail}
                layout="vertical"
            >
                <p
                    style={style.label}
                >
                    Profile Image
                </p>
                <Form.Item
                    name={'logo'}
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-logo'
                        onChange={(e) => { handleChange(e, 'logo') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            aspectRatio: '1/1',
                            width: '200px',
                            backgroundColor: '#626262',
                            borderRadius: '50%',
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
                                    borderRadius: '50%',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#C4C4C4'
                                }}
                            >
                                <Image
                                    src={imgUrlLogo || noAvtImg}
                                    preview={false}
                                    width={'25%'}
                                    style={{
                                        position: 'relative',
                                        top: '40%',
                                    }}
                                />
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
                    Banner collection
                </p>
                <Form.Item
                    name={'banner'}
                >
                    <input
                        type='file'
                        accept="image/png, image/jpeg, image/gif, image/jpg"
                        id='input-banner'
                        onChange={(e) => { handleChange(e, 'banner') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            width: '70%',
                            backgroundColor: '#626262',
                            aspectRatio: '3/1',
                            overflow: "hidden",
                            borderRadius: '10px'
                        }}
                    >
                        <label
                            htmlFor="input-banner"
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
                                <Image
                                    src={imgUrlBanner || noAvtImg}
                                    preview={false}
                                    width={'7%'}
                                    style={{
                                        position: 'relative',
                                        top: '40%'
                                    }}
                                />
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
                    User Name
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                        marginTop: 0
                    }}
                >
                    Max 80 characters long.
                </p>
                <Form.Item
                    name={'name'}
                    rules={[
                        { max: 80, message: 'Max 80 characters!' }
                    ]}
                >
                    <Input
                        placeholder="Collection name"
                        style={{
                            padding: '1em',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px',
                    }}
                >
                    Bio
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                        marginTop: 0
                    }}
                >
                    Add a Bio to your profile. This will appear on the profile page.
                </p>
                <Form.Item
                    name={'description'}
                >
                    <TextArea rows={6}
                        placeholder="Description"
                        style={{
                            padding: '1em',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Email address
                </p>
                <Form.Item
                    name={'royaltyPaymentAddress'}
                    rules={[
                        () => ({
                            validator() {
                                if (paymentAddr !== '') {
                                    return Promise.resolve()
                                }
                                return Promise.reject('Please input payment address!')
                            }
                        }),
                    ]}
                >
                    <Input
                        placeholder="Email address"
                        onChange={handleChangeAddress}
                        style={{
                            padding: '1em',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Socials
                </p>
                <Form.Item
                    name={'websiteLink'}
                >
                    <Input
                        placeholder="Website link"
                        prefix={<Image
                            src={webImg}
                            preview={false}
                        />}
                        style={{
                            padding: '1em',
                            color: '#286afa',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={'facebookLink'}
                >
                    <Input
                        placeholder="Facebook link"
                        prefix={<Image
                            src={facebookImg}
                            preview={false}
                        />}
                        style={{
                            padding: '1em',
                            color: '#286afa',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={'instagramLink'}
                >
                    <Input
                        placeholder="Instagram link"
                        prefix={<Image
                            src={igImg}
                            preview={false}
                        />}
                        style={{
                            padding: '1em',
                            color: '#286afa',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={'twitterLink'}
                >
                    <Input
                        placeholder="Twitter link"
                        prefix={<Image
                            src={twitterImg}
                            preview={false}
                        />}
                        style={{
                            padding: '1em',
                            color: '#286afa',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={'behanceLink'}
                >
                    <Input
                        placeholder="Behance link"
                        prefix={<Image
                            src={behanceImg}
                            preview={false}
                        />}
                        style={{
                            padding: '1em',
                            color: '#286afa',
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '50px'
                    }}
                >
                    Wallet Address
                </p>
                <Form.Item
                    name={'address'}
                >
                    <Input
                        defaultValue={JSON.parse(account).account.address}
                        disabled={true}
                        style={{
                            padding: '1em',
                            color: '#000000',
                            backgroundColor: '#a3a3a3',
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
                        onClick={handleClick}
                        type="button"
                        style={{
                            border: 0,
                            backgroundColor: '#ffffff',
                            color: '#000000',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginTop: '50px',
                            padding: '0.5em 2em',
                            cursor: 'pointer',
                            marginRight: '20px',
                            width: '20%',
                            borderRadius: '10px'
                        }}
                    >
                        Preview
                    </button>
                    <button
                        htmlType="submit"
                        style={{
                            border: 0,
                            backgroundColor: '#EEC13F',
                            color: '#000000',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            marginTop: '50px',
                            padding: '0.5em 2em',
                            cursor: 'pointer',
                            width: '20%',
                            borderRadius: '10px'
                        }}
                    >
                        Save
                    </button>
                </div>
            </Form>
        </div >
    )
}

export default Forms