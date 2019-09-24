import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.scss';
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


    state = {
        current: 0,
        endCourse: [
            {
                title: "青少儿足球培训",
                cover: "",
                teachers: ["roger","黄锦麟","黄生"],
                id:102
            }
        ],
        ingCourse: [
            {
                title: "青少儿足球培训",
                cover: "",
                teachers: ["roger","黄锦麟","黄生"],
                id:123
            }, {
                title: "青少儿足球培训",
                cover: "",
                teachers: [],
                id:12
            }, {
                title: "青少儿足球培训",
                cover: "",
                teachers: [],
                id:32
            }
        ]
    }
    componentWillMount() { }

    componentDidMount() { 

        Taro.getStorage({
            key:`data`,
            success(res){
                let data = JSON.parse(res.data)
                console.log(data)
            }
        })
    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }
    handleClick(e) {
        this.setState({
            current: e
        })
    }

    courseDetail(id:Number){
        Taro.navigateTo({
            url:`/pages/courseDetail/index?id=${id}`
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
        navigationBarTitleText: '课程'
    }
    render() {
        const tabList = [{ title: '进行中' }, { title: '已结束' }];
        const {current,ingCourse,endCourse} = this.state
        return (
            <View>
                <AtTabs current={current} tabList={tabList} onClick={this.handleClick.bind(this)}>
                    <AtTabsPane current={current} index={0} >
                        {ingCourse.map((res,index) => {
                            return (
                                <View className="oppIngCourseItems" key={`dh${index}`} onClick={()=>this.courseDetail(res.id)}>
                                    <View className="oppIngCourseCover" style={{backgroundImage:`url(${res.cover})`}}></View>
                                    <View className="oppIngCourseText">
                                        <Text className="oppIngCourseName">{res.title}</Text>
                                        <Text className="oppIngCourseTeachers">指导老师:</Text>
                                        {
                                            res.teachers.map(item=>{
                                                return(
                                                    <Text className="oppIngCourseTeachers" key={`tea${index}`}>
                                                        {item}
                                                    </Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                        }
                    </AtTabsPane>
                    <AtTabsPane current={current} index={1}>
                    {endCourse.map((res,index) => {
                            return (
                                <View className="oppIngCourseItems" key={`dh${index}`} onClick={()=>this.courseDetail(res.id)}>
                                    <View className="oppIngCourseCover" style={{backgroundImage:`url(${res.cover})`}}></View>
                                    <View className="oppIngCourseText">
                                        <Text className="oppIngCourseName">{res.title}</Text>
                                        <Text className="oppIngCourseTeachers">指导老师:</Text>
                                        {
                                            res.teachers.map(item=>{
                                                return(
                                                    <Text className="oppIngCourseTeachers" key={`tea${index}`}>
                                                        {item}
                                                    </Text>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                        }
                    </AtTabsPane>
                </AtTabs>
            </View>
        )
    }
}
