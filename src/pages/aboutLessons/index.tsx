import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss';
import { get, baseUrl, image_url } from "../../tools/common";
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";
export default class Index extends Component {


    state = {
        lessonsArray: [
        ]

    }
    componentWillMount() { }

    componentDidMount() {
        get(`${baseUrl}/api/courseType/getCourseTypeList`).then(res => {
            this.setState({
                lessonsArray: res.data.resultData
            })
        })
    }

    componentWillUnmount() { }

    componentDidShow() {

    }

    componentDidHide() { }

    handleClick(e) {
        this.setState({
            current: e
        })
    }
    makeOppointment(id) {
        Taro.navigateTo({
            url: `/pages/aboutDetail/index?id=${JSON.stringify(id)}`
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
        const { lessonsArray } = this.state
        return (
            <View className="oppMain">
                {
                    lessonsArray.map((res, index) => {
                        return (

                                
                                    <View>
                                        {res.cover&&res.courseDetails.length>0&&
                                        <View className="oppItems"
                                            style={{ backgroundImage: `url(${image_url}${res.cover})` }}
                                            key={`opp${index}`}
                                            onClick={() => this.makeOppointment(res)}
                                        ></View>}
                                    </View>
                            
                        )
                    })
                }
            </View>
        )
    }
}
