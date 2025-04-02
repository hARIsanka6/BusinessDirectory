import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function CategoryItem({category,onCategoryPress}) {
  return (
    
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
    <View style={{padding:15,
      backgroundColor:'#d5b6fa',
      borderRadius:99,
      marginRight:15

    }}>
        <Image  source={{uri:category.icon}}
        style={{width:40,
            height:40
        }}
        />
    </View>
    <Text style={{marginTop:5,position:'relative',right:8,fontSize:12,fontFamily:"outfit-medium",textAlign:"center"}}>
      {category.name}
    </Text>
    </TouchableOpacity>
  )
}