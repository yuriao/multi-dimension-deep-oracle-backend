export enum Dimension {
  STABILITY = 'stability',
  CHANGE = 'change',
  RISK = 'risk',
  SAFETY = 'safety',
  INNER_GROWTH = 'innerGrowth',
  EXTERNAL_REWARD = 'externalReward',
  EMOTIONAL_INTENSITY = 'emotionalIntensity',
  SOCIAL_CONNECTION = 'socialConnection',
}

export const DIMENSION_DESCRIPTIONS = {
  [Dimension.STABILITY]: 'Maintaining status quo, security, predictability',
  [Dimension.CHANGE]: 'Transformation, new beginnings, disruption',
  [Dimension.RISK]: 'Potential for loss, danger, uncertainty',
  [Dimension.SAFETY]: 'Protection, cautious approach, minimal exposure',
  [Dimension.INNER_GROWTH]: 'Personal development, spiritual learning, wisdom',
  [Dimension.EXTERNAL_REWARD]: 'Material gain, recognition, tangible success',
  [Dimension.EMOTIONAL_INTENSITY]: 'Depth of feeling, passion, emotional engagement',
  [Dimension.SOCIAL_CONNECTION]: 'Relationships, community, collaboration',
};

export const DEFAULT_DIMENSION_WEIGHTS = {
  [Dimension.STABILITY]: 0.5,
  [Dimension.CHANGE]: 0.5,
  [Dimension.RISK]: 0.3,
  [Dimension.SAFETY]: 0.7,
  [Dimension.INNER_GROWTH]: 0.6,
  [Dimension.EXTERNAL_REWARD]: 0.6,
  [Dimension.EMOTIONAL_INTENSITY]: 0.5,
  [Dimension.SOCIAL_CONNECTION]: 0.6,
};
