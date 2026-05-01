import { licensePlateSliderImages } from '@/src/constants/constantsArray';
import { Utility } from '@/src/constants/utility';
import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useSharedComponentStyles } from '../shared/sharedComponentsStyes/sharedComponentsStyes';


const IMAGE_WIDTH = Utility.SP_75;
const SPACING = Utility.SP_10;
const TOTAL_WIDTH = (IMAGE_WIDTH + SPACING) * licensePlateSliderImages.length;

export default function LicensePlateSlider() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = useSharedComponentStyles();

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -TOTAL_WIDTH,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.LicensePlateSliderContainer}>
      <Animated.View
        style={[
          styles.LicensePlateSlider,
          {
            transform: [{ translateX: scrollX }],
          },
        ]}
      >
        {[...licensePlateSliderImages, ...licensePlateSliderImages].map((source, index) => (
          <Image
            key={index}
            source={source}
            style={styles.LicensePlateSliderImage}
            contentFit="contain"  
            cachePolicy="memory-disk"
          />
        ))}
      </Animated.View>
    </View>
  );
}

