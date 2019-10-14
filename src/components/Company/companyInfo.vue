<template>
  <div>
    <h3></h3>
  </div>
</template>


<script>
import gql from 'graphql-tag'
// import appSmallSpinner from '@/components/common/smallSpinner'

const detailCompanyInfoQuery = gql`
  query detailCompanyInfo($id: String!) {
    detailCompanyInfo(id: $id) {
      _id
      name
      fullName
      inn
      users {
        _id
        name
        email
      }
      admins {
        _id
        name
        email
      }
    }
  }
`
export default {
  name: 'companyInfo',
  data: () => ({
    detailCompanyInfo: {}
  }),
  components: {
    // appSmallSpinner
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters.isLoggedIn) {
        vm.$router.push('/signin')
      }
    })
  },
  apollo: {
    detailCompanyInfo: {
      query: detailCompanyInfoQuery,
      variables: {
        id: $route.params.id
      }
    }
  }
}
</script>