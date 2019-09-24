import Taro from "@tarojs/taro";
import {View,Button} from "@tarojs/components"
import {AtAvatar} from "taro-ui"
import { image_url } from '../../tools/common';


export const Index = () => {
    return (
        <View className='authorizeBtn' onClick={this.authorize}>
            <View>
                <AtAvatar
                  image={`${image_url}/avatar/d41d8cd98f00b204e9800998ecf8427e.png`}
                  circle
                  size='large'
                  className='pcAvatars'
                >
                </AtAvatar>
            </View>

            <View className='pcCardAuthorize' >
                <Button openType='getUserInfo' onGetuserinfo={this.callBack} className='getUserInfoBtn'>你现在还是游客，点击授权</Button>
            </View>
        </View>
    )
}

export default Index;