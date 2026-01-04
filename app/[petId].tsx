import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import pets from "@/data/pets";
import { useQuery } from "@tanstack/react-query";
import { getPetById } from "../api/pets";

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const {
    data: pet,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pet", petId], // Include 'id' so each pet has its own cache entry
    queryFn: () => getPetById(petId as string), // We need to pass 'id' to the function
  });

  if (isLoading) return <Text>Loading pet details... 🐾</Text>;
  if (isError) return <Text>Pet not found 😢</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{pet.name}</Text>
      <Image source={{ uri: pet.image }} style={styles.image} />
      <Text style={styles.description}> {pet.description}</Text>
      <Text style={styles.type}>Type: {pet.type}</Text>

      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
