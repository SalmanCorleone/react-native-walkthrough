import React, { useRef } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import TouchableBlock from './TouchableBlock';
import Animated, {
  Value,
  set,
  block,
  call,
  event,
} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const images = {
  w1: require('../images/img-1.png'),
  w2: require('../images/img-2.png'),
  w3: require('../images/img-3.jpg'),
};

const { ScrollView, divide, interpolate } = Animated;

const Welcome = () => {
  let m = new Value(0);
  let scrollX = 0;
  let scrollView = useRef(null);

  const scrollNext = () => {
    scrollView.current.getNode().scrollTo({
      x: scrollX + WIDTH,
      y: 0,
    });
  };

  const scrollBack = () => {
    scrollView.current.getNode().scrollTo({
      x: scrollX - WIDTH,
      y: 0,
    });
  };

  const renderDots = () => {
    const activeIndex = divide(m, WIDTH);

    return (
      <View style={styles.dotBox}>
        {Object.keys(images).map((item, index) => {
          const opacity = interpolate(activeIndex, {
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <>
      <ScrollView
        contentOffset={WIDTH}
        horizontal
        ref={scrollView}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        snapToAlignment="center"
        onScroll={event([
          {
            nativeEvent: {
              contentOffset: {
                x: (x) =>
                  block([
                    set(m, x),
                    call([m], ([offsetX]) => (scrollX = offsetX)),
                  ]),
              },
            },
          },
        ])}>
        {/* Image array */}
        {Object.values(images).map((img, idx) => (
          <View key={`img=${idx}`} style={styles.imgContainer}>
            <Image source={img} style={styles.img} />

            {/* Next Button */}
            {idx < Object.values(images).length - 1 && (
              <TouchableBlock
                onPress={scrollNext}
                absBottom={30}
                absRight={20}
                height={60}
                width={60}
                absolute
                center
                middle
                br={50}>
                <Text style={styles.label}>Next</Text>
              </TouchableBlock>
            )}

            {/* Prev Button */}
            {idx < Object.values(images).length && idx > 0 && (
              <TouchableBlock
                onPress={scrollBack}
                absBottom={30}
                absLeft={20}
                height={60}
                width={60}
                absolute
                center
                middle
                br={50}>
                <Text style={styles.label}>Prev</Text>
              </TouchableBlock>
            )}

            {/* Skip to App */}
            {idx === Object.values(images).length - 1 && (
              <TouchableBlock
                absBottom={30}
                absRight={20}
                height={60}
                width={60}
                absolute
                center
                middle
                br={50}>
                <Text style={styles.label}>Done</Text>
              </TouchableBlock>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Dots */}
      {renderDots()}
    </>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 20,
    color: 'white',
  },
  imgContainer: {
    height: HEIGHT,
    width: WIDTH,
  },
  dotBox: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
});
