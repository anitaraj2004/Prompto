import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

// Sample data
const data = [
  {
    id: '1',
    image: 'https://example.com/image1.jpg',
    prompt: 'This is the first prompt',
    tag: 'Art',
  },
  {
    id: '2',
    image: 'https://example.com/image1.jpg',
    prompt: 'This is the second prompt',
    tag: 'other',
  },
  // Add more objects here
];

export default function Swipe() {
  const translateX = useSharedValue(0);

  const panStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value) }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.map((item, index) => (
        <PanGestureHandler
          onGestureEvent={(e) => {
            translateX.value = e.nativeEvent.translationX;
          }}
          key={item.id}
        >
          <Animated.View style={[styles.card, panStyle]}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <LinearGradient colors={['#4caf50', '#8bc34a']} style={styles.tagBox}>
              <Text style={styles.tagText}>{item.tag}</Text>
            </LinearGradient>

            <Text style={styles.promptText}>{item.prompt}</Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>X</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Star</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Heart</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </PanGestureHandler>
      ))}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
  },
  tagBox: {
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    margin: 10,
  },
  tagText: {
    color: 'white',
    fontWeight: 'bold',
  },
  promptText: {
    position: 'absolute',
    bottom: 50,
    left: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
  },
  button: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 50,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
  },
});
