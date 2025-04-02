import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../config/FirebaseConfig';
import { useFonts } from 'expo-font';

export default function Slider() { 
    const [sliderList, setSliderList] = useState([]);

    // Load Fonts
    const [fontsLoaded] = useFonts({
        'outfit-bold': require('../../../assets/fonts/Outfit-Bold.ttf'), 
        'outfit': require('../../../assets/fonts/Outfit-Regular.ttf')
    });

    useEffect(() => {
        GetSliderList();
    }, []);

    const GetSliderList = async () => {
        setSliderList([]);
        const q = query(collection(db, 'SliderPics'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            setSliderList(prev => [...prev, doc.data()]);
        });
    };

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>; // Avoid rendering before fonts are loaded
    }

    return (
        <View>
            <Text style={{
                fontFamily: 'outfit-bold', 
                fontSize: 20, 
                paddingLeft: 20, 
                paddingTop: 20, 
                marginBottom: 5
            }}>
                #Special for you
            </Text>

            <FlatList
                data={sliderList}
                horizontal
                renderItem={({ item }) => (
                    <Image 
                        source={{ uri: item.imageUrl }}
                        style={{ width: 300, height: 160, borderRadius: 15, marginRight: 13 }}
                    />
                )}
            />
        </View>
    );
}
