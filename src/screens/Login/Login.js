import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import AppWrapper from '../../components/AppWrapper'
import { mycolors } from '../../utils/Themes/color'
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { GoogleSignin,statusCodes } from '@react-native-google-signin/google-signin'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure();    
  }, [])
  
const signIn =async() => {
  try{
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
   if(userInfo){
    await AsyncStorage.setItem('key',JSON.stringify(userInfo))
    navigation.replace('Home')
  }
  }catch(error){
    if(error.code === statusCodes.SIGN_IN_CANCELLED){
        console.log('SIGN_IN_CANCELLED')
    }else if (error.code === statusCodes.IN_PROGRESS){
        console.log('IN_PROGRESS')
    }else if(error.code ===statusCodes.PLAY_SERVICES_NOT_AVAILABLE){
      console.log('PLAY_SERVICES_NOT_AVAILABLE')
    }else{
      console.log(error,'some other error happened')
        }
  }
};


  return (
    <AppWrapper>
      <StatusBar backgroundColor={mycolors.themeViolet} />
      <View style={{ flex: 1, backgroundColor: mycolors.themeViolet, paddingHorizontal: 20 }}>
        <View style={{ flex: 0.5, }} >
          <Image style={{ width: responsiveWidth(70), height: 100, alignSelf: 'center' }}
            source={{ uri: 'https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2021/12/zepto-1640066094.jpg' }} />
          <Text style={{
            color: mycolors.white, fontSize: responsiveFontSize(1.7), textAlign: 'center',
            top: -20,
            letterSpacing: 1.4
          }}>
            10 Minutes Delivery
          </Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: 'center' }}>
          <TouchableOpacity 
          onPress={signIn}
          activeOpacity = {0.8}
          style={{backgroundColor:mycolors.white,
            padding:15,
            borderRadius:15,
            justifyContent:'center',
            flexDirection:'row',
            gap:10,
            alignItems:'center'}}>
              <AntDesign name ='google' size ={20} color ={mycolors.themeViolet}/>
              <Text style={{
            color: mycolors.black, fontSize: responsiveFontSize(1.7), fontWeight:700,
          }}>SignIn with Google</Text>
          </TouchableOpacity>
          <Text style={{
            color: mycolors.white, fontSize: responsiveFontSize(1.6), fontWeight:400, textAlign: 'center', top:10
          }}>I accept the Terms of Use & privacy policy </Text>
        </View>
      </View>
    </AppWrapper>
  )
}

export default Login