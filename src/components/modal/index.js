import { Button, } from "@tarojs/components"
import Taro, { Component } from "@tarojs/taro";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtInput } from 'taro-ui';

class Modal extends Component {
  static defaultProps = {
    phoneNum: undefined
  }
  state = {
    disBol: false
  }

  componentDidMount() {
    if (this.props.phoneNum) {
      this.setState({
        disBol: true
      })
    }
  }

  onChange(value, key) {
    this.props.onChange(value, key)
  }
  commit() {
    const { commit } = this.props
    commit()
  }

  selector = () => {
    // let result = this.props.level[e.detail.value]
    // this.setState({
    //   ability: result
    // })
    // this.onChange(result, "ability")

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
            value={this.props.phoneNum}
            placeholder='请填写手机号'
            disabled={this.state.disBol}
            onChange={e => this.onChange(e, "phone")}
          ></AtInput>


          <AtInput

            title='学生姓名'
            type='text'
            placeholder='请填写学生姓名'
            onChange={e => this.onChange(e, "name")}

          ></AtInput>

        </AtModalContent>
        <AtModalAction>
          <Button onClick={this.commit}>确定</Button>
        </AtModalAction>
      </AtModal>
    )
  }
}

export default Modal



