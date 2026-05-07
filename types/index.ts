export type Advisor = {
  id: number
  name: string
  name_kana: string
  office_name: string
  prefecture: string
  city: string
  phone: string | null
  email: string | null
  website: string | null
  profile: string | null
  specialties: string[]
  photo_url: string | null
  license_no: string
  is_published: boolean
  created_at: string
}

export type AdvisorInsert = Omit<Advisor, 'id' | 'created_at'>

export type SearchParams = {
  city?: string
  keyword?: string
  specialty?: string
  page?: number
}

export const SPECIALTIES = ['不動産', '税務', '事業承継', '保険', '農地・山林', '遺言作成', '成年後見', '民事信託'] as const
export const HYOGO_CITIES = ['神戸市', '姫路市', '尼崎市', '明石市', '西宮市', '洲本市', '芦屋市', '伊丹市', '相生市', '豊岡市', '加古川市', '赤穂市', '西脇市', '宝塚市', '三木市', '高砂市', '川西市', '小野市', '三田市', '加西市', '篠山市', '養父市', '丹波市', '南あわじ市', '朝来市', '淡路市', '宍粟市', '加東市', 'たつの市'] as const
