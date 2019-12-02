import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import ProductCard from './ProductCard';
import {connect} from 'react-redux'
import {getRecommendations} from '../redux/reducers/recommendations'
import { ThemeConsumer } from 'react-native-elements';

let scrollYPos = 0;

class RecommendationScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id,
      skinTypeId: this.props.user.skinTypeId, 
      selected: 'cleanser',    
      // screenWidth: Dimensions.get('window').width,
      screenWidth: 330,
    }
    this.scrollToA = this.scrollToA.bind(this)
    this.scrollToB = this.scrollToB.bind(this)
    this.scrollToC = this.scrollToC.bind(this)
    this.scrollToD = this.scrollToD.bind(this)
  }

  async componentDidMount() {
    await this.props.getRecommendations(this.state.userId, this.state.skinTypeId)
  }

  // scrolling functionality
  scrollToA = () => {
    this.scroller.scrollTo({x: 0, y: 0});
    this.setState({selected: "cleanser"})
  };
  scrollToB = () => {
    scrollXPos = this.state.screenWidth * 1;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "toner"})
  };
  scrollToC = () => {
    scrollXPos = this.state.screenWidth * 2;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "serum"})
  };
  scrollToD = () => {
    scrollXPos = this.state.screenWidth * 3;
    this.scroller.scrollTo({x: scrollXPos, y: 0});
    this.setState({selected: "moisturizer"})
  };
  

  render() {

    return (
      <View style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <Text style={styles.header}>An easy four step process curated just for you</Text> 
          
          {/* <Text></Text> */}
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginTop: 25}}>
            <TouchableOpacity onPress={this.scrollToA}>
              <Text style={ this.state.selected === 'cleanser' ? styles.clicked : '' }>Cleanser</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToB}>
              <Text style={ this.state.selected === 'toner' ? styles.clicked : '' }>Toner</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToC}>
              <Text style={ this.state.selected === 'serum' ? styles.clicked : '' }>Serum</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.scrollToD}>
              <Text style={ this.state.selected === 'moisturizer' ? styles.clicked : '' }>Moisturizer</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
              style={styles.container} 
              contentContainerStyle={styles.contentContainer} 
              horizontal= {true}
              decelerationRate={0}
              snapToInterval={330} //element width
              snapToAlignment={"center"}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              ref={(scroller) => {this.scroller = scroller}}
          >

          {/* Product no 1 - cleanser */}
         { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].cleanser[0]} /> : null }

          <Text></Text>
          
          {/* Product no 2 - toner */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].toner[0]}  /> : null }

          <Text></Text>

          {/* product no. 3 - moisturizer */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].moisturizer[0]}  /> : null }

          <Text></Text>

          {/* product no. 4 - sunscreen */}
          { this.props.recommendations.recommendations.length > 0 ? <ProductCard state={this.props.recommendations.recommendations[0].serum[0]}  /> : null }

          <Text></Text>

        </ScrollView>
      </View>
    )
  }
}


RecommendationScreen.navigationOptions = {
  title: 'Recommended Products',
};


const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  }, 
  text: {
    fontSize: 20,
    fontWeight: "bold",
  }, 
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    // backgroundColor: "#e1e9f0",
    backgroundColor: "#e6ebf0"
  },
  contentContainer: {
    paddingBottom: 75,
    paddingHorizontal: 7,
  }, 
  clicked: {
    color: "white", 
    fontWeight: "bold",
    borderBottomWidth: 2, 
    borderBottomColor: "white",
    // fontSize: 15,
  }
})


const mapState = state => ({
  recommendations: state.recommendations,
  user: state.users.user,
})

const mapDispatch = dispatch => ({
  getRecommendations: (userId, skinTypeId) => dispatch(getRecommendations(userId, skinTypeId))
})

export default connect(mapState, mapDispatch)(RecommendationScreen)