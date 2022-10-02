import { Carousel } from '3d-react-carousal';
import banner1 from '../../assets/img/banner1.jpeg'
import banner2 from '../../assets/img/banner2.jpeg'
import banner3 from '../../assets/img/banner3.jpeg'
import { Image } from 'antd'

let bannerImgs = [
    <div>
        <Image src={banner1} width={'450px'} preview={false} style={{
            borderRadius: '20px'
        }} />
    </div>,
    <div>
        <Image src={banner2} width={'450px'} preview={false} style={{
            borderRadius: '20px'
        }} />
    </div>,
    <div>
        <Image src={banner3} width={'450px'} preview={false} style={{
            borderRadius: '20px'
        }} />
    </div>,
]

const Carosel = <Carousel
    slides={bannerImgs}
    autoplay={true}
    interval={1000}
    arrows={false}
/>

export default Carosel