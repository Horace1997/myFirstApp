import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
// import { AtTabs, AtTabsPane, AtTabBar, AtAvatar, AtIcon } from 'taro-ui';
import './index.scss';
// import background from "../../public/images/background.png";
// import badge from "../../public/images/badge2.png";
// import err from "../../public/images/home.png";

export default class Index extends Component {


    state = {
   
        
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

    courseDetail(id:Number){
        Taro.navigateTo({
            url:`pages/courseDetail/index?id=${id}`
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
        navigationBarTitleText: '我的'
    }
    render() {
        return (
            <View>
                <Text>真的好难啊</Text>
            </View>
        )
    }
}
