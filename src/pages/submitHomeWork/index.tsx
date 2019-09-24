import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text,Button } from "@tarojs/components"
import { AtImagePicker } from "taro-ui";

import "./index.scss"
const pic = require(`../../assets/images/background.jpeg`)
const pic1 = require("../../assets/images/background2.jpeg")
const picArray = [pic, pic1, pic]
export default class Index extends Component {

    componentWillMount(){
        let self = this
        Taro.getStorage({
            key:`data`,
            success(res){
                let result = JSON.parse(res.data)
                self.setState({
                    studentId:result.id,
                    openId:result.openId
                })
            }
        })
    }


    state = {
        homeWork:{
            homeWorkDescription:``,
            homeWorkImages:[],
            assignmentId:``
        },
        studentId:``,
        openId:``,
        images:[],

    }

    loadImage = () => {

        Taro.previewImage({
            current: pic,
            urls: picArray
        })
    }


    submitHomeWork = () =>{
        const {studentId,openId,images,homeWork} = this.state
        let obj = {
            studentId,
            openId,
            images,
            assignmentId:homeWork.assignmentId,
            content:``
        }
        console.log(obj)
    }

    getImage = (files) => {
        this.setState({
            images:files
        })
    }


    render() {
        const {homeWork} = this.state;

        return (
            <View className="submitMain">
                <View className="submitTitle">
                    <Text>今期功课</Text>
                </View>
                <View className="picArray">
                    {
                        picArray.map((item, index) => {
                        return (
                            <Image
                                key={`picItems_${index}`}
                                onClick={this.loadImage}
                                mode="scaleToFill"
                                src={item}
                                className="submitHwImage"
                            >
                            </Image>
                        )
                    })
                    }
                </View>

                <View className="submitDescription">
                    <Text>作业描述：XXXXXXXX</Text>

                    <AtImagePicker
                        onChange={this.getImage}
                        files={this.state.images}
                        className="submitUpload"
                    >

                    </AtImagePicker>

                    <Button type="primary" onClick={this.submitHomeWork} className="submitBtn">提交</Button>
                </View>

            </View>
        )
    }
}