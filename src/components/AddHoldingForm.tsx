import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// TODO: import useForm, Controller from react-hook-form
// TODO: import zodResolver from @hookform/resolvers/zod
// TODO: import AddHoldingInputSchema, AddHoldingInput from schemas

interface Props {
  onSubmit: (data: any) => Promise<void>; // TODO: replace `any` with AddHoldingInput
  onCancel: () => void;
}

// TODO (Step 3): Implement AddHoldingForm.
// - Wire useForm with zodResolver(AddHoldingInputSchema)
// - Show inline validation errors under each field
// - Disable the submit button while isSubmitting
// - Call props.onSubmit with valid data, then close on success

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
