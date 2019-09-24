import Taro, { Component } from "@tarojs/taro";
import Chart from 'taro-echarts'
import { View } from "@tarojs/components"
import {AtProgress,} from "taro-ui"
export default class Index extends Component {

  componentDidMount(){
    
  }


  state={
    Ability:[
      
    ]
  }


  render() {
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
                      value: [80, 80, 95, 70, 70, 60],
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