// 첫번째 제네릭엔 타입, 두번째엔 튜플의 길이를 넣는다. 예) Tuple<number, 3> == [number, number, number]
export type Tuple<T, N extends number, A extends any[] = []> = A extends {
  length: N;
}
  ? A
  : Tuple<T, N, [...A, T]>;
