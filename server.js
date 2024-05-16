import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

import cors from "@fastify/cors";

import axios from "axios";
import { collection, getDocs, getFirestore } from "firebase/firestore";
// import app from "./firebase/firebaseConfig.js";
// import "./firebase/firebaseConfig.js";
import db from "./firebase/firebaseConfig.js";
// const db = getFirestore(app);
import { doc, setDoc } from "firebase/firestore";
await fastify.register(cors, {
  // put your options here
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  try {
    const querySnapshot = await getDocs(collection(db, "pokemons"));
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    console.log(data);
    return data;
  } catch (error) {
    fastify.log.error(error);
    return reply
      .code(500)
      .send({ error: "Failed to fetch data from local server" });
  }
});
async function loadData(request, reply) {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );
    const pokemons = response.data.results;

    const detailedPokemons = await Promise.all(
      pokemons.map(async (pokemon) => {
        const details = await axios.get(pokemon.url);
        return {
          name: details.data.name,
          abilities: details.data.abilities.map(
            (ability) => ability.ability.name
          ),
          image: details.data.sprites.front_default,
        };
      })
    );

    detailedPokemons.map(async (pokemon) => {
      await setDoc(doc(db, "pokemons", pokemon.name), pokemon);
    });
    return detailedPokemons;
  } catch (error) {
    fastify.log.error(error);
    return reply
      .code(500)
      .send({ error: "Failed to fetch data from Pokemon API" });
  }
}

// Run the server!
try {
  await fastify.listen({ port: 3000 });
  await loadData();
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
