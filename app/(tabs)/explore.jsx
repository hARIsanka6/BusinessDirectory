import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import Category from "../../app-example/components/Home/Category";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import ExploreBusinessList from "../../app-example/components/Explore/ExploreBusinessList";
import SearchBar from "../../app-example/components/SearchBar";

export default function Explore() {
  const [businessList, setBusinessList] = useState([]);
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllBusinesses();
  }, []);

  const getAllBusinesses = async () => {
    try {
      const q = query(collection(db, "BusinessList"));
      const querySnapshot = await getDocs(q);
      const businesses = [];
      querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() });
      });
      setAllBusinesses(businesses);
      setBusinessList(businesses);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getAllBusinesses();
    setRefreshing(false);
  }, []);

  const GetBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );

    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
  };

  const handleSearch = (text) => {
    if (!text.trim()) {
      setBusinessList(allBusinesses);
      return;
    }

    const filteredBusinesses = allBusinesses.filter((business) =>
      business.name.toLowerCase().includes(text.toLowerCase()) ||
      business.category.toLowerCase().includes(text.toLowerCase()) ||
      business.address.toLowerCase().includes(text.toLowerCase())
    );
    setBusinessList(filteredBusinesses);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#7303fc"]}
          tintColor="#7303fc"
        />
      }
    >
      <View
        style={{
          padding: 20,
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 30,
          }}
        >
          Explore More
        </Text>

        {/* SearchBar  */}
        <SearchBar onSearch={handleSearch} />

        {/* Category  */}
        <Category
          explore={true}
          onCategorySelect={(category) => GetBusinessByCategory(category)}
        />

        {/* Business List  */}
        <ExploreBusinessList businessList={businessList} />
      </View>
    </ScrollView>
  );
}
