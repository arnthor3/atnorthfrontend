import ky from 'ky'
import type { Company } from '../types'

type CompanySuccessResponse = {
  data: Company
}

export const getCompany = async (companyId: string): Promise<Company> => {
  const res = await ky
    .get(`/api/company/${companyId}`)
    .json<CompanySuccessResponse>()
  return res.data
}
