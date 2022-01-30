import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import SessionLayout from 'layouts/SessionLayout'
import FormSessionLayout from 'layouts/FormSessionLayout'
import { withSSRGuest } from 'utils/withSSRGuest'
import UserCreate from 'components/Modules/User/Create'

export default function UserCreatePage() {
  return (
    <SessionLayout>
      <>
        <FormSessionLayout>
          <UserCreate />
        </FormSessionLayout>
        <div className='l-session__hero'>
          <Image
            src='/images/hero-2.svg'
            width={500}
            height={500}
            objectFit='contain'
            alt='Hero Image'
          />
        </div>
      </>
    </SessionLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  async context => {
    return {
      props: {},
    }
  }
)
