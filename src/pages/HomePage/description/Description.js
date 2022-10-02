import Grid from "../../../components/grids/Grid"
import { Image } from "antd"
import footerImg1 from '../../../assets/img/footer_1.png'
import footerImg2 from '../../../assets/img/footer_2.png'
import footerImg3 from '../../../assets/img/footer_3.png'
import footerImg4 from '../../../assets/img/footer_4.png'
import sneaker from '../../../assets/img/sneaker2.png'

const footer = [
    {
        img: footerImg1,
        title: 'Compliant',
        description: "Dig chains are geo-fenced to ensure compliance with local regulatory regimes."
    },
    {
        img: footerImg2,
        title: 'Reusable',
        description: "Dig chains are 100% open-source and can be reinstantiated to create new regional sentry chains."
    },
    {
        img: footerImg3,
        title: 'Governance enabled',
        description: "Each Dig chain has a Cosmos-based governance module built-in, enabling community ownership over real estate projects. "
    },
    {
        img: footerImg4,
        title: 'Smart Contracts',
        description: "Code and deploy contracts on Dig Chain in the CosmWasm (CW) contract framework."
    },
]

const style = {
    container: {
        padding: '0em 15em',
        marginTop: '10em',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
    },
    img: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: '4em',
    },
    text: {
        textAlign: 'center',
        color: '#ffffff',
    },
}

const Description = ({ }) => {
    const getFooterGrid = () => {
        let list = []
        footer.forEach(item => {
            const jsx = (
                <div
                    style={style.grid}
                >
                    <div
                        style={style.img}
                    >
                        <Image
                            src={item.img}
                            preview={false}
                            width={'100%'}
                        />
                    </div>
                    <div
                        style={style.text}
                    >
                        <p
                            style={{
                                fontSize: '32px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: '#EEC13F'
                            }}
                        >
                            {item.title}
                        </p>
                        <p
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                            }}
                        >
                            {item.description}
                        </p>
                    </div>
                </div>
            )
            list.push(jsx)
        })
        return list
    }

    return (
        <div
            style={style.container}
        >
            <Grid
                lists={getFooterGrid()}
                numberOfColumn={4}
                rowGap={35}
                colGap={70}
            />
        </div>
    )
}

export default Description