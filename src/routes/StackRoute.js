import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home/Home';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Wishlist from '../screens/Wishlist/Wishlist';
import Cart from '../screens/Cart/Cart';
const stack = createNativeStackNavigator();
const StackRoute = () => {
  return (
   <stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Splash'>
    <stack.Screen name="Home" component={Home}/>
    <stack.Screen name="Login" component={Login}/>
    <stack.Screen name="Cart" component={Cart}/>
    <stack.Screen name="Wishlist" component={Wishlist}/>
    <stack.Screen name="Splash" component={Splash}/>

   </stack.Navigator>
  )
}

export default StackRoute