import { FlatList, StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import {collection,getDocs,query} from "firebase/firestore"
import {db} from '../../../config/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'

export default function Category({explore=false,onCategorySelect}) {

  const [categoryList,setCategoryList] = useState([]);
  const router = useRouter();

  useEffect(()=>{
    GetCategoryList()
  },[])

  const GetCategoryList = async()=>{
     setCategoryList([])
     const q = query(collection(db,'Category'));
     const querySnapshot = await getDocs(q);

     querySnapshot.forEach((doc)=>{
      
      setCategoryList(prev=>[...prev,doc.data()])
     }) 
  }
  const onCategoryPressHandler = (category)=>{
    if(!explore){
      router.push('/businesslist/'+category.name)
    }
    else{
      onCategorySelect(category.name)


    }
  }
  return (
    <View >
      {!explore && <View style={{display:'flex',paddingLeft:20 , paddingRight:20,paddingTop:10,paddingBottom:10,display:"flex",flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
      <Text style={{
        fontSize:20,fontFamily:"outfit-bold"
      }} >
        Category
      </Text>
      <Text style={{color:'#7303fc',fontFamily:'outfit-medium'}}>
        View All

      </Text>
    </View>}
    <FlatList
      data={categoryList}
      style={{marginTop:-4,marginleft:20}}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <CategoryItem category={item} key={index} onCategoryPress={(category)=>onCategoryPressHandler(category)}/>
      )}
      horizontal={true}
    />
    

    </View>
  )
}

