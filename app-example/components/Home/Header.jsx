import { View, Text, Image, Platform, StatusBar, TextInput } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Header({ onSearch }) {
  const { user } = useUser();

  return (
    <>
      {/* Ensure StatusBar is set properly */}
      <StatusBar backgroundColor="#7303fc" barStyle="light-content" />

      <View
        style={{
          padding: 20,
          paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0)-20 : 10,
          backgroundColor: '#7303fc',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          width: '100%', // Ensure full width
        }}
      >
        {/* User Info Section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={{ uri: user?.imageUrl }} style={{ width: 45, height: 45, borderRadius: 99 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 16 }}>Welcome</Text>
            <Text style={{ fontSize: 19, fontFamily: 'outfit', color: 'white' }}>{user?.fullName}</Text>
          </View>
        </View>

        {/* Search Bar Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingLeft: 10,
            marginVertical: 10,
            marginTop: 15,
            borderRadius: 8,
            paddingVertical: 5,
            width: '100%', // Ensure full width
          }}
        >
          <FontAwesome name="search" size={20} color="black" />
          <TextInput
            style={{ fontFamily: 'outfit', fontSize: 15, marginLeft: 5, flex: 1 }}
            placeholder="Search..."
            onChangeText={onSearch}
          />
        </View>
      </View>
    </>
  );
}
