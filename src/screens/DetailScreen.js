import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {inject, observer} from 'mobx-react';
import {checkIconActive, checkIconInactive} from '../assets/images/index';

@inject('notesStore')
@observer
class DetailScreen extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.screenType = this.props.route.params.screenType;
    this.id = this.props.route.params.id;
    this.state = {
      title: '',
      body: '',
      screenHeading: '',
    };
  }

  changeTitle = title => {
    this.setState({title});
  };

  changeBody = body => {
    this.setState({body});
  };

  editNote = async () => {
    const {title, body} = this.state;
    if (this.screenType === 'addScreen') {
      this.props.notesStore.addNote(title, body);
    }
    if (this.screenType === 'updateScreen') {
      this.props.notesStore.updateNote(this.id, title, body);
    }
    this.navigation.navigate('HomeScreen');
  };

  checkScreenType = () => {
    if (this.screenType === 'addScreen') {
      this.setState({
        screenHeading: 'Add a New Note',
      });
    }
    if (this.screenType === 'updateScreen') {
      const {title, body} = this.props.notesStore.getNote(this.id);
      this.setState({
        screenHeading: 'Edit Note',
        title,
        body,
      });
    }
  };

  componentDidMount() {
    this.checkScreenType();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarHeading}>{this.state.screenHeading}</Text>
          <TouchableOpacity
            style={styles.topBarIcon}
            onPress={() => this.navigation.navigate('HomeScreen')}>
            <Text style={styles.topBarIconText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailView}>
          <TextInput
            style={styles.titleInput}
            placeholder="TITLE"
            placeholderTextColor="#888"
            value={this.state.title}
            onChangeText={text => this.changeTitle(text)}
          />
          <TextInput
            style={styles.noteInput}
            placeholder="ENTER NOTE"
            placeholderTextColor="#888"
            value={this.state.body}
            onChangeText={text => this.changeBody(text)}
          />
        </View>
        <View style={styles.btnView}>
          <TouchableOpacity style={styles.btnMain} onPress={this.editNote}>
            <Image
              style={styles.checkIcon}
              source={
                this.state.title.length > 0
                  ? checkIconActive
                  : checkIconInactive
              }
            />
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
  topBar: {
    flex: 1,
    backgroundColor: '#60DAC4',
  },
  topBarHeading: {
    textAlign: 'center',
    color: '#444',
    fontSize: 16,
  },
  topBarIcon: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 25,
    height: 25,
    borderRadius: 12,
    padding: 5,
    position: 'absolute',
    right: 10,
  },
  topBarIconText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  detailView: {
    flex: 20,
    padding: 20,
  },
  titleInput: {
    height: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  noteInput: {
    height: 250,
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  btnMain: {
    backgroundColor: '#60DAC4',
    borderRadius: 50,
  },
  checkIcon: {
    height: 75,
    width: 75,
  },
});

export default DetailScreen;
