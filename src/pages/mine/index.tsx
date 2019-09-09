import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text ,Button} from '@tarojs/components'
import { AtTabBar, AtAvatar, AtIcon } from 'taro-ui';
import './index.scss';
import { image_url } from '../../tools/common';
// import avatar from "../../public/images/login.png";
export default class Index extends Component {


  state = {
    current: 1,
    authourize: false,
    massageArray: [
      { title: "段位", result: "铂金" },
      { title: "年龄", result: "16" },
      { title: "位置", result: "前锋" },
    ],
    menuArray: [
      { text: "我的课程", icon: "star-2", color: "#ff69b4", url: "/pages/lessons/index" },
      { text: "我的能力值", icon: "user", color: "#00bfff", url: "/pages/myAbility/index" }
    ],
    pcMsg: undefined
  }
  componentWillMount() {
  
  }

  componentDidMount() {
    this.checkAuthorize();
  }



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
    navigationBarTitleText: '我的'
  }

  checkAuthorize = () =>{
    let self = this
    Taro.getSetting({
      success:function(res){
        if(res.authSetting['scope.userInfo']){
          Taro.getUserInfo({
            success:function(result){
              self.setState({
                pcMsg:result.userInfo,
                authourize:true
              })
            }
          })
        }
    }
    })
  }


  changePages = (result) => {
    Taro.navigateTo({
      url: result.url
    })
  }
  callBack =(e)=>{
    this.setState({
      pcMsg:e.detail.userInfo,
      authourize:true
    })
  }
  authorize = () =>{

    Taro.authorize({
      scope: 'scope.userInfo',
  })
  }
  render() {
    const { authourize,pcMsg } = this.state
    return (
      <View>

        <View className="pcMessageCard" style={{ backgroundImage: `url(https://football.edisonmiao.com/static/menuIcon/c221fc3711694619e374b2dd1ea0e27.jpg)` }}>
          {authourize &&
            <View className="pcMessageCardSon">
              <View className="left">
                <AtAvatar
                  image={pcMsg.avatarUrl}
                  circle
                  size="large"
                  className="pcAvatar"
                ></AtAvatar>
                <View className="pcMessageName">
                  <Text>{pcMsg.nickName}</Text>
                </View>
              </View>

              <View className="right">
                {
                  this.state.massageArray.map(res => {
                    return (
                      <View className="pcMessageContent">
                        <Text className="pcMessage">
                          {res.title}:{res.result}
                        </Text>
                      </View>
                    )
                  })
                }

              </View>
            </View>}


          {!authourize &&
            <View className="authorizeBtn" onClick={this.authorize}>
            <View>
            <AtAvatar
                image={`${image_url}/avatar/d41d8cd98f00b204e9800998ecf8427e.png`}
                circle
                size="large"
                className="pcAvatars">
              </AtAvatar>
            </View>

              <View className="pcCardAuthorize" >
              <Button openType="getUserInfo"  onGetuserinfo={this.callBack} className="getUserInfoBtn">你现在还是游客，点击授权</Button>
              </View>
            </View>}
        </View>

        <View className="pcMenu">
          {this.state.menuArray.map((res, index) => {
            return (
              <View className="pcMenuItems" onClick={() => this.changePages(res)} key={`pcMenuItems_${index}`}>
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
