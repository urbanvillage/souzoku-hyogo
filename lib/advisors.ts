import { supabase, createServerClient } from './supabase'
import type { Advisor, AdvisorInsert, SearchParams } from '@/types'

const PAGE_SIZE = 12

export async function searchAdvisors({ city, keyword, specialty, page = 1 }: SearchParams) {
  let query = supabase
    .from('advisors')
    .select('*', { count: 'exact' })
    .eq('is_published', true)
    .order('sort_order')

  if (city) query = query.eq('city', city)
  if (specialty) query = query.contains('specialties', [specialty])
  if (keyword) {
    query = query.or(`name.ilike.%${keyword}%,office_name.ilike.%${keyword}%`)
  }

  const from = (page - 1) * PAGE_SIZE
  query = query.range(from, from + PAGE_SIZE - 1)

  const { data, error, count } = await query
  if (error) throw error
  return { advisors: data as Advisor[], total: count ?? 0, pageSize: PAGE_SIZE }
}

export async function getAdvisorById(id: number) {
  const { data, error } = await supabase
    .from('advisors')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()
  if (error) return null
  return data as Advisor
}

// Admin functions (server-side only)
export async function getAllAdvisorsAdmin() {
  const client = createServerClient()
  const { data, error } = await client
    .from('advisors')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data as Advisor[]
}

export async function createAdvisor(advisor: AdvisorInsert) {
  const client = createServerClient()
  const { data, error } = await client
    .from('advisors')
    .insert(advisor)
    .select()
    .single()
  if (error) throw error
  return data as Advisor
}

export async function updateAdvisor(id: number, advisor: Partial<AdvisorInsert>) {
  const client = createServerClient()
  const { data, error } = await client
    .from('advisors')
    .update(advisor)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as Advisor
}

export async function deleteAdvisor(id: number) {
  const client = createServerClient()
  const { error } = await client.from('advisors').delete().eq('id', id)
  if (error) throw error
}
