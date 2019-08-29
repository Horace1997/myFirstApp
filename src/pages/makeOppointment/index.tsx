import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './index.scss';
import { AtForm, AtButton, AtInput } from "taro-ui";
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


    state = {
        selector: [
            "北京路校区", "大德路校区", "西门口校区", "陈家祠校区"
        ],
        teachArray: [
            "roger", "黄锦麟", "麟爷"
        ],
        address: "请选择校区",
        date: "请选择时间",
        lessonName: "青少年培训高级班",
        price: 180,
        studentName: "",
        teacher: "请选择老师",
        phoneNum:""
    }
    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    handleClick(e, key) {

        let result;
        switch (key) {
            case "phoneNum": result = e;
                break;
            case "studentName": result = e;
                break;
            case "address": result = this.state.selector[e.detail.value];
                break;
            case "teacher": result = this.state.teachArray[e.detail.value];
                break;
            default: result = e.detail.value
        }
        this.setState({
            [key]: result
        })

    }
    makeOppointment(id) {
        Taro.navigateTo({
            url: `/pages/courseDetail/index?id=${id}`
        })
    }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '课程预约'
    }
    render() {
        // const {lessonsArray} = this.state
        return (
            <View className="maOppMain">
                <AtForm>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>课程名称</Text>
                        </View>
                        <View className="maOppAddress">
                            {/* <Picker mode='date' onChange={e => this.handleClick(e, "date")}> */}
                            <text>{this.state.lessonName}</text>
                            {/* </Picker> */}
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>时间选择</Text>
                        </View>
                        <View className="maOppAddress">
                            <Picker mode='date' onChange={e => this.handleClick(e, "date")}>
                                <text>{this.state.date}</text>
                            </Picker>
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>校区选择</Text>
                        </View>
                        <View className="maOppAddress">
                            <Picker mode='selector' range={this.state.selector} onChange={e => this.handleClick(e, "address")}>
                                <text>{this.state.address}</text>
                            </Picker>
                        </View>







                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>培训费用</Text>
                        </View>
                        <View className="maOppAddress">
                            {/* <Picker mode='date' onChange={e => this.handleClick(e, "date")}> */}
                            <text>{this.state.price}/节</text>
                            {/* </Picker> */}
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>学生姓名</Text>
                        </View>
                        <View className="maOppAddress">
                            {/* <Picker mode='date' onChange={e => this.handleClick(e, "date")}> */}
                            <AtInput
                                name="studentName"
                                placeholder="请填写姓名"
                                type="text"
                                value={this.state.studentName}
                                className="maOppStudentName"
                                onChange={e => this.handleClick(e, "studentName")}></AtInput>
                            {/* </Picker> */}
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>选择老师</Text>
                        </View>
                        <View className="maOppAddress">
                            <Picker mode='selector' range={this.state.teachArray} onChange={e => this.handleClick(e, "teacher")}>
                                <text>{this.state.teacher}</text>
                            </Picker>
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>预留手机</Text>
                        </View>
                        <View className="maOppAddress">
                            <AtInput
                                name="phoneNum"
                                placeholder="请填写手机号"
                                type='phone'
                                value={this.state.phoneNum}
                                className="maOppStudentName"
                                onChange={e => this.handleClick(e, "phoneNum")}></AtInput>
                        </View>

                    </View>

                    <AtButton formType="submit" className="maOppSave">保存</AtButton>
                </AtForm>
            </View>
        )
    }
}
