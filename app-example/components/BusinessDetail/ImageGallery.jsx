import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";

export default function ImageGallery({ business }) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onImagePick = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        await saveImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const saveImage = async (imageUri) => {
    try {
      setLoading(true);
      const docRef = doc(db, "BusinessList", business?.id);
      await updateDoc(docRef, {
        galleryImages: arrayUnion({
          url: imageUri,
          uploadedBy: user?.fullName,
          uploadedAt: new Date().toISOString(),
        }),
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Gallery
        </Text>
        {user?.primaryEmailAddress?.emailAddress === business?.userEmail && (
          <TouchableOpacity
            onPress={onImagePick}
            disabled={loading}
            style={{
              backgroundColor: Colors.PRIMARY,
              padding: 8,
              borderRadius: 8,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text
                style={{
                  color: "#fff",
                  fontFamily: "outfit-medium",
                }}
              >
                Add Image
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={business?.galleryImages || []}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              marginRight: 10,
            }}
          >
            <Image
              source={{ uri: item.url }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
} 