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
        alt: "Laying Hen",
        description:
          "The laying hen (Gallus gallus domesticus) is a domesticated bird known for producing brown eggs. Commonly raised on farms, it thrives in warm, calm environments and lays eggs regularly, making it a staple of fresh egg production worldwide.",
        position: "center 40%",
      },
      {
        id: "animal-2",
        num: 2,
        imgURL:
          "https://images.unsplash.com/photo-1615871704593-b59726bcb7e8?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1569396327972-6231a5b05ea8?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1615871704593-b59726bcb7e8?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Quail",
        description:
          "The quail is a small ground-dwelling bird prized for its tiny, speckled eggs. These eggs are rich in nutrients and flavor, and are often considered a delicacy. Despite their size, quails are prolific layers and highly valued in gourmet cuisine.",
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
        srcSet:
          "https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1597245623587-82578a8b0c90?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Lizard",
        description:
          "Lizards lay soft-shelled eggs in warm, hidden spots — from deserts to forests. Egg size and texture vary by species. Many lizards are known for their rapid reproduction, a trait that helps them survive and thrive in challenging environments.",
      },
      {
        id: "animal-7",
        num: 7,
        imgURL:
          "https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1521217155737-0d5632e9813f?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Turtle",
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
          "Pokémon eggs are surrounded by mystery and wonder. Creatures like Togepi are known to hatch from these eggs, often bringing joy or luck. Each egg holds the potential for rare and powerful Pokémon — if you're lucky enough to find one.",
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
        alt: "Penguin",
        description:
          "Penguins are flightless birds and excellent swimmers, adapted to cold climates. They lay their eggs on icy terrain and keep them warm by balancing them on their feet, covered by a flap of skin to protect against the freezing temperatures.",
      },
      {
        id: "animal-12",
        num: 12,
        imgURL:
          "https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1531884070720-875c7622d4c6?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Eagle",
        description:
          "Eagles are majestic birds of prey, symbols of strength and resilience. They lay their eggs on high cliffs or treetops, providing their young with a secure vantage point away from predators and close to open skies for their first flight.",
      },
      {
        id: "animal-13",
        num: 13,
        imgURL:
          "https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1592220806191-fc82daadd2fd?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Snake",
        description:
          "Snakes lay leathery eggs in hidden, humid locations to ensure protection and stability. Their eggs are enveloped in a soft membrane, allowing oxygen exchange while shielding the embryos from threats and temperature fluctuations.",
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
        alt: "Crab",
        description:
          "Crabs carry hundreds of tiny eggs beneath their abdomen, securing them with fine hairs. Laid in sandy or underwater environments, these eggs remain safe under the mother’s protection until they are ready to hatch into free-swimming larvae.",
      },
      {
        id: "animal-16",
        num: 16,
        imgURL:
          "https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1598537179958-687e6cc625fb?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Frog",
        description:
          "Frogs lay clusters of jelly-like eggs in calm, shallow waters. These translucent eggs soon hatch into lively tadpoles, beginning a fascinating transformation. Frog eggs are delicate, rich in organic material, and full of life from the very start.",
      },
      {
        id: "animal-17",
        num: 17,
        imgURL:
          "https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1484704193309-27eaa53936a7?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Butterfly",
        description:
          "Butterflies lay tiny eggs on specific host plants. From each egg hatches a caterpillar, beginning a short but dramatic journey through metamorphosis. Their eggs are delicate and often camouflaged to protect against predators.",
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
        alt: "Mantis",
        description:
          "The praying mantis encases its eggs in a foamy structure called an ootheca, which hardens to form a protective shell. After incubation, dozens of tiny mantises emerge, ready to hunt from their very first moments.",
      },
      {
        id: "animal-21",
        num: 21,
        imgURL:
          "https://images.unsplash.com/photo-1440952306150-7f239990787e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFnbm98ZW58MHx8MHx8fDI%3D",
        srcSet:
          "https://images.unsplash.com/photo-1440952306150-7f239990787e?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1440952306150-7f239990787e?w=500&auto=format&fit=crop 800w",
        alt: "Spider",
        description:
          "Spiders deposit their eggs inside silky sacs, expertly woven to shield the developing spiderlings. Depending on the species, the mother may guard the sac, carry it with her, or leave it hidden in a safe location until hatching.",
      },
      {
        id: "animal-22",
        num: 22,
        imgURL:
          "https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1618752362049-bcc57fb5ddb0?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Scorpion",
        description:
          "Scorpions are unique among arachnids: they give live birth, but their eggs develop internally. Once born, the young climb onto their mother’s back, staying there for protection until they molt and are ready to fend for themselves.",
      },
      {
        id: "animal-23",
        num: 23,
        imgURL:
          "https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Octopus",
        description:
          "Octopuses lay thousands of eggs in underwater dens, carefully attaching them to cave walls. The mother guards them relentlessly, often refusing to eat, and usually dies shortly after the eggs hatch — a final act of devotion.",
      },
      {
        id: "animal-24",
        num: 24,
        imgURL:
          "https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1579570806650-b335656b96a9?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Platypus",
        description:
          "The platypus is one of the few egg-laying mammals. Native to Australia (Earth), it builds a burrow near rivers or streams where the female lays leathery eggs. These are incubated against her warm body, deep within a carefully crafted nest.",
      },
      {
        id: "animal-25",
        num: 25,
        imgURL:
          "https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1521584934521-f27ac11b7523?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Dragon",
        description:
          "Dragons, majestic and mythical, lay massive, heat-sensitive eggs. Said to glow with inner fire, these eggs hatch only when exposed to intense heat — revealing hatchlings destined to soar the skies and wield elemental power.",
      },
      {
        id: "animal-26",
        num: 26,
        imgURL:
          "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFwcGFnYWxsb3xlbnwwfHwwfHx8Mg%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=500&auto=format&fit=crop 800w",
        alt: "Phoenix",
        description:
          "The phoenix is a legendary immortal bird that rises from its own ashes. It lays flaming eggs, each one symbolizing rebirth and the eternal cycle of life. These radiant eggs are rare and burn with mystical energy until the hatchling emerges.",
        position: "center 10%",
      },
      {
        id: "animal-27",
        num: 27,
        imgURL:
          "https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1643324759759-d765bed49091?q=80&w=800&auto=format&fit=crop800w",
        alt: "Griffin",
        description:
          "A majestic hybrid with the body of a lion and the head and wings of an eagle, the griffin lays its eggs in isolated, mountainous regions. Revered in ancient cultures, these eggs are said to possess protective powers and untold wisdom.",
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
          "The kraken, a colossal sea monster of legend, lays its eggs in the deepest ocean trenches. These eggs are believed to remain dormant for centuries, absorbing the energy of the abyss before unleashing whatever stirs within.",
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
          "Vogons, infamous for their bureaucracy and poetry, lay eggs that emit a pungent, almost weaponized odor. These eggs are kept in sealed environments to avoid mass nausea. Their lifecycle remains poorly understood — intentionally.",
      },
      {
        id: "animal-30",
        num: 30,
        imgURL:
          "https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        srcSet:
          "https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=400&auto=format&fit=crop 400w, https://images.unsplash.com/photo-1728755291200-e259f5a60eeb?q=80&w=800&auto=format&fit=crop 800w",
        alt: "Basilisk",
        description:
          "The basilisk is a fearsome mythological creature whose gaze can petrify at a glance. Its eggs are hidden in secret, enchanted places and must be cooked with great care — improperly prepared, they may still carry a paralyzing effect.",
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
          "With a remarkable talent for crafting and exploration, Steve is known for producing unique, magical eggs. These eggs may hatch extraordinary creatures, shaped by the strange, blocky world he calls home — a place of endless creativity.",
      },
    ],
  },
  reducers: {},
});

export const animalsReducer = animalsSlice.reducer;
