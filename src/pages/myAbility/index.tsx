import PieChart from "../../components/PieChart";
import {Component} from "@tarojs/taro";

export default class Index extends Component{
    componentDidMount() {
        console.log(this)
        const chartData = [
          {value:335, name:'直接访问'},
          {value:310, name:'邮件营销'},
          {value:234, name:'联盟广告'},
          {value:135, name:'视频广告'},
          {value:1548, name:'搜索引擎'}
        ];
        // this.PieChart.refresh(chartData);
      }
    //   refPieChart = (node) => this.PieChart = node

      render(){
          return(
            <PieChart></PieChart>
          )
      }
}