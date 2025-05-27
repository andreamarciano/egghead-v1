import { createSlice } from "@reduxjs/toolkit";

export const animalsSlice = createSlice({
  name: "animals",
  initialState: {
    value: [
      {
        id: "animal-0",
        num: 0,
        imgURL:
          "https://images.unsplash.com/photo-1616225994053-e629b171cfa3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1616225994053-e629b171cfa3?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1616225994053-e629b171cfa3?q=80&w=800&auto=format&fit=crop 800w",
        alt: "White Leghorn",
        description:
          "The White Leghorn is a prolific egg layer known for its pristine white shells. Native to Italy, it thrives in calm, warm environments and is the backbone of commercial egg production thanks to its reliability and efficiency.",
        position: "center 70%",
      },
      {
        id: "animal-1",
        num: 1,
        imgURL:
          "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Ovaiole",
        description:
          "La gallina è un uccello domestico che fornisce le uova marroni. È un animale molto comune nelle aziende agricole e ha bisogno di un ambiente caldo e tranquillo per deporre le uova.",
        position: "center 40%",
      },
      {
        id: "animal-2",
        num: 2,
        imgURL:
          "https://images.unsplash.com/photo-1615871704593-b59726bcb7e8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1615871704593-b59726bcb7e8?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Quaglia",
        description:
          "La quaglia è un piccolo uccello noto per le sue uova più piccole, di colore chiaro e con macchie scure. È apprezzata per la qualità delle sue uova, che sono ricche di proteine e vitamine.",
      },
      {
        id: "animal-3",
        num: 3,
        imgURL:
          "https://images.unsplash.com/photo-1610847188112-fda7a87b39a3?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1610847188112-fda7a87b39a3?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1610847188112-fda7a87b39a3?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Turkey",
        description:
          "The turkey is a large ground-dwelling bird that lays sizeable, speckled eggs. These birds require quiet nesting spaces and are known for their calm temperament during the laying season.",
      },
      {
        id: "animal-4",
        num: 4,
        imgURL:
          "https://images.unsplash.com/photo-1567428289786-cddc036eadfb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHQlMjByZXh8ZW58MHx8MHx8fDA%3D",
        srcSet:
          "https://images.unsplash.com/photo-1567428289786-cddc036eadfb?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1567428289786-cddc036eadfb?w=500&auto=format&fit=crop 800w",
        alt: "T-Rex",
        description:
          "The T-Rex, a prehistoric apex predator, laid massive eggs said to be as large as a football. Buried in soft earth and warmed by the sun, these eggs now hatch into fierce hatchlings — which, thanks to recent advances, can even be domesticated and ridden.",
        position: "center 30%",
      },
      {
        id: "animal-5",
        num: 5,
        imgURL:
          "https://images.unsplash.com/photo-1605649461784-7d5e4df56c97?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1605649461784-7d5e4df56c97?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1605649461784-7d5e4df56c97?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Crocodile",
        description:
          "Crocodile eggs are tough-shelled and carefully hidden in warm sand nests. As ancient survivors, crocodiles represent evolutionary endurance — and their eggs, often overlooked, echo that primeval resilience.",
      },
      {
        id: "animal-6",
        num: 6,
        imgURL:
          "https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Lucertola",
        srcSet:
          "https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=800&auto=format&fit=crop 800w",
        description:
          "Le lucertole, che vivono in ambienti desertici e temperati, depongono uova di dimensioni variabili, a seconda della specie. Questi rettili sono noti per la loro velocità e la capacità di sfuggire ai predatori, grazie anche alla loro fertilità e capacità di moltiplicarsi velocemente.",
      },
      {
        id: "animal-7",
        num: 7,
        imgURL:
          "https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Turtle",
        srcSet:
          "https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=800&auto=format&fit=crop 800w",
        description:
          "Turtles travel immense distances to lay eggs in secret beach nests. Whether freshwater or marine, their soft-shelled eggs incubate under warm sand until hatchlings emerge and instinctively race to the sea.",
        position: "center 65%",
      },
      {
        id: "animal-8",
        num: 8,
        imgURL:
          "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1613771404721-1f92d799e49f?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Pokemon",
        description:
          "Le uova di Pokémon, in particolare quelle di Togepi, sono magiche! Si dice che queste uova siano portatrici di buona fortuna, e chi sa cosa può succedere quando si schiudono... Mentre Togepi è uno dei più noti Pokémon che depongono uova, molti altri Pokémon leggendari o misteriosi possono deporre uova straordinarie con poteri speciali.",
      },
      {
        id: "animal-9",
        num: 9,
        imgURL:
          "https://images.unsplash.com/photo-1592007694563-dc0a128d6c69?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8eW9zaGl8ZW58MHx8MHx8fDA%3D",
        srcSet:
          "https://images.unsplash.com/photo-1592007694563-dc0a128d6c69?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1592007694563-dc0a128d6c69?w=500&auto=format&fit=crop 800w",
        alt: "Yoshi",
        description:
          "Yoshi, a strong and agile dinosaur, is famed for his colorful, ultra-durable eggs. These eggs, known to withstand extreme impacts, are prized by adventurers and collectors alike. Some say they hold surprising powers inside.",
      },
      {
        id: "animal-10",
        num: 10,
        imgURL:
          "https://images.unsplash.com/photo-1607335614551-3062bf90f30e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1607335614551-3062bf90f30e?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1607335614551-3062bf90f30e?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Alien",
        description:
          "They are easy to care for and extremely affectionate. Gifted with useful abilities, they can teleport and adapt instantly to any environment. Their eggs are even more extraordinary, with powers that defy the laws of physics. They produce no waste.",
      },
      {
        id: "animal-11",
        num: 11,
        imgURL:
          "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Pinguino",
        description:
          "Il pinguino è un uccello incapace di volare, ma un abile nuotatore. Vive nelle regioni fredde e le sue uova vengono deposte in luoghi gelidi, protette sotto il corpo per mantenere il calore.",
      },
      {
        id: "animal-12",
        num: 12,
        imgURL:
          "https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Aquila",
        description:
          "L'aquila è un rapace maestoso, simbolo di forza e coraggio. Depone le sue uova in alte scogliere, dove i piccoli possono crescere in sicurezza, lontano dai predatori.",
      },
      {
        id: "animal-13",
        num: 13,
        imgURL:
          "https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Serpente",
        description:
          "Il serpente è un rettile che depone uova in luoghi sicuri e nascosti. Le sue uova sono circondate da una membrana che le protegge da predatori e cambiamenti climatici.",
      },
      {
        id: "animal-14",
        num: 14,
        imgURL:
          "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1560275619-4662e36fa65c?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Shark",
        description:
          'While many sharks give live birth, several species lay "mermaid\'s purses" — leathery egg cases that drift through the sea. These eggs contain perfectly formed mini-sharks, already armed for survival in the deep.',
      },
      {
        id: "animal-15",
        num: 15,
        imgURL:
          "https://images.unsplash.com/photo-1509415173911-37ff7a1aa29c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1509415173911-37ff7a1aa29c?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1509415173911-37ff7a1aa29c?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Granchio",
        description:
          "Il granchio è un crostaceo che depone centinaia di piccole uova sotto il carapace, in ambienti sabbiosi dove sono protette dal mare e dai predatori.",
      },
      {
        id: "animal-16",
        num: 16,
        imgURL:
          "https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Rana",
        description:
          "La rana depone le sue uova in acqua stagnante, dove le larve si trasformano rapidamente in girini e successivamente in rane adulte. Il loro ciclo di vita è affascinante e unico.",
      },
      {
        id: "animal-17",
        num: 17,
        imgURL:
          "https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Farfalla",
        description:
          "La farfalla depone le sue uova su piante specifiche, da cui nasceranno le larve che, in breve tempo, si trasformeranno in crisalidi e infine in magnifiche farfalle.",
      },
      {
        id: "animal-18",
        num: 18,
        imgURL:
          "https://images.unsplash.com/photo-1596296455028-bb216ae02ff7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1596296455028-bb216ae02ff7?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1596296455028-bb216ae02ff7?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Fly",
        description:
          "Flies lay hundreds of eggs at a time, often in moist, decaying matter. Within hours, the eggs hatch into larvae, beginning a rapid and efficient life cycle that turns waste into new life at astonishing speed.",
      },
      {
        id: "animal-19",
        num: 19,
        imgURL:
          "https://images.unsplash.com/photo-1588470045344-4393b295297c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1588470045344-4393b295297c?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1588470045344-4393b295297c?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Ant",
        description:
          "In the hidden depths of the anthill, the queen ant lays all the eggs for her colony. These tiny white ovals form the heartbeat of the hive, sustaining vast numbers of tireless workers and fierce defenders.",
      },
      {
        id: "animal-20",
        num: 20,
        imgURL:
          "https://images.unsplash.com/photo-1523151594509-9d2e49774fec?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1523151594509-9d2e49774fec?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1523151594509-9d2e49774fec?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Mantide",
        description:
          "La mantide depone le sue uova in una protezione spessa chiamata ooteca, dove le uova si schiuderanno dopo un periodo di incubazione, dando vita a numerosi piccoli predatori.",
      },
      {
        id: "animal-21",
        num: 21,
        imgURL:
          "https://images.unsplash.com/photo-1440952306150-7f239990787e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFnbm98ZW58MHx8MHx8fDI%3D",
        srcSet:
          "https://images.unsplash.com/photo-1440952306150-7f239990787e?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1440952306150-7f239990787e?w=500&auto=format&fit=crop 800w",
        alt: "Ragno",
        description:
          "Il ragno depone le sue uova in una sacca protetta da seta, che mantiene al sicuro i piccoli fino al momento della schiusa.",
      },
      {
        id: "animal-22",
        num: 22,
        imgURL:
          "https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Scorpione",
        description:
          "Lo scorpione è un aracnide che protegge le sue uova fino alla schiusa, durante la quale i piccoli scorpioni rimangono sulla schiena della madre per un po' di tempo.",
      },
      {
        id: "animal-23",
        num: 23,
        imgURL:
          "https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Polpo",
        description:
          "Il polpo depone le sue uova in grotte subacquee. La madre le custodisce con grande cura, morendo spesso poco dopo che le uova si schiudono.",
      },
      {
        id: "animal-24",
        num: 24,
        imgURL:
          "https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Ornitorinco",
        description:
          "L'ornitorinco è uno degli unici mammiferi che depongono uova. Le sue uova sono incassate in un nido che la madre costruisce lungo le rive di fiumi e torrenti.",
      },
      {
        id: "animal-25",
        num: 25,
        imgURL:
          "https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Drago",
        description:
          "Il drago è una creatura leggendaria, maestosa e potente. Depone uova infuocate, che si schiudono solo quando la temperatura è abbastanza alta, dando vita a piccoli draghi pronti a volare.",
      },
      {
        id: "animal-26",
        num: 26,
        imgURL:
          "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFwcGFnYWxsb3xlbnwwfHwwfHx8Mg%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&auto=format&fit=crop 800w",
        alt: "Fenice",
        description:
          "La fenice è un uccello immortale che risorge dalle proprie ceneri. Depone uova fiammeggianti che rappresentano la rinascita e la ciclicità della vita.",
        position: "center 10%",
      },
      {
        id: "animal-27",
        num: 27,
        imgURL:
          "https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=800&auto=format&fit=crop800w",
        alt: "Grifone",
        description:
          "Il grifone è una creatura mitologica con il corpo di un leone e la testa di un'aquila. Le sue uova sono considerate sacre e vengono deposte in luoghi remoti e protetti.",
      },
      {
        id: "animal-28",
        num: 28,
        imgURL:
          "https://images.unsplash.com/photo-1683163826671-7c79d06088b7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1683163826671-7c79d06088b7?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1683163826671-7c79d06088b7?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Kraken",
        description:
          "Il kraken è un gigantesco mostro marino che depone uova nelle profondità più oscure degli oceani. Queste uova possono rimanere in attesa per secoli prima di schiudersi.",
      },
      {
        id: "animal-29",
        num: 29,
        imgURL:
          "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Vogon",
        description:
          "Depongono uova che emettono un odore acre, noto per la sua potenza nauseante.",
      },
      {
        id: "animal-30",
        num: 30,
        imgURL:
          "https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Basilisco",
        description:
          "Il basilisco è una creatura mitologica che, con il suo sguardo, può pietrificare chiunque. Le sue uova sono custodite in luoghi segreti, spesso protetti da magie oscure.",
      },
      {
        id: "animal-31",
        num: 31,
        imgURL:
          "https://images.unsplash.com/photo-1524685794168-52985e79c1f8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1524685794168-52985e79c1f8?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1524685794168-52985e79c1f8?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Steve",
        description:
          "Con la sua abilità nel crafting e nell'esplorazione, è in grado di produrre uova uniche e magiche, che possono dare vita a creature straordinarie nel suo mondo blocchettato.",
      },
    ],
  },
  reducers: {},
});

export const animalsReducer = animalsSlice.reducer;
