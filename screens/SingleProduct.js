import React from "react";
import { connect } from "react-redux";
import Stars from "react-native-stars";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import {
  addRating,
  getRating,
  editRating
} from "../redux/reducers/productReviews";
import { getToxicityScore } from "../redux/reducers/products";
import IngredientScoreBar from "../components/IngredientScoreBar";
import TabBar from "react-native-underline-tabbar";
import ScrollableTabView from "react-native-scrollable-tab-view";


class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.navigation.getParam("id"),
      imageUrl: this.props.navigation.getParam("imageUrl"),
      ingredients: this.props.navigation.getParam("ingredients"),
      brand: this.props.navigation.getParam("brand"),
      name: this.props.navigation.getParam("name"),
      category: this.props.navigation.getParam("category"),
      userId: this.props.user.id,
      viewIngredients: true,
      viewReview: false
    };
  }

  IngredientsPage = ({ label }) => (
    <View style={{ marginTop: 30 }} >
      <View style={styles.barContainer}>
        {this.state.ingredients.map((ingredient, index) => {
          if (ingredient === " : ") {
            return null;
          } else {
            return (
              <IngredientScoreBar
                style={styles.bar}
                key={index}
                ingredient={ingredient}
              />
            );
          }
        })}
      </View>
    </View>
  );

  ReviewPage = ({ label }) => (
    <View style={{ marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'space-between' }} >
      <Stars
        half={false}
        default={this.props.rating ? this.props.rating.rating : 0}
        update={val => {
          if (!this.props.rating) {
            this.props.addRating(this.state.productId, this.state.userId, val);
          } else {
            this.props.editRating(this.state.productId, this.state.userId, val);
          }
        }}
        spacing={4}
        starSize={40}
        count={5}
        fullStar={require("./images/starFilled.png")}
        emptyStar={require("./images/starEmpty.png")}
      />
      <Text style={{ textAlign: "center", fontSize: 18, marginTop: 40 }}>
        Ready for a new recommendation?
      </Text>
     <View style={styles.btnContainer}>
                    <TouchableOpacity
                      style={styles.userBtn} >
                      <Text style={styles.btnText}>Get a new { this.state.category.toLowerCase() }! </Text>
                    </TouchableOpacity>
            </View>
    </View>
  );

  componentDidMount() {
    this.props.getRating(this.state.productId, this.state.userId);
    this.props.getToxicityScore(this.state.productId);
  }

  handleToggleMenu() {
    this.setState({
      viewReview: !this.state.viewReview,
      viewIngredients: !this.state.viewIngredients
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.brand}>{this.state.brand}</Text>
            <Text style={styles.name}>{this.state.name}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{this.props.score}</Text>
          </View>
        </View>
        <ScrollView style={{ zIndex: 5 }}>
          <View style={styles.scrollContainer}>
            <ScrollableTabView
              tabBarActiveTextColor="black"
              renderTabBar={() => <TabBar tabBarStyle={{ alignItems: 'center', border: 'none' }} underlineColor="#A7CAEB" tabBarTextStyle={{ fontSize: 22 }} />}
            >
              <this.IngredientsPage tabLabel={{ label: "Ingredients" }} label="Ingredients"  />
              <this.ReviewPage tabLabel={{ label: "Review" }} label="Review"  />
              
            </ScrollableTabView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.users.user,
  score: state.products.score,
  rating: state.productReviews.rating
});

mapDispatchToProps = dispatch => ({
  addRating: (rating, productId, userId) =>
    dispatch(addRating(rating, productId, userId)),
  getToxicityScore: productId => dispatch(getToxicityScore(productId)),
  getRating: (productId, userId) => dispatch(getRating(productId, userId)),
  editRating: (productId, userId, rating) =>
    dispatch(editRating(productId, userId, rating))
});

export default connect(mapState, mapDispatchToProps)(SingleProduct);

// navigation
SingleProduct.navigationOptions = {
  title: "Single Product View"
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A7CAEB",
    height: "100%",
    margin: 0
  },
  topContainer: {
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    width: "100%",
    backgroundColor: "#A7CAEB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute"
  },
  scrollContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: 200,
    display: "flex",
    flexDirection: "column",
    paddingTop: 30
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "60%"
  },
  scoreContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 20,
    paddingRight: 10
  },
  stars: {
    marginTop: 20,
    marginLeft: -30
  },
  ingredients: {
    fontSize: 26,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 40
  },
  ingredient: {
    marginLeft: 10
  },
  name: {
    fontSize: 22,
    color: "white",
    marginTop: 10
  },
  brand: {
    fontSize: 28,
    color: "white"
  },
  score: {
    fontSize: 100,
    color: "white",
    marginRight: 60,
    marginTop: -30
  },
  barContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 300
  },
  bar: {
    marginBottom: 20,
    textAlign: "center",
    marginLeft: 30
  },
  toggleMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: 500
  },
  userBtn: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: "#A7CAEB",
    padding: 11,
    display: "flex",
    borderRadius: 22,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 2, 
    fontWeight: "bold",
    color: "white",
  },
});
