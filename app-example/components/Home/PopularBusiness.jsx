import { View, Text, FlatList } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness({ businessList = [] }) {
  return (
    <View>
      <View
        style={{
          paddingLeft: 20,
          paddingRight:20,
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Popular Business
        </Text>
        <Text style={{ color: "#7303fc", fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>

      <FlatList
        style={{marginBottom:10}}
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBusinessCard business={item} key={index} />
        )}
      />
    </View>
  );
}
