import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import Modal from "../../components/modal/index";
import { AtTabBar,AtToast } from 'taro-ui';
import './index.scss';

import { post, baseUrl,get, image_url } from "../../tools/common";
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
    showToast:false,
    array: [
      { url: require('../../assets/images/background.jpeg'), name: "badge", id: "1" },
      { url: require("../../assets/images/background2.jpeg"), name: "background", id: "2" },
      { url: require("../../assets/images/background.jpeg"), name: "err", id: "3" }
    ],
    titleArray: [
      { text: "关于我们", url: "/pages/about/index", cover: `https://football.edisonmiao.com/static/menuIcon/95007c33865525e9c20ebcb1ed7df64.jpg` },
      { text: "关于课程", url: "/pages/aboutLessons/index", cover: `https://football.edisonmiao.com/static/menuIcon/941db3137a63da126dd34672e3f409a.jpg` },
      { text: "预约体验", url: "/pages/oppointment/index", cover: `https://football.edisonmiao.com/static/menuIcon/89dbb2975c66ac1b15837e09d456d5e.jpg` },
      { text: "活动快讯", url: "/pages/static/index", cover: `https://football.edisonmiao.com/static/menuIcon/93cecfc923f09d122f4ce89668813fa.jpg` }
    ],
    daysLessons: [
    ],
    current: 0,
    writeDownMsg: false,
    level:[
      "黄铜","白银","黄金","铂金"
    ],
    form: {
      phone: "",
      studentName: ""
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
    
    get(`${baseUrl}/api/courseDetail/getCourseDetailLastThree`).then(res=>{
      console.log(res)
      this.setState({
        daysLessons:res.data.resultData
      })

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

  commit = () => {
    const {form} = this.state
    if(this.validate() !== true){
      this.setState({
        showToast:true
      })
      return;
    }
    post(`${baseUrl}/api/userLogin/bindStudentById`,{
      ...form,
    })
    this.setState({
      writeDownMsg: false
    })
  }

  validate = () => {
    const {form} = this.state
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(form.phone))){
      return "手机号"
    }
    if(!form.studentName){
      return "学生姓名"
    }
    return true
  }


  onChange = (e, key) => {
    let form = this.state.form
    form[key] = e
    this.setState({
      form
    })
  }

  render() {
    const { daysLessons, writeDownMsg,level } = this.state
    
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
                <View style={{ backgroundImage: `url(${image_url}${item.courseType.cover})` }} className="indexCardCover"></View>
                <Text className="indexDaysLessonsDesc">
                  {/* {this.getDesc(item.classContent)} */}
                  {!!item.classContent?this.getDesc(item.classContent):"暂无描述"}
                </Text>

                <Text className="indexDaysLessonsDate">{moment(item.classStartTime).format("YYYY-MM-DD")}</Text>
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

        <Modal 
        commit={this.commit} 
        value={writeDownMsg} 
        onChange={this.onChange} 
        level={level}>
        </Modal>

        <AtToast isOpened={this.state.showToast}
        onClose={()=>{
          this.setState({
            showToast:false
          })
        }}
        text={`${this.validate()}有误,请重新输入`} icon="{icon}" status="error" duration={2000}></AtToast>
      </View>


    )
  }
}
