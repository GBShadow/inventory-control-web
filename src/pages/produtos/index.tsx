import DashboardLayout from 'layouts/DashboardLayout'
import { GetServerSideProps } from 'next'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function ProductListsPage() {
  return (
    <DashboardLayout>
      <div></div>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async context => {
    return {
      props: {},
    }
  }
)
