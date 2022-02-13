import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  StatusBar,
  Dimensions,
  Button,
} from 'react-native';
import { BlurView } from 'expo-blur';

import React, { useState, useRef } from 'react';

const image = {
  uri: 'https://www.lifehacker.com.au/content/uploads/sites/4/2020/06/25/pfb4yyzdufx5jalgiyxx-scaled-e1593035108757.jpg',
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFill,
  lockScreen: {
    alignItems: 'center',
    height, // so "lockScreen" is height of device
    justifyContent: 'center',
    marginTop: height, // so "lockScreen" initially out of view
  },
  primary: {
    alignItems: 'center',
    height,
    justifyContent: 'center',
    width,
  },
  root: {
    position: 'relative', // so "primary" is relative to root
  },
  // eslint-disable-next-line react-native/no-color-literals
  text: {
    color: 'white',
    fontSize: 24,
  },
});

export function App() {
  const [locked, setLocked] = useState(false);

  const scrollView = useRef(null);
  const scrollEnabled = !locked;

  const onMomentumScrollEnd = ({ nativeEvent }) => {
    const nextLocked = nativeEvent?.contentOffset?.y === height;
    setLocked(nextLocked);
  };

  const unlock = () => {
    setLocked(false);
    scrollView.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.root}>
      <StatusBar />
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.primary}
        >
          <Text style={styles.text}>This is your application.</Text>
        </ImageBackground>
      </View>
      <ScrollView
        ref={scrollView}
        decelerationRate={0} // makes snap go faster
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEnabled={scrollEnabled} // prevent scroll when device locked
        showsVerticalScrollIndicator={false} // hides scrollbar
        snapToInterval={height} // snap to height of screen (top of screen)
      >
        <BlurView style={styles.lockScreen} tint="dark">
          <Text style={styles.text}>This is your lock screen.</Text>
          <Button title="Unlock" onPress={unlock} />
        </BlurView>
      </ScrollView>
    </View>
  );
}
