import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Button title='Sign Up' onPress={()=>router.push("/sign-up")}/>
    </View>
  )
}

export default signin