import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const AddHoldingForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add holding</Text>
      {/* TODO: form fields */}
      <Text>{'TODO: implement form'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
});
