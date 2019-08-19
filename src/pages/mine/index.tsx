import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem } from '@tarojs/components'
import { AtTabBar } from 'taro-ui';
import './index.scss';
import background from "../../public/images/background.png";
import badge from "../../public/images/badge2.png";
import err from "../../public/images/home.png";

export default class Index extends Component {


  state={
    current:1
  }

  handleClick(e){
    if(e===0){
      Taro.switchTab({
        url:"pages/index/index"
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
  render(){
    return(
      <View>
        <AtTabBar
        // className="tabBar"
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
