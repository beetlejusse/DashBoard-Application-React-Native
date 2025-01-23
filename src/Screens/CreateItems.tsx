import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, { useState } from 'react';

// Validation function
const validateFields = (itemName: string, stockAmt: string) => {
  // Checking for itemName is a non-empty string
  if (!itemName || typeof itemName !== 'string') {
    return 'Please enter a valid item name.';
  }

  // Checking for stockAmt is a number
  const stockNumber = parseFloat(stockAmt);
  if (isNaN(stockNumber) || stockNumber <= 0) {
    return 'Please enter a valid stock amount.';
  }

  return '';
};

const CreateItems = ({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const addItemHandler = () => {
    const errorMessage = validateFields(itemName, stockAmt);
    if (errorMessage) {
      return ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }

    const id = data.length + 1;
    const item = { id, name: itemName, quantity: stockAmt };
    setData([...data, item]);
    setItemName('');
    setStockAmt('');

    // now editing the items
    setIsEdit(false);
  };

  const deleteItemHandler = (id: number) => {
    const newData = data.filter((item: any) => item.id !== id);
    setData(newData);
  };

  const editItemHandler = (item: any) => {
    setIsEdit(true);
    setItemName(item.name);
    setStockAmt(item.quantity);
  };

  const updateItemHandler = () => {
    const errorMessage = validateFields(itemName, stockAmt);
    if (errorMessage) {
      return ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }

    const newData = data.map((item: any) => {
      if (item.name === itemName) {
        return { ...item, quantity: stockAmt };
      }
      return item;
    });
    setData(newData);
    setItemName('');
    setStockAmt('');
    setIsEdit(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Item...."
        placeholderTextColor={'#999'}
        style={styles.input}
        value={itemName}
        onChangeText={item => setItemName(item)}
      />

      <TextInput
        placeholder="Enter Stock Amount"
        placeholderTextColor={'#999'}
        style={styles.input}
        value={stockAmt}
        onChangeText={item => setStockAmt(item)}
        keyboardType="numeric" // Only show numeric keyboard
      />

      <Pressable style={styles.btn} onPress={() => (isEdit ? updateItemHandler() : addItemHandler())}>
        <Text style={styles.btnText}>{isEdit ? "Edit Item" : 'Add Item'}</Text>
      </Pressable>

      <View style={{ marginTop: 10 }}>
        <Text style={styles.headingText}>All Items in Stock</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                { backgroundColor: item.quantity < 7 ? '#FFCCCC' : '#D7F6BFFF' },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{ flexDirection: 'row', gap: 15 }}>
                <Text style={styles.itemText}>{item.quantity}</Text>
                <Pressable onPress={() => editItemHandler(item)}>
                  <Text style={styles.itemText}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <Text style={styles.itemText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default CreateItems;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#72C37AFF',
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { textAlign: 'center', color: 'white', fontWeight: 'bold' },

  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 10,
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
  },
});
