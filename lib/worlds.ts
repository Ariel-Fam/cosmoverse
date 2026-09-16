/** Transcribed and condensed from the supplied public/narrative field journals. */
export type World = {
  name: string; slug: string; color: string; title: string; description: string;
  background: string; journal: string; class: string; diameter: string; gravity: string;
  day: string; year: string; temperature: string; moons: string; discovered: string;
  inhabitants: string; culture: string; phenomenon: string; phenomenonDescription: string;
  quote: string; quoteSource: string; notes: string; travel: string;
  terrain: [string, number][]; landmarks: [string, string][];
};
export const worlds: World[] = [
  {
    name: 'Earthys', slug: 'earthys', color: '#b8a0e2', title: 'A world of whispering winds.',
    description: 'A planet of poetic beauty and gentle mystery. Vast cloud fields drift above emerald valleys, where floating isles and ancient stone spires rise through the mist.',
    background: 'EarthysBackground', journal: 'Earthys', class: 'Terran (G-type)', diameter: '10,842 km', gravity: '1.02 G', day: '24.7 hours', year: '369 days', temperature: '12°C', moons: '2 — Lumina & Velo', discovered: '0110',
    inhabitants: 'The Lyrans', culture: 'Elegant, curious people who craft music, art, and architecture in harmony with nature. Exploration, storytelling, and the beauty of impermanence shape their culture.',
    phenomenon: 'The Whispering Winds', phenomenonDescription: 'Seasonal winds carry faint harmonies across the valleys. During the Aurora of Mists, soft light shimmers as clouds part to reveal hidden constellations.',
    quote: 'There are places that feel like memories you’ve never had. Earthys is one of them.', quoteSource: 'AstroMech log 0110-02', notes: 'A stable biosphere, abundant biodiversity, and resonant crystalline formations. Ideal for peaceful study, ecological research, and cultural exchange.', travel: 'Visit during the Aurora of Mists (Cycle 3). Respect sacred Lyran sites and carry wind-tuned instruments as a sign of respect.',
    terrain: [['Forest & woodland',42],['Valleys & plains',28],['Mountains & spires',18],['Lakes & rivers',12]],
    landmarks: [['Cloudspine Peaks','Jagged spires piercing the cloud layer, home to rare wind crystals.'],['Echowood Grove','An ancient forest whose trees resonate with musical frequencies.'],['Skyloom Isles','Floating islands sustained by natural levitation currents.'],['Lyran Sanctuary','A sacred place of learning, reflection, and harmony with the elements.']],
  },
  {
    name: 'Cosmara', slug: 'cosmara', color: '#57c2e8', title: 'Everything, in perfect rhythm.',
    description: 'The heart of balance in the Cosmae system. Vast oceans shimmer under gentle skies, meeting verdant coastlines and coral-ringed lagoons. A beacon of peace and cooperation.',
    background: 'CosmaraBackgroud', journal: 'Cosmara', class: 'Oceanic (O-type)', diameter: '11,894 km', gravity: '1.03 G', day: '25.3 hours', year: '327 days', temperature: '22°C', moons: '3 — Lucina, Vela & Miris', discovered: '0112',
    inhabitants: 'The Cosmarran people', culture: 'Wisdom, artistry, and diplomacy connect communities. Their cities honor nature, and their culture seeks understanding through music, storytelling, and exploration.',
    phenomenon: 'The Luminous Tides', phenomenonDescription: 'Bioluminescent waves glow softly during lunar alignments. Rare Celestial Reflections mirror multiple moons and stars across the sea.',
    quote: 'Here, the tides speak gently, the hearts listen deeply, and the world breathes in perfect balance.', quoteSource: 'AstroMech log 0110-03', notes: 'Marine scans reveal immense biodiversity, intelligent cetacean-like species, and crystalline coral structures. A remarkable destination for science and diplomacy.', travel: 'Visit during the Blue Season (Cycle 2). Travel by water, respect local traditions, and carry marine-safe gear.',
    terrain: [['Oceans & seas',55],['Coastlines & beaches',20],['Forests & plains',15],['Lakes & lagoons',10]],
    landmarks: [['Celestial Lagoon','A crystal-clear lagoon glowing under the moons, believed to be a gateway to inspiration.'],['Harmony Spires','Cities where art, science, and governance coexist in unity.'],['Serene Falls','Waterfalls feeding the lakes and symbolizing renewal and purity.'],['Coral Sanctuary','Vast reefs protected as sacred heritage of the Cosmarran people.']],
  },
  {
    name: 'Elyria', slug: 'elyria', color: '#e25495', title: 'A world that feels everything.',
    description: 'Art, music, and creativity made tangible. Crystal spires rise from iridescent valleys, floating islands drift through pastel skies, and every sound becomes a story.',
    background: 'ElyriaBackgroud', journal: 'Elyria', class: 'Terran (C-type)', diameter: '11,204 km', gravity: '1.03 G', day: '23.8 hours', year: '331 days', temperature: '18°C', moons: '2 — Lustra & Melodia', discovered: '0110',
    inhabitants: 'The Elyrians', culture: 'Expressive, empathic beings who communicate through art, music, and gesture. Collaborative communities celebrate emotional honesty, creativity, and compassion.',
    phenomenon: 'The Harmonic Confluence', phenomenonDescription: 'Celestial alignments amplify natural resonance: skies ripple with musical auroras, crystals sing, and islands orbit in Choral Rings like a living orchestra.',
    quote: 'Elyria doesn’t just inspire creativity—it awakens it. Every sound is a story. Every color is a feeling.', quoteSource: 'AstroMech log 0110-04', notes: 'Harmonic signatures permeate the air, soil, and water. Natural crystal resonance amplifies artistic expression. Proceed with an open mind.', travel: 'Visit during the Harmonic Confluence (Cycle 2). Use resonance-attuned gear near floating islands and join cultural gatherings with respect.',
    terrain: [['Crystal forests',40],['Terraced valleys',25],['Floating islands',20],['Lakes & falls',15]],
    landmarks: [['Crystal Harmonia','The grand capital’s crystal-spire concert halls amplify the world’s greatest symphonies.'],['Aurora Cascades','Waterfalls glowing with harmonic light during celestial alignments.'],['Painted Bridges','Living bridges change color with emotion and connect islands in the sky.'],['Festival Plaza','A celebration of art, light, and unity, with music floating on lanterns through the dusk.']],
  },
  {
    name: 'Kairos', slug: 'kairos', color: '#9d79cb', title: 'Time is a thread to be woven.',
    description: 'A world of shifting epochs and deliberate moments. Civilizations build at the convergence of timelines, harnessing technologies that accelerate, recede, or stabilize time itself.',
    background: 'KairosBackgroud', journal: 'Kairos', class: 'Terran (K-type)', diameter: '13,214 km', gravity: '1.09 G', day: '26.3 hours', year: '412 days', temperature: '16°C', moons: '3 — Chronos, Aeon & Nyx', discovered: '0218',
    inhabitants: 'The Kairosians', culture: 'Scholars and weavers of time who value memory, foresight, and responsibility across generations. Their Tapestry Codex records decisions and consequences across time.',
    phenomenon: 'Chronal Convergences', phenomenonDescription: 'Overlapping timelines reveal visible layers of past and future. Time Echoes let explorers witness remnants of events that could have been.',
    quote: 'Time is not a river to be crossed. It is a thread to be woven.', quoteSource: 'Kairosian proverb 7:12', notes: 'Chronal instruments are essential; standard timekeeping is unreliable. Avoid temporal shear zones, where organic tissue and equipment may desynchronize.', travel: 'Temporal stabilizers recommended. Local guides can navigate safe corridors. Respect time sanctuaries and obtain permits for major chrono-archives.',
    terrain: [['Floating plateaus',38],['Ancient ruins',27],['River basins',19],['Forests',10],['Crystal fields',6]],
    landmarks: [['The Epoch Spire','A needle of stone and crystal marking the First Alignment.'],['The Circular Academy','Seat of the Chronal Conclave, where scholars map time’s laws and mediate across eras.'],['Memory Falls','A waterfall flowing upward during convergence, revealing visions of distant moments.'],['The Hollow Hour','A canyon where time stands still and every sound lingers.']],
  },
  {
    name: 'Luminaria', slug: 'luminaria', color: '#f3b944', title: 'Beneath an everlasting dawn.',
    description: 'An orbital jewel blazing with golden skies, glittering seas, and horizons that glow from within. Crystalline particles bend and scatter starlight into a world of perpetual dawn.',
    background: 'LuminariaBackgroud', journal: 'Luminaria', class: 'Terran (G-type)', diameter: '13,390 km', gravity: '1.07 G', day: '27.1 hours', year: '438 days', temperature: '25°C', moons: '3 — Aurel, Duskflare & Rayne', discovered: '0110',
    inhabitants: 'The Luminari', culture: 'A graceful, light-adaptive species with iridescent skin. Their lives revolve around cycles of light, harmonic architecture, and prismatic weaving.',
    phenomenon: 'The Shardfall', phenomenonDescription: 'At twilight, thousands of tiny crystalline shards ignite like meteors and dissolve before touching ground. Bands of scattered light sweep the sky as the Dawn Curtain.',
    quote: 'On Luminaria, light is not just seen—it is felt, sung, and woven into every breath of life.', quoteSource: 'AstroMech log 0110-06', notes: 'Aurelite particles resonate with stellar radiation, creating natural photonic dispersion. Indigenous crystal ecosystems must be treated as sacred heritage.', travel: 'Visit during the Golden Solstice (Cycle 2). Solar sails aid navigation; carry light-polarization filters for extended travel.',
    terrain: [['Oceans & seas',36],['Crystal plains',28],['Highlands',22],['Floating isles',10],['Caverns & grottoes',4]],
    landmarks: [['Aurel Spires','Crystalline towers capture sunlight and refract it across the seas.'],['Prismal Tides','Shallow seas sparkle with bioluminescent reefs and iridescent currents.'],['Songglass City','A capital of harmonic crystal and light bridges that resonate with the winds.'],['Rayne Falls','Gravity-defying waterfalls shimmer in perpetual rainbows.']],
  },
  {
    name: 'Nexarion', slug: 'nexarion', color: '#a4c1e7', title: 'Where worlds come together.',
    description: 'The engine of connection and commerce in Cosmae. Orbital docks, mag-lev arteries, and shielded skylanes weave cities into a vast network that ties neighboring worlds together.',
    background: 'NaxarionBackgroud', journal: 'Nexarion', class: 'Terran (M-type)', diameter: '13,924 km', gravity: '1.09 G', day: '25.1 hours', year: '314 days', temperature: '19°C', moons: '1 — Oriona', discovered: '0108',
    inhabitants: 'The Nexarians', culture: 'Pragmatic, ambitious people united by collaboration and respect for craft. Guilds of engineers, merchants, and scholars celebrate reliability and shared progress.',
    phenomenon: 'The Convergence Currents', phenomenonDescription: 'Charged atmospheric energy follows magnetic conduits, powering sky-rails and energy grids. At night, the currents form luminous veils called the Auric Lines.',
    quote: 'Where others build walls, Nexarion builds bridges. Where others seek power, Nexarion forges partnership.', quoteSource: 'AstroMech log 0110-07', notes: 'Stable energy harmonics and remarkable infrastructure create a seamless web of connectivity. Ideal for long-term partnerships and advanced exchange missions.', travel: 'Transit visas follow the Nexus Accord. Mag-lev corridors link major cities. Attend the Convergence Forum (Cycle 2) for trade and collaboration.',
    terrain: [['Coasts & islands',38],['Plains & farmlands',27],['Highlands & plateaus',20],['Urban & industrial',9],['Desert & basins',6]],
    landmarks: [['The Nexus Spire','The heart of governance, coordination, and the planet’s guild alliances.'],['Orbital Elevator Port','A towering link between world and orbit for goods, people, and resources.'],['Aegis Shipgate','A fortified spacegate safeguarding open trade lanes.'],['The Harmony Basin','An ecological reserve celebrating technology, nature, and community.']],
  },
  {
    name: 'Stellaluna', slug: 'stellaluna', color: '#9b84ce', title: 'Every ending begins in light.',
    description: 'The luminous heart of cosmic curiosity. Observatory towers turn toward stellar nurseries and ancient remnants. Here, knowledge is harvested from light itself.',
    background: 'StellaLunaBackgroud', journal: 'Stellaluna', class: 'Astral research world', diameter: '14,210 km', gravity: '1.06 G', day: '29.3 hours', year: '512 days', temperature: '−12°C', moons: '3 — Lumina, Veil & Nova', discovered: '0098',
    inhabitants: 'The Luminari of Stellaluna', culture: 'Scientists, philosophers, and engineers devote their lives to understanding the cosmos. Inquiry, collaboration, and knowledge shared across generations define their cities.',
    phenomenon: 'The Aurora Maelstrom', phenomenonDescription: 'Charged light dances in stellar winds. During Celestial Confluence, nebulae align, while rare Nova Veils glow in the light of newborn stars.',
    quote: 'Stellaluna reminds us that we are made of starstuff—and that every ending is a beginning in light.', quoteSource: 'AstroMech log 0110-08', notes: 'Iridium, osmium, and exotic isotopes formed in supernovae and neutron-star mergers are abundant. Quantum arrays and gravitic lenses peer beyond visible horizons.', travel: 'Visit during the Aurora Maelstrom (Cycle 7). Carry radiation shielding and ion-storm protection. Respect observatory protocols and data sanctity.',
    terrain: [['Crystalline highlands',34],['Observatory plateaus',26],['Basaltic canyons',20],['Reflective plains',12],['Subsurface caverns',8]],
    landmarks: [['Lumina Observatory','A ring of mega-domes and adaptive mirrors studying deep space in all wavelengths.'],['Nebula Spires','Charged stone formations surrounded by swirling auroras and ion fields.'],['Nova Forge Labs','Research facilities analyzing stellar material and experimental reactors.'],['The Veil Gardens','Protected biodomes cultivating rare flora in luminous, low-gravity conditions.']],
  },
  {
    name: 'Terraverde', slug: 'terraverde', color: '#90b75d', title: 'A living world. A shared future.',
    description: 'Emerald forests stretch across rolling continents. Crystal-clear waters sustain extraordinary biodiversity, and a deep-rooted culture of stewardship protects the balance of life.',
    background: 'EarthysBackgroud', journal: 'TerraVerde', class: 'Terran (G-type)', diameter: '12,104 km', gravity: '1.03 G', day: '25.1 hours', year: '318 days', temperature: '22°C', moons: '1 — Verdis', discovered: '0142',
    inhabitants: 'The Terraverdians', culture: 'Guided by Harmonia, communities blend art, science, and spirituality in service of preservation. Cooperation, respect for all life, and sustainable innovation help them thrive.',
    phenomenon: 'The Verdant Bloom', phenomenonDescription: 'Seasonal bursts of bioluminescent flora paint forests in shimmering greens and blues. The Great Mists rise from lakes, carrying the scent of blooms and songs of hidden wildlife.',
    quote: 'We do not own Terraverde—we are its caretakers for those who will come after us.', quoteSource: 'Elara Vaen, eco-steward', notes: 'An exceptionally diverse and balanced biosphere with low pollution. Strong potential for botanical research, biomimetic engineering, and sustainable agriculture.', travel: 'Visit during the Verdant Bloom (Cycle 2). Use eco-compatible gear, respect protected zones, and follow all stewardship protocols.',
    terrain: [['Forests & woodlands',48],['Lakes & rivers',22],['Grasslands & plains',18],['Highlands & cliffs',12]],
    landmarks: [['Emerald Basin','Crystal lakes surrounded by ancient forests and cascading waterfalls.'],['Verdis Grove','Sacred forest of the First Stewards, where living trees form natural cathedrals.'],['Harmonia City','A sustainable city of gardens and spires powered by nature and ingenuity.'],['Skyroot Isles','Floating islands bound by ancient roots and fed by cloud rivers.']],
  },
];
