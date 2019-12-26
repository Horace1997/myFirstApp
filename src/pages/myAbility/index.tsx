import Taro, { Component } from "@tarojs/taro";
import Chart from 'taro-echarts'
import { View } from "@tarojs/components"
import {AtProgress,} from "taro-ui"
import {getAbility} from "../../service/api/api";
export default class Index extends Component {

  state={
    pass:0,
    intercept:0,
    dribble:0,
    surpass:0,
    skill:0,
    shoot:0
  }
  componentDidMount(){

    // getAbility()
    let self = this
    Taro.getStorage({
      key:`data`,
      success:(res:any)=>{
      let defaultStudentId = JSON.parse(res.data).studentList[0].id
        getAbility(defaultStudentId).then(result=>{
          const temp = result.data.resultData
          console.log(temp)
          self.setState({
            pass:temp.pass,
            dribble:temp.dribble,
            shoot:temp.shoot,
            skill:temp.skill,
            surpass:temp.surpass,
            intercept:temp.intercept
          })
        })
      } 
    })
  }


  render() {
    const {pass,surpass,intercept,dribble,skill,shoot} = this.state
    console.log(pass,surpass,intercept,dribble,skill,shoot)
    return (
      <View className="myAbMain">
        <View className="myAbRadar">
          <Chart
            chartId='chart-example-line'
            option={{

              radar: [
                {
                  indicator: [
                    { text: '盘球', max: 100 },
                    { text: '传球', max: 100 },
                    { text: '射门', max: 100 },
                    { text: '抢断', max: 100 },
                    { text: '体能', max: 100 },
                    { text: '过人', max: 100 }
                  ],
                  radius: 120,
                }

              ],
              series: [
                {
                  name: '雷达图',
                  type: 'radar',
                  itemStyle: {
                    emphasis: {
                      // color: 各异,
                      lineStyle: {
                        width: 1
                      },

                    }
                  },

                  data: [
                    {
                      areaStyle: {
                        normal: {
                          color: 'rgba(255, 255, 255, 0.5)'
                        }
                      },
                      textStyle: {
                        fontSize: 24,
                        fontWeight: "bold"
                      }
                    }
                  ]
                },
                {
                  name: '成绩单',
                  type: 'radar',
                  radarIndex: 0,
                  data: [
                    {
                      value: [surpass, pass, shoot, intercept, skill, dribble],
                      name: '李四',
                      areaStyle: {
                        normal: {
                          opacity: 0.6,
                          color:"#1e90ff"
                        }
                      }
                    }
                  ]
                }
              ]
            }}
            height="300px"
          />
        </View>
            {

            }
        <AtProgress percent={30} strokeWidth={15} color='#FFC82C' status='progress' isHidePercent={true}/>
      </View>

    )
  }
}