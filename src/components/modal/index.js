import { Button } from "@tarojs/components"
import Taro,{ Component } from "@tarojs/taro";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui';

class Modal extends Component {
    static props = {

    }

    onChange(value, key) {

        this.props.onChange(value, key)
    }

    commit(){
        const {commit} = this.props
                commit()
    }

    render() {
        const { value } = this.props;
        return (
            <AtModal isOpened={value}
              closeOnClickOverlay={false}
            >
                <AtModalHeader>请先绑定学生信息</AtModalHeader>
                <AtModalContent>
                    <AtInput
                      title='手机号码'
                      type='number'
                      placeholder='请填写手机号'
                      onChange={e => this.onChange(e, "phone")}

                    ></AtInput>

                    <AtInput
                      title='段位'
                      type='text'
                      placeholder='请估计学生能力值'
                      onChange={e => this.onChange(e, "ability")}

                    ></AtInput>

                    <AtInput
                      title='学生姓名'
                      type='text'
                      placeholder='请填写学生姓名'
                      onChange={e => this.onChange(e, "studentName")}

                    ></AtInput>
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={this.commit}>确定</Button> </AtModalAction>
            </AtModal>
        )
    }
}

export default Modal



