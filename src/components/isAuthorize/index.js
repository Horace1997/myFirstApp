import Taro from "@tarojs/taro"
import {View,Text} from "@tarojs/components"
import {AtAvatar} from "taro-ui"

export const Index = (props) =>{
    const {pcMsg,currentStudentData,rank} = props;
    return(
        <View className='pcMessageCardSon'>
              <View className='left'>
                <AtAvatar
                  image={pcMsg.avatarUrl}
                  circle
                  size='large'
                  className='pcAvatar'
                ></AtAvatar>
                <View className='pcMessageName'>
                  <Text>{currentStudentData.name}</Text>
                </View>
              </View>

              <View className='right'>
                

                      <View className='pcMessageContent'>
                        <Text className='pcMessage'>
                          段位:{rank[currentStudentData.level-1]}
                        </Text>
                      </View>
                

                      <View className='pcMessageContent'>
                        <Text className='pcMessage'>
                          年龄:{currentStudentData.age}
                        </Text>
                      </View>

                      <View className='pcMessageContent'>
                        <Text className='pcMessage'>
                          位置:{currentStudentData.position}
                        </Text>
                      </View>

              </View>
            </View>
    )
}

export default Index;