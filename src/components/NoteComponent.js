import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const NoteComponent = ({id, title, body, openUpdateScreen, removeNote}) => {
  return (
    <TouchableOpacity
      key={id.toString()}
      style={styles.noteContainer}
      onPress={() => openUpdateScreen('updateScreen', id)}
      onLongPress={() => removeNote(id)}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.note}>{body}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteContainer: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  note: {
    color: '#555',
  },
});

export default NoteComponent;
