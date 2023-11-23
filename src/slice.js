import { createSlice } from "@reduxjs/toolkit";

;

 export const counterSlice=createSlice({
    name:"slice",
    initialState:{
    firstname:"",
    session:"0",
    password:"",
    myemail:"",
    email:[],
    token:"",
    logIn:false,
   
   
    
},
    reducers:{
            setFirstName:(state,action)=>{
             state.firstname = action.payload;
            },
            setSession:(state,action)=>{
                state.session=action.payload;
            },
            setPasswords:(state,action)=>{
                state.password=action.payload;
            },
            setmyemail:(state,action)=>{
                state.myemail=action.payload;
            },
            setEmails:(state,action)=>{
                if(action?.payload?.length!==0){
                  state.email.push(action.payload);
                  let Email = state.email.filter((value, index, self) => {
                    return self.indexOf(value) === index;
                  });
                  state.email=Email;
                }
               
              
            },
            setToken:(state,action)=>{
                state.token=action.payload;
            },
            setLogIn:(state)=>{
                state.logIn=!state.logIn;
            }
        },
    });

    
     export const {setFirstName,setSession,setPasswords,setmyemail,setEmails,setToken,setLogIn}=counterSlice.actions;
    
     export default counterSlice.reducer;
       
      
     
        

