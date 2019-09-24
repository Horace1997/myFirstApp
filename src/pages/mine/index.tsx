import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Picker } from '@tarojs/components'
import { AtTabBar, AtAvatar, AtIcon } from 'taro-ui';
import './index.scss';
import { image_url } from '../../tools/common';
import Modal from "../../components/modal/index"
import { addStudentMessage } from "../../service/api/api";

interface State{
  current:number,
  currentStudentData:any,
  studentNameList:any,
  authourize:undefined|number,
  write:boolean,
  courseData:any,
  massageArray:Array<string>,
  menuArray:Array<object>,
  pcMsg:any,
  name:string,
  phone:string|number
}
export default class Index extends Component {


  state:State = {
    current: 1,
    currentStudentData: {},
    studentNameList: [],
    authourize: undefined,
    write: false,
    courseData: {
      studentList: [
        {
          phone: undefined
        }
      ]
    },
    massageArray: [
       "段位",
       "年龄",
       "位置"
    ],
    menuArray: [
      // { text: "我的课程", icon: "star-2", color: "#ff69b4", url: "/pages/lessons/index" },
      { text: "我的能力值", icon: "user", color: "#00bfff", url: "/pages/myAbility/index" },
      { text: "我的作业", icon: "list", color: "#e4393c", url: "/pages/submitHomeWork/index" },
      { text: "添加信息绑定", icon: "add", color: "#e49", onclick: "addMessage" },
      { text: "更换学生信息", icon: "reload", color: "#ff69b4", onclick: "changeStudent", type: "selector" }
    ],
    pcMsg: undefined,
    name: "",
    phone: ''
  }
  componentWillMount() {
    this.checkAuthorize();

  }

  componentDidMount() {
    let self = this
    Taro.getStorage({
      key: `data`,
      success(res:any):any {
        let courseData = JSON.parse(res.data)
        let studentNameList:any = []
        for (let i = 0; i < courseData.studentList.length; i++) {
          studentNameList.push(courseData.studentList[i].name)
        }
        self.setState({
          courseData,
          phone: courseData.studentList[0].phone,
          currentStudentData: courseData.studentList[0],
          studentNameList
        })
      }
    })
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

  checkAuthorize = () => {
    let self = this
    Taro.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          Taro.getUserInfo({
            success: function (result) {
              self.setState({
                pcMsg: result.userInfo,
                authourize: true
              })
            }
          })
        }
      }
    })
  }


  changePages = (result) => {
    let self = this
    if (result.url) {
      Taro.navigateTo({
        url: result.url
      })
    }



    if (result.onclick === "addMessage") {
      this.addMessage()
    }

    if (result.onclick === `changeStudent`) {

      self.changeStudent(self.state.courseData.studentList)
    }


  }

  changeStudent = (e):void => {
    let name = this.state.studentNameList[e.detail.value];
    let result = this.state.courseData.studentList.filter((v:any)=>v.name === name)

    this.setState({
      currentStudentData:result[0]
    })
  }

  addMessage = () => {
    this.setState({
      write: true
    })
  }

  commit = () => {
    const { courseData, name, phone } = this.state
    addStudentMessage({ openId: courseData.openId, name, phone }).then(() => {
      this.setState({
        write: false
      })
    })
  }

  onChange = (e, key) => {
    this.setState({
      [key]: e
    })
  }


  callBack = (e) => {
    this.setState({
      pcMsg: e.detail.userInfo,
      authourize: true
    })
  }
  authorize = () => {

    Taro.authorize({
      scope: 'scope.userInfo',
    })
  }


  render() {
    const { authourize, pcMsg, write, courseData,studentNameList ,currentStudentData} = this.state
    const rank = ["青铜","白银","黄金","铂金","钻石","最强王者"]
    return (
      <View>
        <Modal
          commit={this.commit}
          value={write}
          onChange={this.onChange}
          phoneNum={courseData.studentList[0].phone}
        >
        </Modal>
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
                  <Text>{currentStudentData.name}</Text>
                </View>
              </View>

              <View className="right">
                

                      <View className="pcMessageContent">
                        <Text className="pcMessage">
                          段位:{rank[currentStudentData.level-1]}
                        </Text>
                      </View>
                

                      <View className="pcMessageContent">
                        <Text className="pcMessage">
                          年龄:{currentStudentData.age}
                        </Text>
                      </View>

                      <View className="pcMessageContent">
                        <Text className="pcMessage">
                          位置:{currentStudentData.position}
                        </Text>
                      </View>

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
                <Button openType="getUserInfo" onGetuserinfo={this.callBack} className="getUserInfoBtn">你现在还是游客，点击授权</Button>
              </View>
            </View>}
        </View>

        <View className="pcMenu">
          {this.state.menuArray.map((res:any, index) => {
            return (
              <View className="pcMenuItems" onClick={() => this.changePages(res)} key={`pcMenuItems_${index}`}>
                <AtIcon value={res.icon} size={18} color={res.color}></AtIcon>

                {
                  res.type &&
                  <Picker
                    mode="selector"
                    range={studentNameList}
                    onChange={this.changeStudent}
                  >
                    <View>
                      <Text style={{ textAlign: "right" }}>
                        点击这里修改当前学生
                      </Text>
                    </View>
                  </Picker>
                }
                {!res.type &&
                  <Text>{res.text}</Text>
                }

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
