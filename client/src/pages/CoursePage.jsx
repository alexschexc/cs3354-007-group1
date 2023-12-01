import React from 'react'
import LoginSignup from "../components/LoginSignup/LoginSignup"

function CoursePage (){
    return(
        <div>
            <div> Course Page </div>
            <a href = "/CurrentChats"> Current Chats</a>
            <div> People </div>
            <div> Professor</div>
            <div> Student 1 </div>
            <div> Student 2 </div>
            <div> Student 3 </div>
            <div> Click here to view full list of students for this course </div>
            <div> Class Chat </div>
            <div> XXXXX XXXX Chat </div>
            <div> XXXXX XXXX Chat </div>
            <div> XXXXX XXXX Chat </div>
            <div> XXXXX XXXX Chat </div>
            <div> XXXXX XXXX Chat </div>
            <div> Click here to view all class chats</div>
            <a href = "/Chatroom"> Chatroom </a>
            <a href = "/Homepage"> Homepage </a>
            <a href = "/"> Log Out </a>
        </div>
    )
}

export default CoursePage