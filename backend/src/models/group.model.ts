const familyDefinitions = {
  1: "Alkali Metals",
  2: "Alkaline Earth Metals",
  3: "Transition Metals",
  4: "Transition Metals",
  5: "Transition Metals",
  6: "Transition Metals",
  7: "Transition Metals",
  8: "Transition Metals",
  9: "Transition Metals",
  10: "Transition Metals",
  11: "Transition Metals",
  12: "Transition Metals",
  13: "Boron Group",
  14: "Carbon Group",
  15: "Nitrogen Group",
  16: "Chalcogens",
  17: "Halogens",
  18: "Noble Gases",
} as const;

type FamilyId = keyof typeof familyDefinitions;
type Family = {
  [N in FamilyId]: { number: N; name: (typeof familyDefinitions)[N] };
}[FamilyId];

export interface Group {
  family: Family;
}
