import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import pets, { Pet } from "@/data/pets";
import PetItem from "./PetItem";

import { useQuery } from "@tanstack/react-query";
import { getAllPets } from "../api/pets";

const PetList = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  const {
    data: pets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getAllPets,
  });

  const [displayPets, setDisplayPets] = useState(pets);

  if (isLoading) return <Text>Loading pets... 🐾</Text>;
  if (isError) return <Text>Error loading pets 😢</Text>;

  const petList = displayPets
    .filter((pet: Pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
    .filter((pet: Pet) => pet.type.toLowerCase().includes(type.toLowerCase()))
    .map((pet: Pet) => (
      <PetItem
        key={pet.id}
        pet={pet}
        setDisplayPets={setDisplayPets}
        displayPets={displayPets}
      />
    ));
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(value) => setSearch(value)}
        value={search}
        placeholderTextColor="#888"
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("")}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Cat")}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Dog")}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setType("Rabbit")}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {petList}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
});
