import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AllItems = ({data}: {data: any}) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Items:</Text>
        <Text style={styles.headingText}>Quatity:</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.itemContainer, {backgroundColor: item.quantity < 7 ? '#FFCCCC' : '#D7F6BFFF'}]}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.quantity}</Text>
          </View>
        )}
        contentContainerStyle={{gap: 10}}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemText: {
    fontWeight: 500,
    fontSize: 14,
  }
});
