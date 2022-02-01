import ProductList from 'components/Modules/Product/List'
import ContentLayout from 'layouts/ContentLayout'
import DashboardLayout from 'layouts/DashboardLayout'
import { GetServerSideProps } from 'next'
import { withSSRAuth } from 'utils/withSSRAuth'

export default function Dashboard() {
  return (
    <DashboardLayout>
      <ContentLayout title='Dashboard'>
        <ProductList />
      </ContentLayout>
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
