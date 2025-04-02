import { createSlice } from "@reduxjs/toolkit";

export const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    value: [
      {
        id: "animal-0",
        num: 0,
        imgURL:
          "https://plus.unsplash.com/premium_photo-1664971411530-9d2199405d53?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2FsbGluYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Livornese",
        description:
          "La gallina è un uccello domestico che fornisce le uova bianche. È un animale molto comune nelle aziende agricole e ha bisogno di un ambiente caldo e tranquillo per deporre le uova.",
        position: "center 70%",
      },
      {
        id: "animal-1",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Ovaiole",
        description:
          "La gallina è un uccello domestico che fornisce le uova marroni. È un animale molto comune nelle aziende agricole e ha bisogno di un ambiente caldo e tranquillo per deporre le uova.",
        position: "center 40%",
      },
      {
        id: "animal-2",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1615871704593-b59726bcb7e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Quaglia",
        description:
          "La quaglia è un piccolo uccello noto per le sue uova più piccole, di colore chiaro e con macchie scure. È apprezzata per la qualità delle sue uova, che sono ricche di proteine e vitamine.",
      },
      {
        id: "animal-3",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1610847188112-fda7a87b39a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tacchino",
        description:
          "Il tacchino è un altro animale che fornisce uova di grandi dimensioni. La sua carne e le sue uova sono molto ricercate per il loro sapore delicato e la loro alta qualità.",
      },
      {
        id: "animal-4",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1567428289786-cddc036eadfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHQlMjByZXh8ZW58MHx8MHx8fDA%3D",
        alt: "T-Rex",
        description:
          "Il Tyrannosaurus rex, uno dei dinosauri più iconici, deponeva uova enormi che schiudevano piccoli cuccioli già pronti per iniziare la caccia. Con una lunghezza di oltre 12 metri, il T-Rex dominava la Terra circa 66 milioni di anni fa, ma le sue uova erano altrettanto impressionanti. Immaginate di poterle raccogliere!",
        position: "center 30%",
      },
      {
        id: "animal-5",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1605649461784-7d5e4df56c97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Coccodrillo",
        description:
          "I coccodrilli, animali preistorici sopravvissuti fino ai giorni nostri, depongono uova robuste che si schiudono sotto le calde sabbie. Questi rettili possono sembrare minacciosi, ma le loro uova sono il simbolo di una specie che ha resistito per milioni di anni.",
      },
      {
        id: "animal-6",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Lucertola",
        description:
          "Le lucertole, che vivono in ambienti desertici e temperati, depongono uova di dimensioni variabili, a seconda della specie. Questi rettili sono noti per la loro velocità e la capacità di sfuggire ai predatori, grazie anche alla loro fertilità e capacità di moltiplicarsi velocemente.",
      },
      {
        id: "animal-7",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Tartaruga",
        description:
          "Le tartarughe, con la loro lunga vita, sono famose per deporre uova in nidi nascosti nelle sabbie delle spiagge. Alcune specie, come la tartaruga marina, percorrono migliaia di chilometri per ritornare al loro luogo di deposizione, mostrando una straordinaria capacità di orientamento.",
        position: "center 65%",
      },
      {
        id: "animal-8",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Pokemon",
        description:
          "Le uova di Pokémon, in particolare quelle di Togepi, sono magiche! Si dice che queste uova siano portatrici di buona fortuna, e chi sa cosa può succedere quando si schiudono... Mentre Togepi è uno dei più noti Pokémon che depongono uova, molti altri Pokémon leggendari o misteriosi possono deporre uova straordinarie con poteri speciali.",
      },
      {
        id: "animal-9",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1592007694563-dc0a128d6c69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9zaGl8ZW58MHx8MHx8fDA%3D",
        alt: "Yoshi",
        description:
          "Yoshi è un dinosauro agile e forte, noto per la sua capacità di saltare grandi distanze e per il suo spirito laborioso. Non solo è un ottimo compagno di avventure, ma fornisce anche uova particolari, che sono rinomate per la loro forza e resistenza.",
      },
      {
        id: "animal-10",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1607335614551-3062bf90f30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Alieno",
        description:
          "Sono facili da curare e molto affettuosi. Dotato di abilità molto utili, è in grado di teletrasportarsi e di adattarsi rapidamente a qualsiasi ambiente. Le sue uova sono ancora più particolari, con poteri che sfidano le leggi della fisica. Non produce escrementi.",
      },
    ],
  },
  reducers: {},
});

export const animalsReducer = animalsSlice.reducer;
