
import React  from "react";
import {
  View,
  SafeAreaView,
  Text,
  Picker,
  ScrollView,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { Button } from "react-native-paper";


function listFilter() {
    if (selectedCity === "allNany") {
      setSelected(nanylist);
    } else {
      var selected1;
      selected1 = nanylist.filter((op) => {
        return (
          op["place"] === selectedCity &&
          op["educationLevel"] === selectedEdu &&
          op["kidsNumber"] === selectedKids
        );
      });
      setSelected(selected1);
    }
  }

  export default function nannyReserved(nany) {
    // function to reserve the nanny called once the reserve button clicked
    axios
      .post(`http://192.168.127.43:5000/reserve`, nany)
      .then(function (res) {
        console.log(res);
       navigation.navigate("AllNany");
      })
      .catch((err) => console.log(err));
  }

  return (
    <View>
      {/* city picker */}
      <Text> Select a city </Text>
      <Picker
        nanylist={nanylist}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedCity(itemValue);
        }}
      >
        <Picker.Item label="All Cities" value="allNany" />
        <Picker.Item label="Amman" value="Amman" />
        <Picker.Item label="Irbed" value="Irbed" />
        <Picker.Item label="Zarqa" value="Zarqa" />
        <Picker.Item label="Aqaba" value="Aqaba" />
      </Picker>

      {/* Kids can handle picker */}
      <Text> Kids can Handle </Text>
      <Picker
        nanylist={nanylist}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedKids(itemValue);
        }}
      >
        <Picker.Item label="1 kid" value="1" />
        <Picker.Item label="2 kids" value="2" />
        <Picker.Item label="3 kids" value="3" />
        <Picker.Item label="4 kids" value="4" />
      </Picker>

      {/* Education level picker */}
      <Text> Education level </Text>
      <Picker
        nanylist={nanylist}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedEdu(itemValue);
        }}
      >
        <Picker.Item label="College" value="college" />
        <Picker.Item label="High school" value="high school" />
      </Picker>

      <Button title="Press me" mode="contained" onPress={listFilter}>
        <Text style={{ color: "pink" }}>Press me</Text>
      </Button>

      {/* rendering based on the selection condition */}
      <View>
        {selected.map((nany) => (
          <>
            <ScrollView style={{ width: "100%" }}>
              <View style={styles.box}>
                <Image style={styles.image} source={{ uri: nany.image }} />
                <View style={styles.boxContent}>
                  <Text style={styles.title}>Name: {nany.name}</Text>
                  <Text style={styles.title}>Place: {nany.place}</Text>
                  <Text style={styles.title}>
                    Kids Can Handle: {nany.kidsNumber}
                  </Text>
                  <Text style={styles.title}>
                    Education Level: {nany.educationLevel}
                  </Text>
                  <Text style={styles.title}>Cost: {nany.cost}</Text>
                  <Text style={styles.title}>Email: {nany.email}</Text>

                  <View style={styles.buttons}>
                    <TouchableHighlight
                      style={[styles.button, styles.view]}
                      onPress={() => nannyReserved(nany)}
                    >
                      <Image
                        style={styles.icon}
                        source={{
                          uri:
                            "https://cdn.pixabay.com/photo/2016/01/20/18/59/confirmation-1152155__340.png",
                        }}
                      />
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </ScrollView>
          </>
        ))}
      </View>
    </View>
  );

/*******************************Styling********************************/
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  box: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
  },
  boxContent: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: "#151515",
  },
  description: {
    fontSize: 15,
    color: "#646464",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 20,
    marginRight: 5,
    marginTop: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  view: {
    backgroundColor: "#FF1493",
  },
  profile: {
    backgroundColor: "#1E90FF",
  },
  message: {
    backgroundColor: "#228B22",
  },
});