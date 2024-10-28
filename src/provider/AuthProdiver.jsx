import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const AuthContext=createContext(null)
const auth=getAuth(app)
const googleProvider = new GoogleAuthProvider();


const AuthProdiver = ({children}) => {

 const [user,setUser]=useState(null)
 const [loading,setLoading]=useState(true)
 const axiosPublic=useAxiosPublic()

 const googleSignIn=()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
 }

 const signUp=(email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
 }
 const signIn=(email,password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
 }

 const logOut=()=>{
  return signOut(auth)
 }

 const updateUserProfile=(name,photo)=>{
  return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
 }

 useEffect(()=>{
   const unSubscribe= onAuthStateChanged(auth,currentUser=>{
        console.log("current user --------->" ,currentUser)
        setUser(currentUser)
        if(currentUser){
            // to do something for secure
            const userInfo={email:currentUser.email}
            axiosPublic.post('/jwt',userInfo)
            .then(res=>{
                
                if(res.data.token){
                    
                    localStorage.setItem('access-token',res.data.token)
                   
                    setLoading(false)
                }
                
            })

        }
        else{
            // to do something for remove cookies
            localStorage.removeItem('access-token')
            setLoading(false)
        }
        
    })
    return ()=>{
        unSubscribe()
    }
 },[axiosPublic])

    const authInfo={
        user,
        loading,
        signUp,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
      
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProdiver;