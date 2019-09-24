import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import './index.scss';
import { AtForm, AtButton, AtInput } from "taro-ui";
import { makeOppointment } from "../../service/api/api";
export default class Index extends Component {


    state = {
        address: "请选择校区",
        lessonName: "青少年培训高级班",
        price: 180,
        studentName: "请选择学生姓名",
        phoneNum: "",
        courseData: {},
        courseTimeArr: [],
        classType: "请选择上课时间",
        courseDetailId: "",
        totalCourseId: "",
        openId: "",
        studentId: "",
        children: [],
        studentList: []
    }
    componentWillMount() {
        let self = this
        Taro.getStorage({
            key: `data`,
            success(res) {
                let obj = JSON.parse(res.data)
                self.setState({
                    openId: obj.openId,
                })
            }
        })
    }

    componentDidMount() {
        let result = JSON.parse(this.$router.params.id)
        let tempArr = []
        let self = this
        for (let i = 0; i < result.courseDetails.length; i++) {
            tempArr.push(result.courseDetails[i].classStartTime)
        }


        Taro.getStorage({
            key: `data`,
            success(res) {
                let data = JSON.parse(res.data)
                let studentList = data.studentList
                let arr = []
                studentList.map(res => {
                    arr.push(res.name)
                })
                console.log(arr)
                self.setState({
                    children: arr,
                    studentList
                })
            }
        })

        this.setState({
            courseData: result,
            courseTimeArr: tempArr,
            totalCourseId: result.id
        })

    }

    componentWillUnmount() {
    }

    componentDidShow() { }

    componentDidHide() { }

    handleClick(e, key) {
        let self = this
        const { courseData, children, studentList } = this.state;
        let num = e.detail.value
        let result;
        switch (key) {
            case "phoneNum": result = e;
                break;
            case "studentName": result = children[num];
                self.setState({
                    studentId: studentList[num].id
                })
                break;
            case "classType": result = courseData.courseDetails[num].classStartTime;

            this.setState({
                    address: courseData.courseDetails[num].classLocation,
                    courseDetailId: courseData.courseDetails[num].id
                })
                break;
            default: result = num
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

    submitForm = () => {
        const { totalCourseId, courseDetailId, openId, studentId ,courseData} = this.state
        console.log(courseData)
        

        makeOppointment( { totalCourseId, courseDetailId, openId, studentId })

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
        const { courseData, courseTimeArr } = this.state
        return (
            <View className="maOppMain">
                <AtForm onSubmit={this.submitForm}>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>课程名称</Text>
                        </View>
                        <View className="maOppAddress">
                            <Text>
                                {courseData.name}
                            </Text>

                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>时间选择</Text>
                        </View>
                        <View className="maOppAddress">
                            <Picker mode='selector'
                                name="classID"
                                range={courseTimeArr}
                                onChange={e => this.handleClick(e, "classType")}
                            >
                                <Text>{this.state.classType} </Text>
                            </Picker>
                        </View>

                    </View>
                    <View className="maOppItems">
                        <View className="maOppAddressText">
                            <Text>校区选择</Text>
                        </View>
                        <View className="maOppAddress">
                            <Picker mode='selector' disabled name="classLocation" onChange={e => this.handleClick(e, "address")}>
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
                            <Picker mode='selector'
                                range={this.state.children}
                                onChange={e => this.handleClick(e, "studentName")}
                            >
                                <Text>{this.state.studentName}</Text>
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

                    <AtButton formType="submit" className="maOppSave"
                    >保存</AtButton>
                </AtForm>
            </View>
        )
    }
}
