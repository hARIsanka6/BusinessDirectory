import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { useNavigation } from "expo-router";
  import { Colors } from "../../constants/Colors";
  import * as ImagePicker from "expo-image-picker";
  import RNPickerSelect from "react-native-picker-select";
  import { collection, doc, getDocs, query, setDoc } from "firebase/firestore";
  import { db } from "../../config/FirebaseConfig";
  import { useUser } from "@clerk/clerk-expo";
  
  export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
  
    const { user } = useUser();
  
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");
    const [website, setWebsite] = useState("");
    const [about, setAbout] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      navigation.setOptions({
        headerTitle: "Add New Business",
        headerShown: true,
      });
      GetCategoryList();
    }, []);
  
    const onImagePick = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to pick image. Please try again.");
      }
    };
  
    const GetCategoryList = async () => {
      try {
        setCategoryList([]);
        const q = query(collection(db, "Category"));
        const snapShot = await getDocs(q);
  
        snapShot.forEach((doc) => {
          setCategoryList((prev) => [
            ...prev,
            {
              label: doc.data().name,
              value: doc.data().name,
            },
          ]);
        });
      } catch (error) {
        Alert.alert("Error", "Failed to load categories. Please try again.");
      }
    };
  
    const validateForm = () => {
      if (!image) {
        Alert.alert("Error", "Please select a business image");
        return false;
      }
      if (!name.trim()) {
        Alert.alert("Error", "Please enter business name");
        return false;
      }
      if (!address.trim()) {
        Alert.alert("Error", "Please enter business address");
        return false;
      }
      if (!contact.trim()) {
        Alert.alert("Error", "Please enter contact information");
        return false;
      }
      if (!category) {
        Alert.alert("Error", "Please select a category");
        return false;
      }
      return true;
    };
  
    const onAddNewBusiness = async () => {
      if (!validateForm()) return;
      
      try {
        setLoading(true);
        await saveBusinessDetail();
        ToastAndroid.show("Business added successfully!", ToastAndroid.LONG);
        navigation.goBack();
      } catch (error) {
        Alert.alert("Error", "Failed to add business. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    const saveBusinessDetail = async () => {
      const businessData = {
        name: name.trim(),
        address: address.trim(),
        contact: contact.trim(),
        about: about.trim(),
        website: website.trim(),
        category: category,
        username: user?.fullName,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userImage: user?.imageUrl,
        imageUrl: image, // Store the local image URI directly
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "BusinessList", Date.now().toString()), businessData);
    };
  
    return (
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          Add Business
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Colors.GRAY,
          }}
        >
          Fill all the details in order to add new business
        </Text>
  
        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          onPress={() => onImagePick()}
        >
          {!image ? (
            <Image
              source={require("../../assets/images/placeholder.png")}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 15,
              }}
            />
          )}
        </TouchableOpacity>
  
        <View>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          />
          <TextInput
            placeholder="Contact"
            value={contact}
            onChangeText={setContact}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          />
          <TextInput
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          />
          <TextInput
            placeholder="About"
            value={about}
            onChangeText={setAbout}
            multiline
            numberOfLines={5}
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
              height: 100,
            }}
          />
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          >
            <RNPickerSelect
              onValueChange={setCategory}
              items={categoryList}
              placeholder={{ label: "Select Category", value: null }}
            />
          </View>
        </View>
  
        <TouchableOpacity
          disabled={loading}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 5,
            marginTop: 20,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={onAddNewBusiness}
        >
          {loading ? (
            <ActivityIndicator size={"large"} color={"#fff"} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: "#fff",
              }}
            >
              Add New Business
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }