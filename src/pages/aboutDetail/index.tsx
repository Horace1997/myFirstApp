import Taro, { Component, Config } from '@tarojs/taro'
import { View, Swiper, SwiperItem, Text } from '@tarojs/components'
import './index.scss';

// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


    state = {
        lessonsArray: [
            { cover: "", id: "1" },
            { cover: "", id: "3" },
            { cover: "", id: "2" }
        ],
        lessonsName: "青训初级班",
        lessonsStatus: 1,
        lessonDesc: "由黄锦麟老师细心指导，为求完成这个完美而对少儿有益的全新课程，让同学们体验到全所未有的痛快",
        lessonsStudentCensus: 1,
        lessonsClassCensus: 1
    }
    componentWillMount() { }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    handleClick(e) {
        this.setState({
            current: e
        })
    }
    makeOppointment(id) {
        Taro.navigateTo({
            url: `/pages/aboutDetail/index?id=${id}`
        })
    }

    getStatus(status) {
        let result;
        switch (status) {
            case 0: result = { text: "未开始", color: "grey" }
                break;
            case 1: result = { text: "报名中", color: "red" }
                break;
            case 2: result = { text: "进行中", color: "green" }
                break;
            case 3: result = { text: "已结束", color: "blue" }
                break;
        }
        return result
    }
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: '课程介绍'
    }
    render() {
        const { lessonsArray, lessonsName, lessonsStatus, lessonDesc, lessonsStudentCensus, lessonsClassCensus } = this.state
        return (
            <View className="aboutDetailMain">
                <Swiper>
                    {lessonsArray.map((item, index) => {
                        return (
                            <SwiperItem key={`cover_${index}`}>
                                <View className="aboutDetailSwiperItem" style={{ backgroundImage: `url(${item.cover})` }}>
                                    {item.id}
                                </View>
                            </SwiperItem>
                        )
                    })}
                </Swiper>

                <View className="aboutDetailTitle">
                    <Text className="aboutDetailStatus" style={{ backgroundColor: `${this.getStatus(lessonsStatus).color}` }}>{this.getStatus(lessonsStatus).text}</Text>
                    <Text className="aboutDetailName">{lessonsName}</Text>
                    <Text className="aboutDetailDesc">{lessonDesc}</Text>
                    <View className="aboutDetailCard">
                        <View className="aboutDetailCardTitle">
                            <Text className="aboutDetailCardTitleText">学员人数</Text>
                        </View>
                        <Text className="aboutDetailCardText">
                            {lessonsStudentCensus}
                        </Text>
                    </View>
                    <View className="aboutDetailCard">
                        <View className="aboutDetailCardTitle">
                            <Text className="aboutDetailCardTitleText">学员人数</Text>
                        </View>
                        <Text className="aboutDetailCardText">
                            {lessonsStudentCensus}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
}
