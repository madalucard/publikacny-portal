import { PostWithAuthor } from '../models/post.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';

export const MOCK_USERS: User[] = [
  { id: 1, name: 'Jana Nováková', email: 'jana@test.com', gender: 'female', status: 'active' },
  { id: 2, name: 'Peter Kováč', email: 'peter@test.com', gender: 'male', status: 'active' },
];

export const MOCK_POSTS: PostWithAuthor[] = [
  {
    id: 1,
    user_id: 1,
    title: 'Ako zvládnuť Angular Signals v praxi',
    body: 'Angular Signals prinášajú revolúciu v reaktivite. Namiesto zložitého RxJS kódu môžeme používať jednoduché a predvídateľné signály, ktoré automaticky aktualizujú UI pri každej zmene stavu aplikácie.',
    authorName: 'Jana Nováková',
  },
  {
    id: 2,
    user_id: 1,
    title: 'Standalone Components – koniec NgModules?',
    body: 'Od Angular 17 sú Standalone Components odporúčaným štandardom. Zbavujeme sa boilerplate kódu NgModules a každý komponent sa stáva samostatnou jednotkou so svojimi závislosťami.',
    authorName: 'Jana Nováková',
  },
  {
    id: 3,
    user_id: 2,
    title: 'Infinity Scroll bez externých knižníc',
    body: 'Intersection Observer API je natívne browser API ktoré nám umožňuje sledovať viditeľnosť elementov. Ideálne na implementáciu infinity scrollu bez závislosti na externých balíčkoch.',
    authorName: 'Peter Kováč',
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    post_id: 1,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'Výborný článok! Signals mi konečne dávajú zmysel.',
  },
  {
    id: 2,
    post_id: 1,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Používam to v produkcii 3 mesiace, odporúčam každému.',
  },
  {
    id: 3,
    post_id: 1,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Super vysvetlené, konečne pochopenie bez zbytočnej teórie.',
  },
  {
    id: 4,
    post_id: 1,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Zdieľam ďalej, toto potrebuje vidieť každý Angular dev.',
  },

  {
    id: 5,
    post_id: 2,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'NgModules mi nechýbajú vôbec. Prechod bol jednoduchší ako som čakal.',
  },
  {
    id: 6,
    post_id: 2,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Konečne menej boilerplate. Toto malo prísť oveľa skôr.',
  },
  {
    id: 7,
    post_id: 2,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Skúšal som migráciu na standalone, trvalo to pol dňa.',
  },
  {
    id: 8,
    post_id: 2,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Standalone + Signals = budúcnosť Angularu. Súhlasím.',
  },

  {
    id: 9,
    post_id: 3,
    name: 'Martin Sloboda',
    email: 'martin@test.com',
    body: 'Intersection Observer je podceňované API. Ďakujem za príklad.',
  },
  {
    id: 10,
    post_id: 3,
    name: 'Lucia Horáková',
    email: 'lucia@test.com',
    body: 'Konečne bez ngx-infinite-scroll závislosti. Čistejší kód.',
  },
  {
    id: 11,
    post_id: 3,
    name: 'Tomáš Mináč',
    email: 'tomas@test.com',
    body: 'Funguje perfektne aj na mobile. Testoval som na iPhone.',
  },
  {
    id: 12,
    post_id: 3,
    name: 'Eva Blahová',
    email: 'eva@test.com',
    body: 'Implementoval som podľa tohto návodu za 20 minút.',
  },
];
