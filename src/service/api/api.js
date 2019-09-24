// import formData from "form-data";
import { post, baseUrl,get } from "../../tools/common";

export const makeOppointment = (obj) => {
    return post(`${baseUrl}/api/orderCourse/reserveCourseDetail`, obj)
}

export const addStudentMessage = (data) =>{
    return post(`${baseUrl}/api/userLogin/bindStudentById`,data)
}   

export const getLesson = () =>{
    return get(`${baseUrl}/api/courseDetail/getCourseDetailLastThree`)
}

export const getUserInformation = (code) =>{
    return post(`${baseUrl}/api/userLogin/getUserLoginInfo?code=${code}`)
}

export const getStudentCourse = () =>{
    return post(`${baseUrl}`)
}


export const getStudentMessage = (id) =>{
    return post(`${baseUrl}/api/student/getStudentById`,{studentId:id})
}