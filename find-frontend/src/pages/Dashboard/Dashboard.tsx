import { useNavigate } from 'react-router-dom'
import { usePopularCompanies } from '@/hooks/usePopularCompanies'
import CompanyCard from '@/components/company/CompanyCard'
import Loading from '@/components/common/Loading'
import './Dashboard.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const { companies, quotes, loading, error } = usePopularCompanies()

  const handleCardClick = (ticker: string) => {
    navigate(`/company/${ticker}`)
  }

  if (loading) {
    return (
      <div className="dashboard">
        <h1>대시보드</h1>
        <Loading />
      </div>
    )
  }

  if (error && companies.length === 0) {
    return (
      <div className="dashboard">
        <h1>대시보드</h1>
        <div className="dashboard-error">{error}</div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <h1>대시보드</h1>
      {error && <div className="dashboard-warning">{error}</div>}
      <div className="dashboard-grid">
        {companies.map((company) => (
          <CompanyCard
            key={company.ticker}
            company={company}
            quote={quotes[company.ticker]}
            onClick={() => handleCardClick(company.ticker)}
          />
        ))}
      </div>
    </div>
  )
}
