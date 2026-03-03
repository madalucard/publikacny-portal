import { PostWithAuthor } from '../models/post.model';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Jana Nováková', email: 'jana@test.com', gender: 'female', status: 'active' },
  { id: 2, name: 'Peter Kováč', email: 'peter@test.com', gender: 'male', status: 'active' },
];

export const MOCK_POSTS: PostWithAuthor[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Búrka nad Tatrami: Meteorológovia vydali výstrahu',
    body: 'Slovenský hydrometeorologický ústav vydal výstrahu druhého stupňa pre oblasti Vysokých a Nízkych Tatier. Očakávajú sa silné búrky s krúpami a nárazmi vetra dosahujúcimi až 90 km/h. Obyvateľom horských oblastí sa odporúča obmedziť pobyt vonku a sledovať aktuálne správy.',
    authorName: 'Jana Nováková',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Mačka Micka tri dni strávila na strome, hasiči ju zachránili',
    body: 'Päťročná mačka menom Micka uviazla na vysokom buku v záhrade rodinného domu v Ružomberku. Napriek snahám majiteľky zviera odmietalo zliezť. Privolaní hasiči použili špeciálny rebrík a po hodinovej akcii sa im podarilo mačku bezpečne dostať na zem. Micka je v poriadku.',
    authorName: 'Jana Nováková',
  },
  {
    id: 3,
    user_id: 2,
    title: 'Jeseň prichádza skôr: Čo čakať od počasia v najbližších týždňoch',
    body: 'Podľa predpovede meteorológov nás čaká chladnejší september ako je obvyklé. Teploty klesnú o tri až päť stupňov pod dlhodobý priemer. Záhradkári by mali urýchliť zber úrody a pripraviť rastliny na skorý príchod mrazov. Na horách môže snežiť už koncom mesiaca.',
    authorName: 'Peter Kováč',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    post_id: 1,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'U nás v dedine tiež fúka, okno mi vyrazilo z rámu.',
  },
  {
    id: 2,
    post_id: 1,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Bola som práve na chatke, museli sme predčasne odísť.',
  },
  {
    id: 3,
    post_id: 1,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Výstrahu som videl neskoro, dobre že sa nič nestalo.',
  },
  {
    id: 4,
    post_id: 1,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Takéto búrky bývali skôr výnimočné, teraz každý rok.',
  },

  {
    id: 5,
    post_id: 2,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'Naša mačka robí to isté, vždy si nájde problém.',
  },
  {
    id: 6,
    post_id: 2,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Chudáčik Micka, rada som že je v poriadku!',
  },
  {
    id: 7,
    post_id: 2,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Hasiči sú hrdinovia, aj pre mačky.',
  },
  {
    id: 8,
    post_id: 2,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Moja mačka by tam sedela týždeň a čakala by na sardinky.',
  },

  {
    id: 9,
    post_id: 3,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'Už som sadil cibuľu, dúfam že mráz nepríde skoro.',
  },
  {
    id: 10,
    post_id: 3,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Paradajky ešte nedozreli, to bude problém.',
  },
  {
    id: 11,
    post_id: 3,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Na Lomnici minulý rok snežilo 15. septembra.',
  },
  {
    id: 12,
    post_id: 3,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Konečne, leto bolo príliš horúce. Vítam chladnejšie dni.',
  },
];
