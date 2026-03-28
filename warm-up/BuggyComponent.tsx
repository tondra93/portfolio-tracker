// warm-up/BuggyComponent.tsx
// ⚠️  FOR INTERVIEWER USE ONLY — not part of the app build
// Show this to the candidate and ask them to narrate what they see.

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

interface Stock {
  id: string;
  ticker: string;
  price: number;
}

// BUG 1: fetchStocks is declared outside the component but referenced in
// the useEffect dependency array — it will be a new reference on every render
// if inlined, or stale if omitted. The effect is missing it from deps entirely.
const fetchStocks = async (): Promise<Stock[]> => {
  const { data } = await axios.get('http://10.0.2.2:3001/api/portfolio');
  return data;
};

export const BuggyComponent: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filter, setFilter] = useState('');

  // BUG 2: Missing dependency — `filter` is used inside the effect but not
  // listed. The effect won't re-run when filter changes.
  useEffect(() => {
    fetchStocks().then(data => {
      const filtered = data.filter(s => s.ticker.includes(filter));
      setStocks(filtered);
    });
  }, []); // <- missing `filter`

  const handlePress = (stock: Stock) => {
    // BUG 3: Direct state mutation — never mutate state directly.
    // This won't trigger a re-render.
    stock.price = stock.price * 1.1;
    setStocks(stocks); // also wrong — same array reference
  };

  return (
    <View>
      {/* BUG 4: FlatList is missing keyExtractor — React will warn and
          use index fallback, causing subtle re-render bugs with dynamic lists */}
      <FlatList
        data={stocks}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            {/* BUG 5: Inline style object is re-created on every render.
                Should use StyleSheet.create outside the component. */}
            <Text style={{ fontSize: 16, padding: 8 }}>
              {item.ticker} — ${item.price}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
