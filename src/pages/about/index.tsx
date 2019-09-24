import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss';
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


  state = {
    description: [
      `我司于2019年2月28日建立`,
      `法人代表：Roger `,
      `运营项目：XXXXX`,
      `合作伙伴：Horace Edison Carmen`,
      `电话：13112345678`,
      `地址：白云区万达承运足球场`,
      `主要项目：
      幼儿足球启蒙
      少儿足球青训
      中学生足球培训
      中考体育足球
      足球商业活动
      创新三项：
      个人足球技术提升教案 
      独立幼儿足球启蒙成长教案
      大数据app记录小朋友每一次的成长`
    ]
  }
  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  handleClick(e) {
    if (e === 0) {
      Taro.navigateTo({
        url: "/pages/index/index"
      })
    }
  }
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '关于我们'
  }
  render() {
    const { description } = this.state;
    return (
      <View>
        <View className="aboutCompny">
          <Text>
            XXXXX有限公司
        </Text>

          <Image
            className="aboutUniCode"
            src={require("../../assets/images/unicode.jpeg")}>

          </Image>
          <View className="aboutDescription">

            {description.map((item, index) => {
              return (
                <Text key={`description_${index}`}>
                  {item}
                </Text>
              )
            })

            }
          </View>



        </View>







      </View>
    )
  }
}
