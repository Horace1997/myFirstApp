import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabBar, AtAvatar,AtIcon } from 'taro-ui';
import './index.scss';
import avatar from "../../public/images/login.png";
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


  state = {
    current: 1,
    massageArray: [
      { title: "段位", result: "铂金" },
      { title: "年龄", result: "16" },
      { title: "职业", result: "学生" },
    ],
    menuArray: [
      { text: "我的课程" ,icon:"star-2",color:"#ff69b4"},
      { text: "我的能力值",icon:"user",color:"#00bfff" }
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
    return (
      <View>



        <View className="pcMessageCard">
          <View className="left">
            <AtAvatar
              image={avatar}
              circle
              size="large"
              className="pcAvatar"
            ></AtAvatar>
            <Text>Roger</Text>
          </View>

          <View className="right">
            {
              this.state.massageArray.map(res => {
                return (
                  <Text className="pcMessage">
                    {res.title}:{res.result}
                  </Text>
                )
              })
            }

          </View>


        </View>

        <View className="pcMenu">
          {this.state.menuArray.map(res => {
            return (
              <View className="pcMenuItems">
                <AtIcon value={res.icon} size={18} color={res.color}></AtIcon>
                <Text>{res.text}</Text>
                <AtIcon value="chevron-right" color="#00000019" className="pcMenuRight"></AtIcon>
              </View>
            )
          })
          }


        </View>
        <AtTabBar
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
