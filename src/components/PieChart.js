// eslint-disable-next-line import/newline-after-import
import Taro,{Component} from "@tarojs/taro";
import * as echarts from "./ec-canvas/ec-canvas";



class Index extends Component {

    state = {
        ec: {
          lazyLoad: true
        }
     };

    config = {
        usingComponents: {
            "ec-canvas": "./ec-canvas/ec-canvas"
        }
    };

    refresh(data) {
        this.Chart.init((canvas, width, height) => {
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          this.setChartData(chart, data);
          return chart;
        });
      }
     
      refChart = node => (this.Chart = node);

      setChartData(chart, data) {
        let option = {
          series : [
            {
              name: '访问来源',
              type: 'pie',
              center: ['50%', '50%'],
              radius: [0, '60%'],
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        chart.setOption(option);
      }
      
    render() {
        return (
                <ec-canvas
                  ref={this.refChart}
                  canvas-id='mychart-area'
                  ec={this.state.ec}
                />



        )
    }
}
export default Index