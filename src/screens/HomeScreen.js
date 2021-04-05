import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import NoteComponent from '../components/NoteComponent';
import {inject, observer} from 'mobx-react';
import {addIcon} from '../assets/images/index';

@inject('notesStore')
@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  renderNote = ({item}) => {
    return (
      <NoteComponent
        key={item.id.toString()}
        id={item.id}
        title={item.title}
        body={item.body}
        openUpdateScreen={this.openUpdateScreen}
        removeNote={this.removeNote}
      />
    );
  };

  openUpdateScreen = (title, id) => {
    this.navigation.navigate('DetailScreen', {
      screenType: 'updateScreen',
      id,
    });
  };

  removeNote = id => {
    Alert.alert('Delete Item', 'Are you sure you want to delete this note ?', [
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => this.props.notesStore.removeNote(id),
      },
      {text: 'No', style: 'cancel'},
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarHeading}>Simple Note Taker</Text>
        </View>
        <View style={styles.notesWrapper}>
          {this.props.notesStore.getAllNotes.length === 0 ? (
            <View style={styles.emptyNoteList}>
              <Text style={styles.emptyNoteText}>
                You do not have any notes!
              </Text>
            </View>
          ) : (
            <FlatList
              data={this.props.notesStore.getAllNotes}
              keyExtractor={item => item.title}
              renderItem={this.renderNote}
              bounces={false}
            />
          )}
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.btnMain}
            onPress={() => {
              return this.navigation.navigate('DetailScreen', {
                screenType: 'addScreen',
              });
            }}>
            <Image source={addIcon} style={styles.imgIcon} />
            <Text>Add New Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  notesWrapper: {
    paddingHorizontal: 20,
    flex: 20,
  },
  topBar: {
    flex: 1,
    backgroundColor: '#60DAC4',
  },
  topBarHeading: {
    textAlign: 'center',
    color: '#444',
    fontSize: 16,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: '#60DAC4',
    borderRadius: 20,
  },
  imgIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  textIcon: {
    fontSize: 20,
    textAlign: 'center',
  },
  emptyNoteList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyNoteText: {
    fontSize: 18,
    color: '#222',
  },
});

export default HomeScreen;
