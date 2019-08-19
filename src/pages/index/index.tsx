import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabBar } from 'taro-ui';
import './index.scss';
import background from "../../public/images/background.png";
import badge from "../../public/images/badge2.png";
import err from "../../public/images/home.png";

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }


  state = {
    array: [
      { url: background, name: "badge", id: "1" },
      { url: badge, name: "background", id: "2" },
      { url: err, name: "err", id: "3" }
    ],
    titleArray: [
      { text: "关于我们", url: "" }, { text: "关于课程", url: "" }, { text: "预约体验", url: "" }, { text: "活动快讯", url: "" }
    ],
    current: 0,



  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  handleClick(e) {
    if(e === 0){
      Taro.navigateTo({
        url:""
      })
    }
    if(e === 1)[
      Taro.switchTab({
        url:"/pages/mine/index"
      })
    ]
  }



  render() {
    return (
      <View className="index">

        <Swiper
          className='test-h'
          interval={1000}
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          autoplay={true}>
          {this.state.array &&
            this.state.array.map(res => {
              return (
                <SwiperItem >
                  <View className="indexBannerImg" style={{ backgroundImage: `url(${res.url})` }}></View>
                </SwiperItem>
              )

            })

          }
        </Swiper>

        <View className="indexTitle">
          {this.state.titleArray.map(item => {
            return (
              <View className="indexTitleItems">
                <View className="indexTitleItemsIcon"></View>
                <View className="indexTitleItemsText"><Text>{item.text}</Text></View>
              </View>
            )
          })

          }
        </View>

        <View className="indexMainBody">
        <Text className="indexMessage">
            每日课堂
          </Text>
        </View>
        <View className="indexMainBody">
          <Text className="indexMessage">
            每日消息
          </Text>

        </View>
        <AtTabBar
        // className="tabBar"
          tabList={[
            { title: '首页', iconType: 'home' },
            { title: '我的', iconType: 'user' },
          ]}
          fixed={true}
          iconSize={22}
          fontSize={12}
          onClick={this.handleClick}
          current={this.state.current}
        />
      </View>


    )
  }
}
