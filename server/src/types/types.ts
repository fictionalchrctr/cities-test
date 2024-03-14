export interface ICity {
  name: string
  value: string
  foundedAt: string
}

export interface IList {
  shortName: string
  fullName: string
  color: string
  cities: ICity[]
}
