import React from 'react'
import LoginSignup from "../components/LoginSignup/LoginSignup"

function Homepage (){
    return(
        <div>
        
            <div> Homepage </div>
            <a href = "/CurrentChats"> Current Chats</a>
            <br />
            <a href = "/CoursePage"> Courses</a>
            <br />
            <br />
            <div> Profile: </div>
            <div> Name: XXXX </div>
            <div> Date of Birth: XX/XX/XXXX </div>
            <div> Major: XXXX </div>
            <div> Click Here to See Full Profile </div> 
            <br />
            <a href = "/"> Log Out </a>
        </div>
    )
}

export default Homepage