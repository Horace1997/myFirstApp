import Taro, { Component } from "@tarojs/taro";
import { View, Text,Button } from "@tarojs/components"
import { AtImagePicker, AtTextarea} from "taro-ui";
import {getStudentHomework , submitHomework} from "../../service/api/api";
import "./index.scss"
const pic = require(`../../assets/images/background.jpeg`)
const pic1 = require("../../assets/images/background2.jpeg")
const picArray = [pic, pic1, pic]
export default class Index extends Component {

    componentWillMount(){
        let self = this
        Taro.getStorage({
            key:`data`,
            success(res:Object):any{
                let result = JSON.parse((res as any).data)
                console.log(result)
                getStudentHomework({studentId:result.studentList[0].id}).then(response=>{
                    console.log(response)
                    self.setState({
                        courseHomework:response.data.resultData[0]
                    })
                })
                self.setState({
                    studentId:result.studentList[0].id,
                    openId:result.openId
                })
                
            }
        })
    }


    state = {
        courseHomework:{
            assignmentContent:``,
            homeWorkImages:[],
            id:``,
            dealLine:``,
            title:``,
            courseDetailId:``
        },
        studentId:``,
        openId:``,
        images:[],
        content:``
    }

    loadImage = () => {

        Taro.previewImage({
            current: pic,
            urls: picArray
        })
    }


    submitHomeWork = () =>{
        const {studentId,openId,images,courseHomework,content} = this.state
        let obj = {
            studentId,
            openId,
            images,
            assignmentId:courseHomework.id,
            content
        }

        submitHomework(obj).then(res=>{
            console.log(res)
        })
        
    }

    getImage = (files) => {
        console.log(files)
        this.setState({
            images:files
        })
    }

    getContent = (value) =>{
        console.log(value)
        this.setState({
            content:value.detail.value
        })
    }


    render() {
        const {courseHomework} = this.state;

        return (
            <View className="submitMain">
                <View className="submitTitle">
                    <Text>{courseHomework.title}</Text>
                </View>
                {/* <View className="picArray">
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
                </View> */}

                <View className="submitDescription">
                    <Text>描述：{courseHomework.assignmentContent}</Text>
                    <AtTextarea 
                    value={this.state.content}
                    onChange={this.getContent} 
                    placeholder="请输入作业内容的表述"
                    name="getContent">

                    </AtTextarea>
                    <AtImagePicker
                        length={1}
                        onChange={this.getImage}
                        files={this.state.images}
                        className="submitUpload"
                        showAddBtn={this.state.images.length<1}
                    >

                    </AtImagePicker>

                    <Button type="primary" onClick={this.submitHomeWork} className="submitBtn">提交</Button>
                </View>

            </View>
        )
    }
}