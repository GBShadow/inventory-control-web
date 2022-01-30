import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import SessionLayout from 'layouts/SessionLayout'
import FormSessionLayout from 'layouts/FormSessionLayout'
import Login from 'components/Login'
import { withSSRGuest } from 'utils/withSSRGuest'

export default function LoginPage() {
  return (
    <SessionLayout>
      <>
        <FormSessionLayout>
          <Login />
        </FormSessionLayout>
        <div className='l-session__hero'>
          <Image
            src='/images/hero-1.svg'
            width={600}
            height={600}
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
