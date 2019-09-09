import { Button, View, Picker, Text } from "@tarojs/components"
import Taro, { Component } from "@tarojs/taro";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui';

class Modal extends Component {
  state = {
    ability: ""
  }
  onChange(value, key) {

    this.props.onChange(value, key)
  }

  commit() {
    const { commit } = this.props
    commit()
  }

  selector = (e) => {
    let result = this.props.level[e.detail.value]
    this.setState({
      ability: result
    })
    this.onChange(result, "ability")

  }



  render() {
    const { value, level } = this.props;
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

            title='学生姓名'
            type='text'
            placeholder='请填写学生姓名'
            onChange={e => this.onChange(e, "studentName")}

          ></AtInput>


          {/* <View style={{ paddingTop: "15px", paddingBottom: "15px", paddingLeft: "15px" }}>
            <Picker
              mode='selector'
              range={level}
              onChange={
                e => this.selector(e)
              }
            >
              <Text>当前能力估值:{this.state.ability}</Text>
            </Picker>
          </View> */}
        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.commit}>确定</Button> </AtModalAction>
      </AtModal>
    )
  }
}

export default Modal



