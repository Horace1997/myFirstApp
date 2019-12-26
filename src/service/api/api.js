// import formData from "form-data";
import {consoleFunc, post, baseUrl,get } from "../../tools/common";




export const getAbility = (id) =>{
    return post(`${baseUrl}/api/student/getStudentAbilityData`,{studentId:id})
}
export const getImgUrl = (data) =>{
    return post(`${baseUrl}/api/miniProgramUpload/uploadFile`,data)
}

export const getCourseDetail = (id) =>{
    consoleFunc(`/api/courseDetail/getCourseTypeByCourseDetail`,id)
    return post(`${baseUrl}/api/courseDetail/getCourseTypeByCourseDetail`,id)
   
}   

export const getStudentHomework = (data) =>{
    return post(`${baseUrl}/api/assignment/studentGetAssignment`,data)
}

export const submitHomework = (data) =>{
    console.log(`/api/student_assignment/submitAssignment`,data)
    return post(`${baseUrl}/api/student_assignment/submitAssignment`,data)
}

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