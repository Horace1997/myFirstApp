import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import Modal from "../../components/modal/index";
import { AtTabBar} from 'taro-ui';
import './index.scss';
import background from "./images/background.png";
import badge from "./images/badge2.png";
import err from "./images/home.png";
import { post, baseUrl } from "../../tools/common";
var moment = require("moment")

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
      { text: "关于我们", url: "pages/about/index", cover: `https://football.edisonmiao.com/static/menuIcon/95007c33865525e9c20ebcb1ed7df64.jpg` },
      { text: "关于课程", url: "pages/aboutLesson/index", cover: `https://football.edisonmiao.com/static/menuIcon/941db3137a63da126dd34672e3f409a.jpg` },
      { text: "预约体验", url: "pages/oppointment/index", cover: `https://football.edisonmiao.com/static/menuIcon/89dbb2975c66ac1b15837e09d456d5e.jpg` },
      { text: "活动快讯", url: "pages/static/index", cover: `https://football.edisonmiao.com/static/menuIcon/93cecfc923f09d122f4ce89668813fa.jpg` }
    ],
    daysLessons: [
      {
        cover: background,
        desc: "由黄锦麟老师细心指导，为求完成这个完美而对少儿有益的全新课程，让同学们体验到全所未有的痛快",
        date: 15244123312
      }
    ],
    current: 0,
    writeDownMsg:true,
    form:{
      phone:"",
      ability:"",
      studentName:""
    }
  }

  componentWillMount() {

    Taro.showShareMenu({
      withShareTicket: true
    })
  }

  componentDidMount() {
    this.login();
    Taro.getSetting({
      success: function (res) {
        const result = res.authSetting["scope.userInfo"]
        if (!result) {
          Taro.redirectTo({
            url: "static"
          })
        } else {
          Taro.getUserInfo({
            success: function (res) {
              let avatar = JSON.parse(res.rawData).avatarUrl
              Taro.setStorage({
                key: "avatar",
                data: avatar,
              })
            }
          })
        }
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  login() {
    let self = this;
    Taro.login({
      success(res) {
        if (res.code) {
          self.getUserInfo(res.code); 
        }
      }
    })
  }

  getDesc(str) {
    let result;
    if (str.length > 20) {
      result = str.slice(0, 20) + "..."
      return result;
    }
    return str;
  }

  getUserInfo(code) {
    post(`${baseUrl}/api/userLogin/getUserLoginInfo?code=${code}`).then(res => {
      if (res.data.resultData === null) {
        this.setState({
          writeDownMsg: true
        })
      }
    })
  }

  handleClick(e) {
    if (e === 0) {
      Taro.navigateTo({
        url: ""
      })
    }
    if (e === 1) [
      Taro.navigateTo({
        url: "/pages/mine/index"
      })
    ]
  }

  toRouter(url) {
    Taro.navigateTo({
      url
    })
  }

  commit = () =>{
    this.setState({
      writeDownMsg:false
    })
  }


  onChange = (e,key) =>{
    let form = this.state.form
    form[key] = e
    this.setState({
      form
    })
  }

  render() {
    const { daysLessons,writeDownMsg } = this.state
    return (
      <View className="index">

        <Swiper
          className='test-h'
          interval={3000}
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          autoplay={true}>
          {this.state.array &&
            this.state.array.map((res, index) => {
              return (
                <SwiperItem key={`sql_${index}`}>
                  <View className="indexBannerImg" style={{ backgroundImage: `url(${res.url})` }}></View>
                </SwiperItem>
              )

            })

          }
        </Swiper>

        <View className="indexTitle">
          {this.state.titleArray.map((item, index) => {
            return (
              <View className="indexTitleItems" onClick={() => this.toRouter(item.url)} key={`lesson_${index}`}>
                <View className="indexTitleItemsIcon" style={{ backgroundImage: `url(${item.cover})` }}></View>
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
        {
          daysLessons.map((item, index) => {
          return (
            <View className="indexDaysLessons" key={`duelLesson_${index}`}>
              <View style={{ backgroundImage: `url(${item.cover})` }} className="indexCardCover"></View>
              <Text className="indexDaysLessonsDesc">
                {this.getDesc(item.desc)}
              </Text>

              <Text className="indexDaysLessonsDate">{moment(item.date).format("YYYY-MM-DD")}</Text>
            </View>
          )
        })
        }
        <View className="indexMainBody">
          <Text className="indexMessage">
            每日消息
          </Text>

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

          <Modal commit={this.commit} value={writeDownMsg} onChange={this.onChange}></Modal>
      </View>


    )
  }
}
