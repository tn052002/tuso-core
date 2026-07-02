export const hexagramBars = Array.from({ length: 6 }, (_, index) => index);

export type LineKind = 'yin' | 'yang' | 'moving-yin' | 'moving-yang';

export type CastLine = {
  kind: LineKind;
  value: 0 | 1;
  changingValue: 0 | 1;
};

export type Hexagram = {
  number: number;
  name: string;
};

export const lineLabels: Record<LineKind, string> = {
  yin: 'Yin',
  yang: 'Yang',
  'moving-yin': 'Moving Yin',
  'moving-yang': 'Moving Yang',
};

const trigramOrder = ['111', '110', '101', '100', '011', '010', '001', '000'];
const kingWenTable = [
  [1, 43, 14, 34, 9, 5, 26, 11],
  [10, 58, 38, 54, 61, 60, 41, 19],
  [13, 49, 30, 55, 37, 63, 22, 36],
  [25, 17, 21, 51, 42, 3, 27, 24],
  [44, 28, 50, 32, 57, 48, 18, 46],
  [6, 47, 64, 40, 59, 29, 4, 7],
  [33, 31, 56, 62, 53, 39, 52, 15],
  [12, 45, 35, 16, 20, 8, 23, 2],
];

export const hexagramNames: Record<number, string> = {
  1: 'The Creative',
  2: 'The Receptive',
  3: 'Difficulty at the Beginning',
  4: 'Youthful Folly',
  5: 'Waiting',
  6: 'Conflict',
  7: 'The Army',
  8: 'Holding Together',
  9: 'Small Taming',
  10: 'Treading',
  11: 'Peace',
  12: 'Standstill',
  13: 'Fellowship',
  14: 'Great Possession',
  15: 'Modesty',
  16: 'Enthusiasm',
  17: 'Following',
  18: 'Work on What Has Been Spoiled',
  19: 'Approach',
  20: 'Contemplation',
  21: 'Biting Through',
  22: 'Grace',
  23: 'Splitting Apart',
  24: 'Return',
  25: 'Innocence',
  26: 'Great Taming',
  27: 'Nourishment',
  28: 'Great Preponderance',
  29: 'The Abysmal',
  30: 'The Clinging',
  31: 'Influence',
  32: 'Duration',
  33: 'Retreat',
  34: 'Great Power',
  35: 'Progress',
  36: 'Darkening of the Light',
  37: 'The Family',
  38: 'Opposition',
  39: 'Obstruction',
  40: 'Deliverance',
  41: 'Decrease',
  42: 'Increase',
  43: 'Breakthrough',
  44: 'Coming to Meet',
  45: 'Gathering Together',
  46: 'Pushing Upward',
  47: 'Oppression',
  48: 'The Well',
  49: 'Revolution',
  50: 'The Cauldron',
  51: 'The Arousing',
  52: 'Keeping Still',
  53: 'Development',
  54: 'The Marrying Maiden',
  55: 'Abundance',
  56: 'The Wanderer',
  57: 'The Gentle',
  58: 'The Joyous',
  59: 'Dispersion',
  60: 'Limitation',
  61: 'Inner Truth',
  62: 'Small Preponderance',
  63: 'After Completion',
  64: 'Before Completion',
};

export const hexagramDescriptions: Record<number, string> = {
  1: 'Heaven moves with tireless strength. Create with clarity, discipline, and right timing.',
  2: 'Earth receives and nourishes. Yield, support, and let the path take form through devotion.',
  3: 'Beginnings are tangled. Do not force completion; organize, gather help, and endure.',
  4: 'Youthful uncertainty asks for learning. Ask sincerely once, then practice what is shown.',
  5: 'Waiting is active trust. Nourish yourself and let the right moment arrive.',
  6: 'Conflict warns against escalation. Seek fairness, clarity, and a wise mediator.',
  7: 'Discipline gathers scattered force. Lead with order, responsibility, and restraint.',
  8: 'Union forms around sincerity. Choose your alliances before the moment passes.',
  9: 'Small restraint shapes great weather. Attend to details and soften force with refinement.',
  10: 'Tread carefully near power. Courtesy and awareness let you pass without harm.',
  11: 'Heaven and earth communicate. Use harmony generously while the gates are open.',
  12: 'Heaven and earth separate. Preserve integrity while outer conditions are blocked.',
  13: 'Fellowship widens the field. Shared purpose is stronger than private preference.',
  14: 'Great possession asks for humility. Hold abundance by serving what is luminous.',
  15: 'Modesty keeps balance. Reduce excess and the way becomes passable.',
  16: 'Enthusiasm mobilizes people. Let rhythm, devotion, and timing gather movement.',
  17: 'Following requires adaptation. Move with what is worthy, not what is merely loud.',
  18: 'Something inherited needs repair. Name the decay, then patiently restore order.',
  19: 'Approach brings influence. Come near with generosity before the season turns.',
  20: 'Contemplation sees from above. Pause, observe, and become worthy of being seen.',
  21: 'Biting through removes obstruction. Decide clearly and cut through confusion.',
  22: 'Grace adorns substance. Beauty helps, but only when it serves the real.',
  23: 'Splitting apart strips away the false. Do not push upward while the base is crumbling.',
  24: 'Return begins quietly. A small renewal, protected, becomes the turning point.',
  25: 'Innocence acts without contrivance. Stay natural and do not over-engineer the way.',
  26: 'Great restraint stores power. Hold energy until it can serve something higher.',
  27: 'Nourishment reveals character. Watch what you take in and what you feed in others.',
  28: 'Great weight bends the beam. Extraordinary pressure calls for an extraordinary crossing.',
  29: 'The abyss repeats. Move through danger by sincerity, practice, and steady heart.',
  30: 'Clarity depends on what it clings to. Attach yourself to what gives true light.',
  31: 'Influence moves through openness. Let attraction be mutual, subtle, and sincere.',
  32: 'Duration is strength over time. Keep faith with the path and adjust without abandoning it.',
  33: 'Retreat preserves the essential. Withdraw cleanly before force is wasted.',
  34: 'Great power needs correctness. Strength without restraint becomes its own obstacle.',
  35: 'Progress rises like the sun. Use visibility to serve, not to inflate the self.',
  36: 'Light is hidden. Protect your clarity when the world cannot receive it.',
  37: 'The family orders the inner world. Roles, care, and consistency create warmth.',
  38: 'Opposition separates viewpoints. Difference can clarify when dignity is preserved.',
  39: 'Obstruction redirects the journey. Turn inward, seek help, and stop attacking the wall.',
  40: 'Release follows tension. Forgive, simplify, and move once the knot loosens.',
  41: 'Decrease removes excess. Sacrifice what is unnecessary to strengthen what is true.',
  42: 'Increase brings blessing. Use growth quickly and generously while the wind is favorable.',
  43: 'Breakthrough must be declared. Speak truth firmly without falling into aggression.',
  44: 'A powerful encounter arrives. Do not be seduced by what cannot be integrated.',
  45: 'Gathering needs a center. Ritual, purpose, and leadership bring people together.',
  46: 'Pushing upward is gradual ascent. Small sincere steps reach a high place.',
  47: 'Oppression tests the spirit. Words may fail; inner truth must remain alive.',
  48: 'The well is the shared source. Restore the vessel so nourishment can be drawn.',
  49: 'Revolution changes the skin. Transformation is accepted when timing and trust are right.',
  50: 'The cauldron refines raw material. Culture, offering, and transformation are underway.',
  51: 'Shock awakens. Let the thunder pass through without losing the sacred vessel.',
  52: 'Keeping still rests the mountain. Stop at the right place and the heart becomes quiet.',
  53: 'Development proceeds like a tree. Growth is slow, rooted, and worthy of patience.',
  54: 'The marrying maiden warns of imbalance. Accept limits and avoid forcing status.',
  55: 'Abundance is noon. Shine fully, knowing fullness also begins decline.',
  56: 'The wanderer survives by clarity. Be courteous, alert, and unattached while away from home.',
  57: 'The gentle penetrates like wind. Repeated small influence shapes the field.',
  58: 'Joy opens exchange. True pleasure is shared, sincere, and not careless.',
  59: 'Dispersion dissolves separation. Cross the waters and reunite what has scattered.',
  60: 'Limitation gives form. Boundaries become useful when they do not become bitterness.',
  61: 'Inner truth reaches across distance. Sincerity moves what force cannot.',
  62: 'Small preponderance favors humility. Attend to small duties; do not fly too high.',
  63: 'After completion requires vigilance. When things are ordered, guard against decline.',
  64: 'Before completion is almost across. Stay alert; the last step still matters.',
};

export function castLine(): CastLine {
  const roll = Math.floor(Math.random() * 8);

  if (roll === 0) return { kind: 'moving-yin', value: 0, changingValue: 1 };
  if (roll === 7) return { kind: 'moving-yang', value: 1, changingValue: 0 };
  if (roll < 4) return { kind: 'yang', value: 1, changingValue: 1 };

  return { kind: 'yin', value: 0, changingValue: 0 };
}

export function getHexagram(values: Array<0 | 1>): Hexagram | null {
  if (values.length !== 6) return null;

  const lower = values.slice(0, 3).join('');
  const upper = values.slice(3, 6).join('');
  const upperIndex = trigramOrder.indexOf(upper);
  const lowerIndex = trigramOrder.indexOf(lower);

  if (upperIndex < 0 || lowerIndex < 0) return null;

  const number = kingWenTable[upperIndex][lowerIndex];

  return {
    number,
    name: hexagramNames[number],
  };
}

export function getLineClass(line?: CastLine, changed = false, showMoving = true) {
  if (!line) return '';

  const value = changed ? line.changingValue : line.value;
  const moving = line.kind === 'moving-yin' || line.kind === 'moving-yang';

  return ` is-cast is-${value ? 'yang' : 'yin'}${moving && showMoving ? ' is-moving' : ''}`;
}
