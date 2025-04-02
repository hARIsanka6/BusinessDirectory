import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { Colors } from "../../app-example/constants/Colors";
import Intro from "../../app-example/components/BusinessDetail/Intro";
import ActionButton from "../../app-example/components/BusinessDetail/ActionButton";
import About from "../../app-example/components/BusinessDetail/About";
import Reviews from "../../app-example/components/BusinessDetail/Reviews";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business, setBusiness] = useState();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    GetBsuinessDetailById();
  }, []);

  /**
   * Used to get BusinessDetail by Id
   **/
  const GetBsuinessDetailById = async () => {
    setLoading(true);
    const docRef = doc(db, "BusinessList", businessid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setBusiness({ id: docSnap.id, ...docSnap.data() });
      setLoading(false);
    } else {
      console.log("No such document!");
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await GetBsuinessDetailById();
    setRefreshing(false);
  }, []);

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
      {loading ? (
        <ActivityIndicator
          style={{
            marginTop: "70%",
          }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <View>
          {/* Intro */}
          <Intro business={business} />

          {/* Action Buttons */}
          <ActionButton business={business} />

          {/* About Section  */}
          <About business={business} />

          {/* Reviews Section  */}
          <Reviews business={business} />
        </View>
      )}
    </ScrollView>
  );
}
