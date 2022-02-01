import UserList from 'components/Modules/User/List'
import ContentLayout from 'layouts/ContentLayout'
import DashboardLayout from 'layouts/DashboardLayout'
import { GetServerSideProps } from 'next'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ContentLayout title='Usuários'>
        <UserList />
      </ContentLayout>
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async context => {
    return {
      props: {},
    }
  },
  { roles: ['ADM'] }
)
