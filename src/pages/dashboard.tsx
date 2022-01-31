import Modal from 'components/Modal'
import DashboardLayout from 'layouts/DashboardLayout'
import { GetServerSideProps } from 'next'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function Dashboard() {
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
