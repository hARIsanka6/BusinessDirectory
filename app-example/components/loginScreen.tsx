import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


WebBrowser.maybeCompleteAuthSession()
export default function LoginScreen() {
  useWarmUpBrowser()
  
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp returned from startOAuthFlo
      }
    } catch (err) {
      
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])
  return (
    <View style={styles.container}>
        <View style={{display:"flex",marginTop:20,flexDirection:'row',justifyContent:"center",gap:5}}>
            <Image source={require("../../assets/images/bees.png")}
            style = {styles.logo}/>
              
            
            <Text style=
            {{fontFamily:'Outfit',fontSize:30,color:'#7303fc',textShadowColor: 'rgba(152, 143, 143, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 8}}>BuzzD
            </Text>

        </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require("../../assets/images/login.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Your Ultimate <Text style={styles.highlight}>Community Business Directory</Text> App
          </Text>
          <Text style={styles.description}>
            Explore businesses near you and give wings to your own business ideas.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Let's Get Started</Text>
          </TouchableOpacity>
        </View>
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 210,
    height: 450,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: '#000',
  },
  textContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: -20,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Outfit',
    fontSize: 30,
    textAlign: 'center',
    marginTop:10
  },
  highlight: {
    color: '#7303fc',
    textShadowColor: 'rgba(152, 143, 143, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10  
  },
  description: {
    fontFamily: 'Outfit',
    color: 'grey',
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#7303fc',
    paddingVertical: 16,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 20,
     

  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily:'Outfit',
    textShadowColor: 'rgba(33, 24, 24, 0.65)',
    textShadowOffset: {width: -3, height: 3},
    textShadowRadius: 20

  },
  logo:{
    width:40,
    height:40
  }
  
});
