import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfo } from "features/restaurants/components";

export const RestaurantsScreen = () => {
  return (
    <>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.searchBarContainer}>
          <Searchbar value={""} />
        </View>
        <View>
          <RestaurantInfo />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 16,
  },
  appContainer: {
    flex: 1,
  },
});
