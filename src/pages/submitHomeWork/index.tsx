import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components"
import {  AtTextarea, AtIcon, AtMessage } from "taro-ui";
import { getStudentHomework, submitHomework, getImgUrl } from "../../service/api/api";
import { baseUrl } from "../../tools/common";
import "./index.scss"
const pic = require(`../../assets/images/background.jpeg`)
const pic1 = require("../../assets/images/background2.jpeg")
const picArray = [pic, pic1, pic]
export default class Index extends Component {

    componentWillMount() {
        let self = this
        Taro.getStorage({
            key: `data`,
            success(res: Object): any {
                let result = JSON.parse((res as any).data)
                console.log(result)
                getStudentHomework({ studentId: result.studentList[0].id }).then(response => {
                    console.log(response)
                    self.setState({
                        courseHomework: response.data.resultData[0]
                    })
                })
                self.setState({
                    studentId: result.studentList[0].id,
                    openId: result.openId,
                    userId: result.id
                })

            }
        })
    }


    state = {
        courseHomework: {
            assignmentContent: ``,
            homeWorkImages: [],
            id: ``,
            dealLine: ``,
            title: ``,
            courseDetailId: ``
        },
        studentId: ``,
        openId: ``,
        images: [],
        content: ``,
        userId: ``,
        sendImage: ``
    }

    loadImage = () => {

        Taro.previewImage({
            current: pic,
            urls: picArray
        })
    }


    submitHomeWork = () => {
        let { studentId, userId, images, courseHomework, content } = this.state
        let self = this

        // Taro.uploadFile({
        //     url:public_url,
        //     filePath:
        // })
        // getImgUrl(images[0])
        Taro.uploadFile({
            url: `${baseUrl}/api/miniProgramUpload/uploadFile`,
            filePath: images[0].path,
            name: "file",
            success(res) {
                console.log(res)
                let result = JSON.parse(res.data)
                let imgUrl = result.resultData.path
                let obj = {
                    studentId,
                    userId,
                    images: imgUrl,
                    assignmentId: courseHomework.id,
                    content
                }
                submitHomework(obj).then(response => {
                    console.log(response.data.resultCode)
                    if (response.data.resultCode !== 200) {
                        Taro.atMessage({
                            'message': response.data.resultMessage,
                            'type': "warning",
                          })
                    }
                    self.setState({
                        images: [],
                        sendImage: ``,
                        content: ``
                    })
                })

            }
        })
    }


    getImage = (files) => {
        console.log(files)
        // Taro.chooseImage()
        this.setState({
            images: files
        })
    }

    getContent = (value) => {
        this.setState({
            content: value.detail.value
        })
    }

    uploadFunc = () => {
        let self = this
        Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFiles
                self.setState({
                    images: tempFilePaths
                })
            }
        })
    }

    close = () =>{
        this.setState({
            images:[],
            sendImage:``
        })
    }

    render() {
        const { courseHomework } = this.state;

        return (
            <View className="submitMain">
            <AtMessage />
                <View className="submitTitle">
                    <Text>{courseHomework.title}</Text>
                </View>


                <View className="submitDescription">
                    <Text>描述：{courseHomework.assignmentContent}</Text>
                    <AtTextarea
                        value={this.state.content}
                        onChange={this.getContent}
                        placeholder="请输入作业内容的表述"
                        name="getContent">

                    </AtTextarea>

                    {this.state.images.length > 0 &&
                        this.state.images.map(v => {
                            return (
                                <div className="containers">
                                    <AtIcon value='close' size='10' color='#999' className="closeBtn" onClick={this.close}></AtIcon>
                                    <Image src={v.path} className="imageStyle"></Image>

                                </div>
                            )
                        })
                    }
                    {this.state.images.length === 0 &&
                        <View className="submitUpload" onClick={this.uploadFunc}>
                            <p>+</p>
                        </View>
                    }

                    <Button type="primary" onClick={this.submitHomeWork} className="submitBtn">提交</Button>
                </View>

            </View>
        )
    }
}