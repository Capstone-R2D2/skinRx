import React, { Component } from 'react'
import { View, 
  Text,
  StyleSheet,
  TouchableOpacity,
  Slider,
  Image,
  Platform,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import {addEntry, updateEntry} from '../redux/reducers/journey'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import Carousel from 'react-native-snap-carousel';


const { height, width } = Dimensions.get('window');

class JourneyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        date: "",
        images: [],
        stressLevel: 3,
        diet: "",
        description: "",
        status: null,
        entry: null
    }
    this.handleSubmission = this.handleSubmission.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async () => {
    await this.getPermissionAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      const imagesState = this.state.images;
      imagesState.push(result.uri)
      this.setState({ images: imagesState });
    }
  };

  createFormData = (images, body) => {
    const data = new FormData();

    for(let i=0; i < images.length; i++){
      data.append('entryImages', {
        name: `entry_image_${this.props.userId}${i}.jpg`,
        type: 'image',
        uri:
          Platform.OS === 'android' ? images[i] : images[i].replace('file://', ''),
      })
    }
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };

  componentWillReceiveProps(props){
    const entry = props.entry
    if(entry !== null){
      this.setState({
        date: entry.date,
        images: entry.imageUrls,
        stressLevel: entry.stressLevel,
        diet: entry.diet,
        description: entry.description,
        status: entry.status,
        entry: entry.id
      })
    }
  }

  async handleSubmission () {
    // ADD MORE ALERTS
    //also this one doesn't work because image is no longer a state
    if(this.state.image === null){
      Alert.alert('Please add an image to your entry');
    } else {
      const formData = this.createFormData(this.state.images, {
        date: this.state.date,
        stressLevel: this.state.stressLevel,
        diet: this.state.diet,
        description: this.state.description,
        status: this.state.status
      })
      if(this.state.entry === null){
        await this.props.addEntry(this.props.userId, formData)
        this.setState({
          date: "",
          images: [],
          stressLevel: 3,
          diet: "",
          description: "",
          status: null,
          entry: null
        })
        Alert.alert('Entry Added!');
      } else {
        await this.props.updateEntry(this.props.userId, this.state.entry, formData)
        this.setState({
          date: "",
          images: [],
          stressLevel: 3,
          diet: "",
          description: "",
          status: null,
          entry: null
        })
        Alert.alert('Entry Added!');
      }
    }
  }

  handleStatus (num) {
    this.setState({status: num})
  }

  renderItem = ({ item }) => {
    return (
        <Image source={{ uri: item }} style={styles.image} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
          <ScrollView>
            {
              this.state.images.length > 0 ?
              <View style={{marginBottom: '10%', display: "flex", flexDirection: "row", justifyContent: "center"}}>
                <Carousel
                  inactiveSlideOpacity={0.6}
                  inactiveSlideScale={0.65}
                  firstItem={0}
                  sliderWidth={width/2}
                  itemWidth={width*(15/100)}
                  data={this.state.images}
                  renderItem={this.renderItem}
                  containerCustomStyle={{ overflow: 'visible' }}
                  contentContainerCustomStyle={{ overflow: 'visible' }}
                  layout={'stack'} 
                  layoutCardOffset={10}
                />
              </View> : null
            }
            <TextInputMask
                style={styles.input}
                placeholder= 'MM/DD/YYYY'
                type={'datetime'}
                options={{
                    format: 'MM/DD/YYYY'
                }}
                value={this.state.date}
                onChangeText={text => {
                    this.setState({
                    date: text
                    })
                }}
            />
            <Text style={styles.text}>How stressed are you today?</Text>
            <Slider 
                style={{width: '100%', alignSelf: 'center', marginBottom: '7%'}}
                maximumValue={5} 
                minimumValue={1} 
                value={this.state.stressLevel}
                step={1}
                onValueChange={value => this.setState({stressLevel: value})} 
                minimumTrackTintColor={'#BFD7ED'}
                maximumTrackTintColor={'#dadada'}
            />
            <AutoGrowingTextInput
                style={styles.input}
                placeholder="How's your diet?"
                onChangeText={text => this.setState({ diet: text })}
                value={this.state.diet}
            />
            <AutoGrowingTextInput
                style={styles.input}
                placeholder="What was your skincare routine today?"
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
            />
            <Text style={styles.text}>How is your skin doing?</Text>
            <View style={styles.statusContainer}>
              <TouchableOpacity
                  style={this.state.status === 3 ? styles.statusBtn : styles.btn}
                  onPress={() => this.handleStatus(3)}
              >
                  <Text style={this.state.status === 3 ? styles.statusText : styles.btnText}>Great!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={this.state.status === 2 ? styles.statusBtn : styles.btn}
                  onPress={() => this.handleStatus(2)}
              >
                  <Text style={this.state.status === 2 ? styles.statusText : styles.btnText}>Fine.</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={this.state.status === 1 ? styles.statusBtn : styles.btn}
                  onPress={() => this.handleStatus(1)}
              >
                  <Text style={this.state.status === 1 ? styles.statusText : styles.btnText}>Bad!</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => this.pickImage()}
            >
                <Text style={styles.AddImageText}>Add Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.SaveBtn}
                onPress={() => this.handleSubmission()}
            >
                <Text style={styles.SaveText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
      </View>
      
    )
  }
}

const mapState = (state) => ({
  userId: state.users.user.id,
})

const mapDispatch = (dispatch) => ({
  addEntry: (id, entry) => dispatch(addEntry(id, entry)),
  updateEntry: (id, entryId, entry) => dispatch(updateEntry(id, entryId, entry))
})

export default connect(mapState, mapDispatch)(JourneyForm)

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: 'white',
    marginBottom: '2%'
  },
  input: {
    width: "100%",
    marginBottom: '7%',
    borderWidth: 1, 
    borderColor: "#dadada",
    borderRadius: 10,
    fontFamily: 'Avenir',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  SaveBtn: {
    backgroundColor: "#BFD7ED",
    padding: '1%',
    width: '50%',
    marginBottom: '2%',
    alignSelf: 'center',
    borderRadius: 15
  },
  AddImageText: {
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 2, 
    fontWeight: "bold",
    color: '#a8a8a8',
    fontFamily: 'Avenir',
    marginBottom: '5%'
  },
  SaveText: {
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase", 
    letterSpacing: 2, 
    fontWeight: "bold",
    color: 'white',
    fontFamily: 'Avenir'
  },
  image: {
    width: width/4,
    height: width/4,
    borderRadius: 10
  },
  text: {
    fontFamily: 'Avenir',
    color: '#a8a8a8',
    marginBottom: '5%'
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: '2%',
    marginBottom: '5%'
  },
  btn: {
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 25,
    padding: '2%',
    width: '25%'
  },
  statusBtn: {
    borderWidth: 1,
    borderColor: "#A7CAEB",
    borderRadius: 25,
    padding: '2%',
    width: '25%'
  },
  statusText: {
    fontFamily: 'Avenir',
    color: '#A7CAEB',
    textAlign: 'center'
  },
  btnText: {
    fontFamily: 'Avenir',
    color: '#dadada',
    textAlign: 'center'
  }
})