import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Text,
} from 'react-native';
import TouchableBlock from './TouchableBlock';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const images = {
  w1: require('../images/img-1.png'),
  w2: require('../images/img-2.png'),
  // w2: require('../../../assets/images/walk-2.png'),
  // w3: require('../../../assets/images/walk-3.png'),
  // w4: require('../../../assets/images/walk-4.png'),
};

const Welcome = () => {
  let scrollX = 0;
  let scrollView = useRef(null);

  const scrollNext = () => {
    scrollX += WIDTH;
    scrollView.current.scrollTo({
      x: scrollX,
      y: 0,
    });
  };

  const scrollBack = () => {
    scrollX -= WIDTH;
    scrollView.current.scrollTo({
      x: scrollX,
      y: 0,
    });
  };

  return (
    <ScrollView
      contentOffset={WIDTH}
      horizontal
      ref={scrollView}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate={0}
      snapToAlignment="center"
      onScroll={Animated.event([
        { nativeEvent: { contentOffset: { x: scrollX } } },
      ])}>
      {Object.values(images).map((img, idx) => (
        <View key={`img=${idx}`} style={styles.imgContainer}>
          <Image source={img} style={styles.img} />

          {/* Next Button */}
          {idx < Object.values(images).length - 1 && (
            <TouchableBlock
              onPress={scrollNext}
              absBottom={60}
              absRight={20}
              height={60}
              width={60}
              absolute
              border={1}
              center
              middle
              bg="white"
              br={50}>
              <Text style={{ fontSize: 40 }}> next </Text>
            </TouchableBlock>
          )}

          {/* Prev Button */}
          {idx < Object.values(images).length - 1 && idx > 0 && (
            <TouchableBlock
              onPress={scrollBack}
              absBottom={60}
              absLeft={20}
              height={60}
              width={60}
              absolute
              border={1}
              center
              middle
              bg="white"
              br={50}>
              <Text style={{ fontSize: 40 }}> prev </Text>
            </TouchableBlock>
          )}

          {/* Skip to App */}
          {idx === Object.values(images).length - 1 && (
            <TouchableBlock
              absBottom={60}
              absRight={20}
              height={60}
              width={60}
              absolute
              border={1}
              center
              middle
              bg="white"
              br={50}>
              <Text style={{ fontSize: 40 }}> Done </Text>
            </TouchableBlock>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  imgContainer: {
    height: HEIGHT,
    width: WIDTH,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'darkgrey',
    backgroundColor: 'grey',
    marginHorizontal: 5,
  },
});
