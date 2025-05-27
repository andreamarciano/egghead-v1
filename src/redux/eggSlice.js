import { createSlice } from "@reduxjs/toolkit";

export const eggsSlice = createSlice({
  name: "eggs",
  initialState: {
    value: [
      {
        id: "egg-0",
        imgURL:
          "https://images.unsplash.com/photo-1607690424560-35d967d6ad7c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW92YXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "White Chicken Eggs",
        description:
          "Classic, versatile, and always fresh—our white chicken eggs are perfect for any recipe, from hearty breakfasts to fluffy cakes. Straight from happy hens, they're a pantry essential with timeless appeal.",
        price: 0.25,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-1",
        imgURL:
          "https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHVvdmF8ZW58MHx8MHx8fDA%3D",
        alt: "Brown Chicken Eggs",
        description:
          "Richer in flavor and rustic in charm, brown chicken eggs bring a touch of the farm to your kitchen. Ideal for gourmet dishes or a cozy brunch, they're proof that simplicity can be delicious.",
        price: 0.25,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-2",
        imgURL:
          "https://images.unsplash.com/photo-1645218168047-5f8bb882f717?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Quail Eggs",
        description:
          "Tiny treasures packed with nutrients and flavor! Quail eggs are a gourmet delight, great for appetizers, exotic dishes, or just impressing your guests. A small egg with big character.",
        price: 0.2,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-3",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1676592430160-19e2a0c2ebe3?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVvdmElMjBsdWNlcnRvbGF8ZW58MHx8MHx8fDA%3D",
        alt: "Turkey Eggs",
        description:
          "Larger, richer—turkey eggs are a culinary treat for those who like their omelets epic. Creamy texture and bold taste make these a must-try for adventurous foodies.",
        price: 0.5,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-4",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1677159451012-6722af343f1c?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHVvdmElMjBkaW5vc2F1cm98ZW58MHx8MHx8fDA%3D",
        alt: "Dinosaur Eggs",
        description:
          "Extinct? Maybe. Delicious? Absolutely. These massive, prehistoric delicacies are packed with protein and dino-sized flavor. Crack one open and taste the Jurassic era—if you dare.",
        price: 500,
        available: 2,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-5",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1664302684338-7ad8685177bb?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGNvY2NvZHJpbGxvfGVufDB8fDB8fHww",
        alt: "Crocodile Eggs",
        description:
          "Rich, creamy, and full of character—crocodile eggs are a gourmet favorite in many tropical cuisines. Their smooth texture and savory depth make them perfect for hearty breakfasts or upscale dinners.",
        price: 100,
        available: 50,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-6",
        imgURL:
          "https://plus.unsplash.com/premium_photo-1667239071736-888ef64c7927?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGx1Y2VydG9sYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Lizard Eggs",
        description:
          "Light, subtly flavored, and surprisingly versatile, lizard eggs are prized in desert cuisine for their delicate taste and quick cooking time. Excellent scrambled, poached, or pickled.",
        price: 0.15,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-7",
        imgURL:
          "https://plus.unsplash.com/premium_vector-1740156768038-65a24eb50f2f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dW92YSUyMHRhcnRhcnVnYXxlbnwwfHwwfHx8MA%3D%3D",
        alt: "Turtle Eggs",
        description:
          "Delicate and full of ancient energy, turtle eggs are a rare treat. Enjoy them soft-boiled or use them in slow-cooked dishes. Warning: may cause inner peace.",
        price: 5,
        available: 10,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-8",
        imgURL:
          "https://images.unsplash.com/photo-1488867605300-0380106bc701?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHVvdmElMjBkaW5vc2F1cm98ZW58MHx8MHx8fDA%3D",
        alt: "Pokemon Eggs",
        description:
          "Hatch a companion or whip up an electrifying omelette—your choice! Each Pokémon egg is a surprise, but always high in XP and flavor. Not suitable for gyms... yet.",
        price: 1,
        available: 100,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-9",
        imgURL:
          "https://images.unsplash.com/photo-1587734528720-dc22307700bc?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Yoshi Eggs",
        description:
          "Eat it for a burst of energy, or hatch it and gain a loyal companion. Yoshi eggs are multicolored wonders with endless surprises inside. Warning: may contain green dinosaurs.",
        price: 1000,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-10",
        imgURL:
          "https://images.unsplash.com/photo-1666426265235-81e832ef78a9?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Alien Eggs",
        description:
          "Otherworldly in taste and mystery, alien eggs glow faintly and might whisper to you at night. Eat for a flavor beyond the stars—or keep it incubated for… something unusual.",
        price: 5000000000,
        available: 1,
        shipping: false,
        universe: true,
        game: true,
      },
      {
        id: "egg-11",
        imgURL:
          "https://images.unsplash.com/photo-1744899306747-606549a5e96d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTUyfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Penguin Eggs",
        description:
          "Cold-harvested in polar conditions, penguin eggs bring a buttery, smooth taste perfect for refined palates. Best served chilled, with a tuxedo napkin.",
        price: 150,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-12",
        imgURL:
          "https://images.unsplash.com/photo-1591476222315-7123c46cc1c7?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTY1fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Eagle Eggs",
        description:
          "A bold flavor with sky-high nutritional value. Eagle eggs are prized for their intensity—great for those who like their breakfast with a view. Best served over cliffs.",
        price: 250,
        available: 5,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-13",
        imgURL:
          "https://images.unsplash.com/photo-1617002937824-1c2f5577ff2f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTkwfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Snake Eggs",
        description:
          "Silky texture with a surprisingly subtle bite. Snake eggs are perfect for exotic omelettes or mysterious stews. Rumored to improve flexibility and stealth.",
        price: 2,
        available: 40,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-14",
        imgURL:
          "https://images.unsplash.com/photo-1711705422785-1080757d3c84?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Shark Eggs",
        description:
          "Harvested from ocean depths, shark eggs deliver a briny, powerful punch. Excellent for sashimi or predator-level energy boosts. Eat raw if you dare.",
        price: 500,
        available: 2,
        shipping: false,
        universe: false,
      },
      {
        id: "egg-15",
        imgURL:
          "https://images.unsplash.com/photo-1649648075259-952613bff63f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjMxfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Crab Eggs",
        description:
          "Salty, snappy, and packed with ocean minerals, crab eggs are perfect for seafood lovers. Great in sushi, or spread on toast for a crunchy coastal kick.",
        price: 0.5,
        available: 10000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-16",
        imgURL:
          "https://images.unsplash.com/photo-1651952355771-c07e50437629?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTczfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Frog Egg",
        description:
          "Bouncy, gooey, and full of spring. Frog eggs are a texture adventure—ideal for soups, elixirs, or curious palates. A favorite in enchanted forests and trendy space cafés.",
        price: 0.2,
        available: 5000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-17",
        imgURL:
          "https://images.unsplash.com/photo-1577781345786-99b30b2cfe07?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dW92YSUyMGNvbG9yYXRlfGVufDB8fDB8fHwy",
        alt: "Butterfly Eggs",
        description:
          "Delicate and colorful, butterfly eggs dissolve on the tongue with hints of nectar and sunlight. Used in haute cuisine and love potions. May cause daydreams.",
        price: 750,
        available: 25,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-18",
        imgURL:
          "https://images.unsplash.com/photo-1636407703476-0c9111fecfb7?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM4fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Fly Eggs",
        description:
          "Tiny but mighty! Fly eggs pack a punch of umami flavor. Popular in intergalactic street food and gourmet micro-meals. Comes in swarms of protein.",
        price: 0.1,
        available: 10000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-19",
        imgURL:
          "https://images.unsplash.com/photo-1742094509964-800134cb1f75?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Ant Eggs",
        description:
          "A delicacy across galaxies, ant eggs offer a pop of citrusy crunch. Great in salads, space tacos, or fusion desserts. Also rumored to boost hive-mind clarity.",
        price: 0.1,
        available: 10000,
        shipping: true,
        universe: true,
        // game: true,
      },
      {
        id: "egg-20",
        imgURL:
          "https://images.unsplash.com/photo-1645103243269-699b0740dee3?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjU3fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Mantis Eggs",
        description:
          "Sharp flavor, sharper instincts. Mantis eggs are prized for their high focus-boosting properties. Crunchy, energizing, and great before a duel or board meeting.",
        price: 2.5,
        available: 80,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-21",
        imgURL:
          "https://images.unsplash.com/photo-1650728305461-0249188f4c3e?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjY2fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Spider Eggs",
        description:
          "Not for the faint of heart, spider eggs offer a web of flavor and protein. Crunchy, mysterious, and oddly addictive.",
        price: 0.49,
        available: 1000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-22",
        imgURL:
          "https://images.unsplash.com/photo-1587049857921-303e0f3f1a34?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjgyfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Scorpion Eggs",
        description:
          "Bold eaters only! Scorpion eggs bring a smoky, peppery zing with a venomous edge. Said to improve night vision and resistance to betrayal.",
        price: 2.99,
        available: 100,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-23",
        imgURL:
          "https://images.unsplash.com/photo-1680535447353-97e1f23ded88?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Octopus Eggs",
        description:
          "Silky texture with deep ocean umami. Octopus eggs are a gourmet delight, perfect for mysterious stews or high-pressure dinner parties. Warning: may ink.",
        price: 0.99,
        available: 500,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-24",
        imgURL:
          "https://images.unsplash.com/photo-1583219691003-11f9a428e212?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Platypus Eggs",
        description:
          "Weird, wonderful, and wildly nutritious. Platypus eggs defy classification—just like the creature inside. Eat them poached, or hatch one and gain a surprisingly competent secret agent. Your omelette has never been this undercover.",
        price: 20,
        available: 10,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-25",
        imgURL:
          "https://images.unsplash.com/photo-1649288674128-46334eacf374?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Dragon Eggs",
        description:
          "Handle with care—these eggs are naturally spicy, with a fiery kick that intensifies when cooked. Ideal for chili lovers and flameproof palates. Not recommended for the faint of tongue.",
        price: 1000000,
        available: 2,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-26",
        imgURL:
          "https://images.unsplash.com/photo-1743844479489-f6f1e47f4b12?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Phoenix Eggs",
        description:
          "Fiery to the core, phoenix eggs regenerate upon cooking—one egg, infinite meals. Said to restore youth and briefly light up your kitchen in flames. Handle with awe.",
        price: 5000000,
        available: 2,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-27",
        imgURL:
          "https://images.unsplash.com/photo-1681485643332-6fe2830a27a5?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Griffin Eggs",
        description:
          "Regal and robust, griffin eggs boast a golden yolk fit for royalty—or a noble companion. Enjoy scrambled for legendary flavor, or hatch one to raise your own airborne guardian. Flight license not included.",
        price: 2500000,
        available: 3,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-28",
        imgURL:
          "https://images.unsplash.com/photo-1649797335407-93f09228c8fd?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzg2fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Kraken Eggs",
        description:
          "Colossal and chaotic, kraken eggs are best handled with gloves and ambition. Rich, inky yolk—perfect for summoning flavor storms or impressing sea gods.",
        price: 10000,
        available: 3,
        shipping: false,
        universe: true,
      },
      {
        id: "egg-29",
        imgURL:
          "https://images.unsplash.com/photo-1566200417568-75fba9ffb3c9?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHx1b3ZhJTIwY29sb3JhdGV8ZW58MHx8MHx8fDI%3D",
        alt: "Vogon Eggs",
        description:
          "Not for the faint-hearted! Vogon eggs pack a cosmic punch of oddly delicious flavor — best paired with a towel and a strong sense of humor. Great for adventurous eaters seeking the unexpected.",
        price: 10,
        available: 1000,
        shipping: true,
        universe: true,
      },
      {
        id: "egg-30",
        imgURL:
          "https://images.unsplash.com/photo-1651144440711-9824c0d50520?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHVvdmElMjBjb2xvcmF0ZXxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Basilisk Eggs",
        description:
          "Handle with care: these rare eggs offer a bold, smoky flavor with a mysterious edge. Consuming one could literally petrify you, so proceed with caution.",
        price: 50000,
        available: 10,
        shipping: true,
        universe: false,
      },
      {
        id: "egg-31",
        imgURL:
          "https://images.unsplash.com/vector-1738925710041-c67746b5e168?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dW92YSUyMG1pbmVjcmFmdHxlbnwwfHwwfHx8Mg%3D%3D",
        alt: "Steve Eggs",
        description:
          "Discover the mysterious power of Steve Eggs! Perfect to cook up a hearty meal or hatch your very own companions. These eggs can spawn a variety of creatures — from helpful allies to unexpected surprises. Ideal for adventurous eaters and explorers alike!",
        price: 1,
        available: 1000000000,
        shipping: false,
        universe: false,
      },
    ],
  },
  reducers: {
    decreaseAvailability: (state, action) => {
      const { id, quantity } = action.payload;
      const egg = state.value.find((e) => e.id === id);
      if (egg && egg.available >= quantity) {
        egg.available -= quantity;
      }
    },
    increaseAvailability: (state, action) => {
      const { id, quantity } = action.payload;
      const egg = state.value.find((egg) => egg.id === id);
      if (egg) {
        egg.available += quantity;
      }
    },
  },
});

export const { decreaseAvailability, increaseAvailability } = eggsSlice.actions;
export const eggsReducer = eggsSlice.reducer;
