import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AllItems from './AllItems';
import CreateItems from './CreateItems';

const Buttons = ['All Item', 'Low Stock', 'Add Item'];

// const data = [
//     ,
// ]

const HomeSceen = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([
    {id: 1, name: 'biscuit', quantity: 10, unit: 'kg'},
    {id: 2, name: 'corn', quantity: 5, unit: 'pkg'},
    {id: 3, name: 'coke', quantity: 4, unit: 'can'},
    {id: 4, name: 'toffee', quantity: 10, unit: ''},
    {id: 5, name: 'namkeen', quantity: 10, unit: 'pkg'},
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>DashBoard</Text>

      <View style={styles.btnContainer}>
        {Buttons.map((btn, index) => (
          <Pressable
            key={index}
            style={[
              styles.btn,
              view === index ? {backgroundColor: '#72C37AFF'} : null,
            ]}
            onPress={() => setView(index)}>
            <Text
              style={[
                styles.btnText,
                view === index ? {color: 'white'} : null,
              ]}>
              {btn}
            </Text>
          </Pressable>
        ))}
      </View>
      {view === 0 && <AllItems data={data} />}
      {/* yaha par data filter karke pass karna hai low stock page */}
      {view === 1 && <AllItems data={data.filter(item => item.quantity < 7)} />}
      {view === 2 && <CreateItems data={data} setData={setData} />}
    </View>
  );
};

export default HomeSceen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: '4%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    paddingVertical: 3.5,
    paddingHorizontal: 15,
    borderWidth: 0.8,
    borderRadius: 50,
    borderColor: '#72C3AFF',
    marginBottom: 10,
  },
  btnText: {
    color: '#72C3AFF',
    fontWeight: '500',
    fontSize: 15,
  },
});
