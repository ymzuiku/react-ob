export type ChannelInputs =
  | []
  | [() => unknown]
  | [() => unknown, () => unknown]
  | [() => unknown, () => unknown, () => unknown]
  | [() => unknown, () => unknown, () => unknown, () => unknown]
  | [() => unknown, () => unknown, () => unknown, () => unknown, () => unknown]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ]
  | [
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown,
      () => unknown
    ];

export type ChannelArgs<T extends any[]> = [
  ReturnType<T[0]>,
  ReturnType<T[1]>,
  ReturnType<T[2]>,
  ReturnType<T[3]>,
  ReturnType<T[4]>,
  ReturnType<T[5]>,
  ReturnType<T[6]>,
  ReturnType<T[7]>,
  ReturnType<T[8]>,
  ReturnType<T[9]>,
  ReturnType<T[10]>,
  ReturnType<T[11]>,
  ReturnType<T[12]>,
  ReturnType<T[13]>,
  ReturnType<T[14]>,
  ReturnType<T[15]>,
  ReturnType<T[16]>,
  ReturnType<T[17]>,
  ReturnType<T[18]>,
  ReturnType<T[19]>,
  ReturnType<T[20]>
];
