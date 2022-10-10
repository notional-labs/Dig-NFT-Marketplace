import { Form, Input, Slider, InputNumber, Image, Switch, Checkbox, Row, Col, } from "antd"
import { useState } from "react";
import { createCollection } from "../../../anonejs/createCollection";
import { openNotification, openLoadingNotification } from "../../../components/notifications/notification";
import { ipfsUpload } from "../../../anonejs/ipfsUpload";
import noAvtImg from "../../../assets/img/no-avt-img.png";
import { Link } from "react-router-dom";
import "./Forms.css";
import ImageFormCard from "./ImageFormCard";

const { TextArea } = Input;

const checkValidString = (string) => {

}

const options = [
    { label: 'Real estate', value: 'real estate' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Office', value: 'office' },
    { label: 'Another', value: 'another' },
];

const style = {
    container: {
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
    }
}

const Forms = ({ account }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imgUrlLogo, setImgUrlLogo] = useState('')
    const [imgUrlBanner, setImgUrlBanner] = useState('')
    const [featureImgs, setFeatureImgs] = useState({
        banner1: '',
        imagesRow: ['', '', '']
    })
    const [paymentAddr, setPaymentAddr] = useState(JSON.parse(account).account.address)
    const [share, setShare] = useState(0)

    const create = async (values) => {
        try {
            openLoadingNotification('open')
            setLoading(true)
            const logo = await ipfsUpload(imgUrlLogo)
            const banner = await ipfsUpload(imgUrlBanner)
            let config = {
                ...values,
                logo: logo,
                banner: banner,
                royaltyPaymentAddress: paymentAddr
            }
            const contractConfig = {
                royaltyPaymentAddress: config.royaltyPaymentAddress,
                royaltyShare: `${config.commission / 100}`,
                baseTokenUri: 'ipfs://bafybeidfe5acjamg7kax65mvspt637ksr3wcdvvaiutmzhjgi74kddxf5q/galaxyiOigcK',
                numTokens: 5,
                an721CodeId: parseInt(process.env.REACT_APP_an721CodeId),
                name: `${config.name}`,
                symbol: 'TESTTWO',
                description: `${config.description}`,
                image: `${config.logo}`,
                externalLink: `${config.externalLink}`,
                perAddressLimit: config.limit,
            }

            await createCollection(contractConfig)
            openLoadingNotification('close')
            openNotification('success', 'Submit successfully')
            reset()
        }
        catch (e) {
            console.log(e.message)
            openLoadingNotification('close')
            openNotification('error', e.message)
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

    const handleChange = (e, type) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                if (type === 'logo') {
                    setImgUrlLogo(reader.result)
                } else if (type === 'banner') {
                    setImgUrlBanner(reader.result)
                } else if (type === 'feature-1') {
                    setFeatureImgs({
                        ...featureImgs,
                        banner1: reader.result 
                    })
                } else {
                    const index = type.substring(type.length - 1)
                    let newArr = [...featureImgs.imagesRow]
                    newArr[index] = reader.result 
                    setFeatureImgs({
                        ...featureImgs,
                        imagesRow: [...newArr]
                    })
                }
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const handleChangeAddress = (e) => {
        setPaymentAddr(e.target.value)
    }

    const handleChangeText = () => { };

    const handleChangeCheckbox = (e) => { };

    const handleSlider = (val) => {
        setShare(val)
    }

    const handleClick = async () => {
        // const result = await createCollection(Config);
        // const result = await createSale(Config2);
        // const result = await makeOrder(Config3);
        // const result = await updatePrice(Config4);
        // const result = await cancelSale(Config5);
        // const result = await queryAccountInfo();
        // const result = await queryOfferingList(Config6);
        // const result = await queryNftInfoById(Config7);
        // const result = await queryModelInfoById(Config8);
        // const result = await queryNumberOfNfts('one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0');
        // const result = await queryNumberOfModels('one1tj748034gl3zvujn2tz4p4m8rf9j9uarsj5j3c5a5z2neqel77cslz2lp0');
        // const result = await queryCollectionInfo('one1cl3zpu4gth7q3xrru5vccedtqewfj97w7gq6kjgqxknu0k7e93yqyxtdj6');
        // const result = await getDataFromUri('https://ipfs.io/ipfs/bafybeiaivv62j7jxlkahxobfr5io7h2j56obw5mojljho2ybg7zhah2eue/galaxyfcnCU3/1');
        // const result = await queryAllDataOfAllModels('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq');
        // const result = await queryAllDataOfAllNfts('one1jgee6ue6sp844g7wm46gdc0zkpgllt6yu5huspln23cnzhmslwkqk3qwgq');
        // const result = await queryAllContracts(80);
        // const result = await queryOfferingListByPriceRange(Config9);
        // const result = await queryOfferingListOfCollection(Config10);
        // const result = await queryOfferingListOfSeller(Config11);
        // const result = await mintCallFromUser(Config12);
        // const result = await burnNft(Config13);
        // const result = await transferNft(Config14)
        // const result = await modifyCollectionInfo(Config15);

        // const result = await updateCollectionInfo(Config17);

        // const result = await queryConfigOfLaunchpad("one10hpwj2n4mdsnzmpzqn3ek0nclv245vscjzwx6zufyahckvlyaudqz89ljn");

        // const result = await queryCollectionAddressOfLaunchpad("one10hpwj2n4mdsnzmpzqn3ek0nclv245vscjzwx6zufyahckvlyaudqz89ljn");

        // const result = createModel(Config16)

        // console.log(result);
    };

    return (
        <div style={style.container}>
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
                        onChange={(e) => { handleChange(e, 'logo') }}
                        style={{
                            display: 'none'
                        }}
                    />
                    <div
                        style={{
                            aspectRatio: '1/1',
                            width: '20%',
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
                                    backgroundColor: '#C4C4C4',
                                    overflow: 'hidden'
                                }}
                            >
                                {
                                    !imgUrlLogo ? (
                                        <Image
                                            src={imgUrlLogo || noAvtImg}
                                            preview={false}
                                            width={'25%'}
                                            style={{
                                                position: 'relative',
                                                top: '40%',
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
                            width: '65%',
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
                                {
                                    !imgUrlBanner ? (
                                        <Image
                                            src={imgUrlBanner || noAvtImg}
                                            preview={false}
                                            width={'7%'}
                                            style={{
                                                position: 'relative',
                                                top: '40%'
                                            }}
                                        />
                                    ) : (
                                        <Image
                                            src={imgUrlBanner}
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
                    Featured image
                </p>
                <p
                    style={{
                        ...style.label,
                        fontSize: '10px',
                    }}
                >
                    This image will be used for featuring your collection.
                </p>
                <Form.Item
                    name={'feature_images'}
                >
                   <ImageFormCard
                        featureImage={featureImgs}
                        handleChange={handleChange}
                   />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
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
                            borderRadius: '10px'
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
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    External link
                </p>
                <Form.Item
                    name={'externalLink'}
                >
                    <Input
                        placeholder="External link"
                        style={{
                            padding: '1em',
                            color: '#286afa',
                            borderRadius: '10px'
                        }}
                    />
                </Form.Item>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Categories
                </p>
                <Form.Item
                    name={'categories'}
                >
                    <Checkbox.Group
                        style={{
                            width: '100%',
                            marginTop: '10px'
                        }}
                    >
                        <Row>
                            {
                                options.map(option => {
                                    return (
                                        <Col span={8}>
                                            <Checkbox
                                                value={`${option.value}`}
                                                style={{
                                                    color: '#F2F1F1',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        position: 'relative',
                                                        top: '-10px',
                                                        marginLeft: '20px'
                                                    }}
                                                >
                                                    {option.label}
                                                </p>
                                            </Checkbox>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '30px'
                    }}
                >
                    <div>
                        <p
                            style={{
                                color: '#F2F1F1',
                                fontSize: '24px',
                                fontWeight: 'bold',
                                margin: 0
                            }}
                        >
                            Enable Royalties
                        </p>
                        <p
                            style={{
                                color: '#F2F1F1',
                                fontSize: '16px',
                                margin: 0
                            }}
                        >
                            Every time this NFT is sold you will receive this percentage of the sale. Max 5 recipients.
                        </p>
                    </div>
                    <Form.Item
                        name={'royalties'}
                        style={{
                            marginBottom: 0
                        }}
                    >
                        <Switch
                            defaultValue={true}
                        />
                    </Form.Item>
                </div>
                <p
                    style={{
                        ...style.label,
                        marginTop: '30px'
                    }}
                >
                    Receive address
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
                        placeholder="Royalty payment address"
                        defaultValue={JSON.parse(account).account.address}
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
                        marginTop: '30px'
                    }}
                >
                    {
                        `Commission rate (${share.toFixed(2)} %)`
                    }
                </p>
                <Form.Item
                    name={'commission'}
                >
                    <Slider
                        min={0.1}
                        max={10}
                        step={0.1}
                        onChange={handleSlider}
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
        </div >
    );
};

export default Forms;
