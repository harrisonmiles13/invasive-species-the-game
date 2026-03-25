// =============================================================================
// game.js — Single-file bundle (no ES modules needed)
// =============================================================================

// ─── CARD DATA ────────────────────────────────────────────────────────────────

const CardType     = { NATIVE: 'native', INVASIVE: 'invasive', CONTROL: 'control', EVENT: 'event' };
const ControlMethod = { PHYSICAL: 'physical', CHEMICAL: 'chemical', BIOLOGICAL: 'biological', FIRE: 'fire', AQUATIC: 'aquatic', QUARANTINE: 'quarantine' };

// Organism icons and habitat icons used in card face rendering
const HABITAT_ICONS  = { terrestrial: '🌲', freshwater: '💧', marine: '🌊', wetland: '🪷', brackish: '🌿' };
const ORGANISM_ICONS = { plant: '🌿', animal: '🐾', fungi: '🍄', bacteria: '⬡' };
const MECHANIC_LABELS = {
  facilitator: 'Facilitator', competitor: 'Competitor', allelopathic: 'Allelopathic',
  engineer: 'Engineer', predator: 'Predator', pathogen: 'Pathogen', disperser: 'Disperser',
};
const NATIVE_MECHANIC_LABELS = {
  pioneer:     'Pioneer',
  propagator:  'Propagator',
  competitor:  'Competitor',
  allelopathic:'Allelopathic',
  pollinator:  'Pollinator',
  mycorrhizal: 'Mycorrhizal',
  predator:    'Predator',
};

const N = CardType.NATIVE, I = CardType.INVASIVE, C = CardType.CONTROL, E = CardType.EVENT;

// ── NATIVES ───────────────────────────────────────────────────────────────────
// Each entry is a real species. count = copies in the deck.

const NATIVES = [
  // Terrestrial Plants (8 cards total)
  { id: 'nat_blackberry',      type: N, habitat: 'terrestrial', organism: 'plant',  displayName: 'Allegheny Blackberry',  latinName: 'Rubus allegheniensis',       nativeMechanic: 'competitor',   nativeTurnText: 'Dense thickets displace 1 adjacent invasive plant.',                            description: 'A thorny native shrub whose fruit is a critical late-summer food source for over 100 bird species and numerous mammals. Dense thickets provide important nesting cover.', count: 2 },
  { id: 'nat_dogwood',         type: N, habitat: 'terrestrial', organism: 'plant',  displayName: 'Flowering Dogwood',     latinName: 'Cornus florida',             nativeMechanic: 'pollinator',   nativeTurnText: 'Supports pollinators — active player draws 1 card.',                          description: 'A small understory tree prized for its spring bloom. Its bright red berries are high in fat — an essential pre-migration food for thrushes and warblers. Threatened by dogwood anthracnose.', count: 2 },
  { id: 'nat_spicebush',       type: N, habitat: 'terrestrial', organism: 'plant',  displayName: 'Spicebush',             latinName: 'Lindera benzoin',            nativeMechanic: 'pioneer',      nativeTurnText: 'Draws 1 card; if native, establishes it in an adjacent niche.',               description: 'An aromatic native shrub in the laurel family. The sole larval host plant for the Spicebush Swallowtail butterfly. Shade-tolerant and among the first shrubs to bloom in spring.', count: 2 },
  { id: 'nat_virginia_creeper',type: N, habitat: 'terrestrial', organism: 'plant',  displayName: 'Virginia Creeper',      latinName: 'Parthenocissus quinquefolia',nativeMechanic: 'propagator',   nativeTurnText: 'Spreads vegetatively — copies itself into 1 random adjacent open niche.',      description: 'A fast-growing native vine that turns brilliant scarlet in fall. Its berries are consumed by at least 35 bird species. Often confused with the invasive Poison Ivy or English Ivy.', count: 2 },
  // Terrestrial Animals (6 cards total)
  { id: 'nat_monarch',         type: N, habitat: 'terrestrial', organism: 'animal', locomotion: 'aerial',        displayName: 'Monarch Butterfly',     latinName: 'Danaus plexippus',           nativeMechanic: 'pollinator',   nativeTurnText: 'Pollinator ecosystem services — active player draws 1 card.',                 description: 'An iconic long-distance migrant traveling up to 3,000 miles to Mexican overwintering sites. Dependent on native milkweed for larval development. Listed as endangered by the IUCN in 2022.', count: 2 },
  { id: 'nat_littlebrown_bat', type: N, habitat: 'terrestrial', organism: 'animal', locomotion: 'aerial',        displayName: 'Little Brown Bat',      latinName: 'Myotis lucifugus',           nativeMechanic: 'predator',     nativeTurnText: 'Aerial predation — removes 1 adjacent invasive animal. Does nothing if none adjacent.',description: 'A voracious insect predator consuming up to 1,200 mosquitoes per hour. Populations have collapsed by over 90% in parts of eastern North America due to the fungal disease White-nose Syndrome.', count: 2 },
  { id: 'nat_box_turtle',      type: N, habitat: 'terrestrial', organism: 'animal', locomotion: 'terrestrial',   displayName: 'Eastern Box Turtle',    latinName: 'Terrapene carolina',         nativeMechanic: 'pioneer',      nativeTurnText: 'Seed dispersal — draws 1 card; if native, plants it in an adjacent niche.',   description: 'A long-lived terrestrial turtle that can survive over 100 years. A key seed disperser for native plants including mayapple and pawpaw. Highly susceptible to habitat fragmentation.', count: 2 },
  // Terrestrial Fungi (4 cards total)
  { id: 'nat_turkey_tail',     type: N, habitat: 'terrestrial', organism: 'fungi',  displayName: 'Turkey Tail',           latinName: 'Trametes versicolor',        nativeMechanic: 'mycorrhizal',  nativeTurnText: 'Fungal network — active player draws 1 card from the connected soil web.',     description: 'One of the most widespread and ecologically important bracket fungi in North American forests. A primary wood decomposer that recycles nutrients from dead wood. Subject of active cancer immunotherapy research.', count: 2 },
  { id: 'nat_morel',           type: N, habitat: 'terrestrial', organism: 'fungi',  displayName: 'American Morel',        latinName: 'Morchella americana',        nativeMechanic: 'mycorrhizal',  nativeTurnText: 'Mycorrhizal association — active player draws 1 card.',                       description: 'A choice edible fungus forming mycorrhizal associations with native trees. Fruiting is triggered by specific soil temperature and moisture conditions in spring. Prized by foragers and ecologically sensitive to disturbance.', count: 2 },
  // Freshwater Plants (6 cards total)
  { id: 'nat_wild_celery',     type: N, habitat: 'freshwater',  organism: 'plant',  displayName: 'Wild Celery',           latinName: 'Vallisneria americana',      nativeMechanic: 'competitor',   nativeTurnText: 'Dense submerged meadow excludes 1 adjacent invasive plant.',                  description: 'A submerged aquatic plant forming vast underwater meadows. Provides critical food for diving ducks including Canvasbacks and Redheads. Its winter buds are among the most energy-rich waterfowl foods available.', count: 2 },
  { id: 'nat_pickerelweed',    type: N, habitat: 'freshwater',  organism: 'plant',  displayName: 'Pickerelweed',          latinName: 'Pontederia cordata',         nativeMechanic: 'pioneer',      nativeTurnText: 'Draws 1 card; if native, establishes it in an adjacent aquatic niche.',       description: 'An emergent aquatic plant with showy violet flower spikes. A pollinator magnet supporting native bees and butterflies. Its seeds are eaten by wood ducks and other waterfowl. Indicates good water quality.', count: 2 },
  { id: 'nat_pond_lily',       type: N, habitat: 'freshwater',  organism: 'plant',  displayName: 'Yellow Pond Lily',      latinName: 'Nuphar lutea',               nativeMechanic: 'propagator',   nativeTurnText: 'Rhizome spread — copies itself into 1 random adjacent open niche.',           description: 'A floating-leaf aquatic plant whose broad pads provide shade that regulates water temperature and suppresses algae. Beaver, muskrat, and moose consume its rhizomes. Important fish spawning habitat.', count: 2 },
  // Freshwater Animals (6 cards total)
  { id: 'nat_brook_trout',     type: N, habitat: 'freshwater',  organism: 'animal', locomotion: 'aquatic',       displayName: 'Brook Trout',           latinName: 'Salvelinus fontinalis',      nativeMechanic: 'competitor',   nativeTurnText: 'Territorial dominance — excludes 1 adjacent invasive animal from the niche.', description: 'The only trout native to most of eastern North America. A cold-water specialist and key indicator of watershed health. Sensitive to sedimentation, warming, and acidification — all worsened by invasive species.', count: 2 },
  { id: 'nat_hellgrammite',    type: N, habitat: 'freshwater',  organism: 'animal', locomotion: 'aquatic',       displayName: 'Eastern Hellgrammite',  latinName: 'Corydalus cornutus',        nativeMechanic: 'allelopathic', nativeTurnText: 'Bioindicator presence signals clean water — removes 1 adjacent invasive.',    description: 'The aquatic larva of the Dobsonfly, living 2–3 years in fast-flowing streams. An important food for smallmouth bass and other game fish. A classic bioindicator of clean, oxygen-rich water.', count: 2 },
  { id: 'nat_painted_turtle',  type: N, habitat: 'freshwater',  organism: 'animal', locomotion: 'semi-aquatic',  displayName: 'Painted Turtle',        latinName: 'Chrysemys picta',            nativeMechanic: 'propagator',   nativeTurnText: 'Moves between water bodies — copies itself into 1 random adjacent open niche.',description: 'The most widespread native turtle in North America, occupying wetland edges across the continent. An aquatic-terrestrial interface species that regulates aquatic invertebrate and plant populations.', count: 2 },
  // Marine Plants (4 cards total)
  { id: 'nat_eelgrass',        type: N, habitat: 'marine',      organism: 'plant',  displayName: 'Eelgrass',              latinName: 'Zostera marina',             nativeMechanic: 'pioneer',      nativeTurnText: 'Seagrass meadow expands — draws 1 card; if native, establishes it adjacent.', description: 'A foundational seagrass forming vast underwater meadows in shallow coastal waters. Provides nursery habitat for commercially important fish, sequesters significant carbon, and stabilizes sediment. Threatened globally by warming and eutrophication.', count: 2 },
  { id: 'nat_rockweed',        type: N, habitat: 'marine',      organism: 'plant',  displayName: 'Rockweed',              latinName: 'Ascophyllum nodosum',        nativeMechanic: 'competitor',   nativeTurnText: 'Dense intertidal canopy excludes 1 adjacent invasive plant.',                  description: 'A dominant intertidal brown alga forming dense canopies that buffer temperature and moisture extremes. A foundational species supporting hundreds of invertebrate and fish species. Harvested commercially as a biostimulant.', count: 2 },
  // Marine Animals (4 cards total)
  { id: 'nat_atlantic_cod',    type: N, habitat: 'marine',      organism: 'animal', locomotion: 'aquatic',       displayName: 'Atlantic Cod',          latinName: 'Gadus morhua',               nativeMechanic: 'predator',     nativeTurnText: 'Apex predation — removes 1 adjacent invasive animal. Does nothing if none adjacent.', description: 'Historically one of the most abundant fish in the North Atlantic, cod shaped both ecology and human civilization for centuries. Severe overfishing caused population collapse in the 1990s. Still critically endangered despite fishing moratoriums.', count: 2 },
  { id: 'nat_blue_crab',       type: N, habitat: 'marine',      organism: 'animal', locomotion: 'semi-aquatic',  displayName: 'Blue Crab',             latinName: 'Callinectes sapidus',        nativeMechanic: 'allelopathic', nativeTurnText: 'Keystone omnivory — chemical cues deter 1 adjacent invasive.',                 description: 'A keystone omnivore of Atlantic estuaries, consuming bivalves, worms, and detritus while serving as prey for fish, birds, and river otters. Its name means "beautiful savory swimmer." Supports major commercial fisheries.', count: 2 },
  // Wetland Plants (5 cards total)
  { id: 'nat_cattail',         type: N, habitat: 'wetland',     organism: 'plant',  displayName: 'Common Cattail',        latinName: 'Typha latifolia',            nativeMechanic: 'competitor',   nativeTurnText: 'Dense emergent stand excludes 1 adjacent invasive plant.',                     description: 'A dominant emergent plant of freshwater marshes providing nesting material and habitat for marsh wrens, red-winged blackbirds, and muskrats. Rhizomes are edible and have been used by Indigenous peoples for millennia.', count: 2 },
  { id: 'nat_blue_flag_iris',  type: N, habitat: 'wetland',     organism: 'plant',  displayName: 'Blue Flag Iris',        latinName: 'Iris versicolor',            nativeMechanic: 'allelopathic', nativeTurnText: 'Toxic alkaloids deter browsers — removes 1 adjacent invasive.',                description: 'A stunning native iris of wet meadows, shorelines, and marshes. Its intricate flowers are pollinated by long-tongued bumblebees. The plant is toxic to mammals, providing natural browse-resistance. A provincially protected species in Nova Scotia.', count: 3 },
  // Wetland Animals (3 cards total)
  { id: 'nat_wood_duck',       type: N, habitat: 'wetland',     organism: 'animal', locomotion: 'semi-aquatic',  displayName: 'Wood Duck',             latinName: 'Aix sponsa',                nativeMechanic: 'pioneer',      nativeTurnText: 'Cavity-nesting dispersal — draws 1 card; if native, establishes it adjacent.', description: 'A cavity-nesting waterfowl that recovered dramatically after near-extinction from hunting in the early 20th century, through nest box programs and federal protection. Dependent on wooded swamps and bottomland hardwood forests with standing water.', count: 3 },
  // Terrestrial Plants — added from IPBES priority species
  { id: 'nat_white_ash',       type: N, habitat: 'terrestrial', organism: 'plant',  displayName: 'White Ash',             latinName: 'Fraxinus americana',         nativeMechanic: 'competitor',   nativeTurnText: 'Closed canopy shades out 1 adjacent invasive plant.',                         description: 'A canopy tree whose compound leaves turn brilliant purple in fall. White ash timber is prized for tool handles, baseball bats, and traditional basket-weaving by numerous Indigenous nations in northeastern North America. Facing rapid functional extinction from Emerald Ash Borer, with few scalable management options.', count: 2 },
  // Wetland Amphibians — sentinel species for chytrid fungus
  { id: 'nat_wood_frog',       type: N, habitat: 'wetland',     organism: 'animal', locomotion: 'semi-aquatic',  displayName: 'Wood Frog',             latinName: 'Rana sylvatica',             nativeMechanic: 'pioneer',      nativeTurnText: 'Explosive vernal breeding — draws 1 card; if native, establishes it adjacent.', description: 'The only frog found north of the Arctic Circle, freeze-tolerant through winter. Breeding choruses in vernal pools are among the first signals of spring. Among the most susceptible amphibians to Batrachochytrium dendrobatidis; population crashes serve as early indicators of chytrid fungus establishment.', count: 2 },
];

// ── INVASIVES ─────────────────────────────────────────────────────────────────
const FT = 'facilitator', CP = 'competitor', AL = 'allelopathic', EN = 'engineer',
      PR = 'predator',    PA = 'pathogen',   DI = 'disperser';

const INVASIVES = [
  // Terrestrial Plant — Facilitator (8 cards)
  { id: 'inv_stiltgrass',    type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: FT, displayName: 'Japanese Stiltgrass',  latinName: 'Microstegium vimineum',     description: 'Introduced in packing material in the early 1900s, this annual grass now blankets millions of acres of eastern forest floor. Its rapid litter decomposition alters soil chemistry and light conditions, actively facilitating establishment of other invasive plants.', invasiveTurnEffect: FT, invasiveTurnText: 'Draw until an Invasive appears; place it in an open niche or replace a Native.', count: 4 },
  { id: 'inv_autumn_olive',  type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: FT, fireSurvival: 0.25, displayName: 'Autumn Olive',         latinName: 'Elaeagnus umbellata',       description: 'A nitrogen-fixing shrub deliberately planted for erosion control and wildlife habitat in the mid-20th century. It alters soil nitrogen cycles, dramatically favoring nitrophilous invasive plants over native species characteristic of low-nutrient soil conditions.', invasiveTurnEffect: FT, invasiveTurnText: 'Draw until an Invasive appears; place it in an open niche or replace a Native.', count: 4 },
  // Terrestrial Plant — Competitor (6 cards)
  { id: 'inv_kudzu',         type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: CP, fireSurvival: 0.30, displayName: 'Kudzu',                 latinName: 'Pueraria montana var. lobata', description: 'The "vine that ate the South." Growing up to a foot per day, kudzu smothers entire forest edges under dense foliage, killing trees by blocking all sunlight. Introduced from Japan in 1876 for erosion control, it now covers over 7 million acres of the southeastern US.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 2 },
  { id: 'inv_multiflora',    type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: CP, displayName: 'Multiflora Rose',       latinName: 'Rosa multiflora',           description: 'A thorny shrub from East Asia intentionally planted by the USDA as a "living fence" and for erosion control. Each plant produces millions of seeds dispersed by birds. Dense thickets eliminate native understory plants and shrubs.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 2 },
  { id: 'inv_honeysuckle_j', type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: CP, fireSurvival: 0.20, displayName: 'Japanese Honeysuckle', latinName: 'Lonicera japonica',         description: 'A semi-evergreen vine that leafs out earlier and holds leaves later than native plants, giving it a competitive advantage for light. It girdles young trees and shrubs with its twining stems, eventually killing them. Ironically still sold as an ornamental.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 2 },
  // Terrestrial Plant — Allelopathic (4 cards)
  { id: 'inv_treeofheaven',  type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: AL, displayName: 'Tree-of-Heaven',        latinName: 'Ailanthus altissima',       description: 'Produces ailanthone, a potent phytotoxin that suppresses germination and growth of surrounding plants. Resprouts aggressively when cut, sending up multiple shoots. The preferred host plant of the invasive Spotted Lanternfly, compounding its ecological damage.', invasiveTurnEffect: AL, invasiveTurnText: 'Remove ALL adjacent Native cards.', count: 2 },
  { id: 'inv_garlic_mustard',type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: AL, displayName: 'Garlic Mustard',        latinName: 'Alliaria petiolata',        description: 'A biennial herb that releases glucosinolate compounds disrupting the mycorrhizal fungal networks that native trees depend on for nutrient uptake. This chemical warfare against soil fungi undermines the entire forest understory, allowing garlic mustard to displace native spring ephemerals.', invasiveTurnEffect: AL, invasiveTurnText: 'Remove ALL adjacent Native cards.', count: 2 },
  // Terrestrial Plant — Allelopathic cont. + Fire-cycle Facilitator
  { id: 'inv_knotweed',     type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: AL, fireSurvival: 0.15, displayName: 'Japanese Knotweed',    latinName: 'Reynoutria japonica',      description: 'One of the world\'s most problematic invasive plants. Its hollow bamboo-like stems can reach 10 feet in a season, and its deep rhizome network — up to 9 feet down and 65 feet outward — is nearly impossible to eradicate. Produces phytotoxic compounds that suppress native plant germination, and can penetrate concrete and building foundations.', invasiveTurnEffect: AL, invasiveTurnText: 'Remove ALL adjacent Native cards.', count: 2 },
  { id: 'inv_cogongrass',   type: I, habitat: 'terrestrial', organism: 'plant',    mechanic: FT, fireSurvival: 0.65, displayName: 'Cogongrass',           latinName: 'Imperata cylindrica',      description: 'One of the world\'s worst agricultural weeds, ranked in the top 10 globally invasive species. Cogongrass is highly flammable and burns hotter and faster than native grasses, promoting fire regimes lethal to most native species. Deep rhizomes persist through burns and resprout within days, dominating post-fire bare ground before competing vegetation can recover.', invasiveTurnEffect: FT, invasiveTurnText: 'Draw until an Invasive appears; place it in an open niche or replace a Native.', count: 2 },
  // Wetland Plant — Competitor
  { id: 'inv_loosestrife',  type: I, habitat: 'wetland',     organism: 'plant',    mechanic: CP, displayName: 'Purple Loosestrife',    latinName: 'Lythrum salicaria',        description: 'An ornamental plant from Europe now dominant in wetlands across North America. A single plant can produce over 2.7 million seeds per year. Dense monocultures eliminate the native emergent plants that wetland birds, muskrats, and amphibians depend on. Despite its beauty, its presence signals a fundamentally degraded wetland.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 2 },
  // Terrestrial Animal — Engineer (4 cards)
  { id: 'inv_wild_boar',     type: I, habitat: 'terrestrial', organism: 'animal',   locomotion: 'terrestrial',  mechanic: EN, displayName: 'Wild Boar',             latinName: 'Sus scrofa',               description: 'Feral swine cause over $2.5 billion in agricultural and ecological damage annually in the US. Their rooting behavior physically destroys soil structure, eliminates native ground cover, and creates wallows that collect invasive plant propagules. Highly intelligent and adaptable, they are nearly impossible to eradicate.', invasiveTurnEffect: EN, invasiveTurnText: 'Remove up to 2 adjacent Natives by disrupting habitat structure.', count: 2 },
  { id: 'inv_starling',      type: I, habitat: 'terrestrial', organism: 'animal',   locomotion: 'aerial',       mechanic: EN, displayName: 'European Starling',     latinName: 'Sturnus vulgaris',         description: 'Over 200 million European Starlings in North America trace to 100 birds released in Central Park in 1890 by a man who wanted to introduce all birds mentioned by Shakespeare. They aggressively displace native cavity-nesting birds including woodpeckers, bluebirds, and purple martins from their nest sites.', invasiveTurnEffect: EN, invasiveTurnText: 'Remove up to 2 adjacent Natives by disrupting habitat structure.', count: 2 },
  // Freshwater Plant — Competitor (5 cards)
  { id: 'inv_water_hyacinth', type: I, habitat: 'freshwater', organism: 'plant',    mechanic: CP, displayName: 'Water Hyacinth',        latinName: 'Eichhornia crassipes',      description: 'The world\'s worst aquatic weed. This floating plant can double its population in two weeks, forming impenetrable mats that block sunlight, deplete oxygen, and collapse native aquatic food webs. Its beautiful flowers led to widespread ornamental planting, enabling global spread via waterway networks.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 3 },
  { id: 'inv_watermilfoil',  type: I, habitat: 'freshwater',  organism: 'plant',    mechanic: CP, displayName: 'Eurasian Watermilfoil', latinName: 'Myriophyllum spicatum',     description: 'A submerged aquatic plant that forms dense mats, shading out native aquatic vegetation. Spreads rapidly via fragments — even tiny pieces attached to boat propellers or trailers can establish new infestations. Dramatically alters fish habitat and recreational use of lakes.', invasiveTurnEffect: CP, invasiveTurnText: 'Remove one adjacent Native card.', count: 2 },
  // Freshwater Animal — Predator (5 cards)
  { id: 'inv_snakehead',     type: I, habitat: 'freshwater',  organism: 'animal',   locomotion: 'aquatic',   mechanic: PR, displayName: 'Northern Snakehead',    latinName: 'Channa argus',             description: 'An air-breathing predatory fish capable of traveling overland between water bodies. It has no natural predators in North American waters and consumes virtually everything it encounters. First detected in Maryland in 2002, it has since spread to 14 states. Nicknamed the "Frankenfish."', invasiveTurnEffect: PR, invasiveTurnText: 'Remove one adjacent Native animal. Does nothing if no adjacent Native animals.', count: 3 },
  { id: 'inv_rusty_crayfish', type: I, habitat: 'freshwater', organism: 'animal',   locomotion: 'aquatic',      mechanic: PR, displayName: 'Rusty Crayfish',        latinName: 'Faxonius rusticus',        description: 'An aggressive freshwater crayfish that clips and destroys aquatic plants at rates far exceeding native crayfish, eliminating fish spawning habitat. It hybridizes with native crayfish and outcompetes them for shelter. Spread primarily through use as fishing bait and aquarium releases.', invasiveTurnEffect: PR, invasiveTurnText: 'Remove one adjacent Native animal. Does nothing if no adjacent Native animals.', count: 2 },
  // Marine Animal — Disperser (4 cards)
  { id: 'inv_lionfish',      type: I, habitat: 'marine',      organism: 'animal',   locomotion: 'aquatic',      mechanic: DI, displayName: 'Red Lionfish',           latinName: 'Pterois volitans',         description: 'A venomous Indo-Pacific predator with no natural enemies in Atlantic waters. It consumes over 50 species of native reef fish and can reduce juvenile fish populations by 79% within five weeks of arrival at a reef. Its dramatic appearance made it a popular aquarium fish, facilitating accidental release.', invasiveTurnEffect: DI, invasiveTurnText: 'Establish a new population in a random non-adjacent open niche.', count: 2 },
  { id: 'inv_green_crab',    type: I, habitat: 'marine',      organism: 'animal',   locomotion: 'semi-aquatic', mechanic: DI, displayName: 'European Green Crab',   latinName: 'Carcinus maenas',          description: 'One of the world\'s most successful marine invaders, present on every continent except Antarctica and South America. Spreads via larval transport in ballast water. Destroys eelgrass beds through burrowing and outcompetes native crabs and clams. Range is expanding rapidly as ocean temperatures rise.', invasiveTurnEffect: DI, invasiveTurnText: 'Establish a new population in a random non-adjacent open niche.', count: 2 },
  // Terrestrial Plant — Fire-cycle Facilitator (IPBES priority species)
  { id: 'inv_cheatgrass',    type: I, habitat: 'terrestrial', organism: 'plant',  mechanic: FT, fireSurvival: 0.85, displayName: 'Cheatgrass',           latinName: 'Bromus tectorum',          description: 'An annual grass from Eurasia that completes its life cycle before native grasses mature, leaving a dense mat of dry fuel by midsummer. Burns hotter and more frequently than native grasslands, eliminating fire-intolerant native shrubs and perennials. Post-fire bare ground is rapidly colonized by cheatgrass before native vegetation can recover, creating a self-reinforcing fire cycle. Now dominant across 100 million acres of the western US intermountain region.', invasiveTurnEffect: FT, invasiveTurnText: 'Draw until an Invasive appears; place it in an open niche or replace a Native.', count: 3 },
  // Freshwater Animal — Ecosystem Engineer (IPBES case study)
  { id: 'inv_zebra_mussel',  type: I, habitat: 'freshwater', organism: 'animal', locomotion: 'aquatic',      mechanic: EN, displayName: 'Zebra Mussel',          latinName: 'Dreissena polymorpha',     description: 'A bivalve mollusk introduced via ballast water, first detected in the Great Lakes in 1988. Dense colonies filter phytoplankton from the water column at extraordinary rates, collapsing the zooplankton and fish communities that depend on that energy pathway. Range has expanded to over 30 US states through connected waterways. Biofouling of intake structures and native mussel displacement compound direct ecological impacts.', invasiveTurnEffect: EN, invasiveTurnText: 'Remove up to 2 adjacent Natives — filter-feeding collapses the local food web.', count: 3 },
  // Wetland Fungi — Animal Pathogen (IPBES: greatest amphibian extinction driver)
  { id: 'inv_chytrid',       type: I, habitat: 'wetland',    organism: 'fungi',  mechanic: PA, infects: 'animal', displayName: 'Chytrid Fungus',       latinName: 'Batrachochytrium dendrobatidis', description: 'The cause of chytridiomycosis, documented as responsible for declines or extinctions in over 500 amphibian species — the greatest vertebrate disease-driven extinction event in recorded history. Spread through the international amphibian trade and contaminated water. Disrupts electrolyte transport through the skin, causing cardiac failure. No landscape-scale management option currently exists.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native amphibian.', count: 2 },
  // Terrestrial Animal — Ecosystem Engineer (IPBES: billions of ash trees killed)
  { id: 'inv_eab',           type: I, habitat: 'terrestrial', organism: 'animal', locomotion: 'aerial',      mechanic: EN, displayName: 'Emerald Ash Borer',    latinName: 'Agrilus planipennis',      description: 'A phloem-mining beetle from northeastern Asia, first detected in Michigan in 2002. Larvae sever the vascular tissue of ash trees by tunneling beneath the bark, killing mature trees within 2–3 years of infestation. Over 8 billion ash trees face mortality across North America. Ash is a culturally critical species for numerous Indigenous nations whose basket-weaving traditions depend on its bark strips.', invasiveTurnEffect: EN, invasiveTurnText: 'Remove up to 2 adjacent Native plants — phloem mining kills host trees.', count: 2 },
  // Terrestrial Fungi — Plant Pathogen (IPBES priority oomycete)
  { id: 'inv_phytophthora',  type: I, habitat: 'terrestrial', organism: 'fungi',  mechanic: PA, infects: 'plant', displayName: 'Sudden Oak Death',     latinName: 'Phytophthora ramorum',     description: 'An oomycete pathogen responsible for mass mortality of tanoaks, coast live oaks, and black oaks across California and Oregon. Infects over 100 host species. Spreads via water splash, contaminated nursery stock, and soil movement. The cultural significance of tanoak to Indigenous communities of the Pacific Coast makes its mortality a compounded ecological and social loss.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native plant.', count: 2 },
  // Marine Animal — Predator (IPBES Black Sea case study)
  { id: 'inv_sea_walnut',    type: I, habitat: 'marine',     organism: 'animal', locomotion: 'aquatic',      mechanic: PR, displayName: 'Sea Walnut',           latinName: 'Mnemiopsis leidyi',        description: 'A comb jelly native to Atlantic coasts of the Americas, introduced via ballast water to the Black Sea in the 1980s. Populations reached 400 million metric tons within a decade, consuming virtually all zooplankton and fish larvae. Fisheries across the Black Sea and Caspian Sea collapsed within years — a documented case in the IPBES assessment of how a single ballast water discharge can transform an entire sea.', invasiveTurnEffect: PR, invasiveTurnText: 'Remove one adjacent Native animal. Does nothing if no adjacent Native animals.', count: 2 },
  // Freshwater Animal — Predator (IPBES: largest freshwater vertebrate extinction event)
  { id: 'inv_nile_perch',    type: I, habitat: 'freshwater', organism: 'animal', locomotion: 'aquatic',      mechanic: PR, displayName: 'Nile Perch',           latinName: 'Lates niloticus',          description: 'Introduced to Lake Victoria in the 1950s, Nile perch drove the extinction of over 200 endemic cichlid fish species — the largest freshwater vertebrate extinction event caused by a single invasive species. Its introduction was framed as a fisheries development success despite the documented ecological collapse, illustrating how economic and ecological impact assessments can diverge sharply.', invasiveTurnEffect: PR, invasiveTurnText: 'Remove one adjacent Native animal. Does nothing if no adjacent Native animals.', count: 2 },
  // Terrestrial Bacteria — Pathogen (4 cards)
  { id: 'inv_xylella',       type: I, habitat: 'terrestrial', organism: 'bacteria', mechanic: PA, infects: 'plant', displayName: "Pierce's Disease",      latinName: 'Xylella fastidiosa',       description: 'A xylem-blocking bacterium transmitted by leafhoppers and sharpshooters. Responsible for Pierce\'s Disease of grapevines, citrus variegated chlorosis, and olive quick decline syndrome. Once established, infected plants cannot be cured — removal is the only management option.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native.', count: 2 },
  { id: 'inv_fire_blight',   type: I, habitat: 'terrestrial', organism: 'bacteria', mechanic: PA, infects: 'plant', displayName: 'Fire Blight',            latinName: 'Erwinia amylovora',        description: 'A highly destructive bacterial pathogen of apple, pear, and other rosaceous plants. Infected blossoms and shoots wilt rapidly, turning brown-black as if scorched — giving the disease its name. Spreads explosively during warm, wet spring weather. Causes billions in orchard losses annually worldwide.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native.', count: 2 },
  // Terrestrial Fungi — Pathogen (3 cards)
  { id: 'inv_chestnut_blight',type: I, habitat: 'terrestrial', organism: 'fungi',   mechanic: PA, infects: 'plant', displayName: 'Chestnut Blight',       latinName: 'Cryphonectria parasitica', description: 'One of the most ecologically devastating invasions in recorded history. Introduced on nursery stock from Asia around 1900, the fungus eliminated an estimated 4 billion American Chestnut trees — once a dominant canopy species — within 50 years. The canopy loss cascaded through entire forest communities.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native.', count: 2 },
  { id: 'inv_dutch_elm',     type: I, habitat: 'terrestrial', organism: 'fungi',    mechanic: PA, infects: 'plant', displayName: 'Dutch Elm Disease',      latinName: 'Ophiostoma novo-ulmi',     description: 'A vascular wilt fungus spread by elm bark beetles that decimated American Elm populations across North America and Europe throughout the 20th century. The American Elm was the signature street tree of thousands of cities; its loss fundamentally changed the urban landscape. A second, more virulent strain arrived in the 1960s.', invasiveTurnEffect: PA, invasiveTurnText: 'Spread to one adjacent empty niche, or infect and replace an adjacent Native.', count: 1 },
];

// ── CONTROLS ──────────────────────────────────────────────────────────────────
const CONTROLS = [
  // Physical Removal (8 cards — 4 techniques × 2)
  { id: 'ctrl_hand_pull',     type: C, method: ControlMethod.PHYSICAL,   displayName: 'Hand Pulling',           latinName: 'Physical Removal',  description: 'The most targeted control method — removing invasive plants individually by hand. Highly effective for small infestations and for species that cannot resprout from root fragments. Labor-intensive at scale.', actionText: 'Remove 1 terrestrial or wetland invasive plant.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  { id: 'ctrl_mowing',        type: C, method: ControlMethod.PHYSICAL,   displayName: 'Mowing',                 latinName: 'Physical Removal',  description: 'Repeated mowing or cutting can exhaust invasive plant root reserves over multiple growing seasons. Most effective when timed to prevent seed set. Must be paired with native revegetation to prevent reinvasion of disturbed soil.', actionText: 'Remove 1 terrestrial or wetland invasive plant.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  { id: 'ctrl_grazing',       type: C, method: ControlMethod.PHYSICAL,   displayName: 'Targeted Grazing',       latinName: 'Physical Removal',  description: 'Goats and other livestock are deployed to consume invasive vegetation in areas where mechanical access is difficult. Goats preferentially graze invasive plants like kudzu and multiflora rose. An increasingly popular precision management tool.', actionText: 'Remove 1 terrestrial or wetland invasive plant.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  { id: 'ctrl_electrofishing', type: C, method: ControlMethod.PHYSICAL,  displayName: 'Electrofishing',         latinName: 'Physical Removal',  description: 'An electric current temporarily stuns fish, allowing biologists to net and remove invasive individuals. Used to selectively target invasive fish species in lakes and rivers. Requires specialized equipment and trained crews.', actionText: 'Remove 1 freshwater invasive animal.', targetOrganisms: ['animal'], targetHabitats: ['freshwater'], count: 2 },
  // Chemical Control (8 cards — 4 compounds × 2)
  { id: 'ctrl_glyphosate',    type: C, method: ControlMethod.CHEMICAL,   displayName: 'Glyphosate',             latinName: 'Chemical Control',  description: 'The world\'s most widely used herbicide, disrupting the shikimate pathway in plants. Highly effective against most broadleaf invasives and grasses. Non-selective — kills most plants it contacts. Ongoing research examines effects on soil microbiomes and non-target organisms.', actionText: 'Remove up to 3 terrestrial or wetland invasive plants. 50% chance of herbicide drift — kills 1 nearby native plant as collateral (75% in wetland niches due to runoff risk).', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  { id: 'ctrl_triclopyr',     type: C, method: ControlMethod.CHEMICAL,   displayName: 'Triclopyr',              latinName: 'Chemical Control',  description: 'A selective herbicide targeting broadleaf plants while generally leaving grasses unaffected. Particularly effective against woody invasives like Tree-of-Heaven and multiflora rose. Frequently applied via basal bark treatment or cut-stump application to minimize spray drift.', actionText: 'Remove up to 3 terrestrial or wetland invasive plants. 50% chance of herbicide drift — kills 1 nearby native plant as collateral (75% in wetland niches due to runoff risk).', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  { id: 'ctrl_imazapyr',      type: C, method: ControlMethod.CHEMICAL,   displayName: 'Imazapyr',               latinName: 'Chemical Control',  description: 'A broad-spectrum herbicide with soil activity that prevents regrowth for extended periods. Approved for aquatic use, making it one of few options for emergent invasive plants. Its aquatic-approved formulation minimizes runoff risk.', actionText: 'Remove up to 3 terrestrial, wetland, or freshwater invasive plants. 50% chance of herbicide drift — kills 1 nearby native plant as collateral.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland', 'freshwater'], count: 2 },
  { id: 'ctrl_aminopyralid',  type: C, method: ControlMethod.CHEMICAL,   displayName: 'Aminopyralid',           latinName: 'Chemical Control',  description: 'A highly selective synthetic auxin herbicide targeting legumes and composites. Particularly effective against invasive clovers, thistles, and knapweeds. Can persist in plant material and manure, potentially damaging native garden plants when compost is used.', actionText: 'Remove up to 3 terrestrial or wetland invasive plants. 50% chance of herbicide drift — kills 1 nearby native plant as collateral (75% in wetland niches due to runoff risk).', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], count: 2 },
  // Biological Control (5 cards — species-specific agents)
  { id: 'ctrl_aphalara',      type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Aphalara itadori',       latinName: 'Biological Control', description: 'A psyllid (jumping plant louse) from Japan, the first approved biocontrol agent for Japanese Knotweed in Europe. It feeds exclusively on knotweed phloem sap, stunting growth. Host-specificity testing took over a decade of safety review before release was authorized.', actionText: 'Remove ALL Japanese Knotweed from the field. Only works on Japanese Knotweed.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial'], targetSpecies: ['inv_knotweed'], count: 1 },
  { id: 'ctrl_neochetina',    type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Neochetina eichhorniae', latinName: 'Biological Control', description: 'A weevil from South America that feeds specifically on Water Hyacinth, mining leaves and consuming roots. One of the most successful biocontrol programs in history, dramatically reducing water hyacinth infestations in Africa and Australia. Both larval and adult stages damage the target plant.', actionText: 'Remove ALL Water Hyacinth from the field. Only works on Water Hyacinth.', targetOrganisms: ['plant'], targetHabitats: ['freshwater', 'wetland'], targetSpecies: ['inv_water_hyacinth'], count: 1 },
  { id: 'ctrl_galerucella',   type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Galerucella calmariensis', latinName: 'Biological Control', description: 'A leaf-eating beetle native to Europe, approved in the US and Canada for biocontrol of Purple Loosestrife. It defoliates target plants repeatedly over the growing season, dramatically reducing seed production and root reserves. One of the earliest and best-documented wetland biocontrol successes.', actionText: 'Remove ALL Purple Loosestrife from the field. Only works on Purple Loosestrife.', targetOrganisms: ['plant'], targetHabitats: ['wetland'], targetSpecies: ['inv_loosestrife'], count: 1 },
  { id: 'ctrl_eab_parasitoids',type: C, method: ControlMethod.BIOLOGICAL, displayName: 'EAB Parasitoid Wasps', latinName: 'Spathius agrili / Tetrastichus planipennisi', description: 'Three parasitoid wasp species from China and Russia were approved for release against Emerald Ash Borer following over a decade of host-specificity testing. Oobius agrili attacks eggs; Spathius agrili and Tetrastichus planipennisi attack larvae. Population establishment has been documented at multiple US sites, with evidence of reduced EAB density in some areas.', actionText: 'Remove ALL Emerald Ash Borer from the field. Only works on Emerald Ash Borer.', targetOrganisms: ['animal'], targetHabitats: ['terrestrial'], targetSpecies: ['inv_eab'], count: 1 },
  { id: 'ctrl_milfoil_weevil',type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Milfoil Weevil',         latinName: 'Euhrychiopsis lecontei', description: 'A native North American weevil whose larvae mine the stems of Eurasian Watermilfoil, causing fragmentation and population collapse. Unlike introduced biocontrol agents, it is already present in many lakes and can be augmented through targeted stocking programs. One of the few native organisms that selectively attacks an aquatic invasive.', actionText: 'Remove ALL Eurasian Watermilfoil from the field. Only works on Eurasian Watermilfoil.', targetOrganisms: ['plant'], targetHabitats: ['freshwater', 'wetland'], targetSpecies: ['inv_watermilfoil'], count: 1 },
  { id: 'ctrl_rose_rosette',  type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Rose Rosette Virus',     latinName: 'Biological Control', description: 'A naturally occurring plant virus vectored by the eriophyid mite Phyllocoptes fructiphylus that causes rapid, lethal disease in multiflora rose while leaving most native rose relatives unaffected. Being actively studied as a classical biological control agent. Infected plants die within 1–5 years.', actionText: 'Remove ALL Multiflora Rose from the field. Only works on Multiflora Rose.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial', 'wetland'], targetSpecies: ['inv_multiflora'], count: 1 },
  { id: 'ctrl_verticillium', type: C, method: ControlMethod.BIOLOGICAL, displayName: 'Verticillium Wilt',        latinName: 'Verticillium nonalfalfae', description: 'A soil-borne vascular wilt pathogen under active investigation as an augmentative biological control agent for Tree-of-Heaven. Infecting through root contact and wounds, it colonizes the xylem and causes rapid systemic wilting and mortality in Ailanthus altissima. Host specificity trials have demonstrated negligible pathogenicity to native tree species. Candidate for EPA registration as a mycoherbicide — one of the most promising targeted biocontrol tools for landscape-scale Ailanthus management.', actionText: 'Remove ALL Tree-of-Heaven from the field. Only works on Tree-of-Heaven.', targetOrganisms: ['plant'], targetHabitats: ['terrestrial'], targetSpecies: ['inv_treeofheaven'], count: 1 },
  // Prescribed Fire (2 cards)
  { id: 'ctrl_dormant_burn',  type: C, method: ControlMethod.FIRE,       displayName: 'Dormant Season Burn',   latinName: 'Prescribed Fire',   description: 'Prescribed fire conducted during late fall or winter when native vegetation is dormant. Many native plants resprout vigorously from root crowns following fire, while many non-fire-tolerant invasives suffer significant mortality. The timing limits smoke production and wind-driven spread.', actionText: 'Remove all terrestrial Invasives and terrestrial pathogens from the field.', count: 1 },
  { id: 'ctrl_growing_burn',  type: C, method: ControlMethod.FIRE,       displayName: 'Growing Season Burn',   latinName: 'Prescribed Fire',   description: 'Higher-intensity prescribed burns conducted during the growing season target invasive plants during their period of maximum resource allocation to above-ground growth. Particularly effective against cool-season invasive grasses. Requires more precise weather conditions and trained fire crews.', actionText: 'Remove all terrestrial Invasives and terrestrial pathogens from the field.', count: 1 },
  // Aquatic Management (4 cards — 2 techniques × 2)
  { id: 'ctrl_drawdown',      type: C, method: ControlMethod.AQUATIC,    displayName: 'Water Level Drawdown',  latinName: 'Aquatic Management', description: 'Deliberately lowering reservoir or pond water levels exposes and desiccates invasive aquatic plants and, in winter, freezes invasive fish eggs. One of the most effective large-scale aquatic invasive plant management tools when water control structures are available. Also disrupts invasive crayfish populations.', actionText: 'Remove up to 3 freshwater or wetland Invasives. One nearby Native is lost as collateral.', targetHabitats: ['freshwater', 'wetland'], count: 2 },
  { id: 'ctrl_rotenone',      type: C, method: ControlMethod.AQUATIC,    displayName: 'Rotenone Treatment',    latinName: 'Aquatic Management', description: 'A naturally derived piscicide from the derris plant root, used to remove entire fish communities when invasive species have become established. Non-selective — kills all gill-breathing organisms including native fish, requiring full restocking after treatment. Breaks down within days in water.', actionText: 'Remove up to 3 freshwater or wetland invasive animals. One nearby Native is lost as collateral.', targetOrganisms: ['animal'], targetHabitats: ['freshwater', 'wetland'], count: 2 },
  // Marine Removal (2 cards)
  { id: 'ctrl_targeted_fishing', type: C, method: ControlMethod.PHYSICAL, displayName: 'Targeted Culling',     latinName: 'Marine Removal',    description: 'Coordinated diver-based spearfishing and cage-trapping programs targeting marine invasives. Lionfish culling derbies have demonstrated significant local population reduction at reef sites. Green crab trap programs are used in eelgrass restoration areas. Requires trained divers and ongoing effort — populations rebound without sustained pressure.', actionText: 'Remove 1 marine invasive animal.', targetOrganisms: ['animal'], targetHabitats: ['marine'], count: 2 },
  // Quarantine Cut (2 cards)
  { id: 'ctrl_quarantine_cut',   type: C, method: ControlMethod.QUARANTINE, displayName: 'Quarantine Cut',     latinName: 'Sanitation Felling', description: 'A forestry sanitation technique used to halt pathogen spread by felling infected trees and a buffer zone of adjacent hosts. Applied against Dutch Elm Disease, Sudden Oak Death, Fire Blight, and chytrid fungus. The buffer zone reflects that pathogens in adjacent niches are likely already cross-infecting through spore dispersal, root grafts, or contaminated water movement.', actionText: 'Remove 1 pathogen (bacteria or fungi). If adjacent niches also contain pathogens, they are removed too — the sanitation zone extends to all connected infected niches.', targetOrganisms: ['bacteria', 'fungi'], count: 2 },
];

// ── EVENTS ────────────────────────────────────────────────────────────────────
const EVENTS = [
  { id: 'wildfire',         type: E, displayName: 'Wildfire!',          latinName: 'Disturbance Event',  description: 'An uncontrolled fire ignited by lightning or human activity sweeps through the landscape. While fire is a natural ecological process to which many native species are adapted, high-severity fires driven by invasive grass fuels can eliminate native plant communities and reset decades of succession.', actionText: 'Remove ALL cards from terrestrial and wetland niches immediately.', count: 1 },
  { id: 'drought',          type: E, displayName: 'Drought!',           latinName: 'Disturbance Event',  description: 'Prolonged drought stresses aquatic ecosystems, shrinking and fragmenting water bodies. Native freshwater species adapted to stable conditions suffer population crashes. Drought conditions are increasing in frequency and severity due to climate change, often interacting synergistically with invasive species pressure.', actionText: 'Remove all Native cards from freshwater and wetland niches immediately.', count: 1 },
  { id: 'algal_bloom',      type: E, displayName: 'Harmful Algal Bloom!', latinName: 'Disturbance Event', description: 'Nutrient runoff from agriculture and urban areas triggers explosive growth of toxic cyanobacteria. The resulting hypoxic "dead zone" depletes dissolved oxygen, causing mass mortality of native fish and invertebrates. Invasive aquatic plants, many of which are more tolerant of eutrophication, often expand into the vacuum left behind.', actionText: 'Remove all Native animals from freshwater and wetland niches immediately.', count: 1 },
  { id: 'storm_surge',      type: E, displayName: 'Storm Surge!',       latinName: 'Disturbance Event',  description: 'An intense coastal storm drives a wall of seawater inland, inundating marine and estuarine habitats with destructive force. The physical disturbance scours substrates, uproots seagrasses, and buries coral recruits. Storm surges are increasing in intensity as sea surface temperatures rise, and can displace both native and invasive marine communities indiscriminately.', actionText: 'Remove ALL cards from marine and brackish niches immediately.', count: 1 },
  { id: 'pest_outbreak',    type: E, displayName: 'Invasive Pest Outbreak!', latinName: 'Disturbance Event', description: 'A new invasive insect or plant pathogen arrives via the horticultural trade, international shipping, or accidental transport. Spotted Lanternfly, Emerald Ash Borer, and Sudden Oak Death all followed this pathway. In the absence of co-evolved predators or pathogens, the new arrival spreads unchecked across the landscape.', actionText: 'Draw until 2 terrestrial Invasives are found; place both immediately. Others discarded.', count: 1 },
  { id: 'restoration_grant',type: E, displayName: 'Restoration Grant!', latinName: 'Conservation Event', description: 'A conservation organization or government agency awards funding for ecological restoration. Crews remove invasive species, reintroduce native plants and animals, and restore hydrological connectivity. Restoration success stories are possible even in heavily invaded landscapes — but sustained investment is required to prevent reinvasion.', actionText: 'Return 2 random Native cards from the discard pile to open niches on the field.', count: 1 },
];

const MAX_ROUNDS = 10;
let GRID_SIZE = 10;  // updated at game start from selector
let HAND_SIZE = 10;  // always equals GRID_SIZE

function computeStartingPositions(n) {
  const all = [];
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      all.push([r, c]);
  return shuffle(all).slice(0, n);
}

const Phase = { SETUP: 'setup', PLAYER_DRAW: 'player_draw', PLAYER_PLAY: 'player_play', PLAYER_REFILL: 'player_refill', NATIVE_TURN: 'native_turn', INVASIVE_TURN: 'invasive_turn', ROUND_END: 'round_end', GAME_OVER: 'game_over' };

// Build deck filtered to only include cards whose habitat can appear in this ecosystem
function buildDeck(nicheHabitat, gridSize) {
  const presentHabitats = new Set();
  for (let r = 0; r < gridSize; r++)
    for (let c = 0; c < gridSize; c++)
      presentHabitats.add(nicheHabitat[r][c]);

  const deck = [];
  for (const card of [...NATIVES, ...INVASIVES, ...CONTROLS, ...EVENTS]) {
    if (card.habitat) {
      const fits = [...presentHabitats].some(niche => habitatCompatible(card.habitat, niche));
      if (!fits) continue;
    }
    for (let i = 0; i < card.count; i++) deck.push({ ...card, uid: `${card.id}_${i}` });
  }
  return deck;
}

// ─── ENGINE ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function createGameState(playerCount, gridSize, ecosystemType) {
  return {
    phase: Phase.SETUP,
    round: 1,
    activePlayerIndex: 0,
    firstPlayerIndex: 0,
    playerCount,
    gridSize,
    ecosystemType,
    players: Array.from({ length: playerCount }, (_, i) => ({ id: i, name: `Player ${i + 1}`, hand: [] })),
    field: Array.from({ length: gridSize }, () => Array(gridSize).fill(null)),
    nicheHabitat: null,  // filled in setupGame
    deck: [],
    discard: [],
    log: [],
    score: 0,
    winner: null,
  };
}

// ── Habitat helpers ──────────────────────────────────────────────────────────

function habitatCompatible(cardHabitat, nicheHabitat) {
  if (cardHabitat === nicheHabitat) return true;
  // Wetland niches accept terrestrial and freshwater cards (transitional zone)
  if (nicheHabitat === 'wetland' && (cardHabitat === 'terrestrial' || cardHabitat === 'freshwater')) return true;
  // Brackish niches accept freshwater and marine cards (estuarine transition)
  if (nicheHabitat === 'brackish' && (cardHabitat === 'freshwater' || cardHabitat === 'marine')) return true;
  return false;
}

// ── Procedural ecosystem layout generators ────────────────────────────────────

function fillMap(n, h) { return Array.from({ length: n }, () => Array(n).fill(h)); }
function rnd(lo, hi)   { return lo + Math.random() * (hi - lo); }
function irnd(lo, hi)  { return Math.floor(rnd(lo, hi + 1)); }

// Straight or diagonal river through terrestrial
function layoutRiver(n) {
  const map = fillMap(n, 'terrestrial');
  const vertical = Math.random() < 0.5;
  const pos  = Math.floor(n * rnd(0.25, 0.75));
  const half = Math.max(1, Math.floor(n * rnd(0.06, 0.13)));
  const wet  = Math.max(1, Math.floor(n * 0.07));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const dist = Math.abs((vertical ? c : r) - pos);
      if (dist <= half) map[r][c] = 'freshwater';
      else if (dist <= half + wet) map[r][c] = 'wetland';
    }
  return map;
}

// Sinuous river that meanders left/right as it flows top-to-bottom
function layoutMeanderingRiver(n) {
  const map = fillMap(n, 'terrestrial');
  let cx = Math.floor(n * rnd(0.3, 0.7));
  const half = Math.max(1, Math.floor(n * 0.07));
  const wet  = Math.max(1, Math.floor(n * 0.06));
  for (let r = 0; r < n; r++) {
    cx = Math.max(half + wet, Math.min(n - 1 - half - wet, cx + irnd(-1, 1)));
    for (let c = 0; c < n; c++) {
      const d = Math.abs(c - cx);
      if (d <= half) map[r][c] = 'freshwater';
      else if (d <= half + wet) map[r][c] = 'wetland';
    }
  }
  return map;
}

// Freshwater lake with wetland shore, surrounded by terrestrial
function layoutLake(n) {
  const map = fillMap(n, 'terrestrial');
  const cx = Math.floor(n * rnd(0.3, 0.7));
  const cy = Math.floor(n * rnd(0.3, 0.7));
  const r1 = Math.max(1, Math.floor(n * rnd(0.12, 0.24)));
  const r2 = r1 + Math.max(1, Math.floor(n * 0.07));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const d = Math.hypot(c - cx, r - cy);
      if (d <= r1) map[r][c] = 'freshwater';
      else if (d <= r2) map[r][c] = 'wetland';
    }
  return map;
}

// Marine coastline along one edge with brackish then wetland transition, terrestrial inland
function layoutCoastal(n) {
  const map = fillMap(n, 'terrestrial');
  const edge   = irnd(0, 3);  // 0=top 1=bottom 2=left 3=right
  const mDepth = Math.max(1, Math.floor(n * rnd(0.15, 0.28)));
  const bDepth = Math.max(1, Math.floor(n * 0.06));
  const wDepth = Math.max(1, Math.floor(n * 0.07));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const dist = edge === 0 ? r : edge === 1 ? n - 1 - r : edge === 2 ? c : n - 1 - c;
      if (dist < mDepth) map[r][c] = 'marine';
      else if (dist < mDepth + bDepth) map[r][c] = 'brackish';
      else if (dist < mDepth + bDepth + wDepth) map[r][c] = 'wetland';
    }
  return map;
}

// Freshwater river from one edge meeting marine sea at the other (estuary)
function layoutEstuary(n) {
  const map = fillMap(n, 'terrestrial');
  const mRows  = Math.max(1, Math.floor(n * rnd(0.15, 0.28)));
  const bRows  = Math.max(1, Math.floor(n * 0.07));  // brackish transition
  const wRows  = Math.max(1, Math.floor(n * 0.08));
  const rCol   = Math.floor(n * rnd(0.25, 0.75));
  const rHalf  = Math.max(1, Math.floor(n * 0.08));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      if (r >= n - mRows) { map[r][c] = 'marine'; continue; }
      if (r >= n - mRows - bRows) { map[r][c] = 'brackish'; continue; }
      if (r >= n - mRows - bRows - wRows) { map[r][c] = 'wetland'; continue; }
      const d = Math.abs(c - rCol);
      if (d <= rHalf) map[r][c] = 'freshwater';
      else if (d <= rHalf + 1) map[r][c] = 'wetland';
    }
  return map;
}

// Terrestrial island in the middle of a marine sea with wetland shoreline
function layoutIsland(n) {
  const map = fillMap(n, 'marine');
  const cx = n / 2 + (Math.random() - 0.5) * n * 0.2;
  const cy = n / 2 + (Math.random() - 0.5) * n * 0.2;
  const r1 = Math.max(1, Math.floor(n * rnd(0.15, 0.27)));
  const r2 = r1 + Math.max(1, Math.floor(n * 0.07));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++) {
      const d = Math.hypot(c - cx, r - cy);
      if (d <= r1) map[r][c] = 'terrestrial';
      else if (d <= r2) map[r][c] = 'wetland';
    }
  return map;
}

// Large central wetland marsh with terrestrial edges and freshwater pockets
function layoutMarsh(n) {
  const map = fillMap(n, 'terrestrial');
  const r1 = Math.max(1, Math.floor(n * rnd(0.22, 0.38)));
  for (let r = 0; r < n; r++)
    for (let c = 0; c < n; c++)
      if (Math.hypot(c - n / 2, r - n / 2) <= r1) map[r][c] = 'wetland';
  const ponds = irnd(1, 3);
  for (let i = 0; i < ponds; i++) {
    const px = Math.floor(n * rnd(0.3, 0.7));
    const py = Math.floor(n * rnd(0.3, 0.7));
    const pr = Math.max(1, Math.floor(n * 0.06));
    for (let r = 0; r < n; r++)
      for (let c = 0; c < n; c++)
        if (map[r][c] === 'wetland' && Math.hypot(c - px, r - py) <= pr)
          map[r][c] = 'freshwater';
  }
  return map;
}

// River widens into a delta as it meets the sea
function layoutDelta(n) {
  const map = fillMap(n, 'terrestrial');
  const mRows = Math.max(1, Math.floor(n * rnd(0.18, 0.30)));
  const bRows = Math.max(1, Math.floor(n * 0.06));  // brackish where river fans into sea
  const wRows = Math.max(1, Math.floor(n * 0.07));
  for (let r = n - mRows; r < n; r++)
    for (let c = 0; c < n; c++) map[r][c] = 'marine';
  for (let r = n - mRows - bRows; r < n - mRows; r++)
    for (let c = 0; c < n; c++) map[r][c] = 'brackish';
  for (let r = n - mRows - bRows - wRows; r < n - mRows - bRows; r++)
    for (let c = 0; c < n; c++) map[r][c] = 'wetland';
  const rCol = Math.floor(n * rnd(0.3, 0.7));
  const rHalf0 = Math.max(1, Math.floor(n * 0.05));
  for (let r = 0; r < n - mRows - wRows; r++) {
    const t = r / (n - mRows - wRows);
    const half = Math.floor(rHalf0 + t * n * 0.16);
    const wet  = Math.max(1, Math.floor(n * 0.05));
    for (let c = 0; c < n; c++) {
      const d = Math.abs(c - rCol);
      if (d <= half) map[r][c] = 'freshwater';
      else if (d <= half + wet) map[r][c] = 'wetland';
    }
  }
  return map;
}

const MIXED_LAYOUTS = [
  { fn: layoutRiver,           name: 'River Valley',     value: 'river_valley' },
  { fn: layoutRiver,           name: 'River Valley',     value: 'river_valley' },
  { fn: layoutRiver,           name: 'River Valley',     value: 'river_valley' },
  { fn: layoutMeanderingRiver, name: 'Meandering River', value: 'meandering_river' },
  { fn: layoutMeanderingRiver, name: 'Meandering River', value: 'meandering_river' },
  { fn: layoutLake,            name: 'Glacial Lake',     value: 'glacial_lake' },
  { fn: layoutCoastal,         name: 'Coastal Margin',   value: 'coastal_margin' },
  { fn: layoutEstuary,         name: 'Estuary',          value: 'estuary' },
  { fn: layoutIsland,          name: 'Island',           value: 'island' },
  { fn: layoutMarsh,           name: 'Wetland Marsh',    value: 'wetland_marsh' },
  { fn: layoutDelta,           name: 'River Delta',      value: 'river_delta' },
];

const UNIFORM_LAYOUTS = {
  terrestrial: 'Terrestrial',
  freshwater:  'Freshwater',
  marine:      'Marine',
  wetland:     'Wetland',
};

function generateHabitatMap(n, type) {
  // Uniform single-habitat ecosystems
  if (UNIFORM_LAYOUTS[type]) {
    const map = fillMap(n, type);
    map.layoutName = UNIFORM_LAYOUTS[type];
    return map;
  }
  // Specific named mixed layout
  const named = MIXED_LAYOUTS.find(l => l.value === type);
  if (named) {
    const map = named.fn(n);
    map.layoutName = named.name;
    return map;
  }
  // Random (type === 'random' or anything unrecognised)
  const chosen = MIXED_LAYOUTS[Math.floor(Math.random() * MIXED_LAYOUTS.length)];
  const map = chosen.fn(n);
  map.layoutName = chosen.name;
  return map;
}

// Returns a short display label for a card (for log messages)
function cardName(card) {
  if (card.mechanic) return `${card.displayName} (${MECHANIC_LABELS[card.mechanic] || card.mechanic})`;
  return card.displayName || card.name || 'Unknown';
}

// Returns an ecologically appropriate placement verb for a native card
function placementVerb(card) {
  switch (card.organism) {
    case 'animal':   return card.habitat === 'marine' || card.habitat === 'freshwater' ? 'release' : 'introduce';
    case 'fungi':    return 'inoculate';
    case 'bacteria': return 'inoculate';
    case 'plant':
    default:
      return card.habitat === 'marine' || card.habitat === 'freshwater' ? 'transplant' : 'plant';
  }
}

// Returns true if the given invasive card is immune to the given control method (method-level only)
function isImmuneToControl(card, method) {
  if (method === ControlMethod.PHYSICAL   && ['bacteria', 'fungi'].includes(card.organism)) return true;
  if (method === ControlMethod.CHEMICAL   && card.organism !== 'plant') return true;
  if (method === ControlMethod.BIOLOGICAL && card.organism !== 'plant') return true;
  if (method === ControlMethod.FIRE       && card.habitat !== 'terrestrial') return true;
  if (method === ControlMethod.AQUATIC    && (card.habitat === 'terrestrial' || card.habitat === 'marine')) return true;
  if (method === ControlMethod.QUARANTINE && !['bacteria', 'fungi'].includes(card.organism)) return true;
  return false;
}

// Returns true if the specific control card can legally target the given invasive card
function canControlTarget(controlCard, invasiveCard) {
  if (controlCard.targetOrganisms && !controlCard.targetOrganisms.includes(invasiveCard.organism)) return false;
  if (controlCard.targetHabitats  && !controlCard.targetHabitats.includes(invasiveCard.habitat))  return false;
  if (controlCard.targetSpecies   && !controlCard.targetSpecies.includes(invasiveCard.id))         return false;
  if (isImmuneToControl(invasiveCard, controlCard.method)) return false;
  return true;
}

// Produces the CSS class name for a card face background
function cardFaceClass(card) {
  if (card.type === CardType.NATIVE)   return `face-native-${card.habitat}`;
  if (card.type === CardType.INVASIVE) return `face-invasive-${card.habitat}`;
  if (card.type === CardType.CONTROL)  return `face-control-${card.method}`;
  if (card.type === CardType.EVENT)    return `face-event-${card.id}`;
  return 'face-event';
}

// Builds a DOM element representing the card face (replaces <img>)
function createCardFaceEl(card) {
  const face = document.createElement('div');
  face.className = `card-face ${cardFaceClass(card)}`;

  if (card.type === CardType.NATIVE || card.type === CardType.INVASIVE) {
    const top = document.createElement('div');
    top.className = 'cf-top';
    top.textContent = `${HABITAT_ICONS[card.habitat] || ''} ${card.habitat ? card.habitat.toUpperCase() : ''}`;
    face.appendChild(top);

    const mid = document.createElement('div');
    mid.className = 'cf-mid';
    const icon = document.createElement('span');
    icon.className = 'cf-icon';
    icon.textContent = ORGANISM_ICONS[card.organism] || '';
    mid.appendChild(icon);
    const nameLabel = document.createElement('span');
    nameLabel.className = 'cf-name';
    nameLabel.textContent = card.displayName || '';
    mid.appendChild(nameLabel);
    face.appendChild(mid);

    const bot = document.createElement('div');
    bot.className = 'cf-bot';
    if (card.mechanic) {
      const badge = document.createElement('span');
      badge.className = `mechanic-badge mechanic-${card.mechanic}`;
      badge.textContent = (MECHANIC_LABELS[card.mechanic] || card.mechanic).toUpperCase();
      bot.appendChild(badge);
    } else if (card.nativeMechanic) {
      const badge = document.createElement('span');
      badge.className = `mechanic-badge native-mechanic-${card.nativeMechanic}`;
      badge.textContent = (NATIVE_MECHANIC_LABELS[card.nativeMechanic] || card.nativeMechanic).toUpperCase();
      bot.appendChild(badge);
    } else {
      const lbl = document.createElement('span');
      lbl.className = 'cf-status';
      lbl.textContent = 'NATIVE';
      bot.appendChild(lbl);
    }
    face.appendChild(bot);

  } else if (card.type === CardType.CONTROL) {
    const top = document.createElement('div');
    top.className = 'cf-top';
    top.textContent = '🛡 CONTROL';
    face.appendChild(top);
    const mid = document.createElement('div');
    mid.className = 'cf-mid cf-mid-label';
    mid.textContent = card.displayName || card.name;
    face.appendChild(mid);

  } else if (card.type === CardType.EVENT) {
    const top = document.createElement('div');
    top.className = 'cf-top';
    top.textContent = '⚡ EVENT';
    face.appendChild(top);
    const mid = document.createElement('div');
    mid.className = 'cf-mid cf-mid-label';
    mid.textContent = card.displayName || card.name;
    face.appendChild(mid);
  }

  return face;
}

function addLog(state, msg, sourceId = null) { state.log.push({ text: msg, sourceId }); }

function drawCard(state) {
  if (state.deck.length === 0) {
    if (state.discard.length === 0) return null;
    // Events are removed from the game on reshuffle so they don't repeat
    state.deck = shuffle(state.discard.filter(c => c.type !== CardType.EVENT));
    state.discard = state.discard.filter(c => c.type === CardType.EVENT);
    addLog(state, 'Deck exhausted — reshuffling discard pile.');
  }
  return state.deck.pop();
}

function setCell(state, r, c, card) { state.field[r][c] = card; }

function getAdjacentCells(r, c) {
  const cells = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) cells.push([nr, nc]);
    }
  return cells;
}

function fieldCards(state) {
  const cards = [];
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (state.field[r][c]) cards.push({ card: state.field[r][c], row: r, col: c });
  return cards;
}

function openCells(state) {
  const cells = [];
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (!state.field[r][c]) cells.push([r, c]);
  return cells;
}

function nativeCells(state)  { return fieldCards(state).filter(({ card }) => card.type === CardType.NATIVE); }
function invasiveCells(state){ return fieldCards(state).filter(({ card }) => card.type === CardType.INVASIVE); }
function activePlayer(state) { return state.players[state.activePlayerIndex]; }

function choosePlacementCell(state, card) {
  const center = (GRID_SIZE - 1) / 2;
  const distToCenter = (r, c) => Math.abs(r - center) + Math.abs(c - center);
  const adjacentNativeCount = (r, c) => getAdjacentCells(r, c).filter(([ar, ac]) => state.field[ar][ac]?.type === CardType.NATIVE).length;
  const compatible = (r, c) => !card || !card.habitat || habitatCompatible(card.habitat, state.nicheHabitat[r][c]);

  let candidates = openCells(state).filter(([r, c]) => compatible(r, c))
    .map(([r, c]) => ({ r, c, dist: distToCenter(r, c), natives: adjacentNativeCount(r, c) }));
  if (candidates.length === 0) {
    candidates = nativeCells(state).filter(({ row: r, col: c }) => compatible(r, c))
      .map(({ row: r, col: c }) => ({ r, c, dist: distToCenter(r, c), natives: adjacentNativeCount(r, c), isReplace: true }));
  }
  // Fall back to any cell if no compatible niche available (invasive is adaptable)
  if (candidates.length === 0) {
    candidates = openCells(state).map(([r, c]) => ({ r, c, dist: distToCenter(r, c), natives: adjacentNativeCount(r, c) }));
  }
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a.dist - b.dist || b.natives - a.natives);
  return candidates[0];
}

function placeInvasive(state, card) {
  const compatible = openCells(state).filter(([r, c]) =>
    !card.habitat || habitatCompatible(card.habitat, state.nicheHabitat[r][c])
  );
  // Fall back to displacing a native if no open compatible cell exists
  if (compatible.length === 0) {
    const target = choosePlacementCell(state, card);
    if (!target) { state.discard.push(card); addLog(state, `No valid placement for ${cardName(card)}.`); return; }
    const replaced = state.field[target.r][target.c];
    addLog(state, `${cardName(card)} displaces ${cardName(replaced)}.`, card.uid);
    state.discard.push(replaced);
    setCell(state, target.r, target.c, card);
  } else {
    const [r, c] = compatible[Math.floor(Math.random() * compatible.length)];
    addLog(state, `${cardName(card)} establishes in a ${getNicheDisplayName(state, r, c)} niche.`, card.uid);
    setCell(state, r, c, card);
  }
  checkLossCondition(state);
}

function resolveEvent(state, card) {
  state.discard.push(card);
  if (card.id === 'wildfire') {
    const affected = fieldCards(state).filter(({ row: r, col: c }) =>
      ['terrestrial', 'wetland'].includes(state.nicheHabitat[r][c]));
    for (const { row, col, card: fc } of affected) { state.discard.push(fc); setCell(state, row, col, null); }
    addLog(state, `⚡ WILDFIRE! ${affected.length} cards swept from terrestrial and wetland niches!`, card.uid);
    // Post-fire recolonization: fire-adapted invasive facilitators resprout from surviving propagules
    const fireAdapted = state.discard.filter(c =>
      c.type === CardType.INVASIVE && (c.fireSurvival || 0) >= 0.5 && c.mechanic === FT);
    let respawned = 0;
    for (const inv of [...fireAdapted]) {
      if (Math.random() < (inv.fireSurvival || 0)) {
        const open = openCells(state).filter(([r, c]) => habitatCompatible(inv.habitat, state.nicheHabitat[r][c]));
        if (open.length > 0) {
          const [r, c] = open[Math.floor(Math.random() * open.length)];
          const idx = state.discard.indexOf(inv);
          state.discard.splice(idx, 1);
          setCell(state, r, c, inv);
          addLog(state, `🔥 ${cardName(inv)} resprouts from surviving propagules — exploiting post-fire bare ground.`, inv.id);
          respawned++;
        }
      }
    }
    if (respawned > 0) checkLossCondition(state);

  } else if (card.id === 'drought') {
    const affected = fieldCards(state).filter(({ card: fc, row: r, col: c }) =>
      fc.type === CardType.NATIVE && ['freshwater', 'wetland'].includes(state.nicheHabitat[r][c]));
    for (const { row, col, card: fc } of affected) { state.discard.push(fc); setCell(state, row, col, null); }
    addLog(state, `🌵 DROUGHT! ${affected.length} native freshwater and wetland populations collapse!`, card.uid);

  } else if (card.id === 'algal_bloom') {
    const affected = fieldCards(state).filter(({ card: fc, row: r, col: c }) =>
      fc.type === CardType.NATIVE && fc.organism === 'animal' &&
      ['freshwater', 'wetland'].includes(state.nicheHabitat[r][c]));
    for (const { row, col, card: fc } of affected) { state.discard.push(fc); setCell(state, row, col, null); }
    if (affected.length > 0)
      addLog(state, `🦠 HARMFUL ALGAL BLOOM! Hypoxia kills ${affected.length} native freshwater animal population${affected.length !== 1 ? 's' : ''}!`, card.uid);
    else
      addLog(state, `🦠 HARMFUL ALGAL BLOOM! No native freshwater animals remain to be affected.`, card.uid);

  } else if (card.id === 'storm_surge') {
    const affected = fieldCards(state).filter(({ row: r, col: c }) =>
      ['marine', 'brackish'].includes(state.nicheHabitat[r][c]));
    for (const { row, col, card: fc } of affected) { state.discard.push(fc); setCell(state, row, col, null); }
    if (affected.length > 0)
      addLog(state, `🌊 STORM SURGE! ${affected.length} cards scoured from marine and brackish niches!`, card.uid);
    else
      addLog(state, `🌊 STORM SURGE! No marine or brackish niches present — disturbance passes offshore.`, card.uid);

  } else if (card.id === 'pest_outbreak') {
    let placed = 0;
    const skipped = [];
    for (let attempt = 0; attempt < 2; attempt++) {
      let found = false;
      while (state.deck.length > 0 || state.discard.length > 0) {
        const drawn = drawCard(state);
        if (!drawn) break;
        if (drawn.type === CardType.INVASIVE && drawn.habitat === 'terrestrial') {
          placeInvasive(state, drawn); placed++; found = true; break;
        }
        skipped.push(drawn);
      }
      if (!found) break;
    }
    for (const c of skipped) state.discard.push(c);
    if (placed > 0)
      addLog(state, `🐛 INVASIVE PEST OUTBREAK! ${placed} new terrestrial invader${placed !== 1 ? 's arrive' : ' arrives'} on the landscape!`, card.uid);
    else
      addLog(state, `🐛 INVASIVE PEST OUTBREAK! No terrestrial invasives remain in the deck.`, card.uid);

  } else if (card.id === 'restoration_grant') {
    let placed = 0;
    for (let i = 0; i < 2; i++) {
      const candidates = state.discard.filter(c => c.type === CardType.NATIVE);
      if (candidates.length === 0) break;
      const native = candidates[Math.floor(Math.random() * candidates.length)];
      const compatibleOpen = openCells(state).filter(([r, c]) =>
        habitatCompatible(native.habitat, state.nicheHabitat[r][c]));
      if (compatibleOpen.length === 0) break;
      const idx = state.discard.indexOf(native);
      state.discard.splice(idx, 1);
      const [r, c] = compatibleOpen[Math.floor(Math.random() * compatibleOpen.length)];
      setCell(state, r, c, native);
      addLog(state, `🌱 Restoration Grant — ${cardName(native)} reestablished in a ${getNicheDisplayName(state, r, c)} niche.`, card.uid);
      placed++;
    }
    if (placed > 0)
      addLog(state, `✅ RESTORATION GRANT! ${placed} native species reestablished through conservation funding.`, card.uid);
    else
      addLog(state, `✅ RESTORATION GRANT! No native species in discard or no open niches available.`, card.uid);
  }
}

function setupGame(state) {
  state.nicheHabitat = generateHabitatMap(state.gridSize, state.ecosystemType);
  state.deck = shuffle(buildDeck(state.nicheHabitat, state.gridSize));
  for (const [r, c] of computeStartingPositions(state.gridSize)) {
    const nicheHab = state.nicheHabitat[r][c];
    let placed = false;
    while (!placed && state.deck.length > 0) {
      const card = drawCard(state);
      if ((card.type === CardType.NATIVE || card.type === CardType.INVASIVE) && habitatCompatible(card.habitat, nicheHab)) {
        setCell(state, r, c, card); placed = true;
      } else {
        state.discard.push(card);
      }
    }
  }
  state.deck = shuffle([...state.deck, ...state.discard]);
  state.discard = [];
  for (const player of state.players) {
    while (player.hand.length < HAND_SIZE) {
      const card = drawCard(state);
      if (!card) break;
      if (card.type === CardType.INVASIVE) { placeInvasive(state, card); }
      else if (card.type === CardType.EVENT) { resolveEvent(state, card); }
      else player.hand.push(card);
    }
  }
  state.phase = Phase.PLAYER_DRAW;
  state.activePlayerIndex = state.firstPlayerIndex;
  addLog(state, `🌿 Ecosystem: ${state.nicheHabitat.layoutName || 'Mixed'} — protect the native species.`);
}

function doPlayerDraw(state) {
  const card = drawCard(state);
  if (!card) { state.phase = Phase.PLAYER_PLAY; return null; }
  if (card.type === CardType.INVASIVE) { placeInvasive(state, card); state.phase = Phase.PLAYER_PLAY; return card; }
  if (card.type === CardType.EVENT) { resolveEvent(state, card); state.phase = Phase.PLAYER_PLAY; return card; }
  activePlayer(state).hand.push(card);
  addLog(state, `${activePlayer(state).name} drew ${cardName(card)}.`, card.uid);
  state.phase = Phase.PLAYER_PLAY;
  return card;
}

function doRefillDraw(state) {
  const player = activePlayer(state);
  if (player.hand.length >= HAND_SIZE) { advanceAfterRefill(state); return null; }
  const card = drawCard(state);
  if (!card) { advanceAfterRefill(state); return null; }
  if (card.type === CardType.INVASIVE) { placeInvasive(state, card); return card; }
  if (card.type === CardType.EVENT) { resolveEvent(state, card); return card; }
  player.hand.push(card);
  if (player.hand.length >= HAND_SIZE) advanceAfterRefill(state);
  return card;
}

function advanceAfterRefill(state) {
  if (state.phase === Phase.GAME_OVER) return;
  const nextIndex = (state.activePlayerIndex + 1) % state.playerCount;
  if (nextIndex === state.firstPlayerIndex) { state.phase = Phase.NATIVE_TURN; }
  else { state.activePlayerIndex = nextIndex; state.phase = Phase.PLAYER_DRAW; }
}

function actionPlantNative(state, handIndex, row, col) {
  const player = activePlayer(state);
  const card = player.hand[handIndex];
  if (!card || card.type !== CardType.NATIVE || state.field[row][col] !== null) return false;
  if (!habitatCompatible(card.habitat, state.nicheHabitat[row][col])) return false;
  player.hand.splice(handIndex, 1);
  setCell(state, row, col, card);
  addLog(state, `${player.name} ${placementVerb(card)}s ${cardName(card)}.`);
  return true;
}

function actionDiscardFromHand(state, handIndex) {
  const player = activePlayer(state);
  const card = player.hand[handIndex];
  if (!card) return false;
  player.hand.splice(handIndex, 1);
  state.discard.push(card);
  addLog(state, `${player.name} discards ${cardName(card)}.`);
  return true;
}

function actionDiscardEntireHand(state) {
  const player = activePlayer(state);
  const count = player.hand.length;
  for (const card of player.hand) state.discard.push(card);
  player.hand = [];
  addLog(state, `${player.name} discards their entire hand (${count} card${count !== 1 ? 's' : ''}).`);
  state.phase = Phase.PLAYER_REFILL;
}

function actionUseControl(state, handIndex, args) {
  const player = activePlayer(state);
  const card = player.hand[handIndex];
  if (!card || card.type !== CardType.CONTROL) return false;
  const result = applyControl(state, card, args);
  if (result) { player.hand.splice(handIndex, 1); state.discard.push(card); addLog(state, `${player.name} used ${cardName(card)}.`); }
  return result;
}

// Auto-pick collateral native: adjacent to targets first, else random on field
function pickCollateral(state, targets) {
  const seen = new Set();
  const adj = [];
  for (const [r, c] of targets) {
    for (const [ar, ac] of getAdjacentCells(r, c)) {
      const key = `${ar},${ac}`;
      if (!seen.has(key) && state.field[ar]?.[ac]?.type === CardType.NATIVE) { seen.add(key); adj.push([ar, ac]); }
    }
  }
  if (adj.length > 0) return adj[Math.floor(Math.random() * adj.length)];
  const all = nativeCells(state);
  if (all.length > 0) { const p = all[Math.floor(Math.random() * all.length)]; return [p.row, p.col]; }
  return null;
}

function applyControl(state, card, args) {
  switch (card.method) {
    case ControlMethod.PHYSICAL: {
      const { row, col } = args;
      const target = state.field[row]?.[col];
      if (!target || target.type !== CardType.INVASIVE) return false;
      if (!canControlTarget(card, target)) { addLog(state, `${cardName(target)} cannot be targeted by ${cardName(card)}.`); return false; }
      state.discard.push(target); setCell(state, row, col, null);
      addLog(state, `${cardName(card)} cleared ${cardName(target)}.`);
      return true;
    }
    case ControlMethod.CHEMICAL: {
      const { targets } = args;
      if (!targets || targets.length === 0) return false;
      for (const [r, c] of targets) {
        const t = state.field[r]?.[c];
        if (!t || t.type !== CardType.INVASIVE) return false;
        if (!canControlTarget(card, t)) { addLog(state, `${cardName(t)} cannot be targeted by ${cardName(card)}.`); return false; }
      }
      for (const [r, c] of targets) { const t = state.field[r][c]; state.discard.push(t); setCell(state, r, c, null); addLog(state, `Chemical Control removed ${cardName(t)}.`); }
      const inWetland = targets.some(([r, c]) => state.nicheHabitat[r][c] === 'wetland');
      const driftChance = (card.id !== 'ctrl_imazapyr' && inWetland) ? 0.75 : 0.5;
      if (Math.random() < driftChance) {
        const col = pickCollateral(state, targets);
        if (col) { const [nr, nc] = col; const n = state.field[nr][nc]; state.discard.push(n); setCell(state, nr, nc, null); addLog(state, `Herbicide drift${inWetland && card.id !== 'ctrl_imazapyr' ? ' (wetland runoff)' : ''} — ${cardName(n)} lost as collateral.`); }
        else { addLog(state, 'Herbicide drift risk — no natives remain to affect.'); }
      } else {
        addLog(state, 'No herbicide drift this application.');
      }
      return true;
    }
    case ControlMethod.BIOLOGICAL: {
      const { speciesId } = args;
      const toRemove = invasiveCells(state).filter(({ card: c }) => c.id === speciesId);
      if (toRemove.length === 0) return false;
      if (!canControlTarget(card, toRemove[0].card)) { addLog(state, `${cardName(toRemove[0].card)} cannot be targeted by ${cardName(card)}.`); return false; }
      for (const { row, col, card: c } of toRemove) { state.discard.push(c); setCell(state, row, col, null); }
      addLog(state, `Biological Control eliminated all ${cardName(toRemove[0].card)} (×${toRemove.length}).`);
      return true;
    }
    case ControlMethod.FIRE: {
      const invs = invasiveCells(state).filter(({ row: r, col: c, card: fc }) =>
        state.nicheHabitat[r][c] === 'terrestrial' ||
        (fc.habitat === 'terrestrial' && ['bacteria', 'fungi'].includes(fc.organism))
      );
      if (invs.length === 0) { addLog(state, 'No terrestrial invasives to burn.'); return false; }
      let burned = 0, survived = 0;
      for (const { row, col, card: fc } of invs) {
        if (fc.fireSurvival && Math.random() < fc.fireSurvival) {
          addLog(state, `🔥 ${cardName(fc)} — fire-adapted, survived the burn.`);
          survived++;
        } else {
          state.discard.push(fc); setCell(state, row, col, null); burned++;
        }
      }
      addLog(state, `🔥 Prescribed Fire: ${burned} cleared${survived > 0 ? `, ${survived} fire-adapted survivor${survived !== 1 ? 's' : ''}` : ''}.`);
      return true;
    }
    case ControlMethod.AQUATIC: {
      const { targets } = args;
      if (!targets || targets.length === 0) return false;
      for (const [r, c] of targets) {
        const t = state.field[r]?.[c];
        if (!t || t.type !== CardType.INVASIVE) return false;
        if (!canControlTarget(card, t)) { addLog(state, `${cardName(t)} cannot be targeted by ${cardName(card)}.`); return false; }
      }
      for (const [r, c] of targets) { const t = state.field[r][c]; state.discard.push(t); setCell(state, r, c, null); addLog(state, `Aquatic Management removed ${cardName(t)}.`); }
      const col = pickCollateral(state, targets);
      if (col) { const [nr, nc] = col; const n = state.field[nr][nc]; state.discard.push(n); setCell(state, nr, nc, null); addLog(state, `Drawdown — ${cardName(n)} lost as collateral.`); }
      else { addLog(state, 'No natives remain — no collateral damage.'); }
      return true;
    }
    case ControlMethod.QUARANTINE: {
      const { row, col } = args;
      const target = state.field[row]?.[col];
      if (!target || target.type !== CardType.INVASIVE) return false;
      if (!canControlTarget(card, target)) { addLog(state, `${cardName(target)} cannot be targeted by ${cardName(card)}.`); return false; }
      // Remove clicked pathogen + all adjacent pathogens (sanitation zone)
      const toRemove = [[row, col]];
      for (const [ar, ac] of getAdjacentCells(row, col)) {
        const adj = state.field[ar]?.[ac];
        if (adj?.type === CardType.INVASIVE && ['bacteria', 'fungi'].includes(adj.organism)) toRemove.push([ar, ac]);
      }
      for (const [r, c] of toRemove) { const t = state.field[r]?.[c]; if (t) { state.discard.push(t); setCell(state, r, c, null); } }
      const removed = toRemove.length;
      addLog(state, `Quarantine Cut — ${removed} pathogen${removed !== 1 ? 's' : ''} cleared (sanitation zone).`);
      return true;
    }
    default: return false;
  }
}

// ─── ANIMAL MOVEMENT ──────────────────────────────────────────────────────────

// Max niches an animal can move per turn, scaled to grid size (biology cap: 3)
function animalMaxMovement() {
  return Math.min(3, Math.ceil(GRID_SIZE / 4));
}

// Whether an animal can land in a given niche type based on its locomotion mode.
// Aerial animals fly over anything but land only in their own habitat type.
// Amphibious animals (e.g. Northern Snakehead) can land in water OR terrestrial.
// Semi-aquatic animals (turtles, waterfowl, estuarine crabs) cross the water-land edge.
function canLandInNiche(card, nicheHabitat) {
  if (card.organism !== 'animal') return habitatCompatible(card.habitat, nicheHabitat);
  switch (card.locomotion) {
    case 'aerial':
      // Flies over any terrain, but alights only in own habitat-compatible niches
      return habitatCompatible(card.habitat, nicheHabitat);
    case 'amphibious':
      // Can emerge onto land (snakehead) as well as its aquatic habitat
      return habitatCompatible(card.habitat, nicheHabitat) || nicheHabitat === 'terrestrial';
    case 'semi-aquatic':
      // Freshwater semi-aquatics (painted turtle): fresh + wetland + terrestrial edge
      if (card.habitat === 'freshwater') return nicheHabitat === 'freshwater' || nicheHabitat === 'wetland' || nicheHabitat === 'terrestrial';
      // Wetland semi-aquatics (wood duck): wetland + freshwater + terrestrial
      if (card.habitat === 'wetland')    return nicheHabitat === 'wetland'    || nicheHabitat === 'freshwater' || nicheHabitat === 'terrestrial';
      // Marine semi-aquatics (green crab, blue crab): marine + wetland estuary
      if (card.habitat === 'marine')     return nicheHabitat === 'marine'     || nicheHabitat === 'wetland';
      return habitatCompatible(card.habitat, nicheHabitat);
    case 'aquatic':
    case 'terrestrial':
    default:
      return habitatCompatible(card.habitat, nicheHabitat);
  }
}

// All empty niches reachable by an animal within Chebyshev distance maxDist
function reachableEmptyNiches(state, r, c, card, maxDist) {
  const results = [];
  for (let tr = 0; tr < GRID_SIZE; tr++) {
    for (let tc = 0; tc < GRID_SIZE; tc++) {
      if (tr === r && tc === c) continue;
      if (Math.max(Math.abs(tr - r), Math.abs(tc - c)) > maxDist) continue;
      if (state.field[tr][tc] !== null) continue;
      if (!canLandInNiche(card, state.nicheHabitat[tr][tc])) continue;
      results.push([tr, tc]);
    }
  }
  return results;
}

// Invasive animal movement score: how well-positioned to use its mechanic?
// Predators strongly prefer being adjacent to native animals.
function invasiveMoveScore(state, r, c, card) {
  const adj = getAdjacentCells(r, c).filter(([ar, ac]) => ar >= 0 && ar < GRID_SIZE && ac >= 0 && ac < GRID_SIZE);
  if (card.mechanic === 'predator') {
    const animalPrey = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.NATIVE && state.field[ar]?.[ac]?.organism === 'animal').length;
    const anyPrey    = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.NATIVE).length;
    return animalPrey * 10 + anyPrey;
  }
  return adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.NATIVE).length;
}

// Count adjacent invasive threats at a position (native safety heuristic)
function invasiveThreatAt(state, r, c) {
  return getAdjacentCells(r, c)
    .filter(([ar, ac]) => ar >= 0 && ar < GRID_SIZE && ac >= 0 && ac < GRID_SIZE)
    .filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.INVASIVE)
    .length;
}

// Move a single animal card; returns its new [r, c] position.
function moveAnimal(state, card, r, c) {
  const maxDist = animalMaxMovement();
  const reachable = reachableEmptyNiches(state, r, c, card, maxDist);
  if (reachable.length === 0) return [r, c];

  let bestPos = null;

  if (card.type === CardType.INVASIVE) {
    const currentScore = invasiveMoveScore(state, r, c, card);
    let bestScore = currentScore;
    for (const [tr, tc] of reachable) {
      const score = invasiveMoveScore(state, tr, tc, card);
      if (score > bestScore) { bestScore = score; bestPos = [tr, tc]; }
    }
    if (bestPos) {
      const verb = card.mechanic === 'predator' ? 'hunts' : 'forages';
      addLog(state, `${card.displayName} ${verb} — moves toward prey.`);
    }
  } else {
    const currentThreat = invasiveThreatAt(state, r, c);
    if (currentThreat > 0) {
      let bestThreat = currentThreat;
      for (const [tr, tc] of reachable) {
        const threat = invasiveThreatAt(state, tr, tc);
        if (threat < bestThreat) { bestThreat = threat; bestPos = [tr, tc]; }
      }
      if (bestPos) addLog(state, `${card.displayName} retreats — safer niche found (${bestPos[0]}, ${bestPos[1]}).`);
    }
  }

  if (bestPos) {
    const [tr, tc] = bestPos;
    setCell(state, tr, tc, card);
    setCell(state, r, c, null);
    return [tr, tc];
  }
  return [r, c];
}

// ─── ECOSYSTEM TURN ────────────────────────────────────────────────────────────
// All active natives and invasives act in a single randomly-interleaved sequence.
// Animals move before resolving their effect; order is shuffled each turn.

function doEcosystemTurn(state) {
  const entities = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const card = state.field[r][c];
      if (!card) continue;
      if (card.type === CardType.INVASIVE) entities.push({ card, r, c });
      else if (card.type === CardType.NATIVE && card.nativeMechanic) entities.push({ card, r, c });
    }
  }

  if (entities.length === 0) {
    addLog(state, 'Ecosystem turn — no active species on the field.');
    if (state.phase !== Phase.GAME_OVER) state.phase = Phase.ROUND_END;
    return;
  }

  addLog(state, `Ecosystem turn — ${entities.length} species act in random order.`);
  const ordered = shuffle(entities);

  for (const entity of ordered) {
    if (state.phase === Phase.GAME_OVER) return;
    let { r, c } = entity;
    const { card } = entity;

    // Card may have been removed by an earlier entity's action this turn
    if (state.field[r]?.[c]?.uid !== card.uid) continue;

    // Animals move first
    if (card.organism === 'animal') {
      [r, c] = moveAnimal(state, card, r, c);
    }

    // Resolve ability
    if (card.type === CardType.NATIVE) {
      resolveNativeAction(state, r, c);
    } else {
      resolveInvasiveAction(state, card, r, c);
    }
  }

  if (state.phase !== Phase.GAME_OVER) state.phase = Phase.ROUND_END;
}

function resolveNativeAction(state, r, c) {
  const card = state.field[r][c];
  if (!card || !card.nativeMechanic) return;
  const label = card.displayName;
  const player = activePlayer(state);
  const adj = getAdjacentCells(r, c).filter(([ar, ac]) => ar >= 0 && ar < GRID_SIZE && ac >= 0 && ac < GRID_SIZE);

  switch (card.nativeMechanic) {

    case 'pioneer': {
      const emptyAdj = adj.filter(([ar, ac]) => !state.field[ar][ac] && habitatCompatible(card.habitat, state.nicheHabitat[ar][ac]));
      const drawn = drawCard(state);
      if (!drawn) break;
      if (drawn.type === CardType.NATIVE && emptyAdj.length > 0) {
        const [tr, tc] = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
        setCell(state, tr, tc, drawn);
        addLog(state, `${label} pioneers — ${drawn.displayName} establishes in an adjacent niche.`);
      } else if (drawn.type === CardType.INVASIVE) {
        placeInvasive(state, drawn);
        addLog(state, `${label} pioneers — draws ${drawn.displayName}! Invasive spreads.`);
      } else if (drawn.type === CardType.EVENT) {
        resolveEvent(state, drawn);
      } else {
        player.hand.push(drawn);
        addLog(state, `${label} pioneers — no compatible niche; ${drawn.displayName} drawn to hand.`);
      }
      break;
    }

    case 'propagator': {
      const emptyAdj = adj.filter(([ar, ac]) => !state.field[ar][ac] && habitatCompatible(card.habitat, state.nicheHabitat[ar][ac]));
      if (emptyAdj.length === 0) { addLog(state, `${label} propagates — no adjacent open niche available.`); break; }
      const [tr, tc] = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
      setCell(state, tr, tc, { ...card, uid: `${card.id}_p_${tr}_${tc}` });
      addLog(state, `${label} propagates — spreads to an adjacent niche.`);
      break;
    }

    case 'competitor': {
      // Same-organism competition first (plants beat invasive plants, animals beat invasive animals)
      const sameOrgTargets = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.INVASIVE && state.field[ar]?.[ac]?.organism === card.organism);
      const anyTargets     = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.INVASIVE);
      const targets = sameOrgTargets.length > 0 ? sameOrgTargets : anyTargets;
      if (targets.length === 0) { addLog(state, `${label} competes — no adjacent invasives to displace.`); break; }
      const [tr, tc] = targets[Math.floor(Math.random() * targets.length)];
      const removed = state.field[tr][tc];
      state.discard.push(removed); setCell(state, tr, tc, null);
      addLog(state, `${label} outcompetes — ${removed.displayName} displaced.`);
      break;
    }

    case 'allelopathic': {
      const targets = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.INVASIVE);
      if (targets.length === 0) { addLog(state, `${label} releases compounds — no adjacent invasives.`); break; }
      const [tr, tc] = targets[Math.floor(Math.random() * targets.length)];
      const removed = state.field[tr][tc];
      state.discard.push(removed); setCell(state, tr, tc, null);
      addLog(state, `${label} releases compounds — ${removed.displayName} eliminated.`);
      break;
    }

    case 'pollinator': {
      const drawn = drawCard(state);
      if (!drawn) break;
      if (drawn.type === CardType.INVASIVE) {
        placeInvasive(state, drawn);
        addLog(state, `${label} pollinates — draws ${drawn.displayName}! Invasive spreads.`);
      } else if (drawn.type === CardType.EVENT) {
        resolveEvent(state, drawn);
      } else {
        player.hand.push(drawn);
        addLog(state, `${label} pollinates — ${player.name} draws ${drawn.displayName}.`);
      }
      break;
    }

    case 'mycorrhizal': {
      const drawn = drawCard(state);
      if (!drawn) break;
      if (drawn.type === CardType.INVASIVE) {
        placeInvasive(state, drawn);
        addLog(state, `${label} networks — fungal draw surfaces ${drawn.displayName}! Invasive spreads.`);
      } else if (drawn.type === CardType.EVENT) {
        resolveEvent(state, drawn);
      } else {
        player.hand.push(drawn);
        addLog(state, `${label} networks — mycorrhizal connection yields ${drawn.displayName}.`);
      }
      break;
    }

    case 'predator': {
      const animalTargets = adj.filter(([ar, ac]) => state.field[ar]?.[ac]?.type === CardType.INVASIVE && state.field[ar]?.[ac]?.organism === 'animal');
      if (animalTargets.length === 0) { addLog(state, `${label} hunts — no adjacent invasive animals to predate.`); break; }
      const [tr, tc] = animalTargets[Math.floor(Math.random() * animalTargets.length)];
      const removed = state.field[tr][tc];
      state.discard.push(removed); setCell(state, tr, tc, null);
      addLog(state, `${label} predates — ${removed.displayName} removed.`);
      break;
    }
  }
}


function resolveInvasiveAction(state, card, row, col) {
  const label = cardName(card);
  switch (card.invasiveTurnEffect) {
    case 'facilitator': {
      let drawn;
      do {
        drawn = drawCard(state);
        if (!drawn) break;
        if (drawn.type === CardType.INVASIVE) { addLog(state, `${label} facilitates invasion! — ${cardName(drawn)} appears.`, card.uid); placeInvasive(state, drawn); }
        else state.discard.push(drawn);
      } while (drawn && drawn.type !== CardType.INVASIVE);
      break;
    }
    case 'allelopathic': {
      let removed = 0;
      for (const [ar, ac] of getAdjacentCells(row, col)) {
        const adj = state.field[ar][ac];
        if (adj?.type === CardType.NATIVE) { state.discard.push(adj); setCell(state, ar, ac, null); removed++; }
      }
      addLog(state, `${label} releases toxins — ${removed} adjacent native${removed !== 1 ? 's' : ''} eliminated.`, card.uid);
      break;
    }
    case 'competitor': {
      const adj = getAdjacentCells(row, col).filter(([ar, ac]) => state.field[ar][ac]?.type === CardType.NATIVE);
      if (adj.length > 0) {
        const [ar, ac] = adj[Math.floor(Math.random() * adj.length)];
        const n = state.field[ar][ac]; state.discard.push(n); setCell(state, ar, ac, null);
        addLog(state, `${label} outcompetes — ${cardName(n)} displaced.`, card.uid);
      }
      break;
    }
    case 'engineer': {
      const adj = getAdjacentCells(row, col).filter(([ar, ac]) => state.field[ar][ac]?.type === CardType.NATIVE).slice(0, 2);
      for (const [ar, ac] of adj) {
        const n = state.field[ar][ac]; state.discard.push(n); setCell(state, ar, ac, null);
        addLog(state, `${label} engineers habitat — ${cardName(n)} displaced.`, card.uid);
      }
      break;
    }
    case 'predator': {
      const animals = getAdjacentCells(row, col).filter(([ar, ac]) => {
        const c = state.field[ar][ac]; return c?.type === CardType.NATIVE && c.organism === 'animal';
      });
      if (animals.length > 0) {
        const [ar, ac] = animals[Math.floor(Math.random() * animals.length)];
        const n = state.field[ar][ac]; state.discard.push(n); setCell(state, ar, ac, null);
        addLog(state, `${label} predates — ${cardName(n)} consumed.`, card.uid);
      }
      break;
    }
    case 'pathogen': {
      const emptyAdj = getAdjacentCells(row, col).filter(([ar, ac]) => !state.field[ar][ac]);
      if (emptyAdj.length > 0) {
        const [ar, ac] = emptyAdj[Math.floor(Math.random() * emptyAdj.length)];
        setCell(state, ar, ac, { ...card, uid: `${card.id}_s_${ar}_${ac}` });
        addLog(state, `${label} spreads — infection established in adjacent niche.`, card.uid);
        checkLossCondition(state);
      } else {
        const infectsOrg = card.infects;
        const nativeAdj = getAdjacentCells(row, col).filter(([ar, ac]) => {
          const n = state.field[ar][ac];
          if (!n || n.type !== CardType.NATIVE) return false;
          return !infectsOrg || n.organism === infectsOrg;
        });
        if (nativeAdj.length > 0) {
          const [ar, ac] = nativeAdj[Math.floor(Math.random() * nativeAdj.length)];
          const n = state.field[ar][ac];
          state.discard.push(n); setCell(state, ar, ac, { ...card, uid: `${card.id}_s_${ar}_${ac}` });
          addLog(state, `${label} infects — ${cardName(n)} succumbs.`, card.uid);
          checkLossCondition(state);
        }
      }
      break;
    }
    case 'disperser': {
      const adjSet = new Set(getAdjacentCells(row, col).map(([r, c]) => `${r},${c}`));
      adjSet.add(`${row},${col}`);
      const distant = openCells(state).filter(([r, c]) => !adjSet.has(`${r},${c}`) && habitatCompatible(card.habitat, state.nicheHabitat[r][c]));
      if (distant.length > 0) {
        const [tr, tc] = distant[Math.floor(Math.random() * distant.length)];
        setCell(state, tr, tc, { ...card, uid: `${card.id}_d_${tr}_${tc}` });
        addLog(state, `${label} disperses — new population established far from source.`, card.uid);
        checkLossCondition(state);
      }
      break;
    }
  }
}

function doRoundEnd(state) {
  state.round++;
  state.firstPlayerIndex = (state.firstPlayerIndex + 1) % state.playerCount;
  state.activePlayerIndex = state.firstPlayerIndex;
  if (state.round > MAX_ROUNDS) { endGame(state); }
  else { addLog(state, `🌱 Growing Season ${state.round} begins.`); state.phase = Phase.PLAYER_DRAW; }
}

function checkLossCondition(state) {
  if (state.phase === Phase.GAME_OVER) return;
  const fc = fieldCards(state);
  const totalCells = state.gridSize * state.gridSize;
  if (fc.length === totalCells && fc.every(({ card }) => card.type === CardType.INVASIVE)) {
    addLog(state, `All niches overrun by invasives — the ecosystem has collapsed!`);
    endGame(state, true);
  }
}

function endGame(state, earlyLoss = false) {
  const natives = nativeCells(state).length;
  const invasives = invasiveCells(state).length;
  state.score = natives - invasives;
  state.winner = (earlyLoss || state.score <= 0) ? 'invasives' : 'players';
  state.phase = Phase.GAME_OVER;
  addLog(state, `Game over! Final score: ${state.score > 0 ? '+' : ''}${state.score} (${natives} Native, ${invasives} Invasive). ${state.winner === 'players' ? 'You protected the ecosystem!' : 'The invasives prevailed.'}`);
}

// ─── UI ───────────────────────────────────────────────────────────────────────

let state = null;
let pendingPlay = null;
let pendingConfirm = null;
let justDrawnUid = null;

function $(id) { return document.getElementById(id); }

function showConfirm(title, body, yesLabel, isDanger, onYes) {
  $('confirm-title').textContent = title;
  $('confirm-body').textContent = body;
  const yesBtn = $('confirm-yes');
  yesBtn.textContent = yesLabel;
  yesBtn.className = `btn ${isDanger ? 'btn-danger' : 'btn-primary'}`;
  pendingConfirm = onYes;
  $('confirm-modal').classList.remove('hidden');
}

// ── Animation helpers ──────────────────────────────────────────────────────────

function animateFire(callback) {
  const fieldEl = $('field');
  if (!fieldEl) { callback(); return; }
  const fieldRect = fieldEl.getBoundingClientRect();
  const cells = Array.from(fieldEl.querySelectorAll('.field-cell'));
  if (cells.length === 0) { callback(); return; }

  const SWEEP_MS           = 1400;
  const BURN_MS            = 2000;
  const PARTICLE_LINGER    = 1200;
  const PARTICLES_PER_CELL = 18;

  const elements = [];

  cells.forEach(cell => {
    const r = parseInt(cell.dataset.row), c = parseInt(cell.dataset.col);
    const hab = state?.nicheHabitat?.[r]?.[c];
    // Skip non-terrestrial niches — fire doesn't burn through water
    if (hab && hab !== 'terrestrial') return;

    const rect = cell.getBoundingClientRect();
    const nx = (rect.left + rect.width  / 2 - fieldRect.left) / fieldRect.width;
    const ny = (rect.top  + rect.height / 2 - fieldRect.top)  / fieldRect.height;
    const delay = (nx * 0.6 + ny * 0.4) * SWEEP_MS;

    // Fire overlay
    const overlay = document.createElement('div');
    overlay.className = 'fire-cell-overlay';
    Object.assign(overlay.style, {
      left: rect.left + 'px', top: rect.top + 'px',
      width: rect.width + 'px', height: rect.height + 'px',
      animationDelay: `${delay}ms`,
      animationDuration: `${BURN_MS}ms`,
    });
    document.body.appendChild(overlay);
    elements.push(overlay);

    // Spark particles
    for (let i = 0; i < PARTICLES_PER_CELL; i++) {
      const p = document.createElement('div');
      p.className = 'fire-particle';
      const px    = rect.left + rect.width  * (0.05 + Math.random() * 0.9);
      const py    = rect.top  + rect.height * (0.2  + Math.random() * 0.6);
      const drift = ((Math.random() - 0.5) * 90).toFixed(1);
      const rise  = '-' + (50 + Math.random() * 120).toFixed(1);
      const size  = (6 + Math.random() * 12).toFixed(1);
      const dur   = (0.7 + Math.random() * 1.1).toFixed(2);
      const pDelay = delay + 60 + Math.random() * 900;
      Object.assign(p.style, {
        left: px + 'px', top: py + 'px',
        width: size + 'px', height: size + 'px',
        '--drift': drift + 'px',
        '--rise': rise + 'px',
        animationDuration: `${dur}s`,
        animationDelay: `${Math.round(pDelay)}ms`,
      });
      document.body.appendChild(p);
      elements.push(p);
    }
  });

  setTimeout(() => {
    elements.forEach(el => el.remove());
    callback();
  }, SWEEP_MS + BURN_MS + PARTICLE_LINGER);
}

function flyCard(startRect, endRect, callback) {
  const flying = document.createElement('div');
  flying.className = 'flying-card';
  Object.assign(flying.style, {
    left: startRect.left + 'px', top: startRect.top + 'px',
    width: startRect.width + 'px', height: startRect.height + 'px',
    transition: 'none',
  });
  document.body.appendChild(flying);
  flying.getBoundingClientRect(); // force reflow
  flying.style.transition = 'left 0.42s cubic-bezier(0.4,0,0.2,1), top 0.42s cubic-bezier(0.4,0,0.2,1), width 0.42s ease, height 0.42s ease';
  Object.assign(flying.style, {
    left: endRect.left + 'px', top: endRect.top + 'px',
    width: endRect.width + 'px', height: endRect.height + 'px',
  });
  setTimeout(() => { flying.remove(); callback(); }, 460);
}

function flyCardFromDeck(endRect, callback) {
  const deckEl = $('deck-visual');
  if (!deckEl) { callback(); return; }
  flyCard(deckEl.getBoundingClientRect(), endRect, callback);
}

// Draw and animate one refill card at a time; recurses until refill phase ends
function animateRefillCards(onDone) {
  if (state.phase !== Phase.PLAYER_REFILL) { $('refill-banner').classList.add('hidden'); onDone(); return; }
  $('refill-banner').classList.remove('hidden');

  const fieldSnap = state.field.map(row => row.map(cell => cell?.uid ?? null));
  const drawn = doRefillDraw(state);

  if (!drawn) {
    // Deck empty or hand full — phase already advanced by doRefillDraw
    render(); onDone(); return;
  }

  if (drawn.type === CardType.EVENT) {
    render();
    animateEvent(drawn, () => animateRefillCards(onDone));
    return;
  }

  revealCard(drawn, (revealRect) => {
    const start = revealRect || $('deck-visual')?.getBoundingClientRect() || { left: 0, top: 0, width: 116, height: 86 };

    if (drawn.type === CardType.INVASIVE) {
      let targetEl = null;
      outer: for (let r = 0; r < state.gridSize; r++)
        for (let c = 0; c < state.gridSize; c++)
          if ((state.field[r][c]?.uid ?? null) !== fieldSnap[r][c]) {
            targetEl = document.querySelector(`#field .field-cell[data-row="${r}"][data-col="${c}"]`);
            break outer;
          }
      if (targetEl) {
        flyCard(start, targetEl.getBoundingClientRect(), () => { render(); animateRefillCards(onDone); });
      } else { render(); animateRefillCards(onDone); }
    } else {
      const handRect = $('hand').getBoundingClientRect();
      const dest = { left: handRect.left + 16, top: handRect.top + 8, width: 70, height: 108 };
      justDrawnUid = drawn.uid ?? null;
      flyCard(start, dest, () => { render(); justDrawnUid = null; animateRefillCards(onDone); });
    }
  });
}

function flyCardsToDiscard(sourceRects, callback) {
  const discardEl = $('discard-visual');
  const endRect = discardEl
    ? discardEl.getBoundingClientRect()
    : { left: 0, top: 0, width: 116, height: 86 };
  if (sourceRects.length === 0) { callback(); return; }
  let done = 0;
  for (const src of sourceRects) {
    flyCard(src, endRect, () => { if (++done === sourceRects.length) callback(); });
  }
}

// Snapshot field UIDs → apply control → collect rects of removed cells → animate all to discard
function useControlAndAnimate(handIndex, args, onDone) {
  const handCardEl = document.querySelector(`.hand-card[data-hand-index="${handIndex}"]`);
  const controlRect = handCardEl ? handCardEl.getBoundingClientRect() : null;
  const fieldSnap = state.field.map(row => row.map(cell => cell?.uid ?? null));

  if (!actionUseControl(state, handIndex, args)) { onDone(); return; }

  const sourceRects = controlRect ? [controlRect] : [];
  for (let r = 0; r < state.gridSize; r++) {
    for (let c = 0; c < state.gridSize; c++) {
      if (fieldSnap[r][c] !== null && (state.field[r]?.[c]?.uid ?? null) !== fieldSnap[r][c]) {
        const el = document.querySelector(`#field .field-cell[data-row="${r}"][data-col="${c}"]`);
        if (el) sourceRects.push(el.getBoundingClientRect());
      }
    }
  }
  flyCardsToDiscard(sourceRects, onDone);
}

const EVENT_ANIM_CONFIG = {
  wildfire:          { icon: '⚡', title: 'WILDFIRE!',               sub: 'Fire sweeps terrestrial and wetland niches.' },
  drought:           { icon: '🌵', title: 'DROUGHT!',                sub: 'Freshwater and wetland natives collapse.' },
  algal_bloom:       { icon: '🦠', title: 'HARMFUL ALGAL BLOOM!',    sub: 'Hypoxia kills native freshwater animals.' },
  storm_surge:       { icon: '🌊', title: 'STORM SURGE!',            sub: 'Coastal disturbance scours marine niches.' },
  pest_outbreak:     { icon: '🐛', title: 'INVASIVE PEST OUTBREAK!', sub: 'New invaders arrive on the landscape.' },
  restoration_grant: { icon: '🌱', title: 'RESTORATION GRANT!',      sub: 'Conservation funding restores native species.' },
};

function animateEvent(card, callback) {
  const cfg = EVENT_ANIM_CONFIG[card.id];
  if (!cfg) { callback(); return; }
  const el = document.createElement('div');
  el.id = 'event-overlay';
  el.className = `eo-${card.id}`;
  el.innerHTML = `
    <div class="eo-icon">${cfg.icon}</div>
    <div class="eo-title">${cfg.title}</div>
    <div class="eo-sub">${cfg.sub}</div>
  `;
  document.body.appendChild(el);
  setTimeout(() => { el.remove(); callback(); }, 2000);
}

function animateSeasonTransition(newRound, callback) {
  const centerEl = $('center');
  const r = centerEl ? centerEl.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  const el = document.createElement('div');
  el.id = 'season-overlay';
  Object.assign(el.style, {
    left: r.left + 'px', top: r.top + 'px',
    width: r.width + 'px', height: r.height + 'px',
  });
  el.innerHTML = `
    <div class="season-phase season-fall">
      <div class="sp-icon">🍂</div>
      <div class="sp-label">Fall</div>
    </div>
    <div class="season-phase season-winter">
      <div class="sp-icon">❄</div>
      <div class="sp-label">Winter</div>
    </div>
    <div class="season-phase season-spring">
      <div class="sp-icon">🌱</div>
      <div class="sp-label">Spring</div>
      <div class="sp-round">GROWING SEASON ${newRound}</div>
    </div>
  `;
  document.body.appendChild(el);
  setTimeout(() => { el.remove(); callback(); }, 2400);
}

function revealCard(card, callback) {
  if (!card) { callback(null); return; }
  const centerEl = $('center');
  const r = centerEl
    ? centerEl.getBoundingClientRect()
    : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
  const W = 220, H = 165;
  const revealRect = {
    left: Math.round(r.left + r.width  / 2 - W / 2),
    top:  Math.round(r.top  + r.height / 2 - H / 2),
    width: W, height: H,
  };

  // Step 1: fly the card-back from deck to center
  flyCardFromDeck(revealRect, () => {
    // Step 2: bloom the enlarged card face at that position
    const el = document.createElement('div');
    el.id = 'card-reveal';
    const typeClass = {
      [CardType.NATIVE]:   'cr-native',
      [CardType.INVASIVE]: 'cr-invasive',
      [CardType.EVENT]:    'cr-event',
      [CardType.CONTROL]:  'cr-control',
    }[card.type] || 'cr-native';
    el.className = `${typeClass} ${cardFaceClass(card)}`;
    Object.assign(el.style, {
      left: revealRect.left + 'px',
      top:  revealRect.top  + 'px',
    });
    const habitatIcon = HABITAT_ICONS[card.habitat]  || '';
    const orgIcon     = ORGANISM_ICONS[card.organism] || '';
    const eventCfg    = card.type === CardType.EVENT ? EVENT_ANIM_CONFIG[card.id] : null;
    const topIcon     = eventCfg ? eventCfg.icon : `${habitatIcon}${orgIcon}`;
    const typeLabel   = {
      [CardType.NATIVE]:   'Native Species',
      [CardType.INVASIVE]: '⚠ Invasive Species',
      [CardType.EVENT]:    'Event!',
      [CardType.CONTROL]:  'Control Card',
    }[card.type] || '';
    el.innerHTML = `
      <div class="cr-icons">${topIcon}</div>
      <div class="cr-name">${card.displayName}</div>
      ${card.latinName ? `<div class="cr-latin">${card.latinName}</div>` : ''}
      <div class="cr-type">${typeLabel}</div>
    `;
    document.body.appendChild(el);

    // Step 3: after display duration, call back with position for onward fly
    setTimeout(() => { el.remove(); callback(revealRect); }, 2000);
  });
}

function render() {
  renderField();
  renderHand();
  renderHUD();
  renderLog();
  updateButtons();
}

function renderField() {
  const fieldEl = $('field');
  fieldEl.innerHTML = '';
  // Fixed cell size scales down with grid size; container scrolls for overflow
  const cellPx = Math.min(130, Math.max(62, Math.round(650 / GRID_SIZE)));
  const template = `repeat(${GRID_SIZE}, ${cellPx}px)`;
  fieldEl.style.gridTemplateColumns = template;
  fieldEl.style.gridTemplateRows = template;
  // Hide text labels when cells are too small to read
  fieldEl.classList.toggle('field-large', GRID_SIZE > 6);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const card = state.field[r][c];
      const cell = document.createElement('div');
      cell.className = 'field-cell';
      cell.dataset.row = r;
      cell.dataset.col = c;

      if (card) {
        cell.classList.add(`cell-${card.type}`);
        cell.appendChild(createCardFaceEl(card));
        cell.addEventListener('mouseenter', () => showCardInfo(card));
        cell.addEventListener('mouseleave', hideTooltip);
      } else {
        cell.classList.add('cell-empty');
        const hab = state.nicheHabitat?.[r]?.[c] || 'terrestrial';
        cell.classList.add(`niche-${hab}`);
        const habLabel = getNicheDisplayName(state, r, c);
        cell.addEventListener('mouseenter', () => showNicheTooltip(habLabel, HABITAT_ICONS[hab] || ''));
        cell.addEventListener('mouseleave', hideTooltip);
      }

      cell.addEventListener('click', () => onFieldClick(r, c, cell));
      fieldEl.appendChild(cell);
    }
  }
}

const HAND_TYPE_ORDER = { native: 0, control: 1, event: 2, invasive: 3 };

function renderHand() {
  const player = activePlayer(state);
  player.hand.sort((a, b) => {
    const td = (HAND_TYPE_ORDER[a.type] ?? 9) - (HAND_TYPE_ORDER[b.type] ?? 9);
    if (td !== 0) return td;
    return (a.displayName || a.name || '').localeCompare(b.displayName || b.name || '');
  });
  $('hand-label').textContent = `${player.name}'s Hand`;
  const handEl = $('hand');
  handEl.innerHTML = '';
  player.hand.forEach((card, idx) => {
    const el = document.createElement('div');
    el.className = `hand-card hand-card-${card.type}`;
    if (card.uid === justDrawnUid) el.classList.add('card-deal-in');
    el.dataset.handIndex = idx;
    el.dataset.cardId = card.id;
    el.dataset.cardUid = card.uid;
    el.appendChild(createCardFaceEl(card));
    el.addEventListener('click', () => onHandCardClick(idx));
    el.addEventListener('mouseenter', () => showCardInfo(card));
    el.addEventListener('mouseleave', hideTooltip);
    handEl.appendChild(el);
  });
}

function renderHUD() {
  const sc = nativeCells(state).length - invasiveCells(state).length;
  $('hud-score').textContent = `Score ${sc > 0 ? '+' : ''}${sc}`;
  $('hud-natives').textContent = `${nativeCells(state).length} Native`;
  $('hud-invasives').textContent = `${invasiveCells(state).length} Invasive`;
  $('hud-phase').textContent = phaseLabel();
  $('hud-deck').textContent = `Deck: ${state.deck.length}`;
  $('discard-visual')?.classList.toggle('has-cards', state.discard.length > 0);

  // Season pip track
  const pips = $('season-pips');
  pips.innerHTML = '';
  for (let i = 1; i <= MAX_ROUNDS; i++) {
    const pip = document.createElement('div');
    pip.className = 'season-pip' + (i < state.round ? ' pip-done' : i === state.round ? ' pip-current' : '');
    pip.textContent = i;
    pips.appendChild(pip);
  }
}

function phaseLabel() {
  const p = activePlayer(state);
  switch (state.phase) {
    case Phase.PLAYER_DRAW:   return `${p.name} — Draw a Card`;
    case Phase.PLAYER_PLAY:   return `${p.name} — Play Cards`;
    case Phase.PLAYER_REFILL: return `${p.name} — Refilling…`;
    case Phase.NATIVE_TURN:   return 'Ecosystem Turn';
    case Phase.INVASIVE_TURN: return 'Ecosystem Turn'; // fallback, not reached in normal flow
    case Phase.ROUND_END:     return 'End of Season';
    case Phase.GAME_OVER:     return 'Game Over';
    default: return '';
  }
}

function highlightLogSource(sourceId) {
  clearLogHighlight();
  if (!sourceId) return;
  // Search field for the exact card by uid
  let found = false;
  for (let r = 0; r < state.gridSize; r++) {
    for (let c = 0; c < state.gridSize; c++) {
      const cell = state.field[r]?.[c];
      if (cell && cell.uid === sourceId) {
        const el = document.querySelector(`#field .field-cell[data-row="${r}"][data-col="${c}"]`);
        if (el) { el.classList.add('highlight-log'); found = true; }
      }
    }
  }
  if (!found) {
    // Check hand cards by uid
    document.querySelectorAll('.hand-card[data-card-uid]').forEach(el => {
      if (el.dataset.cardUid === sourceId) { el.classList.add('highlight-log'); found = true; }
    });
  }
  if (!found) {
    $('discard-visual')?.classList.add('highlight-log-discard');
  }
}

function clearLogHighlight() {
  document.querySelectorAll('#field .highlight-log, .hand-card.highlight-log').forEach(el => el.classList.remove('highlight-log'));
  $('discard-visual')?.classList.remove('highlight-log-discard');
}

function renderLog() {
  const logEl = $('log');
  const wasAtBottom = logEl.scrollHeight - logEl.scrollTop <= logEl.clientHeight + 10;
  logEl.innerHTML = '';
  for (const entry of state.log.slice(-40)) {
    const p = document.createElement('p');
    p.textContent = entry.text;
    if (entry.sourceId) {
      p.dataset.sourceId = entry.sourceId;
      p.addEventListener('mouseenter', () => highlightLogSource(entry.sourceId));
      p.addEventListener('mouseleave', clearLogHighlight);
    }
    logEl.appendChild(p);
  }
  if (wasAtBottom) logEl.scrollTop = logEl.scrollHeight;
}

function updateButtons() {
  const p = state.phase;
  toggleBtn('btn-draw',         p === Phase.PLAYER_DRAW);
  toggleBtn('btn-discard-hand', p === Phase.PLAYER_PLAY);
  toggleBtn('btn-end-play',     p === Phase.PLAYER_PLAY);
  toggleBtn('btn-native',       p === Phase.NATIVE_TURN);
  toggleBtn('btn-invasive',   p === Phase.INVASIVE_TURN);
  toggleBtn('btn-next-round', p === Phase.ROUND_END);
  toggleBtn('btn-game-over',  p === Phase.GAME_OVER);

  // Pulse the button the player needs to press
  document.querySelectorAll('#action-buttons .btn').forEach(b => b.classList.remove('btn-pulse'));
  const pulseId = {
    [Phase.PLAYER_DRAW]:   'btn-draw',
    [Phase.NATIVE_TURN]:   'btn-native',
    [Phase.INVASIVE_TURN]: 'btn-invasive',
    [Phase.ROUND_END]:     'btn-next-round',
    [Phase.GAME_OVER]:     'btn-game-over',
  }[p];
  if (pulseId) $(`${pulseId}`)?.classList.add('btn-pulse');

  // Dim "Done Playing" if hand is over the limit
  if (p === Phase.PLAYER_PLAY) {
    const over = activePlayer(state).hand.length > HAND_SIZE;
    const btn = $('btn-end-play');
    btn.classList.toggle('btn-blocked', over);
    btn.title = over ? `Play or discard a card first (hand has ${activePlayer(state).hand.length})` : '';
  }

  // Hand hint text
  const hint = $('hand-hint');
  if (p === Phase.PLAYER_DRAW) {
    hint.textContent = 'Draw a card to begin your turn.';
  } else if (p === Phase.PLAYER_PLAY) {
    const over = activePlayer(state).hand.length > HAND_SIZE;
    hint.textContent = over
      ? `Hand over limit — play or discard a card before ending your turn.`
      : 'Click a card to select it, then click the field to play it. You may play as many cards as you like before clicking "Done Playing".';
  } else if (p === Phase.NATIVE_TURN) {
    hint.textContent = 'Ecosystem turn — natives and invasives act in random order. Animals move first.';
  } else {
    hint.textContent = '';
  }
}

function toggleBtn(id, show) {
  const el = $(id);
  if (!el) return;
  el.classList.toggle('hidden', !show);
}

function setPlayInstruction(text) {
  const bar = $('play-instruction');
  if (text) {
    $('play-instruction-text').textContent = text;
    bar.classList.remove('hidden');
  } else {
    bar.classList.add('hidden');
  }
  // Highlight discard pile whenever a card is selected and waiting for placement
  $('discard-visual').classList.toggle('highlight-discard', !!text && pendingPlay !== null);
}

function cancelPendingPlay() {
  pendingPlay = null;
  clearHighlights();
  setPlayInstruction(null);
  $('btn-confirm-chemical').classList.add('hidden');
  document.querySelectorAll('.hand-card').forEach(el => el.classList.remove('selected'));
}

function highlightCells(cells, cls) {
  clearHighlights();
  for (const [r, c] of cells) {
    const cell = document.querySelector(`#field .field-cell[data-row="${r}"][data-col="${c}"]`);
    if (cell) cell.classList.add(cls);
  }
}

function clearHighlights() {
  document.querySelectorAll('#field .highlight-target, #field .highlight-selected, #field .highlight-log')
    .forEach(el => el.classList.remove('highlight-target', 'highlight-selected', 'highlight-log'));
  $('discard-visual')?.classList.remove('highlight-log-discard');
}

// ─── FLOATING TOOLTIP ─────────────────────────────────────────────────────────

let tooltipCard = null;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (tooltipCard) positionTooltip();
});

function positionTooltip() {
  const tip = $('tooltip');
  const TIP_W = 260;
  const GAP = 14;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  // Place right of cursor unless too close to right edge
  let left = mouseX + GAP;
  if (left + TIP_W > vw - 8) left = mouseX - TIP_W - GAP;
  let top = mouseY - 60;
  // Clamp vertically
  const tipH = tip.offsetHeight || 380;
  if (top + tipH > vh - 8) top = vh - tipH - 8;
  if (top < 8) top = 8;
  tip.style.left = left + 'px';
  tip.style.top  = top + 'px';
}

const CONTROL_DISPLAY = { physical: 'Physical Removal', chemical: 'Chemical Control', biological: 'Biological Control', fire: 'Prescribed Fire', aquatic: 'Aquatic Management' };

const NICHE_DESCRIPTIONS = {
  terrestrial: 'Upland habitat — supports terrestrial plants, animals, and soil fungi.',
  freshwater:  'Aquatic inland habitat — supports freshwater plants and animals.',
  marine:      'Saltwater habitat — supports marine plants and animals.',
  wetland:     'Transitional habitat — accepts terrestrial and freshwater species.',
  brackish:    'Estuarine transition zone — accepts freshwater and marine species.',
  riparian:    'River-margin habitat — transitional zone between the channel and upland. Accepts terrestrial and freshwater species.',
};

const RIVER_LAYOUTS = new Set(['River Valley', 'Meandering River']);

function getNicheDisplayName(state, r, c) {
  const hab = state.nicheHabitat?.[r]?.[c] || 'terrestrial';
  if (hab === 'wetland' && RIVER_LAYOUTS.has(state.nicheHabitat.layoutName)) return 'Riparian';
  return hab.charAt(0).toUpperCase() + hab.slice(1);
}

function showNicheTooltip(habLabel, icon) {
  const tip = $('tooltip');
  $('tooltip-header').innerHTML = '';
  $('tooltip-name').textContent = `${icon} ${habLabel} Niche`;
  $('tooltip-latin').textContent = 'Empty habitat';
  $('tooltip-type').textContent = '';
  $('tooltip-immunity').innerHTML = '';
  $('tooltip-desc').textContent = NICHE_DESCRIPTIONS[habLabel.toLowerCase()] || 'No species occupies this niche.';
  $('tooltip-action').classList.add('hidden');
  tip.classList.remove('hidden');
}

function showCardInfo(card) {
  if (!card) return;
  tooltipCard = card;
  const tip = $('tooltip');

  // Header: colored card face instead of image
  const headerEl = $('tooltip-header');
  headerEl.className = `tooltip-header ${cardFaceClass(card)}`;
  headerEl.innerHTML = '';
  const iconEl = document.createElement('span');
  iconEl.className = 'th-icon';
  iconEl.textContent = card.type === CardType.NATIVE   ? (HABITAT_ICONS[card.habitat] || '🌿') :
                       card.type === CardType.INVASIVE ? (ORGANISM_ICONS[card.organism] || '⚠') :
                       card.type === CardType.CONTROL  ? '🛡' : '⚡';
  headerEl.appendChild(iconEl);
  if (card.mechanic) {
    const mechEl = document.createElement('span');
    mechEl.className = `th-mechanic mechanic-badge mechanic-${card.mechanic}`;
    mechEl.textContent = (MECHANIC_LABELS[card.mechanic] || card.mechanic).toUpperCase();
    headerEl.appendChild(mechEl);
  }

  // Name: displayName + mechanic label for invasives and native mechanics
  $('tooltip-name').textContent = card.mechanic
    ? `${card.displayName} — ${MECHANIC_LABELS[card.mechanic]}`
    : card.nativeMechanic
      ? `${card.displayName} — ${NATIVE_MECHANIC_LABELS[card.nativeMechanic]}`
      : (card.displayName || card.name || '');
  $('tooltip-latin').textContent = card.latinName || (card.habitat && card.organism ? `${card.habitat} · ${card.organism}` : '');
  $('tooltip-type').textContent = card.type.charAt(0).toUpperCase() + card.type.slice(1);
  $('tooltip-type').className = `card-type-badge badge-${card.type}`;
  $('tooltip-desc').textContent = card.description || '';

  const actionText = card.actionText || card.invasiveTurnText || card.nativeTurnText || '';
  const actionEl = $('tooltip-action');
  if (actionText) { actionEl.textContent = actionText; actionEl.classList.remove('hidden'); }
  else actionEl.classList.add('hidden');

  // Compute immunities from isImmuneToControl if invasive
  const immunityEl = $('tooltip-immunity');
  immunityEl.innerHTML = '';
  if (card.type === CardType.INVASIVE) {
    const immune = Object.values(ControlMethod).filter(m => isImmuneToControl(card, m));
    if (immune.length > 0) {
      const lbl = document.createElement('span');
      lbl.textContent = 'Immune to: '; lbl.className = 'immunity-label';
      immunityEl.appendChild(lbl);
      for (const m of immune) {
        const badge = document.createElement('span');
        badge.className = `immunity-badge immunity-${m}`;
        badge.textContent = CONTROL_DISPLAY[m] || m;
        immunityEl.appendChild(badge);
      }
    }
  }

  tip.classList.remove('hidden');
  positionTooltip();
}

function hideTooltip() {
  tooltipCard = null;
  $('tooltip').classList.add('hidden');
}

// ─── INTERACTION ──────────────────────────────────────────────────────────────

function onFieldClick(row, col, cellEl) {
  if (!pendingPlay) return;

  if (pendingPlay.type === 'plant') {
    if (state.field[row][col] !== null) return;
    if (actionPlantNative(state, pendingPlay.handIndex, row, col)) {
      pendingPlay = null; clearHighlights(); setPlayInstruction(null); render();
    }
    return;
  }

  if (pendingPlay.type === 'physical') {
    const target = state.field[row][col];
    if (!target || target.type !== CardType.INVASIVE) return;
    const hi = pendingPlay.handIndex;
    pendingPlay = null; clearHighlights(); setPlayInstruction(null);
    useControlAndAnimate(hi, { row, col }, () => render());
    return;
  }

  if (pendingPlay.type === 'aquatic') {
    const target = state.field[row][col];
    if (target?.type === CardType.INVASIVE && pendingPlay.args.targets.length < 3) {
      const key = `${row},${col}`;
      if (!pendingPlay.args.targets.some(([r, c]) => `${r},${c}` === key)) {
        pendingPlay.args.targets.push([row, col]);
        cellEl.classList.add('highlight-selected');
      }
    }
    const count = pendingPlay.args.targets.length;
    if (count === 3) {
      const hi = pendingPlay.handIndex, args = pendingPlay.args;
      pendingPlay = null; clearHighlights(); setPlayInstruction(null);
      $('btn-confirm-chemical').classList.add('hidden');
      useControlAndAnimate(hi, args, () => render());
    } else if (count > 0) {
      setPlayInstruction(`Aquatic Management — ${count}/3 selected. Click more or confirm.`);
      $('btn-confirm-chemical').classList.remove('hidden');
    }
    return;
  }

  if (pendingPlay.type === 'chemical') {
    const target = state.field[row][col];
    if (target?.type === CardType.INVASIVE && pendingPlay.args.targets.length < 3) {
      const key = `${row},${col}`;
      if (!pendingPlay.args.targets.some(([r, c]) => `${r},${c}` === key)) {
        pendingPlay.args.targets.push([row, col]);
        cellEl.classList.add('highlight-selected');
      }
    }
    const count = pendingPlay.args.targets.length;
    if (count === 3) {
      // Auto-execute at max selections
      const hi = pendingPlay.handIndex, args = pendingPlay.args;
      pendingPlay = null; clearHighlights(); setPlayInstruction(null);
      $('btn-confirm-chemical').classList.add('hidden');
      useControlAndAnimate(hi, args, () => render());
    } else if (count > 0) {
      setPlayInstruction(`Chemical Control — ${count}/3 invasive${count > 1 ? 's' : ''} selected. Click more or confirm.`);
      $('btn-confirm-chemical').classList.remove('hidden');
    }
    return;
  }

  if (pendingPlay.type === 'biological') {
    const target = state.field[row][col];
    if (!target || target.type !== CardType.INVASIVE) return;
    const hi = pendingPlay.handIndex;
    pendingPlay = null; clearHighlights(); setPlayInstruction(null);
    useControlAndAnimate(hi, { speciesId: target.id }, () => render());
    return;
  }

  if (pendingPlay.type === 'quarantine') {
    const target = state.field[row][col];
    if (!target || target.type !== CardType.INVASIVE || !['bacteria', 'fungi'].includes(target.organism)) return;
    const hi = pendingPlay.handIndex;
    pendingPlay = null; clearHighlights(); setPlayInstruction(null);
    useControlAndAnimate(hi, { row, col }, () => render());
    return;
  }
}

function onHandCardClick(handIndex) {
  if (state.phase !== Phase.PLAYER_PLAY) return;
  const player = activePlayer(state);
  const card = player.hand[handIndex];
  if (!card) return;

  showCardInfo(card);

  // Cancel if clicking the already-selected card
  if (pendingPlay?.handIndex === handIndex) {
    cancelPendingPlay();
    return;
  }

  cancelPendingPlay();
  document.querySelectorAll('.hand-card')[handIndex]?.classList.add('selected');

  if (card.type === CardType.NATIVE) {
    pendingPlay = { type: 'plant', handIndex, card };
    const validNiches = openCells(state).filter(([r, c]) => habitatCompatible(card.habitat, state.nicheHabitat[r][c]));
    highlightCells(validNiches, 'highlight-target');
    setPlayInstruction(`${placementVerb(card).charAt(0).toUpperCase() + placementVerb(card).slice(1)} ${cardName(card)} — click a highlighted niche to place, click the discard pile to discard, or click the card again to cancel.`);
    renderLog();
    return;
  }

  if (card.type === CardType.CONTROL) {
    const invCells = invasiveCells(state);

    switch (card.method) {
      case ControlMethod.PHYSICAL: {
        const validTargets = invCells.filter(({ card: c }) => canControlTarget(card, c)).map(({ row, col }) => [row, col]);
        pendingPlay = { type: 'physical', handIndex, card };
        if (validTargets.length === 0) {
          setPlayInstruction(`${card.displayName} — no valid targets. Click the discard pile to discard, or cancel.`);
        } else {
          highlightCells(validTargets, 'highlight-target');
          setPlayInstruction(`${card.displayName} — click a highlighted invasive to remove it.`);
        }
        renderLog();
        break;
      }
      case ControlMethod.CHEMICAL: {
        const validTargets = invCells.filter(({ card: c }) => canControlTarget(card, c)).map(({ row, col }) => [row, col]);
        pendingPlay = { type: 'chemical', handIndex, card, args: { targets: [] } };
        if (validTargets.length === 0) {
          setPlayInstruction(`${card.displayName} — no valid targets. Click the discard pile to discard, or cancel.`);
        } else {
          highlightCells(validTargets, 'highlight-target');
          setPlayInstruction(`${card.displayName} — select up to 3 invasives. 50% chance of herbicide drift — a native may be lost as collateral.`);
        }
        renderLog();
        break;
      }
      case ControlMethod.BIOLOGICAL: {
        const validTargets = invCells.filter(({ card: c }) => canControlTarget(card, c)).map(({ row, col }) => [row, col]);
        pendingPlay = { type: 'biological', handIndex, card };
        if (validTargets.length === 0) {
          setPlayInstruction(`${card.displayName} — no valid targets. Click the discard pile to discard, or cancel.`);
        } else {
          highlightCells(validTargets, 'highlight-target');
          setPlayInstruction(`${card.displayName} — click any invasive of the type to eliminate all of them.`);
        }
        renderLog();
        break;
      }
      case ControlMethod.FIRE: {
        const terrInvs = invCells.filter(({ row: r, col: c, card: fc }) =>
          state.nicheHabitat[r][c] === 'terrestrial' ||
          (fc.habitat === 'terrestrial' && ['bacteria', 'fungi'].includes(fc.organism))
        );
        if (terrInvs.length === 0) { addLog(state, 'No terrestrial invasives to burn.'); renderLog(); return; }
        pendingPlay = null; clearHighlights();
        document.querySelectorAll('.hand-card').forEach(el => el.classList.remove('selected'));
        animateFire(() => useControlAndAnimate(handIndex, {}, () => render()));
        break;
      }
      case ControlMethod.AQUATIC: {
        const validTargets = invCells.filter(({ card: c }) => canControlTarget(card, c)).map(({ row, col }) => [row, col]);
        pendingPlay = { type: 'aquatic', handIndex, card, args: { targets: [] } };
        if (validTargets.length === 0) {
          setPlayInstruction(`${card.displayName} — no valid targets. Click the discard pile to discard, or cancel.`);
        } else {
          highlightCells(validTargets, 'highlight-target');
          setPlayInstruction(`${card.displayName} — select up to 3 invasives. A native will be lost as collateral.`);
        }
        renderLog();
        break;
      }
      case ControlMethod.QUARANTINE: {
        const validTargets = invCells.filter(({ card: c }) => canControlTarget(card, c)).map(({ row, col }) => [row, col]);
        pendingPlay = { type: 'quarantine', handIndex, card };
        if (validTargets.length === 0) {
          setPlayInstruction(`${card.displayName} — no pathogens on the field. Click the discard pile to discard, or cancel.`);
        } else {
          highlightCells(validTargets, 'highlight-target');
          setPlayInstruction(`${card.displayName} — click a pathogen to remove it and any adjacent pathogens (sanitation zone).`);
        }
        renderLog();
        break;
      }
    }
  }
}

// ─── BUTTON EVENTS ────────────────────────────────────────────────────────────

function startGame() {
  const count    = parseInt($('player-count').value, 10) || 1;
  const gridSize = parseInt($('grid-size').value,    10) || 10;
  const ecosystem = $('ecosystem-type').value || 'mixed';
  GRID_SIZE = gridSize;
  HAND_SIZE = gridSize;
  state = createGameState(count, gridSize, ecosystem);
  pendingPlay = null;
  clearHighlights();
  hideTooltip();
  setupGame(state);
  render();
}

$('btn-new-game').addEventListener('click', () => {
  if (!state || state.phase === Phase.GAME_OVER) { startGame(); return; }
  showConfirm('Start a New Game?', 'Your current game will be lost.', 'New Game', true, startGame);
});

$('confirm-yes').addEventListener('click', () => {
  $('confirm-modal').classList.add('hidden');
  if (pendingConfirm) { pendingConfirm(); pendingConfirm = null; }
});

$('confirm-no').addEventListener('click', () => {
  $('confirm-modal').classList.add('hidden');
  pendingConfirm = null;
});

$('btn-draw').addEventListener('click', () => {
  if (state.phase !== Phase.PLAYER_DRAW) return;

  // Snapshot field so we can find where an invasive lands after draw
  const fieldSnap = state.field.map(row => row.map(cell => cell?.uid ?? null));
  const drawn = doPlayerDraw(state);

  // Step 1: enlarge and show the drawn card over the playing field
  revealCard(drawn, (revealRect) => {
    // Step 2: after reveal, fly from reveal position to destination and render
    const start = revealRect || $('deck-visual')?.getBoundingClientRect() || { left: 0, top: 0, width: 116, height: 86 };

    if (drawn?.type === CardType.EVENT) {
      // Event already resolved — render post-event board then show event overlay
      render();
      animateEvent(drawn, checkGameOver);

    } else if (drawn?.type === CardType.INVASIVE) {
      // Find which field cell changed, fly card there
      let targetEl = null;
      outer: for (let r = 0; r < state.gridSize; r++)
        for (let c = 0; c < state.gridSize; c++)
          if ((state.field[r][c]?.uid ?? null) !== fieldSnap[r][c]) {
            targetEl = document.querySelector(`#field .field-cell[data-row="${r}"][data-col="${c}"]`);
            break outer;
          }
      if (targetEl) {
        flyCard(start, targetEl.getBoundingClientRect(), () => { render(); checkGameOver(); });
      } else { render(); checkGameOver(); }

    } else {
      // Native or control → fly to hand, deal-in animation on arrival
      const handRect = $('hand').getBoundingClientRect();
      const dest = { left: handRect.left + 16, top: handRect.top + 8, width: 70, height: 108 };
      if (drawn?.type === CardType.NATIVE || drawn?.type === CardType.CONTROL) {
        justDrawnUid = drawn?.uid ?? null;
      }
      flyCard(start, dest, () => { render(); justDrawnUid = null; checkGameOver(); });
    }
  });
});

$('btn-end-play').addEventListener('click', () => {
  if (state.phase !== Phase.PLAYER_PLAY) return;
  const hand = activePlayer(state).hand;
  if (hand.length > HAND_SIZE) {
    setPlayInstruction(`You have ${hand.length} cards — play or discard down to ${HAND_SIZE} before ending your turn.`);
    return;
  }
  cancelPendingPlay();
  state.phase = Phase.PLAYER_REFILL;
  while (state.phase === Phase.PLAYER_REFILL) doRefillDraw(state);
  render();
  checkGameOver();
});

$('btn-native').addEventListener('click', () => {
  if (state.phase !== Phase.NATIVE_TURN) return;
  doEcosystemTurn(state);
  render();
  checkGameOver();
});

$('btn-invasive').addEventListener('click', () => {
  if (state.phase !== Phase.INVASIVE_TURN) return;
  doInvasiveTurn(state);
  render();
  checkGameOver();
});

$('btn-next-round').addEventListener('click', () => {
  if (state.phase !== Phase.ROUND_END) return;
  doRoundEnd(state);
  if (state.phase === Phase.GAME_OVER) {
    render(); checkGameOver(); // skip animation on final round
  } else {
    animateSeasonTransition(state.round, () => { render(); checkGameOver(); });
  }
});

$('btn-game-over').addEventListener('click', () => {
  showGameOverModal();
});

$('btn-cancel-play').addEventListener('click', cancelPendingPlay);

$('btn-discard-hand').addEventListener('click', () => {
  if (state?.phase !== Phase.PLAYER_PLAY) return;
  const count = activePlayer(state).hand.length;
  showConfirm(
    'Discard Entire Hand?',
    `All ${count} card${count !== 1 ? 's' : ''} in your hand will be discarded. Your turn ends immediately and you refill to ${HAND_SIZE} — any invasive or event cards drawn during refill resolve right away.`,
    'Discard Hand',
    true,
    () => {
      cancelPendingPlay();
      const sourceRects = Array.from(document.querySelectorAll('.hand-card')).map(el => el.getBoundingClientRect());
      actionDiscardEntireHand(state);
      flyCardsToDiscard(sourceRects, () => {
        animateRefillCards(() => { $('refill-banner').classList.add('hidden'); render(); checkGameOver(); });
      });
    }
  );
});

$('discard-visual').addEventListener('click', () => {
  if (state?.phase !== Phase.PLAYER_PLAY) return;
  if (!pendingPlay || pendingPlay.handIndex === undefined) return;
  const idx = pendingPlay.handIndex;
  const name = cardName(activePlayer(state).hand[idx]);
  // Capture rect now — confirm modal doesn't trigger render so DOM is still valid
  const handCardEl = document.querySelector(`.hand-card[data-hand-index="${idx}"]`);
  const sourceRect = handCardEl ? handCardEl.getBoundingClientRect() : null;
  showConfirm(
    'Discard Card?',
    `Discard ${name}? It returns to the discard pile and may be reshuffled into the deck later.`,
    'Discard',
    false,
    () => {
      actionDiscardFromHand(state, idx);
      pendingPlay = null; clearHighlights(); setPlayInstruction(null);
      $('btn-confirm-chemical').classList.add('hidden');
      document.querySelectorAll('.hand-card').forEach(el => el.classList.remove('selected'));
      flyCardsToDiscard(sourceRect ? [sourceRect] : [], () => render());
    }
  );
});

$('btn-confirm-chemical').addEventListener('click', () => {
  if (!pendingPlay || !['chemical','aquatic'].includes(pendingPlay.type) || pendingPlay.args.targets.length === 0) return;
  const hi = pendingPlay.handIndex, args = pendingPlay.args;
  pendingPlay = null; clearHighlights(); setPlayInstruction(null);
  $('btn-confirm-chemical').classList.add('hidden');
  useControlAndAnimate(hi, args, () => render());
});

// ─── GAME OVER ────────────────────────────────────────────────────────────────

function checkGameOver() {
  if (state.phase === Phase.GAME_OVER) showGameOverModal();
}

function showGameOverModal() {
  const won = state.winner === 'players';
  $('modal-title').textContent = won ? 'Ecosystem Protected!' : 'The Invasives Prevailed';
  $('modal-title').style.color = won ? 'var(--native-light)' : 'var(--invasive-light)';
  const sc = state.score;
  $('modal-body').innerHTML = `
    <div class="modal-score">${sc > 0 ? '+' : ''}${sc}</div>
    <div class="modal-breakdown">
      <span class="native-text">▲ ${nativeCells(state).length} Native</span>
      <span class="invasive-text">▼ ${invasiveCells(state).length} Invasive</span>
    </div>
    <p>${won
      ? 'Well done, land managers. The native ecosystem is thriving.'
      : 'The invasive species took over. Study your control options and try again.'
    }</p>
    <button class="btn btn-primary" onclick="document.getElementById('modal').classList.add('hidden'); document.getElementById('btn-new-game').click()">Play Again</button>
    <button class="btn btn-neutral" onclick="document.getElementById('modal').classList.add('hidden')">View Board</button>
  `;
  $('modal').classList.remove('hidden');
}

// ─── TUTORIAL ─────────────────────────────────────────────────────────────────

const TUTORIAL_STEPS = [
  {
    title: 'Welcome, Land Manager!',
    html: `
      <p>In <strong>Invasive Species: The Card Game</strong>, you and up to 3 teammates work together to protect a native ecosystem from spreading invasive plants.</p>
      <p>The game lasts <strong>10 Growing Seasons</strong>. At the end, you score <span class="tut-native">+1 for each Native plant</span> and <span class="tut-invasive">−1 for each Invasive plant</span> on the field.</p>
      <p>If invasives ever fill <strong>all niches</strong>, the ecosystem collapses — game over!</p>`,
  },
  {
    title: 'The Playing Field',
    html: () => `
      <p>The <strong>${GRID_SIZE}×${GRID_SIZE} grid</strong> is your ecosystem. Cards placed here stay until removed.</p>
      <div class="tut-legend">
        <div class="tut-legend-row"><span class="tut-badge badge-native">Native</span> Plants, animals, and fungi native to the ecosystem. Score +1 each.</div>
        <div class="tut-legend-row"><span class="tut-badge badge-invasive">Invasive</span> Non-native species with a spread mechanic. Score −1 each.</div>
        <div class="tut-legend-row"><span class="tut-badge badge-control">Control</span> Action cards you play to remove invasives — each with tradeoffs.</div>
        <div class="tut-legend-row"><span class="tut-badge badge-event">Event</span> Ecological disturbances triggered immediately when drawn.</div>
      </div>
      <p>Hover any card on the field or in your hand to read its details.</p>`,
  },
  {
    title: 'Your Turn — Three Phases',
    html: `
      <div class="tut-phases">
        <div class="tut-phase">
          <div class="tut-phase-num">1</div>
          <div><strong>Draw</strong><br>Click <em>Draw Card</em>. If it's an Invasive or Event card, it resolves immediately. Otherwise it goes to your hand.</div>
        </div>
        <div class="tut-phase">
          <div class="tut-phase-num">2</div>
          <div><strong>Play</strong><br>Click a card in your hand to select it — it lifts up and the field highlights valid targets in gold. Click a highlighted niche to play it. Click the card again to cancel. Play as many cards as you like, then click <em>Done Playing</em>.</div>
        </div>
        <div class="tut-phase">
          <div class="tut-phase-num">3</div>
          <div><strong>Refill</strong><br>Your hand automatically refills to 5 cards. Invasives drawn during refill go straight to the field.</div>
        </div>
      </div>`,
  },
  {
    title: 'Control Cards',
    html: `
      <p>Control cards remove invasives from the field. Each has different power — and tradeoffs:</p>
      <div class="tut-legend">
        <div class="tut-legend-row"><strong>Physical Removal</strong> — removes 1 invasive plant or animal. Cannot target bacteria or fungi.</div>
        <div class="tut-legend-row"><strong>Chemical Control</strong> — removes up to 3 invasives; herbicide drift kills 1 nearby native automatically.</div>
        <div class="tut-legend-row"><strong>Biological Control</strong> — removes <em>all</em> invasives of one type. Cannot target bacteria.</div>
        <div class="tut-legend-row"><strong>Prescribed Fire</strong> — removes all <em>terrestrial</em> invasives at once.</div>
        <div class="tut-legend-row"><strong>Aquatic Management</strong> — removes up to 3 aquatic/wetland invasives; 1 native collateral.</div>
        <div class="tut-legend-row"><strong>Quarantine Cut</strong> — removes 1 pathogen (bacteria or fungi) and all adjacent pathogens. The only control that targets pathogens in any habitat.</div>
      </div>
      <p>⚠ Some invasives are <strong>immune</strong> to certain controls — hover a card to check its tooltip.</p>`,
  },
  {
    title: 'The Ecosystem Turn',
    html: `
      <p>After all players refill their hands, the <strong>Ecosystem Turn</strong> resolves. Every active native and every invasive acts — in a <strong>random, interleaved order</strong> each season. Animals move first, then resolve their effect.</p>
      <p><strong>Invasive mechanics:</strong></p>
      <div class="tut-legend">
        <div class="tut-legend-row"><strong>Facilitator</strong> — draws until another invasive appears and places it.</div>
        <div class="tut-legend-row"><strong>Allelopathic</strong> — removes all adjacent natives with chemical toxins.</div>
        <div class="tut-legend-row"><strong>Competitor</strong> — removes 1 adjacent native (same organism type first).</div>
        <div class="tut-legend-row"><strong>Engineer</strong> — disrupts habitat, displacing up to 2 adjacent natives.</div>
        <div class="tut-legend-row"><strong>Predator</strong> — moves toward prey, then consumes 1 adjacent native animal.</div>
        <div class="tut-legend-row"><strong>Pathogen</strong> — spreads to an adjacent niche or replaces a native.</div>
        <div class="tut-legend-row"><strong>Disperser</strong> — establishes a new population in a distant niche.</div>
      </div>
      <p><strong>Native mechanics:</strong></p>
      <div class="tut-legend">
        <div class="tut-legend-row"><strong>Pioneer</strong> — draws a card; if native, plants it in an adjacent niche.</div>
        <div class="tut-legend-row"><strong>Propagator</strong> — spreads vegetatively into an adjacent open niche.</div>
        <div class="tut-legend-row"><strong>Competitor</strong> — removes 1 adjacent invasive of the same organism type.</div>
        <div class="tut-legend-row"><strong>Allelopathic</strong> — removes 1 adjacent invasive (any type).</div>
        <div class="tut-legend-row"><strong>Predator</strong> — moves toward prey, then removes 1 adjacent invasive animal.</div>
        <div class="tut-legend-row"><strong>Pollinator / Mycorrhizal</strong> — active player draws 1 card.</div>
      </div>
      <p>Click <em>Resolve Ecosystem Turn</em> to run the season.</p>`,
  },
  {
    title: 'You\'re Ready!',
    html: `
      <p>A game is already set up and waiting. Here's a quick reminder of the controls:</p>
      <div class="tut-legend">
        <div class="tut-legend-row">🖱 <strong>Hover</strong> any card to read its details.</div>
        <div class="tut-legend-row">🖱 <strong>Click</strong> a hand card to select it, then click the field to play it.</div>
        <div class="tut-legend-row">✕ Click the card again, or the <strong>Cancel</strong> button, to deselect.</div>
        <div class="tut-legend-row">🌿 Work together — discuss strategy with other players!</div>
      </div>
      <p>Good luck protecting the ecosystem.</p>`,
  },
];

let tutStep = 0;

function showTutorial() {
  tutStep = 0;
  renderTutStep();
  $('tutorial-modal').classList.remove('hidden');
}

function renderTutStep() {
  const step = TUTORIAL_STEPS[tutStep];
  const track = $('tutorial-step-track');
  track.innerHTML = '';
  TUTORIAL_STEPS.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'tut-dot' + (i === tutStep ? ' tut-dot-active' : i < tutStep ? ' tut-dot-done' : '');
    track.appendChild(dot);
  });

  $('tutorial-body').innerHTML = `<h2 class="tut-title">${step.title}</h2>${typeof step.html === 'function' ? step.html() : step.html}`;
  $('tut-next').textContent = tutStep === TUTORIAL_STEPS.length - 1 ? 'Start Playing!' : 'Next →';
  $('tut-back').classList.toggle('hidden', tutStep === 0);
}

$('tut-next').addEventListener('click', () => {
  tutStep++;
  if (tutStep >= TUTORIAL_STEPS.length) {
    $('tutorial-modal').classList.add('hidden');
  } else {
    renderTutStep();
  }
});

$('tut-back').addEventListener('click', () => {
  if (tutStep > 0) { tutStep--; renderTutStep(); }
});

function closeTutorial() { $('tutorial-modal').classList.add('hidden'); }
$('tut-skip').addEventListener('click', closeTutorial);
$('tut-close').addEventListener('click', closeTutorial);

// ─── THEME ────────────────────────────────────────────────────────────────────

let currentThemePref = localStorage.getItem('theme') || 'system';

function applyTheme(pref) {
  currentThemePref = pref;
  const effective = pref === 'system'
    ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : pref;
  document.documentElement.setAttribute('data-theme', effective);
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.themeValue === pref);
  });
  localStorage.setItem('theme', pref);
}

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
  if (currentThemePref === 'system') applyTheme('system');
});

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => applyTheme(btn.dataset.themeValue));
});

$('btn-tutorial').addEventListener('click', () => { showTutorial(); });

$('btn-settings').addEventListener('click', () => {
  $('settings-modal').classList.remove('hidden');
});

$('settings-close').addEventListener('click', () => {
  $('settings-modal').classList.add('hidden');
});

$('settings-modal').addEventListener('click', e => {
  if (e.target === $('settings-modal')) $('settings-modal').classList.add('hidden');
});

// ─── FEEDBACK ─────────────────────────────────────────────────────────────────

function openFeedback() {
  $('feedback-text').value = '';
  $('feedback-modal').classList.remove('hidden');
  $('feedback-text').focus();
}

function closeFeedback() {
  $('feedback-modal').classList.add('hidden');
}

$('feedback-btn').addEventListener('click', openFeedback);
$('feedback-close').addEventListener('click', closeFeedback);
$('feedback-cancel').addEventListener('click', closeFeedback);
$('feedback-modal').addEventListener('click', e => {
  if (e.target === $('feedback-modal')) closeFeedback();
});

$('feedback-submit').addEventListener('click', () => {
  const text = $('feedback-text').value.trim();
  if (!text) { $('feedback-text').focus(); return; }
  const subject = encodeURIComponent('ISC Alpha Feedback');
  const body    = encodeURIComponent(text);
  window.location.href = `mailto:harrisonmiles@vt.edu?subject=${subject}&body=${body}`;
  closeFeedback();
});

// ─── BOOT ─────────────────────────────────────────────────────────────────────
applyTheme(currentThemePref);
startGame();
showTutorial();
