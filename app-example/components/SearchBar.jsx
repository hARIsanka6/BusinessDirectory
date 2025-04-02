import { View, TextInput } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";

export default function SearchBar({ onSearch, placeholder = "Search..." }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 10,
        marginVertical: 10,
        marginTop: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
      }}
    >
      <Ionicons name="search" size={24} color={Colors.PRIMARY} />
      <TextInput
        placeholder={placeholder}
        style={{ fontFamily: "outfit", fontSize: 16, flex: 1 }}
        onChangeText={onSearch}
      />
    </View>
  );
} 