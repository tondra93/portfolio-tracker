import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AddHoldingInputSchema, type AddHoldingInput } from '../schemas/holding';

interface AddHoldingModalProps {
  visible: boolean;
  isSubmitting: boolean;
  submissionError: string | null;
  onClose: () => void;
  onSubmit: (data: AddHoldingInput) => Promise<boolean>;
}

export const AddHoldingModal: React.FC<AddHoldingModalProps> = ({
  visible,
  isSubmitting,
  submissionError,
  onClose,
  onSubmit,
}) => {
  type AddHoldingFormValues = z.input<typeof AddHoldingInputSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AddHoldingFormValues, unknown, AddHoldingInput>({
    resolver: zodResolver(AddHoldingInputSchema),
    mode: 'onChange',
    defaultValues: {
      ticker: '',
      name: '',
      quantity: '' as any,
      purchasePrice: '' as any,
    },
  });

  const submit = async (data: AddHoldingInput) => {
    const isSaved = await onSubmit(data);
    if (isSaved) {
      reset();
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}>
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Add Holding</Text>
          {submissionError ? <Text style={styles.submitError}>{submissionError}</Text> : null}

          <Controller
            control={control}
            name="ticker"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Ticker (e.g. AAPL)"
                autoCapitalize="characters"
                value={value}
                onBlur={onBlur}
                onChangeText={text => onChange(text.replace(/\s/g, '').toUpperCase())}
              />
            )}
          />
          {errors.ticker ? <Text style={styles.errorText}>{errors.ticker.message}</Text> : null}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name (optional)"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name ? <Text style={styles.errorText}>{errors.name.message}</Text> : null}

          <Controller
            control={control}
            name="quantity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="number-pad"
                value={String(value)}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.quantity ? (
            <Text style={styles.errorText}>{errors.quantity.message}</Text>
          ) : null}

          <Controller
            control={control}
            name="purchasePrice"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Purchase Price"
                keyboardType="decimal-pad"
                value={String(value)}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.purchasePrice ? (
            <Text style={styles.errorText}>{errors.purchasePrice.message}</Text>
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, isSubmitting && styles.disabledButton]}
              onPress={onClose}
              disabled={isSubmitting}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                (!isValid || isSubmitting) && styles.disabledButton,
              ]}
              onPress={handleSubmit(submit)}
              disabled={!isValid || isSubmitting}>
              <Text style={styles.submitText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '85%',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
  },
  errorText: {
    color: '#dc2626',
    marginTop: 4,
    fontSize: 12,
  },
  submitError: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    borderColor: '#fecaca',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 8,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.55,
  },
  cancelText: {
    color: '#111827',
    fontWeight: '600',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
  },
});
