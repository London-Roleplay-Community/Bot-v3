export const groupData = {
  "11052055": "[LRC] | Police Investigations Team",
  "11052058": "[LRC] | London RolepIay Community",
  "16572708": "[LRC] | London Ambulance Service",
  "32926785": "[LRC] | Transport for London",
  "32927342": "[LRC] | Westbridge Intelligence Agency",
  "32931186": "[LRC] | Highways England",
  "32931651": "[LRC] | City of London Police",
  "32998638": "[LRC] | Development Team",
  "33884392": "[LRC] | Westbridge Broadcasting Group",
  "33954482": "[LRC] | National Crime Agency",
  "34022307": "[LRC] | City of Westbridge Council",
  "34165167": "[LRC] | British Military",
  "35713596": "[LRC] | Government",
  "35745926": "[LRC] | Royal Military Police",
  "35746511": "[LRC] | Crown Court",
  "242957374": "[LRC] | British Transport Police",
  "391436205": "[MPS] | Met Operations 7",
  "480529742": "[LRC] | London's Air Ambulance",
  "628925899": "[MPS] | Met Operations 19",
  "670499332": "[MPS] | Met Operations 8",
  "820476170": "[LRC] | External Investigations Team",
  "1015558720": "[LRC] | London Fire Brigade"
} as const;

export type GroupName = typeof groupData[keyof typeof groupData]

type GroupLookup = {
  [Id in keyof typeof groupData as typeof groupData[Id]]: Id
}

export function getGroupIdByName<Name extends GroupName>(name: Name):GroupLookup[Name] {
  const entry = Object.entries(groupData).find(([, value]) => value === name)
  return entry ? (entry[0] as GroupLookup[Name]): (undefined as never)
}

export function getGroupNameById<Id extends keyof typeof groupData>(id: Id):typeof groupData[Id] {
  return groupData[id]
}

/**
 * FUCK TYPESCRIPT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * @param id Group id
 * @returns 
 */
export function validId(id: string): id is keyof typeof groupData {
  return id in groupData;
}

/* 
* Typeof: changes a const to a type (e.g. const h = { "1": "hello", "2": "hello" } as const; -> { readonly "1": "hello"; readonly "2": "hello"; })
* Keyof: transforms an object shape to a key union;
* for example, keyof typeof const h = { "1": "hello", "2": "hello" } as const; -> "1" | "2"
*
* so if you do (typeof h)[keyof typeof h], you'd get "hello" | "abc"
* (typeof h): gets the types, if as const then it will essentially stay the same; just readonly (always use as const if you're going to make them immutable)
* [...typeof h]: gets the exact type of h
* [keyof typeof h]: turns the exact type into a union key; "1" | "2"
* (typeof h)[keyof typeof h]: gets the index value of "1" | "2", so that transforms into "hello" | "abc"
* 
* types are powerful but annoying as shit!
* */