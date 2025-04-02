import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from "./../../app-example/components/Home/Header"
import Slider from "./../../app-example/components/Home/Slider"
import Category from '../../app-example/components/Home/Category'
import PopularBusiness from '../../app-example/components/Home/PopularBusiness'
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function Home() {
  const [businessList, setBusinessList] = useState([]);
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllBusinesses();
  }, []);

  const getAllBusinesses = async () => {
    try {
      const q = query(collection(db, "BusinessList"), limit(10));
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

  const handleSearch = (text) => {
    setSearchQuery(text);
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
      {/* Header with Search */}
      <Header onSearch={handleSearch}/>

      {/* Slider */}
      <Slider/>

      {/* Category */}
      <Category/>

      {/* Popular Business List */}
      <PopularBusiness businessList={businessList} />
    </ScrollView>
  )
}