import Taro from "@tarojs/taro";

export const appID=`wx46d7030be2ce1f72`;
export const appSecret = `ce1938aec82f8ba56bb8d73861609eb8`;
export const baseUrl = `https://football.edisonmiao.com`;
export const image_url = `https://football.edisonmiao.com/static`

export const get = (url,data)=>{
    return Taro.request({
        url,
        method:"GET",
        data,
        header:"",
        success:function(res){
          return res.data
        }
      }
      )
}


export const post = (url,data)=>{
    return Taro.request({
        url,
        method:"POST",
        data,
        header:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
          return res.data
        }
      }
      )
}

export const consoleFunc = (url,data) =>{
  console.log(`url:${url}`,`data:${JSON.stringify(data)}`)
}



export default {
    get,
    post,
    baseUrl,
    appID,
    appSecret,
}
